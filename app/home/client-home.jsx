"use client";
import { useState, useEffect } from "react";
import { APP_NAME, VIDA_EMBED_BASE_URL } from "../../config/constants.js";
import UserMenu from "../components/UserMenu";
import Image from "next/image";

export default function ClientHome({ user, account }) {
  const [vida, setVida] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Vida account information and a one-time authentication token as soon
  // as the component mounts. The token allows the iframe below to log the user
  // into Vida without prompting for credentials.
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
            // The Vida web app is embedded directly in our page. We pass the
            // one-time token and the user's email so the session is created
            // automatically.
            src={`${VIDA_EMBED_BASE_URL}?authToken=${
              vida.oneTimeAuthToken
            }&email=${encodeURIComponent(user.email)}`}
          />
        )
      )}
    </div>
  );
}
