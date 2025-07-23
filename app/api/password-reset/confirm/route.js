import { NextResponse } from "next/server";
import { getPasswordResets, savePasswordResets, getUsers, saveUsers } from "../../../../../lib/db.js";
import { hashPassword } from "../../../../../lib/auth.js";

export async function POST(req) {
  const { token, password } = await req.json();
  if (!token || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const resets = await getPasswordResets();
  const index = resets.findIndex((r) => r.id === token);
  if (index === -1) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }
  const { userId } = resets[index];
  const users = await getUsers();
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  user.password = hashPassword(password);
  await saveUsers(users);
  resets.splice(index, 1);
  await savePasswordResets(resets);
  return NextResponse.json({ success: true });
}
