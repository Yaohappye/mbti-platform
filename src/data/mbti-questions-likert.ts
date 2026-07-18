/**
 * MBTI 李克特五选一题库
 * 计分规则：
 * - 正向题：选1得1分，选2得2分，选3得3分，选4得4分，选5得5分
 * - 反向题：选1得5分，选2得4分，选3得3分，选4得2分，选5得1分
 * 
 * 三套题库层级关系：
 * - 60题基础版：1-60题
 * - 93题专业版：1-93题（60题+33题）
 * - 200题完整版：1-200题（93题+107题）
 */

export type Dimension = 'EI' | 'SN' | 'TF' | 'JP';
export type Version = 60 | 93 | 200;

export interface LikertQuestion {
  id: number;
  content: string;
  dimension: Dimension;
  reverse: boolean; // true=反向计分，false=正向计分
  version: Version; // 该题首次出现的版本
}

// ==================== 60题基础版（1-60题） ====================

// E/I 维度（1-15题）：正向10道，反向5道
const EI_60: LikertQuestion[] = [
  { id: 1, content: "空闲时我更愿意约朋友出门聚会", dimension: 'EI', reverse: false, version: 60 },
  { id: 2, content: "长时间多人社交后，我会感到疲惫想独处", dimension: 'EI', reverse: true, version: 60 },
  { id: 3, content: "陌生场合我能主动开启话题和陌生人聊天", dimension: 'EI', reverse: false, version: 60 },
  { id: 4, content: "心里有想法，我习惯先和别人倾诉再梳理思路", dimension: 'EI', reverse: false, version: 60 },
  { id: 5, content: "休息充电的最好方式是一个人安静待着", dimension: 'EI', reverse: true, version: 60 },
  { id: 6, content: "聚会冷场时，我会主动找话题活跃气氛", dimension: 'EI', reverse: false, version: 60 },
  { id: 7, content: "我不喜欢频繁的线下社交活动", dimension: 'EI', reverse: true, version: 60 },
  { id: 8, content: "认识新朋友是一件让我开心放松的事", dimension: 'EI', reverse: false, version: 60 },
  { id: 9, content: "当众发言不会让我紧张局促", dimension: 'EI', reverse: false, version: 60 },
  { id: 10, content: "日常多数情绪我只会自己消化，很少对外诉说", dimension: 'EI', reverse: true, version: 60 },
  { id: 11, content: "我享受热闹、人多的氛围", dimension: 'EI', reverse: false, version: 60 },
  { id: 12, content: "线上聊天我通常回复简短，不喜欢长篇闲聊", dimension: 'EI', reverse: true, version: 60 },
  { id: 13, content: "遇到难题我第一时间找人商量讨论", dimension: 'EI', reverse: false, version: 60 },
  { id: 14, content: "我更偏爱一对一深度聊天，而非大型集体派对", dimension: 'EI', reverse: true, version: 60 },
  { id: 15, content: "身边人评价我性格外向健谈", dimension: 'EI', reverse: false, version: 60 },
];

// S/N 维度（16-30题）：正向10道，反向5道
const SN_60: LikertQuestion[] = [
  { id: 16, content: "学习新知识时，我更关注实际操作与真实案例", dimension: 'SN', reverse: false, version: 60 },
  { id: 17, content: "我经常畅想未来多种可能性，喜欢脑洞创意", dimension: 'SN', reverse: true, version: 60 },
  { id: 18, content: "看文章我会重点留意数字、细节、客观事实", dimension: 'SN', reverse: false, version: 60 },
  { id: 19, content: "比起落地实操，我更感兴趣抽象理论与底层规律", dimension: 'SN', reverse: true, version: 60 },
  { id: 20, content: "做计划时我优先考虑当下现实条件", dimension: 'SN', reverse: false, version: 60 },
  { id: 21, content: "我容易从一件小事联想多种不同发展走向", dimension: 'SN', reverse: true, version: 60 },
  { id: 22, content: "我更信任亲身经历、真实发生的经验", dimension: 'SN', reverse: false, version: 60 },
  { id: 23, content: "我喜欢思考事物背后隐藏的隐喻与深层含义", dimension: 'SN', reverse: true, version: 60 },
  { id: 24, content: "解决问题我优先使用经过验证的成熟方法", dimension: 'SN', reverse: false, version: 60 },
  { id: 25, content: "我厌烦重复一成不变的固定流程", dimension: 'SN', reverse: true, version: 60 },
  { id: 26, content: "描述一件事，我习惯精准说出细节和过程", dimension: 'SN', reverse: false, version: 60 },
  { id: 27, content: "我经常冒出新奇、和别人不一样的点子", dimension: 'SN', reverse: true, version: 60 },
  { id: 28, content: "购物时我更看重产品实际功能、参数", dimension: 'SN', reverse: false, version: 60 },
  { id: 29, content: "比起写实纪录片，我更喜欢充满幻想的虚构故事", dimension: 'SN', reverse: true, version: 60 },
  { id: 30, content: "我很少忽略眼前客观现状去空想未来", dimension: 'SN', reverse: false, version: 60 },
];

