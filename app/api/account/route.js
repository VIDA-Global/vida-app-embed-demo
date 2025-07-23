import { NextResponse } from "next/server";
import { getUserFromSession } from "../../../lib/auth.js";
import { getAccounts } from "../../../lib/db.js";

export async function GET(req) {
  const token = req.cookies.get("session")?.value;
  const user = await getUserFromSession(token);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const vidaToken = process.env.VIDA_API_TOKEN;
  const resellerId = process.env.VIDA_RESELLER_ID;
  if (!vidaToken || !resellerId) {
    return NextResponse.json(
      { error: "Missing VIDA configuration" },
      { status: 500 }
    );
  }

  try {
    const url = new URL(
      "https://api.vida.dev/api/v2/getAccountByExternalId"
    );
    url.searchParams.set("token", vidaToken);
    url.searchParams.set("externalAccountId", user.accountId);

    // Fetch account by external ID and parse JSON once
    let res = await fetch(url.toString(), { method: "GET" });
    let data = await res.json();
    console.log("Account fetch response:", data);

    // If HTTP error or API-level failure, create organization
    if (!res.ok || data.success === false) {
      const accounts = await getAccounts();
      const acc = accounts.find((a) => a.id === user.accountId);
      const orgName = acc ? acc.name : `Account ${user.accountId}`;

      const createUrl = new URL(
        "https://api.vida.dev/api/v2/createOrganization"
      );
      createUrl.searchParams.set("token", vidaToken);
      createUrl.searchParams.set("targetResellerId", resellerId);

      res = await fetch(createUrl.toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orgName,
          email: user.email,
          externalAccountId: user.accountId,
        }),
      });
      let createData = await res.json();
      console.log("Creating organization response:", createData);

      if (!res.ok || createData.success === false) {
        return NextResponse.json(
          { error: createData.message || "Failed to create organization" },
          { status: res.status }
        );
      }

      data = createData;
    }

    // Fetch one-time authentication token for the user
    const tokenUrl = new URL(
      "https://api.vida.dev/api/v2/auth/account/oneTimeAuthToken"
    );
    tokenUrl.searchParams.set("token", vidaToken);
    tokenUrl.searchParams.set("email", user.email);
    tokenUrl.searchParams.set("externalAccountId", user.accountId);

    let oneTimeAuthToken = null;
    try {
      const tokenRes = await fetch(tokenUrl.toString(), { method: "GET" });
      console.log("One-time auth token response:", tokenRes.status);
      if (tokenRes.ok) {
        const tokenData = await tokenRes.json();
        oneTimeAuthToken = tokenData.authToken || null;
      }
    } catch (err) {
      // ignore token errors
    }

    return NextResponse.json({ account: data, oneTimeAuthToken });
  } catch (err) {
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
