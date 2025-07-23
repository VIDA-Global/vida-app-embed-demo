"use client";
import { useState, useEffect } from "react";
import UserMenu from "../components/UserMenu";
import Image from "next/image";

export default function ClientHome({ user, account }) {
  const [vida, setVida] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/vida");
        if (res.ok) {
          const data = await res.json();
          setVida(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center p-4 gap-2 relatie">
        <Image
          src="/logo.png"
          alt="logo"
          className="rounded-lg scale-90"
          width={32}
          height={32}
        />
        <div className="text-lg font-semibold flex-1">Alma AI</div>

        <UserMenu user={user} account={account} />
        <div className="border-t border-[rgba(0,0,0,0.05)] fixed left-0 right-0 top-16 mt-0.5" />
      </header>
      {vida?.oneTimeAuthToken && (
        <iframe
          className="flex-grow "
          src={`https://ninjoah.ngrok.io/app/embed?authToken=${
            vida.oneTimeAuthToken
          }&email=${encodeURIComponent(user.email)}`}
        />
      )}
    </div>
  );
}