// T/F 维度（31-45题）：正向10道，反向5道
const TF_60: LikertQuestion[] = [
  { id: 31, content: "发生矛盾时，我优先分清对错、客观讲道理", dimension: 'TF', reverse: false, version: 60 },
  { id: 32, content: "做决定前我会优先顾及身边人的情绪感受", dimension: 'TF', reverse: true, version: 60 },
  { id: 33, content: "评价他人我主要看对方做事能力与客观成果", dimension: 'TF', reverse: false, version: 60 },
  { id: 34, content: "团队分歧里，我会主动妥协避免伤害他人感情", dimension: 'TF', reverse: true, version: 60 },
  { id: 35, content: "规则公平比照顾个人情绪更重要", dimension: 'TF', reverse: false, version: 60 },
  { id: 36, content: "别人求助时，我第一反应共情对方难处", dimension: 'TF', reverse: true, version: 60 },
  { id: 37, content: "争论时我更在意逻辑证据，而非对方心情", dimension: 'TF', reverse: false, version: 60 },
  { id: 38, content: "我很难对情绪低落的人保持理性冷淡", dimension: 'TF', reverse: true, version: 60 },
  { id: 39, content: "奖惩判断我只依据客观贡献，不掺杂私人好感", dimension: 'TF', reverse: false, version: 60 },
  { id: 40, content: "我会为了照顾他人感受改变自己原本的计划", dimension: 'TF', reverse: true, version: 60 },
  { id: 41, content: "看待问题我习惯剥离情绪，只分析利弊", dimension: 'TF', reverse: false, version: 60 },
  { id: 42, content: "和亲友吵架，我会先主动让步安抚对方", dimension: 'TF', reverse: true, version: 60 },
  { id: 43, content: "我欣赏处事理性、公私分明的人", dimension: 'TF', reverse: false, version: 60 },
  { id: 44, content: "别人对我的负面评价会让我难过很久", dimension: 'TF', reverse: true, version: 60 },
  { id: 45, content: "工作中我更看重任务完成度，而非团队氛围", dimension: 'TF', reverse: false, version: 60 },
];

// J/P 维度（46-60题）：正向10道，反向5道
const JP_60: LikertQuestion[] = [
  { id: 46, content: "我开始任务前，一定会先列好详细步骤清单", dimension: 'JP', reverse: false, version: 60 },
  { id: 47, content: "我喜欢随兴所至，讨厌被死板的日程束缚", dimension: 'JP', reverse: true, version: 60 },
  { id: 48, content: "房间、桌面整洁有序会让我心情更舒畅", dimension: 'JP', reverse: false, version: 60 },
  { id: 49, content: "截止日前我通常会提前完成，不喜欢临时赶工", dimension: 'JP', reverse: false, version: 60 },
  { id: 50, content: "旅行时我喜欢随性探索，而非严格按攻略执行", dimension: 'JP', reverse: true, version: 60 },
  { id: 51, content: "我习惯为周末或假期提前做具体安排", dimension: 'JP', reverse: false, version: 60 },
  { id: 52, content: "我认为计划赶不上变化，不如灵活应变", dimension: 'JP', reverse: true, version: 60 },
  { id: 53, content: "做决定前我会反复权衡，直到找到最优解", dimension: 'JP', reverse: false, version: 60 },
  { id: 54, content: "我能快速根据当下心情改变原本的决定", dimension: 'JP', reverse: true, version: 60 },
  { id: 55, content: "文件、物品我习惯用完立即归位", dimension: 'JP', reverse: false, version: 60 },
  { id: 56, content: "面对多个选项，我容易犹豫不决", dimension: 'JP', reverse: true, version: 60 },
  { id: 57, content: "我会定期检查并更新自己的长远目标规划", dimension: 'JP', reverse: false, version: 60 },
  { id: 58, content: "周末躺平无计划对我来说是理想休息", dimension: 'JP', reverse: true, version: 60 },
  { id: 59, content: "任务一旦开始我会专注做完，很少中途分心", dimension: 'JP', reverse: false, version: 60 },
  { id: 60, content: "我喜欢保留多种可能性，不急于立刻下结论", dimension: 'JP', reverse: true, version: 60 },
];

