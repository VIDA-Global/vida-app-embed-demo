"use client";
import { useState, useEffect } from "react";
import UserMenu from "../components/UserMenu";

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
      <header className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="text-xl font-bold">Alma AI</div>
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
