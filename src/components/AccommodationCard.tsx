"use client";

import { motion } from "framer-motion";
import { Star, Wifi } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import { Accommodation } from "@/lib/types";
import { translateDataText, Locale } from "@/lib/i18n";

export default function AccommodationCard({ accommodation, locale = "tr" }: { accommodation: Accommodation; locale?: string }) {
  const TYPE_LABELS: Record<string, string> = {
    hotel: locale === "tr" ? "Otel" : locale === "de" ? "Hotel" : locale === "ar" ? "فندق" : "Hotel",
    guesthouse: locale === "tr" ? "Pansiyon" : locale === "de" ? "Gästehaus" : locale === "ar" ? "بيت ضيافة" : "Guesthouse",
    boutique: locale === "tr" ? "Butik Otel" : locale === "de" ? "Boutique-Hotel" : locale === "ar" ? "فندق بوتيك" : "Boutique Hotel",
    resort: locale === "tr" ? "Resort" : locale === "de" ? "Resort" : locale === "ar" ? "منتجع" : "Resort",
  };

  const perNightText = locale === "tr"
    ? "/ gece"
    : locale === "de"
    ? "/ Nacht"
    : locale === "ar"
    ? "/ ليلة"
    : "/ night";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-xl border border-ink/10 bg-paper transition-shadow hover:shadow-lg h-full flex flex-col justify-between"
    >
      <div>
        <div className="relative">
          <PlaceholderImage seed={accommodation.id} aspect="video" />
          <span className="absolute left-3 top-3 rounded-full bg-deniz/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-paper shadow-sm">
            {TYPE_LABELS[accommodation.type] ?? accommodation.type}
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg italic text-ink group-hover:text-kiremit transition-colors">
              {translateDataText(accommodation.name, locale as Locale)}
            </h3>
            <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-safran">
              <Star size={14} fill="currentColor" /> {accommodation.rating}
            </span>
          </div>
          <p className="mt-1.5 text-sm text-ink/70 line-clamp-2 leading-relaxed">
            {translateDataText(accommodation.description, locale as Locale)}
          </p>

          {accommodation.amenities.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5 border-t border-ink/5 pt-3">
              {accommodation.amenities.slice(0, 3).map((a) => (
                <span key={a} className="flex items-center gap-1 rounded-full bg-ink/5 px-2.5 py-1 text-[11px] font-semibold text-ink/70">
                  <Wifi size={10} className="text-ink/45" /> {translateDataText(a, locale as Locale)}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 pt-0">
        <p className="mt-3 font-bold text-kiremit border-t border-ink/5 pt-3">
          {translateDataText(accommodation.pricePerNight, locale as Locale)}{" "}
          <span className="text-xs font-normal text-ink/50">{perNightText}</span>
        </p>
      </div>
    </motion.div>
  );
}
