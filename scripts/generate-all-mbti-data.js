// 为所有MBTI类型生成完整详细数据的脚本
// 基于INTJ模板，为每种类型定制内容

const fs = require('fs');

// 基础模板结构
const createFullData = (type, config) => ({
  detailedDescription: config.detailedDescription,
  
  traitsDetailed: config.traitsDetailed || [
    {
      title: config.traits[0].title,
      description: config.traits[0].desc,
      manifestations: config.traits[0].manifestations,
      advice: config.traits[0].advice
    },
    {
      title: config.traits[1].title,
      description: config.traits[1].desc,
      manifestations: config.traits[1].manifestations,
      advice: config.traits[1].advice
    },
    {
      title: config.traits[2].title,
      description: config.traits[2].desc,
      manifestations: config.traits[2].manifestations,
      advice: config.traits[2].advice
    }
  ],
  
  cognitiveFunctions: config.cognitiveFunctions,
  
  strengths: {
    summary: config.strengths.summary,
    detailsList: config.strengths.detailsList
  },
  strengthsDetailed: config.strengthsDetailed,
  
  weaknesses: {
    summary: config.weaknesses.summary,
    detailsList: config.weaknesses.detailsList
  },
  weaknessesDetailed: config.weaknessesDetailed,
  
  relationships: config.relationships,
  career: config.career,
  growth: config.growth,
  stress: config.stress,
  famousPeople: config.famousPeople
});

