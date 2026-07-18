import { NextRequest, NextResponse } from "next/server";
import {
  calculateLikertMBTI,
  calculateQuestionScore,
  generateLikertReport,
  getQuestionBank,
  type LikertAnswer,
  type LikertValue,
} from "@/lib/mbti-calculator-likert";
import { getDatabaseAdmin } from "@/lib/server/database";
import type { Version } from "@/data/mbti-questions-likert";

function clean(value: unknown) {
  return String(value || "").trim();
}

function versionFromBank(bankId: string): Version {
  if (bankId.toUpperCase() === "MBTI200") return 200;
  if (bankId.toUpperCase() === "MBTI93") return 93;
  return 60;
}

function parseAnswers(input: unknown): LikertAnswer[] {
  if (!Array.isArray(input)) return [];

  const byQuestion = new Map<number, LikertAnswer>();
  for (const item of input) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    const questionId = Number(record.questionId ?? record.question_id ?? record.id);
    const value = Number(record.answer ?? record.value ?? record.answerValue);

    if (
      Number.isInteger(questionId) &&
      questionId > 0 &&
      Number.isInteger(value) &&
      value >= 1 &&
      value <= 5
    ) {
      byQuestion.set(questionId, {
        questionId,
        value: value as LikertValue,
      });
    }
  }

  return Array.from(byQuestion.values()).sort(
    (left, right) => left.questionId - right.questionId,
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const accessKey = clean(body?.accessKey || body?.key || body?.sessionId);

    if (!accessKey) {
      return NextResponse.json(
        { code: 400, message: "缺少测评会话", data: null },
        { status: 400 },
      );
    }

    const db = getDatabaseAdmin();
    const { data: session, error: sessionError } = await db
      .from("test_sessions")
      .select(
        "id,access_key,mode,status,enterprise_id,employee_id,group_id,activation_code_id,test_type_id,bank_id,gender,result_visibility,started_at,completed_at,duration_seconds,created_at",
      )
      .eq("access_key", accessKey)
      .maybeSingle();

    if (sessionError) throw new Error(sessionError.message);
    if (!session) {
      return NextResponse.json(
        { code: 404, message: "测评会话不存在", data: null },
        { status: 404 },
      );
    }

    const version = versionFromBank(String(session.bank_id));
    const answers = parseAnswers(body?.answers || body?.answerList || body?.responses);
    const questionBank = getQuestionBank(version);

    if (answers.length !== questionBank.length) {
      return NextResponse.json(
        {
          code: 400,
          message: `答案数量不完整，应为 ${questionBank.length} 题，实际为 ${answers.length} 题`,
          data: null,
        },
        { status: 400 },
      );
    }

    const questionIds = new Set(questionBank.map((question) => question.id));
    if (answers.some((answer) => !questionIds.has(answer.questionId))) {
      return NextResponse.json(
        { code: 400, message: "答案中包含无效题目", data: null },
        { status: 400 },
      );
    }

    if (session.mode === "enterprise" && session.status !== "in_progress") {
      if (session.status !== "completed") {
        return NextResponse.json(
          { code: 409, message: "请先确认企业员工信息", data: null },
          { status: 409 },
        );
      }
    }

    const calculation = calculateLikertMBTI(version, answers);
    const report = generateLikertReport(calculation);
    const completedAt = new Date().toISOString();
    const startedAt = session.started_at
      ? new Date(session.started_at).getTime()
      : Date.now();
    const durationSeconds = Math.max(
      0,
      Math.floor((Date.now() - startedAt) / 1000),
    );

    const answerRows = answers.map((answer) => {
      const question = questionBank.find((item) => item.id === answer.questionId)!;
      return {
        session_id: session.id,
        question_id: answer.questionId,
        answer_value: answer.value,
        dimension: question.dimension,
        reverse_scored: question.reverse,
        normalized_score: calculateQuestionScore(question, answer.value),
        answered_at: completedAt,
      };
    });

    const { error: answersError } = await db
      .from("test_answers")
      .upsert(answerRows, { onConflict: "session_id,question_id" });
    if (answersError) throw new Error(`保存逐题答案失败: ${answersError.message}`);

    const dimensionScores = calculation.dimensionScores;
    const resultRow = {
      session_id: session.id,
      mbti_type: calculation.type,
      ei_score: dimensionScores.EI.percentage,
      sn_score: dimensionScores.SN.percentage,
      tf_score: dimensionScores.TF.percentage,
      jp_score: dimensionScores.JP.percentage,
      dimension_scores: dimensionScores,
      report,
      report_version: "1",
      calculation_version: `likert-${version}-v1`,
    };

    const { data: storedResult, error: resultError } = await db
      .from("mbti_results")
      .upsert(resultRow, { onConflict: "session_id" })
      .select("id,mbti_type,ei_score,sn_score,tf_score,jp_score,report,created_at")
      .single();
    if (resultError) throw new Error(`保存测评结果失败: ${resultError.message}`);

    const { error: completionError } = await db
      .from("test_sessions")
      .update({
        status: "completed",
        gender: clean(body?.gender) || session.gender || "unspecified",
        completed_at: completedAt,
        duration_seconds: durationSeconds,
      })
      .eq("id", session.id);
    if (completionError) {
      throw new Error(`完成测评会话失败: ${completionError.message}`);
    }

    if (session.mode === "enterprise" && session.activation_code_id) {
      const { error: codeError } = await db
        .from("activation_codes")
        .update({ status: "completed", completed_at: completedAt, remaining_uses: 0 })
        .eq("id", session.activation_code_id)
        .eq("claimed_session_id", session.id);
      if (codeError) throw new Error(`完成企业激活码失败: ${codeError.message}`);

      await db.from("activation_code_events").insert({
        activation_code_id: session.activation_code_id,
        session_id: session.id,
        enterprise_id: session.enterprise_id,
        employee_id: session.employee_id,
        event_type: "completed",
        before_remaining_uses: 1,
        after_remaining_uses: 0,
        details: { mbti_type: calculation.type, duration_seconds: durationSeconds },
      });
    }

    return NextResponse.json({
      code: 0,
      message: "测评完成，全部记录已写入 PostgreSQL",
      data: {
        id: storedResult.id,
        accessKey,
        session_id: session.id,
        mbti_type: storedResult.mbti_type,
        ei_score: storedResult.ei_score,
        sn_score: storedResult.sn_score,
        tf_score: storedResult.tf_score,
        jp_score: storedResult.jp_score,
        report: storedResult.report,
        reportType: session.mode,
        report_type: session.mode,
        employeeResultVisibility: session.result_visibility,
        employee_result_visibility: session.result_visibility,
        enterpriseId: session.enterprise_id,
        enterprise_id: session.enterprise_id,
        groupId: session.group_id,
        group_id: session.group_id,
        employeeId: session.employee_id,
        employee_id: session.employee_id,
        startedAt: session.started_at,
        started_at: session.started_at,
        completedAt,
        completed_at: completedAt,
        durationSeconds,
        duration_seconds: durationSeconds,
        createdAt: storedResult.created_at,
        created_at: storedResult.created_at,
      },
    });
  } catch (error) {
    console.error("MBTI analysis failed:", error);
    return NextResponse.json(
      {
        code: 500,
        message: error instanceof Error ? error.message : "测评结果保存失败",
        data: null,
      },
      { status: 500 },
    );
  }
}
