
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import EnterpriseTestGroupsPanel from "@/components/enterprise/EnterpriseTestGroupsPanel";
import { getTestTypeNameByBankId } from "@/data/test-catalog";

interface TestResult {
  id: string;
  session_id: string;
  mbti_type: string;
  employee_name: string | null;
  department: string | null;
  gender: string | null;
  test_type: string | null;
  group_name: string | null;
  started_at: string | null;
  ended_at: string | null;
  duration_seconds: number | null;
  created_at: string;
}

interface EnterpriseProfileBox {
  account: string;
  enterpriseName: string;
  enterpriseShortName: string;
  credits: number;
  avatar: string;
}

export default function EnterpriseAdminPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<"groups" | "results">("groups");
  const [results, setResults] = useState<TestResult[]>([]);
  const [keyword, setKeyword] = useState("");
  const [department, setDepartment] = useState("");
  const [enterpriseName, setEnterpriseName] = useState("");
  const [enterpriseProfile, setEnterpriseProfile] = useState<EnterpriseProfileBox>({
    account: "-",
    enterpriseName: "-",
    enterpriseShortName: "-",
    credits: 0,
    avatar: "",
  });
  const [loading, setLoading] = useState(true);
  const [showCustomerServiceQr, setShowCustomerServiceQr] = useState(false);
  useEffect(() => {
    const cachedEnterpriseCode =
      localStorage.getItem("enterprise_code") ||
      localStorage.getItem("enterprise_login_code") ||
      "";
    const cachedEnterpriseName =
      localStorage.getItem("enterprise_name") ||
      localStorage.getItem("enterprise_login_name") ||
      "";

    // Prime the first screen from the successful login response. This lets the
    // groups request start immediately while the complete profile loads.
    if (cachedEnterpriseCode || cachedEnterpriseName) {
      setEnterpriseProfile((current) => ({
        ...current,
        account: cachedEnterpriseCode || current.account,
        enterpriseName: cachedEnterpriseName || current.enterpriseName,
      }));
      if (cachedEnterpriseName) {
        setEnterpriseName(cachedEnterpriseName);
      }
    }

    void loadEnterpriseProfile();
  }, []);

  useEffect(() => {
    if (activeSection === "results") {
      void fetchResults();
    }
  }, [activeSection]);

  const loadEnterpriseProfile = async () => {
    try {
      const response = await fetch("/api/admin/enterprise/profile");
      const result = await response.json();
      if (response.status === 401) {
        router.replace("/mbti-home?enterpriseLogin=1");
        return;
      }
      if (!response.ok || result.code !== 0) throw new Error(result.message);
      const data = result.data || {};
      const profile = {
        account: String(data.enterpriseCode || "-"),
        enterpriseName: String(data.enterpriseName || "-"),
        enterpriseShortName: String(data.enterpriseShortName || "-"),
        credits: Number(data.credits) || 0,
        avatar: String(data.avatar || ""),
      };

      setEnterpriseProfile(profile);
      if (profile.enterpriseName && profile.enterpriseName !== "-") {
        setEnterpriseName(profile.enterpriseName);
      }
    } catch (error) {
      console.error("读取企业资料失败:", error);
      toast.error("企业资料加载失败，请稍后重试");
    }
  };
const fetchResults = async () => {
    setLoading(true);
    try {
      let url = "/api/admin/enterprise/results?";
      if (keyword) url += `&keyword=${encodeURIComponent(keyword)}`;
      if (department) url += `&department=${encodeURIComponent(department)}`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.code === 0) {
        setResults(data.data.list);
      }
    } catch (error) {
      toast.error("获取员工数据失败");
    } finally {
      setLoading(false);
    }
  };
