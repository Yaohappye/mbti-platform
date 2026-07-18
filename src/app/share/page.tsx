'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Brain, Users, Briefcase, Heart, TrendingUp, Shield, 
  RefreshCw, Home, ChevronDown, ChevronUp, Sparkles
} from 'lucide-react';

interface ReportData {
  mbti_type: string;
  type_name: string;
  type_name_cn: string;
  ei_score: number;
  sn_score: number;
  tf_score: number;
  jp_score: number;
  report: {
    basicInfo: {
      type: string;
      name: string;
      nameCn: string;
      slogan: string;
    };
    dimensionAnalysis: {
      [key: string]: {
        letter: string;
        score: number;
        description: string;
      };
    };
    cognitiveFunctions: string;
    personalityTraits: string[];
    strengths: string[];
    weaknesses: string[];
    relationships: string[];
    careerAdvice: string;
    stressResponse: string;
    personalGrowth: string;
  };
}

function ShareContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const key = searchParams.get('key');
  const testType = searchParams.get('type') || 'MBTI60';

  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    dimensions: true,
    cognitive: false,
    traits: false,
    strengths: false,
    weaknesses: false,
    relationships: false,
    career: false,
    stress: false,
    growth: false
  });

  useEffect(() => {
    const fetchResult = async () => {
      if (!key) {
        setError('无效的分享链接');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/mbti/test/result?accessKey=${key}&testType=${testType}`);
        const data = await response.json();

        if (data.code === 0) {
          setReport(data.data);
        } else if (data.code === 404) {
          setError('分享链接已过期或不存在');
        } else {
          setError(data.message || '获取结果失败');
        }
      } catch (err) {
        setError('网络错误，请重试');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [key, testType]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">正在加载报告</h2>
          <p className="text-gray-500">请稍候...</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">无法查看报告</h2>
          <p className="text-gray-500 mb-6">{error || '链接无效'}</p>
          <button 
            onClick={() => router.push('/mbti-home')}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            前往测试
          </button>
        </div>
      </div>
    );
  }

  const r = report.report;
  const dimensionColors: Record<string, string> = {
    EI: '#3B82F6',
    SN: '#8B5CF6',
    TF: '#EC4899',
    JP: '#10B981'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* 顶部渐变 */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 pt-12 pb-24">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-white/80">MBTI 人格测试分享</span>
            <Sparkles className="w-5 h-5 text-yellow-300" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-white/80 mb-2">人格类型</p>
            <h1 className="text-6xl font-bold mb-2">{report.mbti_type}</h1>
            <p className="text-2xl font-medium mb-4">{r.basicInfo.nameCn}</p>
            <p className="text-white/90 text-lg">{r.basicInfo.slogan}</p>
          </motion.div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="max-w-4xl mx-auto px-4 -mt-16 pb-12">
        {/* 操作按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-6"
        >
          <button
            onClick={() => router.push('/mbti-home')}
            className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <RefreshCw className="w-4 h-4 text-purple-600" />
            <span className="text-gray-700 font-medium">我也测一测</span>
          </button>
          <button
            onClick={() => router.push('/mbti-home')}
            className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <Home className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700 font-medium">返回首页</span>
          </button>
        </motion.div>

        {/* 维度分析 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6"
        >
          <button
            onClick={() => toggleSection('dimensions')}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Brain className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">维度解析</h2>
            </div>
            {expandedSections.dimensions ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          {expandedSections.dimensions && (
            <div className="px-6 pb-6 space-y-6">
              {['EI', 'SN', 'TF', 'JP'].map((dim) => {
                const dimData = r.dimensionAnalysis[dim];
                const dimLabels: Record<string, { title: string; left: string; right: string }> = {
                  EI: { title: '外向 vs 内向', left: '内向(I)', right: '外向(E)' },
                  SN: { title: '感觉 vs 直觉', left: '直觉(N)', right: '感觉(S)' },
                  TF: { title: '思考 vs 情感', left: '情感(F)', right: '思考(T)' },
                  JP: { title: '判断 vs 知觉', left: '知觉(P)', right: '判断(J)' }
                };
                const labels = dimLabels[dim];
                const percentage = (dimData.score / 60) * 100;
                
                return (
                  <div key={dim} className="bg-gray-50 rounded-xl p-5">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-gray-800">{labels.title}</span>
                      <span className="font-bold text-lg" style={{ color: dimensionColors[dim] }}>
                        {dimData.letter}
                      </span>
                    </div>
                    <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
                      <div 
                        className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: dimensionColors[dim]
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                      <span>{labels.left}</span>
                      <span>{labels.right}</span>
                    </div>
                    <p className="text-sm text-gray-600">{dimData.description}</p>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* 荣格八维 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6"
        >
          <button
            onClick={() => toggleSection('cognitive')}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Brain className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900">荣格八维功能</h2>
            </div>
            {expandedSections.cognitive ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          {expandedSections.cognitive && (
            <div className="px-6 pb-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5">
                <p className="text-gray-700 leading-relaxed">{r.cognitiveFunctions}</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* 性格特征 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6"
        >
          <button
            onClick={() => toggleSection('traits')}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-900">性格特征</h2>
            </div>
            {expandedSections.traits ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          {expandedSections.traits && (
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {r.personalityTraits.map((trait, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-gray-700">{trait}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* 核心优势 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6"
        >
          <button
            onClick={() => toggleSection('strengths')}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">核心优势</h2>
            </div>
            {expandedSections.strengths ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          {expandedSections.strengths && (
            <div className="px-6 pb-6">
              <div className="space-y-3">
                {r.strengths.map((strength, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 text-sm font-medium flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-gray-700">{strength}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* 潜在挑战 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6"
        >
          <button
            onClick={() => toggleSection('weaknesses')}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-orange-600" />
              <h2 className="text-xl font-bold text-gray-900">潜在挑战</h2>
            </div>
            {expandedSections.weaknesses ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          {expandedSections.weaknesses && (
            <div className="px-6 pb-6">
              <div className="space-y-3">
                {r.weaknesses.map((weakness, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg">
                    <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-sm font-medium flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-gray-700">{weakness}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* 人际关系 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6"
        >
          <button
            onClick={() => toggleSection('relationships')}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-pink-600" />
              <h2 className="text-xl font-bold text-gray-900">人际关系</h2>
            </div>
            {expandedSections.relationships ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          {expandedSections.relationships && (
            <div className="px-6 pb-6">
              <div className="space-y-3">
                {r.relationships.map((rel, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg">
                    <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 text-sm font-medium flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-gray-700">{rel}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* 职业发展 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6"
        >
          <button
            onClick={() => toggleSection('career')}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Briefcase className="w-6 h-6 text-cyan-600" />
              <h2 className="text-xl font-bold text-gray-900">职业发展建议</h2>
            </div>
            {expandedSections.career ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          {expandedSections.career && (
            <div className="px-6 pb-6">
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-5">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{r.careerAdvice}</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* 压力应对 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6"
        >
          <button
            onClick={() => toggleSection('stress')}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-red-600" />
              <h2 className="text-xl font-bold text-gray-900">压力应对指南</h2>
            </div>
            {expandedSections.stress ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          {expandedSections.stress && (
            <div className="px-6 pb-6">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-5">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{r.stressResponse}</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* 个人成长 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6"
        >
          <button
            onClick={() => toggleSection('growth')}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <RefreshCw className="w-6 h-6 text-teal-600" />
              <h2 className="text-xl font-bold text-gray-900">个人成长路径</h2>
            </div>
            {expandedSections.growth ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          {expandedSections.growth && (
            <div className="px-6 pb-6">
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-5">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{r.personalGrowth}</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* 底部 CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-3">想知道你的人格类型吗？</h3>
          <p className="text-white/80 mb-6">完成 60 道题目，获取你的专属 MBTI 人格分析报告</p>
          <button
            onClick={() => router.push('/mbti-home')}
            className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            开始测试
          </button>
        </motion.div>
      </div>
    </div>
  );
}

// 使用 Suspense 包装，避免 useSearchParams 导致的构建错误
export default function SharePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    }>
      <ShareContent />
    </Suspense>
  );
}


