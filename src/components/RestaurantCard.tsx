"use client";

import { motion } from "framer-motion";
import { UtensilsCrossed, Phone, CheckCircle2 } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import { Restaurant } from "@/lib/types";

const PRICE_LABELS: Record<string, string> = {
  budget: "₺ Ekonomik",
  mid: "₺₺ Orta",
  luxury: "₺₺₺ Üst Segment",
};

const DINING_LABELS: Record<string, string> = {
  restaurant: "Restoran",
  cafe: "Kafe",
  "street-food": "Sokak Lezzeti",
  market: "Pazar",
};

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-xl border border-ink/10 bg-paper transition-shadow hover:shadow-lg"
    >
      <div className="relative">
        <PlaceholderImage seed={restaurant.id} aspect="video" />
        <span className="absolute left-3 top-3 rounded-full bg-turkuaz/90 px-3 py-1 text-xs font-semibold text-paper">
          {DINING_LABELS[restaurant.diningType] ?? restaurant.diningType}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg italic text-ink group-hover:text-kiremit transition-colors">
            {restaurant.name}
          </h3>
          <span className="shrink-0 rounded-full bg-safran/20 px-2.5 py-1 text-xs font-semibold text-kiremit">
            {PRICE_LABELS[restaurant.priceRange]}
          </span>
        </div>
        <p className="mt-1.5 text-sm text-ink/70 line-clamp-2">{restaurant.description}</p>

        {restaurant.specialties.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {restaurant.specialties.slice(0, 3).map((s) => (
              <span
                key={s}
                className="rounded-full bg-ink/5 px-2.5 py-1 text-xs text-ink/70"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between text-xs text-ink/50">
          <span className="flex items-center gap-1 font-semibold text-kiremit">
            <UtensilsCrossed size={12} /> {restaurant.averageCost}
          </span>
          {restaurant.reservationNeeded && (
            <span className="flex items-center gap-1">
              <CheckCircle2 size={12} /> Rezervasyon önerilir
            </span>
          )}
        </div>

        {restaurant.phone && (
          <div className="mt-2 flex items-center gap-1 text-xs text-ink/50">
            <Phone size={12} /> {restaurant.phone}
          </div>
        )}
      </div>
    </motion.div>
  );
}
