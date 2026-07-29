"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { isInWishlist, toggleWishlist, subscribeWishlist } from "@/lib/wishlist";

interface WishlistButtonProps {
  citySlug: string;
  regionSlug: string;
  cityName: string;
  variant?: "floating" | "inline";
}

export default function WishlistButton({
  citySlug,
  regionSlug,
  cityName,
  variant = "floating",
}: WishlistButtonProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Reads from localStorage (external system) after mount to avoid SSR/hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSaved(isInWishlist(citySlug));
    const unsubscribe = subscribeWishlist(() => {
      setSaved(isInWishlist(citySlug));
    });
    return unsubscribe;
  }, [citySlug]);

  const handleToggle = () => {
    toggleWishlist({ citySlug, regionSlug, cityName });
  };

  if (variant === "inline") {
    return (
      <motion.button
        onClick={handleToggle}
        whileTap={{ scale: 0.9 }}
        className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
          saved
            ? "border-kiremit bg-kiremit text-paper"
            : "border-ink/20 text-ink hover:border-kiremit hover:text-kiremit"
        }`}
      >
        <Heart size={16} fill={saved ? "currentColor" : "none"} />
        {saved ? "Kaydedildi" : "Kaydet"}
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={handleToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`flex h-11 w-11 items-center justify-center rounded-full shadow-lg backdrop-blur transition-colors ${
        saved ? "bg-kiremit text-paper" : "bg-paper/90 text-ink hover:text-kiremit"
      }`}
      aria-label={saved ? "Kayıtlardan çıkar" : "Kaydet"}
    >
      <Heart size={20} fill={saved ? "currentColor" : "none"} />
    </motion.button>
  );
}