// 60题完整题库
export const MBTI60_LIKERT: LikertQuestion[] = [
  ...EI_60,
  ...SN_60,
  ...TF_60,
  ...JP_60,
];

// ==================== 93题专业版（61-93题，额外33题） ====================

// E/I 维度补充（61-63题，3题）
const EI_93_EXTRA: LikertQuestion[] = [
  { id: 61, content: "独处一整天后，我会渴望找人聊天", dimension: 'EI', reverse: false, version: 93 },
  { id: 62, content: "参加多人聚会后，我需要很长时间才能恢复精力", dimension: 'EI', reverse: true, version: 93 },
  { id: 63, content: "我倾向于在社交活动中扮演组织者的角色", dimension: 'EI', reverse: false, version: 93 },
];

// S/N 维度补充（64-66题，3题）
const SN_93_EXTRA: LikertQuestion[] = [
  { id: 64, content: "我相信眼见为实，而非直觉预感", dimension: 'SN', reverse: false, version: 93 },
  { id: 65, content: "我总能快速看到事物背后的整体图景", dimension: 'SN', reverse: true, version: 93 },
  { id: 66, content: "我更关注此时此刻正在发生的事", dimension: 'SN', reverse: false, version: 93 },
];

// T/F 维度补充（67-69题，3题）
const TF_93_EXTRA: LikertQuestion[] = [
  { id: 67, content: "我认为批评应该直接而坦率，而非委婉含蓄", dimension: 'TF', reverse: false, version: 93 },
  { id: 68, content: "我习惯优先考虑每个人的感受，再决定怎么说", dimension: 'TF', reverse: true, version: 93 },
  { id: 69, content: "做决定时，我更多依赖客观数据而非个人价值观", dimension: 'TF', reverse: false, version: 93 },
];

// J/P 维度补充（70-93题，24题）
const JP_93_EXTRA: LikertQuestion[] = [
  { id: 70, content: "我的物品都有固定位置，乱了我就会整理", dimension: 'JP', reverse: false, version: 93 },
  { id: 71, content: "我喜欢让事情保持开放，随时根据情况调整", dimension: 'JP', reverse: true, version: 93 },
  { id: 72, content: "没有明确计划让我感到焦虑不安", dimension: 'JP', reverse: false, version: 93 },
  { id: 73, content: "我认为即兴发挥比精心准备更有趣", dimension: 'JP', reverse: true, version: 93 },
  { id: 74, content: "我会严格按照待办清单逐一完成任务", dimension: 'JP', reverse: false, version: 93 },
  { id: 75, content: "多种选择并存让我感到兴奋而非焦虑", dimension: 'JP', reverse: true, version: 93 },
  { id: 76, content: "项目开始前我会设定清晰的目标和里程碑", dimension: 'JP', reverse: false, version: 93 },
  { id: 77, content: "我享受最后一刻完成任务的刺激感", dimension: 'JP', reverse: true, version: 93 },
  { id: 78, content: "我会定期检查进度，确保按计划推进", dimension: 'JP', reverse: false, version: 93 },
  { id: 79, content: "我更倾向于先行动，边做边调整方向", dimension: 'JP', reverse: true, version: 93 },
  { id: 80, content: "时间表和截止日期帮助我保持高效", dimension: 'JP', reverse: false, version: 93 },
  { id: 81, content: "我喜欢保留选择权，不急于立即承诺", dimension: 'JP', reverse: true, version: 93 },
  { id: 82, content: "我会为长远目标制定详细的执行步骤", dimension: 'JP', reverse: false, version: 93 },
  { id: 83, content: "我觉得严格计划限制了创造性和灵活性", dimension: 'JP', reverse: true, version: 93 },
  { id: 84, content: "我的工作和生活环境通常整洁有序", dimension: 'JP', reverse: false, version: 93 },
  { id: 85, content: "我享受随机应变解决问题的过程", dimension: 'JP', reverse: true, version: 93 },
  { id: 86, content: "我会提前规划以避免最后一刻的混乱", dimension: 'JP', reverse: false, version: 93 },
  { id: 87, content: "改变既定计划对我来说很容易", dimension: 'JP', reverse: true, version: 93 },
  { id: 88, content: "我倾向于在信息充足后再做最终决定", dimension: 'JP', reverse: false, version: 93 },
  { id: 89, content: "我认为过于执着计划会错失意外的好机会", dimension: 'JP', reverse: true, version: 93 },
  { id: 90, content: "我会为重要事件预留充足的准备时间", dimension: 'JP', reverse: false, version: 93 },
  { id: 91, content: "我更喜欢灵活的工作时间而非固定作息", dimension: 'JP', reverse: true, version: 93 },
  { id: 92, content: "完成清单上的任务会给我很大满足感", dimension: 'JP', reverse: false, version: 93 },
  { id: 93, content: "我认为生活应该顺其自然，不必过度规划", dimension: 'JP', reverse: true, version: 93 },
];

