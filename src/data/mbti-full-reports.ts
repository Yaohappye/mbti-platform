// MBTI 16种人格类型详细报告数据
// 基于深度心理学研究和实践应用设计



export interface CognitiveFunction {
  symbol: string;
  name: string;
  level: string;
  description: string;
  detailedDescription?: string;
  characteristics?: string[];
}

export interface StrengthItem {
  title: string;
  desc: string;
  details?: string;
  detailsList?: string[];
  examples?: string[];
}

export interface WeaknessItem {
  title: string;
  desc: string;
  impact?: string;
  solutions?: string[];
}

export interface RelationshipSection {
  title: string;
  desc: string;
  characteristics?: string[];
  challenges?: string[];
  advice?: string[];
  compatibility?: { type: string; desc: string }[];
}

export interface CareerSection {
  title: string;
  desc: string;
  suitable: string[];
  suitableDetails?: { career: string; reason: string }[];
  unsuitable: string[];
  workStyle: string;
  workStyleDetailed?: string;
  workStyleDetails?: string[];
  workEnvironment?: string;
  idealEnvironment?: string[];
  leadershipStyle?: string;
  teamworkStyle?: string;
}

export interface GrowthSection {
  opportunities: (string | { title: string; desc: string })[];
  opportunitiesDetailed?: { area: string; desc: string; actions: string[] }[];
  actions: (string | { title: string; desc: string })[];
  detailedAdvice?: string;
  longTermGoals?: string[];
}

export interface StressSection {
  triggers: string[];
  triggersDetailed?: { trigger: string; explanation: string }[];
  signs: string[];
  signsDetailed?: { stage: string; signs: string[] }[];
  coping: string[];
  copingDetailed?: { method: string; steps: string[] }[];
  detailedAdvice?: string;
}

export interface FamousPerson {
  name: string;
  title: string;
  contribution?: string;
  traits?: string[];
}

