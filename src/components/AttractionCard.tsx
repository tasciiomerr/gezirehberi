"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Ticket, Star, Camera, Accessibility, ParkingSquare } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import { Attraction } from "@/lib/types";

const IMPORTANCE_LABELS: Record<string, { label: string; color: string }> = {
  "must-see": { label: "Mutlaka Görün", color: "bg-kiremit text-paper" },
  "should-see": { label: "Görülmeli", color: "bg-safran text-ink" },
  "nice-to-have": { label: "Zaman Varsa", color: "bg-ink/10 text-ink" },
};

export default function AttractionCard({ attraction }: { attraction: Attraction }) {
  const importance = IMPORTANCE_LABELS[attraction.importance] ?? IMPORTANCE_LABELS["nice-to-have"];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-xl border border-ink/10 bg-paper transition-shadow hover:shadow-lg"
    >
      <div className="relative">
        <PlaceholderImage seed={attraction.id} aspect="video" />
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${importance.color}`}
        >
          {importance.label}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg italic text-ink group-hover:text-kiremit transition-colors">
          {attraction.name}
        </h3>
        <p className="mt-1.5 text-sm text-ink/70 line-clamp-2">{attraction.description}</p>

        <div className="mt-3 flex flex-wrap gap-3 text-xs text-ink/50">
          <span className="flex items-center gap-1">
            <Clock size={12} /> {attraction.duration}
          </span>
          <span className="flex items-center gap-1">
            <Ticket size={12} /> {attraction.entranceFee}
          </span>
        </div>

        {attraction.tips.length > 0 && (
          <div className="mt-3 rounded-lg bg-safran/10 p-2.5">
            <p className="flex items-start gap-1.5 text-xs text-ink/70">
              <Star size={12} className="mt-0.5 shrink-0 text-safran" />
              {attraction.tips[0]}
            </p>
          </div>
        )}

        {/* Bölüm 3.2: en iyi fotoğraf/ışık zamanı */}
        {attraction.bestPhotoTime && (
          <div className="mt-2 flex items-start gap-1.5 text-xs text-turkuaz">
            <Camera size={12} className="mt-0.5 shrink-0" />
            <span>{attraction.bestPhotoTime}</span>
          </div>
        )}

        <div className="mt-3 flex items-center gap-1 text-xs text-ink/50">
          <MapPin size={12} />
          <span className="truncate">{attraction.address}</span>
        </div>

        {/* Bölüm 3.6/3.7: erişilebilirlik ve otopark ipuçları */}
        {(attraction.accessibility || attraction.parkingTip) && (
          <div className="mt-2 space-y-1 border-t border-ink/5 pt-2">
            {attraction.accessibility && (
              <p className="flex items-start gap-1.5 text-[11px] text-ink/50">
                <Accessibility size={12} className="mt-0.5 shrink-0" />
                {attraction.accessibility}
              </p>
            )}
            {attraction.parkingTip && (
              <p className="flex items-start gap-1.5 text-[11px] text-ink/50">
                <ParkingSquare size={12} className="mt-0.5 shrink-0" />
                {attraction.parkingTip}
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
