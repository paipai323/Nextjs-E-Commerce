import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret'; // Replace in prod

export function signJWT(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

export function verifyJWT(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
