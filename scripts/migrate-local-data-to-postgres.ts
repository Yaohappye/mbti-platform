/* eslint-disable @typescript-eslint/no-explicit-any */
import { createHash, randomBytes } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { hash } from "bcryptjs";
import dotenv from "dotenv";
import {
  calculateLikertMBTI,
  calculateQuestionScore,
  generateLikertReport,
  getQuestionBank,
  type LikertAnswer,
} from "../src/lib/mbti-calculator-likert";
import type { Version } from "../src/data/mbti-questions-likert";

dotenv.config({ path: process.env.ENV_FILE || ".env.local" });
dotenv.config();

const MIGRATION = "local-json-v1";
const root = process.cwd();
const url = process.env.SUPABASE_URL || process.env.COZE_SUPABASE_URL;
const serviceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.COZE_SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}

const appEnvironment = process.env.APP_ENVIRONMENT;
if (appEnvironment !== "local" && appEnvironment !== "production") {
  throw new Error("APP_ENVIRONMENT must be local or production");
}

const databaseHostname = new URL(url).hostname;
const isLocalDatabase = ["127.0.0.1", "localhost", "::1"].includes(
  databaseHostname,
);
if (appEnvironment === "local" && !isLocalDatabase) {
  throw new Error("Refusing to import local JSON into a remote database");
}
if (appEnvironment === "production" && isLocalDatabase) {
  throw new Error("Refusing to import production data into a local database");
}

const db = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function readJson(filename: string, fallback: any) {
  try {
    return JSON.parse(await readFile(path.join(root, filename), "utf8"));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return fallback;
    throw error;
  }
}

function chunks<T>(items: T[], size = 200) {
  const result: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    result.push(items.slice(index, index + size));
  }
  return result;
}

async function upsertRows(table: string, rows: any[], onConflict: string) {
  const output: any[] = [];
  for (const batch of chunks(rows)) {
    if (!batch.length) continue;
    const { data, error } = await db
      .from(table)
      .upsert(batch, { onConflict })
      .select();
    if (error) throw new Error(`${table}: ${error.message}`);
    output.push(...(data || []));
  }
  return output;
}

function versionOf(value: unknown): Version {
  const match = String(value || "MBTI60").match(/(60|93|200)/);
  const parsed = Number(match?.[1] || 60);
  return (parsed === 93 || parsed === 200 ? parsed : 60) as Version;
}

function bankOf(value: unknown) {
  return `MBTI${versionOf(value)}`;
}

function legacyEnterpriseCode(value: string) {
  const normalized = value.trim().toUpperCase();
  if (/^(?=.*[A-Z])(?=.*\d)[A-Z0-9]{8}$/.test(normalized)) return normalized;
  const digest = createHash("sha256").update(normalized).digest();
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const body = Array.from(digest.subarray(0, 6), (byte) => chars[byte % chars.length]).join("");
  return `M${body}${digest[6] % 10}`;
}

