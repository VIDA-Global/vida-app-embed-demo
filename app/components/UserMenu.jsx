"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import InviteModal from "./InviteModal";
import ManageTeamModal from "./ManageTeamModal";

export default function UserMenu({ user, account }) {
  const [open, setOpen] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 focus:outline-none cursor-pointer"
      >
        <div className="text-right">
          <div className="text-sm">{user.fullName}</div>
          {account && (
            <div className="text-xs text-gray-600 -mt-0.5">{account.name}</div>
          )}
        </div>
        <Image
          className="rounded-full grayscale"
          src="/avatar.png"
          alt="avatar"
          width={32}
          height={32}
        />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow overflow-hidden">
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
            onClick={() => {
              setShowManage(true);
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Manage Team
          </button>
          <div className="border-t border-gray-200"></div>
          <button
            onClick={logout}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Log Out
          </button>
        </div>
      )}
      <InviteModal open={showInvite} onClose={() => setShowInvite(false)} />
      <ManageTeamModal
        user={user}
        open={showManage}
        onClose={() => setShowManage(false)}
      />
    </div>
  );
}
