"use client";
import Image from "next/image";
import Link from "next/link";

export default function LoggedOutHeader() {
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-200 gap-2">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.jpg" alt="logo" className="rounded-lg scale-90" width={32} height={32} />
        <span className="text-lg font-semibold">Alma AI</span>
      </Link>
      <div className="flex gap-2 ml-auto">
        <Link
          href="/login"
          className="px-3 py-1 rounded-lg border border-blue-500 text-blue-500"
        >
          Log In
        </Link>
        <Link href="/signup" className="px-3 py-1 rounded-lg bg-blue-500 text-white">
          Sign Up
        </Link>
      </div>
    </header>
  );
}
