import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/server/auth";
import { getDatabaseAdmin } from "@/lib/server/database";

export async function GET(request: NextRequest) {
  try {
    const session = await requireAdminSession(request, "platform");
    if (!session) {
      return NextResponse.json({ code: 401, message: "请先登录平台后台", data: null }, { status: 401 });
    }
    const keyword = String(request.nextUrl.searchParams.get("keyword") || "").trim();
    const db = getDatabaseAdmin();
    let query = db
      .from("enterprises")
      .select("id,code,name,short_name,contact_name,contact_phone,status,credits,expiry_at,created_at,updated_at")
      .order("created_at", { ascending: false });
    if (keyword) {
      const safe = keyword.replace(/[%_,]/g, "");
      query = query.or(`code.ilike.%${safe}%,name.ilike.%${safe}%,short_name.ilike.%${safe}%,contact_phone.ilike.%${safe}%`);
    }
    const { data: enterprises, error } = await query;
    if (error) throw new Error(error.message);

    const ids = (enterprises || []).map((item) => item.id);
    let admins: Array<Record<string, unknown>> = [];
    let counts: Array<Record<string, unknown>> = [];
    if (ids.length > 0) {
      const [adminQuery, sessionQuery] = await Promise.all([
        db.from("enterprise_admins").select("enterprise_id,username,display_name,phone,role,status").in("enterprise_id", ids).eq("role", "owner"),
        db.from("test_sessions").select("enterprise_id").in("enterprise_id", ids).eq("status", "completed"),
      ]);
      if (adminQuery.error) throw new Error(adminQuery.error.message);
      if (sessionQuery.error) throw new Error(sessionQuery.error.message);
      admins = adminQuery.data || [];
      counts = sessionQuery.data || [];
    }

    const list = (enterprises || []).map((enterprise) => {
      const admin = admins.find((item) => item.enterprise_id === enterprise.id);
      return {
        enterprise_id: enterprise.id,
        id: enterprise.id,
        identity_code: enterprise.code,
        enterpriseCode: enterprise.code,
        enterprise_name: enterprise.name,
        enterpriseName: enterprise.name,
        enterprise_short_name: enterprise.short_name,
        username: admin?.username || null,
        adminAccount: admin?.username || null,
        contact_name: enterprise.contact_name,
        contact_person: enterprise.contact_name,
        contact_phone: enterprise.contact_phone,
        phone: enterprise.contact_phone,
        status: enterprise.status === "disabled" ? "frozen" : "normal",
        database_status: enterprise.status,
        remaining_points: enterprise.credits,
        credits: enterprise.credits,
        expiry_at: enterprise.expiry_at,
        created_at: enterprise.created_at,
        createdAt: enterprise.created_at,
        test_count: counts.filter((item) => item.enterprise_id === enterprise.id).length,
      };
    });

    return NextResponse.json({ code: 0, message: "success", data: { enterprises: list, total: list.length } });
  } catch (error) {
    console.error("Read platform enterprises failed:", error);
    return NextResponse.json({ code: 500, message: "读取企业列表失败", data: null }, { status: 500 });
  }
}
