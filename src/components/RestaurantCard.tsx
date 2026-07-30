"use client";

import { motion } from "framer-motion";
import { UtensilsCrossed, Phone, CheckCircle2 } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import { Restaurant } from "@/lib/types";
import { translateDataText, Locale } from "@/lib/i18n";

export default function RestaurantCard({ restaurant, locale = "tr" }: { restaurant: Restaurant; locale?: string }) {
  const PRICE_LABELS: Record<string, string> = {
    budget: locale === "tr" ? "₺ Ekonomik" : locale === "de" ? "₺ Günstig" : locale === "ar" ? "₺ اقتصادي" : "₺ Budget",
    mid: locale === "tr" ? "₺₺ Orta" : locale === "de" ? "₺₺ Mittel" : locale === "ar" ? "₺₺ متوسط" : "₺₺ Mid-Range",
    luxury: locale === "tr" ? "₺₺₺ Üst Segment" : locale === "de" ? "₺₺₺ Premium" : locale === "ar" ? "₺₺₺ فاخر" : "₺₺₺ Premium",
  };

  const DINING_LABELS: Record<string, string> = {
    restaurant: locale === "tr" ? "Restoran" : locale === "de" ? "Restaurant" : locale === "ar" ? "مطعم" : "Restaurant",
    cafe: locale === "tr" ? "Kafe" : locale === "de" ? "Café" : locale === "ar" ? "مقهى" : "Café",
    "street-food": locale === "tr" ? "Sokak Lezzeti" : locale === "de" ? "Straßenessen" : locale === "ar" ? "أكل شوارع" : "Street Food",
    market: locale === "tr" ? "Pazar" : locale === "de" ? "Markt" : locale === "ar" ? "سوق" : "Market",
  };

  const reservationText = locale === "tr"
    ? "Rezervasyon önerilir"
    : locale === "de"
    ? "Reservierung empfohlen"
    : locale === "ar"
    ? "يُنصح بالحجز"
    : "Reservation recommended";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-xl border border-ink/10 bg-paper transition-shadow hover:shadow-lg h-full flex flex-col justify-between"
    >
      <div>
        <div className="relative">
          <PlaceholderImage seed={restaurant.id} aspect="video" />
          <span className="absolute left-3 top-3 rounded-full bg-turkuaz/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-paper shadow-sm">
            {DINING_LABELS[restaurant.diningType] ?? restaurant.diningType}
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg italic text-ink group-hover:text-kiremit transition-colors">
              {translateDataText(restaurant.name, locale as Locale)}
            </h3>
            <span className="shrink-0 rounded-full bg-safran/20 px-2.5 py-1 text-xs font-bold text-kiremit shadow-sm">
              {PRICE_LABELS[restaurant.priceRange]}
            </span>
          </div>
          <p className="mt-1.5 text-sm text-ink/70 line-clamp-2 leading-relaxed">
            {translateDataText(restaurant.description, locale as Locale)}
          </p>

          {restaurant.specialties.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5 border-t border-ink/5 pt-3">
              {restaurant.specialties.slice(0, 3).map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-ink/5 px-2.5 py-1 text-[11px] font-semibold text-ink/75"
                >
                  {translateDataText(s, locale as Locale)}
                </span>
              ))}
            </div>
          )}

          {(restaurant.priceSegment || restaurant.signatureDish) && (
            <div className="mt-3 flex items-center justify-between gap-2 border-t border-ink/5 pt-2.5">
              {restaurant.priceSegment && (
                <span className="text-xs font-bold text-ink/40">
                  {"$".repeat(restaurant.priceSegment)}
                  <span className="text-ink/15">{"$".repeat(4 - restaurant.priceSegment)}</span>
                </span>
              )}
              {restaurant.signatureDish && (
                <p className="flex-1 text-right text-[11px] italic font-semibold text-kiremit">
                  ★ {translateDataText(restaurant.signatureDish, locale as Locale)}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 pt-0">
        <div className="flex items-center justify-between text-xs text-ink/50 border-t border-ink/5 pt-3 font-medium">
          <span className="flex items-center gap-1 font-bold text-kiremit">
            <UtensilsCrossed size={12} /> {translateDataText(restaurant.averageCost, locale as Locale)}
          </span>
          {restaurant.reservationNeeded && (
            <span className="flex items-center gap-1 text-[11px]">
              <CheckCircle2 size={12} className="text-turkuaz" /> {reservationText}
            </span>
          )}
        </div>

        {restaurant.phone && (
          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-ink/45 border-t border-ink/5 pt-2 font-medium">
            <Phone size={12} /> <span>{restaurant.phone}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
