import { NextResponse } from "next/server";
import {
  getInvites,
  saveInvites,
  generateId,
} from "../../../lib/db.js";
import { getUserFromSession, hashPassword } from "../../../lib/auth.js";
import { sendInviteEmail } from "../../../lib/email.js";

export async function POST(req) {
  const { fullName, email, password } = await req.json();
  if (!fullName || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const token = req.cookies.get("session")?.value;
  const user = await getUserFromSession(token);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const invites = await getInvites();
  const id = await generateId("inv");
  invites.push({
    id,
    accountId: user.accountId,
    email,
    fullName,
    password: hashPassword(password),
  });
  await saveInvites(invites);

  const baseUrl = process.env.INVITE_BASE_URL || "http://localhost:3000";
  const inviteUrl = `${baseUrl}/signup?invite=${id}`;
  try {
    await sendInviteEmail(email, inviteUrl);
  } catch (err) {
    console.error("Failed to send invite email", err);
  }

  return NextResponse.json({ success: true });
}
