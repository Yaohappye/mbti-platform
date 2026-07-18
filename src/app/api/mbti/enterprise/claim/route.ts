import { NextRequest, NextResponse } from "next/server";
import { getDatabaseAdmin } from "@/lib/server/database";
import {
  getRequestIp,
  getRequestUserAgent,
} from "@/lib/server/request-context";

function clean(value: unknown) {
  return String(value || "").trim();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const activationCode = clean(body?.activationCode).toUpperCase();
    const accessKey = clean(body?.sessionId || body?.accessKey);
    const enterpriseId = clean(body?.enterpriseId);
    const groupId = clean(body?.groupId);
    const employeeName = clean(body?.employeeName);
    const department = clean(body?.department);
    const phone = clean(body?.phone);
    const gender = ["male", "female"].includes(clean(body?.gender))
      ? clean(body?.gender)
      : "unspecified";

    if (!activationCode || !accessKey || !enterpriseId || !groupId) {
      return NextResponse.json(
        { code: 400, message: "企业激活信息不完整", data: null },
        { status: 400 },
      );
    }
    if (!employeeName || !department) {
      return NextResponse.json(
        { code: 400, message: "请填写员工姓名和部门", data: null },
        { status: 400 },
      );
    }
    if (phone && !/^1[3-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { code: 400, message: "手机号格式不正确", data: null },
        { status: 400 },
      );
    }

    const db = getDatabaseAdmin();
    const { data, error } = await db.rpc("claim_enterprise_activation_code", {
      p_code: activationCode,
      p_access_key: accessKey,
      p_enterprise_id: enterpriseId,
      p_group_id: groupId,
      p_employee_name: employeeName,
      p_department: department,
      p_phone: phone || null,
      p_gender: gender,
      p_ip: getRequestIp(request),
      p_user_agent: getRequestUserAgent(request),
    });

    if (error) {
      const message = error.message || "";
      const unavailable = message.includes("ACTIVATION_CODE_UNAVAILABLE");
      const notFound =
        message.includes("ACTIVATION_CODE_NOT_FOUND") ||
        message.includes("TEST_SESSION_NOT_FOUND");
      return NextResponse.json(
        {
          code: unavailable ? 409 : notFound ? 404 : 500,
          message: unavailable
            ? "企业激活码已被领取、使用或作废"
            : notFound
              ? "企业激活码或测评会话不存在"
              : "企业激活码领取失败",
          data: null,
        },
        { status: unavailable ? 409 : notFound ? 404 : 500 },
      );
    }

    const result = (data || {}) as Record<string, unknown>;
    return NextResponse.json({
      code: 0,
      message: "员工信息已确认，激活码领取成功",
      data: {
        ...result,
        claimedAt: result.claimedAt || new Date().toISOString(),
        startedAt: result.startedAt || new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Claim enterprise activation code failed:", error);
    return NextResponse.json(
      { code: 500, message: "企业激活码领取服务暂不可用", data: null },
      { status: 500 },
    );
  }
}
