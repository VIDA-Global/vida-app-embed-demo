import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserFromSession } from "../../lib/auth.js";
import { getAccounts } from "../../lib/db.js";
import ClientModalDemo from "./client-modalDemo";

// Authenticated users land on this page. `ClientModalDemo` will fetch a Vida
// data to be used for opening the modal.

export default async function ModalDemoPage() {
  const session = (await cookies()).get("session")?.value;
  const user = await getUserFromSession(session);
  if (!user) {
    redirect("/login");
  }
  const accounts = await getAccounts();
  const account = accounts.find((a) => a.id === user.accountId) || null;
  return <ClientModalDemo user={user} account={account} />;
}
