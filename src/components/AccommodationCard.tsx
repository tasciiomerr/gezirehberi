"use client";

import { motion } from "framer-motion";
import { Star, Wifi } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import { Accommodation } from "@/lib/types";

const TYPE_LABELS: Record<string, string> = {
  hotel: "Otel",
  guesthouse: "Pansiyon",
  boutique: "Butik Otel",
  resort: "Resort",
};

export default function AccommodationCard({ accommodation }: { accommodation: Accommodation }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-xl border border-ink/10 bg-paper transition-shadow hover:shadow-lg"
    >
      <div className="relative">
        <PlaceholderImage seed={accommodation.id} aspect="video" />
        <span className="absolute left-3 top-3 rounded-full bg-deniz/90 px-3 py-1 text-xs font-semibold text-paper">
          {TYPE_LABELS[accommodation.type] ?? accommodation.type}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg italic text-ink group-hover:text-kiremit transition-colors">
            {accommodation.name}
          </h3>
          <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-safran">
            <Star size={14} fill="currentColor" /> {accommodation.rating}
          </span>
        </div>
        <p className="mt-1.5 text-sm text-ink/70 line-clamp-2">{accommodation.description}</p>

        {accommodation.amenities.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {accommodation.amenities.slice(0, 3).map((a) => (
              <span key={a} className="flex items-center gap-1 rounded-full bg-ink/5 px-2.5 py-1 text-xs text-ink/70">
                <Wifi size={10} /> {a}
              </span>
            ))}
          </div>
        )}

        <p className="mt-3 font-semibold text-kiremit">{accommodation.pricePerNight} <span className="text-xs font-normal text-ink/50">/ gece</span></p>
      </div>
    </motion.div>
  );
}
