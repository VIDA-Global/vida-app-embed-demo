import { NextResponse } from "next/server";
import { getUserFromSession } from "../../../lib/auth.js";

export async function GET(req) {
  const token = req.cookies.get("session")?.value;
  const user = await getUserFromSession(token);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const vidaToken = process.env.VIDA_API_TOKEN;
  if (!vidaToken) {
    return NextResponse.json({ error: "Missing VIDA token" }, { status: 500 });
  }

  try {
    const url = new URL(
      "https://vida.io/api/v2/getAccountByExternalId"
    );
    url.searchParams.set("token", vidaToken);
    url.searchParams.set("externalAccountId", user.accountId);

    const res = await fetch(url.toString(), { method: "GET" });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch account" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