// 各类型配置
const typeConfigs = {
  ENTP: {
    detailedDescription: "ENTP（辩论家）是充满创意和好奇心的思考者，他们热爱智力挑战和新奇想法。ENTP以敏捷的思维和出色的辩论能力著称，善于从不同角度看待问题，提出创新解决方案。他们天生是头脑风暴的专家，能够将看似不相关的概念联系起来，创造出独特的见解。ENTP享受智力的交锋，对于探索可能性和挑战现状充满热情。",
    traits: [
      { title: "创新思维", desc: "ENTP能够快速产生大量创意想法，善于发现新的可能性和机会。", manifestations: ["喜欢头脑风暴", "擅长联想思维", "享受探索新想法"], advice: "在产生想法的同时，也要学会筛选和执行最重要的创意。" },
      { title: "辩论天赋", desc: "ENTP热爱智力辩论，善于从多个角度分析问题。", manifestations: ["喜欢挑战性讨论", "能快速看到不同观点", "善于找出逻辑漏洞"], advice: "注意不要为了辩论而辩论，学会在适当的时候达成共识。" },
      { title: "适应性强", desc: "ENTP能够灵活应对变化，善于即兴发挥。", manifestations: ["享受不确定性", "快速适应新环境", "善于即兴解决问题"], advice: "在追求灵活性的同时，也要培养完成任务的毅力。" }
    ],
    cognitiveFunctions: {
      dominant: { name: "外向直觉(Ne)", description: "ENTP的主导功能是外向直觉，使他们善于探索可能性和发现模式。他们能够看到事物之间的联系，预测未来趋势。" },
      auxiliary: { name: "内向思考(Ti)", description: "辅助功能内向思考帮助ENTP分析和理解复杂的系统。他们追求逻辑的精确性。" },
      tertiary: { name: "外向情感(Fe)", description: "第三功能外向情感使ENTP能够理解和影响他人的情绪。" },
      inferior: { name: "内向感觉(Si)", description: "劣势功能内向感觉可能导致ENTP忽视细节和传统。" }
    },
    strengths: {
      summary: "ENTP的优势在于创新思维、快速学习和出色的沟通能力。",
      detailsList: [
        { title: "创新解决问题", description: "ENTP善于用非传统方式解决问题，能提出独特的解决方案。", examples: ["在产品设计中找到突破性的创新点", "用创意营销方案打动客户"] },
        { title: "快速学习能力", description: "ENTP能够快速掌握新概念和技能，适应变化的环境。", examples: ["迅速掌握新技术", "快速适应新行业"] },
        { title: "优秀的沟通者", description: "ENTP擅长用生动的语言表达复杂想法，吸引听众。", examples: ["在演讲中清晰表达复杂概念", "用故事讲述打动人心"] },
        { title: "战略眼光", description: "ENTP能够看到大局，预测趋势，制定长远计划。", examples: ["识别市场机会", "预见行业变化"] }
      ]
    },
    strengthsDetailed: "ENTP是天生的创新者和思想家。他们的思维敏捷，能够从多个角度看待问题，这使他们成为优秀的策略家和问题解决者。ENTP擅长挑战传统观念，推动变革。",
    weaknesses: {
      summary: "ENTP可能过于追求新奇而缺乏执行力，容易在辩论中过于激进。",
      detailsList: [
        { weakness: "难以坚持完成", impact: "可能因为追求新想法而放弃当前项目", solutions: ["设定明确的里程碑", "寻找合作伙伴完成执行"] },
        { weakness: "过于好辩", impact: "可能为了辩论而伤害关系", solutions: ["学会适时让步", "关注关系而非胜利"] },
        { weakness: "忽视细节", impact: "可能错过重要的实施细节", solutions: ["与注重细节的伙伴合作", "使用检查清单"] },
        { weakness: "不耐烦", impact: "对重复性任务和慢节奏感到沮丧", solutions: ["将重复任务系统化", "练习耐心"] }
      ]
    },
    weaknessesDetailed: "ENTP需要注意完成他们开始的项目，避免过度追求新奇而忽视执行。",
    relationships: {
      romantic: { summary: "ENTP在恋爱关系中寻求智力刺激和共同成长。", description: "ENTP在恋爱中是充满激情和创意的伴侣。他们喜欢与伴侣进行深入的智力交流，探索新的想法和可能性。", compatibleTypes: ["INTJ", "INFJ", "ENFP"], advice: "学会在关系中保持稳定性和承诺。" },
      friendship: { summary: "ENTP是令人兴奋和有趣的朋友，他们为社交圈带来新鲜的观点。", description: "ENTP喜欢与各种类型的人交朋友，他们享受与不同背景和思想的人交流。ENTP的朋友圈通常非常多元化。" },
      parenthood: { summary: "ENTP父母鼓励孩子独立思考，培养他们的好奇心和创造力。", description: "ENTP父母是孩子最好的智力导师。他们鼓励孩子提问、探索和独立思考。ENTP父母会带孩子探索世界，介绍新的想法和可能性。" }
    },
    career: {
      summary: "ENTP在需要创新思维、战略规划和智力挑战的领域中表现出色。",
      suitableIndustries: ["科技创业", "管理咨询", "法律", "市场营销", "媒体"],
      suitableRoles: ["创业者", "策略顾问", "产品经理", "律师", "创意总监"],
      workStyle: "ENTP在灵活、动态的环境中表现最佳。他们喜欢有自主权，能够探索新想法。",
      challenges: ["重复性任务", "严格的等级制度", "缺乏创新空间"],
      developmentAdvice: "ENTP应该寻找能够发挥他们创新才能的角色，同时培养执行和完成项目的能力。"
    },
    growth: {
      summary: "ENTP的成长在于培养执行力、情感敏感性和耐心。",
      description: "ENTP需要学会将创新的想法转化为实际的成果。培养完成项目的能力，学会在追求新奇和保持稳定之间找到平衡。",
      actions: ["设定具体目标并坚持完成", "练习同理心和情感表达", "发展执行和计划能力"],
      longTermGoals: ["成为将想法转化为现实的实现者", "建立深厚的人际关系", "发展情感智力"]
    },
    stress: {
      triggers: ["缺乏智力刺激", "过多的日常事务", "被限制自由", "无法表达想法"],
      signs: ["变得易怒", "寻求刺激", "逃避责任", "过度争论"],
      coping: ["寻找新的智力挑战", "改变环境", "与朋友进行激烈讨论", "运动释放能量"]
    },
    famousPeople: [
      { name: "托马斯·爱迪生", title: "发明家", contribution: "改变了世界的多项发明", traits: ["创新思维", "坚持不懈"] },
      { name: "马克·吐温", title: "作家", contribution: "美国文学巨匠", traits: ["机智幽默", "批判思维"] },
      { name: "莱昂纳多·达芬奇", title: "艺术家/科学家", contribution: "文艺复兴时期的全才", traits: ["多才多艺", "好奇心"] },
      { name: "巴拉克·奥巴马", title: "政治家", contribution: "美国前总统", traits: ["演讲才能", "战略思维"] }
    ]
  }
  // 其他类型配置可以继续添加...
};

console.log("数据生成脚本已准备就绪");
console.log("ENTP 配置完成，包含所有详细字段");
console.log("其他类型需要继续配置...");
