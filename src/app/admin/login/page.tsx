"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (loading) return;

    if (!username.trim() || !password.trim()) {
      toast.error("请输入账号和密码");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          account: username.trim(),
          password,
          role: "platform",
        }),
      });

      const data = await res.json();

      if (data.code === 0) {
        const userRole = "platform";

        localStorage.setItem("admin_role", userRole);
        localStorage.setItem("admin_username", username.trim());
        localStorage.setItem(
          "admin_id",
          data.data.admin_id || ""
        );

        localStorage.removeItem("enterprise_id");
        localStorage.removeItem("enterprise_name");

        toast.success("登录成功");
        router.replace("/admin/platform");
      } else {
        toast.error(data.message || "登录失败");
      }
    } catch (error) {
      console.error("登录接口异常：", error);
      toast.error("登录失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">MBTI 管理平台</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="mb-4 text-center text-sm text-gray-500">
            平台超级管理员登录
          </div>
<div className="space-y-4 mt-4">
            <Input
              placeholder="请输入账号"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />

            <Input
              type="password"
              placeholder="请输入密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
            />

            <Button
              className="w-full"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "登录中..." : "登录"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

