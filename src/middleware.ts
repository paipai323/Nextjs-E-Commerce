// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';

export async function middleware(req: NextRequest) {
  const user = await getUserFromRequest(req);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const headers = new Headers(req.headers);
  headers.set('x-user-id', user.userId.toString());
  headers.set('x-user-email', user.email);

  return NextResponse.next({
    request: {
      headers,
    },
  });
}

export const config = {
  matcher: ['/api/protected/:path*'],
};
