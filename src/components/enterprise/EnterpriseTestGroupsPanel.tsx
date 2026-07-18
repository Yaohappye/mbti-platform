"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, KeyRound, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  RESULT_VISIBILITY_OPTIONS,
  findTestTypeByBankId,
  getEnabledTestTypes,
  getResultVisibilityLabel,
  getTestBankConfig,
  getTestTypeConfig,
  normalizeResultVisibility,
  type EmployeeResultVisibility,
} from "@/data/test-catalog";

type CodeStatus = "active" | "claimed" | "completed" | "voided";

interface ActivationUseLog {
  usedAt: string;
  action: "claimed" | "completed";
  employeeName?: string;
  department?: string;
  sessionId?: string;
}

interface EnterpriseTestCode {
  code: string;
  status: CodeStatus;
  createdAt: string;
  pointsCost: number;
  claimedAt?: string;
  startedAt?: string;
  completedAt?: string;
  durationSeconds?: number;
  employeeName?: string;
  department?: string;
  sessionId?: string;
  useLogs: ActivationUseLog[];
}

interface EnterpriseTestGroup {
  id: string;
  groupCode: string;
  enterpriseId: string;
  enterpriseName: string;
  name: string;
  note: string;
  testTypeId: string;
  bankId: string;
  testType: string;
  resultVisibility: EmployeeResultVisibility;
  createdAt: string;
  updatedAt?: string;
  codes: EnterpriseTestCode[];
}

interface Props {
  enterpriseId: string;
  enterpriseName: string;
  credits: number;
  onCreditsChange: (credits: number) => void;
}

interface CreateGroupForm {
  name: string;
  testTypeId: string;
  bankId: string;
  resultVisibility: EmployeeResultVisibility;
  note: string;
}

const GENERATE_COST = 5;

const statusLabels: Record<CodeStatus, string> = {
  active: "未使用",
  claimed: "已填写员工信息",
  completed: "已完成测评",
  voided: "已作废",
};

const enabledTestTypes = getEnabledTestTypes();

function createDefaultForm(): CreateGroupForm {
  const firstType = enabledTestTypes[0];
  const firstBank = firstType?.banks.find((item) => item.enabled);

  return {
    name: "",
    testTypeId: firstType?.id || "",
    bankId: firstBank?.id || "",
    resultVisibility: "summary",
    note: "",
  };
}

