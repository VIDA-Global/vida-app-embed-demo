import { NextResponse } from 'next/server';
import { removeSession } from '../../../lib/auth.js';

export async function POST(req) {
  const token = req.cookies.get('session')?.value;
  if (token) {
    await removeSession(token);
  }
  const res = NextResponse.json({ success: true });
  res.cookies.set('session', '', { path: '/', expires: new Date(0) });
  return res;
}