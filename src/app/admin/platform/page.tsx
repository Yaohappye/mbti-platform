"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Copy,
  Plus,
  Search,
  MoreHorizontal,
  Download,
  Ban,
  AlertTriangle,
  CheckCircle,
  Building2,
  KeyRound,
  Coins,
} from "lucide-react";

interface Enterprise {
  enterprise_id?: string;
  enterprise_name?: string;
  username?: string;
  contact_name?: string | null;
  contact_phone?: string | null;
  contact_person?: string | null;
  phone?: string | null;
  identity_code?: string;
  remaining_points?: number;
  credits?: number;
  status?: string;
  usedAt?: string;
  voidedAt?: string;
  created_at?: string;
  test_count?: number;
  enterpriseCode?: string;
  enterpriseName?: string;
  adminAccount?: string;
  createdAt?: string;
  testCount?: number;
  id?: string;
}

interface ActivationCodeRecord {
  code: string;
  kind: "single" | "ten";
  totalUses?: number;
  remainingUses?: number;
  createdAt?: string;
  status?: string;
  usedAt?: string;
  voidedAt?: string;
  useLogs?: Array<{
    useIndex?: number;
    usedAt?: string;
    beforeRemainingUses?: number;
    afterRemainingUses?: number;
  }>;
  boundEnterpriseId?: string | null;
  boundEnterpriseName?: string;
}

interface RechargeCode {
  code_id: string;
  code: string;
  points: number;
  status: "unused" | "used" | "voided";
  bound_enterprise_id: string | null;
  bound_enterprise_name?: string;
  created_at: string;
  used_at?: string | null;
  voided_at?: string | null;
}

interface PersonalCode {
  code_id: string;
  code: string;
  max_tests: number;
  remaining_tests: number;
  status: "unused" | "used" | "voided";
  created_at: string;
  used_at?: string | null;
  voided_at?: string | null;
}

const PAGE_SIZE = 100;

const formatDateTime = (value?: string | null) => {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleString("zh-CN", {
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("已复制到剪贴板");
  } catch {
    toast.error("复制失败");
  }
};

const exportToExcel = (data: unknown[], filename: string) => {
  if (data.length === 0) {
    toast.error("暂无数据可导出");
    return;
  }

  const headers = Object.keys(data[0] as Record<string, unknown>).join("\t");
  const rows = data.map((row) =>
    Object.values(row as Record<string, unknown>).join("\t")
  );
  const csv = [headers, ...rows].join("\n");
  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
};

async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit = {},
  timeoutMs = 15000
) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    window.clearTimeout(timer);
  }
}

export default function PlatformAdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("enterprises");

  const [loading, setLoading] = useState(true);
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
  const [enterpriseKeyword, setEnterpriseKeyword] = useState("");

  const [activationCodes, setActivationCodes] = useState<ActivationCodeRecord[]>([]);
  const [activationLoading, setActivationLoading] = useState(false);

  const [personalCodeKeyword, setPersonalCodeKeyword] = useState("");
  const [personalStatusFilter, setPersonalStatusFilter] = useState("");
  const [personalGenDialogOpen, setPersonalGenDialogOpen] = useState(false);
  const [personalGenCount, setPersonalGenCount] = useState(1);
  const [personalGenMaxTests, setPersonalGenMaxTests] = useState(1);
  const [personalGenerating, setPersonalGenerating] = useState(false);
  const [personalGeneratedCodes, setPersonalGeneratedCodes] = useState<string[]>([]);

  const [voidDialogOpen, setVoidDialogOpen] = useState(false);
  const [voidingCode, setVoidingCode] = useState<PersonalCode | null>(null);
  const [voiding, setVoiding] = useState(false);

  const [rechargeCodeKeyword, setRechargeCodeKeyword] = useState("");
  const [rechargeStatusFilter, setRechargeStatusFilter] = useState("");
  const [rechargeGenDialogOpen, setRechargeGenDialogOpen] = useState(false);
  const [rechargeGenCount, setRechargeGenCount] = useState(1);
  const [rechargeGenPoints, setRechargeGenPoints] = useState(100);
  const [rechargeGenerating, setRechargeGenerating] = useState(false);
  const [rechargeGeneratedCodes, setRechargeGeneratedCodes] = useState<
    Array<{ code: string; points: number }>
  >([]);
  const [rechargeCodes, setRechargeCodes] = useState<RechargeCode[]>([]);

  const [rechargeVoidDialogOpen, setRechargeVoidDialogOpen] =
    useState(false);
  const [voidingRechargeCode, setVoidingRechargeCode] =
    useState<RechargeCode | null>(null);
  const [voidingRecharge, setVoidingRecharge] = useState(false);

  const [enterpriseSearchKeyword, setEnterpriseSearchKeyword] = useState("");
  const [searchedEnterprise, setSearchedEnterprise] =
    useState<Enterprise | null>(null);
  const [searchingEnterprise, setSearchingEnterprise] = useState(false);

  const [selectedEnterprise, setSelectedEnterprise] =
    useState<Enterprise | null>(null);
  const [directRechargeDialogOpen, setDirectRechargeDialogOpen] =
    useState(false);
  const [directRechargePoints, setDirectRechargePoints] = useState(100);
  const [directRecharging, setDirectRecharging] = useState(false);

  const [enterpriseEditDialogOpen, setEnterpriseEditDialogOpen] =
    useState(false);
  const [editingEnterprise, setEditingEnterprise] =
    useState<Enterprise | null>(null);
  const [enterpriseEditForm, setEnterpriseEditForm] = useState({
    contact_person: "",
    phone: "",
  });
  const [savingEnterprise, setSavingEnterprise] = useState(false);

  
  const [enterprisePasswordDialogOpen, setEnterprisePasswordDialogOpen] =
    useState(false);
  const [passwordEnterprise, setPasswordEnterprise] =
    useState<Enterprise | null>(null);
  const [newEnterprisePassword, setNewEnterprisePassword] = useState("");
  const [confirmEnterprisePassword, setConfirmEnterprisePassword] =
    useState("");
  const [enterprisePasswordError, setEnterprisePasswordError] =
    useState("");
  const [savingEnterprisePassword, setSavingEnterprisePassword] =
    useState(false);