function dateOrNow(value: unknown) {
  const date = new Date(String(value || ""));
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function safeGender(value: unknown) {
  return value === "male" || value === "female" ? value : "unspecified";
}

async function main() {
const personalCodes: any[] = await readJson(".local-activation-codes.json", []);
const identities: any[] = await readJson(".local-enterprise-identity-codes.json", []);
const groups: any[] = await readJson(".local-enterprise-test-groups.json", []);
const resultObject: Record<string, any> = await readJson(".local-mbti-results.json", {});
const results = Object.values(resultObject);

const enterpriseSources = new Map<string, { name: string; createdAt?: string; identity?: any }>();
for (const item of identities) {
  enterpriseSources.set(String(item.code), {
    name: String(item.enterpriseName || item.adminAccount || item.code),
    createdAt: item.createdAt,
    identity: item,
  });
}
for (const group of groups) {
  const id = String(group.enterpriseId || "").trim();
  if (id && !enterpriseSources.has(id)) {
    enterpriseSources.set(id, { name: String(group.enterpriseName || id), createdAt: group.createdAt });
  }
}
for (const result of results) {
  const id = String(result.enterpriseId || "").trim();
  if (id && !enterpriseSources.has(id)) {
    enterpriseSources.set(id, { name: String(result.enterpriseName || id), createdAt: result.createdAt });
  }
}

const enterpriseRows = Array.from(enterpriseSources, ([legacyId, source]) => ({
  code: legacyEnterpriseCode(legacyId),
  name: source.name,
  status: "active",
  metadata: {
    migration: MIGRATION,
    legacy_enterprise_id: legacyId,
    previous_code: source.identity?.previousCode || null,
  },
  created_at: dateOrNow(source.createdAt),
}));
const storedEnterprises = await upsertRows("enterprises", enterpriseRows, "code");
const enterpriseByLegacy = new Map<string, any>();
for (const [legacyId] of enterpriseSources) {
  const code = legacyEnterpriseCode(legacyId);
  const stored = storedEnterprises.find((item) => item.code === code);
  if (stored) enterpriseByLegacy.set(legacyId, stored);
}

const disabledPasswordHash = await hash(randomBytes(48).toString("base64url"), 12);
const adminRows = identities
  .map((identity) => {
    const enterprise = enterpriseByLegacy.get(String(identity.code));
    if (!enterprise || !identity.adminAccount) return null;
    return {
      enterprise_id: enterprise.id,
      username: String(identity.adminAccount),
      password_hash: disabledPasswordHash,
      display_name: String(identity.enterpriseName || identity.adminAccount),
      role: "owner",
      status: "disabled",
      created_at: dateOrNow(identity.createdAt),
    };
  })
  .filter(Boolean);
await upsertRows("enterprise_admins", adminRows, "username");

const allGroups = [...groups];
for (const result of results) {
  if (!result.enterpriseId || !result.groupId) continue;
  if (allGroups.some((group) => group.id === result.groupId)) continue;
  allGroups.push({
    id: result.groupId,
    enterpriseId: result.enterpriseId,
    enterpriseName: result.enterpriseName,
    groupCode: result.groupCode || legacyEnterpriseCode(String(result.groupId)),
    name: result.groupName || "历史测评分组",
    bankId: result.testType || "MBTI60",
    testTypeId: "MBTI",
    resultVisibility: result.employeeResultVisibility || "summary",
    status: "archived",
    createdAt: result.createdAt,
    codes: [],
  });
}
for (const result of results) {
  if (!result.enterpriseId || !result.groupId || !result.activationCode) continue;
  const group = allGroups.find((item) => String(item.id) === String(result.groupId));
  if (!group) continue;
  if (!Array.isArray(group.codes)) group.codes = [];
  if (group.codes.some((code: any) => code.code === result.activationCode)) continue;
  group.codes.push({
    code: result.activationCode,
    status: "completed",
    createdAt: result.startedAt || result.createdAt,
    claimedAt: result.startedAt || null,
    completedAt: result.endedAt || result.completedAt || result.createdAt,
    pointsCost: 5,
    employeeName: result.employeeName,
    department: result.department,
    phone: result.phone,
    gender: result.gender,
    sessionId: result.accessKey,
    useLogs: [
      {
        action: "claimed",
        usedAt: result.startedAt || result.createdAt,
        sessionId: result.accessKey,
        employeeName: result.employeeName,
        department: result.department,
      },
      {
        action: "completed",
        usedAt: result.endedAt || result.completedAt || result.createdAt,
        sessionId: result.accessKey,
        employeeName: result.employeeName,
        department: result.department,
      },
    ],
  });
}

const groupRows = allGroups.map((group) => ({
  enterprise_id: enterpriseByLegacy.get(String(group.enterpriseId))?.id,
  group_code: String(group.groupCode || legacyEnterpriseCode(String(group.id))).slice(0, 8).toUpperCase(),
  name: String(group.name || "历史测评分组"),
  note: group.note || null,
  test_type_id: String(group.testTypeId || "MBTI"),
  bank_id: bankOf(group.bankId || group.testType),
  result_visibility: ["hidden", "summary", "full"].includes(group.resultVisibility)
    ? group.resultVisibility
    : "summary",
  status: group.status === "archived" ? "archived" : "active",
  created_at: dateOrNow(group.createdAt),
}));
const storedGroups = await upsertRows(
  "enterprise_test_groups",
  groupRows.filter((row) => row.enterprise_id),
  "enterprise_id,group_code",
);
const groupByLegacy = new Map<string, any>();
for (const group of allGroups) {
  const enterprise = enterpriseByLegacy.get(String(group.enterpriseId));
  const stored = storedGroups.find(
    (item) =>
      item.enterprise_id === enterprise?.id &&
      item.group_code === String(group.groupCode || legacyEnterpriseCode(String(group.id))).slice(0, 8).toUpperCase(),
  );
  if (stored) groupByLegacy.set(String(group.id), stored);
}

const personalCodeRows = personalCodes.map((item) => ({
  code: String(item.code).toUpperCase(),
  scope: "personal",
  kind: item.kind === "ten" ? "ten" : "single",
  label: item.label || "个人激活码",
  status: item.status === "voided" ? "voided" : item.status === "used" ? "used" : "active",
  total_uses: Math.max(1, Number(item.totalUses) || 1),
  remaining_uses: Math.max(0, Number(item.remainingUses) || 0),
  created_by_type: "system",
  metadata: { migration: MIGRATION },
  created_at: dateOrNow(item.createdAt),
}));
await upsertRows("activation_codes", personalCodeRows, "code");

const enterpriseCodeSources = allGroups.flatMap((group) =>
  (group.codes || []).map((code: any) => ({ group, code })),
);
const enterpriseCodeRows = enterpriseCodeSources.map(({ group, code }) => {
  const enterprise = enterpriseByLegacy.get(String(group.enterpriseId));
  const storedGroup = groupByLegacy.get(String(group.id));
  const status = ["claimed", "completed", "voided"].includes(code.status)
    ? code.status
    : "active";
  return {
    code: String(code.code).toUpperCase(),
    scope: "enterprise",
    kind: "enterprise",
    label: "企业测评激活码",
    enterprise_id: enterprise?.id,
    group_id: storedGroup?.id,
    status,
    total_uses: 1,
    remaining_uses: status === "active" ? 1 : 0,
    points_cost: Math.max(0, Number(code.pointsCost) || 0),
    claimed_at: code.claimedAt || null,
    completed_at: code.completedAt || null,
    created_by_type: "system",
    metadata: { migration: MIGRATION, legacy_group_id: group.id },
    created_at: dateOrNow(code.createdAt),
  };
});
await upsertRows(
  "activation_codes",
  enterpriseCodeRows.filter((row) => row.enterprise_id && row.group_id),
  "code",
);
const { data: storedCodes, error: codeReadError } = await db
  .from("activation_codes")
  .select("id,code,enterprise_id,group_id,status");
if (codeReadError) throw new Error(codeReadError.message);
const codeByValue = new Map((storedCodes || []).map((item) => [String(item.code), item]));

const sessionSources = new Map<string, any>();
for (const result of results) sessionSources.set(String(result.accessKey), { ...result, completed: true });
for (const { group, code } of enterpriseCodeSources) {
  if (!code.sessionId || sessionSources.has(String(code.sessionId))) continue;
  sessionSources.set(String(code.sessionId), {
    accessKey: code.sessionId,
    testType: group.bankId || group.testType,
    enterpriseId: group.enterpriseId,
    enterpriseName: group.enterpriseName,
    groupId: group.id,
    groupCode: group.groupCode,
    groupName: group.name,
    activationCode: code.code,
    employeeName: code.employeeName,
    department: code.department,
    phone: code.phone,
    gender: code.gender,
    startedAt: code.startedAt || code.claimedAt,
    createdAt: code.claimedAt || code.createdAt,
    completed: false,
  });
}

const employeeRows = Array.from(sessionSources.values())
  .filter((item) => item.enterpriseId)
  .map((item) => ({
    enterprise_id: enterpriseByLegacy.get(String(item.enterpriseId))?.id,
    external_key: `${MIGRATION}:${item.accessKey}`,
    name: String(item.employeeName || "历史用户"),
    department: String(item.department || "未填写"),
    phone: item.phone || null,
    gender: safeGender(item.gender),
    metadata: { migration: MIGRATION, access_key: item.accessKey },
    created_at: dateOrNow(item.startedAt || item.createdAt),
  }));
const storedEmployees = await upsertRows(
  "enterprise_employees",
  employeeRows.filter((row) => row.enterprise_id),
  "enterprise_id,external_key",
);
const employeeByAccessKey = new Map(
  storedEmployees.map((item) => [String(item.external_key).replace(`${MIGRATION}:`, ""), item]),
);

const sessionRows = Array.from(sessionSources.values()).map((item) => {
  const enterprise = item.enterpriseId
    ? enterpriseByLegacy.get(String(item.enterpriseId))
    : null;
  const group = item.groupId ? groupByLegacy.get(String(item.groupId)) : null;
  const activationCode = item.activationCode
    ? codeByValue.get(String(item.activationCode).toUpperCase())
    : null;
  return {
    access_key: String(item.accessKey),
    enterprise_id: enterprise?.id || null,
    employee_id: employeeByAccessKey.get(String(item.accessKey))?.id || null,
    group_id: group?.id || null,
    activation_code_id: activationCode?.id || null,
    test_type_id: "MBTI",
    bank_id: bankOf(item.testType),
    mode: enterprise ? "enterprise" : "personal",
    gender: safeGender(item.gender),
    status: item.completed ? "completed" : "claimed",
    result_visibility: enterprise
      ? (["hidden", "summary", "full"].includes(item.employeeResultVisibility)
          ? item.employeeResultVisibility
          : group?.result_visibility || "summary")
      : "full",
    started_at: item.startedAt || null,
    completed_at: item.endedAt || item.completedAt || null,
    duration_seconds: Number.isFinite(Number(item.durationSeconds))
      ? Math.max(0, Number(item.durationSeconds))
      : null,
    client_metadata: { migration: MIGRATION, legacy_created_at: item.createdAt || null },
    created_at: dateOrNow(item.createdAt || item.startedAt),
  };
});
const storedSessions = await upsertRows("test_sessions", sessionRows, "access_key");
const sessionByAccessKey = new Map(storedSessions.map((item) => [String(item.access_key), item]));

const answerRows: any[] = [];
const resultRows: any[] = [];
for (const item of results) {
  const storedSession = sessionByAccessKey.get(String(item.accessKey));
  if (!storedSession) continue;
  const version = versionOf(item.testType);
  const bank = getQuestionBank(version);
  const questionById = new Map(bank.map((question) => [question.id, question]));
  const answers: LikertAnswer[] = (item.answers || [])
    .map((answer: any) => ({
      questionId: Number(answer.questionId),
      value: Number(answer.value ?? answer.answer),
    }))
    .filter(
      (answer: any) =>
        Number.isInteger(answer.questionId) &&
        answer.value >= 1 &&
        answer.value <= 5 &&
        questionById.has(answer.questionId),
    ) as LikertAnswer[];

  for (const answer of answers) {
    const question = questionById.get(answer.questionId)!;
    answerRows.push({
      session_id: storedSession.id,
      question_id: answer.questionId,
      answer_value: answer.value,
      dimension: question.dimension,
      reverse_scored: question.reverse,
      normalized_score: calculateQuestionScore(question, answer.value),
      answered_at: dateOrNow(item.endedAt || item.createdAt),
    });
  }

  const calculated = calculateLikertMBTI(version, answers);
  resultRows.push({
    session_id: storedSession.id,
    mbti_type: calculated.type,
    ei_score: calculated.dimensionScores.EI.percentage,
    sn_score: calculated.dimensionScores.SN.percentage,
    tf_score: calculated.dimensionScores.TF.percentage,
    jp_score: calculated.dimensionScores.JP.percentage,
    dimension_scores: calculated.dimensionScores,
    report: generateLikertReport(calculated),
    report_version: "legacy-recalculated-v1",
    calculation_version: "likert-v1",
    created_at: dateOrNow(item.endedAt || item.createdAt),
  });
}
await upsertRows("test_answers", answerRows, "session_id,question_id");
await upsertRows("mbti_results", resultRows, "session_id");

for (const { group, code } of enterpriseCodeSources) {
  const storedCode = codeByValue.get(String(code.code).toUpperCase());
  const storedSession = code.sessionId
    ? sessionByAccessKey.get(String(code.sessionId))
    : null;
  const employee = code.sessionId
    ? employeeByAccessKey.get(String(code.sessionId))
    : null;
  if (!storedCode || !storedSession) continue;
  const { error } = await db
    .from("activation_codes")
    .update({
      claimed_by_employee_id: employee?.id || null,
      claimed_session_id: storedSession.id,
      claimed_at: code.claimedAt || null,
      completed_at: code.completedAt || null,
      status: code.status,
      remaining_uses: code.status === "active" ? 1 : 0,
      metadata: { migration: MIGRATION, legacy_group_id: group.id },
    })
    .eq("id", storedCode.id);
  if (error) throw new Error(`activation_codes claim update: ${error.message}`);
}

const eventRows: any[] = [];
for (const item of personalCodes) {
  const storedCode = codeByValue.get(String(item.code).toUpperCase());
  if (!storedCode) continue;
  eventRows.push({
    source_key: `${MIGRATION}:personal:${item.code}:created`,
    activation_code_id: storedCode.id,
    event_type: "created",
    before_remaining_uses: item.totalUses,
    after_remaining_uses: item.totalUses,
    details: { migration: MIGRATION },
    created_at: dateOrNow(item.createdAt),
  });
  for (const [index, log] of (item.useLogs || []).entries()) {
    eventRows.push({
      source_key: `${MIGRATION}:personal:${item.code}:consumed:${index}`,
      activation_code_id: storedCode.id,
      event_type: "consumed",
      before_remaining_uses: log.beforeRemainingUses ?? null,
      after_remaining_uses: log.afterRemainingUses ?? null,
      details: { migration: MIGRATION, use_index: log.useIndex || index + 1 },
      created_at: dateOrNow(log.usedAt || item.usedAt),
    });
  }
  if (item.status === "voided") {
    eventRows.push({
      source_key: `${MIGRATION}:personal:${item.code}:voided`,
      activation_code_id: storedCode.id,
      event_type: "voided",
      before_remaining_uses: item.remainingUses,
      after_remaining_uses: item.remainingUses,
      details: { migration: MIGRATION },
      created_at: dateOrNow(item.voidedAt || item.createdAt),
    });
  }
}
for (const { group, code } of enterpriseCodeSources) {
  const storedCode = codeByValue.get(String(code.code).toUpperCase());
  if (!storedCode) continue;
  eventRows.push({
    source_key: `${MIGRATION}:enterprise:${code.code}:created`,
    activation_code_id: storedCode.id,
    enterprise_id: enterpriseByLegacy.get(String(group.enterpriseId))?.id,
    event_type: "created",
    before_remaining_uses: 1,
    after_remaining_uses: 1,
    details: { migration: MIGRATION, legacy_group_id: group.id },
    created_at: dateOrNow(code.createdAt),
  });
  for (const [index, log] of (code.useLogs || []).entries()) {
    eventRows.push({
      source_key: `${MIGRATION}:enterprise:${code.code}:${log.action || "claimed"}:${index}`,
      activation_code_id: storedCode.id,
      session_id: log.sessionId ? sessionByAccessKey.get(String(log.sessionId))?.id : null,
      enterprise_id: enterpriseByLegacy.get(String(group.enterpriseId))?.id,
      employee_id: log.sessionId ? employeeByAccessKey.get(String(log.sessionId))?.id : null,
      event_type: log.action === "completed" ? "completed" : "claimed",
      before_remaining_uses: index === 0 ? 1 : 0,
      after_remaining_uses: 0,
      details: { migration: MIGRATION, employee_name: log.employeeName, department: log.department },
      created_at: dateOrNow(log.usedAt),
    });
  }
}
await upsertRows("activation_code_events", eventRows, "source_key");

console.log(
  JSON.stringify(
    {
      migration: MIGRATION,
      enterprises: enterpriseRows.length,
      disabledEnterpriseAdmins: adminRows.length,
      groups: groupRows.length,
      activationCodes: personalCodeRows.length + enterpriseCodeRows.length,
      sessions: sessionRows.length,
      answers: answerRows.length,
      results: resultRows.length,
      activationEvents: eventRows.length,
      enterpriseCodeMap: Object.fromEntries(
        Array.from(enterpriseSources.keys(), (legacyId) => [legacyId, legacyEnterpriseCode(legacyId)]),
      ),
      warning:
        "Legacy browser-local passwords were never present in the JSON files. Migrated legacy admins are disabled and require a platform password reset before login.",
    },
    null,
    2,
  ),
);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