export default function EnterpriseTestGroupsPanel({
  enterpriseId,
  enterpriseName,
  credits,
  onCreditsChange,
}: Props) {
  const [groups, setGroups] = useState<EnterpriseTestGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [workingKey, setWorkingKey] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<CreateGroupForm>(
    createDefaultForm,
  );

  const selectedTestType = useMemo(
    () => getTestTypeConfig(form.testTypeId),
    [form.testTypeId],
  );

  const selectableBanks = useMemo(
    () =>
      (selectedTestType?.banks || []).filter(
        (item) => item.enabled,
      ),
    [selectedTestType],
  );

  useEffect(() => {
    if (enterpriseId) {
      void loadGroups();
    }
  }, [enterpriseId, enterpriseName]);

  const loadGroups = async () => {
    if (!enterpriseId) return;

    setLoading(true);

    try {
      const params = new URLSearchParams({
        enterpriseId,
        enterpriseName,
      });

      const response = await fetch(
        `/api/admin/enterprise/test-groups?${params.toString()}`,
        { cache: "no-store" },
      );
      const data = await response.json();

      if (!response.ok || data.code !== 0) {
        throw new Error(data.message || "加载企业分组失败");
      }

      setGroups(
        Array.isArray(data.data?.list) ? data.data.list : [],
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "加载企业分组失败",
      );
    } finally {
      setLoading(false);
    }
  };

  const openCreateDialog = () => {
    setForm(createDefaultForm());
    setCreateOpen(true);
  };

  const changeTestType = (testTypeId: string) => {
    const nextType = getTestTypeConfig(testTypeId);
    const firstBank = nextType?.banks.find(
      (item) => item.enabled,
    );

    setForm((current) => ({
      ...current,
      testTypeId,
      bankId: firstBank?.id || "",
    }));
  };

  const createGroup = async () => {
    const name = form.name.trim();

    if (!name) {
      toast.error("请输入分组名称");
      return;
    }

    if (!form.testTypeId || !form.bankId) {
      toast.error("请选择测试类型和题库版本");
      return;
    }

    setCreating(true);

    try {
      const response = await fetch(
        "/api/admin/enterprise/test-groups",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "create_group",
            enterpriseId,
            enterpriseName,
            name,
            testTypeId: form.testTypeId,
            bankId: form.bankId,
            resultVisibility: form.resultVisibility,
            note: form.note.trim(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || data.code !== 0) {
        throw new Error(data.message || "创建分组失败");
      }

      setGroups(
        Array.isArray(data.data?.list) ? data.data.list : [],
      );
      setCreateOpen(false);
      setForm(createDefaultForm());

      toast.success(
        `分组创建成功，分组编码：${
          data.data?.group?.groupCode || ""
        }`,
      );
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "创建分组失败",
      );
    } finally {
      setCreating(false);
    }
  };

  const generateCode = async (group: EnterpriseTestGroup) => {
    const currentCredits = Number(credits) || 0;

    if (currentCredits < GENERATE_COST) {
      toast.error(
        `当前积分不足。生成一个激活码需要${GENERATE_COST}积分，当前只有${currentCredits}积分。`,
      );
      return;
    }

    setWorkingKey(`GENERATE_${group.id}`);

    try {
      const response = await fetch(
        "/api/admin/enterprise/test-groups",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "generate_code",
            enterpriseId,
            enterpriseName,
            groupId: group.id,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || data.code !== 0) {
        throw new Error(data.message || "生成激活码失败");
      }

      const code = data.data?.activationCode?.code || "";
      setGroups(
        Array.isArray(data.data?.list) ? data.data.list : [],
      );
      onCreditsChange(Number(data.data?.credits) || currentCredits - GENERATE_COST);

      toast.success(`激活码 ${code} 已生成`);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "生成激活码失败",
      );
    } finally {
      setWorkingKey("");
    }
  };

  const deleteGroup = async (group: EnterpriseTestGroup) => {
    const confirmed = window.confirm(
      `确定删除分组“${group.name}”吗？\n\n删除后，该分组下尚未使用的激活码将立即失效；已经产生的员工测评历史记录不会删除。`,
    );

    if (!confirmed) return;

    setWorkingKey(`DELETE_${group.id}`);

    try {
      const response = await fetch(
        "/api/admin/enterprise/test-groups",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "delete_group",
            enterpriseId,
            groupId: group.id,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || data.code !== 0) {
        throw new Error(data.message || "删除分组失败");
      }

      setGroups(
        Array.isArray(data.data?.list) ? data.data.list : [],
      );
      toast.success("分组已删除");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "删除分组失败",
      );
    } finally {
      setWorkingKey("");
    }
  };

  const voidCode = async (groupId: string, code: string) => {
    const key = `VOID_${groupId}_${code}`;
    setWorkingKey(key);

    try {
      const response = await fetch(
        "/api/admin/enterprise/test-groups",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "void_code",
            enterpriseId,
            groupId,
            code,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || data.code !== 0) {
        throw new Error(data.message || "作废激活码失败");
      }

      setGroups(
        Array.isArray(data.data?.list) ? data.data.list : [],
      );
      toast.success("激活码已作废");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "作废激活码失败",
      );
    } finally {
      setWorkingKey("");
    }
  };

  const copyCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
    toast.success("激活码已复制");
  };

  const formatDateTime = (value?: string) => {
    if (!value) return "-";
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? "-"
      : date.toLocaleString("zh-CN");
  };

  const getStartedAt = (code: EnterpriseTestCode) =>
    code.startedAt || code.claimedAt || "";

  const getDurationSeconds = (code: EnterpriseTestCode) => {
    const startedAt = getStartedAt(code);

    if (Number.isFinite(Number(code.durationSeconds))) {
      return Math.max(0, Number(code.durationSeconds));
    }

    if (!startedAt || !code.completedAt) return null;

    const seconds = Math.floor(
      (new Date(code.completedAt).getTime() -
        new Date(startedAt).getTime()) /
        1000,
    );

    return Number.isFinite(seconds)
      ? Math.max(0, seconds)
      : null;
  };

  const formatDuration = (code: EnterpriseTestCode) => {
    const seconds = getDurationSeconds(code);

    if (seconds === null) return "-";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}小时${minutes}分${remainSeconds}秒`;
    }

    return `${minutes}分${remainSeconds}秒`;
  };

  const getGroupTypeName = (group: EnterpriseTestGroup) =>
    getTestTypeConfig(group.testTypeId)?.name ||
    findTestTypeByBankId(group.bankId || group.testType)
      ?.testType.name ||
    group.testTypeId ||
    "-";

  const getGroupBankName = (group: EnterpriseTestGroup) =>
    getTestBankConfig(
      group.testTypeId,
      group.bankId || group.testType,
    )?.name ||
    findTestTypeByBankId(group.bankId || group.testType)
      ?.bank.name ||
    group.bankId ||
    group.testType ||
    "-";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">
            企业测试
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            企业可按实际用途创建分组，并独立设置题库和员工结果权限。
          </p>
        </div>

        <Button
          type="button"
          onClick={openCreateDialog}
          className="gap-2 rounded-xl bg-slate-950 hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" />
          创建分组
        </Button>
      </div>

      <Card className="rounded-3xl border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>已创建分组</CardTitle>
            <p className="mt-1 text-sm text-slate-500">
              共 {groups.length} 个分组
            </p>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
              正在加载企业分组...
            </div>
          ) : groups.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
              <div className="text-lg font-bold text-slate-800">
                还没有创建分组
              </div>
              <p className="mt-2 text-sm text-slate-500">
                点击右上角“创建分组”开始建立第一个企业测试分组。
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white"
                >
                  <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-indigo-50/50 p-6">
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-black text-slate-900">
                            {group.name}
                          </h3>
                          <code className="rounded-lg border border-indigo-100 bg-white px-3 py-1 font-mono text-sm font-black tracking-wider text-indigo-700">
                            {group.groupCode}
                          </code>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                          <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                            <div className="text-xs font-semibold text-slate-400">
                              测试类型
                            </div>
                            <div className="mt-1 font-semibold text-slate-800">
                              {getGroupTypeName(group)}
                            </div>
                          </div>

                          <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                            <div className="text-xs font-semibold text-slate-400">
                              题库版本
                            </div>
                            <div className="mt-1 font-semibold text-slate-800">
                              {getGroupBankName(group)}
                            </div>
                          </div>

                          <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                            <div className="text-xs font-semibold text-slate-400">
                              员工结果权限
                            </div>
                            <div className="mt-1 font-semibold text-slate-800">
                              {getResultVisibilityLabel(
                                normalizeResultVisibility(
                                  group.resultVisibility,
                                ),
                              )}
                            </div>
                          </div>

                          <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                            <div className="text-xs font-semibold text-slate-400">
                              创建时间
                            </div>
                            <div className="mt-1 font-semibold text-slate-800">
                              {formatDateTime(group.createdAt)}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 text-sm text-slate-600">
                          <span className="font-semibold text-slate-700">
                            备注：
                          </span>
                          {group.note || "无"}
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-wrap gap-2">
                        <Button
                          type="button"
                          onClick={() => generateCode(group)}
                          disabled={
                            workingKey === `GENERATE_${group.id}`
                          }
                          className="gap-2"
                        >
                          <KeyRound className="h-4 w-4" />
                          {workingKey === `GENERATE_${group.id}`
                            ? "生成中..."
                            : "生成激活码"}
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => deleteGroup(group)}
                          disabled={
                            workingKey === `DELETE_${group.id}`
                          }
                          className="gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                          {workingKey === `DELETE_${group.id}`
                            ? "删除中..."
                            : "删除分组"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="font-bold text-slate-900">
                        分组激活码
                      </h4>
                      <span className="text-sm text-slate-500">
                        共 {group.codes?.length || 0} 条
                      </span>
                    </div>

                    {!group.codes?.length ? (
                      <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
                        该分组还没有生成激活码。
                      </div>
                    ) : (
                      <div className="overflow-x-auto rounded-2xl border border-slate-200">
                        <table className="w-full min-w-[1450px] text-sm">
                          <thead className="bg-slate-50 text-left text-slate-600">
                            <tr>
                              <th className="whitespace-nowrap px-4 py-3">
                                激活码
                              </th>
                              <th className="whitespace-nowrap px-4 py-3">
                                题库
                              </th>
                              <th className="whitespace-nowrap px-4 py-3">
                                状态
                              </th>
                              <th className="whitespace-nowrap px-4 py-3">
                                生成时间
                              </th>
                              <th className="whitespace-nowrap px-4 py-3">
                                开始答题时间
                              </th>
                              <th className="whitespace-nowrap px-4 py-3">
                                结束答题时间
                              </th>
                              <th className="whitespace-nowrap px-4 py-3">
                                答题时长
                              </th>
                              <th className="whitespace-nowrap px-4 py-3">
                                员工
                              </th>
                              <th className="whitespace-nowrap px-4 py-3 text-right">
                                操作
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {group.codes.map((item) => (
                              <tr
                                key={item.code}
                                className="border-t border-slate-100"
                              >
                                <td className="px-4 py-4 font-mono text-lg font-black tracking-wider text-indigo-700">
                                  {item.code}
                                </td>
                                <td className="px-4 py-4">
                                  {getGroupBankName(group)}
                                </td>
                                <td className="px-4 py-4">
                                  <Badge
                                    variant={
                                      item.status === "active"
                                        ? "default"
                                        : "secondary"
                                    }
                                  >
                                    {statusLabels[item.status] ||
                                      item.status}
                                  </Badge>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-slate-500">
                                  {formatDateTime(item.createdAt)}
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-slate-500">
                                  {formatDateTime(
                                    getStartedAt(item),
                                  )}
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-slate-500">
                                  {formatDateTime(
                                    item.completedAt,
                                  )}
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-slate-500">
                                  {formatDuration(item)}
                                </td>
                                <td className="whitespace-nowrap px-4 py-4">
                                  {item.employeeName || "-"}
                                </td>
                                <td className="px-4 py-4">
                                  <div className="flex justify-end gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        copyCode(item.code)
                                      }
                                      className="gap-1"
                                    >
                                      <Copy className="h-3.5 w-3.5" />
                                      复制
                                    </Button>

                                    {item.status === "active" && (
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() =>
                                          voidCode(
                                            group.id,
                                            item.code,
                                          )
                                        }
                                        disabled={
                                          workingKey ===
                                          `VOID_${group.id}_${item.code}`
                                        }
                                      >
                                        作废
                                      </Button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={createOpen}
        onOpenChange={(open) => {
          setCreateOpen(open);
          if (!open) setForm(createDefaultForm());
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              创建企业测试分组
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-5 py-4">
            <div className="space-y-2">
              <Label>
                分组名称 <span className="text-red-500">*</span>
              </Label>
              <Input
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                placeholder="例如：研发部2026年度测评"
                maxLength={60}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>
                  测试类型 <span className="text-red-500">*</span>
                </Label>
                <select
                  value={form.testTypeId}
                  onChange={(event) =>
                    changeTestType(event.target.value)
                  }
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                >
                  {enabledTestTypes.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label>
                  题库版本 <span className="text-red-500">*</span>
                </Label>
                <select
                  value={form.bankId}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      bankId: event.target.value,
                    }))
                  }
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                >
                  {selectableBanks.map((bank) => (
                    <option key={bank.id} value={bank.id}>
                      {bank.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>
                员工结果权限{" "}
                <span className="text-red-500">*</span>
              </Label>
              <select
                value={form.resultVisibility}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    resultVisibility:
                      event.target
                        .value as EmployeeResultVisibility,
                  }))
                }
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              >
                {RESULT_VISIBILITY_OPTIONS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-500">
                {
                  RESULT_VISIBILITY_OPTIONS.find(
                    (item) =>
                      item.value === form.resultVisibility,
                  )?.description
                }
              </p>
            </div>

            <div className="space-y-2">
              <Label>备注（选填）</Label>
              <textarea
                value={form.note}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    note: event.target.value,
                  }))
                }
                placeholder="填写本次分组用途、适用部门或其他说明"
                maxLength={200}
                rows={4}
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setCreateOpen(false)}
            >
              取消
            </Button>
            <Button
              type="button"
              onClick={createGroup}
              disabled={creating}
              className="bg-slate-950 hover:bg-slate-800"
            >
              {creating ? "创建中..." : "确定创建"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
