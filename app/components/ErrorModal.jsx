"use client";
export default function ErrorModal({ open, onClose, message }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white p-5 rounded-2xl shadow max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 text-center">{message}</div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-purple-700 text-white p-2 px-4 rounded-lg"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
