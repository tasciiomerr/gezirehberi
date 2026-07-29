"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPinned, UtensilsCrossed, Soup, BedDouble } from "lucide-react";
import AttractionCard from "./AttractionCard";
import RestaurantCard from "./RestaurantCard";
import FoodCard from "./FoodCard";
import AccommodationCard from "./AccommodationCard";
import { Attraction, Restaurant, FoodItem, Accommodation } from "@/lib/types";

interface CityContentSectionsProps {
  attractions: Attraction[];
  restaurants: Restaurant[];
  localFood: FoodItem[];
  accommodations: Accommodation[];
}

const ATTRACTION_FILTERS = [
  { value: "all", label: "Tümü" },
  { value: "must-see", label: "Mutlaka Görün" },
  { value: "should-see", label: "Görülmeli" },
  { value: "nice-to-have", label: "Zaman Varsa" },
];

const RESTAURANT_FILTERS = [
  { value: "all", label: "Tümü" },
  { value: "budget", label: "Ekonomik" },
  { value: "mid", label: "Orta" },
  { value: "luxury", label: "Üst Segment" },
];

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
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            active === f.value
              ? "bg-kiremit text-paper"
              : "border border-ink/15 text-ink/70 hover:border-kiremit hover:text-kiremit"
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
}: {
  icon: React.ReactNode;
  title: string;
  count: number;
}) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-kiremit/10 text-kiremit">
        {icon}
      </span>
      <div>
        <h2 className="font-display text-2xl italic text-ink">{title}</h2>
        <p className="text-xs text-ink/50">{count} sonuç</p>
      </div>
    </div>
  );
}

export default function CityContentSections({
  attractions,
  restaurants,
  localFood,
  accommodations,
}: CityContentSectionsProps) {
  const [attractionFilter, setAttractionFilter] = useState("all");
  const [restaurantFilter, setRestaurantFilter] = useState("all");

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
          <SectionHeader icon={<MapPinned size={18} />} title="Gezilecek Yerler" count={filteredAttractions.length} />
          <div className="mb-6">
            <FilterButtons filters={ATTRACTION_FILTERS} active={attractionFilter} onChange={setAttractionFilter} />
          </div>
          <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredAttractions.map((a) => (
                <motion.div key={a.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <AttractionCard attraction={a} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      )}

      {restaurants.length > 0 && (
        <section>
          <SectionHeader icon={<UtensilsCrossed size={18} />} title="Nerede Yenir" count={filteredRestaurants.length} />
          <div className="mb-6">
            <FilterButtons filters={RESTAURANT_FILTERS} active={restaurantFilter} onChange={setRestaurantFilter} />
          </div>
          <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredRestaurants.map((r) => (
                <motion.div key={r.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <RestaurantCard restaurant={r} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      )}

      {localFood.length > 0 && (
        <section>
          <SectionHeader icon={<Soup size={18} />} title="Ne Yenir — Yöresel Lezzetler" count={localFood.length} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {localFood.map((f) => (
              <FoodCard key={f.id} food={f} />
            ))}
          </div>
        </section>
      )}

      {accommodations.length > 0 && (
        <section>
          <SectionHeader icon={<BedDouble size={18} />} title="Nerede Kalınır" count={accommodations.length} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {accommodations.map((a) => (
              <AccommodationCard key={a.id} accommodation={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
