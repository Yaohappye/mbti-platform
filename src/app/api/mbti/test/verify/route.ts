import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseAdmin } from '@/lib/server/database';

// 验证测试是否已完成
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const accessKey = searchParams.get('accessKey');
    const testType = searchParams.get('testType') || 'MBTI60';

    if (!accessKey) {
      return NextResponse.json({
        code: 400,
        message: '缺少 accessKey'
      }, { status: 400 });
    }

    const client = getDatabaseAdmin();

    const { data: session, error } = await client
      .from('test_sessions')
      .select('id, status')
      .eq('access_key', accessKey)
      .eq('bank_id', testType)
      .maybeSingle();
    if (error) throw new Error(error.message);

    if (!session) {
      return NextResponse.json({
        code: 0,
        message: 'success',
        data: { completed: false }
      });
    }

    return NextResponse.json({
      code: 0,
      message: 'success',
      data: {
        completed: session.status === 'completed',
        sessionId: session.id
      }
    });
  } catch (error) {
    console.error('验证失败:', error);
    return NextResponse.json({
      code: 500,
      message: '服务器错误'
    }, { status: 500 });
  }
}
