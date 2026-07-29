"use client";

import { ImageIcon } from "lucide-react";

const GRADIENT_PAIRS: [string, string][] = [
  ["#0F5257", "#16909C"],
  ["#8A3A2B", "#B33A25"],
  ["#B7791F", "#E4A335"],
  ["#8A2B45", "#B33A5E"],
  ["#16909C", "#E4A335"],
  ["#B33A25", "#E4A335"],
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

interface PlaceholderImageProps {
  seed: string;
  label?: string;
  className?: string;
  iconSize?: number;
  aspect?: "square" | "video" | "wide";
}

export default function PlaceholderImage({
  seed,
  label,
  className = "",
  iconSize = 32,
  aspect = "video",
}: PlaceholderImageProps) {
  const pair = GRADIENT_PAIRS[hashString(seed) % GRADIENT_PAIRS.length];
  const aspectClass =
    aspect === "square" ? "aspect-square" : aspect === "wide" ? "aspect-[21/9]" : "aspect-video";

  return (
    <div
      className={`relative flex ${aspectClass} items-center justify-center overflow-hidden rounded-xl ${className}`}
      style={{
        backgroundImage: `linear-gradient(135deg, ${pair[0]}, ${pair[1]})`,
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
      <ImageIcon size={iconSize} className="text-paper/50" strokeWidth={1.5} />
      {label && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
          <p className="text-xs font-medium text-paper truncate">{label}</p>
        </div>
      )}
    </div>
  );
}