// 93题完整题库（60题 + 33题）
export const MBTI93_LIKERT: LikertQuestion[] = [
  ...MBTI60_LIKERT,
  ...EI_93_EXTRA,
  ...SN_93_EXTRA,
  ...TF_93_EXTRA,
  ...JP_93_EXTRA,
];

// 验证93题
console.log(`MBTI93题库验证: ${MBTI93_LIKERT.length}题`);

// ==================== 200题完整版（94-200题，额外107题） ====================

// E/I 维度补充（94-125题，32题）
const EI_200_EXTRA: LikertQuestion[] = [
  { id: 94, content: "电话铃声响起时，我通常乐意接听而不是让它去语音信箱", dimension: 'EI', reverse: false, version: 200 },
  { id: 95, content: "在派对上，我往往会找一个安静的角落和一两个亲密的朋友聊天", dimension: 'EI', reverse: true, version: 200 },
  { id: 96, content: "我喜欢在团队头脑风暴中积极发言，提出我的想法", dimension: 'EI', reverse: false, version: 200 },
  { id: 97, content: "比起外出参加聚会，我更愿意在家看书或看电影", dimension: 'EI', reverse: true, version: 200 },
  { id: 98, content: "我善于在大型社交场合中游刃有余地穿梭交谈", dimension: 'EI', reverse: false, version: 200 },
  { id: 99, content: "即使是和熟人在一起，太多人的聚会也会让我感到疲惫", dimension: 'EI', reverse: true, version: 200 },
  { id: 100, content: "我喜欢主动邀请朋友一起参加活动或聚餐", dimension: 'EI', reverse: false, version: 200 },
  { id: 101, content: "我倾向于在社交活动后需要独处时间来恢复精力", dimension: 'EI', reverse: true, version: 200 },
  { id: 102, content: "在会议上，我通常会积极发言表达自己的观点", dimension: 'EI', reverse: false, version: 200 },
  { id: 103, content: "我喜欢小圈子的深度交流，而不是大型社交聚会", dimension: 'EI', reverse: true, version: 200 },
  { id: 104, content: "我很容易与陌生人展开对话并建立联系", dimension: 'EI', reverse: false, version: 200 },
  { id: 105, content: "我经常需要独处的时间来思考和充电", dimension: 'EI', reverse: true, version: 200 },
  { id: 106, content: "我喜欢成为团队中的活跃分子，带动气氛", dimension: 'EI', reverse: false, version: 200 },
  { id: 107, content: "在社交活动中，我通常是最早想要离开的人", dimension: 'EI', reverse: true, version: 200 },
  { id: 108, content: "我享受与各种不同背景的人交流互动", dimension: 'EI', reverse: false, version: 200 },
  { id: 109, content: "我更喜欢通过文字交流而不是面对面交谈", dimension: 'EI', reverse: true, version: 200 },
  { id: 110, content: "我喜欢在工作间隙与同事闲聊交流", dimension: 'EI', reverse: false, version: 200 },
  { id: 111, content: "我发现长时间的社交互动会消耗我的能量", dimension: 'EI', reverse: true, version: 200 },
  { id: 112, content: "我在群体活动中往往表现得比较活跃和外向", dimension: 'EI', reverse: false, version: 200 },
  { id: 113, content: "我倾向于避免成为众人关注的焦点", dimension: 'EI', reverse: true, version: 200 },
  { id: 114, content: "我喜欢组织社交活动并邀请朋友参加", dimension: 'EI', reverse: false, version: 200 },
  { id: 115, content: "在社交场合，我通常更喜欢倾听而不是说话", dimension: 'EI', reverse: true, version: 200 },
  { id: 116, content: "我乐于认识新朋友并扩展我的社交圈", dimension: 'EI', reverse: false, version: 200 },
  { id: 117, content: "我觉得独处比与他人相处更让我放松", dimension: 'EI', reverse: true, version: 200 },
  { id: 118, content: "我喜欢在工作环境中与他人密切合作", dimension: 'EI', reverse: false, version: 200 },
  { id: 119, content: "我倾向于在重要发言前仔细准备讲稿", dimension: 'EI', reverse: true, version: 200 },
  { id: 120, content: "我喜欢参加社交活动来放松和娱乐", dimension: 'EI', reverse: false, version: 200 },
  { id: 121, content: "我在新环境中通常会先观察一段时间再融入", dimension: 'EI', reverse: true, version: 200 },
  { id: 122, content: "我善于在社交场合中建立人脉关系", dimension: 'EI', reverse: false, version: 200 },
  { id: 123, content: "我更喜欢一对一的深度对话而不是群体交流", dimension: 'EI', reverse: true, version: 200 },
  { id: 124, content: "我喜欢在团队中分享我的想法和经验", dimension: 'EI', reverse: false, version: 200 },
  { id: 125, content: "我通常需要独处时间来处理我的想法和感受", dimension: 'EI', reverse: true, version: 200 },
];

