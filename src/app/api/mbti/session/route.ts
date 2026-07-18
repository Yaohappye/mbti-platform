import { NextRequest, NextResponse } from "next/server";
import { findTestTypeByBankId } from "@/data/test-catalog";
import { getDatabaseAdmin } from "@/lib/server/database";
import {
  getRequestIp,
  getRequestUserAgent,
} from "@/lib/server/request-context";

function createAccessKey() {
  return `mbti_${crypto.randomUUID()}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const bankId = String(body?.testType || body?.bankId || "MBTI60")
      .trim()
      .toUpperCase();
    const catalog = findTestTypeByBankId(bankId);

    if (!catalog || !catalog.testType.enabled || !catalog.bank.enabled) {
      return NextResponse.json(
        { code: 400, message: "题库不存在或未启用", data: null },
        { status: 400 },
      );
    }

    const accessKey = String(body?.accessKey || "").trim() || createAccessKey();
    const db = getDatabaseAdmin();
    const { data: existing, error: readError } = await db
      .from("test_sessions")
      .select("id,mode,status,activation_code_id")
      .eq("access_key", accessKey)
      .maybeSingle();

    if (readError) throw new Error(readError.message);

    let session;
    if (existing) {
      const { data, error } = await db
        .from("test_sessions")
        .update({
          test_type_id: catalog.testType.id,
          bank_id: catalog.bank.id,
          status: existing.status === "created" ? "in_progress" : existing.status,
          started_at: new Date().toISOString(),
        })
        .eq("id", existing.id)
        .select("id,access_key,test_type_id,bank_id,mode,status")
        .single();
      if (error) throw new Error(error.message);
      session = data;
    } else {
      const { data, error } = await db
        .from("test_sessions")
        .insert({
          access_key: accessKey,
          test_type_id: catalog.testType.id,
          bank_id: catalog.bank.id,
          mode: "personal",
          status: "in_progress",
          result_visibility: "full",
          started_at: new Date().toISOString(),
          ip_address: getRequestIp(request),
          user_agent: getRequestUserAgent(request),
        })
        .select("id,access_key,test_type_id,bank_id,mode,status")
        .single();
      if (error) throw new Error(error.message);
      session = data;
    }

    return NextResponse.json({
      code: 0,
      message: "测评会话已创建",
      data: {
        sessionId: session.id,
        accessKey: session.access_key,
        testTypeId: session.test_type_id,
        testType: session.bank_id,
        bankId: session.bank_id,
        mode: session.mode,
      },
    });
  } catch (error) {
    console.error("Create MBTI session failed:", error);
    return NextResponse.json(
      { code: 500, message: "创建测评会话失败", data: null },
      { status: 500 },
    );
  }
}
