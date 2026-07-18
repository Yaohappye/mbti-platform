// MBTI 完整详细报告数据 - 补充所有类型的详细字段
// 为INFJ, INFP, ENFJ, ENFP, ISTJ, ISFJ, ESTJ, ESFJ, ISTP, ISFP, ESTP, ESFP补充完整数据

export const INFJ_FULL = {
  detailedDescription: `INFJ（提倡者）是MBTI中最稀有的人格类型之一，仅占人口的1-2%。他们是理想主义者，拥有深刻的洞察力和强烈的同理心。

INFJ拥有独特的洞察力和直觉能力，能够理解他人表面之下的真实需求和情感。他们追求有意义的生活，致力于帮助他人实现自己的潜力。

作为内向的直觉型，INFJ更喜欢深入思考而非表面社交。他们有着丰富的内心世界，常常在思考人生的大问题和可能性。虽然内向，但他们也渴望与他人建立深层次的联系。`,
  
  traitsDetailed: [
    {
      trait: "深刻的洞察力",
      description: "能够看穿表面，理解人们行为背后的动机和情感",
      manifestation: "在人际关系中，INFJ常常能准确感知他人的真实感受，即使对方没有明确表达"
    },
    {
      trait: "强烈的同理心",
      description: "深刻理解并感受他人的情感状态",
      manifestation: "INFJ能够设身处地为他人着想，这使他们在帮助他人时特别有效"
    },
    {
      trait: "追求意义",
      description: "渴望做有意义的事情，追求个人成长和帮助他人",
      manifestation: "INFJ会选择能够产生积极影响的工作，即使这意味着牺牲个人利益"
    }
  ],
  
  cognitiveFunctions: {
    dominant: { name: "内向直觉(Ni)", description: "洞察模式和意义，预见未来可能性" },
    auxiliary: { name: "外向情感(Fe)", description: "关注他人需求，维护和谐关系" },
    tertiary: { name: "内向思考(Ti)", description: "分析内部逻辑，追求精确理解" },
    inferior: { name: "外向感觉(Se)", description: "关注当下体验，感知具体细节" }
  },
  
  strengthsDetailed: {
    summary: "INFJ的优势在于他们深刻的洞察力、强烈的同理心和对意义的追求。",
    details: [
      {
        title: "深刻的洞察力",
        description: "能够看到事物背后的深层含义和模式",
        examples: ["理解复杂人际关系的动态", "预见他人行为的潜在后果"]
      },
      {
        title: "强烈的同理心",
        description: "能够深刻感受他人的情感和需求",
        examples: ["提供情感支持", "调解冲突"]
      },
      {
        title: "创造力",
        description: "独特的视角和创新思维",
        examples: ["艺术创作", "解决复杂问题"]
      },
      {
        title: "坚定的价值观",
        description: "坚持原则，追求正义",
        examples: ["倡导社会变革", "帮助他人实现潜力"]
      }
    ]
  },
  
  weaknessesDetailed: {
    summary: "INFJ的弱点主要源于他们的敏感性和理想主义。",
    items: [
      {
        weakness: "过度敏感",
        impact: "容易受到伤害，可能回避冲突",
        solutions: ["学习设定情感界限", "练习自我关怀"]
      },
      {
        weakness: "完美主义",
        impact: "对自己和他人期望过高",
        solutions: ["接受不完美", "设定现实目标"]
      },
      {
        weakness: "难以表达",
        impact: "内心的复杂想法难以传达",
        solutions: ["练习表达技巧", "寻找信任的倾诉对象"]
      }
    ]
  },
  
  relationships: {
    romance: {
      summary: "INFJ在恋爱中寻求深层次的灵魂连接。",
      characteristics: ["寻求灵魂伴侣", "重视深度交流", "忠诚而投入"],
      challenges: "可能因为理想化伴侣而失望",
      advice: "接受伴侣的不完美，享受当下的关系"
    },
    friendship: {
      summary: "INFJ重视质量而非数量的友谊。",
      approach: "寻求深层次的理解和共鸣",
      challenges: "可能感到孤独，因为很少人理解他们",
      advice: "珍惜少数真正的友谊，不必追求广泛的社交"
    },
    parenting: {
      summary: "INFJ父母培养孩子的同理心和独立性。",
      approach: "温暖而有原则的教育方式",
      strengths: "理解孩子的情感需求，提供情感支持",
      challenges: "可能过度保护或期望过高"
    }
  },
  
  career: {
    workStyleDetailed: "INFJ喜欢有意义的工作，能够帮助他人成长。他们需要独立工作的空间，但也希望感到自己是团队的一部分。",
    suitableDetails: ["心理咨询师：帮助他人解决情感问题", "作家：表达深刻思想", "教师：启发学生成长", "人力资源：理解员工需求"],
    idealEnvironment: "安静、支持性的环境，允许独立工作和创造性思考",
    challenges: "可能在不重视个人价值的工作环境中感到沮丧",
    advice: "寻找能够体现个人价值观的工作"
  },
  
  growth: {
    detailedAdvice: `INFJ的个人成长需要平衡理想与现实，学会自我关怀。

1. **设定界限**：学会说"不"，保护自己的能量
2. **自我关怀**：照顾好自己的需求，不要过度付出
3. **接受不完美**：现实不会总是符合理想，学会适应
4. **表达需求**：向他人表达自己的感受和需求
5. **实际行动**：将理想转化为具体可行的步骤`,
    developmentAreas: ["情感界限", "现实主义", "自我表达"]
  },
  
  stress: {
    triggersDetailed: ["人际冲突", "被忽视", "价值观冲突", "过度刺激"],
    signsDetailed: ["退缩", "情绪爆发", "完美主义加剧", "身体不适"],
    management: "INFJ需要独处时间来恢复能量，通过创造性活动或自然来放松。"
  },
  
  famousPeopleDetailed: [
    { name: "马丁·路德·金", title: "民权领袖", contribution: "为平等和正义而奋斗", traits: ["理想主义", "领导力"] },
    { name: "特蕾莎修女", title: "慈善家", contribution: "帮助印度穷人", traits: ["同理心", "奉献"] },
    { name: "纳尔逊·曼德拉", title: "政治家", contribution: "结束南非种族隔离", traits: ["坚韧", "宽恕"] },
    { name: "柏拉图", title: "哲学家", contribution: "西方哲学奠基人", traits: ["深度思考", "理想主义"] }
  ]
};

// 更多类型的完整数据将在后续补充...
export const INFP_FULL = {
  // ... 类似结构
};

export const ENFJ_FULL = {
  // ... 类似结构
};

export const ENFP_FULL = {
  // ... 类似结构
};

// 守护者类型
export const ISTJ_FULL = {
  // ... 类似结构
};

export const ISFJ_FULL = {
  // ... 类似结构
};

export const ESTJ_FULL = {
  // ... 类似结构
};

export const ESFJ_FULL = {
  // ... 类似结构
};

// 探险家类型
export const ISTP_FULL = {
  // ... 类似结构
};

export const ISFP_FULL = {
  // ... 类似结构
};

export const ESTP_FULL = {
  // ... 类似结构
};

export const ESFP_FULL = {
  // ... 类似结构
};
