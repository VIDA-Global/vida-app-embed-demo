"use client";
import { useState, useEffect } from "react";
import InviteModal from "./InviteModal";
import Image from "next/image";

export default function ManageTeamModal({ open, onClose, user }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInvite, setShowInvite] = useState(false);

  const loadMembers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      if (res.ok) {
        const data = await res.json();
        setMembers(data.users || []);
      }
    } catch (err) {}
    setLoading(false);
  };

  useEffect(() => {
    if (open) {
      loadMembers();
    }
  }, [open]);

  const removeUser = async (id) => {
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    setMembers((m) => m.filter((u) => u.id !== id));
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white p-5 rounded-2xl shadow max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Manage Team</h2>
          <button onClick={onClose} className="text-gray-700">
            Close
          </button>
        </div>
        {loading ? (
          <p className="mb-4">Loading...</p>
        ) : (
          <ul className="flex flex-col gap-2 mb-4">
            {members.map((m) => (
              <li
                key={m.id}
                className="flex justify-between items-center rounded-lg bg-gray-100 p-3 -mx-2 gap-2"
              >
                <Image
                  className="rounded-full"
                  src="/avatar.png"
                  alt="avatar"
                  width={20}
                  height={20}
                />
                <div className="flex-1">{m.fullName || m.email}</div>
                {m.id !== user.id && (
                  <button
                    onClick={() => removeUser(m.id)}
                    className="text-red-600 underline text-sm"
                  >
                    Remove
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
        <div className="border-t border-gray-200 pb-5 pt-5 mt-8 -mb-5 -mx-5 px-5 bg-gray-50 rounded-bl-2xl rounded-br-2xl">
          <button
            onClick={() => setShowInvite(true)}
            className="text-purple-700"
          >
            Invite
          </button>
        </div>
        <InviteModal
          open={showInvite}
          onClose={() => {
            setShowInvite(false);
            loadMembers();
          }}
        />
      </div>
    </div>
  );
}
