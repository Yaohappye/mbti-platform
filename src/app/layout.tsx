import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  applicationName: 'MBTI 企业测评平台',
  title: {
    default: 'MBTI 人格测试',
    template: '%s | MBTI 人格测试',
  },
  description: '专业的 MBTI 人格测试与企业人才测评平台，帮助个人和团队探索性格优势与职业发展方向。',
  keywords: [
    'MBTI',
    '人格测试',
    '性格测试',
    '企业人才测评',
    '团队测评',
    '职业发展',
  ],
  authors: [{ name: 'MBTI 企业测评平台' }],
  creator: 'MBTI 企业测评平台',
  publisher: 'MBTI 企业测评平台',
  openGraph: {
    title: 'MBTI 人格测试',
    description: '专业的 MBTI 人格测试与企业人才测评平台。',
    siteName: 'MBTI 企业测评平台',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <html lang="zh-CN">
      <body className={`antialiased`}>
        {isDev && <Inspector />}
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
