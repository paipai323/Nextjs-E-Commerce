// src/lib/jwt.ts
import { JWTPayload, SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';
const encoder = new TextEncoder();

export async function signJWT(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(encoder.encode(JWT_SECRET));
}

export async function verifyJWT(token: string) {
  const { payload } = await jwtVerify(token, encoder.encode(JWT_SECRET));
  return payload;
}
