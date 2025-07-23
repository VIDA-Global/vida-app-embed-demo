"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AccountModal({ open, onClose, account }) {
  const [name, setName] = useState(account?.name || "");
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setName(account?.name || "");
    }
  }, [open, account]);

  const save = async () => {
    await fetch("/api/account", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    onClose();
    if (router.refresh) router.refresh();
  };

  const deleteAccount = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your account? This cannot be undone."
      )
    ) {
      return;
    }
    const res = await fetch("/api/account", { method: "DELETE" });
    if (res.ok) {
      router.push("/login");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-5 rounded-2xl shadow max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Account</h2>
          <button onClick={onClose} className="text-gray-700">
            Close
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <input
            className="border border-gray-300 p-2 rounded-lg"
            placeholder="Business Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={onClose}
              className="bg-gray-100 text-gray-500 p-2 px-3 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={save}
              className="bg-purple-700 text-white p-2 px-3 rounded-lg"
            >
              Save
            </button>
          </div>
        </div>
        <div className="border-t border-gray-200 pb-5 pt-5 mt-5 -mb-5 -mx-5 px-5 bg-gray-50 rounded-bl-2xl rounded-br-2xl">
          <button onClick={deleteAccount} className="text-gray-700">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
