"use client";
import { useState, useEffect } from "react";
import InviteModal from "./InviteModal";

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
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-4 rounded shadow max-w-md w-full">
        <h2 className="text-xl mb-4">Manage Team</h2>
        {loading ? (
          <p className="mb-4">Loading...</p>
        ) : (
          <ul className="flex flex-col gap-2 mb-4">
            {members.map((m) => (
              <li key={m.id} className="flex justify-between items-center">
                <span>{m.fullName || m.email}</span>
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
        <div className="flex justify-between">
          <button onClick={() => setShowInvite(true)} className="underline">
            Invite
          </button>
          <button onClick={onClose} className="underline">
            Close
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
