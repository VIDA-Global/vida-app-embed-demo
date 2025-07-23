"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import LoggedOutHeader from "../components/LoggedOutHeader";

export default function ResetPassword() {
  const params = useSearchParams();
  const token = params.get("token");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/password-reset/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    if (res.ok) {
      setSuccess(true);
    } else {
      const data = await res.json();
      setError(data.error || "Error");
    }
  };

  return (
    <>
      <LoggedOutHeader />
      <div className="p-8 max-w-md mx-auto">
        {success ? (
          <p>Password updated. You can now <a href="/login" className="text-purple-700 underline">log in</a>.</p>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-3">
            <h1 className="text-2xl mb-6 text-center font-bold">Set New Password</h1>
            <input
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-purple-700 text-white p-3 rounded-lg font-semibold mt-3" type="submit">
              Reset Password
            </button>
            {error && <p className="text-red-600">{error}</p>}
          </form>
        )}
      </div>
    </>
  );
}
