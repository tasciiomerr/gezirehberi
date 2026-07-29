"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, MapPin, Trash2 } from "lucide-react";
import { getWishlist, removeFromWishlist, subscribeWishlist, WishlistItem } from "@/lib/wishlist";

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    // Reads from localStorage (external system) after mount to avoid SSR/hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(getWishlist());
    const unsubscribe = subscribeWishlist(() => {
      setItems(getWishlist());
    });
    return unsubscribe;
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="mb-10 flex items-center gap-3">
        <Heart size={28} className="text-kiremit" fill="currentColor" />
        <h1 className="font-display text-4xl italic text-ink">Kayıtlarım</h1>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-ink/10 bg-ink/5 p-12 text-center">
          <p className="text-ink/60 mb-4">Henüz hiçbir şehir kaydetmediniz.</p>
          <Link
            href="/bolgeler"
            className="inline-flex items-center gap-2 rounded-full bg-kiremit px-6 py-3 text-sm font-semibold text-paper hover:bg-ink transition-colors"
          >
            Bölgeleri Keşfet
          </Link>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {items.map((item) => (
            <motion.div
              key={item.citySlug}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between rounded-xl border border-ink/10 bg-paper p-5"
            >
              <Link
                href={`/bolgeler/${item.regionSlug}/${item.citySlug}`}
                className="flex items-center gap-3 flex-1"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-kiremit/10 text-kiremit">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="font-semibold text-ink">{item.cityName}</p>
                  <p className="text-xs text-ink/50">
                    {new Date(item.addedAt).toLocaleDateString("tr-TR")} tarihinde eklendi
                  </p>
                </div>
              </Link>
              <button
                onClick={() => removeFromWishlist(item.citySlug)}
                className="text-ink/40 hover:text-kiremit transition-colors p-2"
                aria-label="Kayıttan çıkar"
              >
                <Trash2 size={18} />
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
