import { NextResponse } from "next/server";
import { getBusinesses, saveBusinesses, generateId } from "../../../lib/db.js";
import { hashPassword, createSession, createUser } from "../../../lib/auth.js";

export async function POST(req) {
  const { businessName, email, fullName, password } = await req.json();
  if (!businessName || !email || !fullName || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const businesses = await getBusinesses();
  const businessId = await generateId("biz");
  businesses.push({ id: businessId, name: businessName });
  await saveBusinesses(businesses);

  const userId = await generateId("user");
  const hashed = hashPassword(password);
  await createUser({
    id: userId,
    email,
    password: hashed,
    fullName,
    businessId,
    isAdmin: true,
  });

  const token = await createSession(userId);

  const res = NextResponse.json({ success: true });
  res.cookies.set("session", token, { path: "/" });
  return res;
}
