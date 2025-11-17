"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
// Use env-based app name (client-visible)
import LoggedOutHeader from "../components/LoggedOutHeader";
import ErrorModal from "../components/ErrorModal";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push("/home");
    } else {
      const data = await res.json();
      setError(data.error || "Error");
    }
  };

  return (
    <>
      <LoggedOutHeader />
      <div className="p-8 max-w-md mx-auto">
        <h1 className="text-2xl mb-6 text-center font-bold">
          Log In to {process.env.NEXT_PUBLIC_APP_NAME || "Alma"}
        </h1>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <input
            className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 autofill:bg-white"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="bg-purple-700 text-white p-3 rounded-lg font-semibold mt-3"
            type="submit"
          >
            Log In
          </button>
          <ErrorModal
            open={!!error}
            onClose={() => setError(null)}
            message={error}
          />
        </form>
      </div>
    </>
  );
}