const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" }).catch(() => null);
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_role");
    localStorage.removeItem("admin_username");
    localStorage.removeItem("admin_id");
    localStorage.removeItem("enterprise_id");
    localStorage.removeItem("enterprise_code");
    localStorage.removeItem("enterprise_name");
    localStorage.removeItem("enterprise_login_code");
    localStorage.removeItem("enterprise_login_account");
    localStorage.removeItem("enterprise_login_name");

    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">{enterpriseName}</h1>
            <p className="text-sm text-gray-500">企业管理员后台</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-2 shadow-sm border border-slate-200">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-xl shadow-inner overflow-hidden">
                  {enterpriseProfile.avatar ? (
                    <img src={enterpriseProfile.avatar} alt="企业头像" className="w-full h-full object-cover" />
                  ) : (
                    <span>🏢</span>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-500">我的企业</div>
                  <div className="text-lg font-bold text-slate-900 leading-tight">
                    {enterpriseProfile.account}
                  </div>
                </div>
              </div>

              <div className="absolute right-0 top-[58px] z-50 w-[420px] rounded-[28px] bg-white shadow-2xl border border-slate-100 overflow-hidden opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                <div className="relative m-5 rounded-3xl bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-5 overflow-hidden">
                  <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-200/30 rounded-full blur-2xl"></div>
                  <div className="absolute right-8 bottom-0 text-6xl opacity-10">🏢</div>

                  <div className="relative flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-3xl border border-white overflow-hidden">
                        {enterpriseProfile.avatar ? (
                          <img src={enterpriseProfile.avatar} alt="企业头像" className="w-full h-full object-cover" />
                        ) : (
                          <span>🏢</span>
                        )}
                      </div>
                      <div className="absolute -right-1 -bottom-1 w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs shadow">
                        ✓
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="text-2xl font-black text-slate-950 truncate">
                        {enterpriseProfile.account}
                      </div>
                      <div className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-sm font-semibold text-indigo-600 shadow-sm">
                        <span>企业编号</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-5 space-y-1">
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => router.push("/admin/enterprise/settings")}
                      className="w-full flex items-center justify-between rounded-2xl px-3 py-3 hover:bg-slate-50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-semibold">
                          设
                        </span>
                        <span className="font-medium text-slate-700">基本信息设置</span>
                      </div>
                      <span className="text-slate-300">›</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => router.push("/admin/enterprise/points")}
                      className="w-full flex items-center justify-between rounded-2xl px-3 py-3 hover:bg-slate-50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-semibold">
                          积
                        </span>
                        <span className="font-medium text-slate-700">我的积分</span>
                      </div>
                      <span className="font-black text-indigo-600 text-xl">
                        {enterpriseProfile.credits}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toast.info("建议反馈功能暂未接入")}
                      className="w-full flex items-center justify-between rounded-2xl px-3 py-3 hover:bg-slate-50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-semibold">
                          反
                        </span>
                        <span className="font-medium text-slate-700">建议反馈</span>
                      </div>
                      <span className="text-slate-300">›</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toast.info("关于我们功能暂未接入")}
                      className="w-full flex items-center justify-between rounded-2xl px-3 py-3 hover:bg-slate-50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-semibold">
                          关
                        </span>
                        <span className="font-medium text-slate-700">关于我们</span>
                      </div>
                      <span className="text-slate-300">›</span>
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-2 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setShowCustomerServiceQr(true)}
                      className="py-4 text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors"
                    >
                      在线客服
                    </button>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="py-4 text-purple-600 font-semibold hover:bg-purple-50 transition-colors border-l border-slate-200"
                    >
                      退出登录
                    </button>
                  </div></div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-6">
        <aside className="w-[230px] shrink-0">
          <div className="sticky top-6 rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="mb-3 px-3 pt-2 text-xs font-bold tracking-wider text-slate-400">
              企业测评管理
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setActiveSection("groups")}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left font-semibold transition ${
                  activeSection === "groups"
                    ? "bg-slate-950 text-white shadow-lg"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-xl text-sm ${
                    activeSection === "groups"
                      ? "bg-white/15 text-white"
                      : "bg-indigo-50 text-indigo-600"
                  }`}
                >
                  组
                </span>
                <span>企业测试</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSection("results")}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left font-semibold transition ${
                  activeSection === "results"
                    ? "bg-slate-950 text-white shadow-lg"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-xl text-sm ${
                    activeSection === "results"
                      ? "bg-white/15 text-white"
                      : "bg-emerald-50 text-emerald-600"
                  }`}
                >
                  测
                </span>
                <span>员工测评记录</span>
              </button>
            </div>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          {activeSection === "groups" && (
            <EnterpriseTestGroupsPanel
              enterpriseId={
                enterpriseProfile.account === "-"
                  ? ""
                  : enterpriseProfile.account
              }
              enterpriseName={enterpriseName}
              credits={enterpriseProfile.credits}
              onCreditsChange={(nextCredits) =>
                setEnterpriseProfile((current) => ({
                  ...current,
                  credits: nextCredits,
                }))
              }
            />
          )}

          {activeSection === "results" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  员工测评记录
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  查看企业员工的测评信息和结果。
                </p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex flex-wrap gap-4">
                    <Input
                      placeholder="搜索员工姓名"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      className="max-w-xs"
                    />
                    <Input
                      placeholder="筛选部门"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="max-w-xs"
                    />
                    <Button onClick={fetchResults}>搜索</Button>
                    <Button variant="outline" className="ml-auto">
                      导出Excel
                    </Button>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>员工姓名</TableHead>
                        <TableHead>部门</TableHead>
                        <TableHead>测试分组</TableHead>
                        <TableHead>题库</TableHead>
                        <TableHead>测试题型</TableHead>
                        <TableHead>开始答题</TableHead>
                        <TableHead>结束答题</TableHead>
                        <TableHead>答题时长</TableHead>
                        <TableHead>操作</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center">
                            加载中...
                          </TableCell>
                        </TableRow>
                      ) : results.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center">
                            暂无员工测试记录
                          </TableCell>
                        </TableRow>
                      ) : (
                        results.map((r) => (
                          <TableRow key={r.id}>
                            <TableCell>
                              {r.employee_name || "匿名"}
                            </TableCell>
                            <TableCell>{r.department || "-"}</TableCell>
                            <TableCell>{r.group_name || "-"}</TableCell>
                            <TableCell>{r.test_type || "-"}</TableCell>
                            <TableCell>
                              <Badge variant="default">
                                {getTestTypeNameByBankId(r.test_type || "") || r.test_type || "-"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {r.started_at
                                ? new Date(r.started_at).toLocaleString()
                                : "-"}
                            </TableCell>
                            <TableCell>
                              {r.ended_at
                                ? new Date(r.ended_at).toLocaleString()
                                : "-"}
                            </TableCell>
                            <TableCell>
                              {r.duration_seconds !== null &&
                              r.duration_seconds !== undefined
                                ? `${Math.floor(r.duration_seconds / 60)}分${r.duration_seconds % 60}秒`
                                : "-"}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  window.open(
                                    `/result?key=${r.session_id}&type=${r.test_type || "MBTI60"}&view=enterprise`,
                                    "_blank"
                                  )
                                }
                              >
                                查看完整报告
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </section>
      </main>

      {showCustomerServiceQr && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowCustomerServiceQr(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">在线客服</h2>
              <button
                type="button"
                onClick={() => setShowCustomerServiceQr(false)}
                className="rounded-xl px-3 py-2 text-sm text-slate-500 hover:bg-slate-100"
              >
                关闭
              </button>
            </div>

            <p className="mt-3 text-center text-sm text-slate-500">
              请使用微信扫描下方二维码联系客服
            </p>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <img
                src="/customer-service-qr.png"
                alt="在线客服二维码"
                className="mx-auto w-full max-w-[320px] rounded-2xl bg-white object-contain"
              />
            </div>

            <div className="mt-5 rounded-2xl bg-indigo-50 px-4 py-3 text-center text-sm text-indigo-700">
              账号、积分或企业资料问题，请扫码联系客服处理。
            </div>
          </div>
        </div>
      )}

    </div>
  );
}


