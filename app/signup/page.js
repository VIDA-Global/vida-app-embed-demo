"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoggedOutHeader from "../components/LoggedOutHeader";

export default function Signup() {
  const [accountName, setAccountName] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
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
        <h1 className="text-2xl mb-4">Sign Up for Alma AI</h1>
        <form onSubmit={submit} className="flex flex-col gap-3">
        <input
          className="border p-2"
          placeholder="Account Name"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-600">{error}</p>}
        <button className="bg-primary text-white p-2" type="submit">
          Sign Up
        </button>
        </form>
      </div>
    </>
  );
}
