"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useParams } from "next/navigation";
import { isInWishlist, toggleWishlist, subscribeWishlist } from "@/lib/wishlist";
import { getDictionary, Locale } from "@/lib/i18n";

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
  const params = useParams();
  const locale = (params?.locale || "tr") as Locale;
  const dict = getDictionary(locale);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
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
        className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
          saved
            ? "border-kiremit bg-kiremit text-paper shadow-sm"
            : "border-ink/20 text-ink bg-paper/60 backdrop-blur-sm hover:border-kiremit hover:text-kiremit"
        }`}
      >
        <Heart size={15} fill={saved ? "currentColor" : "none"} />
        {saved ? dict.city.saved : dict.city.save}
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={handleToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`flex h-11 w-11 items-center justify-center rounded-full shadow-lg backdrop-blur-md transition-colors ${
        saved ? "bg-kiremit text-paper" : "bg-paper/90 text-ink hover:text-kiremit border border-ink/5"
      }`}
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart size={20} fill={saved ? "currentColor" : "none"} />
    </motion.button>
  );
}
