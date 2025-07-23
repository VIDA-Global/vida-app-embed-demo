"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
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
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl mb-4 text-center">Login</h1>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input
          className="border border-gray-300 p-2 rounded-lg"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border border-gray-300 p-2 rounded-lg"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-600">{error}</p>}
        <button className="bg-blue-500 text-white p-2 rounded-lg" type="submit">
          Login
        </button>
      </form>
      <p className="mt-4">
        or{" "}
        <a href="/signup" className="text-blue-500 underline">
          Sign Up
        </a>
      </p>
    </div>
  );
}
