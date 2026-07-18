"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EnterpriseTestGroupsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/enterprise");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-500">
      正在返回企业后台...
    </div>
  );
}
