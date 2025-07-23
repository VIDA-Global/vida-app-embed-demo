import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserFromSession } from "../lib/auth.js";
import LoggedOutHeader from "./components/LoggedOutHeader";

export default async function Index() {
  const session = (await cookies()).get("session")?.value;
  const user = await getUserFromSession(session);
  if (user) {
    redirect("/home");
  }
  return (
    <>
      <LoggedOutHeader />
      <div className="flex flex-col items-center justify-center mt-20">
        <h1 className="text-4xl font-bold mb-6 text-center">Welcome to Alma AI</h1>
        <a
          href="/signup"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg"
        >
          Get Started
        </a>
      </div>
    </>
  );
}
