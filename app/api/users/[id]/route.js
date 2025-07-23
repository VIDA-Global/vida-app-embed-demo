import { NextResponse } from "next/server";
import { getUsers, saveUsers } from "../../../../lib/db.js";
import { getUserFromSession } from "../../../../lib/auth.js";

export async function DELETE(req, { params }) {
  const token = req.cookies.get("session")?.value;
  const user = await getUserFromSession(token);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = await getUsers();
  const target = users.find((u) => u.id === params.id);
  if (!target) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (target.accountId !== user.accountId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const filtered = users.filter((u) => u.id !== params.id);
  await saveUsers(filtered);
  return NextResponse.json({ success: true });
}
