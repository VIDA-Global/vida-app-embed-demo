"use client";
import Image from "next/image";
import Link from "next/link";

export default function LoggedOutHeader() {
  return (
    <header className="flex justify-between items-center p-4 gap-2">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.png" alt="logo" className="rounded-lg scale-90" width={32} height={32} />
        <span className="text-lg font-semibold">Alma AI</span>
      </Link>
      <div className="flex gap-2 ml-auto">
        <Link
          href="/login"
          className="px-3 py-1 rounded-lg border border-gray-300 text-primary"
        >
          Log In
        </Link>
        <Link href="/signup" className="px-3 py-1 rounded-lg bg-primary text-white">
          Sign Up
        </Link>
      </div>
    </header>
  );
}
