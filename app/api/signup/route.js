import { NextResponse } from "next/server";
import { getAccounts, saveAccounts, generateId } from "../../../lib/db.js";
import { hashPassword, createSession, createUser } from "../../../lib/auth.js";

export async function POST(req) {
  const { accountName, email, fullName, password } = await req.json();
  if (!accountName || !email || !fullName || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const accounts = await getAccounts();
  const accountId = await generateId("acct");
  accounts.push({ id: accountId, name: accountName });
  await saveAccounts(accounts);

  const userId = await generateId("user");
  const hashed = hashPassword(password);
  await createUser({
    id: userId,
    email,
    password: hashed,
    fullName,
    accountId,
    isAdmin: true,
  });

  const token = await createSession(userId);

  const res = NextResponse.json({ success: true });
  res.cookies.set("session", token, { path: "/" });
  return res;
}
