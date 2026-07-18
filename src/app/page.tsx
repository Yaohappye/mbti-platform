﻿"use client";
import "./cogniverse-home.css";
import { useState, useEffect, useRef, useCallback } from "react";
import { categories, tests, type TestItem, type TestScope } from "@/data/tests";
import { papers, paperCategories, type Paper } from "@/data/papers";
import { StarFieldBackground } from "@/components/star-field-background";

function AnimatedNumber(
    {
        value,
        suffix = ""
    }: {
        value: string;
        suffix?: string;
    }
) {
    const [display, setDisplay] = useState("0");
    const ref = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const el = ref.current;

        if (!el || hasAnimated.current)
            return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !hasAnimated.current) {
                hasAnimated.current = true;
                const numericPart = value.replace(/[^0-9.]/g, "");
                const target = parseFloat(numericPart);
                const prefix = value.match(/^[^0-9.]*/)?.[0] ?? "";
                const nonNumericSuffix = value.match(/[^0-9.]*$/)?.[0] ?? "";
                const duration = 1500;
                const startTime = performance.now();

                const animate = (now: number) => {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(target * eased);
                    const formatted = current.toLocaleString();
                    setDisplay(`${prefix}${formatted}${nonNumericSuffix}${suffix}`);

                    if (progress < 1)
                        requestAnimationFrame(animate);
                    else
                        setDisplay(`${value}${suffix}`);
                };

                requestAnimationFrame(animate);
            }
        }, {
            threshold: 0.3
        });

        observer.observe(el);
        return () => observer.disconnect();
    }, [value, suffix]);

    return <span ref={ref}>{display}</span>;
}

function CategoryIcon(
    {
        icon,
        className
    }: {
        icon: string;
        className?: string;
    }
) {
    const cls = className ?? "w-5 h-5";

    switch (icon) {
    case "grid":
        return (
            <svg
                className={cls}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
        );
    case "brain":
        return (
            <svg
                className={cls}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path
                    d="M12 2a7 7 0 0 0-7 7c0 3 2 5.5 4 7l3 3 3-3c2-1.5 4-4 4-7a7 7 0 0 0-7-7z" /><path d="M12 2v5" /><path d="M9 7h6" />
            </svg>
        );
    case "lightbulb":
        return (
            <svg
                className={cls}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12c1 1 2 2 2 4h4c0-2 1-3 2-4a7 7 0 0 0-4-12z" />
            </svg>
        );
    case "heart":
        return (
            <svg
                className={cls}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
        );
    case "briefcase":
        return (
            <svg
                className={cls}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            </svg>
        );
    case "users":
        return (
            <svg
                className={cls}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        );
    case "star":
        return (
            <svg
                className={cls}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <polygon
                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        );
    default:
        return null;
    }
}