const [enterprisePage, setEnterprisePage] = useState(1);
  const [personalPage, setPersonalPage] = useState(1);
  const [tenPage, setTenPage] = useState(1);

  const [enterpriseJumpPage, setEnterpriseJumpPage] = useState("");
  const [personalJumpPage, setPersonalJumpPage] = useState("");
  const [tenJumpPage, setTenJumpPage] = useState("");

  const [enterpriseJumpError, setEnterpriseJumpError] = useState("");
  const [personalJumpError, setPersonalJumpError] = useState("");
  const [tenJumpError, setTenJumpError] = useState("");

  useEffect(() => {
    void fetchEnterprises();
  }, []);

  useEffect(() => {
    if (activeTab === "personal") void loadActivationCodes();
    if (activeTab === "recharge") void loadRechargeCodes();
  }, [activeTab]);

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" }).catch(() => null);
    router.push("/admin/login");
  };

  const fetchEnterprises = async () => {
    try {
      setLoading(true);

      const res = await fetchWithTimeout(
        `/api/admin/platform/enterprises?keyword=${encodeURIComponent(
          enterpriseKeyword
        )}`
      );

      const data = await res.json();

      if (res.status === 401 || res.status === 403) {
        router.replace("/admin/login");
        return;
      }

      if (data.code === 0) {
        const list = Array.isArray(data.data)
          ? data.data
          : Array.isArray(data.data?.enterprises)
          ? data.data.enterprises
          : [];

        setEnterprises(list);
      } else {
        throw new Error(data.message || "企业数据加载失败");
      }
    } catch (error) {
      // Keep the last successful rows on a temporary network failure. Clearing
      // them made a slow request look exactly like production data was lost.
      toast.error(
        error instanceof Error && error.name === "AbortError"
          ? "网络响应较慢，企业数据未更新，请稍后重试"
          : "企业数据加载失败，已保留上次显示的数据",
      );
    } finally {
      setLoading(false);
    }
  };

  const mergedEnterpriseRows = useMemo<Enterprise[]>(() => {
    return enterprises.filter((item, index, arr) => {
      const currentKey = String(
        item.identity_code ||
          item.enterpriseCode ||
          item.enterprise_id ||
          item.username ||
          index
      );

      return (
        arr.findIndex((row, rowIndex) => {
          const rowKey = String(
            row.identity_code ||
              row.enterpriseCode ||
              row.enterprise_id ||
              row.username ||
              rowIndex
          );
          return rowKey === currentKey;
        }) === index
      );
    });
  }, [enterprises]);

  const visibleEnterpriseRows = useMemo(() => {
    const keyword = enterpriseKeyword.trim().toLowerCase();

    if (!keyword) {
      return mergedEnterpriseRows;
    }

    return mergedEnterpriseRows.filter((item) =>
      [
        item.enterprise_name,
        item.enterpriseName,
        item.username,
        item.adminAccount,
        item.contact_name,
        item.contact_person,
        item.contact_phone,
        item.phone,
        item.identity_code,
        item.enterpriseCode,
        item.enterprise_id,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );
  }, [mergedEnterpriseRows, enterpriseKeyword]);

  const enterprisePageCount = Math.max(
    1,
    Math.ceil(visibleEnterpriseRows.length / PAGE_SIZE)
  );

  const currentEnterprisePage = Math.min(
    enterprisePage,
    enterprisePageCount
  );

  const pagedEnterpriseRows = useMemo(() => {
    const start = (currentEnterprisePage - 1) * PAGE_SIZE;
    return visibleEnterpriseRows.slice(start, start + PAGE_SIZE);
  }, [visibleEnterpriseRows, currentEnterprisePage]);

  const loadActivationCodes = async () => {
    try {
      setActivationLoading(true);

      const res = await fetchWithTimeout("/api/admin/activation-codes");
      const data = await res.json();

      if (data.code === 0) {
        setActivationCodes(
          Array.isArray(data.data?.list) ? data.data.list : []
        );
      } else {
        setActivationCodes([]);
      }
    } catch {
      setActivationCodes([]);
    } finally {
      setActivationLoading(false);
    }
  };

  const loadRechargeCodes = async () => {
    try {
      setActivationLoading(true);
      const res = await fetchWithTimeout("/api/admin/recharge-codes");
      const data = await res.json();
      setRechargeCodes(
        res.ok && data.code === 0 && Array.isArray(data.data?.list)
          ? data.data.list
          : []
      );
    } catch {
      setRechargeCodes([]);
    } finally {
      setActivationLoading(false);
    }
  };

  const personalCodes = useMemo<PersonalCode[]>(() => {
    return activationCodes
      .filter((item) => item.kind === "single" || item.kind === "ten")
      .map((item) => {
        const remaining = Number(item.remainingUses) || 0;
        const total = Number(item.totalUses) || 1;

        let status: PersonalCode["status"] = "unused";
        if (item.status === "voided" || item.status === "disabled") {
          status = "voided";
        } else if (remaining <= 0) {
          status = "used";
        }

        return {
          code_id: item.code,
          code: item.code,
          max_tests: total,
          remaining_tests: remaining,
          status,
          created_at: item.createdAt || "",
          used_at:
            status === "used"
              ? item.usedAt || item.useLogs?.at(-1)?.usedAt || null
              : null,
          voided_at:
            status === "voided" ? item.voidedAt || null : null,
        };
      });
  }, [activationCodes]);

  const filteredPersonalCodes = useMemo(() => {
    const keyword = personalCodeKeyword.trim().toLowerCase();

    return personalCodes.filter((code) => {
      const keywordMatch =
        !keyword || code.code.toLowerCase().includes(keyword);
      const statusMatch =
        !personalStatusFilter || code.status === personalStatusFilter;

      return keywordMatch && statusMatch;
    });
  }, [personalCodes, personalCodeKeyword, personalStatusFilter]);

  const personalPageCount = Math.max(
    1,
    Math.ceil(filteredPersonalCodes.length / PAGE_SIZE)
  );

  const currentPersonalPage = Math.min(
    personalPage,
    personalPageCount
  );

  const pagedPersonalCodes = useMemo(() => {
    const start = (currentPersonalPage - 1) * PAGE_SIZE;
    return filteredPersonalCodes.slice(start, start + PAGE_SIZE);
  }, [filteredPersonalCodes, currentPersonalPage]);

  const generatePersonalCodes = async () => {
    if (personalGenCount < 1 || personalGenCount > 1000) {
      toast.error("生成数量需在1-1000之间");
      return;
    }

    if (personalGenMaxTests < 1) {
      toast.error("测试次数至少为1");
      return;
    }

    setPersonalGenerating(true);

    try {
      const beforeCodes = new Set(activationCodes.map((item) => item.code));

      const res = await fetchWithTimeout(
        "/api/admin/activation-codes",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            kind: "single",
            count: personalGenCount,
            maxTests: personalGenMaxTests,
          }),
        },
        15000
      );

      const data = await res.json();

      if (data.code === 0) {
        const nextList = Array.isArray(data.data?.list)
          ? data.data.list
          : [];

        setActivationCodes(nextList);

        const generated = nextList
          .filter(
            (item: ActivationCodeRecord) =>
              !beforeCodes.has(item.code)
          )
          .map((item: ActivationCodeRecord) => item.code);

        setPersonalGeneratedCodes(generated);
        toast.success(
          generated.length > 0
            ? `成功生成 ${generated.length} 个兑换码`
            : "兑换码生成完成"
        );
      } else {
        toast.error(data.message || "生成失败");
      }
    } catch {
      toast.error("生成兑换码失败");
    } finally {
      setPersonalGenerating(false);
    }
  };

  const openVoidDialog = (code: PersonalCode) => {
    setVoidingCode(code);
    setVoidDialogOpen(true);
  };

  const confirmVoidCode = async () => {
    if (!voidingCode) return;

    setVoiding(true);

    try {
      const res = await fetchWithTimeout("/api/admin/activation-codes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "void",
          code: voidingCode.code,
        }),
      });

      const data = await res.json();

      if (data.code === 0) {
        setVoidDialogOpen(false);
        setVoidingCode(null);
        toast.success("兑换码已作废");
        await loadActivationCodes();
      } else {
        toast.error(data.message || "当前接口暂不支持作废");
      }
    } catch {
      toast.error("当前接口暂不支持作废");
    } finally {
      setVoiding(false);
    }
  };

  const enterpriseIdOf = (enterprise: Enterprise) =>
    String(
      enterprise.enterprise_id ||
        enterprise.enterpriseCode ||
        enterprise.identity_code ||
        enterprise.id ||
        ""
    );

  const enterpriseNameOf = (enterprise: Enterprise) =>
    enterprise.enterprise_name || enterprise.enterpriseName || "-";

  const enterpriseCodeOf = (enterprise: Enterprise) =>
    enterprise.identity_code ||
    enterprise.enterpriseCode ||
    enterprise.enterprise_id ||
    "-";

  const enterpriseContactOf = (enterprise: Enterprise) =>
    enterprise.contact_person ||
    enterprise.contact_name ||
    enterprise.contact_phone ||
    enterprise.phone ||
    "-";

  const enterprisePointsOf = (enterprise: Enterprise) =>
    Number(enterprise.remaining_points ?? enterprise.credits ?? 0);

  const searchEnterprise = async () => {
    const keyword = enterpriseSearchKeyword.trim().toLowerCase();

    if (!keyword) {
      setSearchedEnterprise(null);
      toast.error("请输入企业编号或企业名称");
      return;
    }

    setSearchingEnterprise(true);
    setSearchedEnterprise(null);

    try {
      const exactMatch = mergedEnterpriseRows.find((enterprise) =>
        [
          enterpriseCodeOf(enterprise),
          enterprise.enterprise_name,
          enterprise.enterpriseName,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase() === keyword)
      );

      const fuzzyMatch = mergedEnterpriseRows.find((enterprise) =>
        [
          enterpriseCodeOf(enterprise),
          enterprise.enterprise_name,
          enterprise.enterpriseName,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(keyword)
      );

      const localMatch = exactMatch || fuzzyMatch;

      if (localMatch) {
        setSearchedEnterprise(localMatch);
        return;
      }

      const res = await fetchWithTimeout(
        `/api/admin/platform/enterprises?keyword=${encodeURIComponent(
          enterpriseSearchKeyword.trim()
        )}`
      );

      const data = await res.json();
      const list = Array.isArray(data.data)
        ? data.data
        : Array.isArray(data.data?.enterprises)
        ? data.data.enterprises
        : [];

      const apiMatch =
        list.find(
          (enterprise: Enterprise) =>
            String(enterpriseCodeOf(enterprise)).toLowerCase() === keyword
        ) || list[0];

      setSearchedEnterprise(apiMatch || null);
    } catch {
      setSearchedEnterprise(null);
    } finally {
      setSearchingEnterprise(false);
    }
  };

  const openDirectRechargeDialog = (enterprise: Enterprise) => {
    setSelectedEnterprise(enterprise);
    setDirectRechargePoints(100);
    setDirectRechargeDialogOpen(true);
  };

  const handleDirectRecharge = async () => {
    if (!selectedEnterprise) return;

    if (
      !Number.isInteger(directRechargePoints) ||
      directRechargePoints < 1
    ) {
      toast.error("充值积分必须是大于0的整数");
      return;
    }

    setDirectRecharging(true);

    try {
      const enterpriseId = enterpriseIdOf(selectedEnterprise);

      const res = await fetchWithTimeout("/api/admin/platform/recharge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          enterpriseId,
          points: directRechargePoints,
        }),
      });

      const data = await res.json();

      if (data.code !== 0) {
        throw new Error(data.message || "充值失败");
      }

      const nextEnterprise = {
        ...selectedEnterprise,
        remaining_points:
          enterprisePointsOf(selectedEnterprise) + directRechargePoints,
        credits:
          enterprisePointsOf(selectedEnterprise) + directRechargePoints,
      };

      setSearchedEnterprise(nextEnterprise);
      setDirectRechargeDialogOpen(false);
      toast.success(`成功充值 ${directRechargePoints} 积分`);
      await fetchEnterprises();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "充值失败");
    } finally {
      setDirectRecharging(false);
    }
  };

  const toggleEnterpriseBlock = async (enterprise: Enterprise) => {
    const newStatus =
      enterprise.status === "frozen" || enterprise.status === "disabled"
        ? "normal"
        : "frozen";
    const actionText = newStatus === "frozen" ? "拉黑" : "解除拉黑";

    try {
      const enterpriseId = enterpriseIdOf(enterprise);

      const res = await fetchWithTimeout(
        `/api/admin/platform/enterprises/${enterpriseId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await res.json();

      if (data.code !== 0) {
        throw new Error(data.message || `${actionText}失败`);
      }

      setSearchedEnterprise({ ...enterprise, status: newStatus });
      toast.success(`${actionText}成功`);
      await fetchEnterprises();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : `${actionText}失败`);
    }
  };

  const openEnterprisePasswordDialog = (enterprise: Enterprise) => {
    setPasswordEnterprise(enterprise);
    setNewEnterprisePassword("");
    setConfirmEnterprisePassword("");
    setEnterprisePasswordError("");
    setEnterprisePasswordDialogOpen(true);
  };

  const saveEnterprisePassword = async () => {
    if (!passwordEnterprise) return;

    const password = newEnterprisePassword.trim();

    if (!password) {
      setEnterprisePasswordError("请输入新密码");
      return;
    }

    if (password.length < 8) {
      setEnterprisePasswordError("密码长度不能少于8位");
      return;
    }

    if (password.length > 32) {
      setEnterprisePasswordError("密码长度不能超过32位");
      return;
    }

    if (password !== confirmEnterprisePassword) {
      setEnterprisePasswordError("两次输入的密码不一致");
      return;
    }

    setSavingEnterprisePassword(true);
    setEnterprisePasswordError("");

    try {
      const enterpriseId = enterpriseIdOf(passwordEnterprise);

      const res = await fetchWithTimeout(
        `/api/admin/platform/enterprises/${enterpriseId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();

      if (data.code !== 0) {
        throw new Error(data.message || "修改密码失败");
      }

      toast.success("企业登录密码修改成功");
      setEnterprisePasswordDialogOpen(false);
      setPasswordEnterprise(null);
      setNewEnterprisePassword("");
      setConfirmEnterprisePassword("");
    } catch (error) {
      setEnterprisePasswordError(
        error instanceof Error ? error.message : "企业密码修改失败"
      );
    } finally {
      setSavingEnterprisePassword(false);
    }
  };
  const openEnterpriseEditDialog = (enterprise: Enterprise) => {
    setEditingEnterprise(enterprise);
    setEnterpriseEditForm({
      contact_person:
        enterprise.contact_person || enterprise.contact_name || "",
      phone: enterprise.phone || enterprise.contact_phone || "",
    });
    setEnterpriseEditDialogOpen(true);
  };

  const saveEnterpriseInfo = async () => {
    if (!editingEnterprise) return;

    setSavingEnterprise(true);

    try {
      const enterpriseId = enterpriseIdOf(editingEnterprise);

      const res = await fetchWithTimeout(
        `/api/admin/platform/enterprises/${enterpriseId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(enterpriseEditForm),
        }
      );

      const data = await res.json();

      if (data.code !== 0) {
        throw new Error(data.message || "更新失败");
      }

      const nextEnterprise = {
        ...editingEnterprise,
        contact_person: enterpriseEditForm.contact_person,
        contact_name: enterpriseEditForm.contact_person,
        phone: enterpriseEditForm.phone,
        contact_phone: enterpriseEditForm.phone,
      };

      setSearchedEnterprise(nextEnterprise);
      setEnterpriseEditDialogOpen(false);
      toast.success("企业信息更新成功");
      await fetchEnterprises();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "企业信息更新失败");
    } finally {
      setSavingEnterprise(false);
    }
  };

  const filteredRechargeCodes = useMemo(() => {
    const keyword = rechargeCodeKeyword.trim().toLowerCase();

    return rechargeCodes.filter((code) => {
      const keywordMatch =
        !keyword || code.code.toLowerCase().includes(keyword);
      const statusMatch =
        !rechargeStatusFilter || code.status === rechargeStatusFilter;

      return keywordMatch && statusMatch;
    });
  }, [rechargeCodes, rechargeCodeKeyword, rechargeStatusFilter]);

  const tenPageCount = Math.max(
    1,
    Math.ceil(filteredRechargeCodes.length / PAGE_SIZE)
  );

  const currentTenPage = Math.min(tenPage, tenPageCount);

  const pagedRechargeCodes = useMemo(() => {
    const start = (currentTenPage - 1) * PAGE_SIZE;
    return filteredRechargeCodes.slice(start, start + PAGE_SIZE);
  }, [filteredRechargeCodes, currentTenPage]);

  const generateRechargeCodes = async () => {
    if (
      !Number.isInteger(rechargeGenCount) ||
      rechargeGenCount < 1 ||
      rechargeGenCount > 1000
    ) {
      toast.error("生成数量必须是1至1000之间的整数");
      return;
    }

    if (
      !Number.isInteger(rechargeGenPoints) ||
      rechargeGenPoints < 1
    ) {
      toast.error("绑定积分必须是大于0的整数");
      return;
    }

    setRechargeGenerating(true);

    try {
      const res = await fetchWithTimeout(
        "/api/admin/recharge-codes",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            count: rechargeGenCount,
            points: rechargeGenPoints,
          }),
        },
        20000
      );

      const data = await res.json();

      if (data.code !== 0) {
        toast.error(data.message || "生成失败");
        return;
      }

      const nextList = Array.isArray(data.data?.list) ? data.data.list : [];
      const created = Array.isArray(data.data?.created) ? data.data.created : [];
      setRechargeCodes(nextList);

      const generated = created.map((item: { code: string; points: number }) => ({
        code: item.code,
        points: Number(item.points) || rechargeGenPoints,
      }));

      setRechargeGeneratedCodes(generated);
      setTenPage(1);
      toast.success(`成功生成 ${generated.length} 个充值码`);
    } catch {
      toast.error("生成充值码失败");
    } finally {
      setRechargeGenerating(false);
    }
  };

  const openRechargeVoidDialog = (code: RechargeCode) => {
    setVoidingRechargeCode(code);
    setRechargeVoidDialogOpen(true);
  };

  const confirmVoidRechargeCode = async () => {
    if (!voidingRechargeCode) return;

    setVoidingRecharge(true);

    try {
      const res = await fetchWithTimeout("/api/admin/recharge-codes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "void",
          id: voidingRechargeCode.code_id,
        }),
      });

      const data = await res.json();

      if (data.code === 0) {
        toast.success("充值码已作废");
        setRechargeVoidDialogOpen(false);
        setVoidingRechargeCode(null);
        await loadRechargeCodes();
      } else {
        toast.error(data.message || "操作失败");
      }
    } catch {
      toast.error("操作失败");
    } finally {
      setVoidingRecharge(false);
    }
  };

  const validateJumpPage = (
    value: string,
    maxPage: number
  ): string => {
    const trimmed = value.trim();

    if (!trimmed) {
      return "请输入要跳转的页码";
    }

    const page = Number(trimmed);

    if (Number.isNaN(page)) {
      return "页码必须是数字格式";
    }

    if (!Number.isInteger(page)) {
      return "页码必须是整数";
    }

    if (page < 1) {
      return "页码不能小于1";
    }

    if (page > maxPage) {
      return `页码不能超过最大页数 ${maxPage}`;
    }

    return "";
  };

  const handlePageJump = (
    value: string,
    maxPage: number,
    setPage: (page: number) => void,
    setError: (message: string) => void
  ) => {
    const error = validateJumpPage(value, maxPage);
    setError(error);

    if (error) {
      return;
    }

    setPage(Number(value.trim()));
  };

  const getStatusBadge = (
    status: string,
    type: "enterprise" | "personal" = "personal"
  ) => {
    const config: Record<
      string,
      { label: string; className: string }
    > = {
      normal: {
        label: "正常",
        className: "bg-green-100 text-green-800",
      },
      active: {
        label: "正常",
        className: "bg-green-100 text-green-800",
      },
      approved: {
        label: "正常",
        className: "bg-green-100 text-green-800",
      },
      frozen: {
        label: "冻结",
        className: "bg-red-100 text-red-800",
      },
      disabled: {
        label: "已作废",
        className: "bg-red-100 text-red-800",
      },
      unused: {
        label: "未核销",
        className: "bg-green-100 text-green-800",
      },
      used: {
        label: "已核销",
        className: "bg-gray-100 text-gray-800",
      },
      voided: {
        label: "已作废",
        className: "bg-red-100 text-red-800",
      },
    };

    const item = config[status] || {
      label: type === "enterprise" ? "正常" : status,
      className: "",
    };

    return <Badge className={item.className}>{item.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">平台管理后台</h1>

          <Button variant="outline" onClick={handleLogout}>
            退出登录
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 bg-white border p-1 rounded-xl">
            <TabsTrigger
              value="enterprises"
              className="rounded-lg px-6"
            >
              企业账号管理
            </TabsTrigger>

            <TabsTrigger value="personal" className="rounded-lg px-6">
              个人版兑换码
            </TabsTrigger>

            <TabsTrigger value="recharge" className="rounded-lg px-6">
              企业积分充值兑换码
            </TabsTrigger>
          </TabsList>

          <TabsContent value="enterprises">
            <Card className="rounded-xl border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold">
                  企业账号管理
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex gap-3 mb-6">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                    <Input
                      placeholder="搜索企业名称 / 企业身份码"
                      value={enterpriseKeyword}
                      onChange={(e) => {
                        setEnterpriseKeyword(e.target.value);
                        setEnterprisePage(1);
                      }}
                      onKeyDown={(e) =>
                        e.key === "Enter" && fetchEnterprises()
                      }
                      className="pl-10 rounded-lg"
                    />
                  </div>

                  <Button
                    onClick={fetchEnterprises}
                    variant="outline"
                    className="rounded-lg"
                  >
                    搜索
                  </Button>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium text-gray-700">
                    一共 {visibleEnterpriseRows.length} 条
                  </div>
                  <div className="text-sm text-gray-500">
                    每页显示 {PAGE_SIZE} 条
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-100">
                      <TableHead className="text-gray-600 font-medium">
                        企业名称
                      </TableHead>
                      <TableHead className="text-gray-600 font-medium">
                        登录账号
                      </TableHead>
                      <TableHead className="text-gray-600 font-medium">
                        联系人
                      </TableHead>
                      <TableHead className="text-gray-600 font-medium">
                        企业身份码
                      </TableHead>
                      <TableHead className="text-gray-600 font-medium text-center">
                        剩余积分
                      </TableHead>
                      <TableHead className="text-gray-600 font-medium">
                        账号状态
                      </TableHead>
                      <TableHead className="text-gray-600 font-medium text-center">
                        累计测试
                      </TableHead>
                      <TableHead className="text-gray-600 font-medium">
                        注册时间
                      </TableHead>
                      <TableHead className="text-gray-600 font-medium">
                        操作
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell
                          colSpan={9}
                          className="text-center py-8 text-gray-500"
                        >
                          加载中...
                        </TableCell>
                      </TableRow>
                    ) : visibleEnterpriseRows.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={9}
                          className="text-center py-8 text-gray-400"
                        >
                          暂无企业注册数据
                        </TableCell>
                      </TableRow>
                    ) : (
                      pagedEnterpriseRows.map((item) => (
                        <TableRow
                          key={
                            item.enterprise_id ||
                            item.enterpriseCode ||
                            item.username
                          }
                          className="border-b border-gray-50"
                        >
                          <TableCell className="font-medium">
                            {item.enterprise_name ||
                              item.enterpriseName ||
                              "-"}
                          </TableCell>

                          <TableCell>
                            {item.username ||
                              item.adminAccount ||
                              "-"}
                          </TableCell>

                          <TableCell>
                            {item.contact_person ||
                              item.contact_name ||
                              item.contact_phone ||
                              item.phone ||
                              "-"}
                          </TableCell>

                          <TableCell>
                            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono font-bold">
                              {item.identity_code ||
                                item.enterpriseCode ||
                                item.enterprise_id ||
                                "-"}
                            </code>
                          </TableCell>

                          <TableCell className="text-center font-semibold text-blue-600">
                            {item.remaining_points ??
                              item.credits ??
                              0}
                          </TableCell>

                          <TableCell>
                            {getStatusBadge(
                              item.status || "normal",
                              "enterprise"
                            )}
                          </TableCell>

                          <TableCell className="text-center">
                            {item.test_count ??
                              item.testCount ??
                              0}
                            人
                          </TableCell>

                          <TableCell className="text-gray-500">
                            {item.created_at || item.createdAt
                              ? new Date(
                                  item.created_at ||
                                    item.createdAt ||
                                    ""
                                ).toLocaleDateString()
                              : "-"}
                          </TableCell>

                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() =>
                                    openEnterprisePasswordDialog(item)
                                  }
                                >
                                  <KeyRound className="w-4 h-4 mr-2" />
                                  修改密码
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                  onClick={() =>
                                    openDirectRechargeDialog(item)
                                  }
                                >
                                  <Coins className="w-4 h-4 mr-2" />
                                  增加积分
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>

                <div className="flex items-center justify-between mt-5">
                  <div className="text-sm text-gray-500">
                    第 {currentEnterprisePage} / {enterprisePageCount} 页
                  </div>

                  <div className="flex items-start gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">跳转到</span>
                        <Input
                          type="text"
                          inputMode="numeric"
                          placeholder="页码"
                          value={enterpriseJumpPage}
                          onChange={(e) => {
                            const value = e.target.value;
                            setEnterpriseJumpPage(value);
                            setEnterpriseJumpError(
                              value ? validateJumpPage(value, enterprisePageCount) : ""
                            );
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handlePageJump(
                                enterpriseJumpPage,
                                enterprisePageCount,
                                setEnterprisePage,
                                setEnterpriseJumpError
                              );
                            }
                          }}
                          className={`h-9 w-24 ${
                            enterpriseJumpError ? "border-red-500" : ""
                          }`}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handlePageJump(
                              enterpriseJumpPage,
                              enterprisePageCount,
                              setEnterprisePage,
                              setEnterpriseJumpError
                            )
                          }
                        >
                          跳转
                        </Button>
                      </div>

                      {enterpriseJumpError && (
                        <p className="mt-1 text-xs text-red-600">
                          {enterpriseJumpError}
                        </p>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentEnterprisePage <= 1}
                      onClick={() => setEnterprisePage(1)}
                    >
                      首页
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentEnterprisePage <= 1}
                      onClick={() =>
                        setEnterprisePage((page) => Math.max(1, page - 1))
                      }
                    >
                      上一页
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentEnterprisePage >= enterprisePageCount}
                      onClick={() =>
                        setEnterprisePage((page) =>
                          Math.min(enterprisePageCount, page + 1)
                        )
                      }
                    >
                      下一页
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentEnterprisePage >= enterprisePageCount}
                      onClick={() => setEnterprisePage(enterprisePageCount)}
                    >
                      末页
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="personal">
            <Card className="rounded-xl border-0 shadow-sm">
              <CardHeader className="pb-4 flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                  个人版测试兑换码管理
                </CardTitle>

                <div className="flex gap-2">
                  <Dialog
                    open={personalGenDialogOpen}
                    onOpenChange={setPersonalGenDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="rounded-lg bg-gray-900 hover:bg-gray-800">
                        <Plus className="w-4 h-4 mr-2" />
                        单条生成
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="rounded-xl">
                      <DialogHeader>
                        <DialogTitle>生成个人版兑换码</DialogTitle>
                      </DialogHeader>

                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>生成数量</Label>

                          <Input
                            type="number"
                            min={1}
                            max={1000}
                            value={personalGenCount}
                            onChange={(e) =>
                              setPersonalGenCount(
                                parseInt(e.target.value) || 1
                              )
                            }
                          />

                          <p className="text-sm text-gray-500">
                            单次最多生成1000个兑换码
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label>单码可测试总次数</Label>

                          <Input
                            type="number"
                            min={1}
                            value={personalGenMaxTests}
                            onChange={(e) =>
                              setPersonalGenMaxTests(
                                parseInt(e.target.value) || 1
                              )
                            }
                          />

                          <p className="text-sm text-gray-500">
                            仅提交测评扣次数，查看报告不消耗
                          </p>
                        </div>

                        {personalGeneratedCodes.length > 0 && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label>生成的兑换码</Label>
                              <span className="text-sm text-gray-500">
                                本次共 {personalGeneratedCodes.length} 条，仅预览前100条
                              </span>
                            </div>

                            <div className="bg-gray-50 p-3 rounded-lg max-h-40 overflow-y-auto space-y-1">
                              {personalGeneratedCodes.slice(0, 100).map(
                                (code, index) => (
                                  <div
                                    key={`${code}-${index}`}
                                    className="font-mono text-sm font-bold text-gray-800"
                                  >
                                    {code}
                                  </div>
                                )
                              )}
                            </div>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                copyToClipboard(
                                  personalGeneratedCodes.join("\n")
                                )
                              }
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              复制全部
                            </Button>
                          </div>
                        )}
                      </div>

                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setPersonalGenDialogOpen(false);
                            setPersonalGeneratedCodes([]);
                          }}
                        >
                          关闭
                        </Button>

                        <Button
                          onClick={generatePersonalCodes}
                          disabled={personalGenerating}
                          className="bg-gray-900"
                        >
                          {personalGenerating ? "生成中..." : "生成"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="outline"
                    className="rounded-lg"
                    onClick={() =>
                      exportToExcel(
                        filteredPersonalCodes,
                        "个人版兑换码"
                      )
                    }
                  >
                    <Download className="w-4 h-4 mr-2" />
                    导出Excel
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex gap-3 mb-6">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                    <Input
                      placeholder="搜索兑换码"
                      value={personalCodeKeyword}
                      onChange={(e) => {
                        setPersonalCodeKeyword(e.target.value);
                        setPersonalPage(1);
                      }}
                      className="pl-10 rounded-lg"
                    />
                  </div>

                  <select
                    className="border rounded-lg px-3 py-2 text-sm bg-white"
                    value={personalStatusFilter}
                    onChange={(e) => {
                      setPersonalStatusFilter(e.target.value);
                      setPersonalPage(1);
                    }}
                  >
                    <option value="">全部状态</option>
                    <option value="unused">未核销</option>
                    <option value="used">已核销</option>
                    <option value="voided">已作废</option>
                  </select>

                  <Button
                    onClick={loadActivationCodes}
                    variant="outline"
                    className="rounded-lg"
                  >
                    搜索
                  </Button>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium text-gray-700">
                    一共 {filteredPersonalCodes.length} 条
                  </div>
                  <div className="text-sm text-gray-500">
                    每页显示 {PAGE_SIZE} 条
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-100">
                      <TableHead className="text-gray-600 font-medium">
                        兑换码
                      </TableHead>
                      <TableHead className="text-gray-600 font-medium">
                        生成时间
                      </TableHead>
                      <TableHead className="text-gray-600 font-medium text-center">
                        总次数
                      </TableHead>
                      <TableHead className="text-gray-600 font-medium text-center">
                        剩余次数
                      </TableHead>
                      <TableHead className="text-gray-600 font-medium">
                        核销状态
                      </TableHead>
                      <TableHead className="text-gray-600 font-medium">
                        核销时间
                      </TableHead>
                      <TableHead className="text-gray-600 font-medium">
                        作废时间
                      </TableHead>
                      <TableHead className="text-gray-600 font-medium">
                        操作
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {activationLoading ? (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="text-center py-8 text-gray-400"
                        >
                          加载中...
                        </TableCell>
                      </TableRow>
                    ) : filteredPersonalCodes.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="text-center py-8 text-gray-400"
                        >
                          暂无兑换码数据
                        </TableCell>
                      </TableRow>
                    ) : (
                      pagedPersonalCodes.map((code) => (
                        <TableRow
                          key={code.code_id}
                          className="border-b border-gray-50"
                        >
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <code className="font-mono text-base font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded">
                                {code.code}
                              </code>

                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() =>
                                  copyToClipboard(code.code)
                                }
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>

                          <TableCell className="text-gray-600">
                            {code.created_at
                              ? new Date(
                                  code.created_at
                                ).toLocaleDateString()
                              : "-"}
                          </TableCell>

                          <TableCell className="text-center">
                            {code.max_tests}
                          </TableCell>

                          <TableCell className="text-center">
                            <span
                              className={
                                code.remaining_tests === 0
                                  ? "text-red-500 font-semibold"
                                  : "text-green-600 font-semibold"
                              }
                            >
                              {code.remaining_tests}
                            </span>
                          </TableCell>

                          <TableCell>
                            {getStatusBadge(code.status)}
                          </TableCell>

                          <TableCell className="text-gray-600 whitespace-nowrap">
                            {formatDateTime(code.used_at)}
                          </TableCell>

                          <TableCell className="text-gray-600 whitespace-nowrap">
                            {formatDateTime(code.voided_at)}
                          </TableCell>

                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent align="end">
                                {code.status === "unused" &&
                                code.remaining_tests > 0 ? (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      openVoidDialog(code)
                                    }
                                    className="text-red-600"
                                  >
                                    <Ban className="w-4 h-4 mr-2" />
                                    手动作废
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem disabled>
                                    <Ban className="w-4 h-4 mr-2" />
                                    手动作废
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>

                <div className="flex items-center justify-between mt-5">
                  <div className="text-sm text-gray-500">
                    第 {currentPersonalPage} / {personalPageCount} 页
                  </div>

                  <div className="flex items-start gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">跳转到</span>
                        <Input
                          type="text"
                          inputMode="numeric"
                          placeholder="页码"
                          value={personalJumpPage}
                          onChange={(e) => {
                            const value = e.target.value;
                            setPersonalJumpPage(value);
                            setPersonalJumpError(
                              value ? validateJumpPage(value, personalPageCount) : ""
                            );
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handlePageJump(
                                personalJumpPage,
                                personalPageCount,
                                setPersonalPage,
                                setPersonalJumpError
                              );
                            }
                          }}
                          className={`h-9 w-24 ${
                            personalJumpError ? "border-red-500" : ""
                          }`}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handlePageJump(
                              personalJumpPage,
                              personalPageCount,
                              setPersonalPage,
                              setPersonalJumpError
                            )
                          }
                        >
                          跳转
                        </Button>
                      </div>

                      {personalJumpError && (
                        <p className="mt-1 text-xs text-red-600">
                          {personalJumpError}
                        </p>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPersonalPage <= 1}
                      onClick={() => setPersonalPage(1)}
                    >
                      首页
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPersonalPage <= 1}
                      onClick={() =>
                        setPersonalPage((page) => Math.max(1, page - 1))
                      }
                    >
                      上一页
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPersonalPage >= personalPageCount}
                      onClick={() =>
                        setPersonalPage((page) =>
                          Math.min(personalPageCount, page + 1)
                        )
                      }
                    >
                      下一页
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPersonalPage >= personalPageCount}
                      onClick={() => setPersonalPage(personalPageCount)}
                    >
                      末页
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========== 企业积分充值兑换码标签：来自 projects 原版 ========== */}
          <TabsContent value="recharge" className="space-y-6">
            <Card className="rounded-xl border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold">
                  企业检索
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex gap-3 mb-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="输入企业编号 / 企业名称检索"
                      value={enterpriseSearchKeyword}
                      onChange={(e) => {
                        setEnterpriseSearchKeyword(e.target.value);
                        setSearchedEnterprise(null);
                      }}
                      className="pl-10 rounded-lg"
                      onKeyDown={(e) =>
                        e.key === "Enter" && searchEnterprise()
                      }
                    />
                  </div>

                  <Button
                    onClick={searchEnterprise}
                    disabled={searchingEnterprise}
                    className="rounded-lg bg-gray-900"
                  >
                    {searchingEnterprise ? "搜索中..." : "搜索"}
                  </Button>
                </div>

                {searchedEnterprise && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-start justify-between gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 flex-1">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            企业编号
                          </p>
                          <p className="font-mono font-semibold text-gray-900">
                            {enterpriseCodeOf(searchedEnterprise)}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            企业名称
                          </p>
                          <p className="font-semibold text-gray-900">
                            {enterpriseNameOf(searchedEnterprise)}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            联系人
                          </p>
                          <p className="text-gray-700">
                            {enterpriseContactOf(searchedEnterprise)}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            当前剩余测评积分
                          </p>
                          <p className="font-semibold text-blue-600">
                            {enterprisePointsOf(searchedEnterprise)}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            账号状态
                          </p>
                          <span
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                              searchedEnterprise.status === "frozen"
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {searchedEnterprise.status === "frozen"
                              ? "已拉黑"
                              : "正常"}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          className="rounded-lg"
                          onClick={() =>
                            openDirectRechargeDialog(searchedEnterprise)
                          }
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          自定义充值积分
                        </Button>

                        <Button
                          variant={
                            searchedEnterprise.status === "frozen"
                              ? "default"
                              : "outline"
                          }
                          className={`rounded-lg ${
                            searchedEnterprise.status === "frozen"
                              ? "bg-gray-900"
                              : ""
                          }`}
                          onClick={() =>
                            toggleEnterpriseBlock(searchedEnterprise)
                          }
                        >
                          {searchedEnterprise.status === "frozen" ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              解除拉黑
                            </>
                          ) : (
                            <>
                              <Ban className="w-4 h-4 mr-2" />
                              拉黑
                            </>
                          )}
                        </Button>

                        <Button
                          variant="outline"
                          className="rounded-lg"
                          onClick={() =>
                            openEnterpriseEditDialog(searchedEnterprise)
                          }
                        >
                          <Building2 className="w-4 h-4 mr-2" />
                          企业信息管理
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {enterpriseSearchKeyword &&
                  !searchedEnterprise &&
                  !searchingEnterprise && (
                    <div className="text-center py-8 text-gray-500">
                      未查询到对应企业
                    </div>
                  )}
              </CardContent>
            </Card>

            <Card className="rounded-xl border-0 shadow-sm">
              <CardHeader className="pb-4 flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                  企业积分充值兑换码管理
                </CardTitle>

                <div className="flex gap-2">
                  <Dialog
                    open={rechargeGenDialogOpen}
                    onOpenChange={setRechargeGenDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="rounded-lg bg-gray-900 hover:bg-gray-800">
                        <Plus className="w-4 h-4 mr-2" />
                        单条生成
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="rounded-xl">
                      <DialogHeader>
                        <DialogTitle>
                          生成企业充值兑换码
                        </DialogTitle>
                      </DialogHeader>

                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>生成数量</Label>
                          <Input
                            type="number"
                            min={1}
                            max={1000}
                            value={rechargeGenCount}
                            onChange={(e) =>
                              setRechargeGenCount(
                                Number(e.target.value)
                              )
                            }
                          />
                          <p className="text-sm text-gray-500">
                            单次最多生成1000个充值码
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label>绑定积分值</Label>
                          <Input
                            type="number"
                            min={1}
                            value={rechargeGenPoints}
                            onChange={(e) =>
                              setRechargeGenPoints(
                                Number(e.target.value)
                              )
                            }
                          />
                          <p className="text-sm text-gray-500">
                            每个充值码包含的积分数量
                          </p>
                        </div>

                        {rechargeGeneratedCodes.length > 0 && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label>生成的充值码</Label>
                              <span className="text-sm text-gray-500">
                                本次共 {rechargeGeneratedCodes.length} 条，仅预览前100条
                              </span>
                            </div>

                            <div className="bg-gray-50 p-3 rounded-lg max-h-40 overflow-y-auto space-y-1">
                              {rechargeGeneratedCodes
                                .slice(0, 100)
                                .map((item, index) => (
                                  <div
                                    key={`${item.code}-${index}`}
                                    className="flex justify-between font-mono text-sm"
                                  >
                                    <span className="font-bold text-gray-800">
                                      {item.code}
                                    </span>
                                    <span className="text-blue-600">
                                      {item.points}积分
                                    </span>
                                  </div>
                                ))}
                            </div>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                copyToClipboard(
                                  rechargeGeneratedCodes
                                    .map(
                                      (item) =>
                                        `${item.code} (${item.points}积分)`
                                    )
                                    .join("\n")
                                )
                              }
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              复制全部
                            </Button>
                          </div>
                        )}
                      </div>

                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setRechargeGenDialogOpen(false);
                            setRechargeGeneratedCodes([]);
                          }}
                        >
                          关闭
                        </Button>

                        <Button
                          onClick={generateRechargeCodes}
                          disabled={rechargeGenerating}
                          className="bg-gray-900"
                        >
                          {rechargeGenerating ? "生成中..." : "生成"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="outline"
                    className="rounded-lg"
                    onClick={() =>
                      exportToExcel(
                        filteredRechargeCodes,
                        "企业充值兑换码"
                      )
                    }
                  >
                    <Download className="w-4 h-4 mr-2" />
                    导出Excel
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex gap-3 mb-6">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="搜索充值兑换码"
                      value={rechargeCodeKeyword}
                      onChange={(e) => {
                        setRechargeCodeKeyword(e.target.value);
                        setTenPage(1);
                      }}
                      className="pl-10 rounded-lg"
                    />
                  </div>

                  <select
                    className="border rounded-lg px-3 py-2 text-sm bg-white"
                    value={rechargeStatusFilter}
                    onChange={(e) => {
                      setRechargeStatusFilter(e.target.value);
                      setTenPage(1);
                    }}
                  >
                    <option value="">全部状态</option>
                    <option value="unused">未核销</option>
                    <option value="used">已核销</option>
                    <option value="voided">已作废</option>
                  </select>

                  <Button
                    onClick={loadActivationCodes}
                    variant="outline"
                    className="rounded-lg"
                  >
                    搜索
                  </Button>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium text-gray-700">
                    一共 {filteredRechargeCodes.length} 条
                  </div>
                  <div className="text-sm text-gray-500">
                    每页显示 {PAGE_SIZE} 条
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-100">
                      <TableHead className="text-gray-600 font-medium">
                        充值兑换码
                      </TableHead>
                      <TableHead className="text-gray-600 font-medium text-center">
                        绑定积分
                      </TableHead>
                      <TableHead className="text-gray-600 font-medium">
                        绑定企业
                      </TableHead>
                      <TableHead className="text-gray-600 font-medium">
                        生成时间
                      </TableHead>
                      <TableHead className="text-gray-600 font-medium">
                        核销状态
                      </TableHead>
                      <TableHead className="text-gray-600 font-medium">
                        核销时间
                      </TableHead>
                      <TableHead className="text-gray-600 font-medium">
                        作废时间
                      </TableHead>
                      <TableHead className="text-gray-600 font-medium">
                        操作
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {activationLoading ? (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="text-center py-8 text-gray-400"
                        >
                          加载中...
                        </TableCell>
                      </TableRow>
                    ) : filteredRechargeCodes.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="text-center py-8 text-gray-400"
                        >
                          暂无充值码数据
                        </TableCell>
                      </TableRow>
                    ) : (
                      pagedRechargeCodes.map((code) => (
                        <TableRow
                          key={code.code_id}
                          className="border-b border-gray-50"
                        >
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <code className="font-mono text-base font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded">
                                {code.code}
                              </code>

                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() =>
                                  copyToClipboard(code.code)
                                }
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>

                          <TableCell className="text-center">
                            <span className="font-semibold text-blue-600">
                              {code.points}
                            </span>
                          </TableCell>

                          <TableCell className="text-gray-600">
                            {code.bound_enterprise_name ||
                              (code.bound_enterprise_id
                                ? "-"
                                : "未绑定")}
                          </TableCell>

                          <TableCell className="text-gray-600">
                            {code.created_at
                              ? new Date(
                                  code.created_at
                                ).toLocaleDateString()
                              : "-"}
                          </TableCell>

                          <TableCell>
                            {getStatusBadge(code.status)}
                          </TableCell>

                          <TableCell className="text-gray-600 whitespace-nowrap">
                            {formatDateTime(code.used_at)}
                          </TableCell>

                          <TableCell className="text-gray-600 whitespace-nowrap">
                            {formatDateTime(code.voided_at)}
                          </TableCell>

                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent align="end">
                                {code.status === "unused" ? (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      openRechargeVoidDialog(code)
                                    }
                                    className="text-red-600"
                                  >
                                    <Ban className="w-4 h-4 mr-2" />
                                    手动作废
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem disabled>
                                    <Ban className="w-4 h-4 mr-2" />
                                    手动作废
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>

                <div className="flex items-center justify-between mt-5">
                  <div className="text-sm text-gray-500">
                    第 {currentTenPage} / {tenPageCount} 页
                  </div>

                  <div className="flex items-start gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          跳转到
                        </span>

                        <Input
                          type="text"
                          inputMode="numeric"
                          placeholder="页码"
                          value={tenJumpPage}
                          onChange={(e) => {
                            const value = e.target.value;
                            setTenJumpPage(value);
                            setTenJumpError(
                              value
                                ? validateJumpPage(
                                    value,
                                    tenPageCount
                                  )
                                : ""
                            );
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handlePageJump(
                                tenJumpPage,
                                tenPageCount,
                                setTenPage,
                                setTenJumpError
                              );
                            }
                          }}
                          className={`h-9 w-24 ${
                            tenJumpError
                              ? "border-red-500"
                              : ""
                          }`}
                        />

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handlePageJump(
                              tenJumpPage,
                              tenPageCount,
                              setTenPage,
                              setTenJumpError
                            )
                          }
                        >
                          跳转
                        </Button>
                      </div>

                      {tenJumpError && (
                        <p className="mt-1 text-xs text-red-600">
                          {tenJumpError}
                        </p>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentTenPage <= 1}
                      onClick={() => setTenPage(1)}
                    >
                      首页
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentTenPage <= 1}
                      onClick={() =>
                        setTenPage((page) =>
                          Math.max(1, page - 1)
                        )
                      }
                    >
                      上一页
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentTenPage >= tenPageCount}
                      onClick={() =>
                        setTenPage((page) =>
                          Math.min(
                            tenPageCount,
                            page + 1
                          )
                        )
                      }
                    >
                      下一页
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentTenPage >= tenPageCount}
                      onClick={() => setTenPage(tenPageCount)}
                    >
                      末页
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog
          open={voidDialogOpen}
          onOpenChange={setVoidDialogOpen}
        >
          <DialogContent className="rounded-xl max-w-md">
            <DialogHeader>
              <DialogTitle>作废兑换码</DialogTitle>
            </DialogHeader>

            <div className="py-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />

                <div>
                  <p className="text-gray-900 mb-2">
                    确定作废该兑换码？
                  </p>

                  <p className="text-sm text-gray-500">
                    作废后永久无法使用，不可恢复。
                  </p>

                  {voidingCode && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <code className="font-mono text-lg font-bold text-gray-900">
                        {voidingCode.code}
                      </code>

                      <p className="text-sm text-gray-500 mt-1">
                        剩余测试次数：
                        {voidingCode.remaining_tests}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setVoidDialogOpen(false);
                  setVoidingCode(null);
                }}
              >
                取消
              </Button>

              <Button
                onClick={confirmVoidCode}
                disabled={voiding}
                className="bg-red-600 hover:bg-red-700"
              >
                {voiding ? "作废中..." : "确认作废"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 企业充值码作废确认弹窗 */}
        <Dialog
          open={rechargeVoidDialogOpen}
          onOpenChange={(open) => {
            setRechargeVoidDialogOpen(open);
            if (!open) {
              setVoidingRechargeCode(null);
            }
          }}
        >
          <DialogContent className="rounded-xl max-w-md">
            <DialogHeader>
              <DialogTitle>作废企业充值兑换码</DialogTitle>
            </DialogHeader>

            <div className="py-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />

                <div>
                  <p className="text-gray-900 mb-2">
                    确定作废该企业充值兑换码？
                  </p>

                  <p className="text-sm text-gray-500">
                    作废后永久无法使用，不可恢复。
                  </p>

                  {voidingRechargeCode && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <code className="font-mono text-lg font-bold text-gray-900">
                        {voidingRechargeCode.code}
                      </code>

                      <p className="text-sm text-gray-500 mt-1">
                        绑定积分：{voidingRechargeCode.points}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setRechargeVoidDialogOpen(false);
                  setVoidingRechargeCode(null);
                }}
              >
                取消
              </Button>

              <Button
                onClick={confirmVoidRechargeCode}
                disabled={voidingRecharge}
                className="bg-red-600 hover:bg-red-700"
              >
                {voidingRecharge ? "作废中..." : "确认作废"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 企业登录密码修改弹窗 */}
        <Dialog
          open={enterprisePasswordDialogOpen}
          onOpenChange={(open) => {
            setEnterprisePasswordDialogOpen(open);

            if (!open) {
              setPasswordEnterprise(null);
              setNewEnterprisePassword("");
              setConfirmEnterprisePassword("");
              setEnterprisePasswordError("");
            }
          }}
        >
          <DialogContent className="rounded-xl">
            <DialogHeader>
              <DialogTitle>修改企业登录密码</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>企业名称</Label>
                <Input
                  value={
                    passwordEnterprise
                      ? enterpriseNameOf(passwordEnterprise)
                      : ""
                  }
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label>登录账号</Label>
                <Input
                  value={
                    passwordEnterprise?.username ||
                    passwordEnterprise?.adminAccount ||
                    ""
                  }
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label>新密码</Label>
                <Input
                  type="password"
                  value={newEnterprisePassword}
                  onChange={(e) => {
                    setNewEnterprisePassword(e.target.value);
                    setEnterprisePasswordError("");
                  }}
                  placeholder="请输入6至32位新密码"
                />
              </div>

              <div className="space-y-2">
                <Label>确认新密码</Label>
                <Input
                  type="password"
                  value={confirmEnterprisePassword}
                  onChange={(e) => {
                    setConfirmEnterprisePassword(e.target.value);
                    setEnterprisePasswordError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveEnterprisePassword();
                    }
                  }}
                  placeholder="请再次输入新密码"
                />
              </div>

              {enterprisePasswordError && (
                <p className="text-sm text-red-600">
                  {enterprisePasswordError}
                </p>
              )}
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() =>
                  setEnterprisePasswordDialogOpen(false)
                }
              >
                取消
              </Button>

              <Button
                onClick={saveEnterprisePassword}
                disabled={savingEnterprisePassword}
                className="bg-gray-900"
              >
                {savingEnterprisePassword
                  ? "保存中..."
                  : "确认修改"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* 直接充值弹窗：来自 projects 原版 */}
        <Dialog
          open={directRechargeDialogOpen}
          onOpenChange={setDirectRechargeDialogOpen}
        >
          <DialogContent className="rounded-xl">
            <DialogHeader>
              <DialogTitle>自定义充值积分</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>企业名称</Label>
                <Input
                  value={
                    selectedEnterprise
                      ? enterpriseNameOf(selectedEnterprise)
                      : ""
                  }
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label>当前积分</Label>
                <Input
                  value={
                    selectedEnterprise
                      ? enterprisePointsOf(selectedEnterprise)
                      : 0
                  }
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label>充值积分</Label>
                <Input
                  type="number"
                  min={1}
                  value={directRechargePoints}
                  onChange={(e) =>
                    setDirectRechargePoints(Number(e.target.value))
                  }
                  placeholder="请输入充值积分数值"
                />
                <p className="text-sm text-gray-500">
                  直接给企业账户增加积分，无需兑换码
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDirectRechargeDialogOpen(false)}
              >
                取消
              </Button>

              <Button
                onClick={handleDirectRecharge}
                disabled={
                  directRecharging || directRechargePoints < 1
                }
                className="bg-gray-900"
              >
                {directRecharging ? "充值中..." : "确认充值"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 企业信息编辑弹窗：来自 projects 原版 */}
        <Dialog
          open={enterpriseEditDialogOpen}
          onOpenChange={setEnterpriseEditDialogOpen}
        >
          <DialogContent className="rounded-xl">
            <DialogHeader>
              <DialogTitle>企业信息管理</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>企业编号</Label>
                <Input
                  value={
                    editingEnterprise
                      ? enterpriseCodeOf(editingEnterprise)
                      : ""
                  }
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label>企业名称</Label>
                <Input
                  value={
                    editingEnterprise
                      ? enterpriseNameOf(editingEnterprise)
                      : ""
                  }
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label>联系人</Label>
                <Input
                  value={enterpriseEditForm.contact_person}
                  onChange={(e) =>
                    setEnterpriseEditForm({
                      ...enterpriseEditForm,
                      contact_person: e.target.value,
                    })
                  }
                  placeholder="请输入联系人姓名"
                />
              </div>

              <div className="space-y-2">
                <Label>联系电话</Label>
                <Input
                  value={enterpriseEditForm.phone}
                  onChange={(e) =>
                    setEnterpriseEditForm({
                      ...enterpriseEditForm,
                      phone: e.target.value,
                    })
                  }
                  placeholder="请输入联系电话"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() =>
                  setEnterpriseEditDialogOpen(false)
                }
              >
                取消
              </Button>

              <Button
                onClick={saveEnterpriseInfo}
                disabled={savingEnterprise}
                className="bg-gray-900"
              >
                {savingEnterprise ? "保存中..." : "保存"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}





