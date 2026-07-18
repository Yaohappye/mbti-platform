// MBTI 计算器和报告生成器 - 完整版

import { mbtiTypes } from '@/data/mbti-questions';
import { 
  mbtiFullReports, 
  MBTIFullReport,
  StrengthItem,
  WeaknessItem,
  RelationshipSection,
  CareerSection,
  GrowthSection,
  StressSection,
  CognitiveFunction
} from '@/data/mbti-full-reports';

// MBTI 计算结果
export interface MBTICalculation {
  type: string;
  eiScore: number;
  snScore: number;
  tfScore: number;
  jpScore: number;
}

// 维度分析项
export interface DimensionAnalysis {
  letter: string;
  score: number;
  percentage: number;
  description: string;
}

// 报告内容结构 - 与 MBTIFullReport 匹配
export interface ReportContent {
  basicInfo: {
    type: string;
    name: string;
    nameEn: string;
    slogan: string;
    tagline?: string;
    description: string;
    descriptionDetailed?: string;
    image?: string;
    category: string;
  };
  dimensionAnalysis: {
    EI: DimensionAnalysis;
    SN: DimensionAnalysis;
    TF: DimensionAnalysis;
    JP: DimensionAnalysis;
  };
  cognitiveFunctions?: CognitiveFunction[];
  traits: { trait: string; explanation: string }[];
  strengths: StrengthItem[];
  strengthsDetailed?: string;
  weaknesses: WeaknessItem[];
  weaknessesDetailed?: string;
  relationships: {
    romance: RelationshipSection;
    friendship: RelationshipSection;
    parenting: RelationshipSection;
    workplace?: RelationshipSection;
  };
  career: CareerSection;
  growth: GrowthSection;
  stress?: StressSection;
  famousPeople?: { name: string; title: string }[];
  genderSpecific?: {
    socialPerception: {
      title: string;
      content: string;
    };
    relationships: {
      title: string;
      strengths: string;
      challenges: string;
      advice: string;
    };
    emotionalGrowth: {
      title: string;
      sources: string;
      strategies: string[];
    };
  };
}

// 维度描述
const dimensionDescriptions: Record<string, { E: string; I: string; S: string; N: string; T: string; F: string; J: string; P: string }> = {
  EI: {
    E: '外向型的人喜欢与他人互动，从社交活动中获得能量。他们倾向于通过讨论和合作来处理信息。',
    I: '内向型的人喜欢独处和内省，从安静的思考中获得能量。他们倾向于在行动前先深思熟虑。',
    S: '', N: '', T: '', F: '', J: '', P: ''
  },
  SN: {
    S: '感觉型的人关注具体细节和实际经验。他们重视事实和现实，喜欢处理具体的问题。',
    N: '直觉型的人关注整体模式和未来可能性。他们喜欢抽象概念和理论，善于发现隐藏的意义。',
    E: '', I: '', T: '', F: '', J: '', P: ''
  },
  TF: {
    T: '思考型的人基于逻辑和客观分析做决策。他们重视公平和一致性，倾向于理性解决问题。',
    F: '情感型的人基于价值观和对他人影响做决策。他们重视和谐和同理心，考虑决策的情感后果。',
    E: '', I: '', S: '', N: '', J: '', P: ''
  },
  JP: {
    J: '判断型的人喜欢结构和计划。他们喜欢明确的截止日期和组织有序的环境，倾向于快速做决定。',
    P: '知觉型的人喜欢灵活性和自发性。他们喜欢保持开放的选择，适应变化，倾向于延迟决策。',
    E: '', I: '', S: '', N: '', T: '', F: ''
  }
};

/**
 * 生成 MBTI 完整报告
 */
/**
 * 生成简化备用报告（当找不到完整报告时使用）
 */
