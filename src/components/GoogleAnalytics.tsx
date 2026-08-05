"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { hasAnalyticsConsent } from "@/lib/cookieConsent";

// Report items 264-267 — code-side prep only. Renders nothing until
// NEXT_PUBLIC_GA4_MEASUREMENT_ID is set (real GA4 property [B], account
// creation pending) AND the user has accepted non-essential-cookie consent —
// same gating pattern as YandexMetrica/AdSlot.
declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export default function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(hasAnalyticsConsent());
    function handleChange(e: Event) {
      setConsented((e as CustomEvent).detail === "accepted");
    }
    window.addEventListener("yoldefteri_cookie_consent_change", handleChange);
    return () => window.removeEventListener("yoldefteri_cookie_consent_change", handleChange);
  }, []);

  if (!measurementId || !consented) return null;

  return (
    <>
      <Script
        id="ga4-loader"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${JSON.stringify(measurementId)});
        `}
      </Script>
    </>
  );
}
