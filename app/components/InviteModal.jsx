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
      <div className="bg-white p-5 rounded-2xl shadow max-w-md w-full">
        <h2 className="text-xl mb-4 font-semibold">Invite User</h2>
        <form
          autoComplete="off"
          className="flex flex-col gap-2"
          onSubmit={e => {
            e.preventDefault();
            invite();
          }}
        >
          <input
            autoFocus
            autoComplete="off"
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
            placeholder="Full Name"
            value={inviteName}
            onChange={(e) => setInviteName(e.target.value)}
          />
          <input
            autoComplete="off"
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
            placeholder="Email"
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />
          <input
            autoComplete="new-password"
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
            placeholder="Password"
            type="password"
            value={invitePassword}
            onChange={(e) => setInvitePassword(e.target.value)}
          />
          <div className="flex justify-end gap-2 mt-3">
            <button type="button" onClick={onClose} className="bg-gray-100 text-gray-500 p-2 px-3 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="bg-purple-700 text-white p-2 px-3 rounded-lg">
              Invite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
