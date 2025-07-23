import { NextResponse } from "next/server";
import { getUserFromSession } from "../../../lib/auth.js";
import { getAccounts } from "../../../lib/db.js";
import { vidaGet, vidaPost } from "../../../lib/vida.js";

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

    return NextResponse.json({ account, oneTimeAuthToken });
  } catch (err) {
    console.error("VIDA request failed", err);
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
