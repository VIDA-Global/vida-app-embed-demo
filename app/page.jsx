import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserFromSession } from "../lib/auth.js";
import LoggedOutHeader from "./components/LoggedOutHeader";
import { APP_NAME, VIDA_TARGET } from "../lib/config.js";

export default async function Index() {
  const session = (await cookies()).get("session")?.value;
  const user = await getUserFromSession(session);
  if (user) {
    redirect("/home");
  }
  return (
    <>
      <LoggedOutHeader />
      <div className="flex flex-col items-start justify-center mt-20 mx-auto w-full max-w-3xl">
        <div className="text-6xl">👋</div>
        <h1 className="text-4xl font-bold mt-12 mb-3 text-left">
          Welcome to {APP_NAME}
        </h1>
        <h2 className="text-base max-w-xl">
          Experience the power of an AI phone agent to save time, boost productivity, and
          enhance customer satisfaction for your business.
        </h2>
        <div className="flex items-center gap-3 mt-8">
        <a
          href="/signup"
          className="bg-purple-700 text-white px-5 py-3 rounded-lg font-semibold text-base"
        >
          Get Started
        </a>
        <button
          href="/signup"
          className="bg-gray-200 text-gray-700 px-5 py-3 rounded-lg font-medium text-base"
          data-vida-button
          data-target={VIDA_TARGET}
          // data-number={demoAccounts[props.id].number}
          data-type="call"
        >
          {/* This button is powered by Vida's embed script. When clicked it will
              initiate a demo phone call using the configured target account. */}
          📞
          Call Demo
        </button>
        </div>
        <div className="flex flex-row items-center gap-10 mt-15 text-left">
          <div>
            <div className="text-3xl text-purple-700 mb-2">✨</div>
            <h3 className="font-semibold text-lg mb-1">24/7 Availability</h3>
            <p>Never miss a customer call, day or night, rain or shine.</p>
          </div>
          <div>
            <div className="text-3xl text-purple-700 mb-2">✨</div>
            <h3 className="font-semibold text-lg mb-1">Accurate Scheduling</h3>
            <p>Enjoy seamless, automated appointment bookings.</p>
          </div>
          <div>
            <div className="text-3xl text-purple-700 mb-2">✨</div>
            <h3 className="font-semibold text-lg mb-1">Performance Tracking</h3>
            <p>Gain real-time insights into your agent’s effectiveness.</p>
          </div>
        </div>
      </div>
    </>
  );
}
