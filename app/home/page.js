import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserFromSession } from "../../lib/auth.js";
import ClientHome from "./client-home";

export default async function HomePage() {
  const session = cookies().get("session")?.value;
  const user = await getUserFromSession(session);
  if (!user) {
    redirect("/login");
  }
  return <ClientHome user={user} />;
}
