import { NextResponse } from "next/server";
import { getUsers } from "../../../lib/db.js";
import { getUserFromSession } from "../../../lib/auth.js";

export async function GET(req) {
  const token = req.cookies.get("session")?.value;
  const user = await getUserFromSession(token);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const users = await getUsers();
  const team = users.filter((u) => u.accountId === user.accountId);
  return NextResponse.json({ users: team });
}
