/**
 * MBTI 李克特五选一计分逻辑
 * 严格遵循用户提供的计分规则
 */

import { 
  MBTI60_LIKERT, 
  MBTI93_LIKERT, 
  MBTI200_LIKERT,
  LikertQuestion,
  Dimension,
  Version 
} from '@/data/mbti-questions-likert';
import { mbtiFullReports } from '@/data/mbti-full-reports';

// 李克特选项值
export type LikertValue = 1 | 2 | 3 | 4 | 5;

// 答案接口
export interface LikertAnswer {
  questionId: number;
  value: LikertValue;
}

// 维度得分
export interface DimensionScore {
  dimension: Dimension;
  highLetter: string; // E, S, T, J
  lowLetter: string;  // I, N, F, P
  highScore: number;  // E/S/T/J 的总分
  lowScore: number;   // I/N/F/P 的总分（通过反向计算得出）
  percentage: number; // 高分侧百分比
  diffPercentage: number; // 高低分差值百分比（用于倾向强度判断）
  strength: 'balanced' | 'slight' | 'moderate' | 'strong'; // 倾向强度
  description: string;
}

// 完整结果
export interface LikertMBTIResult {
  type: string; // 4字母代码如"INTJ"
  dimensionScores: Record<Dimension, DimensionScore>;
  answers: LikertAnswer[];
  version: Version;
}

// 获取题库
export function getQuestionBank(version: Version): LikertQuestion[] {
  switch (version) {
    case 60: return MBTI60_LIKERT;
    case 93: return MBTI93_LIKERT;
    case 200: return MBTI200_LIKERT;
    default: return MBTI60_LIKERT;
  }
}

/**
 * 计算单题得分
 * @param question 题目
 * @param value 用户选择的值（1-5）
 * @returns 换算后的得分（1-5）
 */
export function calculateQuestionScore(question: LikertQuestion, value: LikertValue): number {
  if (question.reverse) {
    // 反向题：选1得5分，选2得4分，选3得3分，选4得2分，选5得1分
    return 6 - value;
  } else {
    // 正向题：选1得1分，选2得2分，选3得3分，选4得4分，选5得5分
    return value;
  }
}

/**
 * 计算维度得分
 * @param version 题库版本
 * @param answers 用户答案
 * @returns 各维度得分
 */
export function calculateDimensionScores(
  version: Version,
  answers: LikertAnswer[]
): Record<Dimension, DimensionScore> {
  const questions = getQuestionBank(version);
  
  // 初始化各维度统计
  const stats: Record<Dimension, { highTotal: number; lowTotal: number; maxPossible: number; count: number }> = {
    EI: { highTotal: 0, lowTotal: 0, maxPossible: 0, count: 0 },
    SN: { highTotal: 0, lowTotal: 0, maxPossible: 0, count: 0 },
    TF: { highTotal: 0, lowTotal: 0, maxPossible: 0, count: 0 },
    JP: { highTotal: 0, lowTotal: 0, maxPossible: 0, count: 0 },
  };

  // 遍历所有答案
  for (const answer of answers) {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) continue;

    const score = calculateQuestionScore(question, answer.value);
    const stat = stats[question.dimension];

    // 根据题目方向累加到对应侧
    if (question.dimension === 'EI') {
      if (!question.reverse) {
        // 正向题：高分 = E
        stat.highTotal += score;
      } else {
        // 反向题：原始高分 = I，换算后加到E侧
        stat.highTotal += score;
      }
      stat.lowTotal += (6 - score); // 低分侧 = 反向分
    } else if (question.dimension === 'SN') {
      if (!question.reverse) {
        stat.highTotal += score;
      } else {
        stat.highTotal += score;
      }
      stat.lowTotal += (6 - score);
    } else if (question.dimension === 'TF') {
      if (!question.reverse) {
        stat.highTotal += score;
      } else {
        stat.highTotal += score;
      }
      stat.lowTotal += (6 - score);
    } else if (question.dimension === 'JP') {
      if (!question.reverse) {
        stat.highTotal += score;
      } else {
        stat.highTotal += score;
      }
      stat.lowTotal += (6 - score);
    }

    stat.maxPossible += 5;
    stat.count++;
  }

  // 计算各维度最终得分
  const dimensionScores: Record<Dimension, DimensionScore> = {
    EI: createDimensionScore('EI', 'E', 'I', stats.EI),
    SN: createDimensionScore('SN', 'S', 'N', stats.SN),
    TF: createDimensionScore('TF', 'T', 'F', stats.TF),
    JP: createDimensionScore('JP', 'J', 'P', stats.JP),
  };

  return dimensionScores;
}

