"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ClientHome({ user }) {
  const [showInvite, setShowInvite] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitePassword, setInvitePassword] = useState("");
  const [vida, setVida] = useState(null);
  const router = useRouter();

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

  const invite = async () => {
    if (!inviteName || !inviteEmail || !invitePassword) return;
    await fetch("/api/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: inviteName,
        email: inviteEmail,
        password: invitePassword,
      }),
    });
    setInviteName("");
    setInviteEmail("");
    setInvitePassword("");
    setShowInvite(false);
  };

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="text-xl font-bold">Alma AI</div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setShowInvite(true)}
            className="underline"
          >
            Invite
          </button>
          <button onClick={logout} className="underline">
            Log Out
          </button>
          <div className="flex items-center gap-2">
            <div>
          <div>{user.fullName}</div>
          <div>{JSON.stringify(user)}</div>
          </div>
          <Image
          className="rounded-full"
            src="/avatar.png"
            alt="avatar"
            width={32}
            height={32}
          />
          </div>
        </div>
      </header>
      {showInvite && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-4 rounded shadow max-w-md w-full">
            <h2 className="text-xl mb-4">Invite User</h2>
            <div className="flex flex-col gap-3">
              <input
                className="border p-2"
                placeholder="Full Name"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
              />
              <input
                className="border p-2"
                placeholder="Email"
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
              <input
                className="border p-2"
                placeholder="Password"
                type="password"
                value={invitePassword}
                onChange={(e) => setInvitePassword(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowInvite(false)}
                  className="underline"
                >
                  Cancel
                </button>
                <button onClick={invite} className="bg-blue-500 text-white p-2">
                  Invite
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
          src={
            vida?.oneTimeAuthToken
              ? `https://vida.io/app/embed?authToken=${
                  vida.oneTimeAuthToken
                }&email=${encodeURIComponent(user.email)}`
              : "https://vida.io/app/embed"
          }
        />
      )}
    </div>
  );
}
