export type EmployeeResultVisibility = "hidden" | "summary" | "full";

export interface TestBankConfig {
  id: string;
  name: string;
  questionCount: number;
  enabled: boolean;
  popular?: boolean;
}

export interface TestTypeConfig {
  id: string;
  name: string;
  enabled: boolean;
  banks: TestBankConfig[];
}

export const TEST_CATALOG: TestTypeConfig[] = [
  {
    id: "MBTI",
    name: "MBTI性格测试",
    enabled: true,
    banks: [
      {
        id: "MBTI60",
        name: "MBTI60（60题基础版）",
        questionCount: 60,
        enabled: true,
        popular: false,
      },
      {
        id: "MBTI93",
        name: "MBTI93（93题专业版）",
        questionCount: 93,
        enabled: true,
        popular: true,
      },
      {
        id: "MBTI200",
        name: "MBTI200（200题完整版）",
        questionCount: 200,
        enabled: true,
        popular: false,
      },
    ],
  },
];

export const RESULT_VISIBILITY_OPTIONS: Array<{
  value: EmployeeResultVisibility;
  label: string;
  description: string;
}> = [
  {
    value: "hidden",
    label: "员工不可见",
    description: "员工完成后只看到结果未开放提示",
  },
  {
    value: "summary",
    label: "员工可见精简版",
    description: "员工可查看人格类型、类型描述和核心特质",
  },
  {
    value: "full",
    label: "员工可见完整版",
    description: "员工可查看完整测评报告",
  },
];

export function getEnabledTestTypes() {
  return TEST_CATALOG.filter((item) => item.enabled);
}

export function getTestTypeConfig(testTypeId: string) {
  const normalized = String(testTypeId || "").trim().toUpperCase();
  return TEST_CATALOG.find(
    (item) => item.id.toUpperCase() === normalized,
  );
}

export function getTestBankConfig(
  testTypeId: string,
  bankId: string,
) {
  const type = getTestTypeConfig(testTypeId);
  const normalizedBankId = String(bankId || "")
    .trim()
    .toUpperCase();

  return type?.banks.find(
    (bank) => bank.id.toUpperCase() === normalizedBankId,
  );
}

export function findTestTypeByBankId(bankId: string) {
  const normalizedBankId = String(bankId || "")
    .trim()
    .toUpperCase();

  for (const testType of TEST_CATALOG) {
    const bank = testType.banks.find(
      (item) => item.id.toUpperCase() === normalizedBankId,
    );

    if (bank) {
      return { testType, bank };
    }
  }

  return null;
}

export function getTestTypeNameByBankId(bankId: string) {
  return findTestTypeByBankId(bankId)?.testType.name || "";
}

export function getTestBankName(bankId: string) {
  return findTestTypeByBankId(bankId)?.bank.name || "";
}

export function normalizeResultVisibility(
  value: unknown,
): EmployeeResultVisibility {
  return value === "hidden" || value === "full"
    ? value
    : "summary";
}

export function getResultVisibilityLabel(
  value: EmployeeResultVisibility,
) {
  return (
    RESULT_VISIBILITY_OPTIONS.find(
      (item) => item.value === value,
    )?.label || "员工可见精简版"
  );
}