// S/N 维度补充（126-157题，32题）
const SN_200_EXTRA: LikertQuestion[] = [
  { id: 126, content: "我关注当下的细节，而不是未来的可能性", dimension: 'SN', reverse: false, version: 200 },
  { id: 127, content: "我倾向于通过直觉来感知事物的潜在含义", dimension: 'SN', reverse: true, version: 200 },
  { id: 128, content: "我喜欢处理具体的数据和可测量的事实", dimension: 'SN', reverse: false, version: 200 },
  { id: 129, content: "我常常能预见事物的发展趋势和可能性", dimension: 'SN', reverse: true, version: 200 },
  { id: 130, content: "我更相信通过实际经验获得的知识", dimension: 'SN', reverse: false, version: 200 },
  { id: 131, content: "我喜欢探索新的想法和创新的解决方案", dimension: 'SN', reverse: true, version: 200 },
  { id: 132, content: "我注重任务的实际执行和具体步骤", dimension: 'SN', reverse: false, version: 200 },
  { id: 133, content: "我善于发现不同事物之间的联系和模式", dimension: 'SN', reverse: true, version: 200 },
  { id: 134, content: "我更喜欢学习有明确答案和实际应用的知识", dimension: 'SN', reverse: false, version: 200 },
  { id: 135, content: "我经常思考事物的深层含义和象征意义", dimension: 'SN', reverse: true, version: 200 },
  { id: 136, content: "我倾向于关注眼前的问题而不是长远的规划", dimension: 'SN', reverse: false, version: 200 },
  { id: 137, content: "我喜欢头脑风暴和开放式的问题讨论", dimension: 'SN', reverse: true, version: 200 },
  { id: 138, content: "我更信任经过验证的传统方法和程序", dimension: 'SN', reverse: false, version: 200 },
  { id: 139, content: "我常常能够想象出事物可能的发展方向", dimension: 'SN', reverse: true, version: 200 },
  { id: 140, content: "我喜欢处理需要精确和细致注意的任务", dimension: 'SN', reverse: false, version: 200 },
  { id: 141, content: "我对探索未知的领域和概念充满好奇", dimension: 'SN', reverse: true, version: 200 },
  { id: 142, content: "我更喜欢实用和直接的信息", dimension: 'SN', reverse: false, version: 200 },
  { id: 143, content: "我常常从独特的角度看待问题", dimension: 'SN', reverse: true, version: 200 },
  { id: 144, content: "我注重完成任务的实际步骤和细节", dimension: 'SN', reverse: false, version: 200 },
  { id: 145, content: "我喜欢思考抽象的理论和概念", dimension: 'SN', reverse: true, version: 200 },
  { id: 146, content: "我更关注事物的现状而非潜力", dimension: 'SN', reverse: false, version: 200 },
  { id: 147, content: "我善于提出创新的想法和新的视角", dimension: 'SN', reverse: true, version: 200 },
  { id: 148, content: "我更喜欢处理具体的、有形的事物", dimension: 'SN', reverse: false, version: 200 },
  { id: 149, content: "我常常思考事物的可能性和潜在机会", dimension: 'SN', reverse: true, version: 200 },
  { id: 150, content: "我倾向于使用已知的、可靠的方法解决问题", dimension: 'SN', reverse: false, version: 200 },
  { id: 151, content: "我喜欢探索新的可能性和不同的做事方式", dimension: 'SN', reverse: true, version: 200 },
  { id: 152, content: "我更关注实际的结果而非理论上的可能性", dimension: 'SN', reverse: false, version: 200 },
  { id: 153, content: "我常常能够看到别人看不到的联系和模式", dimension: 'SN', reverse: true, version: 200 },
  { id: 154, content: "我喜欢基于事实和数据做决定", dimension: 'SN', reverse: false, version: 200 },
  { id: 155, content: "我倾向于思考未来的可能性和愿景", dimension: 'SN', reverse: true, version: 200 },
  { id: 156, content: "我更信任通过五官感知到的具体信息", dimension: 'SN', reverse: false, version: 200 },
  { id: 157, content: "我喜欢探索事物背后的意义和可能性", dimension: 'SN', reverse: true, version: 200 },
];

