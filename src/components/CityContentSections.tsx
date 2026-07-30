"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPinned, UtensilsCrossed, Soup, BedDouble } from "lucide-react";
import AttractionCard from "./AttractionCard";
import RestaurantCard from "./RestaurantCard";
import FoodCard from "./FoodCard";
import AccommodationCard from "./AccommodationCard";
import { Attraction, Restaurant, FoodItem, Accommodation } from "@/lib/types";
import { getDictionary, Locale } from "@/lib/i18n";

interface CityContentSectionsProps {
  attractions: Attraction[];
  restaurants: Restaurant[];
  localFood: FoodItem[];
  accommodations: Accommodation[];
  locale?: string;
}

function FilterButtons({
  filters,
  active,
  onChange,
}: {
  filters: { value: string; label: string }[];
  active: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
            active === f.value
              ? "bg-kiremit text-paper shadow-sm"
              : "border border-ink/15 text-ink/70 hover:border-kiremit hover:text-kiremit bg-paper/60 backdrop-blur-sm"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  count,
  locale,
}: {
  icon: React.ReactNode;
  title: string;
  count: number;
  locale: string;
}) {
  const resultText = locale === "tr"
    ? "sonuç"
    : locale === "de"
    ? "Ergebnisse"
    : locale === "ar"
    ? "نتيجة"
    : "results";

  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-kiremit/10 text-kiremit shadow-sm">
        {icon}
      </span>
      <div>
        <h2 className="font-display text-2xl italic text-ink">{title}</h2>
        <p className="text-xs text-ink/45 font-semibold">{count} {resultText}</p>
      </div>
    </div>
  );
}

export default function CityContentSections({
  attractions,
  restaurants,
  localFood,
  accommodations,
  locale = "tr",
}: CityContentSectionsProps) {
  const dict = getDictionary(locale as Locale);
  const [attractionFilter, setAttractionFilter] = useState("all");
  const [restaurantFilter, setRestaurantFilter] = useState("all");

  const ATTRACTION_FILTERS = [
    { value: "all", label: locale === "tr" ? "Tümü" : locale === "de" ? "Alle" : locale === "ar" ? "الكل" : "All" },
    { value: "must-see", label: locale === "tr" ? "Mutlaka Görün" : locale === "de" ? "Unbedingt sehen" : locale === "ar" ? "يجب رؤيته" : "Must See" },
    { value: "should-see", label: locale === "tr" ? "Görülmeli" : locale === "de" ? "Sehenswert" : locale === "ar" ? "يُنصح برؤيته" : "Should See" },
    { value: "nice-to-have", label: locale === "tr" ? "Zaman Varsa" : locale === "de" ? "Optional" : locale === "ar" ? "إذا كان هناك وقت" : "Nice to Have" },
  ];

  const RESTAURANT_FILTERS = [
    { value: "all", label: locale === "tr" ? "Tümü" : locale === "de" ? "Alle" : locale === "ar" ? "الكل" : "All" },
    { value: "budget", label: locale === "tr" ? "Ekonomik" : locale === "de" ? "Günstig" : locale === "ar" ? "اقتصادي" : "Budget" },
    { value: "mid", label: locale === "tr" ? "Orta" : locale === "de" ? "Mittel" : locale === "ar" ? "متوسط" : "Mid-range" },
    { value: "luxury", label: locale === "tr" ? "Üst Segment" : locale === "de" ? "Premium" : locale === "ar" ? "فاخر" : "Premium" },
  ];

  const filteredAttractions = useMemo(
    () =>
      attractionFilter === "all"
        ? attractions
        : attractions.filter((a) => a.importance === attractionFilter),
    [attractions, attractionFilter]
  );

  const filteredRestaurants = useMemo(
    () =>
      restaurantFilter === "all"
        ? restaurants
        : restaurants.filter((r) => r.priceRange === restaurantFilter),
    [restaurants, restaurantFilter]
  );

  return (
    <div className="space-y-20">
      {attractions.length > 0 && (
        <section>
          <SectionHeader
            icon={<MapPinned size={18} />}
            title={dict.city.attractions}
            count={filteredAttractions.length}
            locale={locale}
          />
          <div className="mb-6">
            <FilterButtons filters={ATTRACTION_FILTERS} active={attractionFilter} onChange={setAttractionFilter} />
          </div>
          <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredAttractions.map((a) => (
                <motion.div key={a.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <AttractionCard attraction={a} locale={locale} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      )}

      {restaurants.length > 0 && (
        <section>
          <SectionHeader
            icon={<UtensilsCrossed size={18} />}
            title={dict.city.whereToEat}
            count={filteredRestaurants.length}
            locale={locale}
          />
          <div className="mb-6">
            <FilterButtons filters={RESTAURANT_FILTERS} active={restaurantFilter} onChange={setRestaurantFilter} />
          </div>
          <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredRestaurants.map((r) => (
                <motion.div key={r.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <RestaurantCard restaurant={r} locale={locale} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      )}

      {localFood.length > 0 && (
        <section>
          <SectionHeader
            icon={<Soup size={18} />}
            title={dict.city.whatToEat}
            count={localFood.length}
            locale={locale}
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {localFood.map((f) => (
              <FoodCard key={f.id} food={f} locale={locale} />
            ))}
          </div>
        </section>
      )}

      {accommodations.length > 0 && (
        <section>
          <SectionHeader
            icon={<BedDouble size={18} />}
            title={dict.city.whereToStay}
            count={accommodations.length}
            locale={locale}
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {accommodations.map((a) => (
              <AccommodationCard key={a.id} accommodation={a} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
