import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/server/auth";
import { getDatabaseAdmin } from "@/lib/server/database";

export async function GET(request: NextRequest) {
  try {
    const session = await requireAdminSession(request, "enterprise");
    if (!session?.enterpriseId) {
      return NextResponse.json({ code: 401, message: "请先登录企业后台", data: null }, { status: 401 });
    }
    const db = getDatabaseAdmin();
    const [{ data: enterprise, error }, { data: ledger, error: ledgerError }] = await Promise.all([
      db.from("enterprises").select("credits").eq("id", session.enterpriseId).single(),
      db.from("enterprise_credit_ledger").select("id,amount,balance_after,entry_type,reference_type,reference_id,note,created_at").eq("enterprise_id", session.enterpriseId).order("created_at", { ascending: false }).limit(500),
    ]);
    if (error) throw new Error(error.message);
    if (ledgerError) throw new Error(ledgerError.message);
    return NextResponse.json({ code: 0, message: "success", data: { credits: enterprise.credits, list: ledger || [] } });
  } catch (error) {
    console.error("Read enterprise credits failed:", error);
    return NextResponse.json({ code: 500, message: "读取企业积分失败", data: null }, { status: 500 });
  }
}
