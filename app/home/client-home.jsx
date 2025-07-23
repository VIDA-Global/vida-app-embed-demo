"use client";
import { useState, useEffect } from "react";
import UserMenu from "../components/UserMenu";
import Image from "next/image";
import { APP_NAME, VIDA_EMBED_BASE_URL } from "../../lib/config.js";

export default function ClientHome({ user, account }) {
  const [vida, setVida] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/vida");
        if (res.ok) {
          const data = await res.json();
          setVida(data);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex justify-between items-center px-4 h-14 bg-warning gap-2 relative bg-white">
        <Image
          src="/logo.png"
          alt="logo"
          className="rounded-lg scale-90"
          width={32}
          height={32}
        />
        <div className="text-lg font-semibold flex-1">{APP_NAME}</div>

        <UserMenu user={user} account={account} />
        <div className="border-t border-[rgba(0,0,0,0.075)] absolute left-0 right-0 top-14 mt-[px] shadow" />
      </header>
      {loading ? (
        <div className="flex-grow flex items-center justify-center text-gray-600">
          Loading account...
        </div>
      ) : (
        vida?.oneTimeAuthToken && (
          <iframe
            className="flex-grow"
            src={`${VIDA_EMBED_BASE_URL}?authToken=${vida.oneTimeAuthToken}&email=${encodeURIComponent(user.email)}`}
          />
        )
      )}
    </div>
  );
}
