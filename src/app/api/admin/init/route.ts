import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      code: 410,
      message: "该初始化接口已停用，请使用受 ADMIN_SETUP_SECRET 保护的 /api/admin/setup",
      data: null,
    },
    { status: 410 },
  );
}
