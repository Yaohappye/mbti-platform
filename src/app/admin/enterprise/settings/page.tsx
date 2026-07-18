"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface EnterpriseProfile {
  enterpriseCode: string;
  enterpriseName: string;
  enterpriseShortName?: string;
  phone: string;
  adminAccount: string;
  status: string;
  credits: number;
  createdAt: string;
  avatar?: string;
}

export default function EnterpriseSettingsPage() {
  const router = useRouter();

  const [currentEnterprise, setCurrentEnterprise] = useState<EnterpriseProfile | null>(null);

  const [enterpriseName, setEnterpriseName] = useState("");
  const [enterpriseShortName, setEnterpriseShortName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [passwordHelp, setPasswordHelp] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [saving, setSaving] = useState(false);
  const [showCustomerServiceQr, setShowCustomerServiceQr] = useState(false);

  useEffect(() => {
    const loadEnterprise = async () => {
      try {
        const response = await fetch("/api/admin/enterprise/profile", {
          cache: "no-store",
        });
        const result = await response.json();
        if (response.status === 401) {
          router.replace("/admin/login");
          return;
        }
        if (!response.ok || result?.code !== 0 || !result?.data) {
          throw new Error(result?.message || "读取企业资料失败");
        }

        const profile = result.data as EnterpriseProfile;
        setCurrentEnterprise(profile);
        setEnterpriseName(profile.enterpriseName || "");
        setEnterpriseShortName(profile.enterpriseShortName || "");
        setPhone(profile.phone || "");
        setAvatar(profile.avatar || "");
      } catch (error) {
        console.error("读取企业资料失败：", error);
        toast.error(error instanceof Error ? error.message : "读取企业资料失败");
      }
    };

    void loadEnterprise();
  }, [router]);

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("请选择图片文件");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(String(reader.result || ""));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!currentEnterprise) {
      toast.error("没有找到当前企业资料");
      return;
    }

    const name = enterpriseName.trim();
    const shortName = enterpriseShortName.trim();
    const phoneValue = phone.trim();

    if (!name) {
      toast.error("企业名称不能为空");
      return;
    }

    if (!/^\d{11}$/.test(phoneValue)) {
      toast.error("手机号必须是11位数字");
      return;
    }

    setPasswordHelp("");

    const wantChangePassword =
      Boolean(oldPassword.trim() || newPassword.trim() || newPasswordConfirm.trim());

    if (wantChangePassword) {
      if (newPassword.length < 8) {
        setPasswordHelp("新密码长度必须大于等于8位");
        return;
      }

      if (newPassword !== newPasswordConfirm) {
        setPasswordHelp("两次输入的新密码不一致");
        return;
      }
    }

    setSaving(true);

    try {
      const response = await fetch("/api/admin/enterprise/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enterpriseName: name,
          enterpriseShortName: shortName,
          phone: phoneValue,
          avatar,
          ...(wantChangePassword
            ? { currentPassword: oldPassword, newPassword }
            : {}),
        }),
      });
      const result = await response.json();
      if (!response.ok || result?.code !== 0 || !result?.data) {
        if (response.status === 403) {
          setPasswordHelp(result?.message || "当前密码不正确");
          return;
        }
        throw new Error(result?.message || "保存失败，请稍后重试");
      }

      setCurrentEnterprise(result.data as EnterpriseProfile);
      setOldPassword("");
      setNewPassword("");
      setNewPasswordConfirm("");
      setPasswordHelp("");
      setShowPasswordForm(false);

      toast.success("企业信息已保存");
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "保存失败，请稍后重试");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">基本信息设置</h1>
            <p className="text-sm text-slate-500 mt-1">
              修改企业名称、简称、手机号、头像和登录密码
            </p>
          </div>

          <Button variant="outline" onClick={() => router.push("/admin/enterprise")}>
            返回企业后台
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <Card className="rounded-3xl shadow-sm">
          <CardHeader>
            <CardTitle>企业资料</CardTitle>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="flex items-center gap-6 rounded-3xl bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
              <div className="w-24 h-24 rounded-full bg-white shadow flex items-center justify-center overflow-hidden">
                {avatar ? (
                  <img src={avatar} alt="企业头像" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl">🏢</span>
                )}
              </div>

              <div>
                <div className="text-lg font-bold text-slate-900">设置头像</div>
                <p className="text-sm text-slate-500 mt-1">上传企业头像或企业标识</p>

                <div className="mt-4 flex gap-3">
                  <label className="cursor-pointer rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                    选择图片
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </label>

                  <Button variant="outline" onClick={() => setAvatar("")}>
                    清除头像
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  企业名称
                </label>
                <Input
                  value={enterpriseName}
                  onChange={(e) => setEnterpriseName(e.target.value)}
                  placeholder="请输入企业名称"
                  className="h-12 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  企业简称
                </label>
                <Input
                  value={enterpriseShortName}
                  onChange={(e) => setEnterpriseShortName(e.target.value)}
                  placeholder="请输入企业简称"
                  className="h-12 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  负责人手机号
                </label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="请输入11位手机号"
                  className="h-12 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  企业唯一编号
                </label>
                <Input
                  value={currentEnterprise?.enterpriseCode || ""}
                  readOnly
                  className="h-12 rounded-xl bg-slate-50 text-slate-500"
                />
              </div>
            </div>

            <div className="border-t border-slate-200 pt-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <button
                    type="button"
                    onClick={() => setShowPasswordForm((v) => !v)}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 active:scale-[0.98] transition"
                  >
                    {showPasswordForm ? "收起修改密码" : "修改密码"}
                  </button>
                  
                </div>

                
              </div>

              {showPasswordForm && (
                <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        原密码
                      </label>
                      <Input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => {
                          setOldPassword(e.target.value);
                          setPasswordHelp("");
                        }}
                        placeholder="请输入原密码"
                        className="h-12 rounded-xl bg-white"
                      />

                      {passwordHelp && (
                        <div className="mt-2 text-sm text-red-600">
                          {passwordHelp}
                          <button
                            type="button"
                            onClick={() => setShowCustomerServiceQr(true)}
                            className="ml-2 font-semibold text-indigo-600 hover:underline"
                          >
                            求助在线客服
                          </button>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        新密码
                      </label>
                      <Input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="至少8位"
                        className="h-12 rounded-xl bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        确认新密码
                      </label>
                      <Input
                        type="password"
                        value={newPasswordConfirm}
                        onChange={(e) => setNewPasswordConfirm(e.target.value)}
                        placeholder="再次输入新密码"
                        className="h-12 rounded-xl bg-white"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setShowPasswordForm(false);
                        setOldPassword("");
                        setNewPassword("");
                        setNewPasswordConfirm("");
                        setPasswordHelp("");
                      }}
                    >
                      取消修改密码
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 pt-6">
              <Button variant="outline" onClick={() => router.push("/admin/enterprise")}>
                取消
              </Button>

              <Button onClick={handleSave} disabled={saving}>
                {saving ? "保存中..." : "保存修改"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {showCustomerServiceQr && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 px-4">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowCustomerServiceQr(false)}
              className="absolute right-5 top-5 text-2xl leading-none text-slate-400 hover:text-slate-700"
            >
              ×
            </button>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900">在线客服</h2>
              <p className="mt-2 text-sm text-slate-500">
                请使用微信扫码添加客服
              </p>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <img
                src="/customer-service-qr.png"
                alt="在线客服二维码"
                className="mx-auto w-full max-w-[320px] rounded-2xl bg-white"
              />
            </div>

            <div className="mt-5 rounded-2xl bg-indigo-50 px-4 py-3 text-center text-sm text-indigo-700">
              如遇账号、密码、积分或企业资料问题，请扫码联系客服处理。
            </div>

            <button
              type="button"
              onClick={() => setShowCustomerServiceQr(false)}
              className="mt-5 w-full rounded-2xl bg-black py-3 font-semibold text-white hover:bg-slate-900"
            >
              我知道了
            </button>
          </div>
        </div>
      )}
    </div>
  );
}