/**
 * 创建维度得分对象
 */
function createDimensionScore(
  dimension: Dimension,
  highLetter: string,
  lowLetter: string,
  stat: { highTotal: number; lowTotal: number; maxPossible: number; count: number }
): DimensionScore {
  const highScore = stat.highTotal;
  const lowScore = stat.lowTotal;
  const total = highScore + lowScore;
  
  // 高分侧百分比
  const percentage = total > 0 ? Math.round((highScore / total) * 100) : 50;
  
  // 高低分差值百分比（相对于满分）
  const diffPercentage = stat.maxPossible > 0 
    ? Math.abs(highScore - lowScore) / stat.maxPossible * 100 
    : 0;

  // 倾向强度分级
  let strength: 'balanced' | 'slight' | 'moderate' | 'strong';
  if (diffPercentage < 10) {
    strength = 'balanced';
  } else if (diffPercentage < 30) {
    strength = 'slight';
  } else if (diffPercentage < 50) {
    strength = 'moderate';
  } else {
    strength = 'strong';
  }

  // 描述文字
  const descriptions: Record<Dimension, string> = {
    EI: highScore > lowScore 
      ? '外向型的人喜欢与他人互动，从社交活动中获得能量。'
      : '内向型的人喜欢独处，从内心世界获得能量。',
    SN: highScore > lowScore
      ? '感觉型的人关注具体细节和实际经验，重视事实。'
      : '直觉型的人关注整体模式和未来可能性，富有想象力。',
    TF: highScore > lowScore
      ? '思考型的人基于逻辑和客观分析做决策，重视公平。'
      : '情感型的人基于价值观和人际和谐做决策，富有同理心。',
    JP: highScore > lowScore
      ? '判断型的人喜欢有计划、有条理的生活方式。'
      : '感知型的人喜欢灵活、开放的生活方式。',
  };

  return {
    dimension,
    highLetter,
    lowLetter,
    highScore,
    lowScore,
    percentage,
    diffPercentage,
    strength,
    description: descriptions[dimension],
  };
}

/**
 * 生成4字母人格代码
 */
export function generateTypeCode(scores: Record<Dimension, DimensionScore>): string {
  let code = '';
  code += scores.EI.highScore > scores.EI.lowScore ? 'E' : 'I';
  code += scores.SN.highScore > scores.SN.lowScore ? 'S' : 'N';
  code += scores.TF.highScore > scores.TF.lowScore ? 'T' : 'F';
  code += scores.JP.highScore > scores.JP.lowScore ? 'J' : 'P';
  return code;
}

/**
 * 完整计算MBTI结果
 */
export function calculateLikertMBTI(
  version: Version,
  answers: LikertAnswer[]
): LikertMBTIResult {
  const dimensionScores = calculateDimensionScores(version, answers);
  const type = generateTypeCode(dimensionScores);

  return {
    type,
    dimensionScores,
    answers,
    version,
  };
}

// 倾向强度中文映射
export const strengthLabels: Record<DimensionScore['strength'], string> = {
  balanced: '均衡型',
  slight: '轻度倾向',
  moderate: '中度倾向',
  strong: '强烈倾向',
};

/**
 * 生成MBTI完整报告
 */
