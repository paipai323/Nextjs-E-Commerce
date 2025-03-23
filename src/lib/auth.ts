// src/lib/auth.ts
import { verifyJWT } from './jwt';

export async function getUserFromRequest(req: Request): Promise<{ userId: number; email: string } | null> {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split(' ')[1];
  if (!token) return null;

  try {
    const user = await verifyJWT(token);
    return {
      userId: Number(user.userId),
      email: String(user.email),
    };
  } catch (e: any) {
    console.error('JWT verification failed:', e.message);
    return null;
  }
}
