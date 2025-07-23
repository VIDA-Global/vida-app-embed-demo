import { NextResponse } from "next/server";
import { getUsers, getPasswordResets, savePasswordResets, generateId } from "../../../../lib/db.js";
import { sendPasswordResetEmail } from "../../../../lib/email.js";

export async function POST(req) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }
  const users = await getUsers();
  const user = users.find((u) => u.email === email);
  // Always return success to avoid user enumeration
  if (!user) {
    return NextResponse.json({ success: true });
  }
  const resets = await getPasswordResets();
  const id = await generateId("reset");
  resets.push({ id, userId: user.id });
  await savePasswordResets(resets);

  const baseUrl = process.env.RESET_BASE_URL || "http://localhost:3000";
  const resetUrl = `${baseUrl}/reset?token=${id}`;
  try {
    await sendPasswordResetEmail(email, resetUrl);
  } catch (err) {
    console.error("Failed to send password reset email", err);
  }

  return NextResponse.json({ success: true });
}
