"use client";
import { useState } from "react";
import LoggedOutHeader from "../components/LoggedOutHeader";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/password-reset/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      setSent(true);
    } else {
      const data = await res.json();
      setError(data.error || "Error");
    }
  };

  return (
    <>
      <LoggedOutHeader />
      <div className="p-8 max-w-md mx-auto">
        {sent ? (
          <p>Check your email for a password reset link.</p>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-3">
            <h1 className="text-2xl mb-6 text-center font-bold">Reset Password</h1>
            <input
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="bg-purple-700 text-white p-3 rounded-lg font-semibold mt-3" type="submit">
              Send reset link
            </button>
            {error && <p className="text-red-600">{error}</p>}
          </form>
        )}
      </div>
    </>
  );
}
