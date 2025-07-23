"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import InviteModal from "./InviteModal";

export default function UserMenu({ user, account }) {
  const [open, setOpen] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 focus:outline-none"
      >
        <div className="text-left">
          <div>{user.fullName}</div>
          {account && (
            <div className="text-sm text-gray-600">{account.name}</div>
          )}
        </div>
        <Image
          className="rounded-full"
          src="/avatar.png"
          alt="avatar"
          width={32}
          height={32}
        />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow">
          <button
            onClick={() => {
              setShowInvite(true);
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Invite
          </button>
          <button
            onClick={logout}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Log Out
          </button>
        </div>
      )}
      <InviteModal open={showInvite} onClose={() => setShowInvite(false)} />
    </div>
  );
}