export function generateLikertReport(
  result: LikertMBTIResult
): Record<string, unknown> {
  const { dimensionScores, type } = result;
  
  // 获取完整报告数据
  const fullReport = mbtiFullReports[type as keyof typeof mbtiFullReports];
  
  // 构建维度分析
  const dimensionAnalysis: Record<string, unknown> = {};
  (Object.keys(dimensionScores) as Dimension[]).forEach((dim) => {
    const score = dimensionScores[dim];
    dimensionAnalysis[dim] = {
      letter: score.highScore > score.lowScore ? score.highLetter : score.lowLetter,
      score: score.highScore,
      percentage: score.percentage,
      strength: strengthLabels[score.strength],
      description: score.description,
    };
  });
  
  // 如果有完整报告数据，使用它
  if (fullReport) {
    return {
      type,
      basicInfo: {
        type: fullReport.type,
        name: fullReport.name,
        nameEn: fullReport.nameEn,
        slogan: fullReport.slogan,
        tagline: fullReport.tagline,
        description: fullReport.description,
        category: fullReport.category,
      },
      dimensionAnalysis,
      detailedDescription: fullReport.detailedDescription,
      traits: fullReport.traits,
      traitsDetailed: fullReport.traitsDetailed,
      cognitiveFunctions: fullReport.cognitiveFunctions,
      strengths: fullReport.strengths,
      strengthsDetailed: fullReport.strengthsDetailed,
      weaknesses: fullReport.weaknesses,
      weaknessesDetailed: fullReport.weaknessesDetailed,
      relationships: fullReport.relationships,
      career: fullReport.career,
      growth: fullReport.growth,
      stress: fullReport.stress,
      famousPeople: fullReport.famousPeople,
    };
  }
  
  // 备用基础信息
  const typeNames: Record<string, { name: string; nameEn: string; slogan: string; tagline: string; category: string }> = {
    'INTJ': { name: '建筑师', nameEn: 'Architect', slogan: '富有想象力的战略家', tagline: '独立思考，追求卓越', category: 'analysts' },
    'INTP': { name: '逻辑学家', nameEn: 'Logician', slogan: '创新的发明家', tagline: '探索真理，追求知识', category: 'analysts' },
    'ENTJ': { name: '指挥官', nameEn: 'Commander', slogan: '大胆的领导者', tagline: '天生领袖，果断决策', category: 'analysts' },
    'ENTP': { name: '辩论家', nameEn: 'Debater', slogan: '聪明好奇的思想者', tagline: '机智灵活，善于辩论', category: 'analysts' },
    'INFJ': { name: '提倡者', nameEn: 'Advocate', slogan: '安静的理想主义者', tagline: '洞察人性，追求意义', category: 'diplomats' },
    'INFP': { name: '调停者', nameEn: 'Mediator', slogan: '诗意的利他者', tagline: '心怀善意，追求和谐', category: 'diplomats' },
    'ENFJ': { name: '主人公', nameEn: 'Protagonist', slogan: '富有魅力的领导者', tagline: '激励他人，引领成长', category: 'diplomats' },
    'ENFP': { name: '竞选者', nameEn: 'Campaigner', slogan: '热情洋溢的创意者', tagline: '充满热情，追求可能', category: 'diplomats' },
    'ISTJ': { name: '物流师', nameEn: 'Logistician', slogan: '务实可靠的组织者', tagline: '诚实守信，尽职尽责', category: 'sentinels' },
    'ISFJ': { name: '守卫者', nameEn: 'Defender', slogan: '专注温暖的保护者', tagline: '默默奉献，守护他人', category: 'sentinels' },
    'ESTJ': { name: '总经理', nameEn: 'Executive', slogan: '高效的管理者', tagline: '组织有序，执行有力', category: 'sentinels' },
    'ESFJ': { name: '执政官', nameEn: 'Consul', slogan: '热心的合作者', tagline: '关心他人，维护和谐', category: 'sentinels' },
    'ISTP': { name: '鉴赏家', nameEn: 'Virtuoso', slogan: '冷静的实验者', tagline: '灵活应变，追求实效', category: 'explorers' },
    'ISFP': { name: '探险家', nameEn: 'Adventurer', slogan: '灵活的艺术家', tagline: '感受当下，追求美感', category: 'explorers' },
    'ESTP': { name: '企业家', nameEn: 'Entrepreneur', slogan: '活力四射的实干家', tagline: '敢于冒险，享受当下', category: 'explorers' },
    'ESFP': { name: '表演者', nameEn: 'Entertainer', slogan: '自发的表演者', tagline: '热情洋溢，享受生活', category: 'explorers' },
  };
  
  const typeInfo = typeNames[type] || { 
    name: type, 
    nameEn: type, 
    slogan: '独特的人格类型', 
    tagline: '发现自己的独特之处',
    category: 'unknown'
  };
  
  return { 
    type, 
    basicInfo: {
      type,
      name: typeInfo.name,
      nameEn: typeInfo.nameEn,
      slogan: typeInfo.slogan,
      tagline: typeInfo.tagline,
      description: `${typeInfo.name}（${type}）是${typeInfo.slogan}。`,
      category: typeInfo.category,
    },
    dimensionAnalysis,
    detailedDescription: '',
    traits: [],
    traitsDetailed: [],
    cognitiveFunctions: [],
    strengths: [],
    strengthsDetailed: '',
    weaknesses: [],
    weaknessesDetailed: '',
    relationships: { romance: {}, friendship: {}, parenting: {} },
    career: {},
    growth: {},
    stress: {},
    famousPeople: [],
  };
}