function generateFallbackReport(mbtiType: string, calculation: MBTICalculation): ReportContent {
  console.log('[MBTI Report] 生成简化备用报告:', mbtiType);
  
  const eiPercentage = Math.round((calculation.eiScore / 60) * 100);
  const snPercentage = Math.round((calculation.snScore / 60) * 100);
  const tfPercentage = Math.round((calculation.tfScore / 60) * 100);
  const jpPercentage = Math.round((calculation.jpScore / 60) * 100);
  
  const eiLetter = calculation.eiScore >= 30 ? 'E' : 'I';
  const snLetter = calculation.snScore >= 30 ? 'S' : 'N';
  const tfLetter = calculation.tfScore >= 30 ? 'T' : 'F';
  const jpLetter = calculation.jpScore >= 30 ? 'J' : 'P';
  
  return {
    basicInfo: {
      type: mbtiType,
      name: mbtiType,
      nameEn: mbtiType,
      slogan: `${mbtiType} 人格类型`,
      tagline: '独特的人格类型',
      description: `${mbtiType} 是一种独特的人格类型。我们正在完善该类型的详细报告。`,
      category: 'unknown'
    },
    dimensionAnalysis: {
      EI: { letter: eiLetter, score: calculation.eiScore, percentage: eiPercentage, description: dimensionDescriptions.EI[eiLetter as 'E' | 'I'] },
      SN: { letter: snLetter, score: calculation.snScore, percentage: snPercentage, description: dimensionDescriptions.SN[snLetter as 'S' | 'N'] },
      TF: { letter: tfLetter, score: calculation.tfScore, percentage: tfPercentage, description: dimensionDescriptions.TF[tfLetter as 'T' | 'F'] },
      JP: { letter: jpLetter, score: calculation.jpScore, percentage: jpPercentage, description: dimensionDescriptions.JP[jpLetter as 'J' | 'P'] }
    },
    cognitiveFunctions: [],
    traits: [],
    strengths: [],
    weaknesses: [],
    relationships: { romance: { title: '恋爱关系', desc: '正在完善中...' }, friendship: { title: '友谊关系', desc: '正在完善中...' }, parenting: { title: '亲子关系', desc: '正在完善中...' } },
    career: { title: '职业发展', desc: '正在完善中...', suitable: [], unsuitable: [], workStyle: '正在完善中...' },
    growth: { opportunities: [], opportunitiesDetailed: [], actions: [], detailedAdvice: '正在完善中...' },
    stress: { triggers: [], triggersDetailed: [], signs: [], signsDetailed: [], coping: [], copingDetailed: [] },
    famousPeople: []
  };
}

export async function generateMBTIReport(mbtiType: string, calculation: MBTICalculation, gender: string = 'unspecified'): Promise<ReportContent> {
  const typeKey = mbtiType.toUpperCase().trim();
  
  // 调试日志：记录接收到的类型和可用类型
  console.log('[MBTI Report] 请求类型:', mbtiType, '-> 处理后:', typeKey);
  console.log('[MBTI Report] 可用类型:', Object.keys(mbtiFullReports).join(', '));
  
  const fullReport = mbtiFullReports[typeKey];
  
  if (!fullReport) {
    console.error(`[MBTI Report] 未找到类型: ${typeKey}, 原始输入: ${mbtiType}`);
    console.error(`[MBTI Report] mbtiFullReports 键:`, Object.keys(mbtiFullReports));
    
    // 返回简化报告作为备用方案
    return generateFallbackReport(mbtiType, calculation);
  }

  // 计算各维度百分比（基于60分制，转换为100分制）
  const eiPercentage = Math.round((calculation.eiScore / 60) * 100);
  const snPercentage = Math.round((calculation.snScore / 60) * 100);
  const tfPercentage = Math.round((calculation.tfScore / 60) * 100);
  const jpPercentage = Math.round((calculation.jpScore / 60) * 100);

  // 确定各维度倾向字母
  const eiLetter = calculation.eiScore >= 30 ? 'E' : 'I';
  const snLetter = calculation.snScore >= 30 ? 'S' : 'N';
  const tfLetter = calculation.tfScore >= 30 ? 'T' : 'F';
  const jpLetter = calculation.jpScore >= 30 ? 'J' : 'P';

  // 构建性别特定内容（仅当填写了性别时）
  const genderSpecific = gender === 'male' || gender === 'female' 
    ? generateGenderSpecificContent(fullReport, mbtiType, gender)
    : null;

  // 构建完整报告
  const report: ReportContent = {
    basicInfo: {
      type: mbtiType,
      name: fullReport.name,
      nameEn: fullReport.nameEn,
      slogan: fullReport.slogan,
      tagline: fullReport.tagline,
      description: fullReport.description,
      image: fullReport.image,
      category: fullReport.category
    },
    dimensionAnalysis: {
      EI: {
        letter: eiLetter,
        score: calculation.eiScore,
        percentage: eiPercentage,
        description: dimensionDescriptions.EI[eiLetter as 'E' | 'I']
      },
      SN: {
        letter: snLetter,
        score: calculation.snScore,
        percentage: snPercentage,
        description: dimensionDescriptions.SN[snLetter as 'S' | 'N']
      },
      TF: {
        letter: tfLetter,
        score: calculation.tfScore,
        percentage: tfPercentage,
        description: dimensionDescriptions.TF[tfLetter as 'T' | 'F']
      },
      JP: {
        letter: jpLetter,
        score: calculation.jpScore,
        percentage: jpPercentage,
        description: dimensionDescriptions.JP[jpLetter as 'J' | 'P']
      }
    },
    cognitiveFunctions: fullReport.cognitiveFunctions,
    traits: fullReport.traits,
    strengths: fullReport.strengths,
    weaknesses: fullReport.weaknesses,
    relationships: fullReport.relationships,
    career: fullReport.career,
    growth: fullReport.growth,
    stress: fullReport.stress,
    famousPeople: fullReport.famousPeople,
    genderSpecific: genderSpecific || undefined
  };

  return report;
}