export interface MBTIFullReport {
  type: string;
  name: string;
  nameEn: string;
  category: string;
  categoryEn: string;
  slogan: string;
  description: string;
  detailedDescription?: string;
  traits: { trait: string; explanation: string }[];
  traitsDetailed?: { title: string; content: string }[];
  strengths: StrengthItem[];
  strengthsDetailed?: string;
  weaknesses: WeaknessItem[];
  weaknessesDetailed?: string;
  cognitiveFunctions?: CognitiveFunction[];
  relationships: {
    romance: RelationshipSection;
    friendship: RelationshipSection;
    parenting: RelationshipSection;
    workplace?: RelationshipSection;
  };
  career: CareerSection;
  growth: GrowthSection;
  stress?: StressSection;
  famousPeople?: FamousPerson[];
  image?: string;
  tagline?: string;
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

// 所有MBTI类型的完整报告数据
export const mbtiFullReports: Record<string, MBTIFullReport> = {
  INTJ: {
    type: 'INTJ',
    name: '建筑师',
    nameEn: 'Architect',
    category: 'analysts',
    categoryEn: 'Analysts',
    tagline: '富有想象力的战略思想家',
    slogan: '富有想象力的战略思想家，一切皆在计划之中',
    description: 'INTJ是独立思考的战略家，他们拥有独特的视角和强大的分析能力。他们善于发现系统中的逻辑漏洞，并设计出创新的解决方案。',
    detailedDescription: '建筑师型人格(INTJ)是十六种人格类型中最稀有的之一。他们是真正的战略思想家，拥有卓越的分析能力和远见卓识。INTJ们以逻辑和理性为基础，善于在复杂的信息中发现模式和规律。',
    traits: [
      { trait: '战略眼光', explanation: '能够预见长远趋势，制定周密计划' },
      { trait: '独立自主', explanation: '依靠自己的判断，不盲从权威' },
      { trait: '追求卓越', explanation: '对自己和工作都有极高标准' },
      { trait: '逻辑分析', explanation: '善于拆解复杂问题，找出核心逻辑' },
      { trait: '创新精神', explanation: '喜欢探索新思路，挑战现状' }
    ],
    traitsDetailed: [
      { title: '战略思维', content: 'INTJ天生具有战略性思维，能够从宏观角度看待问题，预见未来的发展趋势。他们善于制定长期计划，并一步步实现目标。' },
      { title: '独立精神', content: 'INTJ高度重视独立性，他们喜欢依靠自己的判断做决定，不轻易受他人影响。这种独立性使他们能够在各种环境中保持清晰的思维。' },
      { title: '追求完美', content: 'INTJ对自己和他人都有很高的期望。他们不断追求卓越，努力改进系统和流程，以达到最佳效果。' }
    ],
    cognitiveFunctions: [
      { symbol: 'Ni', name: '内向直觉', level: '主导', description: '这是INTJ的核心认知功能，使他们能够洞察事物的本质，预见未来的发展趋势。Ni让INTJ拥有独特的直觉，能够在复杂的信息中发现模式和规律。', detailedDescription: '内向直觉是INTJ最强大的认知工具，它允许他们从潜意识层面处理信息，形成对未来可能性的深刻洞察。', characteristics: ['洞察本质', '预见趋势', '模式识别', '整体思维'] },
      { symbol: 'Te', name: '外向思考', level: '辅助', description: 'Te帮助INTJ将内在的直觉转化为具体的行动计划。它使INTJ能够高效地组织资源、制定策略，并以逻辑和客观的方式解决问题。', detailedDescription: '外向思考让INTJ能够将自己的想法付诸实践，通过系统化的方法实现目标。', characteristics: ['逻辑分析', '效率导向', '客观决策', '系统组织'] },
      { symbol: 'Fi', name: '内向情感', level: '第三', description: 'Fi代表INTJ的内在价值观和个人信念。虽然不如前两个功能明显，但它影响着INTJ的道德判断和对真实自我的追求。', detailedDescription: '内向情感是INTJ的私人价值系统，影响着他们对真实性和个人诚信的重视。', characteristics: ['内在价值', '个人信念', '道德判断', '真实自我'] },
      { symbol: 'Se', name: '外向感觉', level: '劣势', description: 'Se是INTJ最不发达的功能，影响着他们对当下具体细节的感知。INTJ可能会忽视当下的感官体验，而过度专注于未来的可能性。', detailedDescription: '作为劣势功能，Se代表着INTJ需要发展的领域——活在当下，享受当下的体验。', characteristics: ['当下感知', '具体细节', '感官体验', '现实关注'] }
    ],
    strengths: [
      { title: '战略规划', desc: '能够制定长期目标并分解为可执行的步骤', details: 'INTJ擅长从全局角度思考问题，能够预见未来的发展趋势，并据此制定详细的行动计划。', detailsList: ['长远规划', '目标分解', '资源配置', '风险评估'], examples: ['制定5年职业规划', '设计复杂的系统架构', '预测市场趋势'] },
      { title: '独立创新', desc: '不依赖他人，能够独立提出创新解决方案', details: 'INTJ善于跳出框架思考，能够提出独特的见解和创新的解决方案。', detailsList: ['独立思考', '创新方案', '原创思维', '突破常规'], examples: ['提出颠覆性的产品概念', '优化现有流程', '发明新的方法论'] },
      { title: '高效执行', desc: '将计划转化为行动，追求高效和精确', details: 'INTJ不仅善于规划，更注重执行。他们会不断优化流程，确保任务高效完成。', detailsList: ['时间管理', '资源优化', '流程改进', '质量控制'], examples: ['建立自动化工作流', '优化团队效率', '完成复杂项目'] },
      { title: '深度洞察', desc: '能够透过现象看本质，发现隐藏的模式', details: 'INTJ具有敏锐的洞察力，能够在大量信息中发现关键模式和规律。', detailsList: ['模式识别', '本质洞察', '逻辑分析', '因果推理'], examples: ['发现数据中的趋势', '识别系统漏洞', '预测市场变化'] }
    ],
    strengthsDetailed: 'INTJ的核心优势在于其卓越的战略思维能力和独立创新能力。他们能够在复杂的环境中保持清晰的头脑，制定长期规划并坚定执行。同时，他们的创新思维使他们能够发现他人忽视的机会，提出独特的解决方案。',
    weaknesses: [
      { title: '过度完美主义', desc: '对自己和他人期望过高，可能导致挫败感', impact: '可能拖延项目，因为总觉得不够完美；对团队成员要求过高，影响团队氛围。', solutions: ['设定"足够好"的标准', '区分关键任务和次要任务', '学会欣赏进展而非只关注结果', '培养对他人的耐心'] },
      { title: '情感疏离', desc: '过于理性，可能忽视他人的情感需求', impact: '在人际关系中显得冷漠，难以理解他人的感受；决策时忽视情感因素。', solutions: ['主动询问他人的感受', '学习情感表达', '培养同理心', '在决策时考虑情感影响'] },
      { title: '固执己见', desc: '对自己的观点过于自信，不易接受批评', impact: '可能错过更好的建议；与持不同意见者产生冲突。', solutions: ['主动寻求反馈', '练习倾听技巧', '保持开放心态', '区分想法和自我'] },
      { title: '社交困难', desc: '倾向于独处，可能在社交场合感到不适', impact: '错过建立有价值关系的机会；在需要团队合作的场景中表现不佳。', solutions: ['设定小目标逐步提升社交能力', '选择深度对话而非广泛社交', '利用书面沟通优势', '参加兴趣相投的小组'] }
    ],
    weaknessesDetailed: 'INTJ的主要挑战在于平衡其理性思维与情感需求。他们可能在追求完美的过程中忽视了他人的感受，或者在坚持己见时错过更好的方案。认识到这些盲点并主动改进，可以帮助INTJ成为更全面的领导者和合作者。',
    relationships: {
      romance: {
        title: '恋爱关系',
        desc: 'INTJ在恋爱中寻求智力上的连接和深层次的理解。他们重视诚实和忠诚，一旦投入感情就会非常专一。',
        characteristics: ['追求深度对话', '重视个人空间', '忠诚专一', '理性处理矛盾', '长期承诺导向'],
        challenges: ['难以表达情感', '可能显得冷漠', '对伴侣期望过高', '需要大量独处时间'],
        advice: ['学习表达爱意的方式', '理解情感需求的重要性', '给伴侣足够的关注', '平衡理性与感性'],
        compatibility: [
          { type: 'ENFP', desc: '活力与深度的完美结合' },
          { type: 'ENTP', desc: '智力上的激烈碰撞' },
          { type: 'INTJ', desc: '相互理解的深度关系' }
        ]
      },
      friendship: {
        title: '友谊关系',
        desc: 'INTJ重视质量而非数量的友谊。他们喜欢与能够进行深度对话的朋友交往，对肤浅的社交不感兴趣。',
        characteristics: ['选择性强', '忠诚可靠', '深度交流', '长期友谊', '知识分享'],
        challenges: ['社交圈子小', '可能显得疏离', '不善闲聊', '维护友谊需要努力'],
        advice: ['主动联系朋友', '参与社交活动', '学习闲聊技巧', '表达欣赏之情'],
        compatibility: [
          { type: 'ENTP', desc: '智力上的刺激' },
          { type: 'INTP', desc: '共同的探索精神' },
          { type: 'INFJ', desc: '深度的情感连接' }
        ]
      },
      parenting: {
        title: '亲子关系',
        desc: 'INTJ父母重视培养孩子的独立性和批判性思维。他们为孩子设定高标准，同时也会给予必要的支持。',
        characteristics: ['重视教育', '培养独立性', '设定高标准', '理性引导', '长期规划'],
        challenges: ['可能过于严格', '情感表达不足', '期望过高', '难以理解孩子的情感需求'],
        advice: ['多表达爱意', '理解孩子的独特性', '降低完美主义', '享受当下时刻'],
        compatibility: []
      }
    },
    career: {
      title: '职业发展',
      desc: 'INTJ在需要战略思维、独立工作和创新能力的职业中表现出色。',
      suitable: ['战略规划师', '系统架构师', '投资分析师', '研究科学家', '管理顾问', '软件工程师', '产品经理', '数据科学家', '律师', '医生'],
      suitableDetails: [
        { career: '战略规划师', reason: '能够运用战略思维制定长期规划' },
        { career: '系统架构师', reason: '设计复杂系统满足创新需求' },
        { career: '投资分析师', reason: '分析数据和预测趋势' },
        { career: '研究科学家', reason: '深度研究和创新' },
        { career: '管理顾问', reason: '解决复杂商业问题' }
      ],
      unsuitable: ['客户服务代表', '销售（高压环境）', '行政助理', '流水线工人'],
      workStyle: 'INTJ喜欢独立工作，有自主权，能够深入研究问题。他们重视效率和结果，喜欢优化流程。',
      workStyleDetailed: 'INTJ在工作中表现出强烈的独立性和目标导向。他们更喜欢在安静的环境中专注于复杂的任务，而不是频繁参与团队会议或社交活动。INTJ善于识别系统中的低效环节，并提出改进方案。他们对自己的工作质量要求很高，常常追求完美。',
      workStyleDetails: ['独立工作', '目标导向', '系统优化', '深度专注', '长期规划', '创新思维'],
      workEnvironment: 'INTJ理想的工作环境是安静、有组织、允许独立工作的地方。他们需要时间来深度思考，不喜欢频繁的打扰。',
      idealEnvironment: ['安静私密的空间', '灵活的工作时间', '挑战性的项目', '自主决策权', '知识型同事', '清晰的晋升路径'],
      leadershipStyle: 'INTJ领导者是战略型的，他们设定清晰的愿景，建立高效的系统，并期望团队成员达到高标准。他们更倾向于通过逻辑和理性来领导，而不是情感激励。',
      teamworkStyle: 'INTJ在团队中偏好明确的角色和责任。他们贡献创新的想法和战略视角，但可能需要在沟通和情感连接方面付出更多努力。'
    },
    growth: {
      opportunities: [
        { title: '情感智能', desc: '发展理解和管理情感的能力' },
        { title: '灵活性', desc: '学会适应变化，接受不完美' },
        { title: '社交技能', desc: '建立和维护人际关系' },
        { title: '接受反馈', desc: '开放地接受批评和建议' }
      ],
      opportunitiesDetailed: [
        { area: '情感智能', desc: '学习识别和表达情感', actions: ['阅读情感智能书籍', '练习情感表达', '寻求反馈'] },
        { area: '灵活性', desc: '培养适应变化的能力', actions: ['设定"足够好"标准', '接受不确定性', '尝试新体验'] },
        { area: '社交技能', desc: '提升人际交往能力', actions: ['参加社交活动', '练习主动倾听', '学习闲聊技巧'] }
      ],
      actions: [
        { title: '设定可实现的目标', desc: '将大目标分解为小步骤' },
        { title: '寻求反馈', desc: '主动向他人寻求建设性意见' },
        { title: '培养耐心', desc: '对自己和他人更有耐心' },
        { title: '平衡工作与生活', desc: '确保有足够的休息和娱乐时间' }
      ],
      detailedAdvice: 'INTJ的成长路径需要平衡理性与情感、独立与合作。关键在于认识到完美不是唯一目标，人际关系和情感健康同样重要。建议INTJ定期反思自己的行为模式，主动寻求反馈，并给自己时间去发展那些不太自然但有益的技能。',
      longTermGoals: ['成为领域专家', '建立深度关系', '实现工作与生活的平衡', '发展领导能力']
    },
    stress: {
      triggers: ['失去控制感', '社交压力', '情感冲突', '缺乏进展', '环境混乱'],
      triggersDetailed: [
        { trigger: '失去控制感', explanation: '当INTJ无法掌控局面或被迫改变计划时' },
        { trigger: '情感冲突', explanation: '面对他人的情感爆发或批评时' },
        { trigger: '社交压力', explanation: '被迫参与大量社交活动' }
      ],
      signs: ['变得易怒', '社交退缩', '过度分析', '失眠', '身体不适'],
      signsDetailed: [
        { stage: '初期', signs: ['轻微烦躁', '注意力分散', '睡眠质量下降'] },
        { stage: '中期', signs: ['社交回避', '过度工作', '情绪波动'] },
        { stage: '严重', signs: ['身体不适', '抑郁情绪', '完全退缩'] }
      ],
      coping: ['独处充电', '运动锻炼', '写日记', '寻求专业帮助', '调整期望'],
      copingDetailed: [
        { method: '独处时间', steps: ['安排独处时间', '进行冥想或阅读', '远离刺激源'] },
        { method: '身体活动', steps: ['进行有氧运动', '练习瑜伽', '户外散步'] },
        { method: '认知重构', steps: ['记录负面想法', '挑战不合理信念', '寻找替代视角'] }
      ]
    },
    famousPeople: [
      { name: '埃隆·马斯克', title: '企业家', contribution: '特斯拉、SpaceX创始人', traits: ['创新', '远见'] },
      { name: '弗里德里希·尼采', title: '哲学家', contribution: '存在主义哲学', traits: ['深度思考', '批判精神'] },
      { name: '艾萨克·牛顿', title: '科学家', contribution: '经典力学奠基人', traits: ['分析能力', '创新精神'] },
      { name: '马克·扎克伯格', title: '企业家', contribution: 'Facebook创始人', traits: ['战略思维', '执行力'] }
    ],
    image: '/mbti-characters/INTJ.jpg'
  },
  // 其他15种人格类型使用简化版本
  INTP: {
    type: 'INTP',
    name: '逻辑学家',
    nameEn: 'Logician',
    category: 'analysts',
    categoryEn: 'Analysts',
    tagline: '具有创造力的发明家',
    slogan: '对知识充满渴望，追求对宇宙的理解',
    description: 'INTP是独立思考的分析师，他们渴望理解事物的本质。他们擅长逻辑推理，喜欢探索理论和抽象概念。',
    detailedDescription: '逻辑学家型人格(INTP)约占人口的3%。他们是天生的思考者，对理论和抽象概念充满热情。INTP追求知识的纯粹性，喜欢深入探索事物的运作原理。他们具有卓越的逻辑分析能力，喜欢将复杂问题拆解成可理解的组成部分。INTP思维独立，不容易被传统观念或权威观点所影响。他们重视真理和准确性，对知识有着永不满足的渴望。INTP往往很安静且内敛，但他们的内心世界非常丰富和活跃。他们可能会沉浸在自己的思考中，忽视周围的环境。INTP需要大量独处的时间来处理信息和充电。',
    traitsDetailed: [
      { title: '逻辑分析能力', content: 'INTP具有天生的逻辑分析天赋，能够迅速识别论证中的逻辑漏洞。他们善于将复杂问题分解为更小的、可管理的部分，然后逐一分析。这种能力使他们在需要解决复杂技术问题的领域表现出色。INTP追求思维的清晰性和一致性，对任何不合逻辑的事物都会本能地质疑。' },
      { title: '理论探索精神', content: 'INTP热爱探索理论和抽象概念，他们不仅想知道"是什么"，更想知道"为什么"和"如何运作"。他们对知识的追求是纯粹出于好奇心，而非实用目的。INTP喜欢构建理论模型来解释世界的运作方式，这种思维使他们成为天生的哲学家和科学家。' },
      { title: '独立思考', content: 'INTP不轻易接受他人的观点或权威的说法。他们必须自己验证每一个想法，确保其符合逻辑。这种独立性使他们能够提出创新的解决方案，但也可能导致他们显得固执或不合群。INTP在思考时需要完全的自由和独立。' },
      { title: '创新思维', content: '由于INTP不拘泥于传统思维方式，他们能够提出独特和非传统的解决方案。他们善于连接看似不相关的概念，创造出新的想法。这种创新能力使他们在科学研究、软件开发和战略规划等领域表现出色。' }
    ],
    cognitiveFunctions: [
      { symbol: 'Ti', name: '内向思考', level: '主导', description: 'Ti是INTP的核心认知功能，使他们善于进行逻辑分析和构建内部思维框架。他们追求思维的清晰性和一致性。', detailedDescription: '内向思考让INTP能够构建精密的内部逻辑系统，追求真理和准确性。他们通过分析、分类和定义来理解世界。', characteristics: ['逻辑分析', '精确思维', '分类整理', '真理追求'] },
      { symbol: 'Ne', name: '外向直觉', level: '辅助', description: 'Ne帮助INTP看到多种可能性和新的想法。他们思维发散，喜欢探索各种选项和理论。', detailedDescription: '外向直觉让INTP能够产生新的想法和理论，看到事物之间的隐藏联系和潜在可能性。', characteristics: ['产生想法', '看到联系', '探索可能性', '创新思维'] },
      { symbol: 'Si', name: '内向感觉', level: '第三', description: '第三功能Si使INTP能够回顾过去的经验和细节，虽然这不是他们的强项。', detailedDescription: '内向感觉帮助INTP从过去的经验中学习，关注具体细节和实际事实。', characteristics: ['回顾经验', '关注细节', '实际感知', '传统尊重'] },
      { symbol: 'Fe', name: '外向情感', level: '劣势', description: 'Fe是INTP最不发达的功能，影响着他们对他人情感的理解和回应。', detailedDescription: '外向情感是INTP需要发展的领域，代表着理解他人情感需求和维持和谐关系的能力。', characteristics: ['理解情感', '社交和谐', '同理心', '人际连接'] }
    ],
    traits: [
      { trait: '逻辑分析', explanation: '善于运用逻辑分析复杂问题' },
      { trait: '理论探索', explanation: '喜欢探索理论和抽象概念' },
      { trait: '客观中立', explanation: '能够保持客观，不受偏见影响' },
      { trait: '创新思维', explanation: '善于提出新颖的解决方案' },
      { trait: '独立自主', explanation: '喜欢独立工作，不受约束' }
    ],
    strengthsDetailed: 'INTP拥有卓越的分析能力和创新思维。他们善于从复杂的信息中提取关键逻辑，构建理论模型，并提出创新的解决方案。INTP的独立性和求知欲使他们成为优秀的研究者和问题解决者。他们的思维灵活，能够适应新信息并调整自己的观点。',
    strengths: [
      { title: '逻辑分析', desc: '能够快速分析复杂问题并找出核心', details: 'INTP具有出色的逻辑分析能力，能够迅速识别问题的核心，将复杂问题分解为可管理的部分。', detailsList: ['快速识别逻辑漏洞', '构建精密思维模型', '系统化分析问题', '找到根本原因'], examples: ['解决复杂的技术问题', '优化算法', '识别逻辑漏洞', '设计复杂系统'] },
      { title: '创新思维', desc: '提出独特的解决方案和非传统想法', details: 'INTP善于跳出框架思考，提出创新的想法，连接看似不相关的概念。', detailsList: ['产生新颖想法', '连接不同概念', '挑战传统观念', '创造性问题解决'], examples: ['发明新的方法论', '设计创新产品', '优化系统架构', '提出革命性理论'] },
      { title: '客观中立', desc: '能够保持客观，不受偏见影响', details: 'INTP能够超越个人情感，客观地评估信息和论点，这种能力使他们成为公正的仲裁者。', detailsList: ['超越个人偏见', '公正评估信息', '基于事实判断', '理性决策'], examples: ['学术评审', '技术评估', '争议调解'] },
      { title: '求知欲强', desc: '对知识有着永不满足的渴望', details: 'INTP对知识的追求是纯粹出于好奇心，他们会深入研究感兴趣的领域，成为该领域的专家。', detailsList: ['深入研究', '持续学习', '跨学科探索', '追求真理'], examples: ['成为领域专家', '掌握多种技能', '发表学术成果'] }
    ],
    weaknessesDetailed: 'INTP的挑战主要在于执行力和社交技能。他们可能陷入过度分析的困境，难以做出决定或开始行动。在社交方面，INTP可能显得冷漠或疏离，难以理解他人的情感需求。他们也可能忽视日常事务和细节，专注于抽象思维而忽略现实需求。',
    weaknesses: [
      { title: '社交困难', desc: '可能忽视社交礼仪和他人的情感需求', impact: '在人际关系中显得笨拙、冷漠或疏离，可能导致误解和关系疏远。', solutions: ['学习基本的社交礼仪', '主动参与社交活动', '寻求反馈并改进', '练习情感表达', '学习读懂社交暗示'] },
      { title: '分析瘫痪', desc: '过度分析导致难以做出决定', impact: '陷入无尽的思考循环，无法采取行动，错过机会，项目延期。', solutions: ['设定决策截止日期', '接受不完美', '先行动后完善', '寻求外部意见', '使用决策框架'] },
      { title: '忽视细节', desc: '专注于抽象思维而忽略具体细节', impact: '在实际执行中出错，忽视重要细节，导致项目失败。', solutions: ['使用检查清单', '寻求细节导向的合作伙伴', '定期回顾细节', '练习关注当下'] },
      { title: '拖延倾向', desc: '难以开始和执行计划', impact: '项目延期，错过机会，产生压力和焦虑。', solutions: ['设定小目标和里程碑', '使用时间管理工具', '寻求问责伙伴', '建立固定的工作习惯', '奖励完成任务的自己'] }
    ],
    relationships: {
      romance: {
        title: '恋爱关系',
        desc: 'INTP在恋爱中寻求智力上的刺激和理解。他们需要能够与他们进行深度对话的伴侣，同时也需要大量的个人空间来思考和探索自己的兴趣。INTP可能不擅长表达情感，但他们会通过行动和忠诚来表达爱意。',
        characteristics: ['智力刺激', '独立空间', '深度对话', '忠诚专一', '行动表达'],
        challenges: ['难以表达情感', '可能显得冷漠', '需要大量独处时间', '可能忽视伴侣的情感需求', '容易陷入自己的世界'],
        advice: ['学习表达情感', '主动关心伴侣', '平衡理性与感性', '定期沟通感受', '创造共同体验']
      },
      friendship: {
        title: '友谊关系',
        desc: 'INTP喜欢与能够进行深度对话的朋友交往。他们不追求广泛的社交圈子，而是看重少数几个能够进行智力交流的朋友。INTP朋友忠诚且可靠，虽然他们不善言辞，但会认真倾听并提供有价值的建议。',
        characteristics: ['知识分享', '深度交流', '忠诚可靠', '有价值的建议', '真诚相待'],
        challenges: ['社交圈子小', '可能显得疏离', '不善闲聊', '主动联系较少', '可能忽视日常维护'],
        advice: ['主动联系朋友', '参与社交活动', '练习闲聊技巧', '定期聚会', '表达感激之情']
      },
      parenting: {
        title: '亲子关系',
        desc: 'INTP父母鼓励孩子的好奇心和独立探索。他们善于回答孩子的"为什么"问题，并引导孩子发展批判性思维。然而，INTP父母可能需要努力表达情感，参与孩子的情感世界。',
        characteristics: ['鼓励探索', '知识引导', '理性教育', '培养独立性', '耐心解答'],
        challenges: ['情感表达不足', '可能过于理性', '难以理解孩子的情感需求', '可能忽视日常照顾', '可能期望过高'],
        advice: ['多表达情感', '参与孩子的活动', '学习倾听感受', '平衡理性与感性', '给予无条件的爱']
      }
    },
    career: {
      title: '职业发展',
      desc: 'INTP在需要分析能力、创新思维和独立工作的职业中表现出色。他们适合需要解决复杂问题、探索理论和创造新知识的领域。',
      suitable: ['软件工程师/架构师', '数据科学家', '研究员/科学家', '作家/哲学家', '大学教授', '战略顾问', '系统分析师'],
      suitableDetails: [
        { career: '软件工程师/架构师', reason: '需要逻辑思维和系统设计能力，INTP善于构建复杂的软件架构' },
        { career: '数据科学家', reason: '需要分析大量数据并发现模式，符合INTP的分析天赋' },
        { career: '研究员/科学家', reason: '允许INTP深入探索感兴趣的领域，追求知识本身' },
        { career: '大学教授', reason: '结合研究和教学，INTP可以深入探讨理论并培养下一代思想家' }
      ],
      unsuitable: ['高压销售', '客服代表', '行政助理', '需要大量社交的工作', '重复性体力劳动'],
      workStyle: 'INTP喜欢独立工作，有充足的时间思考和分析。他们需要自由来探索自己的想法，不受严格的流程和deadline约束。',
      workStyleDetailed: 'INTP偏好安静、不受打扰的环境，能够专注于复杂的思维任务。他们不喜欢频繁的会议、严格的层级结构和过多的行政事务。INTP在能够自主安排工作时间、深入探索感兴趣的项目时表现最佳。他们需要空间来思考和实验，而不是被 micromanagement。',
      workStyleDetails: ['独立工作', '灵活时间安排', '深入专注时间', '最少会议干扰', '自主决策权'],
      workEnvironment: '安静、私密的办公空间，允许独立工作和深度思考',
      idealEnvironment: ['安静的私人办公室', '灵活的工作时间', '最少会议', '自主权', '学习资源'],
      leadershipStyle: 'INTP领导者偏好放权式的领导风格，给予团队成员自主权。他们通过逻辑和理性说服他人，而不是权威。他们可能不擅长处理情感问题或提供情感支持。',
      teamworkStyle: 'INTP在团队中更喜欢作为专家贡献者，而不是协调者。他们提供深入的分析和创新的想法，但可能不喜欢团队决策过程或处理人际关系问题。'
    },
    growth: {
      opportunities: ['情感表达', '执行力', '社交技能', '细节关注', '时间管理'],
      opportunitiesDetailed: [
        { area: '情感智能', desc: '发展理解和管理自己及他人情感的能力', actions: ['学习情感词汇', '练习表达感受', '寻求反馈', '阅读相关书籍'] },
        { area: '执行力', desc: '提高将想法转化为行动的能力', actions: ['使用番茄工作法', '设定小目标', '建立问责制', '接受不完美'] },
        { area: '社交技能', desc: '改善人际关系和沟通能力', actions: ['参加社交活动', '练习闲聊', '主动倾听', '学习非语言沟通'] }
      ],
      actions: ['设定截止日期并遵守', '练习情感表达', '参与团队活动', '关注具体细节', '使用时间管理工具'],
      detailedAdvice: 'INTP需要发展执行力和社交技能，同时保持其分析优势。关键是找到平衡点：既要有足够的独处时间进行深度思考，又要积极参与社交活动。INTP应该设定具体的目标和截止日期来克服拖延，同时学习表达情感和关注他人的需求。发展劣势功能外向情感(Fe)将帮助INTP建立更深厚的人际关系。',
      longTermGoals: ['成为领域专家', '建立深厚的人际关系', '提高执行力和生产力', '发展情感智能', '平衡理论与实践']
    },
    stress: {
      triggers: ['社交压力', '缺乏独处时间', '情感冲突', '严格的时间压力', '重复性无聊工作', '被 micromanagement'],
      signs: ['退缩孤立', '过度分析', '失眠', '情绪波动', '难以集中注意力', '身体不适'],
      coping: ['独处充电', '阅读学习', '运动锻炼', '写作思考', '冥想放松', '与理解自己的人交流'],
      detailedAdvice: '当INTP感到压力时，最重要的是获得独处时间来处理信息和充电。他们应该避免过度的社交活动和情感冲突。通过阅读、写作或从事智力活动来放松对INTP很有效。定期运动也有助于缓解压力。INTP应该学会识别压力迹象，并在情况恶化之前采取行动。'
    },
    famousPeople: [
      { name: '爱因斯坦', title: '物理学家' },
      { name: '比尔·盖茨', title: '企业家' },
      { name: '查尔斯·达尔文', title: '生物学家' },
      { name: '拉里·佩奇', title: '企业家' }
    ]
  },
  // 为节省空间，其余14种类型使用模板生成
  ENTJ: {
    type: 'ENTJ',
    name: '指挥官',
    nameEn: 'Commander',
    category: 'analysts',
    categoryEn: 'Analysts',
    tagline: '大胆、富有想象力的领导者',
    slogan: '天生的领导者，充满魅力和信心',
    description: 'ENTJ是天生的领导者，他们果断、自信，善于组织和激励他人。',
    detailedDescription: `ENTJ是天生的领导者，他们拥有非凡的组织能力和战略眼光。作为外向、直觉、思考、判断型的人格，ENTJ善于看到大局，制定长期计划，并带领团队实现目标。ENTJ具有强大的自信心和决断力，他们不惧怕挑战，反而在压力下表现出色。他们善于分析复杂问题，找出最有效的解决方案。ENTJ喜欢掌控局面，对低效和混乱零容忍。在人际关系中，ENTJ直接而坦诚，有时可能显得过于强势。他们重视能力和成就，期望自己和他人都能达到最高标准。ENTJ需要学会更多地关注他人的情感需求，而不仅仅是效率。`,
    traits: [{ trait: '领导力', explanation: '善于领导和激励团队' }, { trait: '果断', explanation: '能够快速做决定' }, { trait: '战略思维', explanation: '善于制定长期计划' }],
    traitsDetailed: [
      { title: "天生的领导力", content: "ENTJ具有与生俱来的领导气质，能够自然地激励和引导他人。他们善于设定愿景，制定战略，并推动团队实现目标。ENTJ的自信果断使他们在任何群体中都容易成为焦点。" },
      { title: "战略思维", content: "ENTJ擅长长远规划，能够看到事物的全貌和发展趋势。他们善于将复杂问题分解为可执行的计划，并预见可能的挑战。这种战略眼光使他们在商业和管理领域表现出色。" },
      { title: "高效执行", content: "ENTJ不仅善于规划，更善于执行。他们注重结果，追求效率，能够快速识别问题并采取行动。ENTJ讨厌拖延和借口，总是寻找最直接有效的解决方案。" }
    ],
    cognitiveFunctions: [
      { symbol: 'Te', name: '外向思考', level: '主导', description: 'ENTJ的主导功能是外向思考，这使他们善于组织、规划和决策。他们追求效率和结果，喜欢建立系统和流程。', detailedDescription: '外向思考让ENTJ能够高效组织资源、制定策略，并以逻辑和客观的方式解决问题。', characteristics: ['逻辑分析', '效率导向', '客观决策', '系统组织'] },
      { symbol: 'Ni', name: '内向直觉', level: '辅助', description: '辅助功能内向直觉帮助ENTJ看到未来的可能性和潜在的模式。这使他们具有战略眼光，能够预见趋势。', detailedDescription: '内向直觉帮助ENTJ洞察深层意义，形成对未来可能性的深刻洞察。', characteristics: ['洞察本质', '预见趋势', '模式识别', '整体思维'] },
      { symbol: 'Se', name: '外向感觉', level: '第三', description: '第三功能外向感觉使ENTJ能够关注当下的现实，采取行动并享受物质世界。', detailedDescription: '外向感觉让ENTJ能够关注当下的具体细节和感官体验。', characteristics: ['当下感知', '具体细节', '感官体验', '现实关注'] },
      { symbol: 'Fi', name: '内向情感', level: '劣势', description: '劣势功能内向情感使ENTJ可能忽视个人价值观和情感需求，需要刻意发展。', detailedDescription: '内向情感是ENTJ需要发展的领域，代表着对个人价值观和真实自我的关注。', characteristics: ['内在价值', '个人信念', '道德判断', '真实自我'] }
    ],
    strengths: [
      { title: '领导力', desc: '能够激励和引导团队', detailsList: ["天生的领导气质", "善于设定愿景", "能够推动团队实现目标", "在压力下保持冷静"], examples: ["成功领导团队完成重大项目", "在危机时刻果断决策"] },
      { title: '战略思维', desc: '善于制定和执行计划', detailsList: ["看到大局和趋势", "制定长期规划", "预见潜在挑战", "将复杂问题分解"], examples: ["制定公司五年发展战略", "识别市场机会并采取行动"] }
    ],
    strengthsDetailed: "ENTJ是天生的领导者和战略家，他们拥有强大的组织能力、决策力和执行力。ENTJ善于激励团队，设定高标准，并推动组织向前发展。他们的自信和果断在危机时刻尤其宝贵。",
    weaknesses: [{ title: '过于强势', desc: '可能忽视他人感受', impact: "可能疏远团队成员，造成关系紧张", solutions: ["练习倾听", "寻求反馈", "表达赞赏"] }],
    weaknessesDetailed: "ENTJ可能过于强势和专断，忽视他人的情感需求。他们对效率的执着可能使他们显得不耐烦，对不符合标准的人缺乏耐心。ENTJ需要学会倾听、同理和适度放松。",
    relationships: {
      romance: {
        title: '恋爱关系',
        desc: 'ENTJ在恋爱中寻求平等和尊重。他们是忠诚的伴侣，会为关系的成功投入大量精力。需要伴侣能够理解他们的野心，并在事业上给予支持。ENTJ重视诚实和直接的沟通。',
        characteristics: ['追求平等关系', '重视诚实沟通', '忠诚投入', '期望伴侣支持事业', '直接表达需求'],
        challenges: ['可能过于强势', '情感表达不足', '工作优先于关系', '对伴侣期望过高'],
        advice: ['学习倾听伴侣需求', '平衡工作与家庭', '表达情感支持', '给予伴侣空间'],
        compatibility: [{ type: 'INTP', desc: '智力上的互补' }, { type: 'INFJ', desc: '情感与理性的平衡' }]
      },
      friendship: {
        title: '友谊关系',
        desc: 'ENTJ喜欢与有野心和目标的人交往。在友谊中寻求互相成长的机会，喜欢与能够激发他们思维的朋友在一起。',
        characteristics: ['选择有目标的朋友', '互相成长', '厌恶肤浅社交', '可靠务实'],
        challenges: ['社交圈子有限', '可能显得过于直接', '不善于闲聊'],
        advice: ['拓展社交圈', '学习闲聊技巧', '主动联系朋友']
      },
      parenting: {
        title: '亲子关系',
        desc: 'ENTJ父母培养孩子的独立性和责任感。重视教育，会为孩子提供最好的资源。',
        characteristics: ['重视教育', '培养独立性', '设定高标准', '提供资源支持'],
        challenges: ['可能过于严苛', '情感表达不足', '期望过高'],
        advice: ['给予孩子犯错自由', '多表达爱意', '理解孩子的独特性']
      }
    },
    career: {
      title: '职业发展',
      desc: 'ENTJ在管理和领导职位中表现出色。',
      suitable: ['首席执行官', '企业家', '管理顾问', '律师', '投资银行家', '项目经理', '军官', '政治家', '法官', '创业者'],
      suitableDetails: [
        { career: "高层管理", reason: "ENTJ天生的领导才能使他们成为出色的CEO和高级管理者，能够制定战略并带领组织实现目标。" },
        { career: "创业", reason: "ENTJ的远见和执行力使他们成为成功的创业者，能够识别机会并建立成功的企业。" },
        { career: "咨询", reason: "管理咨询适合ENTJ的分析能力和战略思维，他们能够帮助客户解决复杂问题。" },
        { career: "法律", reason: "律师职业需要ENTJ的逻辑思维和辩论能力，他们能够在法庭上有效辩护。" },
        { career: "金融", reason: "投资银行需要ENTJ的决策力和风险评估能力，适合他们的快节奏工作环境。" }
      ],
      unsuitable: ['重复性行政工作', '高度孤立的研究', '需要极度耐心的照料工作'],
      workStyle: 'ENTJ喜欢掌控全局，带领团队实现目标。',
      workStyleDetailed: "ENTJ在快节奏、充满挑战的环境中表现最佳。他们喜欢有权威和影响力，能够制定政策并看到成果。ENTJ需要有一定自由度来实施他们的想法。",
      workStyleDetails: ["喜欢设定清晰的目标和期限", "善于组织团队资源", "追求高效和结果导向", "喜欢解决复杂问题", "善于做出艰难决策", "在压力下表现更佳"],
      workEnvironment: "ENTJ适合有明确层级、追求卓越的职场环境。他们喜欢与能力出众的同事合作，厌恶办公室政治和拖延。",
      idealEnvironment: ["有明确的权力结构和晋升通道", "重视能力和成果", "允许自主决策", "快节奏和充满挑战", "与高素质团队合作", "能够看到实际成果"],
      leadershipStyle: "ENTJ是愿景型领导者，他们设定高标准，激励团队追求卓越。他们直接、坦诚，期望效率和忠诚。ENTJ在危机时刻能够果断决策。",
      teamworkStyle: "ENTJ在团队中通常担任领导角色，他们喜欢设定方向并确保执行。ENTJ重视贡献，对不努力的成员缺乏耐心。"
    },
    growth: {
      opportunities: ['耐心', '情感智能', '倾听', '接受不完美'],
      opportunitiesDetailed: [{area: "耐心", desc: "学会放慢节奏，给他人更多时间适应变化", actions: ["练习等待", "给予他人时间", "降低急躁"] }, {area: "情感智能", desc: "发展对他人情感需求的敏感度，建立更深连接", actions: ["学习情感表达", "培养同理心", "关注他人感受"] }, {area: "倾听", desc: "在决策前更多倾听不同观点，避免过于武断", actions: ["主动倾听", "寻求反馈", "保持开放心态"] }, {area: "接受不完美", desc: "理解不是所有事情都能完全控制", actions: ["设定合理标准", "欣赏进展", "放手控制"] }],
      actions: ['倾听他人', '放慢节奏', '表达赞赏', '寻求反馈'],
      detailedAdvice: "ENTJ在追求目标的同时，需要关注人际关系的质量。学会欣赏他人的不同方式，给予情感支持，将使ENTJ成为更全面的领导者和更快乐的人。定期反思自己的情感状态，培养工作之外的生活平衡。",
      longTermGoals: ["成为更富有同理心的领导者", "建立深厚的人际关系", "实现事业与生活的平衡", "培养非工作兴趣"]
    },
    stress: {
      triggers: ['失去控制', '低效和混乱', '无能的团队成员', '无法实现目标'],
      triggersDetailed: [{trigger: "失去控制", explanation: "当ENTJ感到失去对局面的控制时会感到压力"}, {trigger: "低效混乱", explanation: "低效的工作流程和混乱的环境让ENTJ抓狂"}, {trigger: "能力不足", explanation: "与能力不足的团队合作是ENTJ的主要压力源"}],
      signs: ['急躁', '易怒', '控制欲增强', '忽视他人感受'],
      signsDetailed: [{ stage: "早期", signs: ["不耐烦增加", "对他人的批评增加"] }, { stage: "中度", signs: ["变得专断", "控制欲强"] }, { stage: "严重", signs: ["情绪爆发", "身心耗竭"] }],
      coping: ['运动', '规划', '寻求控制感', '独处反思'],
      copingDetailed: [{ method: "体育锻炼", steps: ["定期运动", "释放压力", "保持能量"] }, { method: "重新组织", steps: ["优化工作流程", "恢复控制感", "设定优先级"] }, { method: "独处反思", steps: ["花时间独处", "重新聚焦", "调整目标"] }]
    },
    famousPeople: [
      { name: '史蒂夫·乔布斯', title: '企业家', contribution: "苹果联合创始人，改变了科技产业", traits: ["完美主义", "创新驱动"] },
      { name: '拿破仑·波拿巴', title: '军事家', contribution: "战略天才，改变了欧洲历史", traits: ["战略眼光", "果断决策"] },
      { name: '玛格丽特·撒切尔', title: '政治家', contribution: "英国首位女首相，铁娘子", traits: ["坚定意志", "改革精神"] },
      { name: '戈登·拉姆齐', title: '厨师', contribution: "米其林星级主厨，电视名人", traits: ["追求卓越", "高标准"] }
    ]
  },
  ENTP: {
    type: 'ENTP', name: '辩论家', nameEn: 'Debater', category: 'analysts', categoryEn: 'Analysts', tagline: '聪明好奇的思想者', slogan: '喜欢智力挑战，善于发现可能性',
    description: 'ENTP是充满好奇心和创造力的思想家，他们喜欢探索新想法和挑战现状。',
    detailedDescription: `ENTP是机智、创新且充满好奇心的思想家。作为外向、直觉、思考、感知型的人格，ENTP喜欢探索新想法、挑战传统观念，并以独特的方式看待世界。他们天生是辩论家，喜欢智力上的挑战和讨论。ENTP思维敏捷，能够迅速看到多种可能性和角度。他们厌倦常规和重复，总是在寻找新的刺激和挑战。ENTP富有创造力，善于发现系统中的漏洞和改进机会。然而，他们可能缺乏执行力和持久性，容易在项目完成前就转向新的兴趣。在人际关系中，ENTP风趣幽默，喜欢智力交流，但可能显得不够情感化。`,
    traits: [{ trait: '创新', explanation: '善于提出新想法' }, { trait: '辩论', explanation: '喜欢智力辩论' }],
    traitsDetailed: [
      { title: "创新思维", content: "ENTP具有非凡的创造力，善于发现新的可能性和角度。他们喜欢挑战传统思维，提出创新解决方案。ENTP的头脑 constantly generating new ideas." },
      { title: "机智辩论", content: "ENTP是天生的辩论家，他们享受智力上的交锋。他们能够迅速看到逻辑漏洞，并以巧妙的方式表达观点。ENTP喜欢挑战他人的想法，包括他们自己的。" },
      { title: "适应力强", content: "ENTP能够快速适应变化和新环境。他们灵活多变，善于在不确定性中找到机会。ENTP很少被既定规则束缚，总是寻找新的方法。" }
    ],
    cognitiveFunctions: [
      { symbol: 'Ne', name: '外向直觉', level: '主导', description: 'ENTP的主导功能是外向直觉，这使他们善于看到可能性和模式。他们思维发散，喜欢探索各种选项。', detailedDescription: '外向直觉让ENTP能够看到多种可能性和新的想法。', characteristics: ['看到可能性', '思维发散', '探索选项', '创新思维'] },
      { symbol: 'Ti', name: '内向思考', level: '辅助', description: '辅助功能内向思考帮助ENTP分析和理解复杂的系统和概念。他们追求逻辑一致性。', detailedDescription: '内向思考让ENTP能够进行深入的分析和理解。', characteristics: ['逻辑分析', '系统理解', '追求真理', '概念化'] },
      { symbol: 'Fe', name: '外向情感', level: '第三', description: '第三功能外向感觉使ENTP能够理解和影响他人的情感，虽然这不是他们的强项。', detailedDescription: '外向情感让ENTP能够理解和回应他人的情感需求。', characteristics: ['理解情感', '社交和谐', '影响他人', '同理心'] },
      { symbol: 'Si', name: '内向感觉', level: '劣势', description: '劣势功能内向感觉使ENTP可能忽视细节和过去的经验，需要刻意关注。', detailedDescription: '内向感觉是ENTP需要发展的领域，代表着对细节和经验的关注。', characteristics: ['细节关注', '经验学习', '传统尊重', '具体感知'] }
    ],
    strengths: [
      { title: '创新思维', desc: '善于发现新可能性', detailsList: ["看到多种可能性", "挑战传统观念", "提出创新解决方案", "发现系统漏洞"], examples: ["提出颠覆性的商业模式", "在辩论中找到关键漏洞"] }
    ],
    strengthsDetailed: "ENTP是创新者和思想家，他们拥有非凡的创造力和分析能力。ENTP善于看到新的可能性和角度，能够提出创新的解决方案。他们的机智和幽默使他们成为有趣的伙伴。",
    weaknesses: [{ title: '缺乏专注', desc: '容易分心', impact: "可能无法完成已经开始的项目", solutions: ["设定明确目标", "使用待办清单", "寻找问责伙伴"] }],
    weaknessesDetailed: "ENTP可能缺乏持久性和执行力，容易在项目完成前就转向新的兴趣。他们可能过于挑战权威，有时会显得好辩或不切实际。ENTP需要学会专注和完成项目。",
    relationships: {
      romance: {
        title: '恋爱关系',
        desc: 'ENTP在恋爱中寻求智力刺激。他们喜欢与伴侣进行深入的讨论和辩论。ENTP需要学会更多地关注情感需求，而不仅仅是智力交流。',
        characteristics: ['寻求智力连接', '喜欢辩论讨论', '需要情感关注', '智力交流重要'],
        challenges: ['情感表达不足', '可能显得好辩', '关注智力多于情感'],
        advice: ['学习情感表达', '关注伴侣情感需求', '平衡智力与情感'],
        compatibility: [{ type: 'INFJ', desc: '深度与创新的结合' }, { type: 'INTJ', desc: '智力上的挑战' }]
      },
      friendship: {
        title: '友谊关系',
        desc: 'ENTP喜欢与聪明、有趣的朋友在一起。他们喜欢智力上的交流和挑战。ENTP可能朋友众多，但深度友谊较少。',
        characteristics: ['喜欢智力交流', '朋友众多', '派对的灵魂', '带来乐趣'],
        challenges: ['深度友谊较少', '可能显得不耐烦'],
        advice: ['培养深度友谊', '倾听朋友需求']
      },
      parenting: {
        title: '亲子关系',
        desc: 'ENTP父母鼓励孩子探索世界、提出问题、挑战权威。他们培养孩子的创造力和批判性思维。',
        characteristics: ['鼓励探索', '培养创造力', '支持批判思维', '挑战权威'],
        challenges: ['可能缺乏稳定结构', '界限不清晰'],
        advice: ['提供稳定结构', '设立清晰界限']
      }
    },
    career: {
      title: '职业发展', desc: 'ENTP在需要创新和适应性的职业中表现出色。',
      suitable: ['企业家', '律师', '顾问', '发明家', '记者', '创意总监', '风险投资家', '脱口秀主持人', '产品经理', '战略顾问'],
      suitableDetails: [
        { career: "创业", reason: "ENTP的创新思维和冒险精神使他们成为天生的创业者。他们善于识别机会，提出独特解决方案。" },
        { career: "法律", reason: "律师职业需要ENTP的辩论能力和分析思维。他们能够在法庭上有效辩护，找到法律漏洞。" },
        { career: "咨询", reason: "战略咨询适合ENTP的创新思维和问题解决能力。他们能够帮助客户看到新的可能性。" },
        { career: "创意", reason: "创意总监等职位需要ENTP的创新思维和概念化能力。" }
      ],
      unsuitable: ['重复性工作', '高度结构化环境', '需要极度耐心的工作'],
      workStyle: 'ENTP喜欢灵活和多样化的工作。',
      workStyleDetailed: "ENTP在允许创新和自由的环境中表现最佳。他们需要智力上的刺激，厌恶重复和常规。ENTP喜欢解决复杂问题，但可能缺乏完成细节工作的耐心。",
      workStyleDetails: ["喜欢多样化的任务", "需要智力刺激", "善于头脑风暴", "快速适应变化", "喜欢解决复杂问题", "可能缺乏持久性"],
      workEnvironment: "ENTP适合灵活、创新的工作环境。他们需要自由度来探索新想法，不喜欢严格的规则和层级。",
      idealEnvironment: ["允许创新和实验", "提供智力挑战", "灵活的工作安排", "开放的沟通文化", "容忍失败", "鼓励新想法"],
      leadershipStyle: "ENTP是创新型领导者，他们提出新想法，激发团队创造力。他们灵活多变，但可能缺乏执行力。ENTP需要学会关注细节和完成项目。",
      teamworkStyle: "ENTP在团队中贡献创新想法，喜欢头脑风暴。他们可能显得不耐烦，对常规流程缺乏兴趣。ENTP需要学会尊重团队流程。"
    },
    growth: {
      opportunities: ['专注力', '执行力', '情感表达', '细节关注'],
      opportunitiesDetailed: [{area: "专注力", desc: "学会专注和完成项目，避免不断转向新兴趣", actions: ["设定明确目标", "使用待办清单", "寻找问责伙伴"] }, {area: "执行力", desc: "培养执行力和持久性，将想法转化为现实", actions: ["分解任务", "设定截止日期", "跟踪进度"] }, {area: "情感智能", desc: "学会更多地关注自己和他人的情感需求", actions: ["练习情感表达", "培养同理心", "倾听他人"] }, {area: "细节关注", desc: "关注细节和实际执行，而不只是概念", actions: ["检查细节", "制定计划", "执行落地"] }],
      actions: ['设定优先级', '完成项目', '练习专注', '建立常规'],
      detailedAdvice: "ENTP拥有非凡的创造力，但需要学会专注和完成。设定明确的目标和期限，寻找问责伙伴。同时，培养情感智能，学会倾听和同理。",
      longTermGoals: ["完成并发布一个重要项目", "建立深度人际关系", "发展情感智能", "找到创新与实际执行的平衡"]
    },
    stress: {
      triggers: ['单调', '限制', '缺乏刺激', '无法实现想法'],
      triggersDetailed: [{trigger: "单调重复", explanation: "重复和单调的工作让ENTP感到窒息"}, {trigger: "限制束缚", explanation: "严格限制和缺乏自由度"}, {trigger: "缺乏刺激", explanation: "没有新的智力挑战或刺激"}],
      signs: ['焦躁', '冲动', '好辩', '逃避责任'],
      signsDetailed: [{ stage: "早期", signs: ["焦躁不安", "频繁换话题"] }, { stage: "中度", signs: ["变得好辩", "挑衅"] }, { stage: "严重", signs: ["逃避责任", "冲动决定"] }],
      coping: ['新挑战', '社交', '头脑风暴', '改变环境'],
      copingDetailed: [{ method: "新挑战", steps: ["寻找智力挑战", "开始新项目", "探索新领域"] }, { method: "社交活动", steps: ["与朋友聚会", "有趣的对话", "社交互动"] }, { method: "头脑风暴", steps: ["释放创造力", "讨论想法", "探索可能性"] }]
    },
    famousPeople: [
      { name: '托马斯·爱迪生', title: '发明家', contribution: "发明了电灯等重要发明", traits: ["创新", "坚持"] },
      { name: '马克·吐温', title: '作家', contribution: "伟大的美国作家和幽默家", traits: ["机智", "批判"] },
      { name: '莱昂纳多·达·芬奇', title: '艺术家', contribution: "文艺复兴时期的天才", traits: ["多才多艺", "好奇"] },
      { name: '巴拉克·奥巴马', title: '政治家', contribution: "美国前总统，演说家", traits: ["魅力", "智慧"] }
    ]
  },
  INFJ: {
    type: 'INFJ',
    name: '提倡者',
    nameEn: 'Advocate',
    category: 'diplomats',
    categoryEn: 'Diplomats',
    tagline: '安静而有理想主义者',
    slogan: '追求意义和目的，致力于帮助他人',
    description: 'INFJ是理想主义者和有同情心的人，他们寻求意义和目的。',
    detailedDescription: 'INFJ是最稀有的人格类型之一，他们是理想主义者，拥有深刻的洞察力和强烈的同情心。作为内向、直觉、情感、判断型的人格，INFJ能够理解他人的深层需求和情感。他们寻求意义和目的，致力于帮助他人和让世界变得更好。INFJ富有创造力和想象力，常常有独特的见解和愿景。他们重视真实性和深度，厌恶肤浅和虚伪。INFJ需要独处时间来充电和反思，但他们也关心他人，愿意为他人付出。在人际关系中，INFJ寻求深度和真实性，他们是忠诚的伴侣和朋友。',
    traits: [
      { trait: '理想主义', explanation: '追求有意义的目标' },
      { trait: '同理心', explanation: '深刻理解他人感受' }
    ],
    traitsDetailed: [
      { title: '深刻洞察力', content: 'INFJ拥有非凡的洞察力，能够理解他人表面之下的真实情感和需求。他们善于倾听，能够感知他人的痛苦和快乐。这种深刻的理解使INFJ成为优秀的心理咨询师和顾问。' },
      { title: '理想主义', content: 'INFJ是真正的理想主义者，他们追求有意义的目标，致力于让世界变得更好。他们相信人性本善，努力帮助他人实现潜能。INFJ的愿景常常超越当下，着眼于长远的影响。' },
      { title: '创造力', content: 'INFJ拥有丰富的内心世界和强大的创造力。他们善于通过艺术、写作或其他形式表达复杂的情感和想法。INFJ的创造力常常带有深刻的意义和象征。' }
    ],
    cognitiveFunctions: [
      { symbol: 'Ni', name: '内向直觉', level: '主导', description: 'INFJ的主导功能是内向直觉，这使他们善于看到模式、意义和未来的可能性。他们能够整合信息，形成深刻的洞察。', detailedDescription: '内向直觉是INFJ最强大的认知工具，它允许他们从潜意识层面处理信息，形成对未来可能性的深刻洞察。', characteristics: ['洞察本质', '预见趋势', '模式识别', '整体思维'] },
      { symbol: 'Fe', name: '外向情感', level: '辅助', description: '辅助功能外向情感帮助INFJ理解和回应他人的情感需求。他们富有同情心，善于创造和谐的人际关系。', detailedDescription: '外向情感让INFJ能够理解和回应他人的情感需求，创造和谐的人际关系。', characteristics: ['理解情感', '社交和谐', '同理心', '人际连接'] },
      { symbol: 'Ti', name: '内向思考', level: '第三', description: '第三功能内向思考使INFJ能够进行逻辑分析，追求内在的真理和一致性。', detailedDescription: '内向思考让INFJ能够进行独立的逻辑分析，追求内在的真理。', characteristics: ['逻辑分析', '内在真理', '独立思考', '概念理解'] },
      { symbol: 'Se', name: '外向感觉', level: '劣势', description: '劣势功能外向感觉使INFJ可能忽视当下的感官体验和具体细节。', detailedDescription: '外向感觉是INFJ最不发达的功能，影响着他们对当下具体细节的感知。', characteristics: ['当下感知', '具体细节', '感官体验', '现实关注'] }
    ],
    strengths: [
      { title: '洞察力', desc: '理解他人深层需求', detailsList: ['感知他人的情感和动机', '理解复杂的情感动态', '提供有意义的建议', '创造深度连接'], examples: ['准确预测他人的反应', '帮助朋友解决深层问题'] },
      { title: '同理心', desc: '深刻理解他人', detailsList: ['感受他人情感', '提供情感支持', '理解不同视角', '创造安全空间'], examples: ['安慰痛苦的朋友', '调解人际冲突'] }
    ],
    strengthsDetailed: 'INFJ拥有深刻的洞察力、创造力和强烈的同情心。他们能够理解他人的深层需求，提供有意义的支持。INFJ致力于让世界变得更好，他们的存在常常给周围的人带来积极的影响。',
    weaknesses: [
      { title: '过度敏感', desc: '容易受伤和沮丧', impact: '可能因为批评而深受伤害', solutions: ['发展情绪韧性', '区分建设性批评', '练习自我关怀'] },
      { title: '完美主义', desc: '对自己和他人期望过高', impact: '可能导致拖延和不满', solutions: ['接受不完美', '设定现实目标', '庆祝小进步'] }
    ],
    weaknessesDetailed: 'INFJ可能过于敏感，容易受伤。他们的完美主义倾向可能导致拖延和不满。INFJ有时会为了避免冲突而压抑自己的需求，长期可能导致身心耗竭。他们需要学会设立界限，保护自己的能量。',
    relationships: {
      romance: {
        title: '恋爱关系',
        desc: 'INFJ在恋爱中寻求深度连接。他们不是随便投入关系的人，一旦承诺就会非常忠诚。',
        characteristics: ['追求深度真实', '重视意义', '忠诚专一', '需要理解支持'],
        challenges: ['可能过于敏感', '难以表达需求', '期望过高'],
        advice: ['学习表达需求', '接受伴侣不完美', '保持沟通'],
        compatibility: [{ type: 'ENTP', desc: '智力与情感的互补' }, { type: 'ENFP', desc: '共同的理想主义' }]
      },
      friendship: {
        title: '友谊关系',
        desc: 'INFJ重视深度友谊。',
        characteristics: ['重视质量', '深度交流', '忠诚可靠'],
        challenges: ['社交圈子小', '难以维护广泛友谊'],
        advice: ['珍惜深层友谊', '适度拓展社交']
      },
      parenting: {
        title: '亲子关系',
        desc: 'INFJ父母培养孩子的同理心。',
        characteristics: ['重视教育', '培养同理心', '支持成长'],
        challenges: ['可能过于保护', '期望过高'],
        advice: ['给孩子空间', '接受孩子独特性']
      }
    },
    career: {
      title: '职业发展',
      desc: 'INFJ在帮助他人的职业中表现出色。',
      suitable: ['心理咨询师', '作家', '教师'],
      suitableDetails: [
        { career: '心理咨询', reason: 'INFJ的洞察力和同理心使他们成为优秀的心理咨询师。' },
        { career: '写作', reason: '写作允许INFJ表达他们的内心世界和深刻见解。' }
      ],
      unsuitable: ['高压销售'],
      workStyle: 'INFJ喜欢有意义的工作，能够帮助他人。',
      workStyleDetailed: 'INFJ在能够发挥其创造力和洞察力的环境中表现最佳。他们需要工作的意义和目的，不仅仅是为了薪水。',
      workStyleDetails: ['追求有意义的目标', '重视深度而非广度', '喜欢独立工作'],
      workEnvironment: 'INFJ适合安静、和谐、有意义的工作环境。',
      idealEnvironment: ['安静和私密的空间', '支持性的同事', '有意义的目标'],
      leadershipStyle: 'INFJ是愿景型领导者，他们通过启发和激励来领导。',
      teamworkStyle: 'INFJ在团队中贡献深度洞察和创造性想法。'
    },
    growth: {
      opportunities: ['自我保护', '现实感'],
      opportunitiesDetailed: [{area: "自我保护", desc: "学会设立健康的界限，保护自己不被他人的需求淹没", actions: ["学习说'不'", "设立边界", "优先照顾自己"]}, {area: "现实感", desc: "接受不完美，理解不是所有事情都能达到理想状态", actions: ["设定现实目标", "接受局限", "欣赏进步"]}],
      actions: ['设立界限', '接受不完美'],
      detailedAdvice: 'INFJ在追求帮助他人的同时，不要忽视自己的需求。学会设立界限，保护自己的能量。接受不完美，理解成长是一个过程。',
      longTermGoals: ['成为有影响力的变革者', '建立深度有意义的关系']
    },
    stress: {
      triggers: ['冲突', '忽视'],
      triggersDetailed: [{trigger: "人际冲突", explanation: "人际冲突和紧张关系让INFJ感到压力"}, {trigger: "被忽视", explanation: "感觉自己的努力被忽视或不被赏识"}],
      signs: ['退缩', '情绪爆发'],
      signsDetailed: [{stage: "早期", signs: ["想要独处", "情绪敏感增加"]}, {stage: "中度", signs: ["易怒", "情绪低落"]}],
      coping: ['独处', '创作'],
      copingDetailed: [{method: "独处", steps: ["花时间独处", "恢复能量", "反思整理"]}, {method: "创作", steps: ["写作表达", "艺术创作", "情感宣泄"]}]
    },
    famousPeople: [
      { name: '马丁·路德·金', title: '民权领袖' },
      { name: '特蕾莎修女', title: '慈善家' }
    ]
  },
  INFP: {
    type: 'INFP',
    name: '调停者',
    nameEn: 'Mediator',
    category: 'diplomats',
    categoryEn: 'Diplomats',
    tagline: '富有诗意的利他者',
    slogan: '寻求和谐与意义，重视真实',
    description: 'INFP是理想主义者和梦想家，他们寻求生活的意义和真实性。',
    detailedDescription: 'INFP是温柔、理想主义和富有创造力的灵魂。作为内向、直觉、情感、感知型的人格，INFP拥有丰富的内心世界和强烈的价值观。他们寻求真实性和意义，厌恶虚伪和表面。INFP富有同情心，能够理解他人的痛苦，并努力让世界变得更美好。他们是天生的艺术家，通过创作表达自己的内心世界。INFP重视个人成长和真实性，努力按照自己的价值观生活。在人际关系中，INFP寻求深度和真诚，他们是忠诚和支持性的伴侣和朋友。',
    traits: [
      { trait: '理想主义', explanation: '追求美好的愿景' },
      { trait: '创造力', explanation: '富有艺术天赋' }
    ],
    traitsDetailed: [
      { title: '理想主义', content: 'INFP是真正的理想主义者，他们相信世界可以变得更好，并努力按照自己的价值观生活。他们追求真实性和意义，不会被物质成功所诱惑。' },
      { title: '创造力', content: 'INFP拥有丰富的想象力和艺术天赋。他们善于通过写作、艺术、音乐等方式表达复杂的情感和想法。创造力是INFP理解世界和表达自己的重要方式。' },
      { title: '同理心', content: 'INFP能够深刻理解他人的情感和经历。他们富有同情心，总是愿意倾听和帮助他人。这种深刻的同理心使INFP成为优秀的朋友和顾问。' }
    ],
    cognitiveFunctions: [
      { symbol: 'Fi', name: '内向情感', level: '主导', description: 'INFP的主导功能是内向情感，这使他们拥有强烈的个人价值观和道德准则。他们寻求真实性和意义。', detailedDescription: '内向情感让INFP拥有强烈的个人价值观和道德准则。', characteristics: ['内在价值', '个人信念', '真实性', '道德判断'] },
      { symbol: 'Ne', name: '外向直觉', level: '辅助', description: '辅助功能外向直觉帮助INFP看到可能性和新的想法。他们富有创造力和想象力。', detailedDescription: '外向直觉帮助INFP看到各种可能性和新的想法。', characteristics: ['看到可能性', '创造力', '想象力', '探索精神'] },
      { symbol: 'Si', name: '内向感觉', level: '第三', description: '第三功能内向感觉使INFP重视过去的经验和内心的感受。', detailedDescription: '内向感觉让INFP重视过去的经验和内心的感受。', characteristics: ['经验学习', '细节关注', '传统尊重', '个人记忆'] },
      { symbol: 'Te', name: '外向思考', level: '劣势', description: '劣势功能外向思考可能使INFP在组织和执行方面遇到困难。', detailedDescription: '外向思考是INFP最不发达的功能，影响着他们的组织和执行能力。', characteristics: ['逻辑组织', '效率导向', '客观分析', '系统思维'] }
    ],
    strengths: [
      { title: '同理心', desc: '深刻理解他人', detailsList: ['感受他人情感', '提供情感支持', '理解不同视角', '创造安全空间'], examples: ['安慰痛苦的朋友', '理解他人的困境'] },
      { title: '创造力', desc: '富有艺术天赋', detailsList: ['写作和表达', '艺术创作', '独特视角', '想象力丰富'], examples: ['创作诗歌或小说', '绘画或音乐创作'] }
    ],
    strengthsDetailed: 'INFP拥有深刻的同理心、创造力和强烈的价值观。他们能够理解他人的痛苦，提供真诚的支持。INFP的创造力使他们能够表达复杂的情感和想法，为世界带来美好。',
    weaknesses: [
      { title: '过度理想化', desc: '现实感不足', impact: '可能对现实感到失望', solutions: ['接受不完美', '设定现实期望', '关注当下'] },
      { title: '敏感', desc: '容易受伤', impact: '可能因批评而深受打击', solutions: ['发展情绪韧性', '区分个人和批评', '自我肯定'] }
    ],
    weaknessesDetailed: 'INFP可能过于理想化，对现实感到失望。他们的敏感性使他们容易受伤。INFP有时会为了避免冲突而压抑自己的需求，或陷入自我批评。他们需要学会接受不完美，保护自己的情感。',
    relationships: {
      romance: {
        title: '恋爱关系',
        desc: 'INFP在恋爱中寻求灵魂伴侣。',
        characteristics: ['寻求深度连接', '重视真实性', '浪漫忠诚', '需要理解'],
        challenges: ['可能过于理想化', '难以处理冲突', '情绪敏感'],
        advice: ['接受现实', '学习沟通', '保护自我'],
        compatibility: [{ type: 'ENFJ', desc: '温暖与支持' }, { type: 'ENTJ', desc: '互补的成长' }]
      },
      friendship: {
        title: '友谊关系',
        desc: 'INFP重视真诚的朋友。',
        characteristics: ['真诚深度', '忠诚支持', '理解倾听'],
        challenges: ['社交能量有限', '难以广泛社交'],
        advice: ['珍惜真友', '适度社交']
      },
      parenting: {
        title: '亲子关系',
        desc: 'INFP父母培养孩子的创造力。',
        characteristics: ['鼓励创造', '支持表达', '温柔引导'],
        challenges: ['可能过于宽容', '界限不清晰'],
        advice: ['设立界限', '培养责任感']
      }
    },
    career: {
      title: '职业发展',
      desc: 'INFP在创造性职业中表现出色。',
      suitable: ['作家', '艺术家', '心理咨询师'],
      suitableDetails: [
        { career: '写作', reason: '写作允许INFP表达内心世界和深刻见解。' },
        { career: '艺术', reason: '艺术创作让INFP能够表达复杂的情感和想法。' }
      ],
      unsuitable: ['公司政治'],
      workStyle: 'INFP喜欢有创意自由和意义的工作。',
      workStyleDetailed: 'INFP在能够表达创造力和追求意义的环境中表现最佳。他们需要工作的自主权和个人表达的空间。',
      workStyleDetails: ['追求有意义的目标', '重视创造性表达', '喜欢独立工作'],
      workEnvironment: 'INFP适合安静、支持性、有意义的工作环境。',
      idealEnvironment: ['安静和私密的空间', '支持性的同事', '创造性自由'],
      leadershipStyle: 'INFP通过榜样和激励来领导，重视团队成员的成长。',
      teamworkStyle: 'INFP在团队中贡献创造性想法和深度洞察。'
    },
    growth: {
      opportunities: ['现实感', '执行力'],
      opportunitiesDetailed: [{area: "现实感", desc: "学会平衡理想与现实，接受世界的不完美", actions: ["设定现实目标", "接受局限", "关注当下"]}, {area: "执行力", desc: "将想法转化为行动，而不是停留在想象阶段", actions: ["制定行动计划", "设定截止日期", "跟踪进度"]}],
      actions: ['设定实际目标', '采取行动'],
      detailedAdvice: 'INFP在追求理想的同时，要学会接受现实的不完美。将想法付诸行动，不要让完美的追求成为行动的障碍。',
      longTermGoals: ['实现个人价值', '创作有意义的作品']
    },
    stress: {
      triggers: ['批评', '冲突'],
      triggersDetailed: [{trigger: "被批评", explanation: "被批评或否定让INFP感到受伤"}, {trigger: "价值观冲突", explanation: "人际冲突和价值观被违背"}],
      signs: ['逃避', '情绪低落'],
      signsDetailed: [{stage: "早期", signs: ["想要逃避", "情绪敏感"]}, {stage: "中度", signs: ["抑郁", "愤世嫉俗"]}],
      coping: ['艺术', '自然'],
      copingDetailed: [{method: "艺术创作", steps: ["绘画写作", "表达情感", "释放压力"]}, {method: "亲近自然", steps: ["户外散步", "感受自然", "恢复平静"]}]
    },
    famousPeople: [
      { name: '威廉·莎士比亚', title: '作家' },
      { name: '约翰·列侬', title: '音乐家' }
    ]
  },
  ENFJ: {
    type: 'ENFJ',
    name: '主人公',
    nameEn: 'Protagonist',
    category: 'diplomats',
    categoryEn: 'Diplomats',
    tagline: '富有魅力的领导者',
    slogan: '天生的领导者，激励他人成长',
    description: 'ENFJ是有魅力和同情心的领导者，他们激励他人发挥潜力。',
    detailedDescription: 'ENFJ（主人公）是天生的领导者，充满魅力和热情。他们能够敏锐地感知他人的情感和需求，并激励他人实现最大潜力。ENFJ具有强烈的同理心和社交智慧，善于建立深厚的人际关系。他们追求和谐，致力于帮助他人成长和发展。',
    traits: [
      { trait: '领导力', explanation: '激励和引导他人实现共同目标' },
      { trait: '同理心', explanation: '深刻理解他人的情感和需求' },
      { trait: '热情', explanation: '对生活和人充满积极能量' }
    ],
    traitsDetailed: [
      { title: '外向直觉', content: 'ENFJ善于理解他人，能够看到每个人的潜力。' },
      { title: '情感洞察', content: '他们对情感和人际动态有着敏锐的感知力。' },
      { title: '领导魅力', content: 'ENFJ具有自然的领导气质，能够激励和团结他人。' }
    ],
    cognitiveFunctions: [
      { symbol: 'Fe', name: '外向情感', level: '主导', description: 'Fe是ENFJ的核心认知功能，使他们敏锐地感知他人的情感和需求，追求人际和谐。', detailedDescription: '外向情感让ENFJ能够敏锐地感知他人的情感状态，自然地回应他人的需求，并创造和谐的人际氛围。', characteristics: ['情感敏感', '人际和谐', '同理心强', '社交智慧'] },
      { symbol: 'Ni', name: '内向直觉', level: '辅助', description: 'Ni帮助ENFJ洞察深层意义，预见未来的可能性，理解复杂的人际动态。', detailedDescription: '内向直觉让ENFJ能够洞察事物的本质，预见他人的成长潜力，并理解复杂的人际模式。', characteristics: ['洞察本质', '预见潜力', '模式识别', '整体理解'] },
      { symbol: 'Se', name: '外向感觉', level: '第三', description: '第三功能Se使ENFJ能够关注当下的体验，享受感官世界，虽然这不是他们的强项。', detailedDescription: '外向感觉帮助ENFJ关注当下的具体细节和现实体验，增强他们对环境的感知能力。', characteristics: ['当下体验', '感官享受', '实际行动', '环境感知'] },
      { symbol: 'Ti', name: '内向思考', level: '劣势', description: 'Ti是ENFJ最不发达的功能，影响着他们进行客观逻辑分析和追求内在一致性的能力。', detailedDescription: '内向思考是ENFJ需要发展的领域，代表着客观逻辑分析和追求内在真理的能力。', characteristics: ['逻辑分析', '内在一致', '客观评估', '原则追求'] }
    ],
    strengths: [
      { title: '领导力', desc: '激励团队实现目标', detailsList: ['善于激励他人', '建立团队精神', '制定清晰愿景'], examples: ['带领团队完成项目', '组织社区活动'] },
      { title: '同理心', desc: '深刻理解他人需求', detailsList: ['敏锐感知情感', '提供情感支持', '建立深层连接'], examples: ['帮助朋友度过困难', '调解人际冲突'] },
      { title: '沟通能力', desc: '清晰表达并影响他人', detailsList: ['善于表达想法', '说服力强', '倾听能力好'], examples: ['公开演讲', '谈判协商'] },
      { title: '组织能力', desc: '高效组织人和资源', detailsList: ['规划能力强', '协调资源', '执行力高'], examples: ['策划大型活动', '管理复杂项目'] }
    ],
    strengthsDetailed: 'ENFJ是天生的领导者和激励者。他们能够敏锐地感知他人的需求和潜力，并帮助其实现。他们的同理心和社交智慧使他们成为优秀的沟通者和调解者。ENFJ具有强烈的责任感和使命感，致力于创造积极的影响。',
    weaknesses: [
      { title: '过度付出', desc: '忽视自身需求', impact: '导致身心疲惫和倦怠', solutions: ['学会设定界限', '优先照顾自己', '接受不完美'] },
      { title: '过于敏感', desc: '受他人情绪影响', impact: '情绪波动大，难以保持客观', solutions: ['情绪边界训练', '客观分析问题', '寻求外部视角'] },
      { title: '理想主义', desc: '对他人期望过高', impact: '失望和人际关系紧张', solutions: ['接纳他人局限', '调整期望值', '关注进步而非完美'] },
      { title: '难以拒绝', desc: '害怕让他人失望', impact: '承担过多责任和压力', solutions: ['练习说"不"', '明确优先级', '理解拒绝是正常的'] }
    ],
    weaknessesDetailed: 'ENFJ倾向于过度关注他人需求而忽视自己。他们可能过于理想主义，对他人的期望过高。ENFJ也难以面对冲突和批评，可能会为了避免伤害他人而压抑自己的真实想法。',
    relationships: {
      romance: {
        title: '恋爱关系',
        desc: 'ENFJ在恋爱中寻求深度连接。ENFJ是充满热情和奉献的伴侣。他们致力于建立深刻、有意义的恋爱关系，并会投入大量精力来维护和发展关系。他们期望伴侣也能同样投入，共同成长。',
        characteristics: ['追求灵魂伴侣', '重视情感交流', '愿意为关系付出', '期望相互成长'],
        challenges: ['可能过度付出而忽视自己', '期望过高导致失望', '难以处理关系中的冲突']
      },
      friendship: {
        title: '友谊关系',
        desc: 'ENFJ是忠诚而投入的朋友。他们重视深层的友谊连接，愿意为朋友付出时间和精力。ENFJ善于倾听和提供情感支持，是朋友圈中的精神支柱。他们喜欢组织聚会和活动，创造有意义的社交体验。',
        characteristics: ['忠诚投入', '善于倾听', '情感支持', '组织聚会', '精神支柱'],
        challenges: ['可能过度付出', '难以设定界限', '期望朋友同样投入']
      },
      parenting: {
        title: '亲子关系',
        desc: 'ENFJ父母是充满热情和支持的教育者。他们致力于培养孩子的自信和独立性，鼓励孩子追求自己的梦想。ENFJ父母善于与孩子沟通，创造温暖和支持性的家庭氛围。他们重视孩子的情感发展和社交能力培养。',
        characteristics: ['热情支持', '鼓励独立', '善于沟通', '温暖包容', '重视情感教育'],
        challenges: ['可能过度保护', '期望过高', '难以让孩子独立面对困难']
      }
    },
    career: {
      title: '职业发展',
      desc: 'ENFJ在领导职位中表现出色。',
      suitable: ['管理者', '培训师', '销售', '人力资源', '咨询', '教育', '公关'],
      unsuitable: ['孤立工作', '高度技术性', '重复性任务'],
      workStyle: 'ENFJ喜欢与人合作，帮助他人成长。',
      workStyleDetailed: 'ENFJ在需要与人互动、领导和激励他人的工作中表现出色。他们适合能够发挥影响力的职位，喜欢看到自己对他人和组织的积极影响。ENFJ重视团队合作，善于创造积极的工作氛围。',
      suitableDetails: [
        { career: '管理者/领导者', reason: 'ENFJ天生具有领导才能，善于激励团队' },
        { career: '培训师/教练', reason: '帮助他人成长和发展' },
        { career: '销售/公关', reason: '需要卓越的沟通和说服能力' },
        { career: '教育/咨询', reason: '帮助他人实现潜能' }
      ]
    },
    growth: {
      opportunities: ['自我关怀', '界限', '批判性思维'],
      actions: ['说"不"', '照顾自己', '独立思考'],
      detailedAdvice: 'ENFJ需要学会在关注他人的同时也照顾好自己。建立健康的界限，学会说"不"，并培养独立思考和客观分析的能力，将有助于他们实现更全面的个人成长。'
    },
    stress: {
      triggers: ['被忽视', '冲突', '无法实现理想', '人际不和谐'],
      signs: ['疲劳', '情绪低落', '易怒', '退缩'],
      coping: ['社交', '运动', '创造性活动', '独处反思']
    },
    famousPeople: [
      { name: '奥普拉·温弗瑞', title: '主持人' },
      { name: '奥巴马', title: '政治家' },
      { name: '马丁·路德·金', title: '民权领袖' },
      { name: '詹妮弗·劳伦斯', title: '演员' }
    ]
  },
  ENFP: {
    type: 'ENFP',
    name: '竞选者',
    nameEn: 'Campaigner',
    category: 'diplomats',
    categoryEn: 'Diplomats',
    tagline: '热情自由的灵魂',
    slogan: '充满热情，追求自由和可能性',
    description: 'ENFP是充满热情和创造力的自由灵魂，他们追求新的体验和可能性。他们善于发现生活中的美好，用无限的想象力和热情感染身边的每一个人。',
    detailedDescription: '竞选者型人格(ENFP)是真正的自由灵魂。他们充满热情、富有创造力，总是追求新的体验和可能性。ENFP们拥有独特的视角和强大的直觉能力，善于发现生活中的美好和机会。他们是天生的沟通者，能够轻松地与各种人建立联系，并用自己的热情感染他人。ENFP们重视真实性和个人成长，他们渴望探索世界的每一个角落，发现生命的意义和目的。',
    traits: [
      { trait: '热情洋溢', explanation: '对生活充满无限的热情和活力' },
      { trait: '创造力', explanation: '拥有丰富的想象力和创新思维' },
      { trait: '社交能力', explanation: '善于与人建立联系，沟通能力强' },
      { trait: '好奇心', explanation: '对世界充满好奇，渴望探索新事物' },
      { trait: '同理心', explanation: '能够理解和感受他人的情感' }
    ],
    traitsDetailed: [
      { title: '自由精神', content: 'ENFP天生渴望自由和独立。他们不喜欢被规则和限制束缚，追求能够自由表达和探索的生活方式。这种自由精神使他们能够跳出常规思维，发现独特的解决方案。' },
      { title: '创意无限', content: 'ENFP拥有丰富的想象力和创造力。他们能够从不同的角度看待问题，提出新颖的想法和解决方案。这种创造力体现在他们生活的方方面面，从艺术创作到问题解决。' },
      { title: '人际连接', content: 'ENFP是天生的社交者。他们能够轻松地与各种人建立深层次的联系，善于倾听和理解他人。这种能力使他们在团队合作和人际网络中表现出色。' }
    ],
    cognitiveFunctions: [
      { symbol: 'Ne', name: '外向直觉', level: '主导', description: '这是ENFP的核心认知功能，使他们能够发现可能性和模式。Ne让ENFP拥有独特的洞察力，能够在看似无关的事物之间建立联系，看到未来的各种可能性。', detailedDescription: '外向直觉让ENFP能够探索无限的可能性，发现新的机会和创意。这种功能使他们成为出色的头脑风暴者和创新者。', characteristics: ['模式识别', '可能性探索', '创意连接', '未来导向'] },
      { symbol: 'Fi', name: '内向情感', level: '辅助', description: 'Fi代表ENFP的内在价值观和真实性。它使ENFP重视个人诚信，追求与内心价值观一致的生活。这种功能影响着ENFP的道德判断和对真实自我的追求。', detailedDescription: '内向情感是ENFP的价值判断系统，帮助他们确定什么对自己真正重要。', characteristics: ['内在价值', '真实性', '道德判断', '个人信念'] },
      { symbol: 'Te', name: '外向思考', level: '第三', description: 'Te帮助ENFP将创意转化为实际行动。它使ENFP能够组织思想、制定计划，并以逻辑方式表达自己的想法。', detailedDescription: '外向思考帮助ENFP实现他们的创意，通过有效的组织和方法将想法变为现实。', characteristics: ['逻辑组织', '效率导向', '客观分析', '系统思维'] },
      { symbol: 'Si', name: '内向感觉', level: '劣势', description: 'Si是ENFP最不发达的功能，影响着他们对细节和过去的关注。ENFP可能会忽视传统和细节，而过度专注于未来的可能性。', detailedDescription: '作为劣势功能，Si代表着ENFP需要发展的领域——关注细节、尊重传统和经验。', characteristics: ['细节关注', '经验学习', '传统尊重', '稳定需求'] }
    ],
    strengths: [
      { title: '创意无限', desc: '拥有丰富的想象力和创新思维', details: 'ENFP能够从不同的角度看待问题，提出新颖的想法和解决方案。他们的创造力体现在生活的方方面面。', detailsList: ['头脑风暴', '创意解决', '艺术表达', '创新思维'], examples: ['提出独特的产品概念', '创作艺术作品', '设计创新活动'] },
      { title: '社交魅力', desc: '天生的沟通者和人际关系建设者', details: 'ENFP能够轻松地与各种人建立联系，善于倾听和理解他人。他们的热情和真诚使人们感到被重视。', detailsList: ['人际连接', '沟通技巧', '同理心', '团队凝聚'], examples: ['建立广泛的人脉网络', '化解团队冲突', '激励他人'] },
      { title: '热情感染', desc: '用热情激励和鼓舞他人', details: 'ENFP的热情是传染性的。他们能够激发他人的潜能，创造积极向上的氛围。', detailsList: ['激励他人', '积极氛围', '热情传播', '能量提升'], examples: ['带领团队完成挑战', '鼓舞士气低落的朋友', '推动项目进展'] },
      { title: '适应力强', desc: '灵活应对变化和新环境', details: 'ENFP善于适应新环境和变化。他们能够快速调整策略，在不同的情况下找到机会。', detailsList: ['灵活应变', '机会识别', '环境适应', '创新调整'], examples: ['应对突发状况', '进入新领域', '调整项目方向'] }
    ],
    strengthsDetailed: 'ENFP的核心优势在于他们无限的创造力和出色的社交能力。他们能够发现生活中的美好和可能性，用热情感染他人。同时，他们的适应力和开放性使他们能够在各种环境中茁壮成长。',
    weaknesses: [
      { title: '缺乏专注', desc: '容易分心，难以坚持完成项目', impact: '可能同时开始多个项目但难以完成；注意力容易被新的事物吸引。', solutions: ['设定明确的优先级', '使用番茄工作法', '寻找问责伙伴', '庆祝小成就'] },
      { title: '过度理想化', desc: '对人和事期望过高，容易失望', impact: '现实中的人和情况往往不如想象中完美，导致失望和沮丧。', solutions: ['接受不完美', '设定现实期望', '关注积极方面', '练习感恩'] },
      { title: '情绪波动', desc: '情感起伏较大，容易受外界影响', impact: '情绪变化可能影响决策和人际关系；容易受他人情绪影响。', solutions: ['情绪日记', '冥想练习', '寻求稳定支持', '建立情绪边界'] },
      { title: '忽视细节', desc: '关注大局而忽视具体执行细节', impact: '可能导致项目执行中的问题；错过重要的细节信息。', solutions: ['使用检查清单', '寻求细节型伙伴', '定期回顾进展', '关注具体数据'] }
    ],
    weaknessesDetailed: 'ENFP的主要挑战在于平衡他们的创意和执行能力。他们可能在追求新想法时忽视完成现有项目，或者在理想与现实之间感到冲突。学会专注和坚持是ENFP成长的关键。',
    relationships: {
      romance: {
        title: '恋爱关系',
        desc: 'ENFP在恋爱中充满热情和浪漫。他们寻求深层次的情感连接和智力上的共鸣，重视伴侣的独立性和成长。',
        characteristics: ['热情浪漫', '深度对话', '相互成长', '尊重独立', '情感表达'],
        challenges: ['承诺恐惧', '理想化伴侣', '注意力分散', '情绪波动'],
        advice: ['学会专注', '接受不完美', '持续投入', '保持沟通'],
        compatibility: [
          { type: 'INTJ', desc: '互补的深度关系' },
          { type: 'INFJ', desc: '情感与直觉的完美结合' },
          { type: 'ENFP', desc: '共同的热情和创造力' }
        ]
      },
      friendship: {
        title: '友谊关系',
        desc: 'ENFP是充满热情和忠诚的朋友。他们喜欢与各种人交往，珍视真诚的友谊和深度的对话。',
        characteristics: ['热情友好', '真诚关心', '深度交流', '积极支持', '开放包容'],
        challenges: ['社交过度', '忽视旧友', '情绪依赖', '边界模糊'],
        advice: ['维护旧友谊', '设定界限', '平衡社交时间', '真诚表达'],
        compatibility: [
          { type: 'INTJ', desc: '智力上的刺激' },
          { type: 'INFJ', desc: '深度的情感连接' },
          { type: 'ENTP', desc: '创意的碰撞' }
        ]
      },
      parenting: {
        title: '亲子关系',
        desc: 'ENFP父母充满爱心和创造力。他们鼓励孩子探索世界，培养独立性和创造力，同时给予情感支持。',
        characteristics: ['创意教育', '情感支持', '鼓励探索', '开放沟通', '共同成长'],
        challenges: ['缺乏一致性', '界限不清', '过度保护', '情绪影响'],
        advice: ['建立规则', '保持一致', '让孩子独立', '控制情绪'],
        compatibility: []
      }
    },
    career: {
      title: '职业发展',
      desc: 'ENFP在需要创造力、人际互动和灵活性的职业中表现出色。他们适合能够表达自我、帮助他人和探索新可能性的工作。',
      suitable: ['营销专家', '公关经理', '创意总监', '心理咨询师', '记者', '艺术家', '企业家', '教师', '社会工作者', '活动策划'],
      suitableDetails: [
        { career: '营销专家', reason: '发挥创意和社交能力' },
        { career: '心理咨询师', reason: '运用同理心帮助他人' },
        { career: '创意总监', reason: '领导创意团队' },
        { career: '企业家', reason: '追求自由和创造' }
      ],
      unsuitable: ['重复性工作', '严格等级制度', '孤立工作', '过度细节化'],
      workStyle: 'ENFP喜欢灵活、创新的工作环境。他们重视自主权，喜欢与志同道合的人一起工作，追求有意义的目标。',
      workStyleDetailed: 'ENFP在工作中表现出强烈的创造力和社交能力。他们喜欢头脑风暴和团队合作，善于激励他人。ENFP需要工作的意义和目的，他们希望自己的工作能够产生积极的影响。',
      workStyleDetails: ['创意驱动', '团队协作', '灵活自主', '意义导向', '人际互动', '创新探索']
    },
    growth: {
      opportunities: ['专注力', '执行力', '情绪管理', '细节关注'],
      opportunitiesDetailed: [
        { area: '专注力培养', desc: '学会坚持完成项目', actions: ['设定优先级', '使用时间管理工具', '寻找问责伙伴'] },
        { area: '情绪平衡', desc: '管理情绪起伏', actions: ['冥想练习', '情绪日记', '寻求专业支持'] }
      ],
      actions: ['完成项目', '设定优先级', '管理情绪', '关注细节'],
      detailedAdvice: 'ENFP的成长之路在于学会平衡创意与执行、理想与现实。通过培养专注力、管理情绪和关注细节，ENFP能够更好地实现自己的潜力。',
      longTermGoals: ['成为领域专家', '建立深度关系', '实现创意项目', '平衡生活各方面']
    },
    stress: {
      triggers: ['单调重复', '限制自由', '缺乏创意', '人际冲突'],
      triggersDetailed: [
        { trigger: '重复性工作', explanation: '缺乏变化和刺激' },
        { trigger: '严格限制', explanation: '感到被束缚' }
      ],
      signs: ['焦躁不安', '注意力分散', '情绪波动', '逃避行为'],
      signsDetailed: [
        { stage: '初期', signs: ['感到无聊', '寻求刺激'] },
        { stage: '中期', signs: ['情绪不稳', '社交退缩'] }
      ],
      coping: ['社交活动', '新体验', '创意表达', '运动放松'],
      copingDetailed: [
        { method: '社交支持', steps: ['联系朋友', '参加聚会', '分享感受'] },
        { method: '创意释放', steps: ['艺术创作', '写作', '音乐'] }
      ]
    },
    famousPeople: [
      { name: '罗宾·威廉姆斯', title: '演员', contribution: '喜剧表演', traits: ['幽默', '创造力'] },
      { name: '沃尔特·迪士尼', title: '企业家', contribution: '动画产业', traits: ['创新', '想象力'] },
      { name: '艾伦·德杰尼勒斯', title: '主持人', contribution: '娱乐产业', traits: ['幽默', '同理心'] }
    ]
  },
  ISTJ: {
    type: 'ISTJ',
    name: '物流师',
    nameEn: 'Logistician',
    category: 'sentinels',
    categoryEn: 'Sentinels',
    tagline: '实际可靠的组织者',
    slogan: '重视传统和秩序，值得信赖',
    description: 'ISTJ是务实和可靠的人，他们重视传统、秩序和责任。他们以其细致、准确和忠诚而闻名，是社会稳定的基石。',
    detailedDescription: '物流师型人格(ISTJ)是十六种人格类型中最常见的一种。他们是务实、可靠的人，重视传统、秩序和责任。ISTJ以其细致、准确和忠诚而闻名，是社会稳定的基石。他们相信事实和数据，喜欢按照既定的规则和程序工作。ISTJ们是值得信赖的朋友、伙伴和同事，他们总是履行自己的承诺，完成自己的职责。',
    traits: [
      { trait: '可靠性', explanation: '值得信赖和依靠' },
      { trait: '组织力', explanation: '善于组织和规划' },
      { trait: '责任感', explanation: '强烈的责任心和义务感' },
      { trait: '实际性', explanation: '注重实际和具体的事实' },
      { trait: '逻辑性', explanation: '以逻辑和理性方式思考' }
    ],
    traitsDetailed: [
      { title: '务实精神', content: 'ISTJ是极度务实的人。他们关注具体的事实和数据，不喜欢抽象的理论。他们相信"眼见为实"，只信任经过验证的信息。' },
      { title: '可靠忠诚', content: 'ISTJ是值得信赖的人。一旦做出承诺，他们会尽一切努力履行。他们对朋友、家庭和工作都表现出极高的忠诚度。' },
      { title: '秩序维护', content: 'ISTJ重视秩序和结构。他们喜欢明确的规定和程序，相信规则是维护社会稳定的基础。' }
    ],
    cognitiveFunctions: [
      { symbol: 'Si', name: '内向感觉', level: '主导', description: '这是ISTJ的核心认知功能，使他们关注细节、经验和传统。Si让ISTJ拥有出色的记忆力，能够准确回忆过去的经验和细节。', detailedDescription: '内向感觉让ISTJ能够从过去的经验中学习，重视传统和已验证的方法。', characteristics: ['细节记忆', '经验学习', '传统尊重', '稳定性'] },
      { symbol: 'Te', name: '外向思考', level: '辅助', description: 'Te帮助ISTJ以逻辑和高效的方式组织世界。它使ISTJ能够制定计划、建立系统，并以客观标准评估情况。', detailedDescription: '外向思考让ISTJ能够有效地组织资源和信息，建立高效的系统。', characteristics: ['逻辑组织', '效率导向', '客观决策', '系统思维'] },
      { symbol: 'Fi', name: '内向情感', level: '第三', description: 'Fi代表ISTJ的内在价值观。虽然不如前两个功能明显，但它影响着ISTJ的道德判断和对个人诚信的重视。', detailedDescription: '内向情感是ISTJ的个人价值系统，帮助他们确定什么对自己真正重要。', characteristics: ['内在价值', '个人诚信', '道德判断', '真实自我'] },
      { symbol: 'Ne', name: '外向直觉', level: '劣势', description: 'Ne是ISTJ最不发达的功能，影响着他们对新可能性的探索。ISTJ可能会过于依赖已知的方法，而忽视创新的机会。', detailedDescription: '作为劣势功能，Ne代表着ISTJ需要发展的领域——探索新的可能性和开放思维。', characteristics: ['可能性探索', '创新思维', '未来导向', '开放思考'] }
    ],
    strengths: [
      { title: '可靠执行', desc: '值得信赖的执行者，说到做到', details: 'ISTJ以其高度的可靠性而闻名。他们一旦承诺就会全力以赴，确保任务按时高质量完成。', detailsList: ['信守承诺', '按时完成', '质量保证', '责任心强'], examples: ['按时交付项目', '履行承诺', '维护标准'] },
      { title: '精确细致', desc: '注重细节，准确无误', details: 'ISTJ对细节有出色的关注能力。他们能够发现并纠正错误，确保工作的准确性。', detailsList: ['细节关注', '错误识别', '精确执行', '质量检查'], examples: ['财务审计', '数据分析', '质量控制'] },
      { title: '逻辑组织', desc: '善于组织和规划', details: 'ISTJ擅长建立秩序和结构。他们能够有效地组织信息和资源，建立高效的系统。', detailsList: ['系统组织', '流程优化', '资源管理', '规划执行'], examples: ['建立档案系统', '优化工作流程', '项目管理'] },
      { title: '稳定可靠', desc: '提供稳定性和连续性', details: 'ISTJ是稳定的力量。在变化的环境中，他们提供可靠性和连续性，帮助他人感到安全。', detailsList: ['稳定性', '连续性', '可预测性', '安全感'], examples: ['维护日常运营', '传承知识', '提供支持'] }
    ],
    strengthsDetailed: 'ISTJ的核心优势在于他们的可靠性和精确性。他们是值得信赖的执行者，能够确保任务按时高质量完成。同时，他们的组织能力和对细节的关注使他们成为维护秩序和稳定的理想人选。',
    weaknesses: [
      { title: '固执己见', desc: '对新想法和方法持保守态度', impact: '可能错过改进的机会；难以接受变革；与创新型人格产生冲突。', solutions: ['保持开放心态', '尝试小改变', '听取不同意见', '关注变革的好处'] },
      { title: '情感疏离', desc: '过于理性，可能忽视他人情感', impact: '在人际关系中显得冷漠；难以理解他人的感受；决策时忽视情感因素。', solutions: ['主动倾听感受', '表达关心', '培养同理心', '考虑情感影响'] },
      { title: '过度批评', desc: '对自己和他人要求过高', impact: '可能打击他人积极性；造成不必要的压力；影响团队氛围。', solutions: ['接受不完美', '关注进步', '给予肯定', '调整期望'] },
      { title: '适应缓慢', desc: '需要时间适应变化和新环境', impact: '在快速变化的环境中表现不佳；可能抵制必要的变革。', solutions: ['逐步适应', '寻找支持', '关注积极面', '建立新习惯'] }
    ],
    weaknessesDetailed: 'ISTJ的主要挑战在于平衡他们的传统价值观与变化的现实。他们可能在坚持已知方法时错过改进的机会，或者在追求完美的过程中忽视了他人的感受。学会灵活和开放是ISTJ成长的关键。',
    relationships: {
      romance: {
        title: '恋爱关系',
        desc: 'ISTJ在恋爱中寻求稳定和忠诚。他们可能不擅长浪漫的表达，但通过实际行动展示爱意和承诺。',
        characteristics: ['忠诚专一', '实际行动', '长期承诺', '稳定可靠', '责任感强'],
        challenges: ['情感表达', '浪漫举动', '理解伴侣情感', '适应变化'],
        advice: ['学习表达爱意', '关注伴侣需求', '保持沟通', '尝试新事物'],
        compatibility: [
          { type: 'ESFP', desc: '互补的活力关系' },
          { type: 'ESTP', desc: '平衡的稳定与冒险' },
          { type: 'ISFJ', desc: '共同的价值观' }
        ]
      },
      friendship: {
        title: '友谊关系',
        desc: 'ISTJ是忠诚和可靠的朋友。他们可能不是社交蝴蝶，但一旦建立友谊，就会长期维护这段关系。',
        characteristics: ['忠诚可靠', '长期友谊', '实际行动', '真诚坦率', '值得信赖'],
        challenges: ['社交主动', '情感交流', '适应新朋友', '表达关心'],
        advice: ['主动联系朋友', '表达欣赏', '参与社交活动', '开放心扉'],
        compatibility: [
          { type: 'ESTJ', desc: '共同的价值观' },
          { type: 'ISFJ', desc: '相似的特质' },
          { type: 'ESFP', desc: '互补的能量' }
        ]
      },
      parenting: {
        title: '亲子关系',
        desc: 'ISTJ父母是负责任和有条理的。他们重视教育孩子遵守规则、承担责任，并通过榜样示范价值观。',
        characteristics: ['责任感强', '规则明确', '以身作则', '稳定环境', '长期规划'],
        challenges: ['情感表达', '理解孩子需求', '灵活性', '鼓励创新'],
        advice: ['多表达爱意', '倾听孩子', '保持灵活', '鼓励探索'],
        compatibility: []
      }
    },
    career: {
      title: '职业发展',
      desc: 'ISTJ在需要精确、组织和可靠性的职业中表现出色。他们适合有明确规则、结构化流程和可预测结果的工作。',
      suitable: ['会计师', '审计师', '法官', '军官', '工程师', '项目经理', '系统分析师', '质量控制', '档案管理', '法律助理'],
      suitableDetails: [
        { career: '会计师', reason: '精确性和对细节的关注' },
        { career: '法官', reason: '对规则和正义的重视' },
        { career: '军官', reason: '纪律和责任感' },
        { career: '工程师', reason: '逻辑思维和系统方法' }
      ],
      unsuitable: ['高度不确定性', '频繁变化', '过度创意要求', '模糊规则'],
      workStyle: 'ISTJ喜欢结构化和可预测的工作环境。他们重视明确的职责、清晰的目标和既定的程序。',
      workStyleDetailed: 'ISTJ在工作中表现出强烈的责任感和精确性。他们喜欢独立工作，有明确的指导方针和期望。ISTJ是可靠的团队成员，总是按时完成任务并维护高标准。',
      workStyleDetails: ['独立工作', '结构清晰', '目标明确', '标准维护', '质量导向', '可靠执行']
    },
    growth: {
      opportunities: ['灵活性', '情感表达', '创新思维', '接受变化'],
      opportunitiesDetailed: [
        { area: '灵活适应', desc: '学会适应变化', actions: ['小步尝试', '关注积极面', '寻求支持'] },
        { area: '情感连接', desc: '增强情感表达', actions: ['练习表达', '倾听感受', '表达关心'] }
      ],
      actions: ['尝试新事物', '接受变化', '表达情感', '保持开放'],
      detailedAdvice: 'ISTJ的成长之路在于学会平衡传统与创新、理性与情感。通过培养灵活性、增强情感表达和保持开放心态，ISTJ能够更全面地发展。',
      longTermGoals: ['成为领域专家', '建立深厚关系', '平衡工作与生活', '培养新技能']
    },
    stress: {
      triggers: ['混乱无序', '违反规则', '不确定性', '情感冲突'],
      triggersDetailed: [
        { trigger: '环境混乱', explanation: '缺乏秩序和结构' },
        { trigger: '规则被打破', explanation: '他人不遵守规定' }
      ],
      signs: ['焦虑增加', '更加固执', '社交退缩', '过度工作'],
      signsDetailed: [
        { stage: '初期', signs: ['感到不安', '寻求控制'] },
        { stage: '中期', signs: ['情绪紧张', '工作过度'] }
      ],
      coping: ['组织整理', '制定计划', '寻求稳定', '独处恢复'],
      copingDetailed: [
        { method: '恢复秩序', steps: ['整理环境', '制定清单', '建立常规'] },
        { method: '放松技巧', steps: ['深呼吸', '运动', '冥想'] }
      ]
    },
    famousPeople: [
      { name: '乔治·华盛顿', title: '美国第一任总统', contribution: '建立美国制度', traits: ['正直', '责任感'] },
      { name: '沃伦·巴菲特', title: '投资家', contribution: '价值投资', traits: ['理性', '长期思维'] },
      { name: '安吉拉·默克尔', title: '德国总理', contribution: '政治领导', traits: ['稳定', '务实'] }
    ]
  },
  ISFJ: {
    type: 'ISFJ',
    name: '守卫者',
    nameEn: 'Defender',
    category: 'sentinels',
    categoryEn: 'Sentinels',
    tagline: '温暖可靠的守护者',
    slogan: '默默奉献，守护所爱之人',
    description: 'ISFJ是温暖而忠诚的守护者，他们默默地关心他人，维护和谐。',
    detailedDescription: '守卫者型人格(ISFJ)是真正的利他主义者。他们温暖、忠诚、细心，总是默默地关心他人。ISFJ占总人口的约13%，是最常见的性格类型之一。他们以善良、奉献和可靠性著称，是家庭、社区和工作场所的支柱。',
    traits: [{ trait: '关怀', explanation: '关心他人需求' }, { trait: '忠诚', explanation: '对朋友和家人忠诚' }, { trait: '可靠', explanation: '值得信赖' }, { trait: '细心', explanation: '关注细节' }],
    traitsDetailed: [{ title: '利他主义', content: 'ISFJ天生具有利他精神，把他人需求放在自己之前。' }, { title: '忠诚奉献', content: 'ISFJ对家人朋友表现出极高的忠诚度。' }, { title: '和谐维护', content: 'ISFJ努力维护和谐的环境。' }],
    cognitiveFunctions: [{ symbol: 'Si', name: '内向感觉', level: '主导', description: '关注细节、传统和经验。', detailedDescription: '从过去经验中学习，重视传统。', characteristics: ['细节记忆', '传统尊重'] }, { symbol: 'Fe', name: '外向情感', level: '辅助', description: '关注他人的情感和需求。', detailedDescription: '理解和回应他人情感需求。', characteristics: ['情感理解', '和谐维护'] }, { symbol: 'Ti', name: '内向思考', level: '第三', description: '内在逻辑分析。', detailedDescription: '理解事物运作方式。', characteristics: ['内在分析', '逻辑理解'] }, { symbol: 'Ne', name: '外向直觉', level: '劣势', description: '探索新可能性。', detailedDescription: '代表需要发展的领域。', characteristics: ['可能性探索', '创新思维'] }],
    strengths: [{ title: '同理关怀', desc: '深刻理解并关心他人', details: 'ISFJ能够敏锐地感知他人情感和需求。', detailsList: ['情感敏感', '主动帮助'], examples: ['照顾家人', '提供支持'] }, { title: '可靠执行', desc: '值得信赖的执行者', details: 'ISFJ一旦承诺就会全力以赴。', detailsList: ['信守承诺', '按时完成'], examples: ['完成任务', '履行责任'] }, { title: '细节关注', desc: '注意细节', details: 'ISFJ对细节有敏锐观察力。', detailsList: ['细节观察', '周到考虑'], examples: ['准备周到', '预见需求'] }, { title: '和谐维护', desc: '创造和谐环境', details: 'ISFJ是冲突的天然调解者。', detailsList: ['冲突调解', '团队凝聚'], examples: ['化解矛盾', '维护和谐'] }],
    strengthsDetailed: 'ISFJ的核心优势在于同理心和关怀能力。他们是真正的利他主义者。',
    weaknesses: [{ title: '自我忽视', desc: '过度关注他人', impact: '可能导致身心疲惫。', solutions: ['设定界限', '学会说不'] }, { title: '冲突回避', desc: '避免必要的冲突', impact: '问题可能被压抑。', solutions: ['面对冲突', '表达感受'] }, { title: '过度敏感', desc: '对批评过于敏感', impact: '容易受伤。', solutions: ['客观看待', '建立自信'] }, { title: '适应缓慢', desc: '需要时间适应变化', impact: '可能错过机会。', solutions: ['小步适应', '保持开放'] }],
    weaknessesDetailed: 'ISFJ的主要挑战在于平衡关怀他人与照顾自己。',
    relationships: { romance: { title: '恋爱关系', desc: 'ISFJ在恋爱中忠诚、体贴和奉献。', characteristics: ['忠诚专一', '体贴关怀'], challenges: ['表达需求', '设定边界'], advice: ['表达需求', '设定界限'], compatibility: [{ type: 'ESTP', desc: '互补的活力' }, { type: 'ESFP', desc: '温暖的平衡' }] }, friendship: { title: '友谊关系', desc: 'ISFJ是温暖、忠诚的朋友。', characteristics: ['忠诚可靠', '温暖支持'], challenges: ['社交扩展', '表达自我'], advice: ['扩展社交', '分享自己'], compatibility: [{ type: 'ESFJ', desc: '共同关怀' }, { type: 'ISTJ', desc: '相似价值观' }] }, parenting: { title: '亲子关系', desc: 'ISFJ父母是细心、温暖的。', characteristics: ['细心照顾', '温暖支持'], challenges: ['过度保护', '设定界限'], advice: ['培养独立', '设定界限'] } },
    career: { title: '职业发展', desc: 'ISFJ在需要关怀和服务的职业中出色。', suitable: ['护士', '教师', '社工', '人力资源'], suitableDetails: [{ career: '护士', reason: '关怀照顾' }, { career: '教师', reason: '教育培养' }], unsuitable: ['高压竞争', '频繁冲突'], workStyle: 'ISFJ喜欢稳定、有意义的工作。', workStyleDetailed: 'ISFJ重视和谐人际关系，喜欢帮助他人的工作。', workStyleDetails: ['团队协作', '关怀支持'] },
    growth: { opportunities: ['自我关怀', '边界设定'], opportunitiesDetailed: [{ area: '自我关怀', desc: '学会照顾自己', actions: ['设定时间', '关注健康'] }], actions: ['关注自己', '设定界限'], detailedAdvice: 'ISFJ的成长在于平衡关怀他人与照顾自己。', longTermGoals: ['建立健康边界', '发展自信'] },
    stress: { triggers: ['人际冲突', '被忽视'], triggersDetailed: [{ trigger: '关系冲突', explanation: '重要关系问题' }], signs: ['疲惫增加', '情绪压抑'], signsDetailed: [{ stage: '初期', signs: ['感到疲惫'] }], coping: ['独处恢复', '自我照顾'], copingDetailed: [{ method: '自我关怀', steps: ['休息放松'] }] },
    famousPeople: [{ name: '伊丽莎白二世', title: '英国女王', contribution: '长期服务', traits: ['忠诚', '奉献'] }, { name: '特蕾莎修女', title: '慈善家', contribution: '帮助穷人', traits: ['无私', '奉献'] }]
  },
  ESTJ: {
    type: 'ESTJ',
    name: '总经理',
    nameEn: 'Executive',
    category: 'sentinels',
    categoryEn: 'Sentinels',
    tagline: '高效务实管理者',
    slogan: '建立秩序，领导他人',
    description: 'ESTJ是高效、务实的管理者，重视传统和秩序。',
    detailedDescription: 'ESTJ（总经理/执行官）是务实高效的管理者，以强大的组织能力、坚定的责任感和对传统价值的尊重而著称。他们是天生的领导者，擅长制定计划、建立秩序并确保执行。ESTJ坚信规则和传统的重要性，认为明确的结构和可预测的性能创造一个稳定高效的社会。ESTJ的核心特质是他们不可动摇的责任感和对效率的追求。他们相信通过努力工作、遵守规则和保持组织，可以实现最大的生产力。这种人格类型的人通常是第一个站出来承担责任的人，无论是在工作场所、家庭还是社区中。他们以实际行动而非空谈来展现领导力，通过示范来激励他人。作为外向思考（Te）为主导功能的人格类型，ESTJ善于组织资源、制定系统和执行计划。他们能够迅速识别问题，采取果断行动，并确保事情按照应有的方式完成。他们的辅助功能内向感觉（Si）使他们能够从过去的经验中学习，尊重经过验证的方法，并注意细节。ESTJ通常是社区的支柱，他们在传统机构中表现出色，如军队、执法部门、企业管理、法律和政府部门。他们维护标准、执行规则，并确保组织运转顺畅。虽然有时可能显得过于严厉或不近人情，但他们的意图始终是维护秩序和效率，为他人创造一个稳定可靠的环境。',
    traits: [{ trait: '组织能力', explanation: '善于组织管理' }, { trait: '果断决策', explanation: '快速做出决定' }, { trait: '责任心', explanation: '承担责任的意愿' }, { trait: '传统价值观', explanation: '尊重传统规则' }],
    traitsDetailed: [{ title: '天生的组织者和领导者', content: 'ESTJ具有卓越的组织能力和领导才能。他们善于将混乱转化为秩序，将愿景转化为可执行的计划。这种人格类型的人本能地理解如何协调人员、资源和时间以实现目标。他们建立明确的期望，设定可衡量的标准，并确保每个人都了解自己的角色和责任。ESTJ的领导力源于他们以身作则的方式——他们不会要求他人做自己不愿意做的事情，而是通过辛勤工作和奉献精神来激励团队。' }, { title: '对效率和结果的不懈追求', content: 'ESTJ高度重视效率和实际成果。他们不喜欢浪费时间或资源，总是寻找优化流程和提高生产力的方法。这种对效率的执着使他们在项目管理和运营管理方面表现出色。ESTJ会制定详细的计划，设定明确的时间表，并确保每个环节都朝着最终目标推进。他们关注可衡量的结果，喜欢看到自己的努力产生具体、实际的成果。' }, { title: '坚定的原则和传统守护者', content: 'ESTJ深深尊重传统、规则和既定程序。他们认为这些结构化的框架是社会有序运转的基础。这种人格类型的人相信经过时间考验的方法，重视历史的智慧和经验的积累。他们维护标准，确保质量控制，并在必要时执行规则。ESTJ的这种做法不是为了控制他人，而是因为他们真诚地相信秩序和可预测性对每个人都有益。' }, { title: '直接坦率的沟通风格', content: 'ESTJ以直接、坦率、不拐弯抹角的方式沟通。他们欣赏清晰明确的信息，不喜欢含糊其辞或暗示。这种沟通方式使他们在需要快速决策和明确指导的情况下表现出色。ESTJ会明确表达自己的期望，提供具体的反馈，并确保每个人都了解自己的立场。虽然这种直接性有时可能显得过于严厉，但他们的意图始终是诚实和建设性的。' }],
    cognitiveFunctions: [{ symbol: 'Te', name: '外向思考', level: '主导', description: '组织和执行计划，关注效率和结果。', detailedDescription: '外向思考（Te）是ESTJ的主导认知功能，使他们成为天生的组织者和执行者。这种功能让ESTJ能够客观地分析情况，识别最有效的方法，并制定清晰的行动计划。他们善于将复杂的问题分解为可管理的步骤，协调资源，并确保每个环节都朝着目标推进。外向思考还使ESTJ重视逻辑、效率和结果，他们倾向于基于事实和数据做出决策，而不是情感或个人偏好。', characteristics: ['系统组织能力', '效率优化', '目标导向执行', '逻辑决策制定'] }, { symbol: 'Si', name: '内向感觉', level: '辅助', description: '关注细节、经验和已验证的方法。', detailedDescription: '内向感觉（Si）作为ESTJ的辅助功能，为他们提供了对细节的关注和对经验的尊重。这种功能帮助ESTJ从过去的经历中学习，记住有效的方法，并注意维持标准和质量。Si使ESTJ尊重传统和已建立的程序，他们相信经过时间考验的方法通常是最好的。同时，这种功能也赋予他们对具体细节的关注，确保工作准确无误地完成。', characteristics: ['细节关注', '经验学习', '传统尊重', '质量保证'] }, { symbol: 'Ne', name: '外向直觉', level: '第三', description: '探索新可能性和替代方案。', detailedDescription: '外向直觉（Ne）是ESTJ的第三功能，虽然不如主导和辅助功能发达，但它为ESTJ提供了探索新可能性和考虑替代方案的能力。当这种功能得到发展时，ESTJ能够跳出框框思考，看到传统方法之外的创新解决方案。这有助于他们适应变化，并在必要时尝试新的方法，而不是过于固守既定程序。', characteristics: ['可能性探索', '创新思维', '适应性', '替代方案考虑'] }, { symbol: 'Fi', name: '内向情感', level: '劣势', description: '内在价值观和个人情感的处理。', detailedDescription: '内向情感（Fi）是ESTJ的劣势功能，代表他们最不发达但仍有潜力的认知领域。这种功能涉及个人价值观、道德准则和情感的处理。由于这是他们的弱点，ESTJ可能在理解和表达个人情感、考虑他人感受以及处理与价值观相关的问题时遇到困难。然而，当ESTJ有意识地发展这个功能时，他们可以成为更全面的领导者，能够平衡效率与人性化的关怀。', characteristics: ['个人价值观', '情感理解', '道德考量', '真实性'] }],
    strengths: [{ title: '卓越的组织管理能力', desc: '天生的组织者和系统构建者', details: 'ESTJ具有非凡的能力将混乱转化为秩序，将愿景转化为可执行的计划。他们善于分析复杂情况，识别关键要素，并设计高效的系统来实现目标。这种组织能力不仅限于物理资源，还包括时间管理、人员协调和流程优化。ESTJ能够同时处理多个任务，确保每个环节都按时、按质完成。', detailsList: ['系统设计和流程优化', '多任务并行管理', '资源有效配置', '项目规划与执行', '时间管理和优先级设定'], examples: ['成功领导大型企业重组项目，在预算内按时完成', '设计并实施新的库存管理系统，提高效率30%', '协调跨部门团队完成紧急项目，确保质量不受影响', '建立标准化的操作流程，减少错误率50%', '管理复杂的活动策划，确保每个细节都得到妥善安排'] }, { title: '果断的决策力和执行力', desc: '快速分析并果断采取行动', details: 'ESTJ在需要快速决策的情况下表现出色。他们能够迅速收集相关信息，分析利弊，并做出明确的决定。一旦决定做出，ESTJ会立即采取行动，不会犹豫不决或拖延。这种果断性在危机管理、紧急情况和高压环境中尤为宝贵。他们能够在不确定性中提供清晰的方向，并带领团队迅速执行。', detailsList: ['快速信息收集和分析', '在压力下保持冷静决策', '明确的优先排序', '迅速采取行动', '承担决策责任'], examples: ['在供应链中断危机中，24小时内制定并执行替代方案', '面对突发市场变化，迅速调整战略方向', '在团队分歧时果断做出决定，避免项目延误', '处理客户紧急投诉，快速找到解决方案', '在资源有限的情况下，优先分配确保关键任务完成'] }, { title: '强烈的责任感和可靠性', desc: '对承诺的坚定履行和责任担当', details: 'ESTJ具有近乎不可动摇的责任感。一旦他们承诺做某事，就会竭尽全力确保完成，无论遇到什么困难。这种可靠性使ESTJ成为他人可以信赖的伙伴、同事和领导者。他们不会找借口，不会推卸责任，而是直面挑战，解决问题。这种特质在家庭、工作和社会关系中都非常宝贵。', detailsList: ['对承诺的坚定履行', '面对困难不轻言放弃', '主动承担责任', '以身作则的领导方式', '高标准的工作伦理'], examples: ['在项目遇到重大障碍时，加班加点确保按时交付', '主动承担团队失败的责任，而不是指责他人', '多年来始终如一地履行社区志愿服务承诺', '在紧急情况下挺身而出，承担额外责任', '即使个人不便，也坚持完成对他人的承诺'] }, { title: '维护秩序和标准的坚定性', desc: '传统和规则的守护者', details: 'ESTJ深信秩序、规则和标准的重要性。他们不仅自己遵守规则，还会确保他人也遵守，维护公平和一致性。这种特质使ESTJ成为优秀的质量控制者、合规管理者和标准制定者。他们理解规则背后的原因，能够解释为什么某些标准必须得到维护，并坚定地执行这些标准，即使面对压力。', detailsList: ['制定和维护高标准', '确保合规和质量控制', '公平一致地执行规则', '保护组织和团队利益', '传承有价值的传统'], examples: ['严格执行安全标准，防止潜在事故发生', '在审计中确保100%合规，避免法律和财务风险', '建立并维护质量标准，提升团队整体表现', '抵制不合理的捷径，维护长期利益', '在变革中保留有价值的传统和核心原则'] }],
    strengthsDetailed: 'ESTJ的核心优势在于他们将愿景转化为现实的能力。他们不仅是梦想家，更是实干家——能够将抽象的目标转化为具体的行动计划，并确保这些计划得到有效执行。这种"让事情发生"的能力在各行各业都非常宝贵。ESTJ的组织才能不仅限于物流和资源管理，还包括对人的管理。他们善于识别每个人的优势和劣势，分配适合的任务，并创造一个每个人都能发挥所长的环境。他们的领导风格不是通过魅力或说服力，而是通过示范、坚持和对卓越的承诺。另一个关键优势是ESTJ的可靠性。在一个充满不确定性和变化的世界里，ESTJ提供了一种稳定性。他们的同事、朋友和家人都知道，当ESTJ承诺做某事时，他们会完成它。这种可预测性建立信任，使ESTJ成为团队和社区中的基石。ESTJ还擅长在压力下保持冷静和专注。当其他人可能感到不知所措时，ESTJ能够分析情况，确定优先级，并采取行动。这种在危机中的稳定性使他们成为优秀的应急管理者和危机处理者。此外，ESTJ对效率和质量的承诺推动着持续改进。他们总是寻找更好的方法，优化流程，消除浪费。这种对卓越的执着不仅提升了自己的表现，也激励周围的人达到更高的标准。',
    weaknesses: [{ title: '过度固执和缺乏灵活性', desc: '对既定方式的过度坚持可能阻碍创新和适应', impact: 'ESTJ对传统方法和既定程序的强烈信念可能导致他们抵制变革，即使变革是必要的。他们可能过于坚持"一直这样做"的方式，而忽视了新的、可能更有效的方法。这种固执可能使他们在快速变化的环境中落后，错过创新的机会，并导致与更具前瞻性的同事或伙伴的冲突。在极端情况下，这种僵化可能使组织或团队无法适应新的市场现实或技术变革。', solutions: ['有意识地质疑现有方法，定期评估是否还有更好的方式', '主动寻求不同观点，特别是来自直觉型（N）同事的建议', '将变化视为改进的机会而非威胁', '设定"实验期"，允许在不危及核心业务的情况下尝试新方法', '学习区分"有效的传统"和"过时的习惯"'] }, { title: '情感表达的困难和人际疏忽', desc: '对效率和逻辑的过度关注可能忽视情感因素', impact: 'ESTJ倾向于基于逻辑和效率做决策，这可能使他们忽视或低估情感因素的重要性。他们可能在不知情的情况下伤害他人的感情，显得冷漠或不关心。这种人际疏忽可能导致团队士气低落、员工流失，以及个人关系的紧张。ESTJ可能发现自己难以理解为什么其他人"不理解"他们的逻辑方法，从而导致挫败感和沟通障碍。', solutions: ['在做决策前，有意识地考虑对他人的情感影响', '学习识别和理解非语言的情感信号', '寻求关于自己人际风格的反馈，特别是关于同理心的反馈', '花时间了解团队成员的个人动机和关注点', '培养"情感暂停"习惯，在重要对话前考虑对方的感受'] }, { title: '过度控制和微观管理倾向', desc: '强烈的控制欲可能压制他人的自主性和创造力', impact: 'ESTJ对正确做事的承诺有时表现为过度控制和微观管理。他们可能觉得必须亲自监督每个细节，确保每件事都按他们的方式完成。这种行为可能压制团队成员的创造力、主动性和成长机会。长期来看，这可能导致依赖文化，团队成员不敢独立做决定，以及优秀人才的流失，因为他们感到不被信任或无法发挥潜力。', solutions: ['学会授权，明确期望后允许他人以自己的方式完成任务', '关注结果而非过程，只要目标达成，接受不同的方法', '逐步增加团队成员的责任范围，培养他们的能力', '承认"足够好"有时比"完美"更有价值', '信任他人的能力和意图，除非有明确的理由不这样做'] }, { title: '对批评的敏感和防御性', desc: '对能力和效率的自信可能转化为对批评的防御', impact: '虽然ESTJ以直接著称，但他们有时难以接受来自他人的直接反馈，特别是当这种反馈质疑他们的能力或方法时。他们可能将建设性的批评视为对其专业性的攻击，从而做出防御性反应。这种对批评的敏感可能阻止他们获得宝贵的成长机会，损害职业关系，并限制他们的发展潜力。', solutions: ['将反馈视为成长的机会，而非个人攻击', '主动寻求批评性反馈，展示开放的态度', '在收到批评时，先暂停再反应，避免立即辩护', '寻找反馈中的真相，即使表达方式不完美', '记住，承认错误并改进是力量的表现，而非软弱'] }],
    weaknessesDetailed: 'ESTJ的主要挑战在于平衡他们对效率和秩序的追求与对人和情境的灵活性理解。他们最大的盲点往往是他们认为最不需要担心的领域——情感因素和人际动态。ESTJ的果断和直接虽然是优势，但在某些情境下可能变成双刃剑。他们倾向于快速做出决定并立即执行，这可能导致在充分考虑所有因素之前就行动。特别是在涉及人的问题时，ESTJ可能过于迅速地判断情况，而没有充分考虑情感复杂性。另一个重要挑战是ESTJ对"正确方式"的执着。他们通常真诚地相信自己知道最佳方法，这种自信虽然是领导力的资产，但也可能使他们对他人的观点视而不见。ESTJ可能无意中创造一种环境，在这种环境中，不同意见不被鼓励，创新思维被压制。ESTJ还可能在与那些价值观或工作风格与他们不同的人相处时遇到困难。他们可能将组织性和效率视为普遍价值，而难以理解为什么有些人可能优先考虑创造力、灵活性或个人关系。然而，ESTJ具有克服这些挑战的能力。通过有意识地发展他们的劣势功能（内向情感Fi），他们可以成为更全面的领导者和更有同理心的人。关键是ESTJ要认识到，情感智能和人际技能与组织能力和效率同样重要——有时在实现长期成功方面甚至更重要。',
    relationships: { romance: { title: '恋爱关系中的总经理', desc: 'ESTJ在恋爱关系中寻求稳定、忠诚和相互尊重。他们不是那种追求激情浪漫或戏剧性爱情的类型，而是寻找一个可以共同建立稳固生活基础的伴侣。一旦ESTJ承诺了一段关系，他们会非常忠诚和投入，将伴侣视为生活的重要组成部分。他们通过实际行动表达爱意——确保账单按时支付、家庭维护良好、未来有规划——而不是通过甜言蜜语或浪漫姿态。', characteristics: ['忠诚和长期承诺', '通过行动而非言语表达爱', '寻求稳定和可预测性', '期望伴侣履行责任', '重视共同目标和价值观'], challenges: ['可能忽视情感表达的重要性', '过于关注实际问题而忽略浪漫', '对伴侣的期望可能过高', '可能显得控制欲强', '难以理解和回应伴侣的情感需求'], advice: ['有意识地学习伴侣的爱的语言，可能包括言语肯定、身体接触或质量时间', '定期安排专门的时间专注于关系，而不讨论家务或责任', '表达对伴侣的欣赏，不仅是因为他们所做的事，更是因为他们本身', '在冲突中，先倾听再解决问题，认可伴侣的感受', '允许关系中有一些自发性和乐趣，而不需要完全计划'] }, friendship: { title: '友谊关系', desc: 'ESTJ在友谊中表现出忠诚、可靠和实际的支持。他们可能不是那种每天都有长时间深入交谈的朋友，但当朋友真正需要帮助时，ESTJ会第一个出现。他们重视有共同价值观和兴趣的朋友，特别是那些同样重视责任、诚实和努力工作的人。ESTJ通常有一个较小的、经过精心选择的朋友圈，而不是大量的泛泛之交。', characteristics: ['极度忠诚和可靠', '提供实际帮助而非仅仅情感支持', '重视共同的价值观和活动', '长期稳定的友谊', '诚实直接的沟通'], challenges: ['可能过于直接而伤害朋友的感情', '可能评判那些不符合他们标准的朋友', '可能忽视友谊中情感联系的重要性', '当朋友需要情感支持而非实际建议时感到不适', '可能过于忙碌而忽视维护友谊'], advice: ['记住，朋友有时只需要倾听，而不是解决方案', '在提供建议之前，先确认朋友是否需要', '尊重朋友可能不同的生活方式和价值观', '定期联系朋友，而不仅仅是在需要帮助时', '学会欣赏不同类型的友谊，每种都有其独特价值'] }, parenting: { title: '亲子关系', desc: 'ESTJ父母通常致力于培养孩子的责任感、独立性和良好品格。他们设定明确的规则和期望，并坚持执行。ESTJ父母为孩子提供结构和稳定性，确保孩子知道什么是对什么是错。他们通过示范努力工作、履行承诺和维护标准来教导孩子。虽然他们可能不是那种过度溺爱或情感表达丰富的父母，但他们通过确保孩子的需求得到满足、提供教育机会和创造安全环境来表达爱。', characteristics: ['强调责任和纪律', '设定明确的规则和期望', '以身作则示范努力工作', '提供结构和稳定性', '关注孩子的长期发展'], challenges: ['可能过于严格或不灵活', '可能忽视孩子的情感需求', '可能与情感敏感的孩子产生冲突', '可能过于关注成就而忽视努力', '可能难以表达无条件的爱'], advice: ['记住，不同的孩子需要不同的养育方式', '在纪律和灵活性之间找到平衡', '有意识地表达情感和爱，即使感觉不自然', '认可孩子的感受，即使你认为他们反应过度', '庆祝孩子的独特性，而不是试图将他们塑造成特定形象'] } },
    career: { title: '职业发展方向', desc: 'ESTJ在需要组织能力、领导才能和结果导向的职业环境中表现出色。他们特别适合在传统、有明确层级和既定程序的组织中工作。ESTJ在管理、行政、法律、军事、执法、金融和项目管理等领域都能找到满意的职业。他们渴望有权威、责任和明确成功标准的位置。', suitable: ['企业高管和中层管理者', '项目经理', '军官和军事领导', '法官和律师', '警察和执法官员', '财务经理和会计师', '学校管理者', '政府官员', '医疗管理者', '运营经理'], suitableDetails: [{ career: '企业高管', reason: 'ESTJ的战略思维、组织能力和果断决策使他们成为优秀的企业领导者。他们善于设定目标、分配资源并确保团队达成目标。' }, { career: '项目经理', reason: '项目管理需要同时处理多个任务、协调各方资源并确保按时交付，这正是ESTJ的核心能力所在。' }, { career: '军官', reason: '军事环境需要纪律、等级制度和对命令的服从，这与ESTJ的价值观完美契合。他们的领导能力和在压力下保持冷静的能力尤为宝贵。' }, { career: '法官', reason: '法官需要公正地应用法律、维护秩序并做出明确裁决。ESTJ对规则、公平和一致性的尊重使他们适合这一角色。' }, { career: '财务经理', reason: '财务管理需要准确性、合规性和风险管理，这些都是ESTJ擅长的领域。他们善于制定预算、监督财务运作并确保合规。' }], unsuitable: ['高度抽象或理论性的研究工作', '需要频繁情感交流的心理咨询', '缺乏结构和明确目标的艺术创作', '需要不断适应变化的初创企业早期阶段', '重复性高、没有晋升机会的工作'], workStyle: 'ESTJ喜欢有明确结构、清晰期望和可衡量结果的工作环境。他们偏好有权威、责任和决策权的位置。', workStyleDetailed: `ESTJ在职场中通常表现为高效、可靠和目标导向。他们喜欢制定计划、设定目标并系统地朝着这些目标工作。ESTJ偏好有明确职责、清晰报告线和可衡量成果的角色。他们在有结构、有组织的环境中表现最佳，喜欢知道期望是什么，并有权力确保这些期望得到满足。

ESTJ通常是早到迟退的员工，他们对工作有强烈的责任感。他们不仅关注完成自己的工作，还关注确保整个团队或部门的成功。这种大局观使他们成为优秀的管理者和领导者。

在团队中，ESTJ通常自然而然地承担领导角色，即使没有被正式任命。他们善于组织团队活动、协调资源并推动项目前进。然而，他们需要学会在不需要领导时退后，让其他人也有机会发展和展示能力。`, workStyleDetails: ['偏好明确的职责和报告线', '喜欢有权威和决策权', '重视可衡量的结果和绩效', '善于在压力下保持冷静和专注', '倾向于早到迟退，展现职业承诺'] },
    growth: { opportunities: ['情感智能和同理心', '灵活性和适应性', '授权和信任他人', '接受不确定性和模糊性', '发展直觉和创造力'], opportunitiesDetailed: [{ area: '情感智能', desc: '发展识别、理解和管理自己和他人情感的能力。这对ESTJ的人际关系和领导效能至关重要。', actions: ['阅读情感智能相关书籍，如丹尼尔·戈尔曼的《情感智能》', '定期进行自我反思，识别自己的情绪触发因素', '主动寻求关于自己人际风格的反馈', '练习积极倾听，不仅听内容，还要听情感', '在决策前，有意识地考虑对他人的情感影响'] }, { area: '灵活性', desc: '学会在必要时调整计划和方法，接受新的想法和方法，而不是固守既定方式。', actions: ['每周尝试一件不同的事情，打破常规', '当有人提出不同方法时，先暂停判断，认真考虑', '定期评估现有流程，询问"有更好的方法吗？"', '参加创新思维或设计思维工作坊', '与不同类型的人合作，学习他们的方法'] }, { area: '授权和信任', desc: '学会放手，允许他人以自己的方式完成任务，只在必要时提供指导。', actions: ['识别可以委托的任务，从低风险的开始', '明确期望后，允许他人自主决定如何完成任务', '抵制检查进度的冲动，设定检查点而非持续监督', '庆祝他人的成功，即使他们的方法与你想的不同', '记住，让他人成长有时比立即得到"正确"结果更重要'] }], actions: ['每天花时间反思当天的互动，识别可以改进的地方', '每月与一位信任的朋友或导师讨论个人成长目标', '在感到沮丧或压力大时，先暂停再反应', '定期阅读关于领导力、人际关系和自我发展的书籍', '参加工作坊或培训课程，发展劣势功能'], detailedAdvice: `ESTJ的个人成长之路在于从"做"到"带领他人做"的转变，以及从"关注任务"到"关注人和任务"的转变。这需要他们走出舒适区，发展那些不太自然但极其重要的技能。

首先，ESTJ需要认识到，情感智能不是软弱的标志，而是有效领导的关键组成部分。最成功的领导者不仅擅长制定战略和执行计划，还擅长激励、理解和连接他人。

其次，ESTJ需要学会欣赏不同的工作风格和方法。不是所有问题都需要立即解决，不是所有任务都需要完美完成，不是所有人都以相同方式工作。学会在"足够好"和"完美"之间找到平衡，在"现在"和"稍后"之间找到平衡。

最后，ESTJ需要培养耐心和谦逊。成长不是线性的，会有挫折和反复。关键是保持开放的心态，愿意从错误中学习，并不断努力成为更好的自己。`, longTermGoals: ['成为能够平衡效率与人文关怀的领导者', '建立深厚、有意义的人际关系', '发展出既有效又灵活的处事方式', '培养创造力和直觉能力', '成为他人的导师和榜样'] },
    stress: { triggers: ['效率低下和组织混乱', '失去控制和不确定性', '不公正或不公平的待遇', '情感冲突和人际紧张', '长期缺乏明确的目标或方向'], triggersDetailed: [{ trigger: '效率低下', explanation: '当工作流程混乱、团队成员不履行职责或资源被浪费时，ESTJ会感到极度沮丧。他们重视效率，看到事情没有以最佳方式进行会产生强烈的压力。' }, { trigger: '失去控制', explanation: 'ESTJ需要感到他们对环境和结果有一定程度的控制。当面对不可预测的变化、模糊的指示或无法影响的情况时，他们会感到焦虑。' }, { trigger: '不公正', explanation: 'ESTJ对公平和正义有强烈的信念。当他们目睹或经历不公正的待遇、规则被选择性执行或有人逃避责任时，他们会感到愤怒和压力。' }, { trigger: '情感冲突', explanation: 'ESTJ偏好直接、基于事实的沟通。当面对情绪化的情况、被动攻击行为或需要处理复杂人际动态时，他们会感到不适和压力。' }], signs: ['急躁和易怒', '过度控制倾向', '睡眠困难', '身体紧张（如头痛、肌肉紧绷）', '变得批判和挑剔', '社交退缩', '过度工作以重新获得控制感'], signsDetailed: [{ stage: '初期阶段', signs: ['感到轻微烦躁', '对低效率更加敏感', '开始更频繁地检查进度'] }, { stage: '中期阶段', signs: ['对团队成员表现出不耐烦', '睡眠开始受到影响', '工作更长时间试图控制局面'] }, { stage: '严重阶段', signs: ['明显的易怒和愤怒', '身体症状如头痛或消化问题', '与他人的冲突增加', '感到不知所措和精疲力尽'] }], coping: ['身体运动和锻炼', '重新建立秩序和结构', '与信任的人交谈', '练习放松技巧', '暂时远离压力源'], copingDetailed: [{ method: '身体活动', steps: ['进行有氧运动如跑步、游泳或骑车', '参加团队运动如篮球或足球', '进行力量训练', '简单地散步，特别是在自然环境中'] }, { method: '秩序重建', steps: ['创建一个待办事项清单，按优先级排序', '整理工作空间', '制定清晰的行动计划', '设定小目标并逐步完成'] }, { method: '社交支持', steps: ['与理解你性格的朋友或家人交谈', '寻求导师或教练的建议', '参加支持小组或专业网络', '与同样类型的同事分享经验'] }, { method: '放松技巧', steps: ['练习深呼吸或冥想', '尝试渐进性肌肉放松', '进行瑜伽或太极', '确保充足的睡眠'] }] },
    famousPeople: [{ name: '约翰·D·洛克菲勒', title: '企业家', contribution: '商业帝国', traits: ['效率', '组织'] }, { name: '詹姆斯·门罗', title: '政治家', contribution: '门罗主义', traits: ['领导力', '决断'] }]
  },
  ESFJ: {
    type: 'ESFJ',
    name: '执政官',
    nameEn: 'Consul',
    category: 'sentinels',
    categoryEn: 'Sentinels',
    tagline: '热心合作者',
    slogan: '关心他人，维护和谐',
    description: 'ESFJ是热心、有责任心的人，关心他人，维护社会和谐。',
    detailedDescription: 'ESFJ（执政官/领事）是热心的合作者，善于建立和谐的人际关系。他们是天生的社交能手，总是关注他人的需求，致力于维护社会秩序和传统价值观。ESFJ具有强烈的责任感和归属感，无论是家庭、社区还是其他社会群体，他们都会尽职尽责、充满爱心地履行自己的职责。\n\n执政官与生俱来的实用性被为他人服务的强烈愿望所调和。鉴于他们内在的责任感，许多具有这种人格类型的人感到被召唤去建议、指导或帮助他人。社会习俗和习俗对他们很重要，告知他们为自己和他人设定的标准。结果，ESFJ经常成长为"模范公民"，成为他们社区的支柱。\n\n得益于观察者和判断者特质的结合，ESFJ们生活在一个有着明显区别的具体世界中。他们对是非、真假有着坚定的判断力，并且经常使用特定的、定义明确的价值观来指导他们的决定。作为外向者，ESFJ喜欢与他人交流。他们的社交生活常常围绕着集体聚会展开，他们在热闹的聚会或轻松的野餐中同样自在。团队动态可以激发ESFJ的活力，因此与老朋友一对一地喝杯咖啡对他们来说可能不如大型团聚更有吸引力。\n\nESFJ们发现在任何地方都很容易与人会面，但他们特别想通过民间组织或宗教团体等受人尊敬的传统机构与他人联系。在空闲时间，他们发现自己在培养这些联系并参与相关活动，从筹款活动到董事会会议。执政官讨厌让人失望，无论他们是与几个朋友制定计划还是承诺会面，其他人都可以指望他们不会在最后一刻放弃。',
    traits: [{ trait: '热心肠', explanation: '关心他人福祉' }, { trait: '合作精神', explanation: '善于团队合作' }, { trait: '责任感', explanation: '承担责任' }, { trait: '社交能力', explanation: '善于与人交往' }],
    traitsDetailed: [{ title: '社交活力与关怀', content: 'ESFJ具有惊人的才能，既是派对的生命又是细心的母鸡。他们是最外向的性格类型之一，无论个人情况如何，都能与他人建立联系。与此同时，他们总是关心周围的人，并可能会检查周围人的幸福状况（密切关注被认为散乱的人）。天生热情的人，ESFJ往往是受欢迎的人，这可以归因于定义他们价值体系的三大支柱——合作、社会化和社区。' }, { title: '责任与忠诚', content: 'ESFJ对他们的社区，尤其是他们的家庭非常忠诚。他们努力实现他们的社区认为安全和成功的目标。即使需要做出一些个人牺牲，他们也倾向于克服困难。这种高容忍度阈值也适用于他们的工作方式。最平凡的工作对ESFJ来说都不是问题，只要他们掌握了它的目的，或者如果它与强烈的感官义务相结合。ESFJ宁愿加班失眠，也不愿交出粗制滥造或不完整的工作，如果他们知道自己所做的工作正在帮助他人，这种责任感就会增强。' }, { title: '传统与秩序的守护者', content: 'ESFJ是一种文化传统和公认标准的监督者，这体现了他们对秩序和可预测性的热爱，并有助于促进稳定。协议就像ESFJ本身一样可靠。如果一切都处于不断变化的状态，那么生活就会变得一团糟。ESFJ的家很可能是传统的，具有公认的价值观和实践规范。在工作场所或学校，他们会发现自己与机构的程序和期望保持一致。ESFJ会了解规则，不仅会遵守规则，而且如果有人无视法令，他们会捍卫和执行法令。' }, { title: '情感敏感与和谐追求', content: 'ESFJ非常了解他人的感受，他们认为做传统的事情是通向幸福的最明确途径。这些特征结合起来造就了表达自己意见的人（无论其他人是否要求）。然而，平衡的ESFJ明白，有时最好的做法是放任某人，让他们按照自己的选择过自己的生活。ESFJ不喜欢冲突，但如果必须的话，他们会参与其中。他们试图为了那个人自己的利益而纠正某人认为不正确的行为。' }],
    cognitiveFunctions: [{ symbol: 'Fe', name: '外向情感', level: '主导', description: '关注他人情感和社会和谐。', detailedDescription: '外向情感让ESFJ关注他人和社会和谐。', characteristics: ['情感关注', '和谐维护'] }, { symbol: 'Si', name: '内向感觉', level: '辅助', description: '关注细节和传统。', detailedDescription: '内向感觉帮助ESFJ关注细节。', characteristics: ['细节关注', '传统尊重'] }, { symbol: 'Ne', name: '外向直觉', level: '第三', description: '探索可能性。', detailedDescription: '探索新方法和可能性。', characteristics: ['可能性探索'] }, { symbol: 'Ti', name: '内向思考', level: '劣势', description: '内在逻辑。', detailedDescription: '内在逻辑分析。', characteristics: ['逻辑分析'] }],
    strengths: [{ title: '卓越的社交能力', desc: '天生的社交能手', details: 'ESFJ具有惊人的社交才能，无论个人情况如何，都能与他人建立联系。他们是最外向的性格类型之一，总是关心周围的人，并会检查周围人的幸福状况。天生热情的人，ESFJ往往是受欢迎的人，这可以归因于定义他们价值体系的三大支柱——合作、社会化和社区。', detailsList: ['与他人建立深厚联系', '关注周围人的幸福', '热情友好的态度', '促进合作与社区建设'], examples: ['在社交聚会上让每个人都感到受欢迎', '组织大型家庭聚会', '协调团队合作项目', '维护社区关系网络'] }, { title: '强烈的责任感', desc: '尽职尽责的守护者', details: 'ESFJ对他们的社区，尤其是他们的家庭非常忠诚。他们努力实现他们的社区认为安全和成功的目标。即使需要做出一些个人牺牲，他们也倾向于克服困难。ESFJ宁愿加班失眠，也不愿交出粗制滥造或不完整的工作，如果他们知道自己所做的工作正在帮助他人，这种责任感就会增强。', detailsList: ['对家庭和社区的忠诚', '克服困难完成任务', '宁愿牺牲也不敷衍', '帮助他人是内在动力'], examples: ['为了完成项目加班工作', '在困难时期支持家人', '履行承诺从不食言', '主动承担额外责任帮助团队'] }, { title: '出色的组织协调能力', desc: '高效的组织者和协调者', details: 'ESFJ善于利用他们的敏感度与朋友的动机和动力保持一致，并为这些目标做出很大贡献。他们善于利用自己的敏感度与他人的动机和动力保持一致。ESFJ精力充沛、务实且情绪化，是极好的团队成员，并且总是乐于将另一个可靠的人带入他们的生活。', detailsList: ['敏锐察觉他人动机', '协调团队目标', '务实且精力充沛', '建立支持框架'], examples: ['策划和执行大型活动', '协调多方资源完成项目', '建立有效的支持系统', '促进团队成员间的合作'] }, { title: '维护和谐与传统', desc: '社会秩序的维护者', details: 'ESFJ是文化传统和公认标准的监督者，这体现了他们对秩序和可预测性的热爱，并有助于促进稳定。ESFJ会了解规则，不仅会遵守规则，而且如果有人无视法令，他们会捍卫和执行法令。作为情感外向的人，有爱心的ESFJ的基本天性可能不接受违反规则的人，但秩序对他们来说可能足够重要，他们会这样做。', detailsList: ['维护文化传统', '促进社会稳定', '遵守并执行规则', '创造可预测的环境'], examples: ['维护家庭传统习俗', '在社区中倡导遵守规则', '创建有序的工作环境', '调解冲突恢复和谐'] }],
    strengthsDetailed: 'ESFJ的核心优势在于出色的社交能力和真诚的关怀。',
    weaknesses: [{ title: '过度在意', desc: '太在意他人看法', impact: '可能失去自我。', solutions: ['建立自信', '关注自己'] }, { title: '冲突回避', desc: '避免冲突', impact: '问题可能被压抑。', solutions: ['面对冲突', '表达想法'] }, { title: '自我牺牲', desc: '过度自我牺牲', impact: '忽视自身需求。', solutions: ['设定界限', '照顾自己'] }, { title: '传统依赖', desc: '过度依赖传统', impact: '抵制变革。', solutions: ['保持开放', '接受变化'] }],
    weaknessesDetailed: 'ESFJ的挑战在于平衡关怀他人与照顾自己。由于ESFJ的自尊和自信建立在他们成功履行职责的基础上，当他们对自己或自己的生活感觉不佳时，他们的责任感可能会"过热"以寻求积极的自我意识。他们可能会不懈地努力去感受那种负责任的成就感，而不是将自我照顾和休息融入他们的生活。如果不为自己花时间并找到一些放松的方式，ESFJ们很可能会精疲力尽。当一个人筋疲力尽时，他们会变得筋疲力尽，并对曾经让他们兴奋的事情失去热情。这会让他们失去动力。\n\nESFJ使自己如此了解他人需求的敏感性，如果他们感到一丝不安全，也会对他们不利。他们可能对最轻微的轻蔑反应过于敏感。所爱之人最微妙的轻蔑姿态可能开始让人感觉像是压倒性的猛烈抨击。更进一步，当有人公然批评ESFJ时，可能会摧毁这些敏感的灵魂。当他们感到受伤时，ESFJ可能会诉诸冷遇或严重的被动攻击等策略。\n\nESFJ的挑战还包括对变革的抗拒。成为地球之盐并不意味着他们拥有地球。如果ESFJ不能平衡既定标准与变化，即使事情迅速变化，坚持旧观念也会产生保护性偏执。ESFJ们可能很难看到不断变化的道德、不断发展的方法和对传统标准的无视，而不会对他们的方向做出严厉的判断。',
    relationships: { romance: { title: '恋爱关系中的ESFJ', desc: 'ESFJ在他们的关系中投入和关注，愿意做出牺牲来支持他们的伴侣。虽然他们可能不会直接要求，但ESFJ们 - 在他们的内心深处 - 希望找到一个愿意为他们做同样事情的人。最重要的是，ESFJ们渴望有一个能分享他们的价值观并让他们深感感激的合作伙伴。爱情给ESFJ带来稳定感，当他们处于伙伴关系中时，他们可能会感觉更完整。这种性格类型的人天性外向，很容易与他人交往，他们可能会发现很容易遇到潜在的对象并开始新的关系。家庭是ESFJ们的头等大事，许多人都渴望找到一个共同抚养孩子的生活伴侣。', characteristics: ['忠诚投入', '温暖关怀', '寻求稳定', '重视承诺'], challenges: ['过度敏感', '批评反应', '期望过高', '失去自我'], advice: ['学会自信表达', '管理批评反应', '调整期望', '保持独立性'], compatibility: [{ type: 'ISTP', desc: 'ISTP为ESFJ带来实用性和灵活性，两者互补平衡。ISTP的冷静和务实可以帮助ESFJ更好地处理突发情况。' }, { type: 'ISFP', desc: 'ISFP与ESFJ共享情感特质，能够理解彼此的情感需求，创造温暖和谐的关系。' }, { type: 'ESFP', desc: 'ESFP与ESFJ共享外向和观察特质，能够一起享受社交活动和当下乐趣。' }, { type: 'ESTP', desc: 'ESTP为ESFJ带来冒险精神和自发性，帮助ESFJ走出舒适区体验新事物。' }] }, friendship: { title: '友谊关系中的ESFJ', desc: 'ESFJ是非常社交的人格类型，他们寻求广泛的朋友圈，并且非常愿意花费必要的时间和精力来维持这些关系。ESFJ们乐观而热情，以热情好客和提供源源不断的情感支持和鼓励而著称。他们将友谊视为一种神圣的责任，同时也是一种充实的快乐，对每个朋友都一视同仁。对于这种类型的人来说，参与别人的生活是非常令人满意的，他们喜欢尽可能地做出积极的改变。', characteristics: ['热情好客', '情感支持', '忠诚可靠', '社交活跃'], challenges: ['维持深度', '接受不同', '避免过度付出', '处理冲突'], advice: ['深化重要关系', '尊重差异', '设定界限', '健康面对分歧'], compatibility: [{ type: 'ESFP', desc: 'ESFP与ESFJ共享外向特质，能够一起享受社交活动和娱乐。' }, { type: 'ENFJ', desc: 'ENFJ与ESFJ共享情感特质，能够相互理解和支持。' }, { type: 'ISFJ', desc: 'ISFJ与ESFJ共享观察判断特质，价值观相似，容易建立深厚友谊。' }, { type: 'ESTJ', desc: 'ESTJ与ESFJ共享判断特质，能够共同维护社会秩序和传统。' }] }, parenting: { title: '亲子关系中的ESFJ', desc: 'ESFJ父母创造温暖、有序的家庭环境，致力于培养孩子的社交能力和责任感。他们重视家庭传统，希望孩子能够在充满爱的环境中成长。ESFJ父母通常会投入大量时间和精力来确保孩子的需求得到满足，并帮助孩子建立良好的社会关系。', characteristics: ['温暖关怀', '责任感强', '传统重视', '社交培养'], challenges: ['设定界限', '培养独立', '避免过度保护', '接受不同'], advice: ['设定清晰界限', '鼓励独立思考', '允许孩子犯错', '尊重孩子个性'] } },
    career: { title: 'ESFJ的职业发展', desc: 'ESFJ在需要人际互动、关怀他人和维护社会秩序的职业中表现出色。他们倾向于从事可以对他人生活产生积极影响的领域，例如医学、教育、社会工作或咨询。除了这些经典的"帮助"职位外，ESFJ在一系列面向外的角色中表现出色——从客户服务和零售到宣传和公共关系。由于他们注重细节的天性，ESFJ在行政或文书角色中大放异彩，并且由于他们对团队动态的热情和敏感，他们在人力资源或招聘方面也很出色。', suitable: ['教师', '护士', '医生', '社会工作者', '人力资源专员', '销售代表', '公关专员', '客户服务经理', '行政管理', '咨询师'], suitableDetails: [{ career: '教师', reason: 'ESFJ的关怀天性和组织能力使他们成为优秀的教育者，能够创造支持性的学习环境。' }, { career: '护士/医生', reason: '医疗领域需要ESFJ的关怀特质和责任感，他们能够为患者提供温暖和专业的照顾。' }, { career: '人力资源专员', reason: 'ESFJ对人际动态的敏感性和组织协调能力在HR领域非常有价值。' }, { career: '社会工作者', reason: '帮助弱势群体是ESFJ的核心动力，他们能够在社会服务领域发挥重要作用。' }, { career: '销售代表', reason: 'ESFJ的社交能力和说服力使他们在销售岗位上表现出色。' }, { career: '公关专员', reason: 'ESFJ维护形象和处理人际关系的能力在公关领域非常重要。' }], unsuitable: ['高度孤立的研究工作', '纯粹的技术编程', '需要频繁冲突处理的法律工作', '缺乏人际互动的工作', '高度抽象的理论研究'], workStyle: 'ESFJ在工作中喜欢与人合作，关注团队和谐，致力于帮助他人并维护组织的秩序和传统。', workStyleDetailed: 'ESFJ在需要社交和关怀的角色中表现出色。他们尊重规则和准则，忠诚和责任感使他们成为可靠、高效的员工。值得信赖的是，他们会注意细节并遵守协议，即使不这样做会更容易。因为他们觉得必须按时完成任务并完成任务，所以他们可能需要保护自己免受那些试图强加给他们额外工作或义务的人的伤害。ESFJ感到有必要在生活的各个方面（从家庭生活到职业和学业）给予他人并超出期望。这可能导致他们牺牲自己的自我照顾，甚至放弃他们感兴趣的科目或职业来取悦他人。', workStyleDetails: ['善于团队合作', '注重细节和秩序', '乐于助人', '遵守规则和协议', '对团队动态敏感', '追求卓越表现'] },
    growth: {
      opportunities: ['独立性', '自我肯定', '灵活性', '压力管理'],
      opportunitiesDetailed: [
        { area: '独立性', desc: 'ESFJ需要发展独立性，减少对他人认可的依赖。', actions: ['培养个人兴趣', '独立做决策', '享受独处时间'] },
        { area: '自我肯定', desc: '建立内在的自我价值感。', actions: ['认识自身价值', '接受不完美', '庆祝个人成就'] },
        { area: '灵活性', desc: '学会适应变化和不确定性。', actions: ['尝试新事物', '接受不同观点', '放宽对完美的要求'] },
        { area: '压力管理', desc: '学会识别和管理压力。', actions: ['定期自我照顾', '设定界限', '寻求支持'] }
      ],
      actions: ['发展个人兴趣', '学习接受批评', '建立健康界限', '培养自信'],
      detailedAdvice: 'ESFJ需要发展独立性，减少对外界认可的依赖。通过培养个人兴趣和建立健康的自我界限，他们可以找到内在的价值感。同时，学会接受批评和不确定性，将有助于他们的个人成长。',
      longTermGoals: ['建立内在自信', '平衡关怀他人与自我照顾', '发展独立决策能力', '提高适应变化的能力']
    },
    stress: {
      triggers: ['人际冲突', '被排斥', '批评', '不被认可'],
      triggersDetailed: [
        { trigger: '人际冲突', explanation: 'ESFJ对人际和谐非常重视，冲突会让他们感到极大的压力。' },
        { trigger: '社交排斥', explanation: '感到被群体排斥或不被接纳会触发他们的不安全感。' },
        { trigger: '批评', explanation: '即使是建设性的批评也可能让他们感到受伤。' },
        { trigger: '不被认可', explanation: '当他们的付出没有得到认可时会感到沮丧。' }
      ],
      signs: ['焦虑不安', '取悦行为', '情绪波动', '身体症状'],
      signsDetailed: [
        { stage: '初期', signs: ['感到轻微焦虑', '过度关注他人反应'] },
        { stage: '中期', signs: ['情绪波动加剧', '睡眠问题', '食欲改变'] },
        { stage: '严重', signs: ['持续的焦虑', '回避社交', '身体疲劳'] }
      ],
      coping: ['社交支持', '自我照顾', '放松技巧', '专业帮助'],
      copingDetailed: [
        { method: '社交支持', steps: ['与信任的朋友交谈', '寻求家人的支持', '加入支持小组'] },
        { method: '自我照顾', steps: ['保证充足睡眠', '健康饮食', '定期运动', '培养个人爱好'] },
        { method: '放松技巧', steps: ['深呼吸练习', '冥想', '瑜伽', '渐进式肌肉放松'] },
        { method: '专业帮助', steps: ['寻求心理咨询', '参加压力管理课程', '考虑短期治疗'] }
      ]
    },
    famousPeople: [
      { name: '泰勒·斯威夫特', title: '美国歌手词曲作者', contribution: '音乐创作和慈善事业', traits: ['善于表达', '关怀他人', '社交能力强'] },
      { name: '比尔·克林顿', title: '美国前总统', contribution: '政治领导和公共服务', traits: ['魅力', '社交手腕', '善于沟通'] },
      { name: '詹妮弗·加纳', title: '美国女演员', contribution: '演艺事业和慈善工作', traits: ['温暖', '务实', '家庭导向'] },
      { name: '史蒂夫·哈维', title: '美国电视主持人', contribution: '娱乐节目主持', traits: ['幽默', '善于社交', '乐于分享'] }
    ]
  },
  ISTP: {
    type: 'ISTP',
    name: '鉴赏家',
    nameEn: 'Virtuoso',
    category: 'explorers',
    categoryEn: 'Explorers',
    tagline: '冷静的实验者',
    slogan: '喜欢动手实践，追求自由',
    description: 'ISTP是冷静、务实和独立的实验者，喜欢动手解决问题，追求自由和效率。',
    detailedDescription: 'ISTP（鉴赏家/巧匠）是冷静、务实且极具独立精神的实验者。他们是天生的动手能手，善于使用工具和机械，能够迅速理解事物的工作原理。ISTP活在当下，关注具体的事实和细节，而不是抽象的理论。他们灵活、适应性强，善于在危机中保持冷静并找到实际的解决方案。ISTP重视个人自由和独立，不喜欢被规则、惯例或他人的期望所束缚。他们是典型的"独行侠"，喜欢自主工作，按照自己的节奏和方式完成任务。虽然ISTP可能显得沉默寡言甚至有些冷漠，但他们内心深处有着强烈的公平感和对效率的追求。他们是实用主义者，相信行动胜于言语，喜欢通过实际成果来证明自己。',
    traits: [{ trait: '实用主义', explanation: '注重实际效果和可行性，关注具体事实' }, { trait: '独立性', explanation: '喜欢自主工作，追求个人自由' }, { trait: '灵活性', explanation: '适应力强，能够迅速调整策略' }, { trait: '冷静理性', explanation: '在压力下保持冷静和客观' }, { trait: '动手能力', explanation: '善于使用工具和解决实际问题' }, { trait: '效率导向', explanation: '追求最有效的方法和解决方案' }],
    traitsDetailed: [{ title: '实用解决与动手能手', content: 'ISTP是出色的问题解决者，他们善于分析情况，找到最直接、最有效的解决方案。他们天生具有动手能力，喜欢拆卸和重组事物，理解其内部运作原理。无论是修理机械、调试设备还是解决技术问题，ISTP都能够凭借直觉和经验迅速找到症结所在。他们不依赖理论或书本知识，而是通过实际探索和实验来学习和发展技能。' }, { title: '独立自主与自由追求', content: 'ISTP高度重视个人独立和自由。他们不喜欢被监督、 micromanagement 或过多的规则束缚。ISTP希望按照自己的方式工作，以自己的节奏完成任务。他们需要空间来思考和行动，过多的社交互动或外部干扰会让他们感到疲惫和受限。这种独立性使ISTP成为优秀的自主工作者，但也可能导致他们在团队环境中显得疏离。' }, { title: '冷静应对与危机处理', content: 'ISTP在压力和危机情况下表现出色。他们天生冷静、客观，不容易被情绪左右。当其他人陷入恐慌时，ISTP能够迅速分析情况，识别关键问题，并采取有效的行动。这种特质使他们在紧急服务、军事行动、医疗急救等领域表现出色。他们能够在高压力环境下保持清晰的思维和稳定的操作。' }, { title: '灵活适应与即兴能力', content: 'ISTP具有极强的适应能力和即兴发挥的天赋。他们不喜欢严格的计划或固定的程序，而是更喜欢根据情况灵活调整。当计划改变或出现意外情况时，ISTP能够迅速适应并找到新的解决方案。这种灵活性使他们能够在变化多端的环境中蓬勃发展，但也可能导致他们对长期承诺感到不适。' }, { title: '沉默观察与深度专注', content: 'ISTP通常是安静的观察者，喜欢在一旁观察和分析，而不是积极参与社交互动。他们具有深度专注的能力，能够长时间专注于感兴趣的任务或问题。这种专注力使ISTP在技术领域和需要精细操作的工作中表现出色。然而，他们的沉默可能被误解为冷漠或不感兴趣。' }],
    cognitiveFunctions: [{ symbol: 'Ti', name: '内向思考', level: '主导', description: '内在逻辑分析和问题解决。', detailedDescription: '内向思考是ISTP的主导功能，为他们提供强大的分析能力和逻辑思维。ISTP善于拆解复杂问题，理解系统的工作原理，并找到最有效的解决方案。他们追求内在的逻辑一致性，喜欢理解"为什么"和"如何"。这种功能使ISTP成为优秀的问题解决者和技术专家，但也可能导致他们过于关注逻辑而忽视情感因素。', characteristics: ['逻辑分析', '问题解决', '系统理解', '效率追求', '客观评估', '独立判断'] }, { symbol: 'Se', name: '外向感觉', level: '辅助', description: '关注当下体验和实际感知。', detailedDescription: '外向感觉帮助ISTP关注当下时刻和具体的感官体验。他们对环境中的细节敏感，善于观察事实和实际情况。这使他们能够快速对环境做出反应，抓住机会，并享受当下的体验。Se功能也赋予ISTP出色的动手能力和协调性，使他们在需要精细操作的任务中表现出色。', characteristics: ['当下体验', '实际操作', '感官敏锐', '灵活应变', '动手能手', '观察力强'] }, { symbol: 'Ni', name: '内向直觉', level: '第三', description: '内在洞察和未来预见。', detailedDescription: '内向直觉为ISTP提供偶尔的洞察和模式识别能力。虽然这不是他们最强的功能，但在某些时刻，ISTP可能会突然洞察到问题的核心或未来的发展趋势。当这个功能发展良好时，ISTP能够在保持实用主义的同时，具备一定的战略眼光。', characteristics: ['洞察', '预见', '模式识别', '直觉感知'] }, { symbol: 'Fe', name: '外向情感', level: '劣势', description: '情感表达和社交和谐。', detailedDescription: '外向情感是ISTP的劣势功能，意味着他们在表达情感和维护社交和谐方面可能面临挑战。ISTP可能难以识别和表达自己的情感，也可能不太敏感于他人的情感需求。发展这个功能可以帮助ISTP建立更深层次的人际关系，并在必要时提供情感支持。', characteristics: ['情感表达', '社交和谐', '共情能力'] }],
    strengths: [{ title: '卓越的问题解决能力', desc: 'ISTP善于分析复杂问题并找到实际解决方案', details: 'ISTP最令人印象深刻的能力是他们的问题解决技能。他们能够迅速分析复杂情况，识别关键问题，并找到最直接、最有效的解决方案。他们不拘泥于传统方法，而是喜欢通过实验和创新来解决问题。ISTP善于从多个角度审视问题，这种灵活性使他们能够找到其他人可能忽视的解决方案。', detailsList: ['快速分析问题核心', '创新解决方案', '不拘泥于传统方法', '多角度审视问题', '实用导向的思维'], examples: ['快速诊断和修复技术故障', '在紧急情况下找到逃生路线', '优化工作流程提高效率', '设计创新的机械解决方案', '在危机中迅速做出正确决策'] }, { title: '出色的动手能力和技术天赋', desc: 'ISTP天生具有卓越的手眼协调和技术操作能力', details: 'ISTP拥有出色的手眼协调能力和技术操作技能。他们善于使用各种工具和设备，能够快速掌握新的技术和技能。无论是机械维修、电子设备、体育运动还是手工艺，ISTP都能够凭借天赋和实践迅速达到高水平。他们喜欢亲自动手，通过实践来学习和发展技能。', detailsList: ['精通工具使用', '快速掌握新技术', '精细操作能力', '通过实践学习', '技术故障排除'], examples: ['成为优秀的机械师或工程师', '在体育竞技中展现出色技巧', '掌握复杂的飞行操作', '成为出色的外科医生或急救人员', '在手工艺术中展现精湛技艺'] }, { title: '危机中的冷静与果断', desc: 'ISTP在压力和危机情况下保持冷静并果断行动', details: 'ISTP在高压和危机环境中表现出色。他们天生冷静、客观，不容易被情绪左右。当其他人陷入恐慌时，ISTP能够迅速评估情况，识别风险，并采取有效的行动。这种特质使他们在紧急服务、军事行动、医疗急救等高风险领域表现出色。他们能够在极端压力下保持清晰的思维和稳定的操作。', detailsList: ['压力下保持冷静', '快速风险评估', '果断采取行动', '清晰的危机思维', '稳定的高性能'], examples: ['在紧急医疗情况下保持冷静操作', '在军事行动中做出快速战术决策', '在自然灾害中组织和执行救援', '在商业危机中迅速找到出路', '在竞技体育中逆转劣势'] }, { title: '独立自主与自我驱动', desc: 'ISTP能够独立工作并自我驱动完成任务', details: 'ISTP是高度独立和自我驱动的个体。他们不需要外部监督或激励，能够自主设定目标并努力实现。他们按照自己的节奏和方式工作，不依赖他人的指导或批准。这种独立性使ISTP成为优秀的自主创业者、自由职业者和独立研究者。他们能够自我激励，在没有外部压力的情况下保持高效率。', detailsList: ['自主设定目标', '独立完成任务', '自我激励', '不依赖外部监督', '按自己节奏工作'], examples: ['成功经营独立业务', '完成复杂的个人项目', '在没有监督的情况下保持高效', '自主学习和掌握新技能', '在远程工作环境中表现出色'] }, { title: '灵活适应与快速学习', desc: 'ISTP能够快速适应新环境并掌握新技能', details: 'ISTP具有极强的适应能力和快速学习能力。他们能够迅速适应新环境、新技术和新挑战。他们不固守既定方法，而是愿意尝试新的方式和工具。这种灵活性使ISTP在技术快速变化的行业中表现出色，也使他们能够在不同的工作环境中快速上手。', detailsList: ['快速适应新环境', '迅速掌握新技能', '灵活调整方法', '接受新技术', '多领域能力'], examples: ['快速适应新的工作角色', '掌握多种不相关的技能', '在技术更新时快速转型', '在不同的文化环境中工作', '应对突发变化和调整'] }],
    strengthsDetailed: 'ISTP的核心优势在于他们卓越的问题解决能力、出色的动手能力和技术天赋、危机中的冷静与果断、独立自主与自我驱动，以及灵活适应与快速学习能力。他们是天生的实践者，善于将想法转化为实际行动。ISTP在技术领域和需要实际操作的岗位上表现出色，能够迅速掌握新技能并找到创新的解决方案。他们在压力下保持冷静，能够在危机中做出快速而准确的决策。ISTP的独立性和自我驱动能力使他们成为可靠的自主工作者，而他们的灵活性和适应能力使他们能够在不断变化的环境中蓬勃发展。',
    weaknesses: [{ title: '情感表达和共情困难', desc: 'ISTP可能难以识别和表达情感，显得冷漠疏离', impact: 'ISTP倾向于关注逻辑和效率，可能忽视或低估情感因素。这可能导致人际关系问题、亲密关系困难和他人的误解。他人可能认为ISTP冷漠、不关心或缺乏同理心，影响深度关系的建立。', solutions: ['有意识地发展情感识别能力', '学习表达关心和欣赏', '练习主动倾听', '在重要关系中投入更多情感', '寻求关于情感影响的反馈'] }, { title: '长期规划和承诺困难', desc: 'ISTP活在当下，可能忽视长期规划和承诺', impact: 'ISTP对当下的关注可能导致他们忽视长期后果，缺乏未来规划。这可能影响职业发展、财务安全、关系稳定和个人成长。他们可能难以做出长期承诺，导致机会丧失和关系不稳定。', solutions: ['学习设定长期目标', '制定未来规划', '在决策时考虑长期影响', '练习做出和遵守承诺', '寻求具有长期视角的伙伴或导师'] }, { title: '对规则和权威的抵触', desc: 'ISTP可能对规则和权威产生抵触，影响组织和职业发展', impact: 'ISTP对自由和独立的高度重视可能导致他们对规则、程序和权威产生抵触。这可能导致职场冲突、职业发展受限、法律风险和人际关系问题。他们可能被视为不合作或难以管理。', solutions: ['理解规则背后的原因和价值', '学会在规则内找到灵活性', '尊重他人的专业知识和权威', '在必要时妥协和合作', '找到能够给予自主权的职业环境'] }, { title: '社交疏离和孤立倾向', desc: 'ISTP可能过度追求独立而导致社交孤立', impact: 'ISTP对独立和独处的偏好可能导致他们疏远他人，缺乏社交支持网络。这可能导致孤独感、心理健康问题、职业发展受限和关系困难。过度的孤立可能使ISTP错过重要的机会和支持。', solutions: ['有意识地维护重要关系', '定期与亲友联系', '参与团队活动和合作', '寻求社交技能的培训', '平衡独处与社交时间'] }, { title: '不耐烦和冲动决策', desc: 'ISTP可能因不耐烦而做出冲动决策', impact: 'ISTP追求效率的性格可能导致他们在面对复杂或缓慢的情况时变得不耐烦。这可能导致冲动决策、错误判断、关系破裂和错失更好的机会。他们可能过早放弃有潜力的项目或关系。', solutions: ['练习耐心和延迟满足', '在重要决策前强制暂停', '寻求他人的建议和反馈', '考虑所有选项再行动', '学会欣赏过程而不仅仅是结果'] }, { title: '难以表达内心想法', desc: 'ISTP可能难以用语言表达自己的思想和感受', impact: 'ISTP的思考过程往往是内隐的，他们可能难以向他人解释自己的推理和决策。这可能导致误解、沟通困难、教学挑战和职业限制。他人可能难以理解ISTP的立场和想法。', solutions: ['练习将想法转化为语言', '寻求写作或演讲培训', '使用图表和模型辅助表达', '在重要沟通前准备和练习', '寻求能够互补的合作伙伴'] }],
    weaknessesDetailed: 'ISTP的核心挑战在于平衡他们对独立和效率的追求与情感表达、长期规划和社交连接的需求。他们可能难以识别和表达情感，显得冷漠疏离，影响深度关系的建立。ISTP活在当下，可能忽视长期规划和承诺，影响未来的稳定和发展。他们对规则和权威的抵触可能导致职场冲突和职业受限。ISTP的社交疏离倾向可能导致孤立和缺乏支持网络。他们容易因不耐烦而做出冲动决策，并且可能难以用语言清晰表达内心想法。要成长，ISTP需要发展情感智慧、学习长期规划、在必要时遵循规则、维护重要关系、练习耐心，以及提高沟通表达能力。',
    relationships: { romance: { title: 'ISTP的浪漫关系', desc: 'ISTP在恋爱中寻求独立、自由和相互尊重。他们可能不是最浪漫或情感外露的伴侣，但他们通过实际行动表达爱意。ISTP重视伴侣给予的个人空间和自主权，同时也尊重伴侣的独立性。他们喜欢与伴侣一起参与实际活动，如户外运动、旅行或共同的兴趣爱好。ISTP在关系中需要时间来建立信任和情感连接，但一旦承诺，他们会成为忠诚可靠的伴侣。', characteristics: ['独立但需要时在场', '通过行动而非言语表达爱', '尊重伴侣的自主性', '喜欢共同的活动和体验', '忠诚可靠', '解决实际问题的能力'], challenges: ['情感表达和沟通', '长期承诺的恐惧', '处理情感冲突', '表达欣赏和肯定', '维持情感连接'], advice: ['学习用语言表达关心和爱意', '定期进行情感交流', '在关系中保持适度的独立性', '学会处理和表达情感', '对伴侣的情感需求保持敏感'], compatibility: [{ type: 'ESFJ', desc: 'ESFJ的温暖和关怀能够补充ISTP的冷静，为关系带来情感深度，同时欣赏ISTP的独立和能力' }, { type: 'ESTJ', desc: 'ESTJ的组织能力和ISTP的技术能力形成互补，两者都重视效率和实际成果' }, { type: 'ISFJ', desc: 'ISFJ的温柔和支持能够满足ISTP的情感需求，同时给予他们所需的独立空间' }, { type: 'ENFP', desc: 'ENFP的热情和创造力能够激发ISTP，为关系带来活力和新的视角' }] }, friendship: { title: 'ISTP的友谊关系', desc: 'ISTP重视少数深厚、真诚的友谊，而不是广泛的社交网络。他们喜欢与能够分享共同兴趣、尊重彼此独立性的朋友相处。ISTP是忠诚可靠的朋友，在朋友需要时提供实际帮助和支持。他们可能不是最善于表达情感的朋友，但会通过实际行动证明自己的友谊。ISTP喜欢与朋友一起参与户外活动、体育竞技或技术项目。', characteristics: ['少数深厚的友谊', '通过行动支持朋友', '尊重朋友的独立性', '喜欢共同的活动', '忠诚可靠', '实际的帮助'], challenges: ['保持联系和维护关系', '情感支持和倾听', '参与社交活动', '表达欣赏和关心', '处理冲突'], advice: ['定期主动联系重要朋友', '学习提供情感支持', '在朋友需要时倾听', '表达对友谊的欣赏', '在冲突中保持开放沟通'], compatibility: [{ type: 'ESTP', desc: 'ESTP与ISTP共享对行动和体验的热爱，能够一起享受各种活动和冒险' }, { type: 'INTP', desc: 'INTP与ISTP都是独立思考者，能够进行深入的智力交流和技术讨论' }, { type: 'ISTJ', desc: 'ISTJ的可靠性和ISTP的灵活性形成平衡，两者都重视实际和效率' }, { type: 'ISFP', desc: 'ISFP与ISTP共享对独立和体验的追求，能够理解彼此的需求' }] }, parenting: { title: 'ISTP的亲子角色', desc: 'ISTP父母通过实际行动和身教来教育孩子。他们鼓励孩子独立探索、动手实践和解决问题。ISTP父母为孩子提供自由发展的空间，同时也设定明确的界限和安全规则。他们善于教导孩子实用技能，如修理、运动或户外生存。虽然他们可能不是最情感外露的父母，但他们通过可靠的支持和实际帮助表达爱意。', characteristics: ['鼓励独立和探索', '通过身教而非言传', '教导实用技能', '给予自由和空间', '设定安全界限', '可靠的支持'], challenges: ['情感表达和温暖', '处理孩子的情感需求', '参与想象游戏', '长期教育规划', '与孩子进行深入对话'], advice: ['学习用语言表达爱和欣赏', '参与孩子的游戏和活动', '对孩子的情感需求保持敏感', '与伴侣在育儿方面互补', '为孩子提供稳定的支持'] } },
    career: { title: 'ISTP的职业发展道路', desc: 'ISTP在需要技术技能、实际操作和独立工作的职业中表现出色。他们适合工程、技术、军事、紧急服务、体育和手工艺等领域。ISTP喜欢能够立即看到成果的工作，不喜欢抽象的理论研究或大量的文书工作。他们在需要快速决策和危机处理的环境中表现出色。', suitable: ['机械工程师', '飞行员', '外科医生', '紧急医疗技术员', '消防员', '软件开发者', '法医', '运动员', '机械师', '木匠/工匠', '军事人员', '侦探'], suitableDetails: [{ career: '机械工程师', reason: 'ISTP的技术天赋和问题解决能力使他们能够设计和优化机械系统' }, { career: '飞行员', reason: 'ISTP的冷静、快速反应和手眼协调能力使他们成为优秀的飞行员' }, { career: '外科医生', reason: 'ISTP的精细操作能力、压力下冷静和问题解决能力适合外科工作' }, { career: '紧急医疗技术员', reason: 'ISTP在危机中保持冷静和快速行动的能力使他们成为优秀的急救人员' }, { career: '软件开发者', reason: 'ISTP的逻辑思维和独立工作能力使他们能够高效地开发和调试软件' }, { career: '法医', reason: 'ISTP的观察力、分析能力和对细节的关注使他们适合法医工作' }], unsuitable: ['高度情感化的工作', '重复性行政工作', '需要大量社交的工作', '长期理论研究', '严格等级制度的环境', '缺乏实际操作的工作'], workStyle: 'ISTP喜欢独立、灵活和实际的工作环境。他们需要自主权来按自己的方式工作，不喜欢被微观管理。ISTP喜欢能够立即看到成果的工作，不喜欢长期的规划和理论研究。他们在需要快速决策和问题解决的环境中表现出色。', workStyleDetailed: 'ISTP在工作中表现出强烈的独立性和效率导向。他们喜欢自主设定工作节奏和方法，不喜欢被过度监督。ISTP善于处理紧急情况和危机，能够在压力下保持冷静和高效。他们偏好实际、具体的任务，不喜欢抽象的理论或大量的文书工作。ISTP是优秀的故障排除者和问题解决者，能够迅速识别和解决技术问题。他们喜欢通过实践学习和发展技能，不拘泥于传统方法。ISTP在团队中可能显得疏离，但他们是可靠的贡献者，能够通过实际成果证明自己的价值。', workStyleDetails: ['独立工作和自主决策', '快速解决问题', '实际操作和技术应用', '灵活调整方法', '压力下高效工作', '通过实践学习', '不拘泥于传统', '关注实际成果'] },
    growth: { opportunities: ['情感智慧和关系建立', '长期规划和目标设定', '沟通表达能力', '耐心和延迟满足', '团队合作技能'], opportunitiesDetailed: [{ area: '情感智慧和关系建立', desc: 'ISTP需要发展识别、理解和管理情感的能力，以建立更深层次的人际关系。', actions: ['学习识别自己和他人的情感', '练习表达关心和欣赏', '在关系中投入更多情感', '寻求关于情感影响的反馈', '发展同理心'] }, { area: '长期规划和目标设定', desc: 'ISTP需要发展考虑长期后果和制定未来规划的能力。', actions: ['设定五年和十年目标', '制定实现目标的计划', '在决策时考虑长期影响', '定期回顾和调整目标', '寻求具有长期视角的导师'] }, { area: '沟通表达能力', desc: 'ISTP需要提高将内心想法转化为清晰语言的能力。', actions: ['练习表达复杂的想法', '寻求写作或演讲培训', '在重要沟通前准备', '使用视觉工具辅助表达', '寻求反馈并改进'] }, { area: '耐心和延迟满足', desc: 'ISTP需要培养耐心，学会等待和坚持长期项目。', actions: ['练习延迟满足', '设定长期项目并坚持完成', '庆祝小成就和里程碑', '学会欣赏过程', '培养日常习惯'] }, { area: '团队合作技能', desc: 'ISTP需要发展在团队环境中有效工作的能力。', actions: ['参与团队项目和活动', '学习妥协和合作', '尊重他人的贡献', '发展冲突解决技能', '寻求团队角色的培训'] }], actions: ['制定个人发展计划', '寻求导师和教练', '参与技能培训', '维护重要关系', '练习新技能'], detailedAdvice: 'ISTP的个人成长需要平衡他们的独立性和效率追求与情感表达、长期规划和社交连接的需求。首先，ISTP需要认识到情感在人际关系中的重要性，并努力发展情感智慧。其次，学会设定和坚持长期目标，考虑决策的长期影响。第三，提高沟通表达能力，学习清晰地传达自己的想法。第四，培养耐心和延迟满足的能力，学会坚持长期项目。第五，发展团队合作技能，学习在集体环境中有效工作。最后，ISTP应该寻找能够互补他们优势的伙伴和导师，帮助他们在需要时提供情感支持和长期视角。', longTermGoals: ['建立深厚的长期关系', '实现职业上的技术专精', '发展情感智慧和沟通能力', '平衡独立与连接', '成为既有能力又有影响力的人'] },
    stress: { triggers: ['失去自由和独立', '过度的规则和限制', '情感压力和冲突', '缺乏实际操作', '社交压力和期望', '长期规划和理论工作', '无法解决问题的挫败感'], triggersDetailed: [{ trigger: '失去自由和独立', explanation: 'ISTP高度重视个人自由，感到被束缚或控制会触发强烈压力。' }, { trigger: '过度的规则和限制', explanation: '过多的规则、程序和官僚限制会让ISTP感到窒息和沮丧。' }, { trigger: '情感压力和冲突', explanation: 'ISTP不善于处理情感冲突，高强度的情感压力会让他们感到不适。' }, { trigger: '缺乏实际操作', explanation: '长时间缺乏实际动手的机会会让ISTP感到无聊和焦躁。' }, { trigger: '社交压力和期望', explanation: '过多的社交互动和他人期望会让ISTP感到疲惫和压力。' }], signs: ['退缩和孤立', '冲动和冒险行为', '易怒和不耐烦', '身体症状如头痛', '逃避和拖延', '对常规活动失去兴趣'], signsDetailed: [{ stage: '初期', signs: ['感到焦躁不安', '难以集中注意力', '寻求独处'] }, { stage: '中期', signs: ['增加冲动行为', '对批评过度敏感', '睡眠质量下降'] }, { stage: '重度', signs: ['完全退缩', '冒险行为增加', '关系冲突'] }], coping: ['身体活动和运动', '独处和反思', '技术项目和手工', '与信任的人交谈', '户外活动和自然', '寻求专业帮助'], copingDetailed: [{ method: '身体活动和运动', steps: ['进行体育活动释放能量', '参加竞技运动', '进行户外冒险', '通过运动放松身心'] }, { method: '独处和反思', steps: ['给自己独处的时间', '进行反思和内省', '写日记记录想法', '在安静中恢复能量'] }, { method: '技术项目', steps: ['参与技术或手工项目', '修理或制作东西', '学习新技能', '通过实际操作放松'] }, { method: '寻求支持', steps: ['与信任的朋友交谈', '寻求专业心理咨询', '加入支持小组', '与理解的人分享感受'] }] },
    famousPeople: [{ name: '克林特·伊斯特伍德', title: '美国演员和导演', contribution: '以其冷静、坚韧的银幕形象和卓越的导演才能闻名，体现了ISTP的独立精神和实际能力。', traits: ['冷静坚韧', '独立自主', '实际能力'] }, { name: '汤姆·克鲁斯', title: '美国演员', contribution: '以其亲自完成特技表演和对动作戏的投入闻名，展现了ISTP的身体能力和冒险精神。', traits: ['身体能力', '冒险精神', '实际行动'] }, { name: '迈克尔·乔丹', title: '美国篮球传奇', contribution: '以其卓越的运动能力、竞争精神和压力下冷静表现闻名，体现了ISTP的专注和执行力。', traits: ['运动天赋', '竞争精神', '压力冷静'] }, { name: '史蒂夫·麦奎因', title: '美国演员', contribution: '以其"酷"的形象和亲自完成特技闻名，展现了ISTP的独立、冷静和实际能力。', traits: ['酷和独立', '实际操作', '冷静从容'] }]
  },
  ISFP: {
    type: 'ISFP',
    name: '探险家',
    nameEn: 'Adventurer',
    category: 'explorers',
    categoryEn: 'Explorers',
    tagline: '灵活的艺术家',
    slogan: '追求美和自由，活在当下',
    description: 'ISFP是敏感和有艺术天赋的人，追求美和自由。',
    detailedDescription: 'ISFP（探险家/冒险者）是敏感、感性和热情的人，拥有独特的审美天赋。他们以新颖、美丽和身体愉悦为生，活在当下，尽可能创造出一种可能性和冒险的感觉。ISFP善于抓住新的机会，当没有机会时，他们自己创造机会。与大多数内向者相比，ISFP更为自发，更注重行动，他们喜欢突破自我，享受美好时光。这些自由精神抵制规则、惯例、指南和强加的结构，但这种对独立和享受的追求有时会导致他们忽视重要的实际问题，忽视对未来的规划。ISFP可以放纵他们的自发性，只要他们通过在生活中建立足够的结构来维持个人和财务健康，从而掌握实际的必需品。有了这样的结构，ISFP就能满足他们对生活的渴望——创造潮流，拥抱新机遇，探索世界的美丽和乐趣。',
    traits: [{ trait: '艺术感', explanation: '对美有敏锐感知' }, { trait: '灵活性', explanation: '适应力强' }, { trait: '善良', explanation: '心地善良' }, { trait: '独立', explanation: '重视个人自由' }],
    traitsDetailed: [{ title: '艺术审美与感官敏锐', content: 'ISFP拥有独特的审美天赋，对美有着敏锐的感知力。他们能够注意到什么可能会激发感官，在声音、颜色、味道、设计等方面表现出色。这种独特的特质使他们非常有创造力和生产力，尤其是当他们有足够的自由来遵循自己的道路时。' }, { title: '活在当下与自发行动', content: 'ISFP活在当下，尽可能创造出一种可能性和冒险的感觉。他们抓住新的机会，当没有机会时，他们自己创造机会。ISFP喜欢突破自我，享受美好时光，但他们也会偶尔退缩，花一些时间与自己重新联系。' }, { title: '追求自由与独立', content: 'ISFP是自由精神，抵制规则、惯例、指南和强加的结构。他们追求独立和享受，重视个人自由高于一切。然而，这种对自由的追求有时会导致他们忽视重要的实际问题，忽视对未来的规划。' }, { title: '敏感与善良', content: 'ISFP是高度敏感的人，虽然他们可能看起来很随和，但在放松的外表下，他们对别人的感觉非常敏感。他们倾向于在所有情况下寻求和谐，并且很容易察觉到他人情绪状态的变化。ISFP善良、温和，对他人充满关怀。' }, { title: '灵活适应与即兴能力', content: 'ISFP最令人印象深刻的特点是他们"脚踏实地思考"的能力。这种性格类型的人可以做出仓促的决定，似乎总是能够逃避最具挑战性的情况。这使他们成为出色的即兴演奏者，特别是在需要快速行动和无需事先计划就能想出主意的地方。' }],
    cognitiveFunctions: [{ symbol: 'Fi', name: '内向情感', level: '主导', description: '内在价值观和情感是ISFP决策的核心。', detailedDescription: '内向情感让ISFP拥有强烈的个人价值观和道德准则。他们根据内在的价值观和情感做出决定，而不是外部的规则或期望。这使他们对自己真实，但也可能让他们难以理解那些价值观不同的人。', characteristics: ['强烈的个人价值观', '基于情感的决策', '追求真实自我', '内在道德准则', '对个人意义的追求'] }, { symbol: 'Se', name: '外向感觉', level: '辅助', description: '关注当下体验和实际感知。', detailedDescription: '外向感觉帮助ISFP享受当下，关注具体的、可感知的世界。他们对感官体验有着高度的敏感性，善于注意细节和环境变化。这使他们在艺术和审美方面表现出色，但也可能让他们过于关注即时满足而忽视长远规划。', characteristics: ['享受当下', '感官敏锐', '关注细节', '实际感知', '审美能力'] }, { symbol: 'Ni', name: '内向直觉', level: '第三', description: '内在洞察和对未来的直觉。', detailedDescription: '内向直觉为ISFP提供对未来的直觉洞察和模式识别能力。虽然这不是他们最强的功能，但它帮助他们偶尔洞察到未来的可能性。当这个功能发展良好时，ISFP可以在保持当下的同时，对未来有一些有意义的预见。', characteristics: ['直觉洞察', '模式识别', '未来可能性', '内在愿景'] }, { symbol: 'Te', name: '外向思考', level: '劣势', description: '组织执行和逻辑分析。', detailedDescription: '外向思考是ISFP的劣势功能，这意味着他们在组织、计划和执行方面可能面临挑战。他们可能不喜欢抽象的理论讨论，更倾向于实际行动。发展这个功能可以帮助ISFP更好地管理实际事务和长期规划。', characteristics: ['组织计划', '执行能力', '逻辑分析', '效率追求'] }],
    strengths: [{ title: '艺术创造与审美能力', desc: 'ISFP拥有独特的艺术审美和创造力', details: 'ISFP以他们的聪明、独创性和艺术技巧而闻名。他们善于注意到什么可能会激发感官，在声音、颜色、味道、设计等方面表现出色。没有其他性格类型的人能如此善于注意到什么可能会激发我们的感官。这种独特的特质使他们非常有创造力和生产力，尤其是当他们有足够的自由来遵循自己的道路时。', detailsList: ['独特的艺术视角', '敏锐的审美感知', '创意表达能力', '感官敏锐度', '设计天赋'], examples: ['成为一名优秀的艺术家或设计师', '在音乐、表演艺术领域表现出色', '创造出引人入胜的视觉作品', '为他人设计舒适美观的生活空间'] }, { title: '灵活适应与即兴能力', desc: 'ISFP能够灵活应对变化，是出色的即兴演奏者', details: 'ISFP最令人印象深刻的特点是"脚踏实地思考"的能力。他们可以做出仓促的决定，似乎总是能够逃避最具挑战性的情况。这使他们成为出色的即兴演奏者，特别是在需要快速行动和无需事先计划就能想出主意的地方。ISFP非常功利主义，愿意做任何事情来完成工作，即使这意味着要打破现有的传统。', detailsList: ['快速适应新环境', '出色的即兴应变能力', '灵活的问题解决', '在压力下保持冷静', '快速学习和掌握新技能'], examples: ['在危机情况下迅速找到解决方案', '在没有准备的情况下出色完成任务', '适应新的工作环境和要求', '在艺术创作中即兴发挥'] }, { title: '温和善良与同理心', desc: 'ISFP善良温和，对他人充满关怀', details: 'ISFP是高度敏感和善良的人，他们倾向于在所有情况下寻求和谐，并且很容易察觉到他人情绪状态的变化。尽管他们可能看起来很随和，但在放松的外表下，他们对别人的感觉非常敏感。ISFP善良、温和，对他人充满关怀，是忠诚的朋友和伴侣。', detailsList: ['深刻的同理心', '善良温和的性格', '寻求和谐与平衡', '对他人情绪敏感', '忠诚可靠'], examples: ['成为朋友倾诉的对象', '在护理、咨询等关怀职业中表现出色', '创造和谐的人际关系', '通过艺术表达关怀和温暖'] }, { title: '追求自由与独立精神', desc: 'ISFP重视个人自由，追求独立生活方式', details: 'ISFP是自由精神，抵制规则、惯例、指南和强加的结构。他们追求独立和享受，重视个人自由高于一切。这种独立精神使ISFP能够开辟非传统甚至冒险的道路来追求成功，将他们从社会期望和约束中解放出来。', detailsList: ['强烈的独立精神', '追求个人自由', '开辟非传统道路', '勇于尝试新事物', '保持真实自我'], examples: ['追求非传统的职业道路', '在生活中保持独立和自主', '勇于尝试新的生活方式', '在艺术创作中保持独特风格'] }, { title: '享受当下与感官体验', desc: 'ISFP活在当下，善于享受生活的每一刻', details: 'ISFP活在当下，尽可能创造出一种可能性和冒险的感觉。他们抓住新的机会，当没有机会时，他们自己创造机会。ISFP喜欢突破自我，享受美好时光，善于通过五种感官体验世界的美好。', detailsList: ['活在当下的能力', '感官体验敏锐', '享受生活乐趣', '创造美好时刻', '保持好奇心'], examples: ['享受美食、音乐、艺术等感官体验', '创造美好的生活环境', '通过旅行和探索丰富生活', '在日常生活中发现美和乐趣'] }],
    strengthsDetailed: 'ISFP的核心优势在于他们独特的艺术审美、出色的即兴能力、温和善良的性格以及活在当下的能力。他们拥有敏锐的感官感知力，在声音、颜色、味道、设计等方面表现出色，这使他们成为天生的艺术家和创作者。ISFP最令人印象深刻的特点是"脚踏实地思考"的能力，他们可以做出仓促的决定，似乎总是能够逃避最具挑战性的情况，这使他们成为出色的即兴演奏者。同时，ISFP善良、温和，对他人充满关怀，容易建立深厚的人际关系。他们追求自由和独立，勇于开辟非传统道路，保持真实自我。ISFP活在当下，善于享受生活的每一刻，通过五种感官体验世界的美好。',
    weaknesses: [{ title: '冲动与寻求刺激', desc: 'ISFP常常喜欢屈服于自己的冲动和欲望，寻求感官刺激', impact: '可接受的和不可接受的之间的界限可能很快变得模糊，ISFP可能会有走向纯粹的感官或甚至反社会活动的危险。他们无法忍受无聊和例行公事，有时会提出人为的挑战或问题，仅仅为了让环境活跃起来，这可能导致不断下降的风险螺旋。', solutions: ['学会控制自发性，了解自己的局限性', '避免走向纯粹的感官或反社会活动', '建立健康的刺激来源，而不是人为制造冲突', '在浪漫关系中保持忠诚和稳定', '学会区分健康的冒险和有害的冲动'] }, { title: '过于乐观与粗心', desc: 'ISFP往往过于乐观，甚至粗心，习惯于与危险擦肩而过', impact: 'ISFP想玩得开心，享受这一刻，体验一切可以体验的东西，总是因为他们高度发展的观察技能和愿意做一切事情来实现他们想要的目标。然而，即使是ISFP有时也会走运，他们的自信和自我怀疑之间不再平衡，可能做出鲁莽和错误的决定，尤其是如果他们缺乏特定领域的经验。', solutions: ['学会正确看待一切，不要过度自信', '在做出重要决定前考虑潜在风险', '与更细心、更有纪律的人合作', '在做决定前寻求他人的建议和反馈', '培养谨慎和自我反省的习惯'] }, { title: '缺乏长期规划', desc: 'ISFP对独立和享受的追求导致他们忽视重要的实际问题和未来规划', impact: 'ISFP可能不会为退休储蓄，建立应急基金，甚至不会打开邮件。这种不平衡的不负责任往往会剥夺ISFP们渴望的自由。缺乏方向感或缺乏制定周密计划的能力可能导致令人不快的处境，如在没有方向的情况下上大学导致巨额学生贷款，在没有预算的情况下购买车辆导致被收回。', solutions: ['建立足够的结构来维持个人和财务健康', '学习制定长期目标和计划', '为退休储蓄和建立应急基金', '在重大决定前考虑未来的后果', '寻求专业人士的财务规划建议'] }, { title: '拒绝理性思维', desc: 'ISFP不喜欢抽象的、理论性的讨论，倾向于逃避这种情况', impact: 'ISFP不喜欢抽象的、理论性的讨论，并尽最大努力逃避这种情况，或者在他们的思维处于别处时假装感兴趣。ISFP不是胡说八道的人，总是脚踏实地。虽然这是创业和职业目标的一个重要特征，但学会挑战他们的冲动和本能也很重要。如果这些技能不发达，ISFP最终可能会犯一大堆错误。', solutions: ['学会挑战冲动和本能，迫使重要决定通过理性过滤器', '培养理性思维技能，不要只专注于有趣的事情', '学会处理不舒服或困难的事情', '在做出重要决定前进行理性分析', '不要把自己的错误归咎于他人'] }, { title: '社交技能挑战', desc: 'ISFP的内向特质使他们很难进行闲聊，可能导致社交场合的尴尬', impact: 'ISFP可能会在社交活动之前就感到焦虑，因为他们知道自己很可能很有挑战性。这种对某些社交互动的不适会导致ISFP变得非常容易受到情绪操纵。ISFP往往很友善，但他们的善良本性可能会被不太谨慎的人滥用。', solutions: ['有意识地发展社交技能，特别是闲聊能力', '学会识别和防范情绪操纵', '在社交场合前做好准备，减少焦虑', '学会在必要时说"不"，保护自己的界限', '建立健康的个人边界，避免被他人利用'] }, { title: '冲突回避与批评敏感', desc: 'ISFP对批评甚至感知到的批评都会有不平衡、极端的反应', impact: 'ISFP倾向于在所有情况下寻求和谐，并且很容易察觉到他人情绪状态的变化。由于这种敏感性，ISFP对批评甚至感知到的批评都会有不平衡、极端的反应。在不平衡的关系中，ISFP希望得到无条件的批准，即使他们行为鲁莽或不合理。', solutions: ['学会更健康地处理批评，不要过度个人化', '理解批评可以是建设性的，不一定是个人攻击', '建立内在的自我价值感，不依赖外部认可', '学会在关系中设定健康的界限', '培养情绪调节能力，避免极端反应'] }],
    weaknessesDetailed: 'ISFP的核心挑战在于平衡他们对自由和新奇的渴望与责任和规划的需求。ISFP常常喜欢屈服于自己的冲动和欲望，寻求感官刺激，这可能导致他们走向不断下降的风险螺旋。他们往往过于乐观，甚至粗心，习惯于与危险擦肩而过，可能做出鲁莽的决定。ISFP对独立和享受的追求导致他们忽视重要的实际问题和未来规划，可能不会为退休储蓄或建立应急基金。他们不喜欢抽象的、理论性的讨论，倾向于逃避理性思维，这可能影响他们的决策质量。ISFP的内向特质使他们很难进行闲聊，可能导致社交场合的尴尬，容易受到情绪操纵。最重要的是，ISFP对批评极其敏感，会有不平衡、极端的反应，容易将批评个人化。要成长，ISFP需要学会控制自发性，培养长期规划能力，发展理性思维技能，建立健康的个人边界，以及更健康地处理批评。',
    relationships: { romance: { title: '浪漫关系中的探险家', desc: '对于其他人来说，ISFP往往是一个完全的谜，有时甚至会让他们的长期伴侣感到惊讶。尽管他们往往是非常敏感、情绪化的个体，但他们极易受到批评、冲突和逆境的影响，因此他们需要将这些特质很好地隐藏起来。然而，如果他们的伴侣愿意接受他们的真实身份，ISFP也会非常热情。ISFP的另一个特征是对当下的强烈关注，这使得他们非常"当下"，但可能导致他们无法从过去的浪漫故事中学到很多东西。此外，一旦他们的关系面临挑战、停滞不前，他们无法忍受目前的不适可能导致他们想要逃离。', characteristics: ['极度敏感和情绪化', '活在当下，追求当下的快乐', '热情而深情的爱人', '寻求自由和浪漫', '对批评极其敏感', '善于让伴侣感到特别'], challenges: ['长期承诺的恐惧', '面对关系挑战时可能想要逃离', '对批评的过度反应', '情绪调节困难', '难以从过去的关系中学习'], advice: ['学会情绪调节，在争论中冷静下来', '在面对困难时不要轻易放弃', '学会接受和处理批评', '建立长期的承诺和规划', '与伴侣进行开放和诚实的沟通'], compatibility: [{ type: 'ESFJ', desc: 'ESFJ的温暖和关怀能够为ISFP提供稳定的支持，同时欣赏ISFP的艺术天赋和自由精神' }, { type: 'ESTP', desc: 'ESTP与ISFP共享对当下体验和感官享受的热爱，能够一起享受生活的乐趣和冒险' }, { type: 'ISTJ', desc: 'ISTJ的实际和稳定能够平衡ISFP的自发性和灵活性，提供ISFP需要的安全感' }, { type: 'ISFJ', desc: 'ISFJ的温柔和支持能够满足ISFP的情感需求，两者都重视和谐和关怀' }] }, friendship: { title: '友谊关系中的探险家', desc: '谈到友谊，ISFP是周围最舒适的人。他们悠闲、自然，不会因为争论或有组织的长期计划而陷入困境。ISFP相信行动，而不是语言，他们谈论"是"，而不是"可能"、"应该"或"将要"，然后他们就这样做了。这种行动的热情帮助他们克服在结识新朋友时的羞怯。ISFP很敏感，比大多数人敏感得多，他们需要时间与新朋友建立足够的信任，才能敞开心扉，感受自然。ISFP随和、不带评判的态度使他们很容易与他人相处。', characteristics: ['悠闲自然，不苛求', '相信行动胜过言语', '敏感而需要信任', '随和且不带评判', '通过共同活动建立联系', '忠诚而真诚的朋友'], challenges: ['需要时间与新人建立信任', '对批评和评判敏感', '可能忽视日常责任和维护', '对闲聊感到不适'], advice: ['给予新朋友时间和空间建立信任', '寻找理解和支持的朋友', '通过共同的活动和兴趣建立联系', '学会识别和远离评判性的人', '保持联系，维护重要的友谊'], compatibility: [{ type: 'ISFJ', desc: 'ISFJ的温柔和支持能够与ISFP建立深厚的情感连接，两者都重视和谐' }, { type: 'ESFP', desc: 'ESFP与ISFP共享对体验和乐趣的热爱，能够一起享受生活中的美好时刻' }, { type: 'ISTP', desc: 'ISTP与ISFP都是灵活和实际的人，能够理解彼此对自由的追求' }, { type: 'ESTP', desc: 'ESTP的活力和冒险精神与ISFP的自发性和热情相匹配' }] }, parenting: { title: '亲子关系中的探险家父母', desc: '当谈到养育孩子时，ISFP常常感到宾至如归。ISFP有一种天生的温暖、实用和放松的天性，这有助于他们适应并欣赏抚养孩子所带来的每一刻的欢乐和困难。ISFP从与亲人相处和帮助亲人中获得的快乐是他们最大的力量。ISFP父母的孩子从第一天起就有了所有的实际需求，每天都可以做一些令人兴奋的事情或学习。ISFP喜欢有趣的动手活动，随着孩子的成长，他们经常被鼓励培养围绕这些活动的额外爱好。', characteristics: ['温暖、实用和放松', '天生的关怀和支持', '鼓励探索和体验新事物', '让孩子从错误中学习', '提供质量时间而非只是数量'], challenges: ['面对批评和"我告诉过你"的反应', '长期规划，如为大学教育存钱', '孩子进入青春期时的情绪控制', '在必要时设定和执行规则', '提供足够的结构和纪律'], advice: ['找到方法为孩子提供某种结构和纪律', '利用天生的热情和实用性提供爱的支持', '记住一致的、充满爱的界限内可以享受乐趣', '在孩子成长的不同阶段调整育儿方式', '通过分享自己的经历和错误来教育孩子'] } },
    career: { title: 'ISFP的职业发展道路', desc: '大多数ISFP发现，遵循高度结构化的流程很有挑战性，因此他们在传统的学术环境中可能表现不佳。由于这种性格类型的人对规则和等级制度有抵触情绪，其他人可能在很小的时候就认不出自己独特的天赋和才能。然而，到了青春期，大多数ISFP都会发展出精致的审美意识，在艺术、设计和风格方面表现出色。此外，他们的自发性使他们能够在变化无常、不可预测的环境中茁壮成长。独立且以目标为导向，ISFP不怕开辟非传统甚至冒险的道路来追求成功。', suitable: ['艺术家', '设计师', '音乐家', '护士', '摄影师', '厨师', '健身教练', '户外向导', '手工艺人', '美容顾问'], suitableDetails: [{ career: '艺术家', reason: 'ISFP独特的艺术审美和创造力使他们能够在艺术创作领域表现出色，无论是绘画、雕塑还是其他形式的艺术。' }, { career: '设计师', reason: 'ISFP对美学和细节的敏锐感知使他们成为优秀的设计师，能够在室内设计、平面设计等领域发挥才能。' }, { career: '音乐家', reason: 'ISFP对声音和情感的敏感性使他们能够通过音乐表达内心世界，在音乐表演或创作中找到满足感。' }, { career: '护士/护理人员', reason: 'ISFP的温和性格和关怀天性使他们非常适合护理工作，能够为患者提供温暖和支持。' }, { career: '摄影师', reason: 'ISFP对视觉美学的敏锐感知使他们能够捕捉生活中的美好瞬间，通过摄影表达独特的视角。' }, { career: '厨师', reason: 'ISFP对味道和感官体验的热爱使他们能够在烹饪艺术中发挥创造力，创造美味的菜肴。' }], unsuitable: ['高压销售', '严格规范的行政工作', '重复性的工厂工作', '需要长期战略规划的高管职位', '高度理论化的研究工作'], workStyle: 'ISFP喜欢自由、灵活和富有创意的工作环境。', workStyleDetailed: 'ISFP在需要创意和自由的角色中表现出色。他们喜欢能够发挥个人审美和创造力的工作，不喜欢被严格的规则和程序束缚。ISFP在变化无常、不可预测的环境中茁壮成长，能够迅速适应新的情况。他们喜欢能够立即看到结果的工作，不喜欢抽象的理论和长期的规划。ISFP独立且以目标为导向，不怕开辟非传统甚至冒险的道路来追求成功。', workStyleDetails: ['追求创意自由和灵活性', '喜欢实际和具体的工作', '在变化的环境中茁壮成长', '独立工作，不喜欢被过度管理', '追求能够立即看到结果的工作', '重视工作的美学和感官体验'] },
    growth: { opportunities: ['控制冲动和寻求刺激', '发展长期规划能力', '培养理性思维技能', '建立健康的个人边界', '学会健康地处理批评', '平衡自由与责任'], opportunitiesDetailed: [{ area: '控制冲动和寻求刺激', desc: 'ISFP需要学会控制自己的自发性和冲动，避免走向不断下降的风险螺旋。', actions: ['在做出决定前三思而后行', '评估潜在的风险和后果', '寻找健康的刺激来源', '避免人为制造冲突或挑战'] }, { area: '发展长期规划能力', desc: 'ISFP需要建立足够的结构来维持个人和财务健康，掌握实际的必需品。', actions: ['为退休储蓄和建立应急基金', '制定长期目标和计划', '定期查看和处理邮件、账单等实际事务', '在重大决定前考虑未来的后果'] }, { area: '培养理性思维技能', desc: 'ISFP需要学会挑战他们的冲动和本能，迫使重要决定通过理性过滤器。', actions: ['不要只专注于有趣的事情', '学会处理不舒服或困难的事情', '在做出重要决定前进行理性分析', '培养批判性思维能力'] }, { area: '建立健康的个人边界', desc: 'ISFP需要学会识别和防范情绪操纵，建立健康的个人边界。', actions: ['学会在必要时说"不"', '保护自己的界限，避免被他人利用', '识别潜在的操纵企图', '培养健康的自我价值感'] }, { area: '学会健康地处理批评', desc: 'ISFP需要学会更健康地处理批评，不要过度个人化。', actions: ['理解批评可以是建设性的', '建立内在的自我价值感，不依赖外部认可', '学会在关系中设定健康的界限', '培养情绪调节能力，避免极端反应'] }], actions: ['建立结构和规律', '制定长期财务计划', '培养理性决策能力', '学会健康地处理冲突', '发展社交技能', '寻求个人成长机会'], detailedAdvice: 'ISFP的个人成长需要平衡自发性与责任感、独立性与亲密性，以及对新鲜事物的渴望与对事物本身的欣赏。首先，ISFP必须培养自我意识，评估自己和自己的行为。他们的行为在当下是愉快的，但从长远来看是有害的吗？ISFP应该问自己，他们现在和未来的生活想要什么。这种想法不必把ISFP限制在严格的计划中，考虑到未来可以开拓出新的、更充实的可能性。成长的最后一步是用新的行为取代不健康的行为，让ISFP更接近他们的生活。ISFP可以通过更负责任地利用自己的自发性和雄心，权衡潜在风险和潜在利益，重新平衡自己的行为。心胸开阔、体贴周到，他们可能会不时质疑自己的推理，评估他人的反馈而不会变得情绪化。在可能的情况下，他们还可以寻求利用自己优势的学术和专业环境。如果允许足够的自由度、灵活性和新颖性，ISFP就有能力创造非凡的创造力和重大成就。', longTermGoals: ['实现创意目标，同时保持稳定', '建立财务安全和独立', '发展理性思维和长期规划能力', '建立深厚而持久的关系', '在自由与责任之间找到平衡', '成为既有创造力又有责任感的人'] },
    stress: { triggers: ['被批评或受到负面评价', '感到被限制或束缚', '缺乏刺激和无聊', '长期承诺的压力', '抽象理论讨论', '社交场合的尴尬', '情绪操纵或利用'], triggersDetailed: [{ trigger: '被批评或受到负面评价', explanation: 'ISFP对批评极其敏感，即使是轻微的批评也可能引发强烈的情绪反应。他们倾向于将批评个人化，感到受伤和不被接受。' }, { trigger: '感到被限制或束缚', explanation: 'ISFP是自由精神，抵制规则、惯例和强加的结构。当他们感到被困或受限时，会感到极度不适。' }, { trigger: '缺乏刺激和无聊', explanation: 'ISFP无法忍受无聊和例行公事，缺乏刺激会导致他们感到焦躁不安，甚至人为制造冲突来活跃环境。' }, { trigger: '长期承诺的压力', explanation: 'ISFP活在当下，长期承诺的压力让他们感到不适，尤其是当他们还没有准备好时。' }, { trigger: '抽象理论讨论', explanation: 'ISFP不喜欢抽象的、理论性的讨论，倾向于逃避这种情况，这可能导致压力和焦虑。' }], signs: ['退缩逃避', '情绪波动', '冲动行为', '过度寻求刺激', '对他人的不信任', '社交回避', '身体症状如失眠或疲劳'], signsDetailed: [{ stage: '初期', signs: ['感到焦躁不安', '难以集中注意力', '寻求额外的刺激'] }, { stage: '中期', signs: ['情绪波动加剧', '对批评的过度反应', '冲动决策增加'] }, { stage: '重度', signs: ['完全退缩和逃避', '对人际关系的怀疑', '可能的自我毁灭行为'] }], coping: ['艺术创作和表达', '与自然接触', '独处和内省', '身体活动和运动', '寻求信任的朋友支持', '建立结构和规律', '培养情绪调节技能'], copingDetailed: [{ method: '艺术创作和表达', steps: ['通过绘画、音乐、写作等艺术形式表达情感', '不要担心作品的质量，专注于表达过程', '使用艺术作为处理情绪的工具'] }, { method: '与自然接触', steps: ['花时间在户外，享受大自然的美景', '进行散步、徒步或其他户外活动', '感受自然环境带来的平静和恢复'] }, { method: '独处和内省', steps: ['给自己独处的时间，与自己的想法和感受联系', '进行冥想或正念练习', '写日记，记录自己的情绪和想法'] }, { method: '培养情绪调节技能', steps: ['学习识别和理解自己的情绪', '练习在情绪激动时冷静下来', '寻求专业帮助，如心理咨询'] }] },
    famousPeople: [{ name: '弗里达·卡罗', title: '墨西哥著名女画家', contribution: '以独特的自画像和对墨西哥文化的表达闻名，展现了ISFP独特的艺术视角和深刻的情感表达。', traits: ['独特的艺术视角', '深刻的情感表达', '对美的敏锐感知'] }, { name: '迈克尔·杰克逊', title: '流行音乐之王', contribution: '革新了流行音乐和舞蹈，展现了ISFP在艺术表演方面的卓越才能和创新精神。', traits: ['艺术才华', '创新精神', '舞台魅力'] }, { name: '奥黛丽·赫本', title: '著名演员和人道主义者', contribution: '以其优雅的风格和慈善工作闻名，体现了ISFP的审美意识和关怀天性。', traits: ['优雅和美丽', '关怀他人', '独特的风格'] }, { name: '大卫·贝克汉姆', title: '著名足球运动员', contribution: '在体育和时尚领域都取得了成功，展现了ISFP的实用性和审美意识的结合。', traits: ['实用技能', '时尚感', '追求完美'] }]
  },
  ESTP: {
    type: 'ESTP',
    name: '企业家',
    nameEn: 'Entrepreneur',
    category: 'explorers',
    categoryEn: 'Explorers',
    tagline: '活力四射的实干家',
    slogan: '活在当下，勇于冒险',
    description: 'ESTP是活力四射和务实的冒险家，喜欢行动和挑战。',
    detailedDescription: 'ESTP（企业家/创业者）是活力四射、务实且极具冒险精神的实干家。他们活在当下，享受刺激和挑战，善于在变化中寻找机会。ESTP具有出色的社交能力和个人魅力，能够轻松与他人建立联系。他们是天生的问题解决者，喜欢动手实践而非纸上谈兵。ESTP善于观察周围环境，能够迅速识别模式并做出快速反应。他们喜欢冒险和竞争，不惧风险，常常能够在危机中保持冷静并找到解决方案。同时，ESTP也可能因为过于冲动而忽视长期后果，需要学会在行动前进行更多思考。',
    traits: [{ trait: '冒险精神', explanation: '勇于尝试新事物，不惧风险' }, { trait: '实用主义', explanation: '注重实际效果和可行性' }, { trait: '活力充沛', explanation: '充满活力和能量' }, { trait: '社交能力', explanation: '善于与人交往和沟通' }, { trait: '适应力强', explanation: '能够快速适应变化' }, { trait: '果断决策', explanation: '能够迅速做出决定' }],
    traitsDetailed: [{ title: '行动导向与即时反应', content: 'ESTP是行动派，喜欢立即采取行动而非长时间计划。他们活在当下，能够迅速对环境变化做出反应。这种特质使他们在紧急情况和快速变化的环境中表现出色。ESTP善于观察当下的事实和细节，能够迅速识别问题并找到实际解决方案。' }, { title: '实用主义与现实导向', content: 'ESTP是非常务实的人，关注当下和现实，而不是理论或抽象概念。他们喜欢处理具体的问题，善于找到切实可行的解决方案。ESTP相信"行动胜于言语"，倾向于通过实际行动来证明自己的观点。' }, { title: '社交魅力与沟通能力', content: 'ESTP具有出色的社交能力和个人魅力，善于与他人建立联系。他们幽默风趣，能够轻松地融入各种社交场合。ESTP善于读取他人的情绪和反应，能够灵活调整自己的沟通方式以适应不同的人和环境。' }, { title: '冒险精神与风险偏好', content: 'ESTP热爱冒险和挑战，不惧风险。他们喜欢刺激和竞争，常常能够在危机中保持冷静。这种冒险精神使ESTP愿意尝试新事物，探索未知领域，但也可能导致他们承担过多的风险而忽视潜在后果。' }, { title: '灵活适应与即兴能力', content: 'ESTP具有极强的适应能力，能够快速适应新环境和变化。他们是出色的即兴表演者，能够在没有准备的情况下应对各种情况。这种灵活性使ESTP在不确定和快速变化的环境中表现出色。' }],
    cognitiveFunctions: [{ symbol: 'Se', name: '外向感觉', level: '主导', description: '关注当下体验和实际感知世界。', detailedDescription: '外向感觉是ESTP的主导功能，使他们高度关注当下时刻和具体体验。他们敏锐地感知环境中的细节和变化，善于观察事实和实际情况。这使他们能够快速对环境做出反应，但也可能导致他们过于关注当下而忽视长期规划。', characteristics: ['高度关注当下', '敏锐的感官感知', '对细节敏感', '喜欢具体体验', '快速反应能力', '实际观察力'] }, { symbol: 'Ti', name: '内向思考', level: '辅助', description: '内在逻辑分析和问题解决。', detailedDescription: '内向思考帮助ESTP分析问题并找到逻辑解决方案。他们善于理解事物的工作原理，喜欢拆解问题并找出根本原因。这种功能使ESTP具有出色的故障排除能力，但也可能让他们过于关注逻辑而忽视情感因素。', characteristics: ['逻辑分析能力', '问题解决技能', '理解系统运作', '寻找根本原因', '客观评估', '技术理解力'] }, { symbol: 'Fe', name: '外向情感', level: '第三', description: '社交情感理解和人际和谐。', detailedDescription: '外向情感帮助ESTP理解和回应他人的情感需求。虽然这不是他们最强的功能，但它使ESTP能够在社交场合中感知他人的情绪，并调整自己的行为以维持和谐。发展这个功能可以帮助ESTP建立更深层次的人际关系。', characteristics: ['社交情感感知', '人际和谐意识', '群体动态理解', '适应社交期望', '魅力展现', '说服能力'] }, { symbol: 'Ni', name: '内向直觉', level: '劣势', description: '内在洞察和未来预见。', detailedDescription: '内向直觉是ESTP的劣势功能，意味着他们在洞察未来趋势和识别深层模式方面可能面临挑战。ESTP往往更关注当下而非未来，可能忽视长期后果。发展这个功能可以帮助ESTP在做决定时考虑更长远的影响。', characteristics: ['未来预见', '模式识别', '深层洞察', '长期视角', '战略思考', '意义理解'] }],
    strengths: [{ title: '卓越的行动力和执行力', desc: 'ESTP能够迅速采取行动并将想法付诸实践', details: 'ESTP最令人印象深刻的能力是他们的行动力。他们不喜欢空谈，而是倾向于立即采取行动。这种特质使ESTP在需要快速反应和果断决策的环境中表现出色。他们能够将想法迅速转化为行动，并在执行过程中灵活调整策略。', detailsList: ['快速决策和行动', '将想法付诸实践', '在执行中调整策略', '克服拖延倾向', '高效的任务完成'], examples: ['在紧急情况下迅速组织应对', '立即开始新项目而不拖延', '在销售中快速成交', '在体育竞技中做出即时反应', '在创业中快速迭代产品'] }, { title: '出色的社交魅力和影响力', desc: 'ESTP具有强大的个人魅力和社交能力', details: 'ESTP天生具有社交魅力，能够轻松吸引他人的注意。他们幽默风趣，善于讲故事，能够迅速与他人建立联系。这种能力使ESTP在销售、公关和领导力方面表现出色。他们能够读取社交场合的氛围，并灵活调整自己的表现以适应不同的人和环境。', detailsList: ['强大的个人魅力', '出色的沟通技巧', '建立快速连接的能力', '读取社交动态', '说服和影响他人'], examples: ['在销售中建立客户信任', '在演讲中吸引听众', '在社交活动中成为焦点', '在团队中激励他人', '在谈判中达成有利协议'] }, { title: '优秀的危机处理和问题解决', desc: 'ESTP在危机中保持冷静并找到解决方案', details: 'ESTP在压力和危机情况下表现出色。他们能够保持冷静，迅速分析情况，并找到实际的解决方案。这种能力使ESTP成为优秀的急救人员、消防员和危机管理者。他们不会被恐慌所影响，而是专注于解决问题。', detailsList: ['危机中保持冷静', '快速分析问题', '找到实际解决方案', '压力下有效工作', '适应突发变化'], examples: ['在紧急医疗情况下保持冷静', '在商业危机中快速找到出路', '在技术故障时迅速诊断问题', '在体育比赛中逆转劣势', '在突发事件中组织有效应对'] }, { title: '强大的适应能力和灵活性', desc: 'ESTP能够快速适应新环境和变化', details: 'ESTP具有极强的适应能力，能够快速适应新环境、新挑战和变化。他们不固守既定计划，而是能够根据情况灵活调整。这种特质使ESTP在快速变化的行业和不确定的环境中表现出色。', detailsList: ['快速学习新技能', '适应新环境', '灵活调整计划', '接受变化和挑战', '多元化能力发展'], examples: ['快速适应新的工作角色', '在不同的文化环境中工作', '在业务转型中成功转型', '掌握多种实用技能', '在旅行中应对各种意外情况'] }, { title: '实用主义的结果导向', desc: 'ESTP专注于实际结果和可行方案', details: 'ESTP是非常务实的人，专注于实际可行的解决方案。他们不喜欢理论空谈，而是关注什么真正有效。这种结果导向的思维方式使ESTP在商业、技术和任何需要实际成果的领域中表现出色。', detailsList: ['关注实际结果', '寻找可行方案', '避免理论空谈', '注重效率', '实践检验真理'], examples: ['找到成本效益最优的商业方案', '修理复杂的机械设备', '优化工作流程提高效率', '在预算限制内完成项目', '通过实践学习新技能'] }],
    strengthsDetailed: 'ESTP的核心优势在于他们卓越的行动力、出色的社交魅力、优秀的危机处理能力、强大的适应能力以及务实的结果导向。他们是天生的实干家，能够将想法迅速转化为行动。ESTP在危机中保持冷静，能够快速分析情况并找到实际解决方案。他们的社交魅力使他们能够轻松与他人建立联系，并在各种社交场合中如鱼得水。ESTP的适应能力使他们能够在快速变化的环境中蓬勃发展，而他们的实用主义确保他们专注于真正有效的解决方案。这些特质使ESTP成为优秀的企业家、销售人员、运动员和危机管理者。',
    weaknesses: [{ title: '冲动和缺乏耐心', desc: 'ESTP可能因为过于冲动而做出草率决定', impact: 'ESTP倾向于立即行动而不充分考虑后果，这可能导致错误决策、资源浪费和关系破裂。他们的不耐烦可能使他们放弃需要长期努力的项目，错过重要的机会。', solutions: ['在重要决定前强制暂停和思考', '寻求他人的建议和反馈', '练习延迟满足', '制定决策检查清单', '培养耐心，设定长期目标'] }, { title: '忽视长期后果', desc: 'ESTP过于关注当下而忽视长期影响', impact: 'ESTP活在当下，可能忽视决策的长期后果。这可能导致财务问题、健康隐患、关系破裂和职业发展受限。他们可能为了追求即时满足而牺牲长期利益。', solutions: ['学习制定长期计划', '在决策时考虑未来影响', '寻求具有长期视角的伙伴或导师', '建立财务规划和储蓄习惯', '定期回顾和评估长期目标'] }, { title: '对规则和传统的抵触', desc: 'ESTP可能抵制规则和既定程序', impact: 'ESTP对规则和限制的自然抵触可能导致与权威的冲突、职场问题和法律风险。他们可能忽视重要的程序和政策，导致错误和后果。', solutions: ['理解规则背后的原因', '学会在必要时遵循程序', '找到创造性的方式在规则内工作', '尊重他人的权威和专业知识', '平衡创新与合规'] }, { title: '情感敏感度不足', desc: 'ESTP可能忽视他人的情感需求', impact: 'ESTP倾向于关注逻辑和效率，可能忽视或低估情感因素。这可能导致人际关系问题、团队冲突和个人关系破裂。他人可能认为ESTP冷漠或不关心。', solutions: ['发展情商，学习识别他人情感', '在沟通中更多地关注情感层面', '寻求反馈，了解自己的情感影响', '练习同理心和主动倾听', '在决策中考虑情感因素'] }, { title: '注意力分散和项目未完成', desc: 'ESTP可能同时开始多个项目但无法完成', impact: 'ESTP对新挑战的热情可能导致他们同时承担太多项目，结果都无法完成。这可能损害他们的职业声誉、财务状况和人际关系。', solutions: ['限制同时进行的项目数量', '设定明确的完成标准和截止日期', '寻求问责伙伴', '学会对新的机会说"不"', '庆祝和认可已完成的成就'] }, { title: '风险承担过度', desc: 'ESTP可能承担过多风险', impact: 'ESTP对冒险的热爱可能导致他们承担不必要的风险，包括财务风险、健康风险和关系风险。这可能导致严重后果，包括财务损失、身体伤害和重要关系的破裂。', solutions: ['在冒险前进行风险评估', '设定个人风险承受界限', '寻求平衡的观点和反馈', '购买适当的保险', '区分 calculated risk 和鲁莽行为'] }],
    weaknessesDetailed: 'ESTP的核心挑战在于平衡他们强烈的行动力与深思熟虑、短期满足与长期规划、个人自由与遵守规则。ESTP容易因为冲动而做出草率决定，忽视长期后果。他们对规则和传统的天生抵触可能导致与权威的冲突。ESTP可能忽视情感因素，给他人留下冷漠的印象。他们倾向于同时开始多个项目但难以完成，并且可能承担过多风险。要成长，ESTP需要学会暂停思考、制定长期计划、尊重规则和程序、发展情商、专注完成项目，以及在冒险前进行风险评估。',
    relationships: { romance: { title: 'ESTP的浪漫关系', desc: 'ESTP在恋爱中寻求刺激、乐趣和激情。他们是充满活力和冒险精神的伴侣，能够为关系带来兴奋和新鲜感。ESTP喜欢与伴侣一起尝试新事物、探索新地方和体验新冒险。他们直接而坦诚，不喜欢游戏和操纵。然而，ESTP可能对长期承诺感到不适，需要学会在关系中投入更多情感深度。', characteristics: ['充满活力和激情', '喜欢冒险和新鲜体验', '直接坦诚的沟通', '幽默风趣', '重视自由和空间', '善于让伴侣感到特别'], challenges: ['对长期承诺的恐惧', '可能显得不够深情', '冲动决策影响关系', '需要大量个人空间', '对情感深度交流的回避', '容易对关系感到无聊'], advice: ['学会在关系中投入更多情感', '与伴侣讨论长期目标和期望', '在冒险前考虑伴侣的感受', '定期进行深度情感交流', '学会在关系中保持稳定', '欣赏和肯定伴侣的价值'], compatibility: [{ type: 'ISFJ', desc: 'ISFJ的温柔和支持能够为ESTP提供稳定的情感基础，同时欣赏ESTP的活力和冒险精神' }, { type: 'ISTJ', desc: 'ISTJ的实际和可靠能够平衡ESTP的冲动，提供关系中的稳定性和结构' }, { type: 'ESFJ', desc: 'ESFJ的社交能力和关怀能够与ESTP共同享受社交活动和人际互动' }, { type: 'ISFP', desc: 'ISFP与ESTP共享对当下体验和感官享受的热爱，能够一起享受生活的乐趣' }] }, friendship: { title: 'ESTP的友谊关系', desc: 'ESTP是有趣、活力充沛的朋友，他们能够为友谊带来兴奋和冒险。他们喜欢与朋友一起尝试新事物、参加社交活动和体验刺激。ESTP是派对的灵魂，善于活跃气氛。他们直接而诚实，有时可能过于坦率。ESTP重视能够跟上他们节奏的朋友，欣赏那些愿意尝试新事物的人。', characteristics: ['有趣和活力充沛', '喜欢社交活动', '直接和诚实', '善于活跃气氛', '乐于尝试新事物', '忠诚于当下的朋友'], challenges: ['可能忽视老朋友', '过于直接的沟通可能伤人', '难以维持深度友谊', '对安静活动缺乏兴趣', '可能显得不够关心', '友谊中寻求刺激可能导致不稳定'], advice: ['投入时间维护重要的友谊', '在沟通中考虑他人的感受', '学会欣赏安静的相处时光', '主动联系和关心朋友', '在友谊中保持稳定和可靠', '尊重朋友不同的能量水平'], compatibility: [{ type: 'ESFP', desc: 'ESFP与ESTP共享活力和社交热情，能够一起享受各种有趣的活动' }, { type: 'ENTP', desc: 'ENTP的智力刺激和辩论能力与ESTP的行动力形成有趣的组合' }, { type: 'ISTP', desc: 'ISTP与ESTP都是务实和行动导向的人，能够理解彼此对自由和冒险的追求' }, { type: 'ESTJ', desc: 'ESTJ的组织能力与ESTP的行动力互补，能够共同实现目标' }] }, parenting: { title: 'ESTP的亲子角色', desc: 'ESTP父母是充满活力和冒险精神的家长，他们鼓励孩子探索世界、尝试新事物。他们为孩子创造丰富的体验，带孩子参加各种活动和冒险。ESTP父母重视孩子的独立性和实用技能，教导孩子如何在现实世界中生存和成功。然而，他们可能需要努力提供情感支持和稳定性。', characteristics: ['鼓励孩子探索', '提供丰富的体验', '教导实用技能', '与孩子一起冒险', '重视独立性', '幽默和有趣'], challenges: ['提供情感深度支持', '设定和执行规则', '长期规划和稳定性', '处理孩子的情感需求', '耐心对待重复性任务', '平衡自由与安全'], advice: ['学习提供情感支持和倾听', '建立明确但灵活的规则', '在冒险和安全之间找到平衡', '投入时间进行安静的亲子活动', '寻求伴侣在情感和规划方面的支持', '欣赏孩子的情感表达需求'] } },
    career: { title: 'ESTP的职业发展道路', desc: 'ESTP在需要行动力、社交能力和危机处理能力的职业中表现出色。他们适合快节奏、有挑战性和变化多样的工作环境。ESTP在销售、创业、体育、紧急服务、军事和任何需要快速决策的领域都能成功。他们不喜欢重复性、理论性或孤立的工作。', suitable: ['销售代表', '企业家', '运动员', '急救医生/护理人员', '消防员', '警察', '军事人员', '项目经理', '股票交易员', '活动组织者', '旅行顾问', '体育教练'], suitableDetails: [{ career: '销售代表', reason: 'ESTP的社交魅力和说服力使他们成为优秀的销售人员，能够快速建立客户关系并达成交易。' }, { career: '企业家', reason: 'ESTP的冒险精神、行动力和风险承受能力使他们天生适合创业，能够抓住机会并快速执行。' }, { career: '急救医生/护理人员', reason: 'ESTP在危机中保持冷静和快速反应的能力使他们成为优秀的急救人员。' }, { career: '消防员', reason: 'ESTP的身体能力、勇气和危机处理能力使他们适合消防工作。' }, { career: '项目经理', reason: 'ESTP的执行力、问题解决能力和团队领导能力使他们能够有效管理项目。' }, { career: '体育教练', reason: 'ESTP的竞争精神、活力和对体育的热爱使他们能够激励和训练运动员。' }], unsuitable: ['重复性行政工作', '长期理论研究', '高度孤立的工作', '严格遵循程序的工作', '需要大量文书工作的职位', '缓慢决策的环境'], workStyle: 'ESTP喜欢快节奏、有挑战性和多样化的工作环境。他们不喜欢例行公事和重复性任务，倾向于在需要快速反应和灵活应对的环境中表现出色。ESTP喜欢能够立即看到结果的工作，不喜欢长期规划和理论分析。他们在团队中通常是行动的发起者，能够激励他人并推动项目前进。', workStyleDetailed: 'ESTP在工作中表现出强烈的行动导向和结果导向。他们喜欢能够立即采取行动并看到实际成果的项目。ESTP在危机和压力下表现出色，能够迅速分析问题并找到解决方案。他们善于与同事和客户建立联系，使用幽默和个人魅力来建立良好的工作关系。ESTP喜欢有竞争性和挑战性的环境，能够在这些环境中激发最佳状态。然而，他们可能对例行公事、长期规划和详细文档工作感到不耐烦。', workStyleDetails: ['追求行动和结果', '在压力下表现出色', '快速决策和执行', '善于建立客户关系', '喜欢竞争和挑战', '灵活应对变化', '实际解决问题', '团队中的激励者'] },
    growth: { opportunities: ['长期规划和战略思考', '情感智慧和深度连接', '耐心和专注力', '风险管理和谨慎', '完成项目和坚持到底'], opportunitiesDetailed: [{ area: '长期规划和战略思考', desc: 'ESTP需要发展考虑长期后果和制定战略计划的能力，以补充他们的即时行动导向。', actions: ['设定长期职业和个人目标', '制定五年和十年计划', '在决策前考虑长期影响', '寻求具有战略视角的导师', '定期回顾和调整长期计划'] }, { area: '情感智慧和深度连接', desc: 'ESTP需要发展识别、理解和管理情感的能力，以建立更深层次的人际关系。', actions: ['学习识别自己和他人的情感', '练习主动倾听和同理心', '在关系中投入更多情感', '寻求关于情感影响的反馈', '发展情感表达能力'] }, { area: '耐心和专注力', desc: 'ESTP需要培养耐心，学会长期坚持项目，即使过程不那么刺激。', actions: ['设定明确的项目完成目标', '练习延迟满足', '庆祝小成就和里程碑', '发展日常习惯和例行公事', '学会享受过程而不仅仅是结果'] }, { area: '风险管理和谨慎', desc: 'ESTP需要学会在冒险前进行风险评估，平衡行动与谨慎。', actions: ['在重大决策前进行成本效益分析', '设定个人风险承受界限', '寻求不同观点和建议', '学习基本的财务和投资知识', '为可能的风险做好准备'] }, { area: '完成项目和坚持到底', desc: 'ESTP需要学会完成他们开始的项目，建立可靠的声誉。', actions: ['限制同时进行的项目数量', '设定明确的完成标准和截止日期', '寻找问责伙伴或导师', '学会对新的机会说"不"', '庆祝和认可已完成的成就'] }], actions: ['制定长期个人发展计划', '寻求具有不同优势的导师和伙伴', '练习在决策前暂停思考', '投入时间维护重要关系', '学习完成项目的技巧', '发展情感智慧'], detailedAdvice: 'ESTP的个人成长需要平衡他们天生的行动力和冒险精神与深思熟虑、长期规划和情感智慧。首先，ESTP需要认识到冲动行动的局限性，学会在重要决策前暂停思考。其次，发展长期规划能力，设定职业和个人生活的长期目标。第三，培养情感智慧，学会识别和回应他人的情感需求。第四，练习耐心和专注，学会坚持完成长期项目。第五，在冒险前进行风险评估，平衡行动与谨慎。最后，ESTP应该寻找能够互补他们优势的伙伴和导师，帮助他们在需要时提供长期视角和情感支持。', longTermGoals: ['建立可持续的职业成功', '发展深厚的长期关系', '实现财务安全和独立', '培养情感智慧和同理心', '成为可靠和值得信赖的人', '在行动与规划之间找到平衡'] },
    stress: { triggers: ['单调和例行公事', '缺乏刺激和挑战', '长期规划和理论工作', '严格限制和规则', '孤立和独处', '被束缚和受限', '重复性任务'], triggersDetailed: [{ trigger: '单调和例行公事', explanation: 'ESTP无法忍受无聊和重复性工作，缺乏刺激会导致他们感到焦躁不安。' }, { trigger: '长期规划和理论工作', explanation: 'ESTP关注当下，长期规划和理论分析让他们感到沮丧和受限。' }, { trigger: '严格限制和规则', explanation: 'ESTP重视自由和灵活性，过多的规则和限制会让他们感到被束缚。' }, { trigger: '孤立和独处', explanation: 'ESTP是社交型人格，长时间的孤立会让他们感到孤独和沮丧。' }, { trigger: '缺乏控制感', explanation: 'ESTP喜欢掌控局面，感到无力或无法控制会触发压力。' }], signs: ['焦躁不安和易怒', '冲动和冒险行为增加', '注意力分散', '对常规活动失去兴趣', '社交退缩或过度社交', '身体症状如失眠', '难以集中注意力'], signsDetailed: [{ stage: '初期', signs: ['感到无聊和不安', '寻求额外的刺激', '难以集中注意力', '对日常工作感到不耐烦'] }, { stage: '中期', signs: ['增加冲动行为', '对批评过度敏感', '睡眠质量下降', '情绪波动加剧'] }, { stage: '重度', signs: ['鲁莽决策和行为', '关系冲突增加', '可能的物质滥用', '严重的工作表现下降'] }], coping: ['身体活动和运动', '社交互动', '新的挑战和冒险', '即时问题解决', '与信任的人交谈', '暂时逃离常规'], copingDetailed: [{ method: '身体活动和运动', steps: ['进行高强度的体育活动', '参加竞技体育', '进行户外冒险活动', '通过运动释放能量'] }, { method: '社交互动', steps: ['与朋友聚会', '参加社交活动', '与人进行有趣的对话', '通过社交获得能量'] }, { method: '新的挑战', steps: ['寻找新的小冒险', '学习新技能', '尝试新的活动', '计划短途旅行'] }, { method: '解决问题', steps: ['识别压力源', '制定行动计划', '立即采取小步骤', '庆祝小的胜利'] }] },
    famousPeople: [{ name: '欧内斯特·海明威', title: '美国著名作家', contribution: '以其冒险精神、简洁有力的写作风格和对生活的热情闻名，体现了ESTP的行动力和冒险精神。', traits: ['冒险精神', '行动力', '简洁有力'] }, { name: '杰克·尼克劳斯', title: '美国传奇高尔夫球手', contribution: '以其竞争精神、冷静应对压力和体育成就闻名，展现了ESTP在体育竞技中的卓越表现。', traits: ['竞争精神', '冷静应对', '体育才能'] }, { name: '麦当娜', title: '美国流行歌手', contribution: '以其不断重塑自我、冒险精神和舞台魅力闻名，体现了ESTP的适应能力和表演才能。', traits: ['重塑自我', '冒险精神', '舞台魅力'] }, { name: '约翰·F·肯尼迪', title: '美国前总统', contribution: '以其个人魅力、危机应对能力和领导风格闻名，展现了ESTP在社交和政治领域的影响力。', traits: ['个人魅力', '危机应对', '领导力'] }]
  },
  ESFP: {
    type: 'ESFP',
    name: '表演者',
    nameEn: 'Entertainer',
    category: 'explorers',
    categoryEn: 'Explorers',
    tagline: '热情的表演者',
    slogan: '热爱生活，享受当下',
    description: 'ESFP是热情和有趣的表演者，热爱生活，享受当下。',
    detailedDescription: 'ESFP（表演者）是生活在当下的热情灵魂，他们以无与伦比的活力和魅力照亮周围的世界。作为探险家家族的一员，ESFP拥有敏锐的观察力和强烈的情感表达能力，使他们成为天生的表演者和社交高手。他们活在当下，享受每一刻的美好，并乐于与他人分享这种快乐。ESFP具有出色的审美品味和对美的敏感度，无论是时尚、音乐、艺术还是美食，他们都能以独特的视角发现和创造美。他们真诚、热情、富有同情心，总是愿意伸出援手帮助需要帮助的人。ESFP的灵活性和适应能力使他们能够在各种环境中茁壮成长，他们的乐观态度和幽默感能够化解紧张气氛，为周围的人带来欢笑和正能量。',
    traits: [{ trait: '热情', explanation: '对生活充满热情' }, { trait: '社交', explanation: '善于与人交往' }, { trait: '乐观', explanation: '积极乐观' }, { trait: '自发', explanation: '喜欢即兴' }],
    traitsDetailed: [{ title: '热情与活力', content: 'ESFP是活力和热情的化身，他们的存在本身就是一种能量的传递。他们对生活充满热爱，总是以积极乐观的态度面对每一天。这种热情不仅体现在他们的言语中，更体现在他们的行动和对周围人的感染力上。ESFP能够用自己的热情点燃他人的激情，让沉闷的环境变得生动有趣。' }, { title: '天生的表演者', content: 'ESFP拥有天生的表演天赋和舞台魅力。他们善于成为注意力的焦点，并且能够自如地在各种社交场合中展现自己。无论是正式的演讲、即兴的表演还是日常的社交互动，ESFP都能游刃有余。他们享受被关注的感觉，但更重要的是，他们享受为他人带来快乐和娱乐的过程。' }, { title: '活在当下的哲学家', content: 'ESFP是真正的"活在当下"的实践者。他们很少为过去懊悔或为未来焦虑，而是专注于享受眼前的每一刻。这种特质使他们能够充分体验生活的美好，抓住每一个机会创造快乐的回忆。虽然这可能让他们看起来缺乏长远规划，但也让他们拥有难得的轻松和自由。' }, { title: '敏锐的观察家', content: 'ESFP拥有敏锐的观察力和对细节的敏感度。他们能够注意到环境中的微妙变化，捕捉到他人情绪的细微波动。这种能力使他们成为出色的"读人者"，能够根据场合和人群调整自己的表现，创造出恰到好处的氛围和体验。' }, { title: '真诚的共情者', content: '尽管ESFP以欢乐和娱乐著称，但他们内心深处是非常真诚和富有同情心的人。他们真正关心他人的感受，愿意倾听并提供情感支持。当朋友遇到困难时，ESFP会用自己的方式——通常是陪伴和分散注意力——来帮助他们度过难关。' }],
    cognitiveFunctions: [{ symbol: 'Se', name: '外向感觉', level: '主导', description: '关注当下具体的感官体验和现实细节。', detailedDescription: '外向感觉(Se)是ESFP的主导功能，使他们敏锐地感知周围环境的细节和变化。他们活在当下，对色彩、声音、味道、质感等感官体验有着高度的敏感度。这种功能让ESFP能够迅速适应环境变化，抓住机会，并享受生活的即时乐趣。他们是行动的践行者，喜欢通过实际体验来学习和发展。', characteristics: ['活在当下', '感官敏锐', '行动导向', '适应力强', '注重细节', '享受体验'] }, { symbol: 'Fi', name: '内向情感', level: '辅助', description: '基于内在价值观做判断，追求真实和意义。', detailedDescription: '内向情感(Fi)是ESFP的辅助功能，为他们提供内在的道德指南针和价值体系。尽管ESFP外表看起来轻松随性，但他们内心深处非常重视真实性和个人诚信。这个功能帮助ESFP在娱乐他人和保持自我之间找到平衡，确保他们的行为符合自己的核心价值观。当ESFP展现出对他人的深刻关怀时，往往是Fi功能在发挥作用。', characteristics: ['内在价值', '追求真实', '个人诚信', '深度共情', '道德敏感', '保持自我'] }, { symbol: 'Te', name: '外向思考', level: '第三', description: '组织资源和执行计划，注重效率和结果。', detailedDescription: '外向思考(Te)是ESFP的第三功能，虽然在成长过程中发展较晚，但它为ESFP提供了组织能力和执行力。当这个功能得到发展时，ESFP能够更有效地管理资源、制定计划并实现目标。虽然在压力下可能表现为过度控制或急躁，但健康的Te功能帮助ESFP将创意转化为实际成果，平衡他们的随性与实效。', characteristics: ['组织执行', '效率导向', '资源整合', '目标达成', '逻辑分析', '结果导向'] }, { symbol: 'Ni', name: '内向直觉', level: '劣势', description: '对深层意义和未来可能性的直觉洞察。', detailedDescription: '内向直觉(Ni)是ESFP的劣势功能，代表着他们最不擅长但也最有成长空间的领域。这个功能涉及对未来的洞察、对隐藏模式的识别以及对深层意义的理解。对于ESFP来说，发展Ni功能意味着学会看到当下行为的长远影响，理解事件背后的象征意义，以及在行动前考虑可能的后果。虽然这不是ESFP的自然倾向，但有意识地发展这个功能可以帮助他们实现更全面的成长。', characteristics: ['未来洞察', '模式识别', '深层意义', '象征理解', '长远视角', '直觉预判'] }],
    strengths: [{ title: '卓越的社交能力', desc: 'ESFP是天生的社交高手，能够轻松与各种人建立联系。', details: 'ESFP拥有令人羡慕的社交天赋，他们能够在任何社交场合中游刃有余。无论是正式的商务聚会还是轻松的朋友聚餐，ESFP都能找到合适的方式与人互动。他们善于观察他人的反应，调整自己的表现，让每个人都感到舒适和受欢迎。这种能力使他们成为绝佳的聚会主持人、销售代表和客户关系经理。', detailsList: ['人际交往天赋', '读人能力出众', '气氛调节专家', '语言表达流畅', '肢体语言丰富', '让人放松的能力'], examples: ['在陌生聚会上迅速结识新朋友并建立深厚友谊', '作为主持人让尴尬的局面变得活跃有趣', '用幽默化解冲突并促成和解', '在商务谈判中建立良好的个人关系'] }, { title: '无穷的活力与热情', desc: 'ESFP充满生命力和激情，能够感染周围的每一个人。', details: 'ESFP似乎拥有无穷无尽的能量和热情。他们对生活充满热爱，总是以积极的态度面对挑战。这种活力不仅让他们自己能够持续地追求乐趣和体验，更重要的是能够感染周围的人。当团队士气低落时，ESFP能够用自己的热情点燃希望；当朋友感到沮丧时，ESFP的陪伴能带来阳光。这种感染力是ESFP最宝贵的礼物之一。', detailsList: ['积极乐观的感染力', '持续的能量输出', '对生活的热爱', '面对困难的韧性', '鼓舞他人的能力', '创造快乐氛围'], examples: ['在团队低谷期用热情重新点燃大家的斗志', '组织令人难忘的活动和庆祝', '用积极态度帮助朋友走出低谷', '即使在逆境中也能找到乐趣和希望'] }, { title: '出色的表演与表达', desc: 'ESFP拥有天生的表演天赋和卓越的表现力。', details: 'ESFP是天生的表演者，他们擅长用身体、语言和情感来传达信息和创造体验。无论是正式的舞台表演还是日常生活中的互动，ESFP都能够吸引注意力并留下深刻印象。他们对节奏、时机和观众反应的敏感度使他们能够精准地调整表现，达到最佳效果。这种天赋在演艺、演讲、教学和任何需要影响力的领域都是巨大的优势。', detailsList: ['舞台表现力', '情感表达能力', '肢体语言能力', '节奏感与时机', '观众互动能力', '即兴表演天赋'], examples: ['在公开演讲中抓住全场注意力', '用生动的表达方式让枯燥内容变得有趣', '在表演中展现真实的情感和魅力', '即兴创作令人捧腹的内容'] }, { title: '敏锐的观察与适应', desc: 'ESFP对环境和人的变化高度敏感，能够快速适应新情况。', details: 'ESFP拥有敏锐的观察力，能够捕捉到环境中的细微变化和他人的情绪波动。这种能力使他们能够快速理解新情况，并做出适当的调整。在变化迅速的环境中，ESFP能够迅速找到立足点；在社交互动中，他们能够根据对方的反应调整自己的方式。这种适应力是现代社会中极其宝贵的技能。', detailsList: ['环境敏感度', '情绪识别能力', '快速学习能力', '情境判断力', '灵活应变能力', '细节观察力'], examples: ['迅速适应新工作环境并融入团队', '根据谈话对象调整沟通风格', '在突发情况下快速找到解决方案', '识别他人的情绪变化并做出适当回应'] }],
    strengthsDetailed: 'ESFP的核心优势源于他们与生俱来的社交天赋、无限的热情和卓越的表现力。他们是天生的娱乐者和氛围制造者，能够让任何场合变得生动有趣。ESFP的敏锐观察力使他们能够快速理解环境和他人的需求，而他们的适应能力则让他们在各种情境中都能游刃有余。他们对生活的热爱和积极态度不仅让自己活得精彩，更能感染周围的人。ESFP的真诚和同情心使他们成为值得信赖的朋友和伙伴。他们的创造力和审美品味为生活和工作的各个方面增添了美感和乐趣。在需要人际交往、创意表达或氛围营造的领域，ESFP几乎无人能敌。',
    weaknesses: [{ title: '回避深度与严肃', desc: '倾向于回避严肃话题和深度情感交流', impact: 'ESFP对轻松愉快的追求可能导致他们回避必要的严肃对话和深度情感交流。这可能让他们在需要处理复杂情感问题或进行艰难谈话时感到不适，甚至选择逃避。长期如此可能影响关系的深度发展，让他人感觉ESFP不够真诚或不够投入。在需要面对冲突或处理负面情绪的场合，ESFP可能会显得手足无措或选择离开。', solutions: ['练习面对不适的对话，从小事开始建立耐受性', '学习将严肃话题分解为可管理的部分', '培养在不舒服情境中停留的能力', '寻求专业帮助学习冲突解决技巧', '理解深度交流对关系的重要性', '在安全关系中练习情感脆弱性'] }, { title: '长期规划的缺失', desc: '过度关注当下而忽视长远规划和未来准备', impact: 'ESFP活在当下的特质虽然令人向往，但可能导致他们忽视长期的财务规划、职业发展或关系承诺。他们可能享受当前的快乐而忽视未来的责任和后果，导致在老年或危机时期面临困境。这种短视可能表现为冲动消费、忽视储蓄、频繁更换工作或关系，以及缺乏持续的努力方向。', solutions: ['建立自动储蓄和投资机制，减少依赖意志力', '寻找让规划变得有趣的方法，如可视化目标', '与善于规划的人合作或寻求指导', '将长期目标分解为短期可执行的步骤', '定期回顾和调整人生规划', '培养延迟满足的能力'] }, { title: '注意力分散与完成困难', desc: '容易对新事物兴奋但难以坚持完成项目', impact: 'ESFP对新奇体验的热爱可能导致他们同时开始多个项目但难以完成任何一个。这种注意力分散可能让他们在学术、职业或个人发展上显得缺乏深度和持续性。他们可能给人留下不够可靠或不够认真的印象，错过需要长期投入才能获得的成就。在团队合作中，这种特质可能影响整体进度和他人对ESFP的信任。', solutions: ['设定明确的项目完成奖励机制', '找到问责伙伴监督进度', '学习时间管理技巧如番茄工作法', '优先选择有明确截止日期和里程碑的项目', '培养在困难阶段坚持的能力', '定期回顾未完成项目并做出完成或放弃的决定'] }, { title: '对外部认可的依赖', desc: '过度依赖他人的赞美和认可来维持自尊', impact: 'ESFP享受被关注和赞赏，但当这种需求变得过度时，可能导致他们过分在意他人的看法，甚至改变自己的行为来取悦他人。这种对外部认可的依赖可能损害他们的自我认同和内在价值感，使他们在面对批评或忽视时感到崩溃。他们可能变得过于讨好他人，忽视自己的真实需求和感受。', solutions: ['培养内在价值感和自我认同', '练习自我肯定和自我欣赏', '建立不依赖他人反馈的自尊基础', '学习区分建设性批评和无效否定', '发展独处时也能感到满足的能力', '寻求专业帮助处理自我价值问题'] }],
    weaknessesDetailed: 'ESFP的主要挑战源于他们活在当下的本能与现代社会对长期规划和深度投入的要求之间的冲突。他们对轻松愉快的追求可能让他们回避必要的严肃对话和情感深度，影响关系的质量和发展。ESFP对新奇的热爱可能导致注意力分散和项目完成困难，影响他们在需要持续努力的领域取得成就。过度依赖外部认可可能削弱他们的内在价值感和自我认同。此外，ESFP对即时满足的追求可能导致冲动决策和忽视长期后果。然而，通过有意识地发展内向直觉功能、建立支持性的结构和问责机制，ESFP完全可以克服这些挑战，在保持其独特魅力的同时实现更全面的人生发展。',
    relationships: { romance: { title: '恋爱中的表演者', desc: 'ESFP在恋爱关系中是热情、浪漫且充满惊喜的伴侣。他们追求激情、乐趣和即时的情感连接，善于用创意和热情让恋情保持新鲜感。ESFP享受与伴侣共同体验生活的美好，创造难忘的回忆。然而，他们可能在面对关系中的严肃问题和长期承诺时感到挑战。', characteristics: ['充满激情和浪漫', '善于制造惊喜', '享受共同体验', '表达爱意直接', '追求关系中的乐趣', '对伴侣情感需求敏感'], challenges: ['回避深度情感交流', '对长期承诺的恐惧', '容易被新奇吸引', '处理冲突时可能逃避', '情绪波动可能影响关系', '需要持续的关注和认可'], advice: ['练习进行严肃但必要的情感对话', '理解承诺不等于失去自由', '发展关系中的情感深度', '学习健康处理冲突的方式', '建立独立的价值感', '与伴侣共同设定长期目标'], compatibility: [{ type: 'ISFJ', desc: 'ISFJ的温暖和稳定性为ESFP提供安全感，而ESFP为ISFJ的生活带来乐趣和冒险。这种互补能够创造平衡和谐的关系。' }, { type: 'ISTJ', desc: 'ISTJ的可靠性和结构感能够帮助ESFP更好地组织生活，而ESFP教会ISTJ享受当下。这种组合需要双方的理解和妥协。' }, { type: 'ESTP', desc: '两个探险家的组合充满刺激和冒险，他们能够一起享受生活的乐趣。挑战在于建立关系的深度和稳定性。' }, { type: 'ENFP', desc: 'ENFP和ESFP共享对生活的热情和对新体验的追求，他们能够一起创造丰富多彩的生活。两者都需要学习处理严肃话题。' }] }, friendship: { title: '友谊中的活力源泉', desc: 'ESFP是朋友圈中的开心果和活力源泉。他们善于组织活动、营造氛围，让每次聚会都充满欢乐。ESFP重视友谊，愿意为朋友付出时间和精力，但他们也期望得到同等的关注和认可。', characteristics: ['社交活动的组织者', '善于倾听和共情', '愿意为朋友付出', '带来欢笑和正能量', '适应各种社交场合', '真诚关心朋友'], challenges: ['可能过于关注表面的快乐', '对深度友谊维护不足', '可能过于依赖朋友的认可', '情绪波动可能影响友谊', '容易因新友谊而忽视旧友', '在朋友需要严肃建议时可能回避'], advice: ['培养维护长期友谊的意识', '学习提供深度的情感支持', '建立不依赖外部认可的自我价值', '平衡新旧友谊的投入', '发展提供建设性反馈的能力', '珍惜真正的友谊而非泛泛之交'], compatibility: [{ type: 'ESTP', desc: '两个行动派在一起永远不会无聊，他们能够一起享受冒险和刺激。' }, { type: 'ENFP', desc: 'ENFP和ESFP共享热情和创意，能够一起探索生活的无限可能。' }, { type: 'ESFJ', desc: 'ESFJ的组织能力和ESFP的娱乐天赋是绝佳组合，能够创造难忘的社交体验。' }, { type: 'ISFP', desc: 'ISFP和ESFP都是探险家，能够理解彼此对自由和体验的需求。' }] }, parenting: { title: '充满欢乐的父母', desc: 'ESFP父母为孩子创造充满欢乐和体验的童年。他们鼓励孩子探索、尝试和享受生活的每一刻。ESFP父母通常很宽容，希望孩子能够自由发展个性。然而，他们也需要学习设定必要的界限和培养孩子的责任感。', characteristics: ['创造快乐的家庭氛围', '鼓励孩子探索体验', '对孩子的情感需求敏感', '善于用创意方式教育', '与孩子建立朋友般的关系', '带孩子参与各种活动'], challenges: ['设定和执行规则', '处理孩子的负面行为', '平衡乐趣与责任教育', '长期的财务规划', '应对育儿中的压力', '保持耐心面对重复性任务'], advice: ['建立清晰但灵活的规则', '学习一致的纪律执行', '平衡乐趣时光和责任教育', '为孩子的教育做长期规划', '寻求其他类型父母的建议', '在育儿中找到自己的乐趣'] } },
    career: { title: '表演者的职业道路', desc: 'ESFP在需要人际交往、创意表达和现场表现的职业中表现出色。他们天生的表演天赋、社交能力和热情活力使他们成为客户服务、娱乐、销售和任何需要与人打交道的领域的理想人选。ESFP适合动态、有趣且能够立即看到成果的工作环境。', suitable: ['演员/表演者', '销售代表', '活动策划师', '旅游顾问', '公关专员', '主持人', '幼儿教育', '健身教练', '客户服务经理', '市场营销', '宴会策划', '空乘人员'], suitableDetails: [{ career: '演员/表演者', reason: 'ESFP天生的表演天赋和舞台魅力使他们在这个领域如鱼得水。他们能够用真实的情感感染观众，并通过表演传递力量。' }, { career: '销售代表', reason: 'ESFP的社交能力、说服力和建立关系的天赋使他们成为优秀的销售人员。他们能够读懂客户需求并建立信任。' }, { career: '活动策划师', reason: 'ESFP的创意、组织能力和对细节的关注使他们能够策划出令人难忘的活动。他们善于营造氛围和处理突发情况。' }, { career: '旅游顾问', reason: 'ESFP对体验的热爱和对人的关注使他们能够帮助客户规划完美的旅程。他们的热情能够感染客户。' }, { career: '公关专员', reason: 'ESFP的社交技巧、应变能力和表现力使他们能够有效地管理公众形象和媒体关系。' }, { career: '幼儿教育', reason: 'ESFP的活力、创意和对孩子的喜爱使他们成为优秀的幼儿教师。他们能够创造有趣的学习环境。' }, { career: '健身教练', reason: 'ESFP的能量和激励他人的能力使他们能够帮助客户实现健身目标。他们让锻炼变得有趣。' }, { career: '客户服务经理', reason: 'ESFP的同理心和问题解决能力使他们能够处理客户投诉并维护良好关系。' }], unsuitable: ['孤立的研究工作', '重复性数据录入', '长期独立项目', '高度技术编程', '后台分析工作', '严格层级管理', '缺乏人际互动', '过于抽象的理论研究'], workStyle: 'ESFP喜欢动态、社交性强且能够看到即时成果的工作环境。他们善于在快节奏的环境中表现出色，喜欢与人互动并解决问题。', workStyleDetailed: 'ESFP在工作场所中如鱼得水，当他们的工作涉及社交互动、创意表达和即时反馈时。他们喜欢团队合作，能够用热情感染同事，并在压力下保持积极态度。ESFP适合需要灵活性、适应性和人际交往的角色。他们善于处理客户关系、公众演讲和团队激励。然而，他们可能在需要长期专注、独立工作或严格遵循既定流程的任务中感到挑战。理想的工作环境给予ESFP自由度、社交机会和表现舞台，同时提供一定的结构和指导帮助他们成长。', workStyleDetails: ['高度的人际互动', '快节奏和变化', '即时反馈和认可', '创意表达机会', '团队合作环境', '灵活的工作方式'] },
    growth: { opportunities: ['深度交流能力', '长期规划技能', '冲突处理能力', '专注力培养', '内在价值建立', '延迟满足能力'], opportunitiesDetailed: [{ area: '深度交流能力', desc: 'ESFP倾向于保持轻松愉快的交流，但深度关系需要严肃对话。发展这项能力有助于建立更深厚的关系。', actions: ['练习进行重要但困难的对话', '学习倾听而非仅仅回应', '培养在不适情境中停留的能力', '寻求专业沟通技巧培训', '在小范围安全关系中练习脆弱性'] }, { area: '长期规划技能', desc: 'ESFP活在当下的特质可能导致忽视长远规划。发展这项能力有助于确保未来的安全和成功。', actions: ['设定长期愿景和目标', '建立自动储蓄和投资机制', '将大目标分解为小步骤', '定期回顾和调整计划', '寻找导师或规划伙伴'] }, { area: '冲突处理能力', desc: 'ESFP对和谐的追求可能让他们回避必要的冲突。学习健康处理冲突是重要的成长领域。', actions: ['理解冲突不一定破坏关系', '学习非暴力沟通技巧', '练习表达不同意见', '寻求冲突解决培训', '在安全环境中练习处理分歧'] }, { area: '专注力培养', desc: 'ESFP容易被新事物分散注意力。培养专注力有助于完成重要项目。', actions: ['使用时间管理工具如番茄钟', '设定明确的项目里程碑', '找到问责伙伴', '消除工作环境中的干扰', '练习正念冥想提高专注'] }, { area: '内在价值建立', desc: 'ESFP可能过度依赖外部认可。建立内在价值感有助于提高自尊和抗压能力。', actions: ['定期进行自我反思', '记录个人成就和成长', '培养独处时的满足感', '寻求专业帮助建立自我认同', '练习自我肯定'] }, { area: '延迟满足能力', desc: 'ESFP追求即时快乐可能损害长期利益。培养延迟满足能力有助于实现更大目标。', actions: ['设定奖励机制', '从小事开始练习等待', '可视化长期奖励', '理解即时满足的长期代价', '建立支持性的问责系统'] }], actions: ['每天花时间进行自我反思', '设定并完成至少一个长期项目', '练习进行困难的对话', '建立自动储蓄计划', '找到导师或教练', '培养独处爱好', '学习冲突解决技巧', '定期回顾人生目标和价值观'], detailedAdvice: 'ESFP的个人成长之旅需要在保持其独特魅力和热情的同时，发展深度、专注和长远思考的能力。这不是要变成另一个人，而是要扩展自己的技能范围，在享受生活的同时也能应对生活的挑战。关键在于找到平衡点——既不完全放弃活在当下的美好，也不忽视未来的责任。ESFP可以通过将成长目标变得有趣和社交化来提高成功率，例如与朋友一起设定目标或参加成长小组。记住，成长是一个过程，不必追求完美，而是追求进步。', longTermGoals: ['建立深厚的亲密关系', '实现职业上的长期成功', '培养财务安全感', '发展内在平静和自我接纳', '成为能够处理各种生活挑战的成熟个体', '在保持热情的同时获得深度和智慧'] },
    stress: { triggers: ['孤独和隔离', '严格的规则和限制', '缺乏社交互动', '被忽视或不被认可', '单调重复的工作', '必须处理抽象理论', '面对严肃的情感冲突', '长期缺乏刺激'], triggersDetailed: [{ trigger: '孤独和隔离', explanation: 'ESFP是高度社交的人，长时间的孤独会消耗他们的能量并导致抑郁。他们需要与他人互动来获得能量和满足感。' }, { trigger: '严格的规则和限制', explanation: '过多的结构化和限制会让ESFP感到窒息。他们需要在规则和自由之间找到平衡。' }, { trigger: '缺乏社交互动', explanation: '即使是工作，如果完全缺乏人际互动，也会让ESFP感到不满足和压力。' }, { trigger: '被忽视或不被认可', explanation: 'ESFP需要外部的积极反馈来维持自尊。长期的忽视或批评会严重打击他们的情绪。' }, { trigger: '单调重复的工作', explanation: '缺乏变化和挑战的工作会让ESFP感到无聊和沮丧。' }, { trigger: '必须处理抽象理论', explanation: '脱离实际的理论讨论会让注重具体体验的ESFP感到挫败。' }, { trigger: '面对严肃的情感冲突', explanation: 'ESFP倾向于保持和谐，深度的情感冲突会让他们感到压力和不适。' }, { trigger: '长期缺乏刺激', explanation: '缺乏新鲜体验和刺激会让ESFP感到生活失去了色彩。' }], signs: ['过度寻求刺激', '情绪波动加剧', '注意力更加分散', '冲动行为增加', '逃避责任', '情绪爆发', '社交退缩', '身体症状'], signsDetailed: [{ stage: '初期压力', signs: ['坐立不安', '难以专注', '过度寻求娱乐', '对日常活动失去兴趣', '轻微的情绪波动'] }, { stage: '中期压力', signs: ['注意力严重分散', '冲动决策增多', '开始逃避责任', '睡眠质量下降', '情绪起伏变大'] }, { stage: '高压力', signs: ['情绪爆发或崩溃', '完全无法专注', '逃避所有责任', '社交退缩', '可能依赖不健康应对机制', '身体症状如头痛或疲劳'] }], coping: ['保持社交连接', '寻找健康的刺激', '练习正念和放松', '运动和身体活动', '创造性表达', '寻求专业帮助'], copingDetailed: [{ method: '保持社交连接', steps: ['主动与朋友联系', '参加社交活动', '加入兴趣小组或俱乐部', '与理解你的人分享感受', '避免完全孤立'] }, { method: '寻找健康的刺激', steps: ['尝试新的爱好', '计划小旅行或冒险', '改变日常生活', '学习新技能', '参加有趣的活动'] }, { method: '练习正念和放松', steps: ['学习冥想技巧', '进行深呼吸练习', '练习渐进式肌肉放松', '花时间在大自然中', '建立放松的日常仪式'] }, { method: '运动和身体活动', steps: ['进行有氧运动', '尝试舞蹈课程', '参加团队运动', '进行户外活动', '定期锻炼'] }, { method: '创造性表达', steps: ['通过艺术表达情感', '写作或 journaling', '音乐创作或演奏', '参与表演艺术', '尝试手工艺'] }, { method: '寻求专业帮助', steps: ['考虑心理咨询', '寻找支持小组', '学习压力管理技巧', '必要时寻求医疗帮助', '持续跟进治疗进展'] }] },
    famousPeople: [{ name: '玛丽莲·梦露', title: '演员', contribution: '电影表演', traits: ['魅力', '表演'] }, { name: '阿黛尔', title: '歌手', contribution: '音乐演唱', traits: ['才华', '情感'] }]
  }
};

// 辅助函数：根据类型获取详细报告
export function getMBTIReport(type: string): MBTIFullReport | null {
  return mbtiFullReports[type.toUpperCase()] || null;
}

// 导出所有报告数据
export default mbtiFullReports;
