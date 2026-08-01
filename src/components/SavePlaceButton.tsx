"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { isPlaceSaved, toggleSavedPlace, subscribeSavedPlaces } from "@/lib/savedPlaces";

interface SavePlaceButtonProps {
  place: any;
  category: string;
  citySlug: string;
  size?: number;
}

export default function SavePlaceButton({
  place,
  category,
  citySlug,
  size = 18,
}: SavePlaceButtonProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isPlaceSaved(place.id));
    const unsubscribe = subscribeSavedPlaces(() => {
      setSaved(isPlaceSaved(place.id));
    });
    return unsubscribe;
  }, [place.id]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleSavedPlace(place, category, citySlug);
  };

  return (
    <motion.button
      onClick={handleToggle}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.85 }}
      className={`flex items-center justify-center rounded-full shadow-md border border-ink/5 p-2 bg-paper/90 backdrop-blur-md transition-all cursor-pointer ${
        saved 
          ? "text-kiremit bg-paper" 
          : "text-ink/40 hover:text-kiremit hover:bg-paper"
      }`}
      aria-label={saved ? "Remove from saved" : "Save place"}
    >
      <Heart size={size} fill={saved ? "currentColor" : "none"} strokeWidth={saved ? 0 : 2} />
    </motion.button>
  );
}
