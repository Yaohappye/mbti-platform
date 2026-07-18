/**
 * MBTI 测试题目数据结构 - 李克特五选一量表
 * 
 * 计分规则：
 * - 正向题：选1得1分，选2得2分，选3得3分，选4得4分，选5得5分
 * - 反向题：选1得5分，选2得4分，选3得3分，选4得2分，选5得1分
 * 
 * 答案选项值映射（1-5分）：
 * - "1" = 完全不符合
 * - "2" = 不太符合
 * - "3" = 中立/一般
 * - "4" = 比较符合
 * - "5" = 完全符合
 */

export interface Answer {
  key: string;      // 显示文本
  value: string;    // 分值 "1"|"2"|"3"|"4"|"5"
}

export interface Question {
  id: number;
  content: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  reverseScore?: boolean;
  answers: Answer[];
}

export interface TestVersion {
  type: 'MBTI60' | 'MBTI93' | 'MBTI200';
  name: string;
  desc: string;
  questionCount: number;
  timeEstimate: string;
}

// 60题基础版
export const MBTI60Questions: Question[] = [
  // EI 维度（外向/内向）- 15题
  { id: 1, content: "在社交聚会中，你通常会主动结识新朋友", dimension: 'EI', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 2, content: "你更喜欢在团队合作中工作，而不是独自完成任务", dimension: 'EI', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 3, content: "你倾向于先说后想，而不是先想后说", dimension: 'EI', reverseScore: true, answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 4, content: "独处时你会感到精力充沛，而不是疲惫", dimension: 'EI', reverseScore: true, answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 5, content: "你喜欢成为众人关注的焦点", dimension: 'EI', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 6, content: "你更喜欢与朋友面对面交流，而不是通过文字消息", dimension: 'EI', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 7, content: "你在人群中会感到更加活跃和兴奋", dimension: 'EI', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 8, content: "你更愿意在公共场合表达自己的想法和观点", dimension: 'EI', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 9, content: "与陌生人交谈对你来说是一件轻松愉快的事情", dimension: 'EI', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 10, content: "你在社交活动后需要时间独处来恢复精力", dimension: 'EI', reverseScore: true, answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 11, content: "你经常主动发起与朋友的互动和联系", dimension: 'EI', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 12, content: "你喜欢同时参与多个社交活动或话题讨论", dimension: 'EI', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 13, content: "你更倾向于通过口头表达来理清思路", dimension: 'EI', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 14, content: "你更享受即兴的社交活动，而不是提前计划好的聚会", dimension: 'EI', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 15, content: "你在与他人交流时精力充沛，不知疲倦", dimension: 'EI', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  
  // SN 维度（感觉/直觉）- 15题
  { id: 16, content: "你更关注事实和具体的数据，而不是抽象的理论", dimension: 'SN', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 17, content: "你更倾向于相信实践经验，而不是直觉判断", dimension: 'SN', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 18, content: "你更欣赏具有创新性和可能性的想法，而不是实用的解决方案", dimension: 'SN', reverseScore: true, answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 19, content: "你更注重眼前的实际问题和可实现的目标", dimension: 'SN', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 20, content: "你更喜欢学习具体的、可操作的技能，而不是理论知识", dimension: 'SN', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 21, content: "你倾向于看到事物的现状，而不是它们可能变成的样子", dimension: 'SN', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 22, content: "你更喜欢按部就班地完成任务，而不是探索新的方法", dimension: 'SN', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 23, content: "你更关注细节和具体信息，而不是整体和全貌", dimension: 'SN', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 24, content: "你更倾向于相信已证明有效的方法，而不是尝试新事物", dimension: 'SN', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 25, content: "你更喜欢有明确步骤和流程的工作方式", dimension: 'SN', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 26, content: "你更注重现实可行的解决方案，而不是理想化的愿景", dimension: 'SN', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 27, content: "你更关注事物的实际用途，而不是它们的美学价值", dimension: 'SN', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 28, content: "你更喜欢处理具体的事务，而不是抽象的概念", dimension: 'SN', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 29, content: "你更相信可以通过五官感受的信息，而不是内心的直觉", dimension: 'SN', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 30, content: "你更倾向于描述你实际看到的，而不是猜测的意义", dimension: 'SN', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  
  // TF 维度（思考/情感）- 15题
  { id: 31, content: "在做决策时，你更注重逻辑和客观分析", dimension: 'TF', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 32, content: "你认为公平和一致性的原则比人情世故更重要", dimension: 'TF', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 33, content: "你更容易被情感诉求所说服，而不是理性论证", dimension: 'TF', reverseScore: true, answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 34, content: "你更倾向于根据事实和数据做决定，而不是个人情感", dimension: 'TF', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 35, content: "你认为批评应该直接指出问题，而不是委婉表达", dimension: 'TF', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 36, content: "你更关注决策的合理性，而不是它对他人的影响", dimension: 'TF', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 37, content: "你认为效率和完成任务比维护和谐更重要", dimension: 'TF', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 38, content: "你更愿意坦诚表达自己的观点，即使可能会引起不适", dimension: 'TF', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 39, content: "你做决定时更看重利弊分析，而不是个人价值观", dimension: 'TF', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 40, content: "你认为规则和制度比个人特殊情况更需要遵守", dimension: 'TF', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 41, content: "你更注重是非对错，而不是谁对谁错", dimension: 'TF', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 42, content: "你更容易被逻辑严谨的论点说服，而不是情感打动", dimension: 'TF', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 43, content: "你认为解决问题应该优先于理解他人感受", dimension: 'TF', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 44, content: "你更欣赏技术能力而不是人际沟通能力", dimension: 'TF', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 45, content: "你认为诚实比照顾他人情绪更重要", dimension: 'TF', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  
  // JP 维度（判断/知觉）- 15题
  { id: 46, content: "你喜欢提前计划和组织，而不是随机应变", dimension: 'JP', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 47, content: "你认为应该尽早完成任务，而不是等到最后一刻", dimension: 'JP', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 48, content: "你更倾向于按照计划行事，而不是保持灵活性", dimension: 'JP', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 49, content: "你喜欢把所有事情都安排妥当，不喜欢意外和变化", dimension: 'JP', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 50, content: "你认为做决定是一件需要尽快完成的事情", dimension: 'JP', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 51, content: "你更喜欢有明确截止日期和目标的任务", dimension: 'JP', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 52, content: "你认为生活中的秩序和可预测性很重要", dimension: 'JP', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 53, content: "你更喜欢事先决定穿什么、吃什么，而不是临时决定", dimension: 'JP', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 54, content: "你倾向于把事情写下来记在清单上，而不是记在脑子里", dimension: 'JP', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 55, content: "你认为按时完成承诺比保持开放的选择更重要", dimension: 'JP', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 56, content: "你更倾向于做完一件事再做另一件，而不是同时处理多件", dimension: 'JP', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 57, content: "你认为做事有始有终比适应变化更值得赞赏", dimension: 'JP', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 58, content: "你喜欢让事情尘埃落定，而不是保持开放的可能性", dimension: 'JP', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 59, content: "你认为按计划执行比随机应变更能体现专业性", dimension: 'JP', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]},
  { id: 60, content: "你更倾向于完成既定目标，而不是追求新的可能性", dimension: 'JP', answers: [
    { key: "完全符合", value: "5" }, { key: "比较符合", value: "4" }, { key: "中立/一般", value: "3" }, { key: "不太符合", value: "2" }, { key: "完全不符合", value: "1" }
  ]}
];

// 测试版本配置
export const testVersions: TestVersion[] = [
  { type: 'MBTI60', name: '基础版', desc: '快速了解你的基本人格类型，适合初次体验', questionCount: 60, timeEstimate: '10分钟' },
  { type: 'MBTI93', name: '专业版', desc: '深度分析你的性格特点，提供详细的职业建议', questionCount: 93, timeEstimate: '20分钟' },
  { type: 'MBTI200', name: '完整版', desc: '全面完整的分析，涵盖所有维度和深度解读', questionCount: 200, timeEstimate: '35分钟' }
];

// MBTI 类型定义
export interface MBTIType {
  type: string;
  name: string;
  nameCn: string;
  slogan: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  relationships: string[];
  famousPeople: string[];
  // 维度描述
  eDescription: string;
  iDescription: string;
  sDescription: string;
  nDescription: string;
  tDescription: string;
  fDescription: string;
  jDescription: string;
  pDescription: string;
  // 报告内容
  cognitiveFunctions: string;
  personalityTraits: string[];
  careerAdvice: string;
  stressResponse: string;
  personalGrowth: string;
}

// 93题版本特有的33道新题（与60题完全不重复）
const MBTI93ExtraQuestions: Question[] = [
  // E/I 维度补充（9题）
  { id: 61, content: '在漫长的旅途中，你更喜欢与邻座深入交流而非独自看书', dimension: 'EI', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 62, content: '参加多人聚会后，你需要很长时间才能恢复精力', dimension: 'EI', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 63, content: '你更倾向于通过与人交流来理清思路', dimension: 'EI', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  // S/N 维度补充（8题）
  { id: 64, content: '你更相信眼见为实，而非直觉预感', dimension: 'SN', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 65, content: '你喜欢思考事物背后隐藏的意义和可能性', dimension: 'SN', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 66, content: '你更关注当下的体验，而非未来的规划', dimension: 'SN', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  // T/F 维度补充（8题）
  { id: 67, content: '你认为在做决定时，应该优先考虑逻辑而非情感', dimension: 'TF', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 68, content: '你更容易被他人的情绪所感染', dimension: 'TF', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 69, content: '你认为维护和谐的人际关系比赢得争论更重要', dimension: 'TF', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  // J/P 维度补充（8题）
  { id: 70, content: '你喜欢在最后一刻才做决定，保持选择的开放性', dimension: 'JP', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 71, content: '你会提前规划好假期的每一天行程', dimension: 'JP', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 72, content: '你更喜欢随性而为，而非严格按照计划行事', dimension: 'JP', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 73, content: '你会定期整理房间，保持环境整洁有序', dimension: 'JP', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 74, content: '你享受探索未知的过程，即使没有明确的目标', dimension: 'JP', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 75, content: '你认为规则是用来遵守的，而非打破的', dimension: 'JP', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 76, content: '你倾向于根据当下的感受来决定做什么', dimension: 'JP', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 77, content: '你喜欢同时处理多个任务，而非一件一件完成', dimension: 'JP', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 78, content: '你会为重要的项目设定明确的截止日期', dimension: 'JP', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 79, content: '你更倾向于深入了解一个领域，而非广泛涉猎多个领域', dimension: 'SN', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 80, content: '你更关注事物的整体大局，而非细节末节', dimension: 'SN', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 81, content: '你喜欢与少数几个亲密的朋友相处，而非广泛的社交圈', dimension: 'EI', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 82, content: '你更倾向于基于客观标准而非个人喜好来评价事物', dimension: 'TF', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 83, content: '你喜欢在人群中成为关注的焦点', dimension: 'EI', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 84, content: '你更倾向于通过实践而非理论来学习新事物', dimension: 'SN', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 85, content: '你认为批评应该直接而坦率，而非委婉含蓄', dimension: 'TF', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 86, content: '你更喜欢灵活安排时间，而非严格按照时间表行事', dimension: 'JP', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 87, content: '你倾向于在行动前先观察和学习', dimension: 'EI', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 88, content: '你更关注未来的可能性，而非当下的现实', dimension: 'SN', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 89, content: '你认为在做决定时应该考虑对他人的影响', dimension: 'TF', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 90, content: '你喜欢在旅行中有详细的行程安排', dimension: 'JP', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 91, content: '你更倾向于与志同道合的人交流，而非泛泛之交', dimension: 'EI', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 92, content: '你更倾向于关注具体的事实而非抽象的概念', dimension: 'SN', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 93, content: '你认为在做重要决定时应该保持客观冷静', dimension: 'TF', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
];

// 93题版本
export const MBTI93Questions: Question[] = [
  ...MBTI60Questions,
  ...MBTI93ExtraQuestions
];

// 200题版本特有的107道新题（与60题和93题完全不重复）
const MBTI200ExtraQuestions: Question[] = [
  // E/I 维度（25题）
  { id: 94, content: '你在大型社交活动中感到精力充沛', dimension: 'EI', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 95, content: '你更喜欢独处时思考问题', dimension: 'EI', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 96, content: '你在团队中更倾向于主动发言', dimension: 'EI', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 97, content: '你更喜欢通过写作而非口头表达想法', dimension: 'EI', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 98, content: '你在社交场合中容易结识新朋友', dimension: 'EI', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 99, content: '你更喜欢深入的对话而非闲聊', dimension: 'EI', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 100, content: '你在群体讨论中倾向于主导话题', dimension: 'EI', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 101, content: '你更喜欢安静的环境而非热闹的场合', dimension: 'EI', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 102, content: '你在陌生环境中容易主动与他人交谈', dimension: 'EI', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 103, content: '你更倾向于保留自己的想法，除非被问及', dimension: 'EI', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 104, content: '你喜欢组织社交活动并邀请他人参加', dimension: 'EI', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 105, content: '你需要独处时间来恢复精力', dimension: 'EI', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 106, content: '你在公开场合演讲时感到自信', dimension: 'EI', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  // S/N 维度（25题）
  { id: 107, content: '你更关注细节而非整体', dimension: 'SN', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 108, content: '你喜欢想象未来的可能性', dimension: 'SN', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 109, content: '你更倾向于相信经验而非理论', dimension: 'SN', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 110, content: '你喜欢探索新的想法，而非坚持传统', dimension: 'SN', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 111, content: '你更关注事实和数据', dimension: 'SN', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 112, content: '你喜欢思考事物之间的联系和模式', dimension: 'SN', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 113, content: '你更倾向于处理具体的问题', dimension: 'SN', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 114, content: '你喜欢探索抽象的概念', dimension: 'SN', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 115, content: '你更关注当下的实际情况', dimension: 'SN', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 116, content: '你喜欢思考未来的发展趋势', dimension: 'SN', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 117, content: '你更倾向于相信眼前的事实', dimension: 'SN', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 118, content: '你喜欢思考事物的象征意义', dimension: 'SN', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  // T/F 维度（25题）
  { id: 119, content: '你认为应该根据原则而非情感做决定', dimension: 'TF', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 120, content: '你更重视他人的感受而非对错', dimension: 'TF', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 121, content: '你认为批评应该客观公正', dimension: 'TF', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 122, content: '你更容易受到他人情绪的影响', dimension: 'TF', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 123, content: '你认为应该根据逻辑而非个人喜好做判断', dimension: 'TF', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 124, content: '你更关注维持良好的人际关系', dimension: 'TF', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 125, content: '你认为应该坚持真理，即使会伤害他人感情', dimension: 'TF', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 126, content: '你更倾向于避免冲突，维护和谐', dimension: 'TF', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 127, content: '你认为决策应该基于客观分析', dimension: 'TF', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 128, content: '你更关注他人的需求和感受', dimension: 'TF', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 129, content: '你认为应该公平公正地对待每个人', dimension: 'TF', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 130, content: '你更倾向于考虑决策对他人的影响', dimension: 'TF', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 131, content: '你认为应该直接指出问题，即使会令人不悦', dimension: 'TF', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 132, content: '你更重视团队合作而非个人成就', dimension: 'TF', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  // J/P 维度（32题）
  { id: 133, content: '你喜欢制定详细的计划并严格执行', dimension: 'JP', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 134, content: '你更喜欢随机应变，根据情况调整', dimension: 'JP', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 135, content: '你喜欢在截止日期前完成任务', dimension: 'JP', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 136, content: '你更喜欢开放式的选择，而非固定的计划', dimension: 'JP', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 137, content: '你喜欢将事情安排得井井有条', dimension: 'JP', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 138, content: '你更喜欢即兴发挥，不做太多准备', dimension: 'JP', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 139, content: '你喜欢制定长期的目标和计划', dimension: 'JP', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 140, content: '你更喜欢灵活处理事务，不拘泥于计划', dimension: 'JP', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 141, content: '你喜欢按照既定的流程办事', dimension: 'JP', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 142, content: '你更喜欢探索多种可能性，而非选择一种', dimension: 'JP', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 143, content: '你喜欢提前安排好每天的日程', dimension: 'JP', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 144, content: '你更喜欢顺其自然，不做太多安排', dimension: 'JP', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 145, content: '你喜欢将任务分解成具体的步骤', dimension: 'JP', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 146, content: '你更喜欢保持开放的选择，不做最终决定', dimension: 'JP', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 147, content: '你喜欢在做事前制定详细的清单', dimension: 'JP', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 148, content: '你更喜欢根据需要随时调整计划', dimension: 'JP', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 149, content: '你喜欢将物品放在固定的位置', dimension: 'JP', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 150, content: '你更喜欢在最后一刻才做最终决定', dimension: 'JP', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 151, content: '你喜欢按部就班地完成任务', dimension: 'JP', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 152, content: '你更喜欢同时处理多个任务', dimension: 'JP', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 153, content: '你喜欢在开始前就确定好所有细节', dimension: 'JP', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 154, content: '你更喜欢根据心情决定做什么', dimension: 'JP', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 155, content: '你喜欢制定明确的规则和标准', dimension: 'JP', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 156, content: '你更喜欢探索新的可能性，而非遵循既定模式', dimension: 'JP', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 157, content: '你喜欢定期检查进度，确保按计划进行', dimension: 'JP', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 158, content: '你更喜欢让事情自然发展，不过多干预', dimension: 'JP', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 159, content: '你喜欢将项目分解为可管理的小任务', dimension: 'JP', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 160, content: '你更喜欢保持灵活，随时准备改变方向', dimension: 'JP', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 161, content: '你喜欢为每个活动设定明确的时间', dimension: 'JP', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 162, content: '你更喜欢随遇而安，不做太多规划', dimension: 'JP', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 163, content: '你喜欢在开始新项目前做好充分准备', dimension: 'JP', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 164, content: '你更喜欢边做边调整计划', dimension: 'JP', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  // 补充题目使总数达到200题
  // E/I 维度补充（7题）
  { id: 165, content: '你在社交聚会中通常会主动介绍自己给他人', dimension: 'EI', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 166, content: '你倾向于先倾听他人的意见，再表达自己的观点', dimension: 'EI', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 167, content: '你喜欢成为团队中的核心人物', dimension: 'EI', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 168, content: '你更倾向于通过观察来学习新事物，而非直接参与', dimension: 'EI', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 169, content: '你在社交活动中感到兴奋和充满活力', dimension: 'EI', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 170, content: '你更喜欢与熟悉的小圈子相处，而非认识新朋友', dimension: 'EI', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 171, content: '你喜欢在社交场合中分享自己的经历和想法', dimension: 'EI', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  // S/N 维度补充（10题）
  { id: 172, content: '你更关注事物的实际用途而非理论意义', dimension: 'SN', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 173, content: '你喜欢思考事物发展的各种可能性', dimension: 'SN', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 174, content: '你更倾向于相信经过多次验证的方法', dimension: 'SN', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 175, content: '你喜欢探索事物背后的深层含义', dimension: 'SN', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 176, content: '你更关注眼前的事实，而非遥远的未来', dimension: 'SN', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 177, content: '你喜欢思考不同概念之间的联系', dimension: 'SN', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 178, content: '你更倾向于处理实际的、具体的问题', dimension: 'SN', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 179, content: '你喜欢思考创新的解决方案', dimension: 'SN', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 180, content: '你更关注已经发生的事实，而非可能发生的事情', dimension: 'SN', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 181, content: '你喜欢探索不同领域的知识和想法', dimension: 'SN', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  // T/F 维度补充（9题）
  { id: 182, content: '你认为应该根据理性分析来做决定', dimension: 'TF', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 183, content: '你更在意他人的感受，而非事情的对错', dimension: 'TF', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 184, content: '你认为批评应该基于客观标准', dimension: 'TF', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 185, content: '你更容易理解他人的情绪和需求', dimension: 'TF', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 186, content: '你认为应该坚持事实，即使会伤害他人', dimension: 'TF', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 187, content: '你更倾向于维护团队的和谐氛围', dimension: 'TF', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 188, content: '你认为决策应该基于数据和事实', dimension: 'TF', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 189, content: '你更关注如何让每个人都感到满意', dimension: 'TF', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 190, content: '你认为应该客观地评价每个人的表现', dimension: 'TF', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  // J/P 维度补充（10题）
  { id: 191, content: '你喜欢按计划执行任务，不喜欢临时变动', dimension: 'JP', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 192, content: '你更喜欢根据当时的情况灵活应对', dimension: 'JP', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 193, content: '你喜欢提前准备好所有需要的材料', dimension: 'JP', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 194, content: '你更喜欢保持开放的选择，不急于做决定', dimension: 'JP', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 195, content: '你喜欢事先确定好所有的步骤和流程', dimension: 'JP', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 196, content: '你更喜欢随机应变，不做太多计划', dimension: 'JP', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 197, content: '你喜欢设定明确的目标和期限', dimension: 'JP', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 198, content: '你更喜欢根据灵感行事，不受计划约束', dimension: 'JP', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 199, content: '你喜欢按照既定流程完成任务', dimension: 'JP', answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
  { id: 200, content: '你更喜欢探索多种可能性，而非遵循固定模式', dimension: 'JP', reverseScore: true, answers: [{ key: '非常同意', value: 'A1' }, { key: '比较同意', value: 'A2' }, { key: '不做选择', value: 'MID' }, { key: '比较不同意', value: 'B4' }, { key: '非常不同意', value: 'B5' }] },
];

// 200题版本
export const MBTI200Questions: Question[] = [
  ...MBTI60Questions,
  ...MBTI93ExtraQuestions,
  ...MBTI200ExtraQuestions
];

// 16种MBTI人格类型数据
export const mbtiTypes: Record<string, MBTIType> = {
  'INTJ': {
    type: 'INTJ', name: 'Architect', nameCn: '建筑师',
    slogan: '富有想象力和战略性的思想家，一切都在他们的掌握之中',
    description: '富有想象力和战略性的思想家，一切都在他们的掌握之中',
    strengths: ['独立思考', '战略眼光', '追求完美', '理性客观', '自律性强'],
    weaknesses: ['社交能力较弱', '过于挑剔', '情感表达不足', '不善于接受批评'],
    careers: ['科学家', '工程师', '律师', '财务分析师', '战略规划师'],
    relationships: ['注重智识交流', '寻找理性伴侣', '欣赏独立思考'],
    famousPeople: ['Elon Musk', 'Mark Zuckerberg', 'Isaac Newton'],
    eDescription: '你是一个外向型的人，善于社交和表达。',
    iDescription: '你是一个内向型的人，倾向于深思熟虑。',
    sDescription: '你更关注现实和具体的细节。',
    nDescription: '你更关注可能性和未来的发展。',
    tDescription: '你更注重逻辑和理性分析。',
    fDescription: '你更注重情感和人际关系。',
    jDescription: '你倾向于有计划和有条理。',
    pDescription: '你倾向于灵活和开放。',
    cognitiveFunctions: '你的主导功能是内倾直觉，帮助你洞察未来可能性。',
    personalityTraits: ['具有战略眼光', '独立自主', '追求知识和真理', '逻辑性强', '喜欢按自己的方式做事', '善于分析和解决问题'],
    careerAdvice: '作为建筑师型人格，你适合需要独立思考和战略规划的工作。',
    stressResponse: '你面对压力时可能会变得更加挑剔和封闭。',
    personalGrowth: '发展情商，学习理解和表达情感，增强人际交往能力。'
  },
  'INTP': {
    type: 'INTP', name: 'Logician', nameCn: '逻辑学家',
    slogan: '极具创造力的发明家，对知识充满渴望',
    description: '极具创造力的发明家，对知识充满渴望',
    strengths: ['逻辑思维', '创新能力', '分析能力强', '独立自主', '求知欲强'],
    weaknesses: ['社交困难', '理论与实践脱节', '优柔寡断', '容易忽视细节'],
    careers: ['计算机科学家', '哲学家', '数学家', '研究员', '数据分析师'],
    relationships: ['重视深度对话', '寻找思想伙伴', '欣赏逻辑思维'],
    famousPeople: ['Albert Einstein', 'Tina Fey', 'Socrates'],
    eDescription: '你是一个外向型的人，善于社交和表达。',
    iDescription: '你是一个内向型的人，倾向于深思熟虑。',
    sDescription: '你更关注现实和具体的细节。',
    nDescription: '你更关注可能性和未来的发展。',
    tDescription: '你更注重逻辑和理性分析。',
    fDescription: '你更注重情感和人际关系。',
    jDescription: '你倾向于有计划和有条理。',
    pDescription: '你倾向于灵活和开放。',
    cognitiveFunctions: '你的主导功能是内倾思考，帮助你构建精确的逻辑框架。',
    personalityTraits: ['富有创造力和好奇心', '逻辑思维能力强', '喜欢理论探讨', '独立思考', '善于分析复杂问题', '对知识充满渴望'],
    careerAdvice: '作为逻辑学家型人格，你适合需要深入研究和分析的工作。',
    stressResponse: '你面对压力时可能会过度分析和退缩。',
    personalGrowth: '行动导向，不要让思考阻碍行动，设定时限并采取小步骤。'
  },
  'ENTJ': {
    type: 'ENTJ', name: 'Commander', nameCn: '指挥官',
    slogan: '大胆、富有想象力的领导者，总能找到实现目标的方法',
    description: '大胆、富有想象力的领导者，总能找到实现目标的方法',
    strengths: ['领导能力', '决策果断', '自信独立', '战略思维', '激励他人'],
    weaknesses: ['傲慢', '缺乏耐心', '不善于情感表达', '控制欲强'],
    careers: ['CEO', '律师', '军官', '企业家', '管理顾问'],
    relationships: ['直接坦诚', '寻找挑战', '欣赏能力'],
    famousPeople: ['Steve Jobs', 'Margaret Thatcher', 'Jordan B. Peterson'],
    eDescription: '你是一个外向型的人，善于社交和表达。',
    iDescription: '你是一个内向型的人，倾向于深思熟虑。',
    sDescription: '你更关注现实和具体的细节。',
    nDescription: '你更关注可能性和未来的发展。',
    tDescription: '你更注重逻辑和理性分析。',
    fDescription: '你更注重情感和人际关系。',
    jDescription: '你倾向于有计划和有条理。',
    pDescription: '你倾向于灵活和开放。',
    cognitiveFunctions: '你的主导功能是外倾思考，使你在外部世界中有效组织和行动。',
    personalityTraits: ['天生的领导者', '决策果断', '自信且有影响力', '善于战略规划', '目标导向', '激励他人达成目标'],
    careerAdvice: '作为指挥官型人格，你适合需要领导和决策的工作。',
    stressResponse: '你面对压力时可能会变得过于强硬和控制。',
    personalGrowth: '培养耐心，学会尊重他人的节奏，理解不是每个人都和你一样高效。'
  },
  'ENTP': {
    type: 'ENTP', name: 'Debater', nameCn: '辩论家',
    slogan: '聪明好奇的思考者，爱好智识的交锋',
    description: '聪明好奇的思考者，爱好智识的交锋',
    strengths: ['创新能力', '社交能力强', '适应力强', '思维敏捷', '善于激励'],
    weaknesses: ['缺乏专注', '容易分心', '不喜欢规则', '好辩'],
    careers: ['律师', '记者', '营销人员', '演员', '企业家'],
    relationships: ['喜欢思想碰撞', '节奏活泼', '欣赏机智'],
    famousPeople: ['Mark Twain', 'John Adams', 'Tom Robbins'],
    eDescription: '你是一个外向型的人，善于社交和表达。',
    iDescription: '你是一个内向型的人，倾向于深思熟虑。',
    sDescription: '你更关注现实和具体的细节。',
    nDescription: '你更关注可能性和未来的发展。',
    tDescription: '你更注重逻辑和理性分析。',
    fDescription: '你更注重情感和人际关系。',
    jDescription: '你倾向于有计划和有条理。',
    pDescription: '你倾向于灵活和开放。',
    cognitiveFunctions: '你的主导功能是外倾直觉，使你能够快速看到各种可能性。',
    personalityTraits: ['思维敏捷', '善于辩论', '创新能力强', '适应变化', '多才多艺', '善于发现新机会'],
    careerAdvice: '作为辩论家型人格，你适合需要创新和沟通的工作。',
    stressResponse: '你面对压力时可能会变得更加分散和冲动。',
    personalGrowth: '专注深耕，选择一个领域深入学习，而不仅仅是浅尝辄止。'
  },
  'INFJ': {
    type: 'INFJ', name: 'Advocate', nameCn: '倡导者',
    slogan: '安静而神秘，鼓舞人心且令人难以忘怀',
    description: '安静而神秘，鼓舞人心且令人难以忘怀',
    strengths: ['同理心强', '有原则', '创意十足', '忠诚可靠', '洞察力强'],
    weaknesses: ['过度理想化', '不善于拒绝', '敏感脆弱', '完美主义'],
    careers: ['心理咨询师', '作家', '社会工作者', '教师', '艺术家'],
    relationships: ['重视真诚', '寻找深度连接', '欣赏理想主义'],
    famousPeople: ['Martin Luther King Jr.', 'Nelson Mandela', 'J.K. Rowling'],
    eDescription: '你是一个外向型的人，善于社交和表达。',
    iDescription: '你是一个内向型的人，倾向于深思熟虑。',
    sDescription: '你更关注现实和具体的细节。',
    nDescription: '你更关注可能性和未来的发展。',
    tDescription: '你更注重逻辑和理性分析。',
    fDescription: '你更注重情感和人际关系。',
    jDescription: '你倾向于有计划和有条理。',
    pDescription: '你倾向于灵活和开放。',
    cognitiveFunctions: '你的主导功能是内倾直觉，帮助你洞察深层意义和未来可能性。',
    personalityTraits: ['富有同理心', '洞察力强', '理想主义者', '忠诚可靠', '善于倾听', '有创造力和远见'],
    careerAdvice: '作为倡导者型人格，你适合需要洞察力和同理心的工作。',
    stressResponse: '你面对压力时可能会变得更加内向和理想化。',
    personalGrowth: '设定边界，学会拒绝，保护自己的时间和精力。'
  },
  'INFP': {
    type: 'INFP', name: 'Mediator', nameCn: '调停者',
    slogan: '诗意、善良的利他主义者，总是乐于帮助',
    description: '诗意、善良的利他主义者，总是乐于帮助',
    strengths: ['同理心强', '创造力丰富', '理想主义', '适应力强', '价值观坚定'],
    weaknesses: ['过于理想化', '情绪波动', '难以接受批评', '拖延'],
    careers: ['作家', '心理学家', '社会工作者', '教师', '艺术家'],
    relationships: ['重视价值观', '寻找灵魂伴侣', '欣赏真实'],
    famousPeople: ['William Shakespeare', 'J.R.R. Tolkien', 'Princess Diana'],
    eDescription: '你是一个外向型的人，善于社交和表达。',
    iDescription: '你是一个内向型的人，倾向于深思熟虑。',
    sDescription: '你更关注现实和具体的细节。',
    nDescription: '你更关注可能性和未来的发展。',
    tDescription: '你更注重逻辑和理性分析。',
    fDescription: '你更注重情感和人际关系。',
    jDescription: '你倾向于有计划和有条理。',
    pDescription: '你倾向于灵活和开放。',
    cognitiveFunctions: '你的主导功能是内倾情感，帮助你体验深刻内在价值观和情感。',
    personalityTraits: ['富有理想和价值观', '善解人意', '创造力丰富', '重视真诚', '具有艺术气质', '追求意义和深度'],
    careerAdvice: '作为调停者型人格，你适合需要创造力和同理心的工作。',
    stressResponse: '你面对压力时可能会变得更加情绪化和逃避。',
    personalGrowth: '行动导向，不要让完美主义阻止你行动。'
  },
  'ENFJ': {
    type: 'ENFJ', name: 'Protagonist', nameCn: '主人公',
    slogan: '富有魅力和鼓舞人心的领导者，能够吸引他人',
    description: '富有魅力和鼓舞人心的领导者，能够吸引他人',
    strengths: ['领导能力强', '同理心强', '感染力强', '有魅力', '理想主义'],
    weaknesses: ['过度付出', '过于理想化', '容易忽视自己', '难以面对冲突'],
    careers: ['教师', '政治家', '心理咨询师', 'HR', '非营利组织领袖'],
    relationships: ['热情投入', '帮助成长', '欣赏激励'],
    famousPeople: ['Barack Obama', 'Oprah Winfrey', 'Martin Sheen'],
    eDescription: '你是一个外向型的人，善于社交和表达。',
    iDescription: '你是一个内向型的人，倾向于深思熟虑。',
    sDescription: '你更关注现实和具体的细节。',
    nDescription: '你更关注可能性和未来的发展。',
    tDescription: '你更注重逻辑和理性分析。',
    fDescription: '你更注重情感和人际关系。',
    jDescription: '你倾向于有计划和有条理。',
    pDescription: '你倾向于灵活和开放。',
    cognitiveFunctions: '你的主导功能是外倾情感，使你天生善于理解他人、激励人心。',
    personalityTraits: ['善于激励他人', '富有魅力和感染力', '关心他人成长', '善于沟通', '有领导力', '理想主义'],
    careerAdvice: '作为主人公型人格，你适合需要领导力和沟通能力的工作。',
    stressResponse: '你面对压力时可能会过度付出而忽视自己。',
    personalGrowth: '自我认识，深入了解自己的需求和价值观，而非总是关注他人。'
  },
  'ENFP': {
    type: 'ENFP', name: 'Campaigner', nameCn: '竞选者',
    slogan: '热情洋溢、创意十足的自由灵魂，总能找到可能性',
    description: '热情洋溢、创意十足的自由灵魂，总能找到可能性',
    strengths: ['热情', '创造力强', '社交能力强', '积极乐观', '适应力强'],
    weaknesses: ['注意力分散', '情绪波动', '容易冲动', '难以专注细节'],
    careers: ['记者', '演员', '设计师', '营销人员', '摄影师'],
    relationships: ['充满热情', '探索人生', '欣赏可能性'],
    famousPeople: ['Robin Williams', 'Robert Downey Jr.', 'Ellen DeGeneres'],
    eDescription: '你是一个外向型的人，善于社交和表达。',
    iDescription: '你是一个内向型的人，倾向于深思熟虑。',
    sDescription: '你更关注现实和具体的细节。',
    nDescription: '你更关注可能性和未来的发展。',
    tDescription: '你更注重逻辑和理性分析。',
    fDescription: '你更注重情感和人际关系。',
    jDescription: '你倾向于有计划和有条理。',
    pDescription: '你倾向于灵活和开放。',
    cognitiveFunctions: '你的主导功能是外倾直觉，使你充满热情和创造力。',
    personalityTraits: ['热情洋溢', '充满可能性', '善于启发他人', '适应力强', '乐观积极', '富有想象力和创造力'],
    careerAdvice: '作为竞选者型人格，你适合需要创造力和社交的工作。',
    stressResponse: '你面对压力时可能会变得更加混乱和逃避。',
    personalGrowth: '专注和坚持，选择一个目标并坚持到底。'
  },
  'ISTJ': {
    type: 'ISTJ', name: 'Logistician', nameCn: '物流师',
    slogan: '实践型思想家，以可靠和效率著称',
    description: '实践型思想家，以可靠和效率著称',
    strengths: ['责任感强', '可靠', '注重细节', '逻辑性强', '勤奋'],
    weaknesses: ['不善变通', '难以接受新事物', '社交能力弱', '过于保守'],
    careers: ['会计', '律师', '医生', '军人', '管理者'],
    relationships: ['忠诚专注', '重视承诺', '欣赏责任'],
    famousPeople: ['George Washington', 'Angela Merkel', 'Johnny Depp'],
    eDescription: '你是一个外向型的人，善于社交和表达。',
    iDescription: '你是一个内向型的人，倾向于深思熟虑。',
    sDescription: '你更关注现实和具体的细节。',
    nDescription: '你更关注可能性和未来的发展。',
    tDescription: '你更注重逻辑和理性分析。',
    fDescription: '你更注重情感和人际关系。',
    jDescription: '你倾向于有计划和有条理。',
    pDescription: '你倾向于灵活和开放。',
    cognitiveFunctions: '你的主导功能是内倾感觉，帮助你精确回忆细节和经验。',
    personalityTraits: ['可靠负责', '注重细节', '脚踏实地', '善于组织', '遵守规则和承诺', '务实高效'],
    careerAdvice: '作为物流师型人格，你适合需要可靠性和执行力的工作。',
    stressResponse: '你面对压力时可能会变得更加固执和批评。',
    personalGrowth: '拥抱变化，认识到变化可能带来机会而非威胁。'
  },
  'ISFJ': {
    type: 'ISFJ', name: 'Defender', nameCn: '守卫者',
    slogan: '非常忠诚和呵护的守护者，随时准备保护所爱的人',
    description: '非常忠诚和呵护的守护者，随时准备保护所爱的人',
    strengths: ['忠诚', '有责任感', '细心周到', '善于照顾他人', '务实'],
    weaknesses: ['过度付出', '害怕变化', '难以拒绝', '自我否定'],
    careers: ['护士', '教师', '社工', '行政人员', '图书管理员'],
    relationships: ['无私奉献', '照顾家人', '欣赏关怀'],
    famousPeople: ['Mother Teresa', 'Beyoncé', 'Kate Middleton'],
    eDescription: '你是一个外向型的人，善于社交和表达。',
    iDescription: '你是一个内向型的人，倾向于深思熟虑。',
    sDescription: '你更关注现实和具体的细节。',
    nDescription: '你更关注可能性和未来的发展。',
    tDescription: '你更注重逻辑和理性分析。',
    fDescription: '你更注重情感和人际关系。',
    jDescription: '你倾向于有计划和有条理。',
    pDescription: '你倾向于灵活和开放。',
    cognitiveFunctions: '你的主导功能是内倾感觉，帮助你关注细节、珍视传统和经验。',
    personalityTraits: ['忠诚可靠', '善于照顾他人', '细心周到', '有责任感', '传统价值观', '善于维护和谐'],
    careerAdvice: '作为守卫者型人格，你适合需要关怀和责任感的工作。',
    stressResponse: '你面对压力时可能会过度承担责任而忽视自己。',
    personalGrowth: '自我价值，认识到自己的需求同样重要。'
  },
  'ESTJ': {
    type: 'ESTJ', name: 'Executive', nameCn: '总经理',
    slogan: '出色的管理者，以身作则，擅长打理生活中的事务',
    description: '出色的管理者，以身作则，擅长打理生活中的事务',
    strengths: ['组织能力强', '决策果断', '注重效率', '善于执行', '诚实正直', '有领导才能'],
    weaknesses: ['傲慢', '缺乏耐心', '不善于情感表达', '控制欲强'],
    careers: ['企业管理者', '军官', '法官', '教师', '金融从业者'],
    relationships: ['直接坦诚', '重视责任', '欣赏效率'],
    famousPeople: ['John D. Rockefeller', 'Julius Caesar', 'Queen Elizabeth II'],
    eDescription: '你是一个外向型的人，善于社交和表达。',
    iDescription: '你是一个内向型的人，倾向于深思熟虑。',
    sDescription: '你更关注现实和具体的细节。',
    nDescription: '你更关注可能性和未来的发展。',
    tDescription: '你更注重逻辑和理性分析。',
    fDescription: '你更注重情感和人际关系。',
    jDescription: '你倾向于有计划和有条理。',
    pDescription: '你倾向于灵活和开放。',
    cognitiveFunctions: '你的主导功能是外倾思考，使你在外部世界中有效组织和执行。',
    personalityTraits: ['组织能力强', '决策果断', '注重效率', '善于执行', '诚实正直', '有领导才能'],
    careerAdvice: '作为总经理型人格，你适合需要组织和领导能力的工作。',
    stressResponse: '你面对压力时可能会变得更加强硬和缺乏耐心。',
    personalGrowth: '倾听他人，学会真正倾听而不只是等待发言。'
  },
  'ESFJ': {
    type: 'ESFJ', name: 'Consul', nameCn: '执政官',
    slogan: '热情而乐于助人的交际花，总是热衷于帮助他人',
    description: '热情而乐于助人的交际花，总是热衷于帮助他人',
    strengths: ['热情友好', '善于社交', '体贴周到', '乐于助人', '重视和谐', '有责任感和忠诚度'],
    weaknesses: ['过度付出', '过于迎合他人', '难以面对批评', '害怕冲突'],
    careers: ['护士', '教师', 'HR', '客户服务', '社会工作者'],
    relationships: ['热情友好', '乐于助人', '重视关系'],
    famousPeople: ['Taylor Swift', 'Jennifer Garner', 'M other Teresa'],
    eDescription: '你是一个外向型的人，善于社交和表达。',
    iDescription: '你是一个内向型的人，倾向于深思熟虑。',
    sDescription: '你更关注现实和具体的细节。',
    nDescription: '你更关注可能性和未来的发展。',
    tDescription: '你更注重逻辑和理性分析。',
    fDescription: '你更注重情感和人际关系。',
    jDescription: '你倾向于有计划和有条理。',
    pDescription: '你倾向于灵活和开放。',
    cognitiveFunctions: '你的主导功能是外倾情感，使你天生善于社交、照顾他人感受。',
    personalityTraits: ['热情友好', '善于社交', '体贴周到', '乐于助人', '重视和谐', '有责任感和忠诚度'],
    careerAdvice: '作为执政官型人格，你适合需要社交和关怀能力的工作。',
    stressResponse: '你面对压力时可能会过度讨好他人而忽视自己。',
    personalGrowth: '自我时间，留出时间给自己，而非总是为他人服务。'
  },
  'ISTP': {
    type: 'ISTP', name: 'Virtuoso', nameCn: '鉴赏家',
    slogan: '大胆而实用的实验者，善于理解工具并使其发挥作用',
    description: '大胆而实用的实验者，善于理解工具并使其发挥作用',
    strengths: ['动手能力强', '善于分析问题', '冷静理性', '适应力强', '喜欢探索', '注重实际解决方案'],
    weaknesses: ['社交困难', '难以表达情感', '冒险冲动', '容易厌倦'],
    careers: ['工程师', '机械师', '飞行员', '程序员', '运动员'],
    relationships: ['保持独立', '尊重空间', '欣赏自由'],
    famousPeople: ['Bruce Lee', 'Clint Eastwood', 'Steve Jobs'],
    eDescription: '你是一个外向型的人，善于社交和表达。',
    iDescription: '你是一个内向型的人，倾向于深思熟虑。',
    sDescription: '你更关注现实和具体的细节。',
    nDescription: '你更关注可能性和未来的发展。',
    tDescription: '你更注重逻辑和理性分析。',
    fDescription: '你更注重情感和人际关系。',
    jDescription: '你倾向于有计划和有条理。',
    pDescription: '你倾向于灵活和开放。',
    cognitiveFunctions: '你的主导功能是内倾思考，帮助你进行精确的逻辑分析和理解事物原理。',
    personalityTraits: ['动手能力强', '善于分析问题', '冷静理性', '适应力强', '喜欢探索', '注重实际解决方案'],
    careerAdvice: '作为鉴赏家型人格，你适合需要动手能力和分析能力的工作。',
    stressResponse: '你面对压力时可能会退缩和逃避。',
    personalGrowth: '社交练习，有意识地参与社交活动，建立人际关系。'
  },
  'ISFP': {
    type: 'ISFP', name: 'Adventurer', nameCn: '探险家',
    slogan: '灵活而有魅力的艺术家，随时准备探索和体验新事物',
    description: '灵活而有魅力的艺术家，随时准备探索和体验新事物',
    strengths: ['艺术气质', '敏感细腻', '善于欣赏美', '随和友好', '活在当下', '重视个人价值观'],
    weaknesses: ['容易冲动', '难以拒绝', '过度敏感', '容易逃避冲突'],
    careers: ['设计师', '艺术家', '摄影师', '厨师', '音乐家'],
    relationships: ['追求真实', '用行动表达', '欣赏当下'],
    famousPeople: ['Michael Jackson', 'Marilyn Monroe', 'Bjorn Borg'],
    eDescription: '你是一个外向型的人，善于社交和表达。',
    iDescription: '你是一个内向型的人，倾向于深思熟虑。',
    sDescription: '你更关注现实和具体的细节。',
    nDescription: '你更关注可能性和未来的发展。',
    tDescription: '你更注重逻辑和理性分析。',
    fDescription: '你更注重情感和人际关系。',
    jDescription: '你倾向于有计划和有条理。',
    pDescription: '你倾向于灵活和开放。',
    cognitiveFunctions: '你的主导功能是内倾情感，帮助你体验深刻内在情感，保持个人价值观。',
    personalityTraits: ['艺术气质', '敏感细腻', '善于欣赏美', '随和友好', '活在当下', '重视个人价值观'],
    careerAdvice: '作为探险家型人格，你适合需要艺术和创造力的工作。',
    stressResponse: '你面对压力时可能会变得情绪化和逃避。',
    personalGrowth: '表达自我，不要隐藏自己的才能和想法。'
  },
  'ESTP': {
    type: 'ESTP', name: 'Entrepreneur', nameCn: '企业家',
    slogan: '聪明、精力充沛、善于感知，是天生的商业头脑',
    description: '聪明、精力充沛、善于感知，是天生的商业头脑',
    strengths: ['行动力强', '善于社交', '适应变化', '现实务实', '善于解决问题', '充满活力和热情'],
    weaknesses: ['冲动', '不耐烦', '容易冒险', '难以专注'],
    careers: ['企业家', '销售', '经纪人', '营销人员', '警官'],
    relationships: ['活力充沛', '享受当下', '欣赏刺激'],
    famousPeople: ['Donald Trump', 'Eddie Murphy', 'Jackie Chan'],
    eDescription: '你是一个外向型的人，善于社交和表达。',
    iDescription: '你是一个内向型的人，倾向于深思熟虑。',
    sDescription: '你更关注现实和具体的细节。',
    nDescription: '你更关注可能性和未来的发展。',
    tDescription: '你更注重逻辑和理性分析。',
    fDescription: '你更注重情感和人际关系。',
    jDescription: '你倾向于有计划和有条理。',
    pDescription: '你倾向于灵活和开放。',
    cognitiveFunctions: '你的主导功能是外倾感觉，使你对周围环境有敏锐观察。',
    personalityTraits: ['行动力强', '善于社交', '适应变化', '现实务实', '善于解决问题', '充满活力和热情'],
    careerAdvice: '作为企业家型人格，你适合需要行动力和社交能力的工作。',
    stressResponse: '你面对压力时可能会变得更加冲动和冒险。',
    personalGrowth: '暂停思考，学会在行动前停顿思考后果。'
  },
  'ESFP': {
    type: 'ESFP', name: 'Entertainer', nameCn: '表演者',
    slogan: '自发的、精力充沛的表演者，热衷于让每个人开心',
    description: '自发的、精力充沛的表演者，热衷于让每个人开心',
    strengths: ['充满活力', '善于表现', '社交能力强', '乐观积极', '善于调动气氛', '享受当下生活'],
    weaknesses: ['注意力分散', '容易冲动', '难以面对批评', '过度追求刺激'],
    careers: ['演员', '歌手', '主持人', '摄影师', '活动策划'],
    relationships: ['热情洋溢', '乐趣无穷', '欣赏欢乐'],
    famousPeople: ['Marilyn Monroe', 'Will Smith', 'Miley Cyrus'],
    eDescription: '你是一个外向型的人，善于社交和表达。',
    iDescription: '你是一个内向型的人，倾向于深思熟虑。',
    sDescription: '你更关注现实和具体的细节。',
    nDescription: '你更关注可能性和未来的发展。',
    tDescription: '你更注重逻辑和理性分析。',
    fDescription: '你更注重情感和人际关系。',
    jDescription: '你倾向于有计划和有条理。',
    pDescription: '你倾向于灵活和开放。',
    cognitiveFunctions: '你的主导功能是外倾感觉，使你充满活力，对当下有敏锐感知。',
    personalityTraits: ['充满活力', '善于表现', '社交能力强', '乐观积极', '善于调动气氛', '享受当下生活'],
    careerAdvice: '作为表演者型人格，你适合需要表现力和社交能力的工作。',
    stressResponse: '你面对压力时可能会变得更加冲动和逃避。',
    personalGrowth: '专注练习，学会专注于单一任务而非多任务切换。'
  }
};
