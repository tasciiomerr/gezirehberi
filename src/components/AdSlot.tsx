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

  // Bulgu (2026-09, AdSense onayı sonrası canlı test): önceki "flex
  // justify-center" sarmalayıcı, gerçek AdSense script'inin ölçüm anında
  // <ins>'in genişliğini 0 hesaplamasına yol açıyordu (konsolda
  // "TagError: No slot size for availableWidth=0") — flexbox'ta bir child
  // sadece width:100% ile (flex-basis olmadan) content-bazlı boyutlanır,
  // <ins> boş olduğu için bu 0'a düşüyor. Bu, Google'ın kendi
  // dokümantasyonunda da geçen bilinen bir hata deseni (auto/responsive
  // reklamlar flex/grid container içinde). Çözüm: flex yerine düz block
  // layout + margin:auto ile ortalama — <ins> artık her zaman gerçek bir
  // genişlik hesaplıyor.
  return (
    <div className="my-10 w-full no-print" aria-hidden="true">
      <Script
        id="adsbygoogle-loader"
        strategy="afterInteractive"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
        crossOrigin="anonymous"
      />
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", maxWidth: 728, marginLeft: "auto", marginRight: "auto" }}
        data-ad-client={clientId}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
