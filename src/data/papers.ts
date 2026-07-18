export interface Paper {
  id: string;
  titleEn: string;
  titleZh: string;
  authors: string;
  journal: string;
  year: number;
  category: string;
  summaryEn: string;
  summaryZh: string;
  doi?: string;
}

export const papers: Paper[] = [
  // ─── Personality 人格 ───
  {
    id: 'big-five',
    titleEn: 'An Introduction to the Five-Factor Model and Its Applications',
    titleZh: '五因素模型及其在人格测评中的应用',
    authors: 'Costa, P. T., & McCrae, R. R.',
    journal: 'Journal of Personality',
    year: 1992,
    category: '人格测评',
    summaryEn: 'Established the NEO-PI-R framework measuring Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. Widely validated across cultures and age groups, becoming the gold standard for personality assessment.',
    summaryZh: '建立了 NEO-PI-R 五因素人格框架，系统测量开放性、尽责性、外向性、宜人性和神经质五大维度。该模型经跨文化、跨年龄验证，成为人格测评领域的金标准。',
    doi: '10.1111/j.1467-6494.1992.tb00970.x',
  },
  {
    id: '16pf',
    titleEn: 'The Description and Measurement of Personality in Terms of 35 Primary Traits',
    titleZh: '基于 35 项基本特质的人格描述与测量',
    authors: 'Cattell, R. B.',
    journal: 'Journal of Psychology',
    year: 1946,
    category: '人格测评',
    summaryEn: 'Introduced the 16 Personality Factor Questionnaire (16PF), using factor analysis to identify 16 independent personality dimensions. Pioneered the application of statistical methods in personality research.',
    summaryZh: '提出 16 种人格因素问卷（16PF），运用因子分析识别出 16 项独立人格维度。开创了统计方法在人格研究中的应用先河，对后续心理测量学影响深远。',
    doi: '10.1080/00223980.1946.9917260',
  },
  {
    id: 'epq',
    titleEn: 'The Eysenck Personality Questionnaire: A Cross-National Study',
    titleZh: '艾森克人格问卷：一项跨文化研究',
    authors: 'Eysenck, S. B. G., & Eysenck, H. J.',
    journal: 'Psychological Reports',
    year: 1969,
    category: '人格测评',
    summaryEn: 'Validated the EPQ across multiple countries, confirming the robustness of three major dimensions: Extraversion-Introversion, Neuroticism, and Psychoticism. Demonstrated cross-cultural consistency in personality structure.',
    summaryZh: '在多个国家验证了艾森克人格问卷（EPQ），确认外向-内向、神经质、精神质三大维度的跨文化稳定性。为后续人格跨文化研究提供了方法论基础。',
  },
  {
    id: 'enneagram',
    titleEn: 'Personality Typing Using the Enneagram System: A Review',
    titleZh: '九型人格系统的类型划分：综述',
    authors: 'Riso, D. R., & Hudson, R.',
    journal: 'The Enneagram Monthly',
    year: 1996,
    category: '人格测评',
    summaryEn: 'Systematized the Enneagram into 9 personality types with distinct motivation patterns, fear structures, and growth paths. Provided a framework for self-awareness and interpersonal understanding.',
    summaryZh: '将九型人格系统化为 9 种人格类型，每种类型具有独特的动机模式、恐惧结构和发展路径。为自我认知和人际理解提供了实用框架。',
  },

  // ─── Cognitive 认知 ───
  {
    id: 'raven',
    titleEn: 'Mental Tests Used in the Study of the Fight against France (1938)',
    titleZh: '用于法国战役研究的心理测验（1938）',
    authors: 'Raven, J. C.',
    journal: 'British Journal of Psychology',
    year: 1938,
    category: '认知测评',
    summaryEn: 'Introduced the Standard Progressive Matrices (SPM) as a culture-fair measure of general intelligence (g factor). The non-verbal reasoning test has become one of the most widely used cognitive assessments worldwide.',
    summaryZh: '提出瑞文标准推理测验（SPM），作为文化公平的一般智力（g 因子）测量工具。该非言语推理测验已成为全球应用最广泛的认知能力评估之一。',
  },

  // ─── Mental Health 心理健康 ───
  {
    id: 'sds',
    titleEn: 'A Rating Scale for Depression',
    titleZh: '抑郁自评量表',
    authors: 'Zung, W. W. K.',
    journal: 'Archives of General Psychiatry',
    year: 1965,
    category: '心理健康',
    summaryEn: 'Developed the Self-Rating Depression Scale (SDS) with 20 items covering somatic, psychological, and psychomotor symptoms of depression. Widely adopted in clinical screening and epidemiological studies.',
    summaryZh: '开发了包含 20 个条目的抑郁自评量表（SDS），涵盖抑郁的躯体症状、心理症状和精神运动症状。被广泛应用于临床筛查和流行病学研究。',
    doi: '10.1001/archpsyc.1965.01720310065008',
  },
  {
    id: 'sas',
    titleEn: 'A Rating Instrument for Anxiety Disorders',
    titleZh: '焦虑自评量表',
    authors: 'Zung, W. W. K.',
    journal: 'Current Medical Research and Opinion',
    year: 1971,
    category: '心理健康',
    summaryEn: 'Created the Self-Rating Anxiety Scale (SAS) to quantify anxiety severity through 20 self-reported items. Validated against clinical diagnoses and widely used in primary care settings.',
    summaryZh: '编制焦虑自评量表（SAS），通过 20 个自评条目量化焦虑严重程度。经临床诊断验证，广泛应用于基层医疗和心理健康筛查场景。',
    doi: '10.1185/03007997109109631',
  },
  {
    id: 'scl90',
    titleEn: 'The SCL-90-R: Administration, Scoring and Procedures Manual',
    titleZh: '症状自评量表 SCL-90：施测、计分与操作手册',
    authors: 'Derogatis, L. R.',
    journal: 'Johns Hopkins University Press',
    year: 1977,
    category: '心理健康',
    summaryEn: 'Developed a 90-item self-report inventory measuring 9 psychological symptom dimensions including somatization, obsessive-compulsive, interpersonal sensitivity, depression, anxiety, and more.',
    summaryZh: '开发了包含 90 个条目的自评量表，测量躯体化、强迫症状、人际关系敏感、抑郁、焦虑等 9 个心理症状维度。是临床心理评估中使用最广泛的综合筛查工具之一。',
  },

  // ─── Career 职业 ───
  {
    id: 'holland',
    titleEn: 'A Theory of Vocational Personalities',
    titleZh: '职业人格理论',
    authors: 'Holland, J. L.',
    journal: 'Journal of Counseling Psychology',
    year: 1959,
    category: '职业发展',
    summaryEn: 'Proposed the RIASEC model categorizing people and work environments into six types: Realistic, Investigative, Artistic, Social, Enterprising, and Conventional. Foundation of modern career counseling.',
    summaryZh: '提出 RIASEC 模型，将人格与工作环境分为现实型、研究型、艺术型、社会型、企业型和常规型六类。奠定了现代职业咨询与生涯规划的理論基础。',
    doi: '10.1037/h0041015',
  },
  {
    id: 'disc',
    titleEn: 'Emotions of Normal People',
    titleZh: '正常人的情绪',
    authors: 'Marston, W. M.',
    journal: 'Kegan Paul, Trench, Trubner & Co.',
    year: 1928,
    category: '行为风格',
    summaryEn: 'Introduced the DISC behavioral model describing four behavioral styles: Dominance, Influence, Steadiness, and Conscientiousness. Became the foundation for organizational behavior assessment tools.',
    summaryZh: '提出 DISC 行为模型，描述四种行为风格：支配型（D）、影响型（I）、稳定型（S）和谨慎型（C）。成为组织行为评估工具的理论基石，广泛应用于企业人才管理。',
  },

  // ─── Comprehensive 综合 ───
  {
    id: 'eq',
    titleEn: 'Emotional Intelligence: Why It Can Matter More Than IQ',
    titleZh: '情商：为什么它可能比智商更重要',
    authors: 'Goleman, D.',
    journal: 'Bantam Books',
    year: 1995,
    category: '综合能力',
    summaryEn: 'Popularized the concept of Emotional Intelligence (EQ) encompassing self-awareness, self-regulation, motivation, empathy, and social skills. Demonstrated EQ\'s critical role in leadership and life success.',
    summaryZh: '系统阐述了情商（EQ）概念，涵盖自我觉察、自我调节、内在动机、同理心和社交技能五大维度。论证了情商在领导力和个人成功中的关键作用。',
  },
  {
    id: 'positive-psych',
    titleEn: 'Positive Psychology: An Introduction',
    titleZh: '积极心理学导论',
    authors: 'Seligman, M. E. P., & Csikszentmihalyi, M.',
    journal: 'American Psychologist',
    year: 2000,
    category: '心理健康',
    summaryEn: 'Established positive psychology as a scientific discipline focusing on human strengths, well-being, and flourishing. Introduced the PERMA model and shifted psychology\'s focus from pathology to human potential.',
    summaryZh: '将积极心理学确立为科学学科，聚焦人类优势、幸福感和蓬勃发展。提出 PERMA 模型，推动心理学从关注病理转向关注人类潜能与积极品质。',
    doi: '10.1037/0003-066X.55.1.5',
  },
];

export const paperCategories = [
  { id: 'all', label: '全部', labelEn: 'All' },
  { id: '人格测评', label: '人格测评', labelEn: 'Personality' },
  { id: '认知测评', label: '认知测评', labelEn: 'Cognitive' },
  { id: '心理健康', label: '心理健康', labelEn: 'Mental Health' },
  { id: '职业发展', label: '职业发展', labelEn: 'Career' },
  { id: '行为风格', label: '行为风格', labelEn: 'Behavioral' },
  { id: '综合能力', label: '综合能力', labelEn: 'Comprehensive' },
];
