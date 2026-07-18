import { NextRequest, NextResponse } from "next/server";
import {
  MBTI60_LIKERT,
  MBTI93_LIKERT,
  MBTI200_LIKERT,
  Version,
} from "@/data/mbti-questions-likert";
import { findTestTypeByBankId } from "@/data/test-catalog";

const likertOptions = [
  { key: "完全不符合", value: 1 },
  { key: "不太符合", value: 2 },
  { key: "中立 / 一般", value: 3 },
  { key: "比较符合", value: 4 },
  { key: "完全符合", value: 5 },
];

export async function GET(request: NextRequest) {
  try {
    const requestedType =
      request.nextUrl.searchParams.get("type") ||
      "MBTI60";
    const catalogMatch =
      findTestTypeByBankId(requestedType);

    if (
      !catalogMatch ||
      !catalogMatch.testType.enabled ||
      !catalogMatch.bank.enabled
    ) {
      return NextResponse.json(
        {
          code: 400,
          message: "题库不存在或未启用",
          data: null,
        },
        { status: 400 },
      );
    }

    const testType = catalogMatch.bank.id;
    let questions;
    let version: Version;

    switch (testType) {
      case "MBTI93":
        questions = MBTI93_LIKERT;
        version = 93;
        break;
      case "MBTI200":
        questions = MBTI200_LIKERT;
        version = 200;
        break;
      case "MBTI60":
      default:
        questions = MBTI60_LIKERT;
        version = 60;
        break;
    }

    const formattedQuestions = questions.map((q) => ({
      quizInfo: {
        id: q.id,
        testId: 1,
        quizNo: q.id,
        content: q.content,
        type: testType,
        dimension: q.dimension,
        reverse: q.reverse,
      },
      answers: likertOptions,
    }));

    return NextResponse.json({
      code: 0,
      message: "success",
      data: formattedQuestions,
      meta: {
        testTypeId: catalogMatch.testType.id,
        testTypeName: catalogMatch.testType.name,
        bankId: catalogMatch.bank.id,
        bankName: catalogMatch.bank.name,
        version,
        totalQuestions: questions.length,
        dimensions: ["EI", "SN", "TF", "JP"],
      },
    });
  } catch (error) {
    console.error("获取题目失败:", error);

    return NextResponse.json(
      {
        code: 500,
        message: "服务器错误",
      },
      { status: 500 },
    );
  }
}
