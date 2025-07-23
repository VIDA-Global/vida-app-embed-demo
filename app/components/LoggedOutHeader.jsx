"use client";
import Image from "next/image";
import Link from "next/link";

export default function LoggedOutHeader() {
  return (
    <header className="flex justify-between items-center px-4 h-16 gap-2">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.png" alt="logo" className="rounded-lg scale-90" width={32} height={32} />
        <span className="text-lg font-bold">AlmaAI</span>
      </Link>
      <div className="flex gap-2 ml-auto">
        <Link
          href="/login"
          className="px-3 py-1.5 rounded-lg border border-gray-300 text-purple-700"
        >
          Log In
        </Link>
        <Link href="/signup" className="px-3 py-1.5 rounded-lg bg-purple-700 text-white font-semibold">
          Sign Up
        </Link>
      </div>
    </header>
  );
}
