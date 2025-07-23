"use client";
import { useState } from "react";

export default function InviteModal({ open, onClose }) {
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitePassword, setInvitePassword] = useState("");

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
    onClose();
  };

  if (!open) return null;

  return (
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
            <button onClick={onClose} className="underline">
              Cancel
            </button>
            <button onClick={invite} className="bg-blue-500 text-white p-2">
              Invite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
