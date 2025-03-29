import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();;

  if(!email || !password) {
    return NextResponse.json({ message: 'No Email or Password'}, {status: 400})
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.query(
      'INSERT INTO users (email, password) VALUES ($1, $2)',
      [email, hashedPassword]
    );
    return NextResponse.json({ message: 'User registered' });
  }  catch (err: any) {
    if (err.code === '23505') {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }
  
    console.error('Unexpected error:', err); // log unexpected error for yourself
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
