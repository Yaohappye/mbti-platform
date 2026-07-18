// MBTI人格类型配图映射
// 图片来源：用户上传的16personalities风格卡通形象
// 四组颜色：紫色(分析师)、绿色(外交官)、青色(守护者)、黄色(探险家)

export const mbtiImages: Record<string, string> = {
  // Analysts - NT types (Purple theme)
  'INTJ': '/mbti-characters/INTJ.jpg',
  'INTP': '/mbti-characters/INTP.jpg',
  'ENTJ': '/mbti-characters/ENTJ.jpg',
  'ENTP': '/mbti-characters/ENTP.jpg',

  // Diplomats - NF types (Green theme)
  'INFJ': '/mbti-characters/INFJ.jpg',
  'INFP': '/mbti-characters/INFP.jpg',
  'ENFJ': '/mbti-characters/ENFJ.jpg',
  'ENFP': '/mbti-characters/ENFP.jpg',

  // Sentinels - SJ types (Cyan/Blue theme)
  'ISTJ': '/mbti-characters/ISTJ.jpg',
  'ISFJ': '/mbti-characters/ISFJ.jpg',
  'ESTJ': '/mbti-characters/ESTJ.jpg',
  'ESFJ': '/mbti-characters/ESFJ.jpg',

  // Explorers - SP types (Yellow theme)
  'ISTP': '/mbti-characters/ISTP.jpg',
  'ISFP': '/mbti-characters/ISFP.jpg',
  'ESTP': '/mbti-characters/ESTP.jpg',
  'ESFP': '/mbti-characters/ESFP.jpg',
};

// 获取类型图片
export function getMBTIImage(type?: string): string {
  const safeType = (type || 'INTJ').toUpperCase();
  return mbtiImages[safeType] || mbtiImages['INTJ'];
}

// 类型配色方案 (参考16personalities.com)
export const mbtiColors: Record<string, { primary: string; secondary: string; gradient: string }> = {
  // Analysts - NT
  'INTJ': { primary: '#9B59B6', secondary: '#8E44AD', gradient: 'from-purple-500 to-indigo-600' },
  'INTP': { primary: '#9B59B6', secondary: '#8E44AD', gradient: 'from-purple-500 to-indigo-600' },
  'ENTJ': { primary: '#9B59B6', secondary: '#8E44AD', gradient: 'from-purple-500 to-indigo-600' },
  'ENTP': { primary: '#9B59B6', secondary: '#8E44AD', gradient: 'from-purple-500 to-indigo-600' },
  
  // Diplomats - NF
  'INFJ': { primary: '#27AE60', secondary: '#229954', gradient: 'from-emerald-500 to-green-600' },
  'INFP': { primary: '#27AE60', secondary: '#229954', gradient: 'from-emerald-500 to-green-600' },
  'ENFJ': { primary: '#27AE60', secondary: '#229954', gradient: 'from-emerald-500 to-green-600' },
  'ENFP': { primary: '#27AE60', secondary: '#229954', gradient: 'from-emerald-500 to-green-600' },
  
  // Sentinels - SJ
  'ISTJ': { primary: '#3498DB', secondary: '#2980B9', gradient: 'from-blue-500 to-cyan-600' },
  'ISFJ': { primary: '#3498DB', secondary: '#2980B9', gradient: 'from-blue-500 to-cyan-600' },
  'ESTJ': { primary: '#3498DB', secondary: '#2980B9', gradient: 'from-blue-500 to-cyan-600' },
  'ESFJ': { primary: '#3498DB', secondary: '#2980B9', gradient: 'from-blue-500 to-cyan-600' },
  
  // Explorers - SP
  'ISTP': { primary: '#F39C12', secondary: '#E67E22', gradient: 'from-yellow-500 to-orange-600' },
  'ISFP': { primary: '#F39C12', secondary: '#E67E22', gradient: 'from-yellow-500 to-orange-600' },
  'ESTP': { primary: '#F39C12', secondary: '#E67E22', gradient: 'from-yellow-500 to-orange-600' },
  'ESFP': { primary: '#F39C12', secondary: '#E67E22', gradient: 'from-yellow-500 to-orange-600' },
};

// 类型分组
export const mbtiGroups = {
  analysts: ['INTJ', 'INTP', 'ENTJ', 'ENTP'],
  diplomats: ['INFJ', 'INFP', 'ENFJ', 'ENFP'],
  sentinels: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'],
  explorers: ['ISTP', 'ISFP', 'ESTP', 'ESFP'],
};

// 获取类型分组
export function getMBTIGroup(type?: string): 'analysts' | 'diplomats' | 'sentinels' | 'explorers' {
  const upperType = (type || 'INTJ').toUpperCase();
  if (mbtiGroups.analysts.includes(upperType)) return 'analysts';
  if (mbtiGroups.diplomats.includes(upperType)) return 'diplomats';
  if (mbtiGroups.sentinels.includes(upperType)) return 'sentinels';
  return 'explorers';
}

// 获取分组颜色
export function getGroupColor(group: string): { primary: string; gradient: string } {
  const colors = {
    analysts: { primary: '#9B59B6', gradient: 'from-purple-500 to-indigo-600' },
    diplomats: { primary: '#27AE60', gradient: 'from-emerald-500 to-green-600' },
    sentinels: { primary: '#3498DB', gradient: 'from-blue-500 to-cyan-600' },
    explorers: { primary: '#F39C12', gradient: 'from-yellow-500 to-orange-600' },
  };
  return colors[group as keyof typeof colors] || colors.analysts;
}
