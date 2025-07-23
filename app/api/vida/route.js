import { NextResponse } from "next/server";
import { getUserFromSession } from "../../../lib/auth.js";
import { getAccounts } from "../../../lib/db.js";
import { vidaGet, vidaPost } from "../../../lib/vida.js";

// This API route acts as a small proxy layer between the demo application and
// Vida's public API. It is called by the front-end to fetch or create the
// current user's organization in Vida and to obtain a one-time auth token that
// allows embedding the Vida web app without requiring the user to log in.

export async function GET(req) {
  const token = req.cookies.get("session")?.value;
  const user = await getUserFromSession(token);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const vidaToken = process.env.VIDA_API_TOKEN;
  const resellerId = process.env.VIDA_RESELLER_ID;
  // These credentials are loaded from `.env.local` and are required for all
  // requests to Vida. The reseller ID identifies under which reseller account
  // organizations will be created when needed.
  if (!vidaToken || !resellerId) {
    return NextResponse.json(
      { error: "Missing VIDA configuration" },
      { status: 500 }
    );
  }

  try {
    // ---------------------------------------------
    // 1. Fetch account by external ID
    // ---------------------------------------------
    const { res: accountRes, data: accountData } = await vidaGet(
      "getAccountByExternalId",
      { token: vidaToken, externalAccountId: user.accountId }
    );
    console.log("Account fetch response:", accountData);

    let account = accountData?.account;

    // ---------------------------------------------
    // 2. Create organization if account is missing
    // ---------------------------------------------
    if (!accountRes.ok || accountData?.success === false) {
      const accounts = await getAccounts();
      const acc = accounts.find((a) => a.id === user.accountId);
      const orgName = acc ? acc.name : `Account ${user.accountId}`;

      const { res: createRes, data: createData } = await vidaPost(
        "createOrganization",
        { token: vidaToken, targetResellerId: resellerId },
        {
          orgName,
          email: user.email,
          externalAccountId: user.accountId,
          vidaPremium: false
        }
      );
      console.log("Creating organization response:", createData);

      if (!createRes.ok || createData?.success === false) {
        return NextResponse.json(
          { error: createData?.message || "Failed to create organization" },
          { status: createRes.status }
        );
      }

      account = createData.account;
    }

    // ---------------------------------------------
    // 3. Request one-time authentication token
    // ---------------------------------------------
    let oneTimeAuthToken = null;
    try {
      const { res: tokenRes, data: tokenData } = await vidaGet(
        "auth/account/oneTimeAuthToken",
        {
          token: vidaToken,
          email: user.email,
          externalAccountId: user.accountId,
        }
      );
      console.log("One-time auth token response:", tokenRes.status);
      if (tokenRes.ok) {
        oneTimeAuthToken = tokenData?.authToken || null;
      }
    } catch (err) {
      // ignore token errors
    }

    // The front-end receives the Vida organization record along with the
    // temporary auth token. If the token is null the iframe will still load,
    // but the user will need to sign in manually.
    return NextResponse.json({ account, oneTimeAuthToken });
  } catch (err) {
    console.error("VIDA request failed", err);
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
