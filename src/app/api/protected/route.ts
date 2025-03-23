// app/api/protected/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const userId = req.headers.get('x-user-id');
    const email = req.headers.get('x-user-email');
  
    return NextResponse.json({
      message: '✅ Authenticated via middleware',
      user: { userId, email },
    });
  }
  