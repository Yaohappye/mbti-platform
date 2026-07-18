import { NextRequest, NextResponse } from "next/server";
import { getDatabaseAdmin } from "@/lib/server/database";
import {
  getRequestIp,
  getRequestUserAgent,
} from "@/lib/server/request-context";

function normalizeCode(value: unknown) {
  return String(value || "").trim().toUpperCase();
}

function errorResponse(message: string, status: number) {
  return NextResponse.json(
    { code: status, message, data: { verified: false } },
    { status },
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const inputCode = normalizeCode(
      body?.activationCode || body?.code || body?.password,
    );
    const accessKey =
      String(body?.sessionId || body?.accessKey || "").trim() ||
      `mbti_${crypto.randomUUID()}`;

    if (!/^[A-Z0-9]{8}$/.test(inputCode)) {
      return errorResponse("请输入8位激活码", 400);
    }

    const db = getDatabaseAdmin();
    const { data, error } = await db.rpc("consume_activation_code", {
      p_code: inputCode,
      p_access_key: accessKey,
      p_ip: getRequestIp(request),
      p_user_agent: getRequestUserAgent(request),
    });

    if (error) {
      const message = error.message || "";
      if (message.includes("ACTIVATION_CODE_NOT_FOUND")) {
        return errorResponse("激活码不存在", 401);
      }
      if (message.includes("ACTIVATION_CODE_EXPIRED")) {
        return errorResponse("激活码已过期", 401);
      }
      if (message.includes("ACTIVATION_CODE_UNAVAILABLE")) {
        return errorResponse("激活码已使用、已领取或已作废", 409);
      }
      if (message.includes("ENTERPRISE_OR_GROUP_UNAVAILABLE")) {
        return errorResponse("企业或测试分组当前不可用", 403);
      }
      throw new Error(message);
    }

    const result = (data || {}) as Record<string, unknown>;
    const enterpriseMode = result.scope === "enterprise";

    return NextResponse.json({
      code: 0,
      message: enterpriseMode ? "企业激活码验证成功" : "激活码验证成功",
      data: {
        verified: true,
        activationMode: enterpriseMode ? "enterprise" : "personal",
        activationCode: inputCode,
        accessKey: String(result.accessKey || accessKey),
        activationKind: result.kind || null,
        remainingUses: result.remainingUses ?? null,
        enterpriseId: result.enterpriseId || null,
        enterpriseCode: result.enterpriseCode || null,
        enterpriseName: result.enterpriseName || null,
        groupId: result.groupId || null,
        groupCode: result.groupCode || null,
        groupName: result.groupName || null,
        groupNote: result.groupNote || "无",
        testTypeId: result.testTypeId || "MBTI",
        testType: result.bankId || "MBTI60",
        bankId: result.bankId || "MBTI60",
        resultVisibility: result.resultVisibility || "full",
      },
    });
  } catch (error) {
    console.error("Activation code verification failed:", error);
    return errorResponse("激活码验证服务暂不可用", 500);
  }
}
