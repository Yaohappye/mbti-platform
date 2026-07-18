import { LLMClient, Config } from "coze-coding-dev-sdk";

const types = [
  { type: "ENTJ", name: "指挥官", nameEn: "Commander", category: "analysts", tagline: "大胆、富有想象力的领导者", slogan: "天生的领导者，用果断和魅力引领他人", description: "ENTJ是天生的领导者，他们大胆、果断，善于组织和规划。" },
  { type: "ENTP", name: "辩论家", nameEn: "Debater", category: "analysts", tagline: "聪明好奇的思想者", slogan: "喜欢智力挑战，用创新思维解决问题", description: "ENTP是充满创意的思想家，喜欢智力挑战和辩论。" },
  { type: "INFJ", name: "提倡者", nameEn: "Advocate", category: "diplomats", tagline: "安静而有远见的理想主义者", slogan: "用行动追求理想，致力于让世界更美好", description: "INFJ是理想主义者，他们有强烈的价值观，致力于帮助他人。" },
  { type: "INFP", name: "调停者", nameEn: "Mediator", category: "diplomats", tagline: "诗意的利他主义者", slogan: "温柔而坚定，用创造力表达内心世界", description: "INFP是理想主义的梦想家，富有同理心和创造力。" },
  { type: "ENFJ", name: "主人公", nameEn: "Protagonist", category: "diplomats", tagline: "富有魅力的激励者", slogan: "感染他人追求成长，天生的教育者", description: "ENFJ是热情的领导者，善于激励他人，重视和谐关系。" },
  { type: "ENFP", name: "竞选者", nameEn: "Campaigner", category: "diplomats", tagline: "热情自由的灵魂", slogan: "用热情和创意点亮生活，追求无限可能", description: "ENFP是热情、富有创意的自由灵魂，喜欢探索新可能。" },
  { type: "ISTJ", name: "物流师", nameEn: "Logistician", category: "sentinels", tagline: "务实可靠的组织者", slogan: "用行动维护秩序，值得信赖的执行者", description: "ISTJ是务实、可靠的人，重视传统和秩序。" },
  { type: "ISFJ", name: "守卫者", nameEn: "Defender", category: "sentinels", tagline: "专注温暖的保护者", slogan: "默默奉献，用行动守护所爱之人", description: "ISFJ是温暖、体贴的人，致力于保护和服务他人。" },
  { type: "ESTJ", name: "总经理", nameEn: "Executive", category: "sentinels", tagline: "高效务实的管理者", slogan: "重视传统和秩序，善于管理", description: "ESTJ是务实和高效的管理者，重视秩序和规则。" },
  { type: "ESFJ", name: "执政官", nameEn: "Consul", category: "sentinels", tagline: "热心助人的合作者", slogan: "关注他人需求，营造和谐氛围", description: "ESFJ是热心肠、善于合作的人，关注他人的需求。" },
  { type: "ISTP", name: "鉴赏家", nameEn: "Virtuoso", category: "explorers", tagline: "大胆务实的实验者", slogan: "用技艺探索世界，享受当下体验", description: "ISTP是务实的实验者，喜欢动手解决问题。" },
  { type: "ISFP", name: "探险家", nameEn: "Adventurer", category: "explorers", tagline: "灵活有魅力的艺术家", slogan: "用艺术表达自我，享受当下的美好", description: "ISFP是灵活、有魅力的艺术家，享受当下。" },
  { type: "ESTP", name: "企业家", nameEn: "Entrepreneur", category: "explorers", tagline: "活力四射的实干家", slogan: "把握机会，用行动创造价值", description: "ESTP是活力四射的实干家，善于把握机会。" },
  { type: "ESFP", name: "表演者", nameEn: "Entertainer", category: "explorers", tagline: "自发 energetic 的表演者", slogan: "用热情点亮生活，享受每一刻", description: "ESFP是自发的表演者，喜欢成为关注的焦点。" }
];

const config = new Config();
const client = new LLMClient(config);

async function generateTypeData(typeInfo: typeof types[0]) {
  const prompt = `请为MBTI人格类型 ${typeInfo.type} (${typeInfo.name}/${typeInfo.nameEn}) 生成详细的JSON格式报告数据。

参考INTJ的完整数据结构，为${typeInfo.type}生成包含以下字段的完整数据：
- detailedDescription: 详细描述（3-4段话）
- traitsDetailed: 3个详细特质描述
- cognitiveFunctions: 4个认知功能（Ni/Te/Fi/Se模式，根据${typeInfo.type}调整）
- strengths: 4个优势，每个包含title, desc, details, detailsList(4项), examples(3项)
- strengthsDetailed: 优势总结（一段话）
- weaknesses: 4个劣势，每个包含title, desc, impact, solutions(4项)
- weaknessesDetailed: 劣势总结（一段话）
- relationships: 包含romance, friendship, parenting三个对象
- career: 包含title, desc, suitable(10项), suitableDetails(5项), unsuitable(4项), workStyle, workStyleDetailed, workStyleDetails(6项), workEnvironment, idealEnvironment(6项), leadershipStyle, teamworkStyle
- growth: 包含opportunities(4项), opportunitiesDetailed(3项), actions(4项), detailedAdvice(一段话), longTermGoals(4项)
- stress: 包含triggers(5项), triggersDetailed(3项), signs(5项), signsDetailed(3个阶段), coping(5项), copingDetailed(3项)
- famousPeople: 4位名人，包含name, title, contribution, traits(2项)

必须返回有效的JSON格式，不要包含任何markdown代码块标记。

基础信息：
- 类型: ${typeInfo.type}
- 中文名: ${typeInfo.name}
- 英文名: ${typeInfo.nameEn}
- 类别: ${typeInfo.category}
- 标语: ${typeInfo.tagline}
- 描述: ${typeInfo.description}`;

  try {
    const response = await client.invoke(
      [{ role: "user", content: prompt }],
      { model: "doubao-seed-1-8-251228", temperature: 0.7 }
    );
    return JSON.parse(response.content);
  } catch (error) {
    console.error(`Error generating ${typeInfo.type}:`, error);
    return null;
  }
}

async function main() {
  const results: Record<string, any> = {};
  
  for (const typeInfo of types) {
    console.log(`Generating ${typeInfo.type}...`);
    const data = await generateTypeData(typeInfo);
    if (data) {
      results[typeInfo.type] = {
        type: typeInfo.type,
        name: typeInfo.name,
        nameEn: typeInfo.nameEn,
        category: typeInfo.category,
        categoryEn: typeInfo.category.charAt(0).toUpperCase() + typeInfo.category.slice(1),
        tagline: typeInfo.tagline,
        slogan: typeInfo.slogan,
        description: typeInfo.description,
        ...data,
        image: `/mbti-characters/${typeInfo.type}.jpg`
      };
      console.log(`✓ ${typeInfo.type} completed`);
    }
    // 添加延迟避免API限制
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log("\n" + "=".repeat(50));
  console.log("Generated data:");
  console.log(JSON.stringify(results, null, 2));
}

main();
