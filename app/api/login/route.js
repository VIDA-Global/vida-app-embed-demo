import { NextResponse } from 'next/server';
import { getUsers } from '../../../lib/db.js';
import { verifyPassword, createSession } from '../../../lib/auth.js';

export async function POST(req) {
  const { email, password } = await req.json();
  const users = await getUsers();
  const user = users.find((u) => u.email === email);
  if (!user || !verifyPassword(password, user.password)) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  const token = await createSession(user.id);
  const res = NextResponse.json({ success: true });
  res.cookies.set('session', token, { path: '/' });
  return res;
}