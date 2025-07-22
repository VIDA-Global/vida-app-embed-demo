import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserFromSession } from "../lib/auth.js";

export default async function Index() {
  const session = cookies().get("session")?.value;
  const user = await getUserFromSession(session);
  if (user) {
    redirect("/home");
  } else {
    redirect("/login");
  }
}