/**
 * 生成性别特定内容
 */
function generateGenderSpecificContent(fullReport: any, mbtiType: string, gender: 'male' | 'female'): {
  socialPerception: {
    title: string;
    content: string;
  };
  relationships: {
    title: string;
    strengths: string;
    challenges: string;
    advice: string;
  };
  emotionalGrowth: {
    title: string;
    sources: string;
    strategies: string[];
  };
} {
  const genderLabel = gender === 'male' ? '男性' : '女性';
  const oppositeGender = gender === 'male' ? '女性' : '男性';
  
  return {
    // 社会刻板印象差异
    socialPerception: {
      title: `${genderLabel}${fullReport.name}的社会印象`,
      content: `作为${genderLabel}${fullReport.name}，你可能会发现外界对你的评价与${oppositeGender}${fullReport.name}有所不同。${fullReport.name}通常被认为${fullReport.traits?.[0]?.explanation || '具有独特特质'}，而社会往往对${genderLabel}这一类型有着特定的期待和评价标准。理解这些差异有助于你更好地认识自己，不被外界偏见所困扰。`
    },
    
    // 亲密关系
    relationships: {
      title: '亲密关系中的你',
      strengths: `${genderLabel}${fullReport.name}在恋爱中通常展现出${fullReport.traits?.[1]?.explanation || '独特的魅力'}。你擅长${fullReport.strengths?.[0]?.title || '建立深层次的连接'}，这让你在感情中能够提供独特的价值。`,
      challenges: `然而，作为${genderLabel}${fullReport.name}，你也可能面临特定的挑战。你可能会遇到${gender === 'male' ? '情感表达不够直接' : '过于理性分析情感'}的情况，这需要你有意识地平衡和发展。`,
      advice: `建议你在亲密关系中：多关注${oppositeGender}伴侣的情感需求，学会用对方能接受的方式表达爱意，同时保持自己的真实特质。`
    },
    
    // 情绪与自我提升
    emotionalGrowth: {
      title: '情绪内耗与自我提升',
      sources: `${genderLabel}${fullReport.name}常见的情绪内耗来源包括：对自我价值的质疑、与${oppositeGender}社交时的不安全感、以及在传统${genderLabel}角色期待与真实自我之间的冲突。`,
      strategies: [
        `接纳自己的${fullReport.name}特质，不因性别刻板印象而否定自己`,
        `建立支持性的${oppositeGender}友谊圈，理解不同视角`,
        `在职业发展上发挥${fullReport.strengths?.[0]?.title || '个人优势'}，创造适合自己的成功路径`,
        `定期进行自我反思，识别并处理情绪内耗的触发点`
      ]
    }
  };
}

/**
 * 生成报告文本（用于下载）
 */
