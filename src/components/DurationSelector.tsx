"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface DurationSelectorProps {
  onSelect: (days: number) => void;
  selected: number;
}

const durations = [
  { days: 1, label: "1 Gün", description: "Kısa ziyaret" },
  { days: 2, label: "2 Gün", description: "Hafta sonu" },
  { days: 3, label: "3 Gün", description: "Uzun hafta sonu" },
  { days: 5, label: "5 Gün", description: "Kısa tur" },
  { days: 7, label: "1 Hafta", description: "Tam tecrübe" },
  { days: 14, label: "2 Hafta", description: "Derinlemesine" },
];

export default function DurationSelector({ onSelect, selected }: DurationSelectorProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl italic text-ink mb-2">Kaç Gün Kalacaksınız?</h2>
        <p className="text-sm text-ink/70">Kalış sürenize göre ideal bir rota hazırlarız.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {durations.map((duration) => (
          <motion.button
            key={duration.days}
            onClick={() => onSelect(duration.days)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`group relative rounded-xl p-4 transition-all ${
              selected === duration.days
                ? "bg-kiremit text-paper shadow-lg"
                : "border border-ink/10 bg-paper text-ink hover:border-kiremit"
            }`}
          >
            <div className="font-semibold text-lg">{duration.label}</div>
            <div className={`text-xs mt-1 ${
              selected === duration.days ? "text-paper/80" : "text-ink/60"
            }`}>
              {duration.description}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