function TestCard(
    {
        test,
        index
    }: {
        test: TestItem;
        index: number;
    }
) {
    return (
        <div
            role={test.id === "mbti" ? "button" : undefined}
            tabIndex={test.id === "mbti" ? 0 : undefined}
            onClick={() => {
                if (test.id === "mbti") {
                    window.location.href = "/mbti-home";
                }
            }}
            onKeyDown={(e) => {
                if (
                    test.id === "mbti" &&
                    (e.key === "Enter" || e.key === " ")
                ) {
                    e.preventDefault();
                    window.location.href = "/mbti-home";
                }
            }}
            className="card-glow group relative rounded-2xl p-6 cursor-pointer overflow-hidden"
            style={{
                animationDelay: `${index * 60}ms`
            }}>
            {}
            <div
                className={`absolute -top-16 -right-16 w-36 h-36 rounded-full bg-gradient-to-br ${test.gradient} opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-500 blur-2xl`} />
            <div className="relative z-10">
                {}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                            <h3
                                className="text-base font-bold text-[#f0f0f5] group-hover:text-white transition-colors truncate">
                                {test.title}
                            </h3>
                            {test.popular && <span
                                className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white tracking-wider flex-shrink-0">HOT
                                                </span>}
                        </div>
                        <p
                            className="text-[11px] text-[#555570] font-medium tracking-wider uppercase truncate">
                            {test.subtitle}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                        {test.scope === "enterprise" && <span
                            className="px-2 py-0.5 text-[9px] font-medium rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/10">企业
                                          </span>}
                        {test.scope === "personal" && <span
                            className="px-2 py-0.5 text-[9px] font-medium rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/10">个人
                                          </span>}
                        {test.scope === "both" && <span
                            className="px-2 py-0.5 text-[9px] font-medium rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/10">通用
                                          </span>}
                        <span
                            className="text-2xl opacity-80 group-hover:opacity-100 transition-opacity">
                            {test.icon}
                        </span>
                    </div>
                </div>
                {}
                <p className="text-sm text-[#7a7a98] leading-relaxed mb-5 line-clamp-2">
                    {test.description}
                </p>
                {}
                <div className="flex items-center gap-4 mb-4 text-[11px] text-[#555570]">
                    <div className="flex items-center gap-1.5">
                        <svg
                            className="w-3.5 h-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                        </svg>
                        <span>{test.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <svg
                            className="w-3.5 h-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
                        </svg>
                        <span>{test.questionCount}题</span>
                    </div>
                </div>
                {}
                <div className="flex flex-wrap gap-1.5">
                    {test.tags.map(tag => <span
                        key={tag}
                        className="px-2.5 py-1 text-[10px] font-medium rounded-md bg-white/[0.03] text-[#7a7a98] border border-white/[0.04]">
                        {tag}
                    </span>)}
                </div>
            </div>
        </div>
    );
}

const LANGUAGES = [{
    code: "zh-CN",
    label: "CN",
    name: "中文"
}, {
    code: "en",
    label: "EN",
    name: "English"
}, {
    code: "ja",
    label: "JP",
    name: "日本語"
}, {
    code: "ko",
    label: "KR",
    name: "한국어"
}] as const;

type LangCode = (typeof LANGUAGES)[number]["code"];

function Header() {
    const [langOpen, setLangOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState<LangCode>("zh-CN");
    const langRef = useRef<HTMLDivElement>(null);
    const activeLang = LANGUAGES.find(l => l.code === currentLang) ?? LANGUAGES[0];

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (langRef.current && !langRef.current.contains(e.target as Node)) {
                setLangOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass">
            <div
                className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                {}
                <div className="flex items-center gap-2.5">
                    <div
                        className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <svg
                            className="w-4 h-4 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path
                                d="M12 2a7 7 0 0 0-7 7c0 3 2 5.5 4 7l3 3 3-3c2-1.5 4-4 4-7a7 7 0 0 0-7-7z" />
                        </svg>
                    </div>
                    <div className="hidden sm:block">
                        <span className="text-sm font-semibold text-[#f0f0f5] block leading-tight">宙思 <span className="text-sky-400 font-bold">Cogniverse</span>
                        </span>
                        <span className="text-[10px] text-[#555570] tracking-wider leading-tight block">Professional Assessment
                                        </span>
                    </div>
                </div>
                {}
                <div className="flex items-center gap-3">
                    {}
                    <div className="relative" ref={langRef}>
                        <button
                            onClick={() => setLangOpen(!langOpen)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#8888a0] hover:text-[#f0f0f5] hover:bg-white/[0.04] transition-colors">
                            {}
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M2 12h20" />
                                <path
                                    d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                            <span className="font-medium">{activeLang.label}</span>
                            <span className="hidden sm:inline">{activeLang.name}</span>
                            <svg
                                className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>
                        {}
                        {langOpen && <div
                            className="absolute right-0 top-full mt-2 w-44 rounded-xl bg-[#1a1a2e] border border-white/[0.08] shadow-2xl shadow-black/40 overflow-hidden">
                            {LANGUAGES.map(lang => <button
                                key={lang.code}
                                onClick={() => {
                                    setCurrentLang(lang.code);
                                    setLangOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${currentLang === lang.code ? "bg-sky-500/10 text-sky-400" : "text-[#8888a0] hover:bg-white/[0.04] hover:text-[#f0f0f5]"}`}>
                                <span className="font-semibold text-xs w-6">{lang.label}</span>
                                <span>{lang.name}</span>
                                {currentLang === lang.code && <svg
                                    className="w-4 h-4 ml-auto text-sky-400"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>}
                            </button>)}
                        </div>}
                    </div>
                    {}
                    <div className="w-px h-5 bg-white/[0.08]" />
                    {}
                    <button
                        type="button"
                        onClick={() => { window.location.href = "/admin/login"; }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#8888a0] hover:text-[#f0f0f5] hover:bg-white/[0.04] transition-colors">
                        {}
                        <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3" />
                            <path
                                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                        <span className="font-medium hidden sm:inline">管理后台</span>
                    </button>
                    <div className="w-px h-5 bg-white/[0.08]" />
                    <button
                        type="button"
                        onClick={() => {
                            window.location.href =
                                "/mbti-home?enterpriseLogin=1";
                        }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#8888a0] hover:text-[#f0f0f5] hover:bg-white/[0.04] transition-colors"
                    >
                        <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect
                                x="3"
                                y="4"
                                width="18"
                                height="16"
                                rx="2"
                            />
                            <path d="M8 20v-4h8v4" />
                            <path d="M8 8h.01" />
                            <path d="M12 8h.01" />
                            <path d="M16 8h.01" />
                            <path d="M8 12h.01" />
                            <path d="M12 12h.01" />
                            <path d="M16 12h.01" />
                        </svg>
                        <span className="font-medium hidden sm:inline">
                            企业登录
                        </span>
                    </button>
                </div>
            </div>
        </header>
    );
}

function ResearchSection() {
    const [activePaperCat, setActivePaperCat] = useState("all");
    const filteredPapers = activePaperCat === "all" ? papers : papers.filter(p => p.category === activePaperCat);

    return (
        <section className="py-20 px-6 relative">
            <div className="max-w-6xl mx-auto">
                {}
                <div className="text-center mb-14">
                    <p className="text-xs text-[#555570] tracking-[0.2em] uppercase mb-3">Research & Evidence</p>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#f0f0f5] mb-4">学术研究支撑</h2>
                    <p className="text-sm text-[#7a7a98] max-w-2xl mx-auto leading-relaxed">所有测评工具均基于经过同行评审的学术研究，以下列出核心理论文献，为测评体系提供科学依据。
                                </p>
                    <p className="text-xs text-[#555570] mt-2 max-w-xl mx-auto">All assessments are grounded in peer-reviewed research. Key references are listed below.
                                </p>
                </div>
                {}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {paperCategories.map(cat => <button
                        key={cat.id}
                        onClick={() => setActivePaperCat(cat.id)}
                        className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 border ${activePaperCat === cat.id ? "bg-sky-500/15 border-sky-500/40 text-sky-400" : "bg-white/[0.03] border-white/[0.06] text-[#7a7a98] hover:text-[#f0f0f5] hover:border-white/[0.12]"}`}>
                        <span>{cat.label}</span>
                        <span className="ml-1.5 text-[10px] opacity-60">{cat.labelEn}</span>
                    </button>)}
                </div>
                {}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {filteredPapers.map(paper => <PaperCard key={paper.id} paper={paper} />)}
                </div>
            </div>
        </section>
    );
}

function PaperCard(
    {
        paper
    }: {
        paper: Paper;
    }
) {
    return (
        <div
            className="rounded-2xl bg-[#0a0f1e]/50 border border-white/[0.06] p-6 hover:border-sky-500/20 transition-all duration-400 backdrop-blur-md group">
            {}
            <div className="flex items-center justify-between mb-4">
                <span
                    className="text-[10px] text-[#555570] tracking-wider uppercase bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/[0.06]">
                    {paper.category}
                </span>
                <span className="text-xs text-[#555570]">{paper.year}</span>
            </div>
            {}
            <h3
                className="text-sm font-bold text-[#f0f0f5] mb-1.5 leading-snug group-hover:text-sky-300 transition-colors">
                {paper.titleZh}
            </h3>
            <p className="text-xs text-[#555570] mb-3 leading-relaxed italic">
                {paper.titleEn}
            </p>
            {}
            <p className="text-xs text-sky-400/70 mb-4">
                {paper.authors}
                <span className="text-[#555570] mx-1.5">·</span>
                <span className="text-[#7a7a98]">{paper.journal}</span>
            </p>
            {}
            <p className="text-xs text-[#7a7a98] leading-relaxed mb-2">
                {paper.summaryZh}
            </p>
            <p className="text-[11px] text-[#555570] leading-relaxed">
                {paper.summaryEn}
            </p>
            {}
            {paper.doi && <div className="mt-4 pt-3 border-t border-white/[0.04]">
                <span className="text-[10px] text-[#555570] tracking-wider">DOI: {paper.doi}
                </span>
            </div>}
        </div>
    );
}

export default function Home() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [activeScope, setActiveScope] = useState<TestScope | "all">("all");
    const [filteredTests, setFilteredTests] = useState<TestItem[]>(tests);
    const tabContainerRef = useRef<HTMLDivElement>(null);

    const filterTests = useCallback((categoryId: string, scope: TestScope | "all") => {
        let result = tests;

        if (scope !== "all") {
            result = result.filter(t => t.scope === scope || t.scope === "both");
        }

        if (categoryId !== "all") {
            result = result.filter(t => t.category === categoryId);
        }

        setFilteredTests(result);
    }, []);

    const handleCategoryChange = useCallback((id: string) => {
        setActiveCategory(id);
        filterTests(id, activeScope);
    }, [filterTests, activeScope]);

    const handleScopeChange = useCallback((scope: TestScope | "all") => {
        setActiveScope(scope);
        filterTests(activeCategory, scope);
    }, [filterTests, activeCategory]);

    const totalTests = tests.length;
    const totalQuestions = tests.reduce((sum, t) => sum + t.questionCount, 0);
    const totalCategories = categories.length - 1;

    return (
        <div className="min-h-screen bg-[#020617] relative overflow-hidden">
            {}
            <StarFieldBackground />
            {}
            <Header />
            {}
            <section
                className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden pt-16">
                {}
                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    {}
                    <div
                        className="inline-flex flex-col items-center gap-1.5 px-6 py-3 rounded-full bg-white/[0.03] border border-white/[0.06] mb-10 badge-glow">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-sm text-[#9a9ab0] tracking-[0.15em]">宙思 Cogniverse · 探索你的内在宇宙
                                              </span>
                        </div>
                        <span className="text-xs text-[#5a5a7a] tracking-[0.2em] uppercase">Professional Assessment Platform
                                        </span>
                    </div>
                    {}
                    <h1
                        className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-10 leading-[1.2]">
                        <span className="text-[#f0f0f5]">量化内在思维，</span>
                        <span className="gradient-text">赋能个人成长与组织人才管理</span>
                    </h1>
                    {}
                    <div className="space-y-3 max-w-2xl mx-auto mb-12">
                        <p className="text-base sm:text-lg text-[#9a9ab0] leading-relaxed">整合多类权威学术测评矩阵，完整覆盖认知、人格、心理筛查、职业规划、团队素养五大应用板块
                                        </p>
                        <p className="text-base sm:text-lg text-[#7a7a98] leading-relaxed">以客观心智数据分析，助力个体认知自我，赋能企业人才建设、专业机构标准化心理服务
                                        </p>
                    </div>
                    {}
                    <div className="flex flex-col items-center justify-center">
                        <div
                            className="rounded-3xl bg-[#0a0f1e]/60 border border-white/[0.06] p-10 sm:p-14 relative overflow-hidden backdrop-blur-md max-w-2xl w-full">
                            <div
                                className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-sky-600/[0.06] blur-[120px]" />
                            <div className="relative z-10">
                                <p
                                    className="text-xs font-semibold tracking-[0.2em] uppercase text-sky-400 mb-4">Start Your Journey
                                                    </p>
                                <h2 className="text-2xl sm:text-3xl font-bold text-[#f0f0f5] mb-3">准备好了解自己了吗？
                                                    </h2>
                                <p className="text-[#7a7a98] text-sm sm:text-base max-w-lg mx-auto mb-8">选择一个测评开始你的探索之旅，每个测评都会为你提供专业的分析报告和个性化建议
                                                    </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        document
                                            .getElementById("assessment-matrix")
                                            ?.scrollIntoView({
                                                behavior: "smooth",
                                                block: "start"
                                            });
                                    }}
                                    className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-sky-500/20 transition-all duration-300 hover:-translate-y-0.5">立即开始测评
                                                      <svg
                                        className="w-4 h-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {}
                <div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                    <div
                        className="w-5 h-8 rounded-full border border-white/[0.1] flex items-start justify-center p-1.5">
                        <div className="w-1 h-2 rounded-full bg-[#7a7a98] animate-bounce" />
                    </div>
                </div>
            </section>
            {}
            {}
            <div className="section-divider" />
            {}
            <section id="tests" className="py-24 px-4 section-glow-right">
                <div className="max-w-6xl mx-auto">
                    {}
                    <div className="mb-20">
                        <div className="text-center mb-12">
                            <p
                                className="text-xs font-semibold tracking-[0.2em] uppercase text-sky-400 mb-4">Our Strengths
                                              </p>
                            <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f0f5] mb-4">核心优势
                                              </h2>
                            <p className="text-[#7a7a98] max-w-xl mx-auto">标准化心智评估矩阵，兼顾个体自我洞察与企业组织人才数字化管理
                                              </p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[{
                                icon: <svg
                                    className="w-6 h-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                                    <path d="M9 7h6" /><path d="M9 11h4" />
                                </svg>,

                                title: "全品类标准化量表库",
                                en: "STANDARD SCALES",
                                desc: "整合国际通用经典心理量表，持续迭代更新，覆盖人格、认知、职业、心理健康、管理多赛道评估工具，适配自测、人才盘点、心理筛查全场景。"
                            }, {
                                icon: <svg
                                    className="w-6 h-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <path d="M9 11H5a2 2 0 0 0-2 2v7h18v-7a2 2 0 0 0-2-2h-4" />
                                    <rect x="9" y="2" width="6" height="9" rx="1" />
                                    <path d="M9 7h6" /><path d="M12 2v5" />
                                </svg>,

                                title: "千余专业测评试题",
                                en: "PROFESSIONAL ITEMS",
                                desc: "全部题目经过信效度校验，严谨贴合心理学理论模型，规避无效趣味题型，保障测评数据客观、稳定、具备参考价值。"
                            }, {
                                icon: <svg
                                    className="w-6 h-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <path d="M21 12a9 9 0 1 1-9-9" /><path d="M21 3v6h-6" />
                                    <path d="M12 7v5l3 3" />
                                </svg>,

                                title: "六大核心心智分析维度",
                                en: "ANALYSIS DIMENSIONS",
                                desc: "从性格特质、思维认知、心理状态、职业潜能、人际适配、发展短板多层交叉建模，立体化拆解心智全貌，拒绝单一片面结论。"
                            }, {
                                icon: <svg
                                    className="w-6 h-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <path d="M3 21h18" /><path d="M5 21V7l8-4v18" />
                                    <path d="M19 21V11l-6-4" /><path d="M9 9h1" /><path d="M9 13h1" /><path d="M9 17h1" />
                                </svg>,

                                title: "政企机构落地服务经验",
                                en: "INSTITUTION SERVICE",
                                desc: "拥有企业 HR、院校、心理工作室批量测评落地案例，支持团队账号、数据汇总、批量导出报告等商用专属功能。"
                            }].map((feature, i) => <div
                                key={i}
                                className="rounded-2xl bg-[#0a0f1e]/50 border border-white/[0.06] p-8 hover:border-sky-500/30 transition-all duration-400 backdrop-blur-md group text-center">
                                <div
                                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-sky-500/10 to-blue-500/10 border border-sky-500/10 flex items-center justify-center text-sky-400 mb-6 mx-auto group-hover:scale-105 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-base font-bold text-[#f0f0f5] mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-xs text-[#555570] tracking-wider uppercase mb-4">{feature.en}</p>
                                <p className="text-sm text-[#7a7a98] leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>)}
                        </div>
                    </div>
                    {}
                    <div id="assessment-matrix" className="scroll-mt-20">
                        {}
                        <div className="text-center mb-14">
                            <p
                                className="text-xs font-semibold tracking-[0.2em] uppercase text-sky-400 mb-4">All Assessments
                                              </p>
                            <h2 className="text-3xl sm:text-4xl font-bold text-[#f0f0f5] mb-4">全维度测评矩阵
                                              </h2>
                            <p className="text-[#7a7a98] max-w-xl mx-auto">选择你感兴趣的维度，开始探索之旅
                                              </p>
                        </div>
                        {}
                        <div className="mb-6 flex justify-center px-1">
                            <div
                                className="grid w-full max-w-sm grid-cols-3 gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-1 sm:inline-flex sm:w-auto sm:max-w-none sm:rounded-full">
                                {[{
                                    key: "all" as const,
                                    label: "全部",
                                    sub: "All"
                                }, {
                                    key: "personal" as const,
                                    label: "个人测试",
                                    sub: "Personal"
                                }, {
                                    key: "enterprise" as const,
                                    label: "企业测试",
                                    sub: "Enterprise"
                                }].map(s => <button
                                    key={s.key}
                                    onClick={() => handleScopeChange(s.key)}
                                    className={`
                    min-w-0 rounded-xl px-2 py-2 text-xs font-medium transition-all duration-300 sm:rounded-full sm:px-5 sm:text-sm
                    ${activeScope === s.key ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/15" : "text-[#7a7a98] hover:text-[#f0f0f5] hover:bg-white/[0.04]"}
                  `}>
                                    <span>{s.label}</span>
                                    <span
                                        className="hidden sm:inline text-[10px] ml-1.5 opacity-50 tracking-wider uppercase">{s.sub}</span>
                                </button>)}
                            </div>
                        </div>
                        {}
                        <div
                            id="categories"
                            ref={tabContainerRef}
                            className="mb-12 grid grid-cols-2 gap-2 px-1 sm:flex sm:flex-wrap sm:justify-center sm:px-0">
                            {categories.map(cat => {
                                const isActive = activeCategory === cat.id;

                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleCategoryChange(cat.id)}
                                        className={`
                    flex min-w-0 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium
                    whitespace-nowrap transition-all duration-300 sm:flex-shrink-0 sm:rounded-full sm:px-5 sm:text-sm
                    ${isActive ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/15" : "bg-white/[0.03] text-[#7a7a98] border border-white/[0.06] hover:bg-white/[0.06] hover:text-[#f0f0f5] hover:border-white/[0.1]"}
                  `}>
                                        <CategoryIcon icon={cat.icon} className="w-4 h-4" />
                                        {cat.name}
                                    </button>
                                );
                            })}
                        </div>
                        {}
                        <div className="text-center mb-10">
                            <p className="text-sm text-[#555570]">
                                {categories.find(c => c.id === activeCategory)?.description}
                                <span className="mx-2 text-white/[0.08]">|</span>
                                <span className="text-sky-400/60">{filteredTests.length}</span>个测评
                                            </p>
                        </div>
                        {}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {filteredTests.map((test, i) => <TestCard key={test.id} test={test} index={i} />)}
                        </div>
                    </div>
                </div>
            </section>
            {}
            <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
                <div
                    className="relative overflow-hidden rounded-l-2xl border border-r-0 border-white/[0.08] bg-[#0a0f1e]/80 backdrop-blur-xl py-8 px-5 w-[88px] flex flex-col items-center gap-5 shadow-2xl shadow-black/30"
                    style={{
                        boxShadow: "none",
                        borderColor: "#0A0A0A",
                        borderWidth: "0px",
                        borderRadius: "18px"
                    }}>
                    {}
                    <div
                        className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-sky-500/[0.08] to-blue-600/[0.05] pointer-events-none" />
                    <div className="relative z-10 flex flex-col items-center gap-5">
                        {}
                        <div
                            className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                            <svg
                                className="w-6 h-6 text-sky-400"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M3 21h18" /><path d="M9 8h1" /><path d="M9 12h1" /><path d="M9 16h1" /><path d="M14 8h1" /><path d="M14 12h1" /><path d="M14 16h1" /><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
                            </svg>
                        </div>
                        {}
                        <div
                            className="text-sm font-semibold text-[#9a9ab0] tracking-[0.2em]"
                            style={{
                                writingMode: "vertical-rl"
                            }}>商务合作
                                        </div>
                        {}
                        <div
                            className="w-8 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
                        {}
                        <span
                            className="text-[10px] text-[#555570] tracking-[0.15em] uppercase font-medium"
                            style={{
                                writingMode: "vertical-rl"
                            }}>Enterprise
                                        </span>
                        {}
                        <a
                            href="#business-contact"
                            className="group w-12 h-12 rounded-xl bg-gradient-to-b from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/15 hover:shadow-xl hover:shadow-sky-500/30 transition-all duration-300 hover:scale-110"
                            title="联系我们">
                            <svg
                                className="w-5 h-5 group-hover:translate-x-0.5 transition-transform"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            {}
            <ResearchSection />
            {}
            <footer className="border-t border-white/[0.04] py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                                <svg
                                    className="w-4 h-4 text-white"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <path
                                        d="M12 2a7 7 0 0 0-7 7c0 3 2 5.5 4 7l3 3 3-3c2-1.5 4-4 4-7a7 7 0 0 0-7-7z" />
                                </svg>
                            </div>
                            <div>
                                <span className="text-sm font-semibold text-[#f0f0f5] block">宙思 <span className="text-sky-400">Cogniverse</span>
                                </span>
                                <span className="text-[11px] text-[#555570] tracking-wider">Professional Assessment Platform</span>
                            </div>
                        </div>
                        {}
                        <div className="flex items-center gap-4">
                            <a
                                href="#business"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sm font-semibold text-sky-400 hover:bg-sky-500/20 transition-all duration-300">
                                <svg
                                    className="w-4 h-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <path d="M2 22h20" /><path
                                        d="M6.36 17.35l-1.73-1a1 1 0 0 1-.5-.87V9.64a1 1 0 0 1 .37-.78l5.14-4.11a1 1 0 0 1 1.26 0l5.14 4.11a1 1 0 0 1 .37.78v5.84a1 1 0 0 1-.5.87l-1.73 1" /><path d="M9 22V12h6v10" />
                                </svg>商务合作
                                              </a>
                            <a
                                href="#enterprise"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.08] text-sm font-medium text-[#9a9ab0] hover:text-[#f0f0f5] hover:bg-white/[0.04] transition-all duration-300">
                                <svg
                                    className="w-4 h-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                                </svg>企业服务
                                              </a>
                        </div>
                    </div>
                    <div
                        className="mt-8 pt-6 border-t border-white/[0.03] flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-[11px] text-[#444460]">© {new Date().getFullYear()}宙思 Cogniverse. All rights reserved.
                                        </p>
                        <p className="text-xs text-[#555570] text-center sm:text-right">本测评平台仅供自我探索参考，不构成医学诊断依据
                                          <span className="mx-2 text-[#444460]">·</span>
                            <span className="text-[#444460]">For self-exploration only</span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}



