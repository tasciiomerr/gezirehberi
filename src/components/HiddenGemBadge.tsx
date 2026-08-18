"use client";

import { useState } from "react";
import { Gem, Info } from "lucide-react";
import { getDictionary, Locale } from "@/lib/i18n";

interface HiddenGemBadgeProps {
  locale: string;
}

// Parti 5, madde 16 — "Gizli Cennet" rozeti. Tanımı (editoryal öne çıkanlar
// listesinde olmama, gerçek ziyaretçi sayısı değil) tooltip'te açıkça
// belirtiliyor — bkz. src/lib/data/cities/index.ts#isHiddenGem.
export default function HiddenGemBadge({ locale }: HiddenGemBadgeProps) {
  const dict = getDictionary(locale as Locale);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setShowTooltip((v) => !v)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="flex items-center gap-1.5 rounded-full bg-turkuaz/10 border border-turkuaz/30 px-3 py-1.5 text-xs font-bold text-turkuaz"
      >
        <Gem size={13} />
        {dict.city.hiddenGemBadge}
        <Info size={11} className="opacity-60" />
      </button>
      {showTooltip && (
        <div className="absolute left-0 top-full z-20 mt-2 w-64 rounded-lg border border-ink/10 bg-paper p-3 text-[11px] leading-relaxed text-ink/70 shadow-xl">
          {dict.city.hiddenGemTooltip}
        </div>
      )}
    </div>
  );
}
