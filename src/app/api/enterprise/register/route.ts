import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { getDatabaseAdmin } from "@/lib/server/database";

const CODE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function clean(value: unknown) {
  return String(value || "").trim();
}

function randomEnterpriseCode() {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  let value = Array.from(bytes, (byte) => CODE_CHARS[byte % CODE_CHARS.length]).join("");
  if (!/[A-Z]/.test(value)) value = `A${value.slice(1)}`;
  if (!/\d/.test(value)) value = `${value.slice(0, -1)}1`;
  return value;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const enterpriseName = clean(body?.enterpriseName);
    const enterpriseShortName = clean(body?.enterpriseShortName);
    const phone = clean(body?.phone);
    const adminAccount = clean(body?.adminAccount);
    const password = String(body?.password || "");

    if (!enterpriseName || !phone || !adminAccount || !password) {
      return NextResponse.json(
        { code: 400, message: "请完整填写企业注册信息", data: null },
        { status: 400 },
      );
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { code: 400, message: "手机号格式不正确", data: null },
        { status: 400 },
      );
    }
    if (password.length < 8 || password.length > 72) {
      return NextResponse.json(
        { code: 400, message: "密码长度必须在8到72位之间", data: null },
        { status: 400 },
      );
    }

    const passwordHash = await hash(password, 12);
    const db = getDatabaseAdmin();
    let registered: Record<string, unknown> | null = null;
    let lastMessage = "";

    for (let attempt = 0; attempt < 8 && !registered; attempt += 1) {
      const { data, error } = await db.rpc("register_enterprise", {
        p_code: randomEnterpriseCode(),
        p_enterprise_name: enterpriseName,
        p_short_name: enterpriseShortName || null,
        p_phone: phone,
        p_admin_username: adminAccount,
        p_password_hash: passwordHash,
      });

      if (!error && data) {
        registered = data as Record<string, unknown>;
      } else {
        lastMessage = error?.message || "注册失败";
        if (lastMessage.includes("ENTERPRISE_USERNAME_EXISTS")) break;
      }
    }

    if (!registered) {
      const exists = lastMessage.includes("ENTERPRISE_USERNAME_EXISTS");
      return NextResponse.json(
        {
          code: exists ? 409 : 500,
          message: exists ? "该企业登录账号已被注册" : "企业注册失败",
          data: null,
        },
        { status: exists ? 409 : 500 },
      );
    }

    return NextResponse.json({
      code: 0,
      message: "企业注册成功，现在可以直接登录",
      data: registered,
    });
  } catch (error) {
    console.error("Enterprise registration failed:", error);
    return NextResponse.json(
      { code: 500, message: "企业注册服务暂不可用", data: null },
      { status: 500 },
    );
  }
}
