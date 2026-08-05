"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { hasAnalyticsConsent } from "@/lib/cookieConsent";

// Report items 264-267 — code-side prep only. Renders nothing until
// NEXT_PUBLIC_CLARITY_PROJECT_ID is set (real Clarity project [B], account
// creation pending) AND the user has accepted non-essential-cookie consent —
// same gating pattern as YandexMetrica/AdSlot/GoogleAnalytics.
export default function Clarity() {
  const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(hasAnalyticsConsent());
    function handleChange(e: Event) {
      setConsented((e as CustomEvent).detail === "accepted");
    }
    window.addEventListener("yoldefteri_cookie_consent_change", handleChange);
    return () => window.removeEventListener("yoldefteri_cookie_consent_change", handleChange);
  }, []);

  if (!projectId || !consented) return null;

  return (
    <Script id="ms-clarity-loader" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", ${JSON.stringify(projectId)});
      `}
    </Script>
  );
}
