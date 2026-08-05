"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { hasAnalyticsConsent } from "@/lib/cookieConsent";

// Yandex Webmaster verification is a <meta name="yandex-verification"> tag,
// added directly in layout.tsx metadata.verification (see i18n/layout).
// This component only handles the Metrica counter script, which — like any
// non-essential analytics script — must not load before the user accepts
// cookies (see report items 30/132-134, cookieConsent.ts).
//
// NEXT_PUBLIC_YANDEX_METRICA_ID is unset until the user supplies a real
// counter ID [B]; until then this renders nothing.
export default function YandexMetrica() {
  const counterId = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID;
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(hasAnalyticsConsent());
    function handleChange(e: Event) {
      setConsented((e as CustomEvent).detail === "accepted");
    }
    window.addEventListener("yoldefteri_cookie_consent_change", handleChange);
    return () => window.removeEventListener("yoldefteri_cookie_consent_change", handleChange);
  }, []);

  if (!counterId || !consented) return null;

  return (
    <Script id="yandex-metrica" strategy="afterInteractive">
      {`
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        ym(${Number(counterId)}, "init", {clickmap:true, trackLinks:true, accurateTrackBounce:true});
      `}
    </Script>
  );
}
