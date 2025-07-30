"use client";
import { useState, useEffect } from "react";
import { APP_NAME, VIDA_DOMAIN } from "../../config/constants.js";
import UserMenu from "../components/UserMenu";
import Image from "next/image";

export default function ClientHome({ user, account }) {
  const [vida, setVida] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedExample, setSelectedExample] = useState("editAgent");

  const examples = {
    editAgent: {
      label: "Edit Agent",
      getParams: (vida) => ({
        agent: vida.account.id,
        org: vida.account.id,
        editAgent: "true",
      }),
    },
    integration: {
      label: "Integration: VidaApp - Square",
      getParams: (vida) => ({
        agent: vida.account.id,
        org: vida.account.id,
        integrations: "vidaApp",
        appId: "squareUp",
        appVersion: "v1",
      }),
    },
  };
  const handleModalClose = () => {
    alert("All modals closed");
    // e.g. refresh data or re-enable scrolling…
  };

  const handlePressTest = async () => {
    try {
      const res = await fetch("/api/vida");
      if (res.ok) {
        const data = await res.json();
        const params = examples[selectedExample].getParams(vida);
        window.vdaModal.open(VIDA_DOMAIN, data.oneTimeAuthToken, params);
        window.vdaModal.onClose(handleModalClose);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    return () => {
      window.vdaModal?.offClose(handleModalClose);
    };
  }, []);

  // Fetch Vida account information and a one-time authentication token as soon
  // as the component mounts. The token allows the iframe below to log the user
  // into Vida without prompting for credentials.
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/vida");
        if (res.ok) {
          const data = await res.json();
          setVida(data);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex justify-between items-center px-4 h-14 bg-warning gap-2 relative bg-white">
        <Image
          src="/logo.png"
          alt="logo"
          className="rounded-lg scale-90"
          width={32}
          height={32}
        />
        <div className="text-lg font-semibold flex-1">{APP_NAME}</div>
        <UserMenu user={user} account={account} />
        <div className="border-t border-[rgba(0,0,0,0.075)] absolute left-0 right-0 top-14 mt-[px] shadow" />
      </header>

      {loading ? (
        <div className="flex-grow flex items-center justify-center text-gray-600">
          Loading account...
        </div>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center">
          <select
            value={selectedExample}
            onChange={(e) => setSelectedExample(e.target.value)}
            className="mt-4 p-2 border rounded"
          >
            {Object.entries(examples).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <textarea
            readOnly
            className="border border-gray-300 w-full max-w-lg h-64 mt-4 p-2 bg-gray-100 text-sm font-mono rounded"
            value={`window.vdaModal.open(
  '${VIDA_DOMAIN}',
  '${vida.oneTimeAuthToken}',
  ${JSON.stringify(examples[selectedExample].getParams(vida), null, 2)}
);`}
          />
          <button
            className="bg-purple-700 text-white p-3 rounded-lg font-semibold mt-3"
            onClick={handlePressTest}
          >
            Open Modal
          </button>
        </div>
      )}
    </div>
  );
}
