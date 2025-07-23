"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { APP_NAME } from "../../lib/config.js";
import LoggedOutHeader from "../components/LoggedOutHeader";
import ErrorModal from "../components/ErrorModal";

export default function Signup() {
  const [accountName, setAccountName] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accountName, email, fullName, password }),
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
        <h1 className="text-2xl mb-3 text-center font-bold">
          Sign Up for {APP_NAME}
        </h1>
        <h2 className="text-center mb-10">Enter your information below to create an account and get started.</h2>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <input
            className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
            placeholder="Account Name"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
          <input
            className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-purple-700 text-white p-3 rounded-lg font-semibold mt-2"
            type="submit"
          >
            Sign Up
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
