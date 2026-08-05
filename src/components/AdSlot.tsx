"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { hasAnalyticsConsent } from "@/lib/cookieConsent";

// Report items 91-94 — architecture only, no live ad network integrated yet.
// Renders nothing until NEXT_PUBLIC_ADSENSE_CLIENT_ID is set (real AdSense
// account [B], pending) AND the user has accepted the non-essential-cookie
// consent (report items 30/132-134) — same gating pattern as YandexMetrica.
// Placement rule (91/94): only ever drop this at a natural content break
// (between sections, never mid-paragraph or over interactive controls), at
// most once per page, sized to stay well under the mobile viewport so ad
// density never overwhelms content.
declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdSlot({ slotId }: { slotId?: string }) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(hasAnalyticsConsent());
    function handleChange(e: Event) {
      setConsented((e as CustomEvent).detail === "accepted");
    }
    window.addEventListener("yoldefteri_cookie_consent_change", handleChange);
    return () => window.removeEventListener("yoldefteri_cookie_consent_change", handleChange);
  }, []);

  useEffect(() => {
    if (!clientId || !consented) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Loader script not ready yet or slot already initialized — safe to ignore.
    }
  }, [clientId, consented]);

  if (!clientId || !consented) return null;

  return (
    <div className="my-10 flex justify-center no-print" aria-hidden="true">
      <Script
        id="adsbygoogle-loader"
        strategy="afterInteractive"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
        crossOrigin="anonymous"
      />
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", maxWidth: 728 }}
        data-ad-client={clientId}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
