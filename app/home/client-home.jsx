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
      <header className="flex justify-between items-center p-4 border-b border-gray-200 gap-2">
        <Image
          src="/logo.jpg"
          alt="logo"
          className="rounded-lg scale-90"
          width={32}
          height={32}
        />
        <div className="text-lg font-semibold flex-1">Alma AI</div>

        <UserMenu user={user} account={account} />
      </header>
      {/* {account && (
        <>
          {account.oneTimeAuthToken && (
            <div className="p-4 bg-green-100 text-sm break-all">
              One Time Token: {account.oneTimeAuthToken}
            </div>
          )}
          <pre className="p-4 bg-gray-100 overflow-auto">
            {JSON.stringify(account, null, 2)}
          </pre>
        </>
      )} */}
      {vida?.oneTimeAuthToken && (
        <iframe
          className="flex-grow"
          src={`https://alma.automatedphone.ai/app/embed?authToken=${
            vida.oneTimeAuthToken
          }&email=${encodeURIComponent(user.email)}`}
        />
      )}
    </div>
  );
}
