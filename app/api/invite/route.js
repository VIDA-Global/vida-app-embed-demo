import { NextResponse } from 'next/server';
import { getInvites, saveInvites, generateId } from '../../../lib/db.js';
import { getUserFromSession } from '../../../lib/auth.js';

export async function POST(req) {
  const { email } = await req.json();
  const token = req.cookies.get('session')?.value;
  const user = await getUserFromSession(token);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const invites = await getInvites();
  invites.push({ id: await generateId('inv'), businessId: user.businessId, email });
  await saveInvites(invites);
  return NextResponse.json({ success: true });
}