export function generateReportText(report: ReportContent): string {
  const lines: string[] = [];
  
  lines.push(`================================`);
  lines.push(`    MBTI 人格类型完整报告`);
  lines.push(`================================`);
  lines.push('');
  
  // 基本信息
  lines.push(`【人格类型】 ${report.basicInfo.type} - ${report.basicInfo.name}`);
  lines.push(`【英文名称】 ${report.basicInfo.nameEn}`);
  lines.push(`【所属类别】 ${report.basicInfo.category}`);
  lines.push(`【核心标语】 ${report.basicInfo.tagline}`);
  lines.push('');
  lines.push(`【类型描述】`);
  lines.push(report.basicInfo.description);
  lines.push('');
  
  // 维度分析
  lines.push('================================');
  lines.push('        维度分析');
  lines.push('================================');
  lines.push('');
  
  const dims = ['EI', 'SN', 'TF', 'JP'] as const;
  const dimNames = { EI: '能量倾向', SN: '认知方式', TF: '决策方式', JP: '生活态度' };
  
  dims.forEach(dim => {
    const analysis = report.dimensionAnalysis[dim];
    lines.push(`${dimNames[dim]} (${dim}): ${analysis.letter} (${analysis.percentage}%)`);
    lines.push(analysis.description);
    lines.push('');
  });
  
  // 认知功能
  lines.push('================================');
  lines.push('      荣格八维认知功能');
  lines.push('================================');
  lines.push('');
  
  report.cognitiveFunctions?.forEach((func, index) => {
    const levelNames = ['主导', '辅助', '第三', '劣势'];
    lines.push(`${index + 1}. ${func.name} (${func.symbol}) - ${func.level}`);
    lines.push(`   ${func.description}`);
    lines.push('');
  });
  
  // 性格特质
  lines.push('================================');
  lines.push('        性格特质');
  lines.push('================================');
  lines.push('');
  lines.push(report.traits.join('、'));
  lines.push('');
  
  // 核心优势
  lines.push('================================');
  lines.push('        核心优势');
  lines.push('================================');
  lines.push('');
  
  report.strengths.forEach(s => {
    lines.push(`• ${s.title}: ${s.desc}`);
  });
  lines.push('');
  
  // 发展盲点
  lines.push('================================');
  lines.push('        发展盲点');
  lines.push('================================');
  lines.push('');
  
  report.weaknesses.forEach(w => {
    lines.push(`• ${w.title}: ${w.desc}`);
  });
  lines.push('');
  
  // 人际关系
  lines.push('================================');
  lines.push('        人际关系分析');
  lines.push('================================');
  lines.push('');
  
  lines.push(`【恋爱关系】 ${report.relationships.romance.title}`);
  lines.push(report.relationships.romance.desc);
  lines.push('');
  lines.push(`【友谊关系】 ${report.relationships.friendship.title}`);
  lines.push(report.relationships.friendship.desc);
  lines.push('');
  lines.push(`【亲子关系】 ${report.relationships.parenting.title}`);
  lines.push(report.relationships.parenting.desc);
  lines.push('');
  
  // 职业指导
  lines.push('================================');
  lines.push('        职业指导');
  lines.push('================================');
  lines.push('');
  
  lines.push('【适合职业】');
  lines.push(report.career.suitable.join('、'));
  lines.push('');
  lines.push('【需谨慎考虑】');
  lines.push(report.career.unsuitable.join('、'));
  lines.push('');
  lines.push('【工作风格】');
  lines.push(report.career.workStyle);
  lines.push('');
  
  // 个人成长
  lines.push('================================');
  lines.push('        个人成长建议');
  lines.push('================================');
  lines.push('');
  
  lines.push('【发展机会】');
  report.growth.opportunities.forEach(o => lines.push(`• ${o}`));
  lines.push('');
  lines.push('【行动步骤】');
  report.growth.actions.forEach(a => lines.push(`• ${a}`));
  lines.push('');
  
  // 压力应对
  lines.push('================================');
  lines.push('        压力应对指南');
  lines.push('================================');
  lines.push('');
  
  if (report.stress) {
    lines.push('【压力触发因素】');
    report.stress.triggers?.forEach(t => lines.push(`• ${t}`));
    lines.push('');
    lines.push('【压力信号】');
    report.stress.signs?.forEach(s => lines.push(`• ${s}`));
    lines.push('');
    lines.push('【应对策略】');
    report.stress.coping?.forEach(c => lines.push(`• ${c}`));
    lines.push('');
  }
  
  // 著名人物
  lines.push('================================');
  lines.push('        同类型著名人物');
  lines.push('================================');
  lines.push('');
  
  report.famousPeople?.forEach(p => {
    lines.push(`• ${p.name} - ${p.title}`);
  });
  lines.push('');
  
  // 结语
  lines.push('================================');
  lines.push('');
  lines.push('注：本报告仅供参考，人格类型只是理解自我的一种工具，');
  lines.push('每个人都是独特的个体，不应被简单分类所限制。');
  lines.push('');
  lines.push('================================');
  
  return lines.join('\n');
}
