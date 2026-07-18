"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

interface RechargeRecord {
  id: string;
  points: number;
  createdAt: string;
  source: string;
}

export default function EnterprisePointsPage() {
  const router = useRouter();
  const [credits, setCredits] = useState(0);
  const [enterpriseName, setEnterpriseName] = useState("-");
  const [showRechargeQr, setShowRechargeQr] = useState(false);
  const [rechargeCode, setRechargeCode] = useState("");
  const [redeeming, setRedeeming] = useState(false);
  const [rechargeRecords, setRechargeRecords] =
    useState<RechargeRecord[]>([]);

  useEffect(() => {
    const loadCredits = async () => {
      try {
        const [profileResponse, creditsResponse] = await Promise.all([
          fetch("/api/admin/enterprise/profile", { cache: "no-store" }),
          fetch("/api/admin/enterprise/credits", { cache: "no-store" }),
        ]);

        if (profileResponse.status === 401 || creditsResponse.status === 401) {
          router.replace("/admin/login");
          return;
        }

        const [profileResult, creditsResult] = await Promise.all([
          profileResponse.json(),
          creditsResponse.json(),
        ]);
        if (!profileResponse.ok || profileResult?.code !== 0) {
          throw new Error(profileResult?.message || "读取企业资料失败");
        }
        if (!creditsResponse.ok || creditsResult?.code !== 0) {
          throw new Error(creditsResult?.message || "读取积分记录失败");
        }

        setEnterpriseName(profileResult.data?.enterpriseName || "-");
        setCredits(Number(creditsResult.data?.credits) || 0);
        setRechargeRecords(
          (Array.isArray(creditsResult.data?.list) ? creditsResult.data.list : [])
            .filter((item: { amount?: number }) => Number(item.amount) > 0)
            .map((item: { id: string; amount: number; created_at: string; entry_type?: string }) => ({
              id: item.id,
              points: Number(item.amount),
              createdAt: item.created_at,
              source: item.entry_type || "recharge",
            }))
        );
      } catch (error) {
        console.error("读取企业积分失败：", error);
      }
    };

    void loadCredits();
  }, [router]);

  const handleRedeem = async () => {
    const code = rechargeCode.trim().toUpperCase();
    if (!/^[A-HJ-NP-Z2-9]{10}$/.test(code)) {
      toast.error("请输入正确的10位充值码");
      return;
    }

    setRedeeming(true);
    try {
      const response = await fetch("/api/admin/enterprise/credits/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const result = await response.json();
      if (!response.ok || result?.code !== 0) {
        throw new Error(result?.message || "充值码兑换失败");
      }

      setCredits(Number(result.data?.credits) || 0);
      setRechargeCode("");
      const creditsResponse = await fetch("/api/admin/enterprise/credits", {
        cache: "no-store",
      });
      const creditsResult = await creditsResponse.json();
      if (creditsResponse.ok && creditsResult?.code === 0) {
        setRechargeRecords(
          (Array.isArray(creditsResult.data?.list) ? creditsResult.data.list : [])
            .filter((item: { amount?: number }) => Number(item.amount) > 0)
            .map((item: { id: string; amount: number; created_at: string; entry_type?: string }) => ({
              id: item.id,
              points: Number(item.amount),
              createdAt: item.created_at,
              source: item.entry_type || "recharge",
            }))
        );
      }
      toast.success(result.message || "充值成功");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "充值码兑换失败");
    } finally {
      setRedeeming(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              企业积分中心
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {enterpriseName}
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => router.push("/admin/enterprise")}
          >
            返回企业后台
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-9 text-white">
              <div className="text-sm text-white/80">
                当前可用积分
              </div>
              <div className="mt-2 text-5xl font-black">
                {credits}
              </div>
              <div className="mt-3 text-sm text-white/75">
                企业积分可用于员工测评及平台相关服务
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>充值码兑换</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                value={rechargeCode}
                onChange={(event) =>
                  setRechargeCode(event.target.value.toUpperCase().replace(/[^A-HJ-NP-Z2-9]/g, "").slice(0, 10))
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") void handleRedeem();
                }}
                placeholder="请输入10位企业充值码"
                className="h-11 font-mono tracking-widest"
              />
              <Button
                onClick={() => void handleRedeem()}
                disabled={redeeming || rechargeCode.length !== 10}
                className="h-11 min-w-28 bg-indigo-600 hover:bg-indigo-700"
              >
                {redeeming ? "兑换中..." : "立即兑换"}
              </Button>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              充值码只能使用一次；兑换结果、积分变化和操作时间都会保存在数据库中。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>充值积分</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-5 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  联系客服充值
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  点击充值后扫描微信二维码，联系客服说明企业编号和需要充值的积分数量。
                </p>
              </div>

              <Button
                onClick={() => setShowRechargeQr(true)}
                className="min-w-32 bg-indigo-600 hover:bg-indigo-700"
              >
                立即充值
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>充值说明</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 text-sm text-slate-600 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 p-5">
                <div className="mb-2 font-bold text-slate-900">
                  1. 联系客服
                </div>
                扫描客服微信二维码，说明企业编号。
              </div>

              <div className="rounded-2xl border border-slate-200 p-5">
                <div className="mb-2 font-bold text-slate-900">
                  2. 确认积分
                </div>
                告诉客服需要充值的具体积分数量。
              </div>

              <div className="rounded-2xl border border-slate-200 p-5">
                <div className="mb-2 font-bold text-slate-900">
                  3. 等待到账
                </div>
                客服处理完成后，刷新页面查看最新积分。
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>充值记录</CardTitle>
          </CardHeader>
          <CardContent>
            {rechargeRecords.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-12 text-center text-sm text-slate-400">
                暂无可追溯的充值记录。启用记录功能前增加的积分不会自动补录。
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <div className="grid grid-cols-[1fr_120px] bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-600">
                  <div>充值时间</div>
                  <div className="text-center">充值积分</div>
                </div>

                {rechargeRecords.map((record) => (
                  <div
                    key={record.id}
                    className="grid grid-cols-[1fr_120px] items-center border-t border-slate-100 px-5 py-4 text-sm"
                  >
                    <div className="text-slate-600">
                      {new Date(record.createdAt).toLocaleString(
                        "zh-CN"
                      )}
                    </div>
                    <div className="text-center text-lg font-bold text-indigo-600">
                      +{record.points}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {showRechargeQr && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          onClick={() => setShowRechargeQr(false)}
        >
          <div
            className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowRechargeQr(false)}
              className="absolute right-5 top-4 text-3xl leading-none text-slate-400 hover:text-slate-700"
              aria-label="关闭"
            >
              ×
            </button>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900">
                微信扫码联系客服
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                请说明企业名称、企业编号和充值积分数量
              </p>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <img
                src="/customer-service-qr.png"
                alt="微信客服二维码"
                className="mx-auto w-full max-w-[320px] rounded-2xl bg-white"
              />
            </div>

            <div className="mt-5 rounded-2xl bg-indigo-50 px-4 py-3 text-center text-sm text-indigo-700">
              添加客服后，请等待客服确认并完成积分充值。
            </div>

            <Button
              onClick={() => setShowRechargeQr(false)}
              variant="outline"
              className="mt-5 w-full"
            >
              关闭
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}


