import { NextResponse } from "next/server";
import { getInvites, saveInvites, generateId } from "../../../lib/db.js";
import { getUserFromSession, hashPassword } from "../../../lib/auth.js";

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
  invites.push({
    id: await generateId("inv"),
    accountId: user.accountId,
    email,
    password: hashPassword(password),
  });
  await saveInvites(invites);
  return NextResponse.json({ success: true });
}
