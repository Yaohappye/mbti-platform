/**
 * MBTI 详细人格报告数据
 * 数据来源：16Personalities 高级指南中文翻译版
 */

export interface DetailedMBTIReport {
  type: string;
  overview: string;
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  relationships: string;
  growth: string;
  stress: string;
  cognitiveFunctions: string;
}

export const detailedMBTIReports: Record<string, DetailedMBTIReport> = {

  'ENFJ': {
    type: 'ENFJ',
    overview: "Machine Translated by Google Machine Translated by Google 类型，因为它会影响他们生活的不同领域，包括关键的优势和劣势， 人际关系、学术道路、职业和专业发展，以及他们的 它将人格类型理论与来自现实世界的实用建议相结合 人格类型一直是许多讨论的主题，其中一些可以追溯到 到古代。从这个知识和经验的源头汲取知识是明智的， 提供控制和了解自己的力量。",
    strengths: ["“我不同意，因为他们错了，我可以证明这一点。”", "“我在直觉上不同意，但我无法解释。”", "“我不同意是因为我的基本价值观，我可以解释。”"],
    weaknesses: ["“我不同意，因为他们错了，我可以证明这一点。”", "“我在直觉上不同意，但我无法解释。”", "“我不同意是因为我的基本价值观，我可以解释。”"],
    careers: [],
    relationships: "",
    growth: "",
    stress: "",
    cognitiveFunctions: ""
  },
  'ENFP': {
    type: 'ENFP',
    overview: "本简介旨在涵盖活动参与者个性的所有主要方面，因为它影响着他们生活的不同领域，包括活动参与者的主要优势和劣势、关系、学术道路、职业和专业发展，以及他们的沟通和交友技能、育儿技巧和建议等。它将人格类型理论与其他与“竞选者”人格类型相同的人提供的实际、现实的建议相结合。 人格类型一直是许多讨论的主题，其中一些可以追溯到古代。从这些知识和经验中吸取教训是明智的，尤其是在不确定如何处理特定情况时。这种知识提",
    strengths: [],
    weaknesses: [],
    careers: [],
    relationships: "",
    growth: "",
    stress: "",
    cognitiveFunctions: ""
  },
  'ENTJ': {
    type: 'ENTJ',
    overview: "Machine Translated by Google Machine Translated by Google 此简介旨在涵盖指挥官个性的所有主要方面，如 它会影响他们生活的不同领域，包括指挥官的主要优势和 弱点、人际关系、学术路径、职业和专业发展，如 以及他们的沟通和社交技巧、育儿技巧和建议等等， 更多。它将人格类型理论与实用的、现实世界的建议相结合 正如亚里士多德几千年前所说，“最艰难的胜",
    strengths: [],
    weaknesses: [],
    careers: [],
    relationships: "",
    growth: "",
    stress: "",
    cognitiveFunctions: ""
  },
  'ENTP': {
    type: 'ENTP',
    overview: "What’s in This Profile? 本简介旨在涵盖辩论者个性的所有主要方面，因为它影响着他们生活的不同领域，包 括辩论者的主要优势和劣势、人际关系、学术道路、职业和专业发展，以及他们的沟 通和社交技能、育儿技巧和建议等。它将人格类型理论与与辩论者人格类型相同的其 正如亚里士多德几千年前所说，“最艰难的胜利是战胜自我”——为此，从古希腊的四 种幽默到卡尔·荣格的作品，人类历史上一直在考虑",
    strengths: ["戈特曼（John Gottman）所认定的“世界末日四骑士”之一。具体来说，他们使用批"],
    weaknesses: ["戈特曼（John Gottman）所认定的“世界末日四骑士”之一。具体来说，他们使用批"],
    careers: ["戈特曼（John Gottman）所认定的“世界末日四骑士”之一。具体来说，他们使用批"],
    relationships: "",
    growth: "",
    stress: "",
    cognitiveFunctions: ""
  },
  'ESFJ': {
    type: 'ESFJ',
    overview: "What’s in This Profile? 此简介旨在涵盖领事性格的所有主要方面，因为它会影响他们生活的不同领域，包括领事的主要优势 和劣势、人际关系、学术道路、职业和专业发展，以及他们的沟通和社交技能，育儿技巧和建议等 等。它将人格类型理论与其他具有 Consul 人格类型的人提供的实用、真实的建议相结合。 性格类型一直是许多讨论的话题，其中一些可以追溯到古代。借鉴这种知识和经验来源是明智的",
    strengths: [", 16 Pe rs Qualities “The Consul” (ESFJ, -A/-T)", "角色决定了我们的目标、兴趣和偏好的活动。", "战略反映了我们首选的做事方式和实现目标的方式。", "分析师角色包括架构师 (INTJ)、逻辑学家 (INTP)、指挥官 (ENTJ) 和辩手 (ENTP)。", ", 16 Pe rs Dualities “The Consul” (ESFJ, -A/-T)"],
    weaknesses: [", 16 Pe rs Qualities “The Consul” (ESFJ, -A/-T)", "角色决定了我们的目标、兴趣和偏好的活动。", "战略反映了我们首选的做事方式和实现目标的方式。", "分析师角色包括架构师 (INTJ)、逻辑学家 (INTP)、指挥官 (ENTJ) 和辩手 (ENTP)。", ", 16 Pe rs Dualities “The Consul” (ESFJ, -A/-T)"],
    careers: [", 16 Pe rs Qualities “The Consul” (ESFJ, -A/-T) 10", "角色决定了我们的目标、兴趣和偏好的活动。", "战略反映了我们首选的做事方式和实现目标的方式。", "分析师角色包括架构师 (INTJ)、逻辑学家 (INTP)、指挥官 (ENTJ) 和辩手 (ENTP)。", ", 16 Pe rs Dualities “The Consul” (ESFJ, -A/-T) 19", "外交官角色包括倡导者 (INFJ)、调解者 (INFP)、主角 (ENFJ) 和活动家 (ENFP)。", "哨兵角色包括后勤人员(ISTJ)、后卫(ISFJ)、执行人员(ESTJ) 和领事(ESFJ)。", "Explorer Role包括 Virtuosos (ISTP)、Adventurers (ISFP)、Entrepreneurs (ESTP) 和 Entertainers"],
    relationships: "",
    growth: "",
    stress: "",
    cognitiveFunctions: ""
  },
  'ESFP': {
    type: 'ESFP',
    overview: "本简介旨在涵盖艺人个性的主要方面，因为它影响着他们生活的不同领域，包括艺人的主要优势和劣势、人际关系、学术道路、职业和专业发展，以及他们的沟通和交友技能、育儿技巧和建议等。它将人格类型理论与来自其他与艺人人格类型相同的人的实际、现实建议相结合。 人格类型一直是许多讨论的焦点，其中一些可以追溯到古代。从这些知识和经验中吸取教训是明智的，尤其是在不确定如何处理特定情况时。这种知识提供了控制和理解自己的",
    strengths: ["说他们更喜欢有几个好朋友或搭档和几个好朋友。因此，将这些人格类型视为反社会是不准确的。"],
    weaknesses: ["说他们更喜欢有几个好朋友或搭档和几个好朋友。因此，将这些人格类型视为反社会是不准确的。"],
    careers: ["说他们更喜欢有几个好朋友或搭档和几个好朋友。因此，将这些人格类型视为反社会是不准确的。"],
    relationships: "",
    growth: "",
    stress: "",
    cognitiveFunctions: ""
  },
  'ESTJ': {
    type: 'ESTJ',
    overview: "本简介旨在涵盖高管个性的所有主要方面，因为它影响着他们生活的不同领域，包括高管的主要优势和劣势、人际关系、学术道路、职业和专业发展，以及他们的沟通和交友技能、育儿技巧和建议等。它将人格类型理论与其他与高管人格类型相同的人提供的实际建议结合起来。 人格类型一直是许多讨论的主题，其中一些可以追溯到古代。从这些知识和经验中吸取教训是明智的，尤其是在不确定如何处理特定情况时。这种知识提供了控制和理解自己的",
    strengths: ["说他们更喜欢有几个好朋友或搭档和几个好朋友。因此，将这些人格类型视为反社会是不准确的。"],
    weaknesses: ["说他们更喜欢有几个好朋友或搭档和几个好朋友。因此，将这些人格类型视为反社会是不准确的。"],
    careers: ["说他们更喜欢有几个好朋友或搭档和几个好朋友。因此，将这些人格类型视为反社会是不准确的。"],
    relationships: "",
    growth: "",
    stress: "",
    cognitiveFunctions: ""
  },
  'ESTP': {
    type: 'ESTP',
    overview: "本简介旨在涵盖企业家个性的所有主要方面，因为它影响着企业家生活的不同领域，包括企业家的主要优势和劣势、人际关系、学术道路、职业和专业发展，以及他们的沟通和社交技能、育儿技巧和建议等。它将人格类型理论与分享企业家人格类型的其他人的实际、现实建议相结合。 正如亚里士多德几千年前所说，“最艰难的胜利是战胜自我”——为此，在整个人类历史中，人格类型都被考虑和研究过。这些页面中的信息提供了深刻的个人见解，有",
    strengths: [],
    weaknesses: [],
    careers: [],
    relationships: "",
    growth: "",
    stress: "",
    cognitiveFunctions: ""
  },
  'INFJ': {
    type: 'INFJ',
    overview: "欲了解更多信息，请访问www.DeepL.com/pro。 本简介旨在涵盖倡导者性格的主要方面，因为它影响到他们生活的不同领域，包 括倡导者的主要优势和劣势、人际关系、学术道路、职业和专业发展，以及他们的 沟通和交友技巧、育儿技巧和建议，还有很多很多。本书将人格类型理论与其他具 有倡导者人格类型的人提供的实用的、现实世界的建议相结合。 性格类型一直是许多讨论的焦点，其中一些可以追溯到古代。从这一知",
    strengths: ["角色决定了我们的目标、兴趣和首选活动。", "战略反映了我们做事情和实现目标的首选方式。", "分析师角色包括建筑师（INTJ）、逻辑学家（INTP）、指挥官（ENTJ）和辩论者", "外交官角色包括倡导者（INFJ）、调解者（INFP）、主角（ENFJ）和运动者（", "哨兵角色包括后勤人员（ISTJ）、保卫者（ISFJ）、执行者（ESTJ）和领事（"],
    weaknesses: ["角色决定了我们的目标、兴趣和首选活动。", "战略反映了我们做事情和实现目标的首选方式。", "分析师角色包括建筑师（INTJ）、逻辑学家（INTP）、指挥官（ENTJ）和辩论者", "外交官角色包括倡导者（INFJ）、调解者（INFP）、主角（ENFJ）和运动者（", "哨兵角色包括后勤人员（ISTJ）、保卫者（ISFJ）、执行者（ESTJ）和领事（"],
    careers: ["角色决定了我们的目标、兴趣和首选活动。", "战略反映了我们做事情和实现目标的首选方式。", "分析师角色包括建筑师（INTJ）、逻辑学家（INTP）、指挥官（ENTJ）和辩论者", "外交官角色包括倡导者（INFJ）、调解者（INFP）、主角（ENFJ）和运动者（", "哨兵角色包括后勤人员（ISTJ）、保卫者（ISFJ）、执行者（ESTJ）和领事（", "探索者角色包括维塔斯（ISTP）、冒险家（ISFP）、企业家（ESTP）和娱乐家", "自尊是指代言人的价值感。它是由他们认为自己对世界或社区的价值程度来衡", "自尊心说的是他们有多喜欢自己。如果他们坐在自己的对面喝咖啡，根据他们"],
    relationships: "",
    growth: "",
    stress: "",
    cognitiveFunctions: ""
  },
  'INFP': {
    type: 'INFP',
    overview: "本简介旨在涵盖调解人个性的所有主要方面，因为它影响到调解人生活的不同领域，包括调解人的主要优势和劣势、人际关系、学术道路、职业和专业发展，以及他们的沟通和交友技能、育儿技巧和建议，以及其他许多方面，更多。它将人格类型理论与来自其他具有中介人格类型的人的实际建议相结合。 人格类型一直是许多讨论的焦点，其中一些可以追溯到古代。从这些知识和经验中吸取教训是明智的，尤其是在不确定如何处理特定情况时。这种知",
    strengths: ["角色决定我们的目标、兴趣和首选活动。", "战略反映了我们做事和实现目标的首选方式。", "分析师角色包括架构师（INTJ）、逻辑学家（INTP）、指挥官（ENTJ）和辩论员（ENTP）。", "外交官角色包括倡导者（INFJ）、调解人（INFP）、主角（ENFJ）和活动家（ENFP）。", "哨兵角色包括后勤人员（ISTJ）、辩护人（ISFJ）、行政人员（ESTJ）和领事（ESFJ）。", "探险家的角色包括艺术家（ISTP）、冒险家（ISFP）、企业家（ESTP）和艺人（ESFP）。"],
    weaknesses: ["角色决定我们的目标、兴趣和首选活动。", "战略反映了我们做事和实现目标的首选方式。", "分析师角色包括架构师（INTJ）、逻辑学家（INTP）、指挥官（ENTJ）和辩论员（ENTP）。", "外交官角色包括倡导者（INFJ）、调解人（INFP）、主角（ENFJ）和活动家（ENFP）。", "哨兵角色包括后勤人员（ISTJ）、辩护人（ISFJ）、行政人员（ESTJ）和领事（ESFJ）。", "探险家的角色包括艺术家（ISTP）、冒险家（ISFP）、企业家（ESTP）和艺人（ESFP）。"],
    careers: ["角色决定我们的目标、兴趣和首选活动。", "战略反映了我们做事和实现目标的首选方式。", "分析师角色包括架构师（INTJ）、逻辑学家（INTP）、指挥官（ENTJ）和辩论员（ENTP）。", "外交官角色包括倡导者（INFJ）、调解人（INFP）、主角（ENFJ）和活动家（ENFP）。", "哨兵角色包括后勤人员（ISTJ）、辩护人（ISFJ）、行政人员（ESTJ）和领事（ESFJ）。", "探险家的角色包括艺术家（ISTP）、冒险家（ISFP）、企业家（ESTP）和艺人（ESFP）。", "自尊反映了调解人对自身价值的认识。", "自尊表明他们有多喜欢自己。", "自信是调解人找到推动他们在生活中前进的能量的地方。"],
    relationships: "",
    growth: "",
    stress: "",
    cognitiveFunctions: ""
  },
  'ISFP': {
    type: 'ISFP',
    overview: "本简介旨在涵盖冒险者性格的所有主要方面，因为它影响着他们生活的不同领域，包括冒险者的主要优势和劣势、人际关系、学术道路、职业和专业发展，以及他们的沟通和社交技能、育儿技巧和建议等。它将人格类型理论与其他具有冒险者人格类型的人提供的实际建议结合起来。 正如亚里士多德几千年前所说，“最艰难的胜利是战胜自我”——为此，在整个人类历史中，人格类型都被考虑和研究过。这些页面中的信息提供了深刻的个人见解，有助",
    strengths: [],
    weaknesses: [],
    careers: [],
    relationships: "",
    growth: "",
    stress: "",
    cognitiveFunctions: ""
  },
};

export function getDetailedReport(mbtiType: string): DetailedMBTIReport | null {
  return detailedMBTIReports[mbtiType.toUpperCase()] || null;
}
