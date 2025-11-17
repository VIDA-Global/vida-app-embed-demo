import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ error: "Invites disabled" }, { status: 404 });
}
