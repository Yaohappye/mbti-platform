
'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Download, Share2, ChevronDown, ChevronUp, Heart, 
  Users, Briefcase, TrendingUp, Shield, Sparkles, ArrowLeft,
  Star, Target, Zap, Globe
} from 'lucide-react';
import { I18nProvider, useI18n } from '@/i18n/provider';
import LanguageSelector from '@/components/LanguageSelector';
import { getMBTIImage, getMBTIGroup, getGroupColor } from '@/data/mbti-images';
import { mbtiFullReports } from '@/data/mbti-full-reports';
import { defaultLocale } from '@/i18n/config';

interface TestResult {
  mbti_type: string;
  ei_score?: number;
  sn_score?: number;
  tf_score?: number;
  jp_score?: number;
  reportType?: "personal" | "enterprise";
  report_type?: "personal" | "enterprise";
  audience?: "personal" | "employee" | "enterprise";
  employeeView?: boolean;
  employee_view?: boolean;
  employeeResultVisibility?: "hidden" | "summary" | "full";
  employee_result_visibility?: "hidden" | "summary" | "full";
  resultHidden?: boolean;
  result_hidden?: boolean;
}

// 结果页面内容组件
function ResultPageContent() {
  const searchParams = useSearchParams();
  const { t, locale } = useI18n();
  const [report, setReport] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    description: true,
    cognitive: true,
    strengths: true,
    weaknesses: true,
    relationships: false,
    career: false,
    growth: false,
    stress: false,
    famous: false,
  });

  useEffect(() => {
    const key = searchParams.get('key');
    const type = searchParams.get('type') || 'MBTI60';
    const view = searchParams.get('view') === 'enterprise'
      ? 'enterprise'
      : 'employee';
    if (key) {
      fetchResult(key, type, view);
    } else {
      // 没有key，显示错误
      setError('无效的测试结果链接，请重新进行测试');
      setLoading(false);
    }
  }, [searchParams]);

  const fetchResult = async (
    accessKey: string,
    testType: string,
    view: "employee" | "enterprise",
  ) => {
    try {
      const params = new URLSearchParams({
        accessKey,
        testType,
        audience: view,
      });
      const response = await fetch(
        `/api/mbti/test/result?${params.toString()}`,
        {
          cache: "no-store",
        },
      );
      const data = await response.json();
      if (data.code === 0) {
        setReport(data.data);
      } else {
        setError(data.message || '获取测试结果失败');
      }
    } catch (error) {
      console.error('Failed to fetch result:', error);
      setError('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const [showShareModal, setShowShareModal] = useState(false);

  // 生成丰富HTML格式报告
  const generateReportHTML = (report: TestResult) => {
    const detail = mbtiFullReports[report.mbti_type];
    const group = getMBTIGroup(report.mbti_type);
    const groupNames: Record<string, string> = {
      'analysts': '分析家',
      'diplomats': '外交家',
      'sentinels': '守护者',
      'explorers': '探险家'
    };
    const groupName = groupNames[group] || group;
    const getPercentage = (score?: number) => {
      const value = Number(score);
      return Number.isFinite(value) ? Math.max(0, Math.min(100, Math.round(value))) : 50;
    };
    
    return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MBTI人格测试报告 - ${report.mbti_type}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6; 
      color: #1f2937; 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px 20px;
    }
    .container { 
      max-width: 800px; 
      margin: 0 auto; 
      background: white;
      border-radius: 24px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 48px;
      text-align: center;
    }
    .type-badge {
      display: inline-block;
      background: rgba(255,255,255,0.2);
      padding: 8px 20px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: 16px;
      backdrop-filter: blur(10px);
    }
    .type-code {
      font-size: 72px;
      font-weight: 800;
      margin: 16px 0;
      letter-spacing: 4px;
    }
    .tagline {
      font-size: 20px;
      opacity: 0.9;
      font-weight: 300;
    }
    .content { padding: 48px; }
    .section { margin-bottom: 40px; }
    .section-title {
      font-size: 22px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 3px solid #e5e7eb;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .section-title::before {
      content: '';
      width: 4px;
      height: 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 2px;
    }
    .description {
      font-size: 16px;
      color: #4b5563;
      line-height: 1.8;
      margin-bottom: 20px;
    }
    .scores-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin: 24px 0;
    }
    .score-item {
      background: #f9fafb;
      padding: 20px;
      border-radius: 16px;
      border: 1px solid #e5e7eb;
    }
    .score-label {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 8px;
      font-weight: 600;
    }
    .score-bar {
      height: 8px;
      background: #e5e7eb;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 8px;
    }
    .score-fill {
      height: 100%;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      border-radius: 4px;
    }
    .score-value {
      font-size: 24px;
      font-weight: 700;
      color: #1f2937;
    }
    .traits-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    .trait-item {
      background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
      padding: 16px;
      border-radius: 12px;
      font-weight: 500;
    }
    .list-item {
      background: #f9fafb;
      padding: 16px 20px;
      border-radius: 12px;
      margin-bottom: 12px;
      border-left: 4px solid #667eea;
    }
    .list-title {
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 4px;
    }
    .list-desc {
      color: #6b7280;
      font-size: 14px;
    }
    .career-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
    }
    .career-tag {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
    }
    .footer {
      background: #f9fafb;
      padding: 24px 48px;
      text-align: center;
      color: #6b7280;
      font-size: 14px;
      border-top: 1px solid #e5e7eb;
    }
    .date {
      color: #9ca3af;
      font-size: 14px;
      margin-top: 8px;
    }
    @media print {
      body { background: white; padding: 0; }
      .container { box-shadow: none; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="type-badge">${groupName}</div>
      <div class="type-code">${report.mbti_type}</div>
      <div class="tagline">${detail?.tagline || ''}</div>
      <div class="date">生成日期：${new Date().toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale)}</div>
    </div>
    
    <div class="content">
      <!-- 维度得分 -->
      <div class="section">
        <div class="section-title">维度得分分析</div>
        <div class="scores-grid">
          <div class="score-item">
            <div class="score-label">外向 (E) ←→ 内向 (I)</div>
            <div class="score-bar"><div class="score-fill" style="width: ${getPercentage(report.ei_score)}%"></div></div>
            <div class="score-value">${getPercentage(report.ei_score)}% ${getPercentage(report.ei_score) >= 50 ? 'E' : 'I'}</div>
          </div>
          <div class="score-item">
            <div class="score-label">实感 (S) ←→ 直觉 (N)</div>
            <div class="score-bar"><div class="score-fill" style="width: ${getPercentage(report.sn_score)}%"></div></div>
            <div class="score-value">${getPercentage(report.sn_score)}% ${getPercentage(report.sn_score) >= 50 ? 'S' : 'N'}</div>
          </div>
          <div class="score-item">
            <div class="score-label">思考 (T) ←→ 情感 (F)</div>
            <div class="score-bar"><div class="score-fill" style="width: ${getPercentage(report.tf_score)}%"></div></div>
            <div class="score-value">${getPercentage(report.tf_score)}% ${getPercentage(report.tf_score) >= 50 ? 'T' : 'F'}</div>
          </div>
          <div class="score-item">
            <div class="score-label">判断 (J) ←→ 知觉 (P)</div>
            <div class="score-bar"><div class="score-fill" style="width: ${getPercentage(report.jp_score)}%"></div></div>
            <div class="score-value">${getPercentage(report.jp_score)}% ${getPercentage(report.jp_score) >= 50 ? 'J' : 'P'}</div>
          </div>
        </div>
      </div>

      <!-- 类型描述 -->
      <div class="section">
        <div class="section-title">人格类型描述</div>
        <p class="description">${detail?.description || ''}</p>
        ${detail?.detailedDescription ? `<p class="description">${detail.detailedDescription}</p>` : ''}
      </div>

      <!-- 核心特质 -->
      ${detail?.traitsDetailed ? `
      <div class="section">
        <div class="section-title">核心特质</div>
        <div class="traits-grid">
          ${detail.traitsDetailed.map((t: any) => `<div class="trait-item">${t.title}</div>`).join('')}
        </div>
      </div>
      ` : ''}

      <!-- 优势特点 -->
      ${detail?.strengths ? `
      <div class="section">
        <div class="section-title">优势特点</div>
        ${detail.strengths.map((s: any) => `
          <div class="list-item">
            <div class="list-title">${s.title}</div>
            <div class="list-desc">${s.desc}</div>
            ${s.details ? `<div class="list-desc" style="margin-top: 8px; color: #4b5563;"><strong>详细说明：</strong>${s.details}</div>` : ''}
            ${s.examples ? `<div class="list-desc" style="margin-top: 8px; color: #4b5563;"><strong>实际应用：</strong>${s.examples.join('、')}</div>` : ''}
          </div>
        `).join('')}
      </div>
      ` : ''}

      <!-- 潜在弱点 -->
      ${detail?.weaknesses ? `
      <div class="section">
        <div class="section-title">潜在弱点与改进建议</div>
        ${detail.weaknesses.map((w: any) => `
          <div class="list-item">
            <div class="list-title">${w.title}</div>
            <div class="list-desc">${w.desc}</div>
            ${w.impact ? `<div class="list-desc" style="margin-top: 8px; color: #dc2626;"><strong>可能的影响：</strong>${w.impact}</div>` : ''}
            ${w.solutions ? `<div class="list-desc" style="margin-top: 8px; color: #059669;"><strong>改进建议：</strong>${w.solutions.join('；')}</div>` : ''}
          </div>
        `).join('')}
      </div>
      ` : ''}

      <!-- 认知功能 -->
      ${detail?.cognitiveFunctions ? `
      <div class="section">
        <div class="section-title">认知功能栈</div>
        ${detail.cognitiveFunctions.map((c: any) => `
          <div class="list-item">
            <div class="list-title">${c.symbol} - ${c.name} (${c.level})</div>
            <div class="list-desc">${c.description}</div>
          </div>
        `).join('')}
      </div>
      ` : ''}

      <!-- 职业发展 -->
      ${detail?.career ? `
      <div class="section">
        <div class="section-title">职业发展建议</div>
        <p class="description">${detail.career.desc}</p>
        ${detail.career.suitableDetails ? `<p class="description" style="margin-top: 12px;">${detail.career.suitableDetails}</p>` : ''}
        <div style="margin-top: 16px;">
          <strong>适合的职业方向：</strong>
          <div class="career-tags">
            ${detail.career.suitable?.map((c: string) => `<span class="career-tag">${c}</span>`).join('') || ''}
          </div>
        </div>
        ${detail.career.workStyle ? `<p style="margin-top: 16px;"><strong>工作风格：</strong>${detail.career.workStyle}</p>` : ''}
        ${detail.career.workStyleDetailed ? `<p style="margin-top: 12px; color: #4b5563;">${detail.career.workStyleDetailed}</p>` : ''}
        ${detail.career.workEnvironment ? `<p style="margin-top: 12px;"><strong>理想工作环境：</strong>${detail.career.workEnvironment}</p>` : ''}
        ${detail.career.leadershipStyle ? `<p style="margin-top: 12px;"><strong>领导风格：</strong>${detail.career.leadershipStyle}</p>` : ''}
        ${detail.career.teamworkStyle ? `<p style="margin-top: 12px;"><strong>团队协作：</strong>${detail.career.teamworkStyle}</p>` : ''}
        ${detail.career.unsuitable?.length ? `
        <div style="margin-top: 16px;">
          <strong>可能不适合的领域：</strong>
          <div class="career-tags">
            ${detail.career.unsuitable.map((c: string) => `<span class="career-tag" style="background: #fef2f2; color: #991b1b;">${c}</span>`).join('')}
          </div>
        </div>
        ` : ''}
      </div>
      ` : ''}

      <!-- 人际关系 -->
      ${detail?.relationships ? `
      <div class="section">
        <div class="section-title">人际关系特点</div>
        ${(detail as any).relationships.romance ? `
          <div class="list-item" style="margin-top: 16px;">
            <div class="list-title">恋爱关系</div>
            <div class="list-desc">${(detail as any).relationships.romance.desc || ''}</div>
          </div>
        ` : ''}
        ${(detail as any).relationships.friendship ? `
          <div class="list-item" style="margin-top: 16px;">
            <div class="list-title">友谊关系</div>
            <div class="list-desc">${(detail as any).relationships.friendship.desc || ''}</div>
          </div>
        ` : ''}
        ${(detail as any).relationships.parenting ? `
          <div class="list-item" style="margin-top: 16px;">
            <div class="list-title">亲子关系</div>
            <div class="list-desc">${(detail as any).relationships.parenting.desc || ''}</div>
          </div>
        ` : ''}
      </div>
      ` : ''}

      <!-- 成长建议 -->
      ${detail?.growth ? `
      <div class="section">
        <div class="section-title">个人成长建议</div>
        ${detail.growth.detailedAdvice ? `<p class="description">${detail.growth.detailedAdvice}</p>` : ''}
        ${detail.growth.opportunitiesDetailed ? `<p class="description" style="margin-top: 12px;"><strong>成长机会：</strong>${detail.growth.opportunitiesDetailed}</p>` : ''}
        ${detail.growth.actions?.length ? `
        <div style="margin-top: 16px;">
          <strong>具体行动：</strong>
          <ul style="margin-top: 8px; padding-left: 20px;">
            ${detail.growth.actions.map((a: any) => `<li style="margin-bottom: 6px; color: #4b5563;">${typeof a === 'string' ? a : a.title + ' - ' + a.desc}</li>`).join('')}
          </ul>
        </div>
        ` : ''}
        ${detail.growth.longTermGoals?.length ? `
        <div style="margin-top: 16px;">
          <strong>长期目标：</strong>
          <ul style="margin-top: 8px; padding-left: 20px;">
            ${detail.growth.longTermGoals.map((g: string) => `<li style="margin-bottom: 6px; color: #059669;">${g}</li>`).join('')}
          </ul>
        </div>
        ` : ''}
        ${detail.growth.opportunities?.slice(0, 3).map((g: any, i: number) => `
          <div class="list-item" style="margin-top: 16px;">
            <div class="list-title">成长机会 ${i + 1}</div>
            <div class="list-desc">${typeof g === 'string' ? g : g.title + ' - ' + g.desc}</div>
          </div>
        `).join('')}
      </div>
      ` : ''}

      <!-- 性别专属解读 -->
      ${detail?.genderSpecific ? `
      <div class="section" style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-left: 4px solid #0ea5e9;">
        <div class="section-title" style="color: #0369a1;">${detail.genderSpecific.socialPerception.title}</div>
        <p class="description">${detail.genderSpecific.socialPerception.content}</p>
        
        <div style="margin-top: 20px; padding: 16px; background: white; border-radius: 8px;">
          <div style="font-weight: 600; color: #7c3aed; margin-bottom: 12px;">${detail.genderSpecific.relationships.title}</div>
          <p style="color: #4b5563; margin-bottom: 12px;"><strong>优势：</strong>${detail.genderSpecific.relationships.strengths}</p>
          <p style="color: #4b5563; margin-bottom: 12px;"><strong>挑战：</strong>${detail.genderSpecific.relationships.challenges}</p>
          <p style="color: #059669;"><strong>建议：</strong>${detail.genderSpecific.relationships.advice}</p>
        </div>
        
        <div style="margin-top: 20px; padding: 16px; background: white; border-radius: 8px;">
          <div style="font-weight: 600; color: #ea580c; margin-bottom: 12px;">${detail.genderSpecific.emotionalGrowth.title}</div>
          <p style="color: #4b5563; margin-bottom: 12px;">${detail.genderSpecific.emotionalGrowth.sources}</p>
          <div style="margin-top: 12px;">
            <strong>提升策略：</strong>
            <ul style="margin-top: 8px; padding-left: 20px;">
              ${detail.genderSpecific.emotionalGrowth.strategies.map((s: string) => `<li style="margin-bottom: 6px; color: #4b5563;">${s}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
      ` : ''}

      <!-- 压力管理 -->
      ${detail?.stress ? `
      <div class="section">
        <div class="section-title">压力管理指南</div>
        <p class="description">${(detail.stress as any).desc || ''}</p>
        ${(detail.stress as any).triggersDetailed?.length ? `
        <div style="margin-top: 16px;">
          <strong>压力触发源详情：</strong>
          <ul style="margin-top: 8px; padding-left: 20px;">
            ${(detail.stress as any).triggersDetailed.map((t: any) => `<li style="margin-bottom: 8px;"><strong>${t.trigger || ''}</strong>：${t.explanation || ''}</li>`).join('')}
          </ul>
        </div>
        ` : ''}
        ${(detail.stress as any).signsDetailed?.length ? `
        <div style="margin-top: 16px;">
          <strong>压力信号详情：</strong>
          <ul style="margin-top: 8px; padding-left: 20px;">
            ${(detail.stress as any).signsDetailed.map((s: any) => `<li style="margin-bottom: 8px;"><strong>${s.stage || ''}</strong>：${s.signs?.join('、') || ''}</li>`).join('')}
          </ul>
        </div>
        ` : ''}
        ${(detail.stress as any).copingDetailed?.length ? `
        <div style="margin-top: 16px;">
          <strong>应对策略详情：</strong>
          <ul style="margin-top: 8px; padding-left: 20px;">
            ${(detail.stress as any).copingDetailed.map((c: any) => `<li style="margin-bottom: 8px;"><strong>${c.situation || ''}</strong>：${c.strategy || ''}</li>`).join('')}
          </ul>
        </div>
        ` : ''}
        ${detail.stress.triggers?.length ? `
        <div style="margin-top: 16px;">
          <strong>常见压力源：</strong>
          <ul style="margin-top: 8px; padding-left: 20px;">
            ${detail.stress.triggers.map((t: string) => `<li style="margin-bottom: 6px; color: #991b1b;">${t}</li>`).join('')}
          </ul>
        </div>
        ` : ''}
        ${detail.stress.signs?.length ? `
        <div style="margin-top: 16px;">
          <strong>压力表现：</strong>
          <ul style="margin-top: 8px; padding-left: 20px;">
            ${detail.stress.signs.map((s: string) => `<li style="margin-bottom: 6px; color: #92400e;">${s}</li>`).join('')}
          </ul>
        </div>
        ` : ''}
        ${(detail as any).stress?.copingStrategies?.length ? `
        <div style="margin-top: 16px;">
          <strong>应对方法：</strong>
          <ul style="margin-top: 8px; padding-left: 20px;">
            ${(detail as any).stress.copingStrategies.map((c: string) => `<li style="margin-bottom: 6px; color: #059669;">${c}</li>`).join('')}
          </ul>
        </div>
        ` : ''}
      </div>
      ` : ''}
    </div>
    
    <div class="footer">
      <p>本报告基于MBTI人格理论生成，仅供个人参考</p>
      <p style="margin-top: 8px; font-size: 12px;">MBTI Personality Test Report</p>
    </div>
  </div>
</body>
</html>`;
  };

  const handleDownload = () => {
    if (!report) return;
    try {
      const htmlContent = generateReportHTML(report);
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `MBTI_${report.mbti_type}_Report.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('下载失败，请重试');
    }
  };

  // 分享功能
  const handleShare = async () => {
    const shareData = {
      title: `我的MBTI人格类型是${report?.mbti_type}`,
      text: `我刚刚完成了MBTI人格测试，发现我是${report?.mbti_type}类型 - ${typeDetail?.tagline}`,
      url: window.location.href,
    };

    // 始终显示分享弹窗，避免 navigator.share 兼容性问题
    setShowShareModal(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert(t('result.share.copied') || '链接已复制到剪贴板');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">出错了</h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <Link href="/mbti-home">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
              返回首页重新测试
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
            <span className="text-2xl">📭</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">未找到结果</h2>
          <p className="text-slate-600 mb-6">测试结果不存在或已过期</p>
          <Link href="/mbti-home">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
              返回首页重新测试
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const employeeResultVisibility =
    report.employee_result_visibility ||
    report.employeeResultVisibility ||
    "summary";
  const isEnterpriseResult =
    report.report_type === "enterprise" ||
    report.reportType === "enterprise";
  const isEmployeeAudience =
    report.audience !== "enterprise";

  if (
    isEnterpriseResult &&
    isEmployeeAudience &&
    (employeeResultVisibility === "hidden" ||
      report.resultHidden ||
      report.result_hidden)
  ) {
    return (
      <div className="min-h-screen bg-slate-50">
        <nav className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
            <Link href="/mbti-home" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">MBTI</span>
            </Link>
            <LanguageSelector />
          </div>
        </nav>

        <main className="mx-auto flex max-w-3xl items-center justify-center px-4 py-20">
          <div className="w-full rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-lg">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-3xl">
              🔒
            </div>
            <h1 className="mt-5 text-2xl font-black text-slate-900">
              企业暂未开放员工测评结果
            </h1>
            <p className="mt-3 leading-7 text-slate-500">
              本次测评结果已提交给企业管理员，请联系企业管理员查看后续安排。
            </p>
            <Link
              href="/mbti-home"
              className="mt-7 inline-flex rounded-xl bg-slate-950 px-6 py-3 font-semibold text-white hover:bg-slate-800"
            >
              返回首页
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const typeDetail = mbtiFullReports[report.mbti_type];
  const group = getMBTIGroup(report.mbti_type);
  const groupColor = getGroupColor(group);
  const typeImage = getMBTIImage(report.mbti_type);
  const isEnterpriseEmployeeView =
    isEnterpriseResult &&
    isEmployeeAudience &&
    employeeResultVisibility === "summary";

  if (isEnterpriseEmployeeView) {
    return (
      <div className="min-h-screen bg-slate-50">
        <nav className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
            <Link href="/mbti-home" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">MBTI</span>
            </Link>
            <LanguageSelector />
          </div>
        </nav>

        <main className="mx-auto max-w-3xl px-4 py-12">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
            <div className={`bg-gradient-to-br ${groupColor.gradient} px-8 py-10 text-center text-white`}>
              <div className="text-sm font-semibold opacity-80">您的MBTI人格类型</div>
              <div className="mt-3 text-6xl font-black tracking-wider">
                {report.mbti_type}
              </div>
              <div className="mt-3 text-lg font-medium text-white/90">
                {typeDetail?.tagline}
              </div>
            </div>

            <div className="p-8">
              <h1 className="flex items-center gap-3 text-2xl font-black text-slate-900">
                <Brain className="h-7 w-7 text-indigo-600" />
                类型描述
              </h1>
                            <p className="mt-5 text-lg leading-9 text-slate-600">
                {typeDetail?.description}
              </p>

              {typeDetail?.detailedDescription && (
                <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                  <h2 className="text-lg font-bold text-slate-900">
                    详细分析
                  </h2>
                  <div className="mt-3 whitespace-pre-line text-base leading-8 text-slate-600">
                    {typeDetail.detailedDescription}
                  </div>
                </div>
              )}

              {typeDetail?.traitsDetailed && (
                <div className="mt-6">
                  <h2 className="text-lg font-bold text-slate-900">
                    核心特质
                  </h2>
                  <div className="mt-4 grid gap-3">
                    {typeDetail.traitsDetailed.map(
                      (trait: any, index: number) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white px-1 py-1"
                        >
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
                          <div className="leading-7">
                            <span className="font-semibold text-slate-900">
                              {trait.title}
                            </span>
                            {trait.content && (
                              <span className="text-slate-600">
                                {" "}
                                - {trait.content}
                              </span>
                            )}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

              <Link
                href="/mbti-home"
                className="mt-6 block rounded-xl bg-slate-950 px-6 py-4 text-center font-semibold text-white hover:bg-slate-800"
              >
                返回首页
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // 个人结果和企业管理员结果继续展示完整报告。
  const getPercentage = (score?: number) => {
    const value = Number(score);
    return Number.isFinite(value) ? Math.max(0, Math.min(100, Math.round(value))) : 50;
  };

  const SectionCard = ({ 
    id, 
    title, 
    icon: Icon, 
    children,
    defaultOpen = false 
  }: { 
    id: string; 
    title: string; 
    icon: any; 
    children: React.ReactNode;
    defaultOpen?: boolean;
  }) => {
    const isExpanded = expandedSections[id] ?? defaultOpen;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
      >
        <button
          onClick={() => toggleSection(id)}
          className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${groupColor.gradient} 
                           flex items-center justify-center`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          </div>
          {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

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

      {/* Hero Section with Type Image */}
      <section className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white"
          >
            <div className="absolute inset-0 opacity-30">
              <img 
                src={typeImage} 
                alt={report.mbti_type}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent" />
            
            <div className="relative p-8 md:p-12 lg:p-16">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full 
                    bg-gradient-to-r ${groupColor.gradient} mb-6`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-semibold capitalize">{group}</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4"
                >
                  {report.mbti_type}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl text-slate-300 mb-8"
                >
                  {typeDetail?.tagline}
                </motion.p>

                {/* Action Buttons - 放在更显眼的位置 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-3 mb-8"
                >
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl 
                             font-semibold hover:bg-white/90 transition-colors shadow-lg"
                  >
                    <Share2 className="w-5 h-5" />
                    {t('result.actions.share') || '分享结果'}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-6 py-3 bg-white/20 text-white rounded-xl 
                             font-semibold hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/30"
                  >
                    <Download className="w-5 h-5" />
                    {t('result.actions.download')}
                  </button>
                  <Link
                    href="/mbti-home"
                    className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl 
                             font-semibold hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    {t('result.actions.retake')}
                  </Link>
                </motion.div>

                {/* Dimension Scores */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  {[
                    { label: 'E/I', score: report.ei_score, left: 'E', right: 'I' },
                    { label: 'S/N', score: report.sn_score, left: 'S', right: 'N' },
                    { label: 'T/F', score: report.tf_score, left: 'T', right: 'F' },
                    { label: 'J/P', score: report.jp_score, left: 'J', right: 'P' },
                  ].map((dim) => (
                    <div key={dim.label} className="bg-white/10 backdrop-blur rounded-xl p-4">
                      <div className="text-sm text-slate-400 mb-2">{dim.label}</div>
                      <div className="flex items-center gap-2 text-xs mb-2">
                        <span>{dim.left}</span>
                        <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full bg-gradient-to-r ${groupColor.gradient}`}
                            style={{ width: `${getPercentage(dim.score)}%` }}
                          />
                        </div>
                        <span>{dim.right}</span>
                      </div>
                      <div className="text-2xl font-bold">
                        {getPercentage(dim.score)}% {getPercentage(dim.score) >= 50 ? dim.left : dim.right}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Description */}
            <SectionCard id="description" title={t('result.typeDescription')} icon={Brain} defaultOpen={true}>
              <p className="text-slate-600 leading-relaxed text-lg mb-4">{typeDetail?.description}</p>
              {typeDetail?.detailedDescription && (
                <div className="mt-4 p-4 bg-slate-50 rounded-xl">
                  <h4 className="font-semibold text-slate-900 mb-2">{t('result.detailedAnalysis')}</h4>
                  <div className="text-slate-600 leading-relaxed whitespace-pre-line">
                    {typeDetail?.detailedDescription}
                  </div>
                </div>
              )}
              {typeDetail?.traitsDetailed && (
                <div className="mt-4">
                  <h4 className="font-semibold text-slate-900 mb-3">{t('result.coreTraits')}</h4>
                  <div className="grid gap-2">
                    {typeDetail.traitsDetailed.map((trait: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-slate-900">{trait.title}</span>
                          <span className="text-slate-600"> - {trait.content}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </SectionCard>

            {/* Cognitive Functions */}
            <SectionCard id="cognitive" title={t('result.cognitive.title')} icon={Zap} defaultOpen={true}>
              <div className="space-y-4">
                {typeDetail?.cognitiveFunctions?.map((func: any, idx: number) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${groupColor.gradient} 
                                   flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white font-bold text-sm">{func.symbol}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-slate-900">{func.name}</h4>
                        <span className="text-xs px-2 py-0.5 bg-slate-200 rounded-full text-slate-600">
                          {func.level}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">{func.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Strengths */}
            <SectionCard id="strengths" title={t('result.strengths.title')} icon={Star} defaultOpen={true}>
              <div className="grid gap-4">
                {typeDetail?.strengths?.map((strength: any, idx: number) => (
                  <div key={idx} className="p-4 bg-green-50 rounded-xl border border-green-100">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
                        <Target className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-900">{strength.title}</h4>
                        <p className="text-sm text-green-700">{strength.desc}</p>
                      </div>
                    </div>
                    {strength.details && (
                      <div className="mt-2 pl-11">
                        <p className="text-sm text-green-600 leading-relaxed">{strength.details}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {typeDetail?.strengthsDetailed && (
                <div className="mt-4 p-4 bg-green-50/50 rounded-xl border border-green-100">
                  <h4 className="font-semibold text-green-900 mb-2">{t('result.strengths.summary')}</h4>
                  <p className="text-sm text-green-700 leading-relaxed">{typeDetail.strengthsDetailed}</p>
                </div>
              )}
            </SectionCard>

            {/* Weaknesses */}
            <SectionCard id="weaknesses" title={t('result.weaknesses.title')} icon={Shield}>
              <div className="grid gap-4">
                {typeDetail?.weaknesses?.map((weakness: any, idx: number) => (
                  <div key={idx} className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center flex-shrink-0">
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-amber-900">{weakness.title}</h4>
                        <p className="text-sm text-amber-700">{weakness.desc}</p>
                      </div>
                    </div>
                    {weakness.impact && (
                      <div className="mt-2 pl-11">
                        <p className="text-xs text-amber-600 mb-1">{t('result.weaknesses.impact')}</p>
                        <p className="text-sm text-amber-700">{weakness.impact}</p>
                      </div>
                    )}
                    {weakness.solution && (
                      <div className="mt-2 pl-11 pt-2 border-t border-amber-200">
                        <p className="text-xs text-green-600 mb-1">{t('result.weaknesses.solution')}</p>
                        <p className="text-sm text-green-700">{weakness.solution}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Relationships */}
            <SectionCard id="relationships" title={t('result.relationships.title')} icon={Heart}>
              <div className="space-y-6">
                <div className="p-4 bg-rose-50 rounded-xl">
                  <h4 className="font-semibold text-rose-900 mb-2 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-500" />
                    {t('result.relationships.romance')}
                  </h4>
                  <p className="text-slate-700 mb-3">{typeDetail?.relationships?.romance?.desc}</p>
                  {typeDetail?.relationships?.romance?.characteristics && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-rose-800">{t('result.relationships.characteristics')}</p>
                      <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                        {typeDetail.relationships.romance.characteristics.map((char: string, idx: number) => (
                          <li key={idx}>{char}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="p-4 bg-blue-50 rounded-xl">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    {t('result.relationships.friendship')}
                  </h4>
                  <p className="text-slate-700 mb-3">{typeDetail?.relationships?.friendship?.desc}</p>
                  {typeDetail?.relationships?.friendship?.characteristics && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-blue-800">{t('result.relationships.characteristics')}</p>
                      <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                        {typeDetail.relationships.friendship.characteristics.map((char: string, idx: number) => (
                          <li key={idx}>{char}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="p-4 bg-green-50 rounded-xl">
                  <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    {t('result.relationships.parenting')}
                  </h4>
                  <p className="text-slate-700 mb-3">{typeDetail?.relationships?.parenting?.desc}</p>
                  {typeDetail?.relationships?.parenting?.characteristics && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-green-800">{t('result.relationships.characteristics')}</p>
                      <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                        {typeDetail.relationships.parenting.characteristics.map((char: string, idx: number) => (
                          <li key={idx}>{char}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </SectionCard>

            {/* Career */}
            <SectionCard id="career" title={t('result.career.title')} icon={Briefcase}>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">{t('result.career.suitable')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {typeDetail?.career?.suitable?.map((job: string, idx: number) => (
                      <span key={idx} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                        {job}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">{t('result.career.workStyle')}</h4>
                  <p className="text-slate-600">{typeDetail?.career?.workStyle}</p>
                  {typeDetail?.career?.workStyleDetailed && (
                    <div className="mt-3 p-4 bg-indigo-50 rounded-xl">
                      <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                        {typeDetail.career.workStyleDetailed}
                      </div>
                    </div>
                  )}
                </div>
                {typeDetail?.career?.workEnvironment && (
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <h4 className="font-semibold text-slate-900 mb-2">{t('result.career.workEnvironment')}</h4>
                    <p className="text-slate-600 text-sm">{typeDetail.career.workEnvironment}</p>
                  </div>
                )}
              </div>
            </SectionCard>

            {/* Growth */}
            <SectionCard id="growth" title={t('result.growth.title')} icon={TrendingUp}>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">{t('result.growth.opportunities')}</h4>
                  <ul className="space-y-3">
                    {typeDetail?.growth?.opportunities?.map((item: any, idx: number) => (
                      <li key={idx} className="p-3 bg-indigo-50 rounded-xl">
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                          <div>
                            {typeof item === 'string' ? (
                              <span className="text-slate-700">{item}</span>
                            ) : (
                              <>
                                <p className="font-medium text-slate-900">{item.title}</p>
                                <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                              </>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">{t('result.growth.actionSteps')}</h4>
                  <ul className="space-y-3">
                    {typeDetail?.growth?.actions?.map((item: any, idx: number) => (
                      <li key={idx} className="p-3 bg-purple-50 rounded-xl">
                        <div className="flex items-start gap-2">
                          <span className="w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center flex-shrink-0">
                            {idx + 1}
                          </span>
                          <div>
                            {typeof item === 'string' ? (
                              <span className="text-slate-700">{item}</span>
                            ) : (
                              <>
                                <p className="font-medium text-slate-900">{item.title}</p>
                                <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                              </>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                {typeDetail?.growth?.detailedAdvice && (
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <h4 className="font-semibold text-slate-900 mb-2">{t('result.growth.detailedAdvice')}</h4>
                    <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                      {typeDetail.growth.detailedAdvice}
                    </div>
                  </div>
                )}
              </div>
            </SectionCard>

            {/* Famous People */}
            <SectionCard id="famous" title={t('result.famous.title')} icon={Users}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {typeDetail?.famousPeople?.map((person: { name: string; title: string }, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${groupColor.gradient} 
                                   flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white text-xs font-bold">
                        {person.name.charAt(0)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-slate-700 truncate">{person.name}</div>
                      <div className="text-xs text-slate-500 truncate">{person.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

        </div>
      </section>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-900">
                    {t('result.share.title') || '分享你的结果'}
                  </h3>
                  <button
                    onClick={() => setShowShareModal(false)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Share Preview */}
                <div className={`p-6 rounded-2xl bg-gradient-to-br ${groupColor.gradient} text-white mb-6`}>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">{report?.mbti_type}</div>
                    <div className="text-white/80 text-sm">{typeDetail?.tagline}</div>
                  </div>
                </div>

                {/* Share Options */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <button
                    onClick={copyToClipboard}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-xs text-slate-600">{t('result.share.copy') || '复制链接'}</span>
                  </button>
                  
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`我的MBTI类型是${report?.mbti_type} - ${typeDetail?.tagline}`)}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-sky-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </div>
                    <span className="text-xs text-slate-600">Twitter</span>
                  </a>
                  
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </div>
                    <span className="text-xs text-slate-600">Facebook</span>
                  </a>
                  
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`我的MBTI类型是${report?.mbti_type} - ${typeDetail?.tagline} ${window.location.href}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <span className="text-xs text-slate-600">WhatsApp</span>
                  </a>
                </div>

                {/* Copy Link Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={window.location.href}
                    className="flex-1 px-4 py-3 bg-slate-100 rounded-xl text-sm text-slate-600 outline-none"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors"
                  >
                    {t('result.share.copy') || '复制'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 主导出组件
export default function ResultPage() {
  return (
    <I18nProvider>
      <Suspense fallback={<LoadingFallback />}>
        <ResultPageContent />
      </Suspense>
    </I18nProvider>
  );
}

// 加载状态组件
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-slate-600">加载中...</p>
      </div>
    </div>
  );
}

