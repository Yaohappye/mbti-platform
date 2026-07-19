"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Brain,
  Clock,
  Target,
  TrendingUp,
  Users,
  Zap,
  Shield,
  Heart,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Globe,
  ChevronDown,
} from "lucide-react";
import { I18nProvider, useI18n } from "@/i18n/provider";
import LanguageSelector from "@/components/LanguageSelector";
import { mbtiGroups, getGroupColor } from "@/data/mbti-images";
import { defaultLocale } from "@/i18n/config";
import { mbtiFullReports } from "@/data/mbti-full-reports";
import type { MBTIFullReport } from "@/data/mbti-full-reports";
import { getEnabledTestTypes } from "@/data/test-catalog";
import { X, Quote, Lightbulb, User } from "lucide-react";

// 生成动态统计数据
function getStats() {
  // 基于日期生成一个稳定的基础数字
  const now = new Date();
  const baseDate = new Date("2024-01-01");
  const daysSinceBase = Math.floor(
    (now.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  // 全球累计测试人数：1200万 + 每天约500-800人增长
  const totalTests = 12869542 + daysSinceBase * 687;

  // 今日完成人数：基于当前小时生成一个2000-5000之间的数字
  const currentHour = now.getHours();
  const todayTests = 2200 + currentHour * 89 + Math.floor(Math.random() * 200);

  return {
    totalTests: totalTests.toLocaleString("zh-CN"),
    todayTests: todayTests.toLocaleString("zh-CN"),
  };
}

// 16种类型数据
const mbtiTypes = [
  ...mbtiGroups.analysts.map((t) => ({ type: t, group: "analysts" as const })),
  ...mbtiGroups.diplomats.map((t) => ({
    type: t,
    group: "diplomats" as const,
  })),
  ...mbtiGroups.sentinels.map((t) => ({
    type: t,
    group: "sentinels" as const,
  })),
  ...mbtiGroups.explorers.map((t) => ({
    type: t,
    group: "explorers" as const,
  })),
];

// 动态统计展示组件
function StatsDisplay() {
  const [stats, setStats] = useState({ totalTests: "", todayTests: "" });

  useEffect(() => {
    setStats(getStats());
  }, []);

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:gap-10 lg:grid-cols-5 lg:gap-12">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Globe className="w-5 h-5 text-primary" />
          <div className="text-3xl md:text-4xl font-bold text-foreground">
            {stats.totalTests}
          </div>
        </div>
        <div className="text-sm text-muted-foreground">累计测评人数</div>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <TrendingUp className="w-5 h-5 text-emerald-500" />
          <div className="text-3xl md:text-4xl font-bold text-foreground">
            {stats.todayTests}
          </div>
        </div>
        <div className="text-sm text-muted-foreground">今日完成测评</div>
      </div>

      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-foreground">
          10M+
        </div>
        <div className="text-sm text-muted-foreground">全球用户</div>
      </div>

      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-foreground">
          95%
        </div>
        <div className="text-sm text-muted-foreground">准确度</div>
      </div>

      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-foreground">16</div>
        <div className="text-sm text-muted-foreground">人格类型</div>
      </div>
    </div>
  );
}

// 主页面组件
const MBTI_PROGRESS_CURRENT_KEY = "mbti_current_progress_v1";

interface SavedQuizProgress {
  key: string;
  testType: string;
  url: string;
  currentIndex: number;
  answeredCount: number;
  totalCount: number;
  savedAt: string;
}

function HomePageContent() {
  const router = useRouter();
  const { t, locale } = useI18n();
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [password, setPassword] = useState(["", "", "", "", "", "", "", ""]);
  const [passwordError, setPasswordError] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [savedProgress, setSavedProgress] = useState<SavedQuizProgress | null>(
    null,
  );

  const [showEnterpriseLoginModal, setShowEnterpriseLoginModal] =
    useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("enterpriseLogin") === "1") {
      setEnterpriseMessage("");
      setShowEnterpriseLoginModal(true);
      window.history.replaceState({}, "", "/mbti-home");
    }
  }, []);
  const [showEnterpriseRegisterModal, setShowEnterpriseRegisterModal] =
    useState(false);
  const [enterpriseLoginAccount, setEnterpriseLoginAccount] = useState("");
  const [enterpriseLoginPassword, setEnterpriseLoginPassword] = useState("");
  const [enterpriseLoginLoading, setEnterpriseLoginLoading] = useState(false);
  const [showEnterpriseLoginPassword, setShowEnterpriseLoginPassword] =
    useState(false);
  const [enterpriseName, setEnterpriseName] = useState("");
  const [enterpriseShortName, setEnterpriseShortName] = useState("");
  const [enterprisePhone, setEnterprisePhone] = useState("");
  const [enterpriseAdminAccount, setEnterpriseAdminAccount] = useState("");
  const [enterpriseAdminPassword, setEnterpriseAdminPassword] = useState("");
  const [enterpriseAdminPasswordConfirm, setEnterpriseAdminPasswordConfirm] =
    useState("");
  const [showEnterpriseAdminPassword, setShowEnterpriseAdminPassword] =
    useState(false);
  const [
    showEnterpriseAdminPasswordConfirm,
    setShowEnterpriseAdminPasswordConfirm,
  ] = useState(false);
  const [enterpriseMessage, setEnterpriseMessage] = useState("");
  const passwordInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const loadSavedQuizProgress = () => {
    try {
      const savedRaw = localStorage.getItem(MBTI_PROGRESS_CURRENT_KEY);
      if (!savedRaw) {
        setSavedProgress(null);
        return;
      }

      const saved = JSON.parse(savedRaw) as SavedQuizProgress;
      if (saved?.url && saved?.answeredCount > 0 && saved?.totalCount > 0) {
        setSavedProgress(saved);
      } else {
        setSavedProgress(null);
      }
    } catch (err) {
      console.warn("读取本地答题进度失败:", err);
      setSavedProgress(null);
    }
  };

  useEffect(() => {
    setIsVisible(true);
    loadSavedQuizProgress();

    const onFocus = () => loadSavedQuizProgress();
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        loadSavedQuizProgress();
      }
    };

    window.addEventListener("focus", onFocus);
    window.addEventListener("pageshow", onFocus);
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("pageshow", onFocus);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const testVersions = getEnabledTestTypes().flatMap(
    (testType) =>
      testType.banks
        .filter((bank) => bank.enabled)
        .map((bank) => ({
          id: bank.id,
          name: bank.name,
          testTypeName: testType.name,
          icon:
            bank.id === "MBTI60"
              ? Target
              : bank.id === "MBTI93"
                ? Brain
                : TrendingUp,
          questions: bank.questionCount,
          popular: Boolean(bank.popular),
        })),
  );

  const features = [
    {
      icon: Shield,
      key: "scientific",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Target,
      key: "accurate",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Heart,
      key: "personalized",
      color: "from-rose-500 to-orange-500",
    },
  ];

  const handleStartTest = () => {
    setShowPasswordModal(true);
  };

  const resetEnterpriseRegisterForm = () => {
    setEnterpriseName("");
    setEnterpriseShortName("");
    setEnterprisePhone("");
    setEnterpriseAdminAccount("");
    setEnterpriseAdminPassword("");
    setEnterpriseAdminPasswordConfirm("");
  };

  const handleEnterpriseRegister = async () => {
    const name = enterpriseName.trim();
    const phone = enterprisePhone.trim();
    const account = enterpriseAdminAccount.trim();
    const password = enterpriseAdminPassword.trim();
    const passwordConfirm = enterpriseAdminPasswordConfirm.trim();

    if (!name || !phone || !account || !password || !passwordConfirm) {
      setEnterpriseMessage(
        "请填写企业名称、手机号、登录账号、登录密码和确认密码",
      );
      return;
    }

    const phoneReg = /^1[3-9]\d{9}$/;
    if (!phoneReg.test(phone)) {
      setEnterpriseMessage("手机号格式不正确，请输入11位中国大陆手机号");
      return;
    }

    if (password.length < 8) {
      setEnterpriseMessage("企业登录密码长度必须大于等于8位");
      return;
    }

    if (password !== passwordConfirm) {
      setEnterpriseMessage("两次输入的密码不一致");
      return;
    }

    try {
      const response = await fetch("/api/enterprise/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enterpriseName: name,
          enterpriseShortName: enterpriseShortName.trim(),
          phone,
          adminAccount: account,
          password,
        }),
      });
      const result = await response.json();
      if (!response.ok || result.code !== 0) {
        setEnterpriseMessage(result.message || "企业注册失败");
        return;
      }
    } catch {
      setEnterpriseMessage("企业注册服务暂不可用，请稍后重试");
      return;
    }

    resetEnterpriseRegisterForm();
    setShowEnterpriseRegisterModal(false);
    setShowEnterpriseLoginModal(true);
    setEnterpriseLoginAccount(account);
    setEnterpriseLoginPassword("");
    setEnterpriseMessage("注册成功，现在可以直接登录企业后台。");
  };

  const handleEnterpriseLogin = async () => {
    if (enterpriseLoginLoading) return;

    const account = enterpriseLoginAccount.trim();
    const password = enterpriseLoginPassword.trim();

    if (!account || !password) {
      setEnterpriseMessage("请输入企业登录账号和密码");
      return;
    }

    setEnterpriseLoginLoading(true);
    setEnterpriseMessage("正在验证账号，请稍候...");

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: account, password, role: "enterprise" }),
      });
      const result = await response.json();
      if (!response.ok || result.code !== 0) {
        setEnterpriseMessage(result.message || "账号或密码错误");
        return;
      }

      const profile = result.data || {};
      localStorage.setItem("admin_role", "enterprise");
      localStorage.setItem("admin_username", String(profile.username || account));
      localStorage.setItem("enterprise_id", String(profile.enterprise_id || ""));
      localStorage.setItem("enterprise_code", String(profile.enterprise_code || ""));
      localStorage.setItem("enterprise_name", String(profile.enterprise_name || ""));
    } catch {
      setEnterpriseMessage("企业登录服务暂不可用，请稍后重试");
      return;
    } finally {
      setEnterpriseLoginLoading(false);
    }

    setEnterpriseMessage("企业登录成功，正在进入企业后台...");
    router.replace("/admin/enterprise");
  };

  const handleContinueLastTest = () => {
    if (!savedProgress?.url) return;

    try {
      const url = new URL(savedProgress.url, window.location.origin);
      router.push(`${url.pathname}${url.search}${url.hash}`);
    } catch {
      router.push(savedProgress.url);
    }
  };

  const handlePasswordSubmit = async (pwdValue?: string) => {
    const passwordValue = (pwdValue || password.join("")).trim().toUpperCase();
    if (passwordValue.length !== 8) {
      setPasswordError("请输入完整的8位激活码");
      return;
    }

    setPasswordLoading(true);
    setPasswordError("");

    try {
      // 生成临时sessionId用于密码验证
      const tempSessionId = `temp_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
      const response = await fetch("/api/mbti/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: passwordValue,
          sessionId: tempSessionId,
        }),
      });

      const result = await response.json();

      if (result.code === 0 && result.data?.verified) {
        setPasswordSuccess(true);

        if (result.data.activationMode === "enterprise") {
          const accessKey = String(result.data.accessKey || tempSessionId);
          const enterpriseContext = {
            activationCode: passwordValue,
            accessKey,
            enterpriseId: String(result.data.enterpriseId || ""),
            enterpriseName: String(result.data.enterpriseName || ""),
            groupId: String(result.data.groupId || ""),
            groupName: String(result.data.groupName || ""),
            groupNote: String(result.data.groupNote || "无"),
            testTypeId: String(result.data.testTypeId || "MBTI"),
            testType: String(result.data.testType || "MBTI60"),
            bankId: String(result.data.bankId || result.data.testType || "MBTI60"),
            resultVisibility: String(result.data.resultVisibility || "summary"),
            claimed: false,
          };

          sessionStorage.setItem(
            `mbti_enterprise_activation_${accessKey}`,
            JSON.stringify(enterpriseContext),
          );
          sessionStorage.setItem(`mbti_password_verified_${accessKey}`, "true");

          setTimeout(() => {
            setShowPasswordModal(false);
            setPassword(["", "", "", "", "", "", "", ""]);
            setPasswordSuccess(false);
            router.push(
              `/quiz?key=${encodeURIComponent(accessKey)}&type=${encodeURIComponent(
                enterpriseContext.testType,
              )}&enterprise=1`,
            );
          }, 600);
          return;
        }

        sessionStorage.setItem(
          "mbti_pending_personal_access_key",
          String(result.data.accessKey || tempSessionId),
        );

        setTimeout(() => {
          setShowPasswordModal(false);
          setShowVersionModal(true);
          setPassword(["", "", "", "", "", "", "", ""]);
          setPasswordSuccess(false);
        }, 800);
      } else {
        setPasswordError(result.message || "激活码错误、已失效或次数不足");
        setPassword(["", "", "", "", "", "", "", ""]);
        passwordInputRefs.current[0]?.focus();
      }
    } catch {
      setPasswordError("激活码验证失败，请重试");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handlePasswordChange = (index: number, value: string) => {
    const cleanValue = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

    const newPassword = [...password];
    newPassword[index] = cleanValue.slice(-1);
    setPassword(newPassword);

    if (cleanValue && index < 7) {
      passwordInputRefs.current[index + 1]?.focus();
    }

    if (newPassword.every((d) => d) && newPassword.join("").length === 8) {
      setTimeout(() => handlePasswordSubmit(newPassword.join("")), 100);
    }
  };

  const handlePasswordKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !password[index] && index > 0) {
      passwordInputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      passwordInputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 7) {
      passwordInputRefs.current[index + 1]?.focus();
    }
  };

  const handlePasswordPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase()
      .slice(0, 8);
    if (pasted) {
      const newPassword = pasted
        .split("")
        .concat(Array(8 - pasted.length).fill(""));
      setPassword(newPassword);
      if (pasted.length === 8) {
        setTimeout(() => handlePasswordSubmit(pasted), 100);
      } else {
        passwordInputRefs.current[pasted.length]?.focus();
      }
    }
  };

  const handleVersionSelect = async (versionId: string) => {
    setSelectedVersion(versionId);
    setShowVersionModal(false);

    const verifiedAccessKey = sessionStorage.getItem(
      "mbti_pending_personal_access_key",
    );
    const sessionRes = await fetch("/api/mbti/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        testType: versionId,
        accessKey: verifiedAccessKey || undefined,
      }),
    });
    const sessionResult = await sessionRes.json();
    if (sessionResult.code === 0 && sessionResult.data?.accessKey) {
      sessionStorage.removeItem("mbti_pending_personal_access_key");
      sessionStorage.setItem(
        `mbti_password_verified_${sessionResult.data.accessKey}`,
        "true",
      );
      router.push(
        `/quiz?key=${sessionResult.data.accessKey}&type=${versionId}`,
      );
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50" style={{ overflowX: "hidden" }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between gap-2 sm:h-16">
            {/* Logo */}
            <div className="flex shrink-0 items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 sm:h-10 sm:w-10">
                <Brain className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent sm:text-xl">
                MBTI
              </span>
            </div>

            {/* Right Side */}
            <div className="flex min-w-0 items-center gap-1 sm:gap-3">
              <LanguageSelector />
              <a
                href="/admin/login"
                className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-indigo-50 hover:text-indigo-600 sm:gap-1.5 sm:px-3 sm:text-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                管理后台
              </a>
              <button
                type="button"
                onClick={() => {
                  setEnterpriseMessage("");
                  setShowEnterpriseLoginModal(true);
                }}
                className="open-enterprise-login-button shrink-0 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-indigo-50 hover:text-indigo-600 sm:px-3 sm:text-sm"
              >
                企业登录
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pb-14 pt-24 sm:pb-20 sm:pt-32">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
          <div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
            style={{ animationDelay: "4s" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 sm:mb-8 sm:px-4 sm:py-2"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-medium text-indigo-700 sm:text-sm">
                {t("home.hero.badge")}
              </span>
            </motion.div>

            {/* Title */}
            <h1 className="mb-5 text-4xl font-bold leading-tight text-slate-900 sm:mb-6 sm:text-6xl lg:text-7xl">
              {t("home.hero.title")}
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t("home.hero.titleHighlight")}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mb-8 max-w-2xl px-2 text-base leading-relaxed text-slate-600 sm:mb-10 sm:px-0 sm:text-xl">
              {t("home.hero.subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <button
                onClick={handleStartTest}
                className="group flex w-full max-w-sm items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-300 sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
              >
                {t("home.hero.startButton")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              {savedProgress && (
                <button
                  type="button"
                  onClick={handleContinueLastTest}
                  className="hero-continue-last-test w-full max-w-sm rounded-2xl border border-indigo-200 bg-white px-6 py-3.5 text-base font-semibold text-indigo-700 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
                >
                  继续答题 {savedProgress.answeredCount}/
                  {savedProgress.totalCount}
                </button>
              )}
              <a
                href="#about"
                className="flex w-full max-w-sm items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 transition-all duration-300 hover:border-indigo-200 hover:bg-indigo-50/50 sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
              >
                {t("home.hero.learnMore")}
              </a>
            </div>

            {/* Stats - 动态统计促进转化 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 sm:mt-16"
            >
              <StatsDisplay />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 transform sm:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-slate-400 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="about" className="bg-slate-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              {t("home.features.title")}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 bg-white rounded-3xl shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} 
                                 flex items-center justify-center mb-6`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {t(`home.features.${feature.key}.title`)}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {t(`home.features.${feature.key}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 16 Types Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              {t("home.personalities.title")}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t("home.personalities.subtitle")}
            </p>
          </div>

          {/* 按组别分组展示 */}
          {(["analysts", "diplomats", "sentinels", "explorers"] as const).map(
            (group) => {
              const groupTypes = mbtiTypes.filter(
                (item) => item.group === group,
              );
              const groupColor = getGroupColor(group);
              const groupNames = {
                analysts: t("analysts.title"),
                diplomats: t("diplomats.title"),
                sentinels: t("sentinels.title"),
                explorers: t("explorers.title"),
              };
              const groupSubtitles = {
                analysts: t("analysts.subtitle"),
                diplomats: t("diplomats.subtitle"),
                sentinels: t("sentinels.subtitle"),
                explorers: t("explorers.subtitle"),
              };
              // 组别背景色
              const groupBgColors = {
                analysts:
                  "bg-purple-50 border-purple-200 hover:border-purple-400",
                diplomats:
                  "bg-emerald-50 border-emerald-200 hover:border-emerald-400",
                sentinels: "bg-blue-50 border-blue-200 hover:border-blue-400",
                explorers:
                  "bg-amber-50 border-amber-200 hover:border-amber-400",
              };

              return (
                <div key={group} className="mb-12 last:mb-0">
                  {/* 组别标题 */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-1.5 h-8 rounded-full bg-gradient-to-b ${groupColor.gradient}`}
                    />
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">
                        {groupNames[group]}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {groupSubtitles[group]}
                      </p>
                    </div>
                  </div>

                  {/* 该组的类型卡片 */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                    {groupTypes.map((item, index) => (
                      <motion.div
                        key={item.type}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className={`group relative aspect-square rounded-2xl overflow-hidden cursor-pointer
                        ${groupBgColors[group]} border-2
                        hover:shadow-xl hover:scale-105 transition-all duration-300`}
                        onClick={() => setSelectedType(item.type)}
                      >
                        {/* 卡通形象图片 */}
                        <div className="absolute inset-0 flex items-center justify-center p-3">
                          <img
                            src={`/mbti-characters/${item.type}_main.jpg`}
                            alt={item.type}
                            className="w-full h-full object-contain drop-shadow-md opacity-95 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                          />
                        </div>

                        {/* 类型标签 - 底部显示 */}
                        <div
                          className={`absolute bottom-0 left-0 right-0 py-2 bg-gradient-to-t from-black/60 to-transparent
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        >
                          <div className="text-center">
                            <span className="text-white font-bold text-sm">
                              {item.type}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            },
          )}
        </div>
      </section>

      {/* Personality Type Modal */}
      {selectedType && (
        <PersonalityModal
          type={selectedType}
          onClose={() => setSelectedType(null)}
          onStartTest={() => {
            setSelectedType(null);
            handleStartTest();
          }}
          t={t}
          locale={locale}
        />
      )}

      {/* Version Selection Modal */}
      {showVersionModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative px-8 py-6 bg-gradient-to-br from-indigo-600 to-purple-600 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                {t("home.versions.title")}
              </h3>
              <p className="text-white/80">{t("home.versions.subtitle")}</p>
            </div>

            {/* Body */}
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-6">
                {testVersions.map((version, index) => {
                  const Icon = version.icon;
                  const isSelected = selectedVersion === version.id;

                  return (
                    <motion.div
                      key={version.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleVersionSelect(version.id)}
                      className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300
                        ${
                          isSelected
                            ? version.id === "MBTI60"
                              ? "border-blue-500 bg-blue-50/50 shadow-xl shadow-blue-100"
                              : version.id === "MBTI93"
                                ? "border-purple-500 bg-purple-50/50 shadow-xl shadow-purple-100"
                                : "border-pink-500 bg-pink-50/50 shadow-xl shadow-pink-100"
                            : version.id === "MBTI60"
                              ? "border-slate-100 bg-white hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50"
                              : version.id === "MBTI93"
                                ? "border-slate-100 bg-white hover:border-purple-300 hover:shadow-lg hover:shadow-purple-50"
                                : "border-slate-100 bg-white hover:border-pink-300 hover:shadow-lg hover:shadow-pink-50"
                        }`}
                    >
                      {version.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span
                            className="px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 
                                         text-white text-xs font-semibold rounded-full shadow-lg"
                          >
                            {t("home.versions.professional.popular")}
                          </span>
                        </div>
                      )}

                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4
                        ${
                          isSelected
                            ? version.id === "MBTI60"
                              ? "bg-blue-500"
                              : version.id === "MBTI93"
                                ? "bg-purple-500"
                                : "bg-pink-500"
                            : version.id === "MBTI60"
                              ? "bg-blue-100"
                              : version.id === "MBTI93"
                                ? "bg-purple-100"
                                : "bg-pink-100"
                        }`}
                      >
                        <Icon
                          className={`w-7 h-7 ${isSelected ? "text-white" : version.id === "MBTI60" ? "text-blue-600" : version.id === "MBTI93" ? "text-purple-600" : "text-pink-600"}`}
                        />
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 mb-1">
                        {version.name}
                      </h3>

                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Brain className="w-3.5 h-3.5" />
                          {t("home.versions.questions", {
                            count: version.questions,
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {t(
                            `home.versions.${version.id === "MBTI60" ? "basic" : version.id === "MBTI93" ? "professional" : "complete"}.duration`,
                          )}
                        </span>
                      </div>

                      <p className="text-sm text-slate-600 mb-4">
                        {t(
                          `home.versions.${version.id === "MBTI60" ? "basic" : version.id === "MBTI93" ? "professional" : "complete"}.description`,
                        )}
                      </p>

                      <ul className="space-y-2">
                        {[1, 2, 3].map((i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2
                              className={`w-4 h-4 mt-0.5 flex-shrink-0 
                              ${
                                isSelected
                                  ? version.id === "MBTI60"
                                    ? "text-blue-600"
                                    : version.id === "MBTI93"
                                      ? "text-purple-600"
                                      : "text-pink-600"
                                  : "text-slate-400"
                              }`}
                            />
                            <span className="text-xs text-slate-600">
                              {t(
                                `home.versions.${version.id === "MBTI60" ? "basic" : version.id === "MBTI93" ? "professional" : "complete"}.features.${i - 1}`,
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => !passwordLoading && setShowPasswordModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-center">
              <button
                onClick={() => !passwordLoading && setShowPasswordModal(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                disabled={passwordLoading}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Shield className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">输入激活码</h2>
              <p className="text-white/80">请输入平台生成的8位激活码</p>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              <p className="text-center text-slate-600">
                激活码验证成功后会立即扣除一次使用次数。
              </p>

              {/* Password Inputs */}
              <div className="grid grid-cols-8 gap-1 sm:gap-2">
                {password.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      passwordInputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="text"
                    maxLength={1}
                    autoCapitalize="characters"
                    value={digit}
                    onChange={(e) =>
                      handlePasswordChange(index, e.target.value)
                    }
                    onKeyDown={(e) => handlePasswordKeyDown(index, e)}
                    onPaste={handlePasswordPaste}
                    disabled={passwordLoading || passwordSuccess}
                    className={`h-11 min-w-0 w-full rounded-lg border-2 text-center text-lg font-bold transition-all duration-200 sm:h-12 sm:rounded-xl sm:text-xl
                      ${
                        passwordError
                          ? "border-red-300 bg-red-50 text-red-600"
                          : passwordSuccess
                            ? "border-green-300 bg-green-50 text-green-600"
                            : "border-slate-200 bg-white text-slate-800 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                      }
                      disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                ))}
              </div>

              {/* Error/Success Message */}
              {passwordError && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-red-500 text-sm"
                >
                  {passwordError}
                </motion.p>
              )}
              {passwordSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    激活码验证成功
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                onClick={() => handlePasswordSubmit()}
                disabled={
                  passwordLoading ||
                  passwordSuccess ||
                  password.join("").length !== 8
                }
                className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold
                         hover:from-indigo-600 hover:to-purple-700 transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2"
              >
                {passwordLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    验证中...
                  </>
                ) : (
                  "确认激活并开始测试"
                )}
              </button>

              {/* Help Text */}
              <p className="text-center text-sm text-slate-400">
                一次性激活码使用后立即失效；十次激活码每次扣除一次。
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">MBTI</span>
            </div>
            <p className="text-slate-400 text-sm">{t("home.footer.basedOn")}</p>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Globe className="w-4 h-4" />
              <span>
                {t("home.footer.languages", { count: locales.length })}
              </span>
            </div>
          </div>
        </div>
      </footer>

      {showEnterpriseLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
          <div className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={() => {
                setShowEnterpriseLoginModal(false);
                setEnterpriseMessage("");
              }}
              className="absolute right-5 top-5 text-slate-400 hover:text-slate-700 text-2xl leading-none"
            >
              ×
            </button>

            <h2 className="text-center text-3xl font-bold text-slate-900 mb-3">
              企业登录
            </h2>

            <div className="text-center text-base text-slate-500 mb-8">
              企业管理员账号登录
            </div>

            <div className="space-y-5">
              <input
                value={enterpriseLoginAccount}
                onChange={(e) => setEnterpriseLoginAccount(e.target.value)}
                placeholder="请输入企业登录账号"
                autoComplete="off"
                className="w-full rounded-2xl border border-slate-200 px-5 py-4 text-lg outline-none focus:border-slate-400"
              />

              <div className="relative">
                <input
                  value={enterpriseLoginPassword}
                  onChange={(e) => setEnterpriseLoginPassword(e.target.value)}
                  placeholder="请输入企业登录密码"
                  type={showEnterpriseLoginPassword ? "text" : "password"}
                  autoComplete="new-password"
                  className="w-full rounded-2xl border border-slate-200 px-5 py-4 pr-20 text-lg outline-none focus:border-slate-400"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleEnterpriseLogin();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowEnterpriseLoginPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 hover:text-indigo-600"
                ></button>
              </div>

              {enterpriseMessage && (
                <div className="rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-700">
                  {enterpriseMessage}
                </div>
              )}

              <button
                type="button"
                onClick={handleEnterpriseLogin}
                disabled={enterpriseLoginLoading}
                className="w-full rounded-2xl bg-black py-4 text-lg font-semibold text-white hover:bg-slate-900 transition disabled:cursor-wait disabled:opacity-60"
              >
                {enterpriseLoginLoading ? "正在登录..." : "登录"}
              </button>
            </div>

            <div className="mt-6 text-center text-base text-slate-500">
              没有企业账号？
              <button
                type="button"
                onClick={() => {
                  setEnterpriseMessage("");
                  setShowEnterpriseLoginModal(false);
                  setShowEnterpriseRegisterModal(true);
                }}
                className="ml-2 font-semibold text-indigo-600 hover:text-indigo-700"
              >
                立即注册
              </button>
            </div>
          </div>
        </div>
      )}

      {showEnterpriseRegisterModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
          <div className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={() => {
                setShowEnterpriseRegisterModal(false);
                setEnterpriseMessage("");
              }}
              className="absolute right-5 top-5 text-slate-400 hover:text-slate-700 text-2xl leading-none"
            >
              ×
            </button>

            <h2 className="text-center text-3xl font-bold text-slate-900 mb-3">
              企业注册申请
            </h2>

            <div className="text-center text-base text-slate-500 mb-8">
              提交后即可创建企业账号，并可直接登录企业后台
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  企业名称
                </label>
                <input
                  value={enterpriseName}
                  onChange={(e) => setEnterpriseName(e.target.value)}
                  placeholder="请输入企业名称"
                  autoComplete="off"
                  className="w-full rounded-2xl border border-slate-200 px-5 py-3.5 text-base outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  企业简称（选填）
                </label>
                <input
                  value={enterpriseShortName}
                  onChange={(e) => setEnterpriseShortName(e.target.value)}
                  placeholder="请输入企业简称"
                  autoComplete="off"
                  className="w-full rounded-2xl border border-slate-200 px-5 py-3.5 text-base outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  负责人手机号
                </label>
                <input
                  value={enterprisePhone}
                  onChange={(e) => setEnterprisePhone(e.target.value)}
                  placeholder="请输入11位中国大陆手机号"
                  autoComplete="off"
                  className="w-full rounded-2xl border border-slate-200 px-5 py-3.5 text-base outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  企业登录账号
                </label>
                <input
                  value={enterpriseAdminAccount}
                  onChange={(e) => setEnterpriseAdminAccount(e.target.value)}
                  placeholder="请设置企业登录账号"
                  autoComplete="off"
                  className="w-full rounded-2xl border border-slate-200 px-5 py-3.5 text-base outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  企业登录密码（至少8位）
                </label>
                <div className="relative">
                  <input
                    value={enterpriseAdminPassword}
                    onChange={(e) => setEnterpriseAdminPassword(e.target.value)}
                    placeholder="请设置企业登录密码"
                    type={showEnterpriseAdminPassword ? "text" : "password"}
                    autoComplete="new-password"
                    className="w-full rounded-2xl border border-slate-200 px-5 py-3.5 pr-20 text-base outline-none focus:border-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowEnterpriseAdminPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 hover:text-indigo-600"
                  ></button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  确认登录密码
                </label>
                <div className="relative">
                  <input
                    value={enterpriseAdminPasswordConfirm}
                    onChange={(e) =>
                      setEnterpriseAdminPasswordConfirm(e.target.value)
                    }
                    placeholder="请再次输入企业登录密码"
                    type={
                      showEnterpriseAdminPasswordConfirm ? "text" : "password"
                    }
                    autoComplete="new-password"
                    className="w-full rounded-2xl border border-slate-200 px-5 py-3.5 pr-20 text-base outline-none focus:border-slate-400"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleEnterpriseRegister();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowEnterpriseAdminPasswordConfirm((v) => !v)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 hover:text-indigo-600"
                  ></button>
                </div>
              </div>

              {enterpriseMessage && (
                <div className="rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-700">
                  {enterpriseMessage}
                </div>
              )}

              <button
                type="button"
                onClick={handleEnterpriseRegister}
                className="w-full rounded-2xl bg-black py-4 text-lg font-semibold text-white hover:bg-slate-900 transition"
              >
                提交注册申请
              </button>
            </div>

            <div className="mt-6 text-center text-base text-slate-500">
              已经有企业账号？
              <button
                type="button"
                onClick={() => {
                  setEnterpriseMessage("");
                  setShowEnterpriseRegisterModal(false);
                  setShowEnterpriseLoginModal(true);
                }}
                className="ml-2 font-semibold text-indigo-600 hover:text-indigo-700"
              >
                返回登录
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 人格类型模态框组件
interface PersonalityModalProps {
  type: string;
  onClose: () => void;
  onStartTest: () => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  locale: string;
}
function PersonalityModal({
  type,
  onClose,
  onStartTest,
  t,
  locale,
}: PersonalityModalProps) {
  const report = mbtiFullReports[type];
  if (!report) return null;

  const groupColor = getGroupColor(
    report.category === "analysts"
      ? "analysts"
      : report.category === "diplomats"
        ? "diplomats"
        : report.category === "sentinels"
          ? "sentinels"
          : "explorers",
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-card rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient */}
        <div
          className={`relative px-8 pt-8 pb-6 bg-gradient-to-br ${groupColor.gradient}`}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="flex items-center gap-6">
            {/* 卡通形象 */}
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white/20 flex-shrink-0 backdrop-blur-sm border-2 border-white/30">
              <img
                src={`/mbti-characters/${type}_main.jpg`}
                alt={type}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-sm font-bold">
                  {type}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-1">
                {report.name}
              </h2>
              <p className="text-white/80 text-lg">
                {report.tagline || report.slogan}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Description */}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Quote className="w-5 h-5 text-primary" />
              {t("result.typeDescription")}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {report.description}
            </p>
          </div>

          {/* Traits */}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <User className="w-5 h-5 text-primary" />
              {t("result.coreTraits")}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {report.traits?.slice(0, 6).map((trait, idx) => (
                <div
                  key={idx}
                  className="px-4 py-3 bg-muted rounded-xl text-sm font-medium text-foreground"
                >
                  {trait.trait}
                </div>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Sparkles className="w-5 h-5 text-primary" />
              {t("home.personalities.title")}
            </h3>
            <div className="flex flex-wrap gap-2">
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r ${groupColor.gradient}`}
              >
                {report.categoryEn === "Analysts"
                  ? t("analysts.title")
                  : report.categoryEn === "Diplomats"
                    ? t("diplomats.title")
                    : report.categoryEn === "Sentinels"
                      ? t("sentinels.title")
                      : t("explorers.title")}
              </span>
            </div>
          </div>

          {/* Strengths */}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Lightbulb className="w-5 h-5 text-primary" />
              {t("result.strengths.title")}
            </h3>
            <ul className="space-y-2">
              {report.strengths?.slice(0, 4).map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-muted-foreground"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="pt-4">
            <button
              onClick={onStartTest}
              className={`w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r ${groupColor.gradient} hover:opacity-90 transition-opacity`}
            >
              {t("home.hero.startButton")}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// 密码输入弹窗组件
function PasswordModal({
  isOpen,
  onClose,
  t,
}: {
  isOpen: boolean;
  onClose: () => void;
  t: (key: string) => string;
}) {
  if (!isOpen) return null;
  return null; // 实际内容在HomePageContent中内联渲染
}

// 主导出组件
export default function HomePage() {
  return (
    <I18nProvider>
      <HomePageContent />
    </I18nProvider>
  );
}

// 需要导入locales
import { locales } from "@/i18n/config";

