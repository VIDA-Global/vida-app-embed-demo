import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserFromSession } from "../../lib/auth.js";
import { getAccounts } from "../../lib/db.js";
import ClientHome from "./client-home";

// Authenticated users land on this page. `ClientHome` will fetch a Vida
// one-time auth token and render the embedded Vida UI.

export default async function HomePage() {
  const session = (await cookies()).get("session")?.value;
  const user = await getUserFromSession(session);
  if (!user) {
    redirect("/login");
  }
  const accounts = await getAccounts();
  const account = accounts.find((a) => a.id === user.accountId) || null;
  return <ClientHome user={user} account={account} />;
}
