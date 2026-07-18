/**
 * MBTI 测试题目多语言内容映射
 * 为了支持国际化，每种语言都需要有对应的题目翻译
 */

import { MBTI200Questions } from './mbti-questions';

export type SupportedLocale = 'zh' | 'en' | 'es' | 'fr' | 'de' | 'ru' | 'ja' | 'ko' | 'pt' | 'ar';

// 简化的翻译辅助函数 - 批量生成多语言内容
function createQuestionTranslations(
  zh: string,
  en: string,
  es: string,
  fr: string,
  de: string,
  ru: string,
  ja: string,
  ko: string,
  pt: string,
  ar: string
): Record<SupportedLocale, string> {
  return { zh, en, es, fr, de, ru, ja, ko, pt, ar };
}

// 题目内容多语言映射 (id -> locale -> content)
export const questionContentMap: Record<number, Record<SupportedLocale, string>> = {
  // EI 维度题目 (1-15)
  1: createQuestionTranslations(
    "在社交聚会中，你通常会主动结识新朋友",
    "At social gatherings, you usually take the initiative to meet new people",
    "En reuniones sociales, sueles tomar la iniciativa de conocer gente nueva",
    "Lors de rassemblements sociaux, vous prenez généralement l'initiative de rencontrer de nouvelles personnes",
    "Bei gesellschaftlichen Zusammenkünften ergreifen Sie normalerweise die Initiative, um neue Leute kennenzulernen",
    "На социальных мероприятиях вы обычно берете на себя инициативу знакомиться с новыми людьми",
    "社交の集まりで、あなたは通常新しい人との出会いを積極的に求めます",
    "사교 모임에서 당신은 보통 새로운 사람들을 만나는 것을 주도합니다",
    "Em encontros sociais, você geralmente toma a iniciativa de conhecer novas pessoas",
    "في التجمعات الاجتماعية، عادة ما تبادر في التعرف على أشخاص جدد"
  ),
  2: createQuestionTranslations(
    "你更喜欢在团队合作中工作，而不是独自完成任务",
    "You prefer working in a team rather than completing tasks alone",
    "Prefieres trabajar en equipo en lugar de completar tareas solo",
    "Vous préférez travailler en équipe plutôt que de terminer les tâches seul",
    "Sie arbeiten lieber im Team als allein Aufgaben zu erledigen",
    "Вы предпочитаете работать в команде, а не выполнять задачи в одиночку",
    "あなたは一人でタスクを完了させるよりも、チームで働くことを好みます",
    "당신은 혼자서 작업을 완료하는 것보다 팀에서 일하는 것을 선호합니다",
    "Você prefere trabalhar em equipe em vez de completar tarefas sozinho",
    "تفضل العمل في فريق بدلاً من إكمال المهام بمفردك"
  ),
  3: createQuestionTranslations(
    "你倾向于先说后想，而不是先想后说",
    "You tend to speak first and think later, rather than think first and speak",
    "Tiendes a hablar primero y pensar después, en lugar de pensar primero y hablar",
    "Vous avez tendance à parler d'abord et réfléchir après, plutôt que de réfléchir d'abord et parler",
    "Sie neigen dazu, zuerst zu sprechen und dann nachzudenken, anstatt zuerst nachzudenken und dann zu sprechen",
    "Вы склонны сначала говорить, а потом думать, а не сначала думать, а потом говорить",
    "あなたは考えてから話すのではなく、話してから考える傾向があります",
    "당신은 먼저 생각하고 말하는 것보다 먼저 말하고 나중에 생각하는 경향이 있습니다",
    "Você tende a falar primeiro e pensar depois, em vez de pensar primeiro e falar",
    "تميل إلى التحدث أولاً والتفكير لاحقاً، بدلاً من التفكير أولاً والتحدث"
  ),
  4: createQuestionTranslations(
    "独处时你会感到精力充沛，而不是疲惫",
    "You feel energized rather than tired when spending time alone",
    "Te sientes con energía en lugar de cansado cuando pasas tiempo a solas",
    "Vous vous sentez énergisé plutôt que fatigué lorsque vous passez du temps seul",
    "Sie fühlen sich energiegeladen und nicht müde, wenn Sie Zeit allein verbringen",
    "Вы чувствуете прилив энергии, а не усталость, когда проводите время в одиночестве",
    "一人で過ごすとき、あなたは疲れるのではなく元気を感じます",
    "혼자 시간을 볼 때 피곤하기보다는 에너지가 넘친다고 느낍니다",
    "Você se sente energizado em vez de cansado quando passa tempo sozinho",
    " تشعر بالنشاط بدلاً من التعب عند قضاء الوقت بمفردك"
  ),
  5: createQuestionTranslations(
    "你喜欢成为众人关注的焦点",
    "You enjoy being the center of attention",
    "Te gusta ser el centro de atención",
    "Vous aimez être le centre d'attention",
    "Sie genießen es, im Mittelpunkt der Aufmerksamkeit zu stehen",
    "Вам нравится быть в центре внимания",
    "あなたは注目の的になることを楽しみます",
    "당신은 주목받는 것을 즐깁니다",
    "Você gosta de ser o centro das atenções",
    "تستمتع بأن تكون محط الأنظار"
  ),
  6: createQuestionTranslations(
    "你更喜欢与朋友面对面交流，而不是通过文字消息",
    "You prefer face-to-face communication with friends rather than texting",
    "Prefieres la comunicación cara a cara con amigos en lugar de mensajes de texto",
    "Vous préférez communiquer face à face avec des amis plutôt que par messages texte",
    "Sie bevorzugen die Kommunikation von Angesicht zu Angesicht mit Freunden gegenüber Textnachrichten",
    "Вы предпочитаете общаться с друзьями лицом к лицу, а не переписываться",
    "あなたはテキストメッセージよりも友人と対面でコミュニケーションを取ることを好みます",
    "당신은 문자 메시지보다 친구들과 대면으로 소통하는 것을 선호합니다",
    "Você prefere comunicação cara a cara com amigos em vez de mensagens de texto",
    "تفضل التواصل وجهاً لوجه مع الأصدقاء بدلاً من الرسائل النصية"
  ),
  7: createQuestionTranslations(
    "你在人群中会感到更加活跃和兴奋",
    "You feel more active and excited when in a crowd",
    "Te sientes más activo y emocionado cuando estás en una multitud",
    "Vous vous sentez plus actif et excité lorsque vous êtes dans une foule",
    "Sie fühlen sich aktiver und aufgeregter, wenn Sie in einer Menschenmenge sind",
    "Вы чувствуете себя более активным и взволнованным, когда находитесь в толпе",
    "あなたは人ごみの中でより活発で興奮した気分になります",
    "당신은 군중 속에서 더 활발하고 흥분된 기분을 느낍니다",
    "Você se sente mais ativo e animado quando está em uma multidão",
    " تشعر بمزيد من النشاط والحماس عندما تكون في حشد من الناس"
  ),
  8: createQuestionTranslations(
    "你更愿意在公共场合表达自己的想法和观点",
    "You are willing to express your thoughts and opinions in public",
    "Estás dispuesto a expresar tus pensamientos y opiniones en público",
    "Vous êtes prêt à exprimer vos pensées et opinions en public",
    "Sie sind bereit, Ihre Gedanken und Meinungen in der Öffentlichkeit auszudrücken",
    "Вы готовы выражать свои мысли и мнения публично",
    "あなたは人前で自分の考えや意見を表現することを進んで行います",
    "당신은 대중 앞에서 자신의 생각과 의견을 표현하는 것을 꺼리지 않습니다",
    "Você está disposto a expressar seus pensamentos e opiniões em público",
    "على استعداد للتعبير عن أفكارك وآرائك في الأماكن العامة"
  ),
  9: createQuestionTranslations(
    "与陌生人交谈对你来说是一件轻松愉快的事情",
    "Talking to strangers is an easy and pleasant thing for you",
    "Hablar con extraños es algo fácil y agradable para ti",
    "Parler à des étrangers est une chose facile et agréable pour vous",
    "Mit Fremden zu sprechen ist für Sie eine einfache und angenehme Sache",
    "Разговор с незнакомцами для вас легкое и приятное занятие",
    "見知らぬ人と話すことは、あなたにとって簡単で楽しいことです",
    "낯선 사람과 대화하는 것은 당신에게 쉽고 즐거운 일입니다",
    "Conversar com estranhos é uma coisa fácil e agradável para você",
    "التحدث إلى الغرباء أمر سهل وممتع بالنسبة لك"
  ),
  10: createQuestionTranslations(
    "你在社交活动后需要时间独处来恢复精力",
    "You need time alone to recharge after social activities",
    "Necesitas tiempo a solas para recargar energía después de actividades sociales",
    "Vous avez besoin de temps seul pour vous recharger après des activités sociales",
    "Sie brauchen Zeit allein, um sich nach sozialen Aktivitäten wieder aufzuladen",
    "Вам нужно время в одиночестве, чтобы восстановить силы после социальной активности",
    "社交活動の後、あなたは精力を回復させるために一人でいる時間が必要です",
    "당신은 사교 활동 후 에너지를 회복하기 위해 혼자만의 시간이 필요합니다",
    "Você precisa de tempo sozinho para recarregar depois de atividades sociais",
    "تحتاج إلى وقت بمفردك لإعادة شحن طاقتك بعد الأنشطة الاجتماعية"
  ),
  11: createQuestionTranslations(
    "你经常主动发起与朋友的互动和联系",
    "You often take the initiative to interact and connect with friends",
    "A menudo tomas la iniciativa de interactuar y conectar con amigos",
    "Vous prenez souvent l'initiative d'interagir et de vous connecter avec des amis",
    "Sie ergreifen oft die Initiative, um mit Freunden zu interagieren und Kontakt aufzunehmen",
    "Вы часто берете на себя инициативу во взаимодействии и общении с друзьями",
    "あなたは頻繁に友人との交流や連絡を積極的に始めます",
    "당신은 종종 친구들과 교류하고 연락하는 것을 주도합니다",
    "Você frequentemente toma a iniciativa de interagir e se conectar com amigos",
    "غالباً ما تبادر بالتفاعل والتواصل مع الأصدقاء"
  ),
  12: createQuestionTranslations(
    "你喜欢同时参与多个社交活动或话题讨论",
    "You enjoy participating in multiple social activities or topic discussions at the same time",
    "Te gusta participar en múltiples actividades sociales o discusiones de temas al mismo tiempo",
    "Vous aimez participer à plusieurs activités sociales ou discussions de sujets en même temps",
    "Sie genießen es, gleichzeitig an mehreren sozialen Aktivitäten oder Themendiskussionen teilzunehmen",
    "Вам нравится участвовать одновременно в нескольких социальных активностях или обсуждениях тем",
    "あなたは同時に複数の社交活動やトピックの議論に参加することを楽しみます",
    "당신은 동시에 여러 사교 활동이나 주제 토론에 참여하는 것을 즐깁니다",
    "Você gosta de participar de várias atividades sociais ou discussões de tópicos ao mesmo tempo",
    "تستمتع بالمشاركة في أنشطة اجتماعية متعددة أو مناقشات مواضيع في نفس الوقت"
  ),
  13: createQuestionTranslations(
    "你更倾向于通过口头表达来理清思路",
    "You prefer to clarify your thoughts through verbal expression",
    "Prefieres aclarar tus pensamientos a través de la expresión verbal",
    "Vous préférez clarifier vos pensées par l'expression verbale",
    "Sie bevorzugen es, Ihre Gedanken durch verbale Ausdrucksweise zu klären",
    "Вы предпочитаете прояснять свои мысли через устное выражение",
    "あなたは口頭で表現することを通じて考えを整理することを好みます",
    "당신은 구두 표현을 통해 생각을 정리하는 것을 선호합니다",
    "Você prefere esclarecer seus pensamentos através da expressão verbal",
    "تفضل توضيح أفكارك من خلال التعبير اللفظي"
  ),
  14: createQuestionTranslations(
    "你更享受即兴的社交活动，而不是提前计划好的聚会",
    "You enjoy spontaneous social activities more than planned gatherings",
    "Disfrutas más las actividades sociales espontáneas que las reuniones planificadas",
    "Vous appréciez plus les activités sociales spontanées que les rassemblements planifiés",
    "Sie genießen spontane soziale Aktivitäten mehr als geplante Zusammenkünfte",
    "Вам больше нравятся спонтанные социальные активности, чем запланированные встречи",
    "あなたは計画された集まりよりも、即兴的な社交活動をより楽しみます",
    "당신은 계획된 모임보다 즉흥적인 사교 활동을 더 즐깁니다",
    "Você gosta mais de atividades sociais espontâneas do que encontros planejados",
    "تستمتع بالأنشطة الاجتماعية العفوية أكثر من التجمعات المخطط لها"
  ),
  15: createQuestionTranslations(
    "你在与他人交流时精力充沛，不知疲倦",
    "You are energetic and never tired when communicating with others",
    "Estás lleno de energía y nunca cansado cuando te comunicas con otros",
    "Vous êtes énergique et jamais fatigué lorsque vous communiquez avec les autres",
    "Sie sind energiegeladen und nie müde, wenn Sie mit anderen kommunizieren",
    "Вы полны энергии и никогда не устаете при общении с другими",
    "あなたは他の人とコミュニケーションを取るとき、元気で疲れ知らずです",
    "당신은 다른 사람들과 소통할 때 에너지가 넘치고 결코 피곤하지 않습니다",
    "Você está cheio de energia e nunca cansado quando se comunica com os outros",
    "أنت نشيط ولا تشعر بالتعب أبدًا عند التواصل مع الآخرين"
  ),
  // SN 维度题目 (16-30)
  16: createQuestionTranslations(
    "你更关注事实和具体的数据，而不是抽象的理论",
    "You focus more on facts and specific data rather than abstract theories",
    "Te enfocas más en hechos y datos específicos en lugar de teorías abstractas",
    "Vous vous concentrez plus sur les faits et les données spécifiques plutôt que sur les théories abstraites",
    "Sie konzentrieren sich mehr auf Fakten und spezifische Daten als auf abstrakte Theorien",
    "Вы больше сосредоточены на фактах и конкретных данных, а не на абстрактных теориях",
    "あなたは抽象的な理論ではなく、事実と具体的なデータに焦点を当てます",
    "당신은 추상적인 이론보다 사실과 구체적인 데이터에 더 집중합니다",
    "Você foca mais em fatos e dados específicos em vez de teorias abstratas",
    "تركز أكثر على الحقائق والبيانات المحددة بدلاً من النظريات المجردة"
  ),
  17: createQuestionTranslations(
    "你更倾向于相信实践经验，而不是直觉判断",
    "You are more inclined to believe in practical experience rather than intuitive judgment",
    "Estás más inclinado a creer en la experiencia práctica en lugar del juicio intuitivo",
    "Vous êtes plus enclin à croire en l'expérience pratique plutôt qu'au jugement intuitif",
    "Sie sind eher geneigt, praktischer Erfahrung zu vertrauen als intuitiver Urteilskraft",
    "Вы склоннее верить практическому опыту, а не интуитивному суждению",
    "あなたは直感的な判断ではなく、実践的な経験を信じる傾向があります",
    "당신은 직관적 판단보다 실제 경험을 더 믿는 경향이 있습니다",
    "Você está mais inclinado a acreditar na experiência prática em vez do julgamento intuitivo",
    "أنت أكثر ميلاً للإيمان بالتجربة العملية بدلاً من الحكم البديهي"
  ),
  18: createQuestionTranslations(
    "你更欣赏具有创新性和可能性的想法，而不是实用的解决方案",
    "You appreciate innovative and possibility-oriented ideas more than practical solutions",
    "Aprecias más las ideas innovadoras orientadas a posibilidades que las soluciones prácticas",
    "Vous appréciez plus les idées innovantes axées sur les possibilités que les solutions pratiques",
    "Sie schätzen innovative und möglichkeitsorientierte Ideen mehr als praktische Lösungen",
    "Вы больше цените инновационные идеи, ориентированные на возможности, чем практические решения",
    "あなたは実用的な解決策よりも、革新的で可能性に満ちたアイデアを高く評価します",
    "당신은 실용적인 해결책보다 혁신적이고 가능성 중심의 아이디어를 더 높이 평가합니다",
    "Você aprecia mais ideias inovadoras orientadas para possibilidades do que soluções práticas",
    "تقدر أكثر الأفكار المبتكرة الموجهة نحو الاحتمالات بدلاً من الحلول العملية"
  ),
  19: createQuestionTranslations(
    "你更注重眼前的实际问题和可实现的目标",
    "You pay more attention to immediate practical problems and achievable goals",
    "Prestas más atención a los problemas prácticos inmediatos y objetivos alcanzables",
    "Vous accordez plus d'attention aux problèmes pratiques immédiats et aux objectifs réalisables",
    "Sie achten mehr auf unmittelbare praktische Probleme und erreichbare Ziele",
    "Вы больше внимания уделяете текущим практическим проблемам и достижимым целям",
    "あなたは目の前の実際的な問題と達成可能な目標により多くの注意を払います",
    "당신은 당면한 실제 문제와 달성 가능한 목표에 더 많은 주의를 기울입니다",
    "Você presta mais atenção aos problemas práticos imediatos e objetivos alcançáveis",
    "تولي المزيد من الاهتمام للمشاكل العملية الفورية والأهداف القابلة للتحقيق"
  ),
  20: createQuestionTranslations(
    "你更喜欢学习具体的、可操作的技能，而不是理论知识",
    "You prefer learning specific, actionable skills rather than theoretical knowledge",
    "Prefieres aprender habilidades específicas y accionables en lugar de conocimientos teóricos",
    "Vous préférez apprendre des compétences spécifiques et actionnables plutôt que des connaissances théoriques",
    "Sie bevorzugen es, spezifische, umsetzbare Fähigkeiten zu erlernen, anstatt theoretisches Wissen",
    "Вы предпочитаете изучать конкретные, практические навыки, а не теоретические знания",
    "あなたは理論的な知識ではなく、具体的で実行可能なスキルを学ぶことを好みます",
    "당신은 이론적 지식보다 구체적이고 실행 가능한 기술을 배우는 것을 선호합니다",
    "Você prefere aprender habilidades específicas e acionáveis em vez de conhecimento teórico",
    "تفضل تعلم المهارات المحددة والقابلة للتنفيذ بدلاً من المعرفة النظرية"
  ),
  21: createQuestionTranslations(
    "你倾向于看到事物的现状，而不是它们可能变成的样子",
    "You tend to see things as they are, rather than what they might become",
    "Tiendes a ver las cosas como son, en lugar de lo que podrían llegar a ser",
    "Vous avez tendance à voir les choses telles qu'elles sont, plutôt que ce qu'elles pourraient devenir",
    "Sie neigen dazu, die Dinge so zu sehen, wie sie sind, und nicht so, wie sie werden könnten",
    "Вы склонны видеть вещи такими, какие они есть, а не такими, какими они могли бы стать",
    "あなたは物事がありうる姿ではなく、現状の姿を見る傾向があります",
    "당신은 사물이 될 수 있는 모습보다는 있는 그대로의 모습을 보는 경향이 있습니다",
    "Você tende a ver as coisas como elas são, em vez do que poderiam se tornar",
    "تميل إلى رؤية الأشياء كما هي، وليس ما يمكن أن تصبح عليه"
  ),
  22: createQuestionTranslations(
    "你更喜欢按部就班地完成任务，而不是探索新的方法",
    "You prefer to complete tasks step by step rather than exploring new methods",
    "Prefieres completar las tareas paso a paso en lugar de explorar nuevos métodos",
    "Vous préférez accomplir les tâches étape par étape plutôt que d'explorer de nouvelles méthodes",
    "Sie bevorzugen es, Aufgaben Schritt für Schritt zu erledigen, anstatt neue Methoden zu erkunden",
    "Вы предпочитаете выполнять задачи шаг за шагом, а не искать новые методы",
    "あなたは新しい方法を模索するよりも、段階的にタスクを完了させることを好みます",
    "당신은 새로운 방법을 탐색하는 것보다 단계적으로 작업을 완료하는 것을 선호합니다",
    "Você prefere completar tarefas passo a passo em vez de explorar novos métodos",
    "تفضل إكمال المهام خطوة بخطوة بدلاً من استكشاف طرق جديدة"
  ),
  23: createQuestionTranslations(
    "你更关注细节和具体信息，而不是整体和全貌",
    "You pay more attention to details and specific information rather than the big picture",
    "Prestas más atención a los detalles y la información específica en lugar de la visión general",
    "Vous accordez plus d'attention aux détails et aux informations spécifiques plutôt que à la vue d'ensemble",
    "Sie achten mehr auf Details und spezifische Informationen als auf das große Ganze",
    "Вы больше внимания уделяете деталям и конкретной информации, чем общей картине",
    "あなたは全体像よりも、詳細と具体的な情報により多くの注意を払います",
    "당신은 큰 그림보다 세부 사항과 구체적인 정보에 더 많은 주의를 기울입니다",
    "Você presta mais atenção aos detalhes e informações específicas em vez da visão geral",
    "تولي المزيد من الاهتمام للتفاصيل والمعلومات المحددة بدلاً من الصورة الكبيرة"
  ),
  24: createQuestionTranslations(
    "你更倾向于相信已证明有效的方法，而不是尝试新事物",
    "You are more inclined to believe in proven methods rather than trying new things",
    "Estás más inclinado a creer en métodos probados en lugar de probar cosas nuevas",
    "Vous êtes plus enclin à croire aux méthodes éprouvées plutôt qu'à essayer de nouvelles choses",
    "Sie sind eher geneigt, bewährten Methoden zu vertrauen, als neue Dinge auszuprobieren",
    "Вы склоннее верить проверенным методам, чем пробовать что-то новое",
    "あなたは新しいことを試すよりも、実証済みの方法を信じる傾向があります",
    "당신은 새로운 것을 시도하는 것보다 검증된 방법을 믿는 경향이 있습니다",
    "Você está mais inclinado a acreditar em métodos comprovados em vez de tentar coisas novas",
    "أنت أكثر ميلاً للإيمان بالطرق المجربة بدلاً من تجربة أشياء جديدة"
  ),
  25: createQuestionTranslations(
    "你更喜欢有明确步骤和流程的工作方式",
    "You prefer a work style with clear steps and processes",
    "Prefieres un estilo de trabajo con pasos y procesos claros",
    "Vous préférez un style de travail avec des étapes et des processus clairs",
    "Sie bevorzugen einen Arbeitsstil mit klaren Schritten und Prozessen",
    "Вы предпочитаете стиль работы с четкими шагами и процессами",
    "あなたは明確なステップとプロセスがある働き方を好みます",
    "당신은 명확한 단계와 프로세스가 있는 작업 스타일을 선호합니다",
    "Você prefere um estilo de trabalho com etapas e processos claros",
    "تفضل أسلوب عمل خطوات وعمليات واضحة"
  ),
  26: createQuestionTranslations(
    "你更注重现实可行的解决方案，而不是理想化的愿景",
    "You focus more on realistic and feasible solutions rather than idealized visions",
    "Te enfocas más en soluciones realistas y factibles en lugar de visiones idealizadas",
    "Vous vous concentrez plus sur des solutions réalistes et réalisables plutôt que sur des visions idéalisées",
    "Sie konzentrieren sich mehr auf realistische und durchführbare Lösungen als auf idealisierte Visionen",
    "Вы больше сосредоточены на реалистичных и выполнимых решениях, чем на идеализированных видениях",
    "あなたは理想化されたビジョンよりも、現実的で実行可能な解決策に焦点を当てます",
    "당신은 이상화된 비전보다 현실적이고 실행 가능한 해결책에 더 집중합니다",
    "Você foca mais em soluções realistas e viáveis em vez de visões idealizadas",
    "تركز أكثر على الحلول الواقعية والقابلة للتنفيذ بدلاً من الرؤى المثالية"
  ),
  27: createQuestionTranslations(
    "你更关注事物的实际用途，而不是它们的美学价值",
    "You pay more attention to the practical use of things rather than their aesthetic value",
    "Prestas más atención al uso práctico de las cosas en lugar de su valor estético",
    "Vous accordez plus d'attention à l'utilisation pratique des choses plutôt qu'à leur valeur esthétique",
    "Sie achten mehr auf den praktischen Nutzen der Dinge als auf ihren ästhetischen Wert",
    "Вы больше внимания уделяете практическому применению вещей, чем их эстетической ценности",
    "あなたは物の美的価値よりも、実用的な用途により多くの注意を払います",
    "당신은 미적 가치보다 사물의 실용적인 용도에 더 많은 주의를 기울입니다",
    "Você presta mais atenção ao uso prático das coisas em vez de seu valor estético",
    "تولي المزيد من الاهتمام للاستخدام العملي للأشياء بدلاً من قيمتها الجمالية"
  ),
  28: createQuestionTranslations(
    "你更喜欢处理具体的事务，而不是抽象的概念",
    "You prefer dealing with concrete matters rather than abstract concepts",
    "Prefieres lidiar con asuntos concretos en lugar de conceptos abstractos",
    "Vous préférez traiter des questions concrètes plutôt que des concepts abstraits",
    "Sie bevorzugen es, sich mit konkreten Angelegenheiten zu beschäftigen, anstatt mit abstrakten Konzepten",
    "Вы предпочитаете иметь дело с конкретными вопросами, а не с абстрактными концепциями",
    "あなたは抽象的な概念ではなく、具体的な事柄を扱うことを好みます",
    "당신은 추상적인 개념보다 구체적인 문제를 다루는 것을 선호합니다",
    "Você prefere lidar com assuntos concretos em vez de conceitos abstratos",
    "تفضل التعامل مع الأمور الملموسة بدلاً من المفاهيم المجردة"
  ),
  29: createQuestionTranslations(
    "你更相信可以通过五官感受的信息，而不是内心的直觉",
    "You believe more in information perceived through the five senses rather than inner intuition",
    "Crees más en la información percibida a través de los cinco sentidos en lugar de la intuición interna",
    "Vous croyez plus en l'information perçue par les cinq sens plutôt qu'à l'intuition intérieure",
    "Sie glauben eher an Informationen, die durch die fünf Sinne wahrgenommen werden, als an innere Intuition",
    "Вы больше верите в информацию, воспринимаемую через пять чувств, а не во внутреннюю интуицию",
    "あなたは内なる直感ではなく、五感で感じ取れる情報をより信じます",
    "당신은 내면의 직관보다 오감으로 인지하는 정보를 더 믿습니다",
    "Você acredita mais em informações percebidas através dos cinco sentidos em vez da intuição interior",
    "تؤمن أكثر بالمعلومات المدركة من خلال الحواس الخمس بدلاً من الحدس الداخلي"
  ),
  30: createQuestionTranslations(
    "你更倾向于描述你实际看到的，而不是猜测的意义",
    "You tend to describe what you actually see rather than guessing the meaning",
    "Tiendes a describir lo que realmente ves en lugar de adivinar el significado",
    "Vous avez tendance à décrire ce que vous voyez réellement plutôt que de deviner la signification",
    "Sie neigen dazu, zu beschreiben, was Sie tatsächlich sehen, anstatt die Bedeutung zu erraten",
    "Вы склонны описывать то, что действительно видите, а не угадывать значение",
    "あなたは意味を推測するよりも、実際に見たものを説明する傾向があります",
    "당신은 의미를 추측하는 것보다 실제로 보는 것을 설명하는 경향이 있습니다",
    "Você tende a descrever o que realmente vê em vez de adivinhar o significado",
    "تميل إلى وصف ما تراه فعلياً بدلاً من تخمين المعنى"
  ),
  // TF 维度题目 (31-45)
  31: createQuestionTranslations(
    "在做决策时，你更注重逻辑和客观分析",
    "When making decisions, you focus more on logic and objective analysis",
    "Al tomar decisiones, te enfocas más en la lógica y el análisis objetivo",
    "Lorsque vous prenez des décisions, vous vous concentrez plus sur la logique et l'analyse objective",
    "Bei Entscheidungen konzentrieren Sie sich mehr auf Logik und objektive Analyse",
    "Принимая решения, вы больше сосредоточены на логике и объективном анализе",
    "意思決定をするとき、あなたは論理と客観的な分析により多くの注意を払います",
    "결정을 내릴 때 당신은 논리와 객관적 분석에 더 집중합니다",
    "Ao tomar decisões, você foca mais na lógica e na análise objetiva",
    "عند اتخاذ القرارات، تركز أكثر على المنطق والتحليل الموضوعي"
  ),
  32: createQuestionTranslations(
    "你认为公平和一致性的原则比人情世故更重要",
    "You believe that principles of fairness and consistency are more important than personal considerations",
    "Crees que los principios de equidad y consistencia son más importantes que las consideraciones personales",
    "Vous croyez que les principes d'équité et de cohérence sont plus importants que les considérations personnelles",
    "Sie glauben, dass Grundsätze von Fairness und Konsistenz wichtiger sind als persönliche Erwägungen",
    "Вы считаете, что принципы справедливости и последовательности важнее личных соображений",
    "あなたは公平性と一貫性の原則が個人的な配慮よりも重要だと考えています",
    "당신은 공정성과 일관성의 원칙이 개인적인 고려사항보다 더 중요하다고 믿습니다",
    "Você acredita que princípios de justiça e consistência são mais importantes do que considerações pessoais",
    "تعتقد أن مبادئ العدالة والاتساق أكثر أهمية من الاعتبارات الشخصية"
  ),
  33: createQuestionTranslations(
    "你更容易被情感诉求所说服，而不是理性论证",
    "You are more easily persuaded by emotional appeals rather than rational arguments",
    "Te persuaden más fácilmente los apelos emocionales en lugar de los argumentos racionales",
    "Vous êtes plus facilement persuadé par des appels émotionnels plutôt que par des arguments rationnels",
    "Sie lassen sich eher durch emotionale Appelle als durch rationale Argumente überzeugen",
    "Вас легче убедить эмоциональными призывами, чем рациональными аргументами",
    "あなたは理性的な議論よりも感情的な訴えに説得されやすいです",
    "당신은 합리적인 주장보다 감정적 호소에 더 쉽게 설득당합니다",
    "Você é mais facilmente persuadido por apelos emocionais em vez de argumentos racionais",
    "أنت أكثر عرضة للإقناع بالمناشدات العاطفية بدلاً من الحجج المنطقية"
  ),
  34: createQuestionTranslations(
    "你更倾向于根据事实和数据做决定，而不是个人情感",
    "You prefer to make decisions based on facts and data rather than personal emotions",
    "Prefieres tomar decisiones basadas en hechos y datos en lugar de emociones personales",
    "Vous préférez prendre des décisions basées sur des faits et des données plutôt que sur des émotions personnelles",
    "Sie bevorzugen es, Entscheidungen auf Basis von Fakten und Daten zu treffen, anstatt auf persönliche Emotionen",
    "Вы предпочитаете принимать решения на основе фактов и данных, а не личных эмоций",
    "あなたは個人的な感情ではなく、事実とデータに基づいて意思決定をすることを好みます",
    "당신은 개인적인 감정보다 사실과 데이터에 기반하여 결정을 내리는 것을 선호합니다",
    "Você prefere tomar decisões baseadas em fatos e dados em vez de emoções pessoais",
    "تفضل اتخاذ القرارات بناءً على الحقائق والبيانات بدلاً من المشاعر الشخصية"
  ),
  35: createQuestionTranslations(
    "你认为批评应该直接指出问题，而不是委婉表达",
    "You believe criticism should directly point out problems rather than being expressed indirectly",
    "Crees que la crítica debería señalar directamente los problemas en lugar de expresarse indirectamente",
    "Vous pensez que la critique devrait pointer directement les problèmes plutôt que d'être exprimée indirectement",
    "Sie glauben, dass Kritik direkt auf Probleme hinweisen sollte, anstatt indirekt ausgedrückt zu werden",
    "Вы считаете, что критика должна прямо указывать на проблемы, а не выражаться завуалированно",
    "あなたは批判は婉曲に表現するよりも、直接問題を指摘すべきだと考えています",
    "당신은 비판은 간접적으로 표현하기보다 문제를 직접 지적해야 한다고 믿습니다",
    "Você acredita que a crítica deve apontar diretamente os problemas em vez de ser expressa indiretamente",
    "تعتقد أن النقد يجب أن يشير مباشرة إلى المشاكل بدلاً من التعبير عنها بشكل غير مباشر"
  ),
  36: createQuestionTranslations(
    "你更关注决策的合理性，而不是它对他人的影响",
    "You pay more attention to the rationality of decisions rather than their impact on others",
    "Prestas más atención a la racionalidad de las decisiones en lugar de su impacto en los demás",
    "Vous accordez plus d'attention à la rationalité des décisions plutôt qu'à leur impact sur les autres",
    "Sie achten mehr auf die Rationalität von Entscheidungen als auf deren Auswirkungen auf andere",
    "Вы больше внимания уделяете обоснованности решений, чем их влиянию на других",
    "あなたは他人への影響よりも、決定の合理性により多くの注意を払います",
    "당신은 다른 사람들에게 미치는 영향보다 결정의 합리성에 더 많은 주의를 기울입니다",
    "Você presta mais atenção à racionalidade das decisões em vez de seu impacto nos outros",
    "تولي المزيد من الاهتمام لعقلانية القرارات بدلاً من تأثيرها على الآخرين"
  ),
  37: createQuestionTranslations(
    "你认为效率和完成任务比维护和谐更重要",
    "You believe efficiency and completing tasks are more important than maintaining harmony",
    "Crees que la eficiencia y completar tareas son más importantes que mantener la armonía",
    "Vous pensez que l'efficacité et l'accomplissement des tâches sont plus importants que le maintien de l'harmonie",
    "Sie glauben, dass Effizienz und das Erledigen von Aufgaben wichtiger sind als die Aufrechterhaltung von Harmonie",
    "Вы считаете, что эффективность и выполнение задач важнее поддержания гармонии",
    "あなたは調和を保つことよりも、効率とタスクの完了が重要だと考えています",
    "당신은 조화를 유지하는 것보다 효율성과 작업 완수가 더 중요하다고 믿습니다",
    "Você acredita que eficiência e completar tarefas são mais importantes do que manter a harmonia",
    "تعتقد أن الكفاءة وإنجاز المهام أكثر أهمية من الحفاظ على الانسجام"
  ),
  38: createQuestionTranslations(
    "你更愿意坦诚表达自己的观点，即使可能会引起不适",
    "You prefer to express your views honestly even if it may cause discomfort",
    "Prefieres expresar tus opiniones honestamente incluso si puede causar incomodidad",
    "Vous préférez exprimer honnêtement vos opinions même si cela peut causer de l'inconfort",
    "Sie bevorzugen es, Ihre Meinungen ehrlich auszudrücken, auch wenn dies Unbehagen verursachen könnte",
    "Вы предпочитаете честно выражать свои взгляды, даже если это может вызвать дискомфорт",
    "あなたは不快を引き起こす可能性があるとしても、正直に自分の意見を表現することを好みます",
    "당신은 불편함을 초래할 수 있더라도 솔직하게 자신의 견해를 표현하는 것을 선호합니다",
    "Você prefere expressar suas opiniões honestamente mesmo que isso possa causar desconforto",
    "تفضل التعبير عن آرائك بصراحة حتى لو كان ذلك قد يسبب إزعاجاً"
  ),
  39: createQuestionTranslations(
    "你做决定时更看重利弊分析，而不是个人价值观",
    "When making decisions, you value pros and cons analysis more than personal values",
    "Al tomar decisiones, valoras más el análisis de pros y contras que los valores personales",
    "Lorsque vous prenez des décisions, vous accordez plus de valeur à l'analyse des avantages et des inconvénients qu'aux valeurs personnelles",
    "Bei Entscheidungen schätzen Sie die Vor- und Nachteilanalyse mehr als persönliche Werte",
    "Принимая решения, вы больше цените анализ плюсов и минусов, чем личные ценности",
    "意思決定をするとき、あなたは個人的な価値観よりも得失分析をより重視します",
    "결정을 내릴 때 당신은 개인적 가치보다 장단점 분석을 더 중요하게 여깁니다",
    "Ao tomar decisões, você valoriza mais a análise de prós e contras do que valores pessoais",
    "عند اتخاذ القرارات، تقدر أكثر تحليل الإيجابيات والسلبيات بدلاً من القيم الشخصية"
  ),
  40: createQuestionTranslations(
    "你认为规则和制度比个人特殊情况更需要遵守",
    "You believe rules and systems need to be followed more than personal special circumstances",
    "Crees que las reglas y sistemas deben seguirse más que las circunstancias especiales personales",
    "Vous croyez que les règles et systèmes doivent être suivis plus que les circonstances personnelles spéciales",
    "Sie glauben, dass Regeln und Systeme mehr befolgt werden müssen als persönliche besondere Umstände",
    "Вы считаете, что правила и системы должны соблюдаться больше, чем личные особые обстоятельства",
    "あなたは個人の特別な状況よりも、ルールと制度を守る必要があると考えています",
    "당신은 개인의 특수한 상황보다 규칙과 제도를 더 잘 지켜야 한다고 믿습니다",
    "Você acredita que regras e sistemas precisam ser seguidos mais do que circunstâncias pessoais especiais",
    "تعتقد أن القواعد والأنظمة يجب اتباعها أكثر من الظروف الشخصية الخاصة"
  ),
  41: createQuestionTranslations(
    "你更注重是非对错，而不是谁对谁错",
    "You pay more attention to right and wrong rather than who is right or wrong",
    "Prestas más atención al bien y al mal en lugar de quién tiene razón o no",
    "Vous accordez plus d'attention au bien et au mal plutôt qu'à qui a raison ou tort",
    "Sie achten mehr auf Richtig und Falsch als darauf, wer Recht hat oder nicht",
    "Вы больше внимания уделяете правоте и неправоте, чем тому, кто прав, а кто нет",
    "あなたは誰が正しいか間違っているかよりも、是非の判断により多くの注意を払います",
    "당신은 누가 옳고 그른지보다 옳고 그름에 더 많은 주의를 기울입니다",
    "Você presta mais atenção ao certo e errado em vez de quem está certo ou errado",
    "تولي المزيد من الاهتمام للصواب والخطأ بدلاً من من على حق ومن على خطأ"
  ),
  42: createQuestionTranslations(
    "你更容易被逻辑严谨的论点说服，而不是情感打动",
    "You are more easily persuaded by logically rigorous arguments rather than emotional appeals",
    "Te persuaden más fácilmente los argumentos lógicamente rigurosos en lugar de los apelos emocionales",
    "Vous êtes plus facilement persuadé par des arguments logiquement rigoureux plutôt que par des appels émotionnels",
    "Sie lassen sich eher durch logisch strenge Argumente als durch emotionale Appelle überzeugen",
    "Вас легче убедить логически строгими аргументами, чем эмоциональными призывами",
    "あなたは感情的な訴えよりも、論理的に厳密な議論に説得されやすいです",
    "당신은 감정적 호소보다 논리적으로 엄격한 주장에 더 쉽게 설득당합니다",
    "Você é mais facilmente persuadido por argumentos logicamente rigorosos em vez de apelos emocionais",
    "أنت أكثر عرضة للإقناع بالحجج المنطقية الصارمة بدلاً من المناشدات العاطفية"
  ),
  43: createQuestionTranslations(
    "你认为解决问题应该优先于理解他人感受",
    "You believe solving problems should take priority over understanding others' feelings",
    "Crees que resolver problemas debería tener prioridad sobre comprender los sentimientos de los demás",
    "Vous pensez que résoudre des problèmes devrait être prioritaire sur la compréhension des sentiments des autres",
    "Sie glauben, dass das Lösen von Problemen Vorrang vor dem Verständnis der Gefühle anderer haben sollte",
    "Вы считаете, что решение проблем должно иметь приоритет над пониманием чувств других",
    "あなたは他人の気持ちを理解することよりも、問題を解決することが優先されるべきだと考えています",
    "당신은 다른 사람의 감정을 이해하는 것보다 문제를 해결하는 것이 우선되어야 한다고 믿습니다",
    "Você acredita que resolver problemas deve ter prioridade sobre entender os sentimentos dos outros",
    "تعتقد أن حل المشاكل يجب أن يأخذ الأولوية على فهم مشاعر الآخرين"
  ),
  44: createQuestionTranslations(
    "你更欣赏技术能力而不是人际沟通能力",
    "You appreciate technical ability more than interpersonal communication skills",
    "Aprecias más la capacidad técnica que las habilidades de comunicación interpersonal",
    "Vous appréciez plus la capacité technique que les compétences en communication interpersonnelle",
    "Sie schätzen technische Fähigkeiten mehr als zwischenmenschliche Kommunikationsfähigkeiten",
    "Вы больше цените технические способности, чем навыки межличностного общения",
    "あなたは対人コミュニケーション能力よりも技術的能力を高く評価します",
    "당신은 대인관계 의사소통 능력보다 기술적 능력을 더 높이 평가합니다",
    "Você aprecia mais a capacidade técnica do que habilidades de comunicação interpessoal",
    "تقدر القدرة التقنية أكثر من مهارات التواصل بين الأشخاص"
  ),
  45: createQuestionTranslations(
    "你认为诚实比照顾他人情绪更重要",
    "You believe honesty is more important than protecting others' feelings",
    "Crees que la honestidad es más importante que cuidar los sentimientos de los demás",
    "Vous pensez que l'honnêteté est plus importante que de protéger les sentiments des autres",
    "Sie glauben, dass Ehrlichkeit wichtiger ist als die Gefühle anderer zu schützen",
    "Вы считаете, что честность важнее, чем защита чувств других",
    "あなたは他人の感情を気遣うことよりも誠実さが重要だと考えています",
    "당신은 다른 사람의 감정을 보호하는 것보다 정직함이 더 중요하다고 믿습니다",
    "Você acredita que a honestidade é mais importante do que proteger os sentimentos dos outros",
    "تعتقد أن الصدق أكثر أهمية من حماية مشاعر الآخرين"
  ),
  // JP 维度题目 (46-60)
  46: createQuestionTranslations(
    "你喜欢提前计划和组织，而不是随机应变",
    "You like to plan and organize in advance rather than improvise",
    "Te gusta planificar y organizar con anticipación en lugar de improvisar",
    "Vous aimez planifier et organiser à l'avance plutôt que d'improviser",
    "Sie möchten lieber im Voraus planen und organisieren, anstatt zu improvisieren",
    "Вам нравится планировать и организовывать заранее, а не импровизировать",
    "あなたは臨機応変に対応するよりも、事前に計画と準備をすることが好きです",
    "당신은 즉흥적으로 대응하는 것보다 미리 계획하고 조직하는 것을 좋아합니다",
    "Você gosta de planejar e organizar com antecedência em vez de improvisar",
    "تحب التخطيط والتنظيم مسبقاً بدلاً من الارتجال"
  ),
  47: createQuestionTranslations(
    "你认为应该尽早完成任务，而不是等到最后一刻",
    "You believe tasks should be completed early rather than waiting until the last minute",
    "Crees que las tareas deberían completarse temprano en lugar de esperar hasta el último minuto",
    "Vous pensez que les tâches devraient être accomplies tôt plutôt que d'attendre jusqu'à la dernière minute",
    "Sie glauben, dass Aufgaben früh erledigt werden sollten, anstatt bis zur letzten Minute zu warten",
    "Вы считаете, что задачи следует выполнять заранее, а не ждать до последней минуты",
    "あなたは締め切りぎりぎりまで待つよりも、できるだけ早くタスクを完了させるべきだと考えています",
    "당신은 마지막 순간까지 기다리는 것보다 일찍 작업을 완료해야 한다고 믿습니다",
    "Você acredita que as tarefas devem ser concluídas cedo em vez de esperar até o último minuto",
    "تعتقد أن المهام يجب إنجازها مبكراً بدلاً من الانتظار حتى اللحظة الأخيرة"
  ),
  48: createQuestionTranslations(
    "你更倾向于按照计划行事，而不是保持灵活性",
    "You prefer to follow a plan rather than maintain flexibility",
    "Prefieres seguir un plan en lugar de mantener la flexibilidad",
    "Vous préférez suivre un plan plutôt que de maintenir la flexibilité",
    "Sie bevorzugen es, einem Plan zu folgen, anstatt Flexibilität zu wahren",
    "Вы предпочитаете следовать плану, а не сохранять гибкость",
    "あなたは柔軟性を保つよりも、計画に従って行動することを好みます",
    "당신은 유연성을 유지하는 것보다 계획을 따르는 것을 선호합니다",
    "Você prefere seguir um plano em vez de manter a flexibilidade",
    "تفضل اتباع خطة بدلاً من الحفاظ على المرونة"
  ),
  49: createQuestionTranslations(
    "你喜欢把所有事情都安排妥当，不喜欢意外和变化",
    "You like to have everything arranged properly and don't like surprises or changes",
    "Te gusta tener todo bien organizado y no te gustan las sorpresas ni los cambios",
    "Vous aimez avoir tout bien organisé et vous n'aimez pas les surprises ni les changements",
    "Sie möchten alles ordentlich arrangiert haben und mögen keine Überraschungen oder Änderungen",
    "Вам нравится, когда всё организовано, и вы не любите сюрпризов или изменений",
    "あなたはすべてを適切に整えておくことが好きで、予期せぬことや変化は好みません",
    "당신은 모든 것을 제대로 정리해 두는 것을 좋아하고 예상치 못한 일이나 변화를 좋아하지 않습니다",
    "Você gosta de ter tudo bem organizado e não gosta de surpresas ou mudanças",
    "تحب أن يكون كل شيء منظماً بشكل صحيح ولا تحب المفاجآت أو التغييرات"
  ),
  50: createQuestionTranslations(
    "你认为做决定是一件需要尽快完成的事情",
    "You believe making decisions is something that needs to be done as soon as possible",
    "Crees que tomar decisiones es algo que debe hacerse lo antes posible",
    "Vous pensez que prendre des décisions est quelque chose qui doit être fait le plus tôt possible",
    "Sie glauben, dass Entscheidungen so schnell wie möglich getroffen werden müssen",
    "Вы считаете, что принятие решений - это то, что нужно сделать как можно скорее",
    "あなたは意思決定はできるだけ早く行う必要があることだと考えています",
    "당신은 결정을 내리는 것은 가능한 한 빨리 해야 할 일이라고 믿습니다",
    "Você acredita que tomar decisões é algo que precisa ser feito o mais rápido possível",
    "تعتقد أن اتخاذ القرارات هو شيء يجب القيام به في أقرب وقت ممكن"
  ),
  51: createQuestionTranslations(
    "你更喜欢有明确截止日期和目标的任务",
    "You prefer tasks with clear deadlines and goals",
    "Prefieres tareas con plazos y objetivos claros",
    "Vous préférez les tâches avec des délais et des objectifs clairs",
    "Sie bevorzugen Aufgaben mit klaren Fristen und Zielen",
    "Вы предпочитаете задачи с четкими сроками и целями",
    "あなたは明確な締め切りと目標があるタスクを好みます",
    "당신은 명확한 마감일과 목표가 있는 작업을 선호합니다",
    "Você prefere tarefas com prazos e objetivos claros",
    "تفضل المهام ذات المواعيد النهائية والأهداف الواضحة"
  ),
  52: createQuestionTranslations(
    "你认为生活中的秩序和可预测性很重要",
    "You believe order and predictability in life are important",
    "Crees que el orden y la previsibilidad en la vida son importantes",
    "Vous pensez que l'ordre et la prévisibilité dans la vie sont importants",
    "Sie glauben, dass Ordnung und Vorhersehbarkeit im Leben wichtig sind",
    "Вы считаете, что порядок и предсказуемость в жизни важны",
    "あなたは人生における秩序と予測可能性が重要だと考えています",
    "당신은 삶에서 질서와 예측 가능성이 중요하다고 믿습니다",
    "Você acredita que ordem e previsibilidade na vida são importantes",
    "تعتقد أن النظام والقابلية للتنبؤ في الحياة مهمان"
  ),
  53: createQuestionTranslations(
    "你更喜欢事先决定穿什么、吃什么，而不是临时决定",
    "You prefer to decide in advance what to wear and eat rather than making spontaneous decisions",
    "Prefieres decidir con anticipación qué vestir y comer en lugar de tomar decisiones espontáneas",
    "Vous préférez décider à l'avance quoi porter et manger plutôt que de prendre des décisions spontanées",
    "Sie bevorzugen es, im Voraus zu entscheiden, was Sie tragen und essen, anstatt spontane Entscheidungen zu treffen",
    "Вы предпочитаете заранее решать, что надеть и что есть, а не принимать спонтанные решения",
    "あなたはその場での決定ではなく、事前に何を着て何を食べるか決めることを好みます",
    "당신은 즉흥적인 결정을 내리는 것보다 미리 무엇을 입고 먹을지 결정하는 것을 선호합니다",
    "Você prefere decidir com antecedência o que vestir e comer em vez de tomar decisões espontâneas",
    "تفضل أن تقرر مسبقاً ما ترتديه وتأكله بدلاً من اتخاذ قرارات آنية"
  ),
  54: createQuestionTranslations(
    "你倾向于把事情写下来记在清单上，而不是记在脑子里",
    "You tend to write things down in lists rather than keeping them in your mind",
    "Tiendes a escribir las cosas en listas en lugar de mantenerlas en tu mente",
    "Vous avez tendance à noter les choses dans des listes plutôt que de les garder en tête",
    "Sie neigen dazu, Dinge in Listen aufzuschreiben, anstatt sie im Kopf zu behalten",
    "Вы склонны записывать вещи в списки, а не держать их в голове",
    "あなたは頭に覚えておくよりも、物事をリストに書き留める傾向があります",
    "당신은 머릿속에 기억하는 것보다 일을 목록에 적어두는 경향이 있습니다",
    "Você tende a anotar as coisas em listas em vez de mantê-las na mente",
    "تميل إلى كتابة الأشياء في قوائم بدلاً من الاحتفاظ بها في ذهنك"
  ),
  55: createQuestionTranslations(
    "你认为按时完成承诺比保持开放的选择更重要",
    "You believe keeping commitments on time is more important than keeping options open",
    "Crees que cumplir los compromisos a tiempo es más importante que mantener las opciones abiertas",
    "Vous pensez que tenir ses engagements à temps est plus important que garder ses options ouvertes",
    "Sie glauben, dass das Einhalten von Zusagen pünktlich wichtiger ist als das Offenhalten von Optionen",
    "Вы считаете, что своевременное выполнение обязательств важнее, чем сохранение открытых вариантов",
    "あなたは選択肢を開いたままにしておくよりも、約束を守ることが重要だと考えています",
    "당신은 선택지를 열어두는 것보다 약속을 제 시간에 지키는 것이 더 중요하다고 믿습니다",
    "Você acredita que cumprir compromissos no prazo é mais importante do que manter as opções abertas",
    "تعتقد أن الالتزام بالمواعيد النهائية أكثر أهمية من إبقاء الخيارات مفتوحة"
  ),
  56: createQuestionTranslations(
    "你更倾向于做完一件事再做另一件，而不是同时处理多件",
    "You prefer to finish one thing before starting another rather than handling multiple things at once",
    "Prefieres terminar una cosa antes de empezar otra en lugar de manejar varias cosas a la vez",
    "Vous préférez finir une chose avant d'en commencer une autre plutôt que de gérer plusieurs choses à la fois",
    "Sie bevorzugen es, eine Sache zu beenden, bevor Sie mit einer anderen beginnen, anstatt mehrere Dinge gleichzeitig zu erledigen",
    "Вы предпочитаете закончить одно дело, прежде чем начать другое, а не делать несколько дел одновременно",
    "あなたは複数のことを同時に処理するよりも、一つのことを終わらせてから次に進むことを好みます",
    "당신은 여러 일을 동시에 처리하는 것보다 한 가지를 끝내고 다음 일을 하는 것을 선호합니다",
    "Você prefere terminar uma coisa antes de começar outra em vez de lidar com várias coisas ao mesmo tempo",
    "تفضل إنهاء شيء واحد قبل البدء في آخر بدلاً من التعامل مع أشياء متعددة في آن واحد"
  ),
  57: createQuestionTranslations(
    "你认为做事有始有终比适应变化更值得赞赏",
    "You believe seeing things through to completion is more admirable than adapting to changes",
    "Crees que llevar las cosas hasta su finalización es más admirable que adaptarse a los cambios",
    "Vous pensez que mener les choses à bien est plus admirable que de s'adapter aux changements",
    "Sie glauben, dass Dinge zu Ende zu bringen bewundernswerter ist als sich an Veränderungen anzupassen",
    "Вы считаете, что доведение дел до конца более достойно восхищения, чем адаптация к изменениям",
    "あなたは変化に適応するよりも、物事を最後までやり遂げることが称賛に値すると考えています",
    "당신은 변화에 적응하는 것보다 일을 끝까지 마무리하는 것이 더 훌륭하다고 믿습니다",
    "Você acredita que levar as coisas até a conclusão é mais admirável do que se adaptar às mudanças",
    "تعتقد أن إنجاز الأمور حتى النهاية أكثر جدارة بالإعجاب من التكيف مع التغييرات"
  ),
  58: createQuestionTranslations(
    "你喜欢让事情尘埃落定，而不是保持开放的可能性",
    "You like to settle matters rather than keeping possibilities open",
    "Te gusta resolver las cosas en lugar de mantener las posibilidades abiertas",
    "Vous aimez régler les affaires plutôt que de garder les possibilités ouvertes",
    "Sie mögen es, Angelegenheiten zu klären, anstatt Möglichkeiten offenzuhalten",
    "Вам нравится решать вопросы, а не держать возможности открытыми",
    "あなたは可能性を開いたままにしておくよりも、物事を決着させることを好みます",
    "당신은 가능성을 열어두는 것보다 일을 해결하는 것을 좋아합니다",
    "Você gosta de resolver questões em vez de manter as possibilidades abertas",
    "تحب تسوية الأمور بدلاً من إبقاء الاحتمالات مفتوحة"
  ),
  59: createQuestionTranslations(
    "你认为按计划执行比随机应变更能体现专业性",
    "You believe executing according to plan demonstrates more professionalism than improvisation",
    "Crees que ejecutar según el plan demuestra más profesionalismo que improvisar",
    "Vous pensez qu'exécuter selon le plan démontre plus de professionnalisme qu'improviser",
    "Sie glauben, dass die Ausführung nach Plan mehr Professionalität zeigt als Improvisation",
    "Вы считаете, что выполнение по плану демонстрирует больше профессионализма, чем импровизация",
    "あなたは臨機応変に対応するよりも、計画通りに実行することが専門性を示すと考えています",
    "당신은 즉흥적으로 대응하는 것보다 계획에 따라 실행하는 것이 더 전문성을 보여준다고 믿습니다",
    "Você acredita que executar de acordo com o plano demonstra mais profissionalismo do que improvisar",
    "تعتقد أن التنفيذ وفقاً للخطة يظهر المزيد من الاحترافية مقارنة بالارتجال"
  ),
  60: createQuestionTranslations(
    "你更倾向于完成既定目标，而不是追求新的可能性",
    "You prefer to complete established goals rather than pursuing new possibilities",
    "Prefieres completar objetivos establecidos en lugar de perseguir nuevas posibilidades",
    "Vous préférez accomplir des objectifs établis plutôt que de poursuivre de nouvelles possibilités",
    "Sie bevorzugen es, festgelegte Ziele zu erreichen, anstatt neue Möglichkeiten zu verfolgen",
    "Вы предпочитаете выполнять поставленные цели, а не искать новые возможности",
    "あなたは新しい可能性を追求するよりも、設定された目標を達成することを好みます",
    "당신은 새로운 가능성을 추구하는 것보다 설정된 목표를 완수하는 것을 선호합니다",
    "Você prefere completar objetivos estabelecidos em vez de perseguir novas possibilidades",
    "تفضل إكمال الأهداف المحددة بدلاً من السعي وراء إمكانيات جديدة"
  ),
};

// 获取指定语言的题目内容，如果没有翻译则返回中文
export function getLocalizedContent(id: number, locale: SupportedLocale): string {
  const contentMap = questionContentMap[id];
  if (contentMap) {
    return contentMap[locale] || contentMap.zh;
  }
  
  // 如果没有找到翻译，从原始题目数据中获取中文内容
  const question = MBTI200Questions.find(q => q.id === id);
  if (question) {
    return question.content;
  }
  
  // 如果都找不到，返回简单的占位符
  return `题目 ${id}`;
}

// 支持的语言列表
export const supportedLocales: SupportedLocale[] = ['zh', 'en', 'es', 'fr', 'de', 'ru', 'ja', 'ko', 'pt', 'ar'];
