"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import UserMenu from "../components/UserMenu";
import Image from "next/image";
import { APP_NAME, VIDA_EMBED_BASE_URL } from "../../config/constants.js";

export default function ClientHome({ user, account }) {
  const [vida, setVida] = useState(null);
  const [loading, setLoading] = useState(true);
  const didFetch = useRef(false);

  // Fetch Vida account information and a one-time authentication token as soon
  // as the component mounts. The token allows the iframe below to log the user
  // into Vida without prompting for credentials.
  useEffect(() => {
    if (didFetch.current) return; // guard against Strict Mode double-invoke in dev
    didFetch.current = true;
    const load = async () => {
      try {
        const res = await fetch("/api/vida");
        if (res.ok) {
          const data = await res.json();
          setVida(data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    load();
  }, []);

  // Build iframe src using URL constructor for proper encoding and safety.
  const iframeSrc = useMemo(() => {
    if (!vida?.oneTimeAuthToken) return null;
    try {
      const url = new URL(
        VIDA_EMBED_BASE_URL,
        typeof window !== "undefined" ? window.location.origin : "http://localhost"
      );

      // Collect params, then explicitly URL-encode values once via encodeURIComponent.
      const params = {
        authToken: vida.oneTimeAuthToken,
        email: user.email,
        // onboarding_timezone: "America/Toronto", // Pre-fill the timezone step
        // onboarding_skipTimezone: "true", // Skip the timezone step
        // onboarding_agentVoice: "TWUKKXAylkYxxlPe4gx0", // Pre-fill the agent voice
        // onboarding_skipAgentVoice: "true", // Skip the agent voice
        // onboarding_tf_orgName: "The Spot Barbershop South Miami", // Pre-fill org field
        // onboarding_skip_tf_orgName: "true", // Skip org name field
        // onboarding_tf_notifyEmail: user.email, // Pre-fill notify email field
        // onboarding_skip_ti_googleCalendar: "true", // Skip integration if the integration is connected
      };

      // Build encoded query string manually to avoid double-encoding.
      url.search = Object.entries(params)
        .filter(([_, v]) => v !== undefined && v !== null)
        .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
        .join("&");

      return url.toString();
    } catch (e) {
      console.error("Failed to construct Vida iframe URL", e);
      return null;
    }
  }, [vida?.oneTimeAuthToken, user?.email, account?.name]);

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
        iframeSrc && (
          <iframe
            className="flex-grow"
            // The Vida web app is embedded directly in our page. We pass the
            // one-time token and the user's email so the session is created
            // automatically.
            src={iframeSrc}
          />
        )
      )}
    </div>
  );
}
