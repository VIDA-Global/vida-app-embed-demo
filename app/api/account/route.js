import { NextResponse } from "next/server";
import {
  getAccounts,
  saveAccounts,
  getUsers,
  saveUsers,
  getInvites,
  saveInvites,
  getSessions,
  saveSessions,
} from "../../../lib/db.js";
import { getUserFromSession } from "../../../lib/auth.js";

export async function GET(req) {
  const token = req.cookies.get("session")?.value;
  const user = await getUserFromSession(token);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const accounts = await getAccounts();
  const account = accounts.find((a) => a.id === user.accountId) || null;
  return NextResponse.json({ account });
}

export async function PUT(req) {
  const token = req.cookies.get("session")?.value;
  const user = await getUserFromSession(token);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { name } = await req.json();
  if (!name) {
    return NextResponse.json({ error: "Missing name" }, { status: 400 });
  }
  const accounts = await getAccounts();
  const account = accounts.find((a) => a.id === user.accountId);
  if (!account) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  account.name = name;
  await saveAccounts(accounts);
  return NextResponse.json({ success: true });
}

export async function DELETE(req) {
  const token = req.cookies.get("session")?.value;
  const user = await getUserFromSession(token);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const accountId = user.accountId;
  const accounts = await getAccounts();
  const remainingAccounts = accounts.filter((a) => a.id !== accountId);
  await saveAccounts(remainingAccounts);

  const users = await getUsers();
  const removedUsers = users.filter((u) => u.accountId === accountId);
  const remainingUsers = users.filter((u) => u.accountId !== accountId);
  await saveUsers(remainingUsers);

  const invites = await getInvites();
  const remainingInvites = invites.filter((i) => i.accountId !== accountId);
  if (remainingInvites.length !== invites.length) {
    await saveInvites(remainingInvites);
  }

  const sessions = await getSessions();
  const remainingSessions = sessions.filter(
    (s) => !removedUsers.some((u) => u.id === s.userId)
  );
  await saveSessions(remainingSessions);

  const res = NextResponse.json({ success: true });
  res.cookies.set("session", "", { path: "/", expires: new Date(0) });
  return res;
}
