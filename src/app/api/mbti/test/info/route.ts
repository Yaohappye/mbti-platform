import { NextRequest, NextResponse } from 'next/server';
import { testVersions } from '@/data/mbti-questions';

// 获取测试信息
export async function GET(request: NextRequest) {
  try {
    // 返回测试版本信息
    const testInfo = {
      id: 1,
      name: 'MBTI人格测试',
      desc: '基于荣格心理类型理论，帮助你了解真实的自己，发现个人优势与发展方向。',
      tips: '请根据您的第一反应选择答案，答案没有对错之分。测试结果仅供参考。',
      count: 60,
      type: 'MBTI',
      extend: testVersions.map(v => ({
        name: v.name,
        type: v.type,
        desc: v.desc
      }))
    };

    return NextResponse.json({
      code: 0,
      message: 'success',
      data: testInfo
    });
  } catch (error) {
    console.error('获取测试信息失败:', error);
    return NextResponse.json({
      code: 500,
      message: '服务器错误'
    }, { status: 500 });
  }
}
