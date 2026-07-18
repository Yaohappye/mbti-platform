
"use client";

import { useState, useEffect, useCallback, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Brain,
  Clock,
  AlertCircle,
  Grid3X3,
  Building2,
} from "lucide-react";
import { I18nProvider, useI18n } from "@/i18n/provider";
import LanguageSelector from "@/components/LanguageSelector";

import { defaultLocale } from "@/i18n/config";

interface Question {
  quizInfo: {
    id: number;
    quizNo: number;
    content: string;
    type: string;
  };
  answers: {
    key: string;
    value: string;
  }[];
}

const MBTI_PROGRESS_CURRENT_KEY = "mbti_current_progress_v1";

interface SavedQuizProgress {
  key: string;
  testType: string;
  url: string;
  currentIndex: number;
  answers: Record<number, string>;
  gender: "male" | "female" | "unspecified" | null;
  employeeName?: string;
  department?: string;
  phone?: string;
  enterpriseId?: string | null;
  enterpriseName?: string;
  groupId?: string;
  groupName?: string;
  activationCode?: string;
  startedAt?: string;
  answeredCount: number;
  totalCount: number;
  savedAt: string;
}

function QuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, locale } = useI18n();
  const key = searchParams.get("key");
  const testType = searchParams.get("type") || "MBTI60";
  const enterpriseModeParam = searchParams.get("enterprise") === "1";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [direction, setDirection] = useState(0);
  const [unansweredWarning, setUnansweredWarning] = useState(false);
  const [firstUnansweredIndex, setFirstUnansweredIndex] = useState<
    number | null
  >(null);
  const [showNavPanel, setShowNavPanel] = useState(false);
  const [gender, setGender] = useState<
    "male" | "female" | "unspecified" | null
  >(null);
  const [showGenderSelector, setShowGenderSelector] =
    useState(!enterpriseModeParam);

  // 企业相关状态
  const [enterpriseId, setEnterpriseId] = useState(
    searchParams.get("eid") || "",
  );
  const [enterpriseName, setEnterpriseName] = useState("");
  const [groupId, setGroupId] = useState("");
  const [groupName, setGroupName] = useState("");
  const [activationCode, setActivationCode] = useState("");
  const [quizStartedAt, setQuizStartedAt] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [showEmployeeForm, setShowEmployeeForm] = useState(enterpriseModeParam);
  const [isEnterpriseMode, setIsEnterpriseMode] = useState(enterpriseModeParam);
  const [enterpriseClaimed, setEnterpriseClaimed] = useState(false);
  const [claimingEmployeeInfo, setClaimingEmployeeInfo] = useState(false);
  const [employeeFormError, setEmployeeFormError] = useState("");
  const [progressLoaded, setProgressLoaded] = useState(false);
  const progressStorageKey = key ? `mbti_quiz_progress_${testType}_${key}` : "";
  const handledQuestionIdRef = useRef<number | null>(null);

  // 检测企业激活码模式，并从本次浏览器会话恢复企业资料。
  useEffect(() => {
    if (!key) return;

    const storageKey = `mbti_enterprise_activation_${key}`;
    const raw = sessionStorage.getItem(storageKey);

    if (enterpriseModeParam || raw) {
      setIsEnterpriseMode(true);
      setShowGenderSelector(false);

      try {
        const context = raw ? JSON.parse(raw) : {};
        const nextEnterpriseId = String(
          context.enterpriseId || searchParams.get("eid") || "",
        );

        setEnterpriseId(nextEnterpriseId);
        setEnterpriseName(String(context.enterpriseName || ""));
        setGroupId(String(context.groupId || ""));
        setGroupName(String(context.groupName || ""));
        setActivationCode(String(context.activationCode || ""));
        setQuizStartedAt(
          String(context.startedAt || context.claimedAt || ""),
        );
        setEmployeeName(String(context.employeeName || ""));
        setDepartment(String(context.department || ""));
        setPhone(String(context.phone || ""));
        setGender(
          context.gender === "male" || context.gender === "female"
            ? context.gender
            : "unspecified",
        );

        const claimed = Boolean(context.claimed);
        setEnterpriseClaimed(claimed);
        setShowEmployeeForm(!claimed);
      } catch {
        setShowEmployeeForm(true);
      }
    } else if (enterpriseId) {
      // 兼容旧的 eid 企业链接。
      setIsEnterpriseMode(true);
      setShowGenderSelector(false);
      setShowEmployeeForm(true);
    }
  }, [key, enterpriseModeParam, searchParams]);

  // 加载题目
  useEffect(() => {
    if (!key) {
      setError("Missing session identifier");
      setLoading(false);
      return;
    }

    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `/api/mbti/test/quiz?type=${testType}&locale=${locale}`,
        );
        const data = await response.json();

        if (data.code === 0) {
          setQuestions(data.data);
        } else {
          setError("Failed to load questions");
        }
      } catch (err) {
        setError("Network error, please retry");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [testType, key, locale]);

  // 无 key 时重定向
  useEffect(() => {
    if (!key && !loading) {
      const timer = setTimeout(() => {
        router.push("/mbti-home");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [key, loading, router]);

  const currentQuestion = questions[currentIndex];
  const currentAnswer = currentQuestion
    ? answers[currentQuestion.quizInfo.id]
    : undefined;
  const progress =
    questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;
  const isLastQuestion = currentIndex === questions.length - 1;
  const canGoNext = currentAnswer !== undefined;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;

  // 恢复本地答题进度
  useEffect(() => {
    if (!key || !progressStorageKey || questions.length === 0 || progressLoaded)
      return;

    try {
      const raw = localStorage.getItem(progressStorageKey);
      if (raw) {
        const saved = JSON.parse(raw) as SavedQuizProgress;

        if (saved?.answers) {
          setAnswers(saved.answers);
        }

        if (typeof saved?.currentIndex === "number") {
          const safeIndex = Math.min(
            Math.max(saved.currentIndex, 0),
            questions.length - 1,
          );
          setCurrentIndex(safeIndex);
        }

        if (saved?.gender) {
          setGender(saved.gender);
          setShowGenderSelector(false);
        }

        if (saved?.employeeName) setEmployeeName(saved.employeeName);
        if (saved?.department) setDepartment(saved.department);
        if (saved?.phone) setPhone(saved.phone);
        if (saved?.enterpriseName) setEnterpriseName(saved.enterpriseName);
        if (saved?.groupId) setGroupId(saved.groupId);
        if (saved?.groupName) setGroupName(saved.groupName);
        if (saved?.activationCode) setActivationCode(saved.activationCode);
        if (saved?.startedAt) setQuizStartedAt(saved.startedAt);
      }
    } catch (err) {
      console.warn("恢复本地答题进度失败:", err);
    } finally {
      setProgressLoaded(true);
    }
  }, [key, progressStorageKey, questions.length, progressLoaded]);

  // 自动保存本地答题进度
  useEffect(() => {
    if (
      !key ||
      !progressStorageKey ||
      questions.length === 0 ||
      !progressLoaded
    )
      return;

    const count = Object.keys(answers).length;
    if (count === 0) return;

    try {
      const payload: SavedQuizProgress = {
        key,
        testType,
        url: window.location.href,
        currentIndex,
        answers,
        gender,
        employeeName,
        department,
        phone,
        enterpriseId,
        enterpriseName,
        groupId,
        groupName,
        activationCode,
        startedAt: quizStartedAt,
        answeredCount: count,
        totalCount: questions.length,
        savedAt: new Date().toISOString(),
      };

      localStorage.setItem(progressStorageKey, JSON.stringify(payload));
      localStorage.setItem(MBTI_PROGRESS_CURRENT_KEY, JSON.stringify(payload));
    } catch (err) {
      console.warn("保存本地答题进度失败:", err);
    }
  }, [
    key,
    testType,
    progressStorageKey,
    questions.length,
    progressLoaded,
    currentIndex,
    answers,
    gender,
    employeeName,
    department,
    phone,
    enterpriseId,
    enterpriseName,
    groupId,
    groupName,
    activationCode,
    quizStartedAt,
  ]);

  const handleEnterpriseEmployeeSubmit = async () => {
    const cleanName = employeeName.trim();
    const cleanDepartment = department.trim();
    const cleanPhone = phone.trim();

    if (!cleanName || !cleanDepartment) {
      setEmployeeFormError("请填写员工姓名和部门");
      return;
    }

    if (cleanPhone && !/^1[3-9]\d{9}$/.test(cleanPhone)) {
      setEmployeeFormError("手机号格式不正确，或者留空不填写");
      return;
    }

    if (!key || !enterpriseId || !groupId || !activationCode) {
      setEmployeeFormError("企业激活信息不完整，请返回首页重新输入激活码");
      return;
    }

    setClaimingEmployeeInfo(true);
    setEmployeeFormError("");

    try {
      const response = await fetch("/api/mbti/enterprise/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activationCode,
          enterpriseId,
          groupId,
          sessionId: key,
          employeeName: cleanName,
          department: cleanDepartment,
          phone: cleanPhone,
          gender: gender || "unspecified",
        }),
      });

      const result = await response.json();

      if (!response.ok || result.code !== 0) {
        throw new Error(result.message || "企业激活码使用失败");
      }

      const startedAt =
        result.data?.startedAt ||
        result.data?.claimedAt ||
        new Date().toISOString();

      setQuizStartedAt(startedAt);
      setEnterpriseClaimed(true);
      setShowEmployeeForm(false);
      setShowGenderSelector(false);

      const storageKey = `mbti_enterprise_activation_${key}`;
      const oldRaw = sessionStorage.getItem(storageKey);
      const oldContext = oldRaw ? JSON.parse(oldRaw) : {};

      sessionStorage.setItem(
        storageKey,
        JSON.stringify({
          ...oldContext,
          enterpriseId,
          enterpriseName,
          groupId,
          groupName,
          activationCode,
          employeeName: cleanName,
          department: cleanDepartment,
          phone: cleanPhone,
          gender: gender || "unspecified",
          claimed: true,
          claimedAt: result.data?.claimedAt || startedAt,
          startedAt,
        }),
      );
    } catch (claimError) {
      setEmployeeFormError(
        claimError instanceof Error ? claimError.message : "企业激活码使用失败",
      );
    } finally {
      setClaimingEmployeeInfo(false);
    }
  };

  // 选择答案：点击后立即进入下一题；不使用时间锁；同一道题只允许自动跳转一次
  const handleSelectAnswer = (value: string) => {
    if (!currentQuestion || submitting) return;

    const questionId = currentQuestion.quizInfo.id;

    // 防止同一道题因为连续点击、动画残留、重复事件导致多次跳转
    if (handledQuestionIdRef.current === questionId) return;
    handledQuestionIdRef.current = questionId;

    const newAnswers = {
      ...answers,
      [questionId]: value,
    };

    setAnswers(newAnswers);

    const newAnsweredCount = Object.keys(newAnswers).length;
    const willAllBeAnswered = newAnsweredCount === questions.length;

    if (willAllBeAnswered) {
      setSubmitting(true);
      submitAnswers(newAnswers);
      return;
    }

    if (currentIndex < questions.length - 1) {
      setDirection(1);
      setCurrentIndex(Math.min(currentIndex + 1, questions.length - 1));
    }
  };

  // 提交答案的辅助函数
  const submitAnswers = async (answersToSubmit: Record<number, string>) => {
    try {
      // 企业模式验证
      if (
        isEnterpriseMode &&
        (!enterpriseClaimed || !employeeName.trim() || !department.trim())
      ) {
        setEmployeeFormError("请先填写并确认员工信息");
        setSubmitting(false);
        setShowEmployeeForm(true);
        return;
      }

      const formattedAnswers = Object.entries(answersToSubmit).map(
        ([questionId, answer]) => ({
          questionId: parseInt(questionId),
          answer,
        }),
      );

      const requestBody: any = {
        accessKey: key,
        testType,
        gender: gender || "unspecified",
        answers: formattedAnswers,
      };

      // 添加企业相关信息
      if (isEnterpriseMode && enterpriseId) {
        requestBody.enterpriseId = enterpriseId;
        requestBody.enterpriseName = enterpriseName;
        requestBody.groupId = groupId;
        requestBody.groupName = groupName;
        requestBody.activationCode = activationCode;
        requestBody.employeeName = employeeName.trim();
        requestBody.department = department.trim();
        const endedAt = new Date().toISOString();
        const startedAt = quizStartedAt || endedAt;

        requestBody.phone = phone.trim();
        requestBody.startedAt = startedAt;
        requestBody.endedAt = endedAt;
        requestBody.reportType = "enterprise";
      } else {
        requestBody.reportType = "personal";
      }

      const response = await fetch("/api/mbti/test/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // 提交成功，清理本地答题进度
        try {
          if (progressStorageKey) localStorage.removeItem(progressStorageKey);
          localStorage.removeItem(MBTI_PROGRESS_CURRENT_KEY);
        } catch (err) {
          console.warn("清理本地答题进度失败:", err);
        }

        // 提交成功，跳转到结果页（使用accessKey查询结果）
        router.push(
          `/result?key=${key}&type=${testType}${enterpriseId ? `&eid=${enterpriseId}` : ""}`,
        );
      } else {
        setError(t("test.error.submitFailed") || "Failed to submit answers");
        setSubmitting(false);
      }
    } catch {
      setError(t("test.error.network") || "Network error");
      setSubmitting(false);
    }
  };

  // 上一题
  const handlePrevious = () => {
    if (submitting || currentIndex <= 0) return;

    handledQuestionIdRef.current = null;
    setDirection(-1);
    setCurrentIndex(Math.max(currentIndex - 1, 0));
  };

  // 下一题
  const handleNext = () => {
    if (submitting || currentIndex >= questions.length - 1 || !canGoNext)
      return;

    handledQuestionIdRef.current = null;
    setDirection(1);
    setCurrentIndex(Math.min(currentIndex + 1, questions.length - 1));
  };

  // 提交测试
  const handleSubmit = async () => {
    if (!allAnswered) {
      // 找到第一个未回答的题目
      const firstUnanswered = questions.findIndex(
        (q) => answers[q.quizInfo.id] === undefined,
      );
      if (firstUnanswered !== -1) {
        setFirstUnansweredIndex(firstUnanswered);
        setUnansweredWarning(true);
        // 跳转到第一个未回答的题目
        setDirection(firstUnanswered > currentIndex ? 1 : -1);
        setCurrentIndex(firstUnanswered);
        // 3秒后自动隐藏提示
        setTimeout(() => {
          setUnansweredWarning(false);
        }, 5000);
      }
      return;
    }

    // 所有题目已回答，执行提交
    setSubmitting(true);
    await submitAnswers(answers);
  };

  // 获取选项标签
  const getOptionLabel = (value: string): string => {
    const labels: Record<string, string> = {
      A1: t("test.options.strongAgree"),
      A2: t("test.options.agree"),
      MID: t("test.options.neutral"),
      B4: t("test.options.disagree"),
      B5: t("test.options.strongDisagree"),
    };
    return labels[value] || value;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">{t("test.loading") || "Loading..."}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            {t("test.error.title") || "Error"}
          </h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={() => router.push("/mbti-home")}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            {t("test.backHome") || "Back to Home"}
          </button>
        </div>
      </div>
    );
  }

  // 企业员工信息表单
  if (isEnterpriseMode && showEmployeeForm) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/mbti-home" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  MBTI
                </span>
              </Link>
              <LanguageSelector />
            </div>
          </div>
        </nav>

        {/* Employee Info Form */}
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden"
            >
              {/* Header */}
              <div className="px-8 py-8 border-b border-slate-100 text-center">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-indigo-600" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                  {enterpriseName
                    ? `${enterpriseName}员工你好`
                    : "企业员工你好"}
                </h1>
                <p className="text-slate-600 text-base leading-relaxed">
                  请填写员工信息，提交后该激活码会立即失效
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm">
                  <span className="rounded-full bg-indigo-50 px-3 py-1 font-medium text-indigo-700">
                    {groupName || testType}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                    {testType}
                  </span>
                </div>
              </div>

              {/* Form */}
              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    姓名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    placeholder="请输入您的姓名"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    部门 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="请输入您的部门"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    手机号（选填）
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))
                    }
                    placeholder="可不填写"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    性别（选填）
                  </label>
                  <select
                    value={gender || "unspecified"}
                    onChange={(e) =>
                      setGender(
                        e.target.value === "male" || e.target.value === "female"
                          ? e.target.value
                          : "unspecified",
                      )
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  >
                    <option value="unspecified">不填写</option>
                    <option value="male">男</option>
                    <option value="female">女</option>
                  </select>
                </div>

                {employeeFormError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {employeeFormError}
                  </div>
                )}

                <button
                  onClick={handleEnterpriseEmployeeSubmit}
                  disabled={
                    claimingEmployeeInfo ||
                    !employeeName.trim() ||
                    !department.trim()
                  }
                  className="w-full py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all"
                >
                  {claimingEmployeeInfo
                    ? "正在确认信息..."
                    : "确认信息并开始测评"}
                </button>

                <p className="text-sm text-slate-500 text-center">
                  您的信息仅用于生成企业报告，不会对外泄露
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // 性别选择器
  if (!isEnterpriseMode && showGenderSelector) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/mbti-home" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  MBTI
                </span>
              </Link>
              <LanguageSelector />
            </div>
          </div>
        </nav>

        {/* Gender Selector Content */}
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden"
            >
              {/* Header */}
              <div className="px-8 py-8 border-b border-slate-100 text-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                  选填您的性别
                </h1>
                <p className="text-slate-600 text-base leading-relaxed">
                  选填性别，系统采用分性别常模计分，报告解读更贴合你的成长、感情处境
                </p>
              </div>

              {/* Gender Options */}
              <div className="p-8 space-y-4">
                <button
                  onClick={() => {
                    setGender("male");
                    setShowGenderSelector(false);
                  }}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed ${
                    gender === "male"
                      ? "border-indigo-500 bg-indigo-50 shadow-md"
                      : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      gender === "male" ? "bg-indigo-100" : "bg-slate-100"
                    }`}
                  >
                    <span className="text-2xl">♂</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-lg font-semibold text-slate-900">
                      男
                    </span>
                    <p className="text-sm text-slate-500 mt-1">
                      启用男性T/F判定阈值，贴合男性群体思维特质
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setGender("female");
                    setShowGenderSelector(false);
                  }}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200 ${
                    gender === "female"
                      ? "border-indigo-500 bg-indigo-50 shadow-md"
                      : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      gender === "female" ? "bg-indigo-100" : "bg-slate-100"
                    }`}
                  >
                    <span className="text-2xl">♀</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-lg font-semibold text-slate-900">
                      女
                    </span>
                    <p className="text-sm text-slate-500 mt-1">
                      启用女性T/F判定阈值，贴合女性共情特质
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setGender("unspecified");
                    setShowGenderSelector(false);
                  }}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200 ${
                    gender === "unspecified"
                      ? "border-indigo-500 bg-indigo-50 shadow-md"
                      : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      gender === "unspecified"
                        ? "bg-indigo-100"
                        : "bg-slate-100"
                    }`}
                  >
                    <span className="text-2xl">—</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-lg font-semibold text-slate-900">
                      不愿填写
                    </span>
                    <p className="text-sm text-slate-500 mt-1">
                      使用通用无差别计分标准，不分性别校准
                    </p>
                  </div>
                </button>

                {/* Privacy Note */}
                <div className="mt-6 p-4 bg-slate-50 rounded-xl">
                  <p className="text-sm text-slate-500 text-center">
                    <span className="font-medium text-slate-700">
                      隐私说明：
                    </span>
                    性别仅用于测评校准，不会对外泄露。不填性别也能完整答题、正常生成报告。
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/mbti-home" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                MBTI
              </span>
            </Link>
            <LanguageSelector />
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="fixed top-16 left-0 right-0 z-40 h-1 bg-slate-200">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.06 }}
        />
      </div>

      {/* Main Content */}
      <main className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Question Navigator */}
          <div className="mb-4">
            <button
              onClick={() => setShowNavPanel(!showNavPanel)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <Grid3X3 className="w-5 h-5 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">
                {t("test.navigator.title") || "题目导航"}
              </span>
              <span className="text-xs text-slate-500 ml-2">
                ({answeredCount}/{questions.length}{" "}
                {t("test.answered") || "已答"})
              </span>
            </button>

            <AnimatePresence>
              {showNavPanel && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-700">
                        {t("test.navigator.quickJump") || "快速跳转"}
                      </span>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                          {t("test.navigator.current") || "当前"}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded-full bg-green-500"></span>
                          {t("test.navigator.answered") || "已答"}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded-full bg-slate-200"></span>
                          {t("test.navigator.unanswered") || "未答"}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-10 gap-2">
                      {questions.map((q, idx) => {
                        const isAnswered = answers[q.quizInfo.id] !== undefined;
                        const isCurrent = idx === currentIndex;
                        return (
                          <button
                            key={q.quizInfo.id}
                            onClick={() => {
                              setDirection(idx > currentIndex ? 1 : -1);
                              setCurrentIndex(idx);
                              setShowNavPanel(false);
                            }}
                            className={`
                              relative w-8 h-8 rounded-lg text-xs font-medium transition-all
                              ${
                                isCurrent
                                  ? "bg-indigo-500 text-white ring-2 ring-indigo-500 ring-offset-2"
                                  : isAnswered
                                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                              }
                            `}
                          >
                            {idx + 1}
                            {isAnswered && !isCurrent && (
                              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {answeredCount < questions.length && (
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm text-amber-600">
                          {t("test.navigator.unansweredCount", {
                            count: questions.length - answeredCount,
                          }) ||
                            `还有 ${questions.length - answeredCount} 题未回答`}
                        </span>
                        <button
                          onClick={() => {
                            const firstUnanswered = questions.findIndex(
                              (q) => !answers[q.quizInfo.id],
                            );
                            if (firstUnanswered !== -1) {
                              setDirection(
                                firstUnanswered > currentIndex ? 1 : -1,
                              );
                              setCurrentIndex(firstUnanswered);
                              setShowNavPanel(false);
                            }
                          }}
                          className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-200 transition-colors"
                        >
                          {t("test.navigator.jumpToFirstUnanswered") ||
                            "跳转到第一题未答题"}
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait" custom={direction}>
            {currentQuestion && (
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 8 : -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -8 : 8 }}
                transition={{ duration: 0.06 }}
                className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden"
              >
                {/* Header */}
                <div className="px-6 sm:px-8 py-6 border-b border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-slate-500">
                      {t("test.question")} {currentIndex + 1} {t("test.of")}{" "}
                      {questions.length}
                    </span>
                    <span className="text-sm font-medium text-indigo-600">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-relaxed">
                    {currentQuestion.quizInfo.content}
                  </h2>
                </div>

                {/* Options */}
                <div className="p-6 sm:p-8 space-y-3">
                  {currentQuestion.answers.map((answer, idx) => {
                    const isSelected = currentAnswer === answer.value;
                    const labels = [
                      t("test.options.strongAgree"),
                      t("test.options.agree"),
                      t("test.options.neutral"),
                      t("test.options.disagree"),
                      t("test.options.strongDisagree"),
                    ];

                    return (
                      <motion.button
                        key={answer.value}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0 }}
                        onClick={() => handleSelectAnswer(answer.value)}
                        disabled={submitting}
                        className={`w-full flex items-center gap-4 p-4 sm:p-5 rounded-2xl border-2 text-left
                          transition-all duration-200
                          ${
                            isSelected
                              ? "border-indigo-500 bg-indigo-50 shadow-md"
                              : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
                          }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                          ${
                            isSelected
                              ? "border-indigo-500 bg-indigo-500"
                              : "border-slate-300"
                          }`}
                        >
                          {isSelected && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span
                          className={`text-base sm:text-lg font-medium
                          ${isSelected ? "text-indigo-900" : "text-slate-700"}`}
                        >
                          {labels[idx]}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Tips */}
                <div className="px-6 sm:px-8 pb-6">
                  <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                    <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-700">
                      {t("test.tips.content")}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all
                ${
                  currentIndex === 0
                    ? "opacity-0 pointer-events-none"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                }`}
            >
              <ArrowLeft className="w-5 h-5" />
              {t("test.navigation.previous")}
            </button>

            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all
                  ${
                    !submitting
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t("test.navigation.submitting") || "Submitting..."}
                  </>
                ) : (
                  <>
                    {t("test.navigation.submit")}
                    <Check className="w-5 h-5" />
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!canGoNext}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all
                  ${
                    canGoNext
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
              >
                {t("test.navigation.next")}
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Answer Progress */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              {answeredCount} / {questions.length}{" "}
              {t("test.answered") || "answered"}
            </p>
          </div>

          {/* Unanswered Warning */}
          {unansweredWarning && firstUnansweredIndex !== null && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl animate-pulse">
              <div className="flex items-center gap-2 text-amber-700">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <p className="text-sm font-medium">
                  {t("test.warning.unanswered", {
                    index: firstUnansweredIndex + 1,
                  }) ||
                    `您还有未回答的题目，已自动跳转到第 ${firstUnansweredIndex + 1} 题`}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// 主导出组件
function QuizPage() {
  return (
    <I18nProvider>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <QuizContent />
      </Suspense>
    </I18nProvider>
  );
}

export default QuizPage;