// T/F 维度补充（158-189题，32题）
const TF_200_EXTRA: LikertQuestion[] = [
  { id: 158, content: "我做决定时优先考虑逻辑和客观分析", dimension: 'TF', reverse: false, version: 200 },
  { id: 159, content: "我在做决策时会考虑对他人的情感影响", dimension: 'TF', reverse: true, version: 200 },
  { id: 160, content: "我认为公平比和谐更重要", dimension: 'TF', reverse: false, version: 200 },
  { id: 161, content: "我倾向于根据我的价值观和感受做决定", dimension: 'TF', reverse: true, version: 200 },
  { id: 162, content: "我重视批评的诚实性胜过委婉的表达", dimension: 'TF', reverse: false, version: 200 },
  { id: 163, content: "我会为了维护人际关系而避免冲突", dimension: 'TF', reverse: true, version: 200 },
  { id: 164, content: "我相信真理应该基于事实和证据", dimension: 'TF', reverse: false, version: 200 },
  { id: 165, content: "我在决策时会优先考虑团队的和谐", dimension: 'TF', reverse: true, version: 200 },
  { id: 166, content: "我认为情感不应该影响理性的判断", dimension: 'TF', reverse: false, version: 200 },
  { id: 167, content: "我善于理解和共情他人的感受", dimension: 'TF', reverse: true, version: 200 },
  { id: 168, content: "我倾向于用逻辑分析来解决问题", dimension: 'TF', reverse: false, version: 200 },
  { id: 169, content: "我在做选择时会考虑对他人情感的影响", dimension: 'TF', reverse: true, version: 200 },
  { id: 170, content: "我认为客观标准比个人感受更重要", dimension: 'TF', reverse: false, version: 200 },
  { id: 171, content: "我倾向于根据我的内心感受做决定", dimension: 'TF', reverse: true, version: 200 },
  { id: 172, content: "我重视直接指出问题而不是回避", dimension: 'TF', reverse: false, version: 200 },
  { id: 173, content: "我会为了不让别人难过而隐瞒真相", dimension: 'TF', reverse: true, version: 200 },
  { id: 174, content: "我相信决策应该基于理性的分析", dimension: 'TF', reverse: false, version: 200 },
  { id: 175, content: "我善于察觉他人的情绪和需求", dimension: 'TF', reverse: true, version: 200 },
  { id: 176, content: "我认为效率比照顾情感更重要", dimension: 'TF', reverse: false, version: 200 },
  { id: 177, content: "我在团队中优先考虑人际和谐", dimension: 'TF', reverse: true, version: 200 },
  { id: 178, content: "我倾向于用客观标准评价他人", dimension: 'TF', reverse: false, version: 200 },
  { id: 179, content: "我会因为关心他人感受而改变自己的决定", dimension: 'TF', reverse: true, version: 200 },
  { id: 180, content: "我认为真理是客观存在而非主观感受", dimension: 'TF', reverse: false, version: 200 },
  { id: 181, content: "我在冲突中更倾向于寻求和解", dimension: 'TF', reverse: true, version: 200 },
  { id: 182, content: "我重视逻辑的一致性胜过情感的和谐", dimension: 'TF', reverse: false, version: 200 },
  { id: 183, content: "我善于建立和维持良好的人际关系", dimension: 'TF', reverse: true, version: 200 },
  { id: 184, content: "我认为批评应该基于事实而非个人喜好", dimension: 'TF', reverse: false, version: 200 },
  { id: 185, content: "我会为了团队和谐而妥协自己的立场", dimension: 'TF', reverse: true, version: 200 },
  { id: 186, content: "我相信理性思考胜过情感冲动", dimension: 'TF', reverse: false, version: 200 },
  { id: 187, content: "我在决策时会考虑每个人的感受", dimension: 'TF', reverse: true, version: 200 },
  { id: 188, content: "我认为公正比仁慈更重要", dimension: 'TF', reverse: false, version: 200 },
  { id: 189, content: "我倾向于根据情感价值观做选择", dimension: 'TF', reverse: true, version: 200 },
];

