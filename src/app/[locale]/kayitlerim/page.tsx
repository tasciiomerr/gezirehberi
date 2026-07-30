"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, MapPin, Trash2, Compass, LayoutGrid, Rows3 } from "lucide-react";
import { getWishlist, removeFromWishlist, subscribeWishlist, WishlistItem } from "@/lib/wishlist";
import { regions } from "@/lib/data/regions";
import { getDictionary, Locale, translateDataText } from "@/lib/i18n";
import { useParams } from "next/navigation";

type ViewMode = "region" | "list";

export default function WishlistPage() {
  const params = useParams();
  const locale = (params?.locale || "tr") as Locale;
  const dict = getDictionary(locale);

  const [items, setItems] = useState<WishlistItem[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("region");

  useEffect(() => {
    setItems(getWishlist());
    const unsubscribe = subscribeWishlist(() => {
      setItems(getWishlist());
    });
    return unsubscribe;
  }, []);

  const grouped = useMemo(() => {
    const map = new Map<string, WishlistItem[]>();
    items.forEach((item) => {
      const list = map.get(item.regionSlug) ?? [];
      list.push(item);
      map.set(item.regionSlug, list);
    });
    return Array.from(map.entries()).map(([regionSlug, cities]) => ({
      regionSlug,
      regionName: regions.find((r) => r.slug === regionSlug)?.name ?? regionSlug,
      cities,
    }));
  }, [items]);

  function CityRow({ item }: { item: WishlistItem }) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between rounded-xl border border-ink/10 bg-paper p-5 transition-shadow hover:shadow-md"
      >
        <Link href={`/${locale}/bolgeler/${item.regionSlug}/${item.citySlug}`} className="flex flex-1 items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-kiremit/10 text-kiremit">
            <MapPin size={18} />
          </div>
          <div>
            <p className="font-semibold text-ink">{translateDataText(item.cityName, locale)}</p>
            <p className="text-xs text-ink/50">
              {new Date(item.addedAt).toLocaleDateString(locale === "tr" ? "tr-TR" : "en-US")} {dict.wishlist.addedAt}
            </p>
          </div>
        </Link>
        <Link
          href={`/${locale}/bolgeler/${item.regionSlug}/${item.citySlug}#itinerary-section`}
          className="mr-1 flex h-9 w-9 items-center justify-center rounded-full text-ink/40 hover:bg-turkuaz/10 hover:text-turkuaz transition-colors"
          aria-label={dict.wishlist.goToItinerary}
          title={dict.wishlist.goToItinerary}
        >
          <Compass size={16} />
        </Link>
        <button
          onClick={() => removeFromWishlist(item.citySlug)}
          className="p-2 text-ink/40 transition-colors hover:text-kiremit"
          aria-label={dict.wishlist.remove}
        >
          <Trash2 size={18} />
        </button>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Heart size={28} className="text-kiremit animate-pulse" fill="currentColor" />
          <h1 className="font-display text-4xl italic text-ink">{dict.wishlist.title}</h1>
        </div>
        {items.length > 0 && (
          <div className="flex gap-1 rounded-full border border-ink/10 p-1 bg-paper/60 backdrop-blur-sm">
            <button
              onClick={() => setViewMode("region")}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                viewMode === "region" ? "bg-kiremit text-paper" : "text-ink/60"
              }`}
            >
              <LayoutGrid size={13} /> {dict.wishlist.viewRegion}
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                viewMode === "list" ? "bg-kiremit text-paper" : "text-ink/60"
              }`}
            >
              <Rows3 size={13} /> {dict.wishlist.viewList}
            </button>
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-ink/10 bg-ink/5 p-12 text-center">
          <p className="text-ink/60 mb-4">{dict.wishlist.empty}</p>
          <Link
            href={`/${locale}/bolgeler`}
            className="inline-flex items-center gap-2 rounded-full bg-kiremit px-6 py-3 text-sm font-semibold text-paper hover:bg-ink hover:scale-105 transition-all"
          >
            {dict.wishlist.exploreButton}
          </Link>
        </div>
      ) : viewMode === "list" ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <CityRow key={item.citySlug} item={item} />
          ))}
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
          {grouped.map((group) => (
            <div key={group.regionSlug}>
              <h2 className="mb-3 font-display text-xl italic text-ink border-b border-ink/5 pb-2">
                {translateDataText(group.regionName, locale)}{" "}
                <span className="font-sans text-sm not-italic text-ink/40">({group.cities.length})</span>
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {group.cities.map((item) => (
                  <CityRow key={item.citySlug} item={item} />
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