// J/P 维度补充（190-200题，11题）
const JP_200_EXTRA: LikertQuestion[] = [
  { id: 190, content: "我喜欢在开始项目前就制定详细的计划", dimension: 'JP', reverse: false, version: 200 },
  { id: 191, content: "我倾向于根据当时的情况灵活调整计划", dimension: 'JP', reverse: true, version: 200 },
  { id: 192, content: "我认为按时完成任务比完美更重要", dimension: 'JP', reverse: false, version: 200 },
  { id: 193, content: "我喜欢保持选择的开放性，不急于决定", dimension: 'JP', reverse: true, version: 200 },
  { id: 194, content: "我倾向于提前完成工作以避免临时抱佛脚", dimension: 'JP', reverse: false, version: 200 },
  { id: 195, content: "我认为过度规划会限制创造力和机会", dimension: 'JP', reverse: true, version: 200 },
  { id: 196, content: "我喜欢按照既定的时间表和流程工作", dimension: 'JP', reverse: false, version: 200 },
  { id: 197, content: "我倾向于在最后一刻做出决定", dimension: 'JP', reverse: true, version: 200 },
  { id: 198, content: "我认为完成任务比享受过程更重要", dimension: 'JP', reverse: false, version: 200 },
  { id: 199, content: "我喜欢随兴而为，不做过多的预先规划", dimension: 'JP', reverse: true, version: 200 },
  { id: 200, content: "我倾向于在开始前就明确目标和步骤", dimension: 'JP', reverse: false, version: 200 },
];

// 200题完整题库（93题 + 107题）
export const MBTI200_LIKERT: LikertQuestion[] = [
  ...MBTI93_LIKERT,
  ...EI_200_EXTRA,
  ...SN_200_EXTRA,
  ...TF_200_EXTRA,
  ...JP_200_EXTRA,
];

// 验证200题
console.log(`MBTI200题库验证: ${MBTI200_LIKERT.length}题`);

// 版本配置
export const versionConfigs: Record<string, { name: string; count: number; questions: LikertQuestion[] }> = {
  MBTI60: {
    name: '基础版',
    count: 60,
    questions: MBTI60_LIKERT,
  },
  MBTI93: {
    name: '专业版',
    count: 93,
    questions: MBTI93_LIKERT,
  },
  MBTI200: {
    name: '完整版',
    count: 200,
    questions: MBTI200_LIKERT,
  },
};
