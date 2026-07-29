"use client";

import { motion } from "framer-motion";
import { Calendar, Tag } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import { FoodItem } from "@/lib/types";

export default function FoodCard({ food }: { food: FoodItem }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-xl border border-ink/10 bg-paper transition-shadow hover:shadow-lg"
    >
      <PlaceholderImage seed={food.id} aspect="square" />
      <div className="p-4">
        <h3 className="font-display text-lg italic text-ink group-hover:text-kiremit transition-colors">
          {food.name}
        </h3>
        <p className="mt-1.5 text-sm text-ink/70 line-clamp-3">{food.description}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {food.ingredients.slice(0, 4).map((ing) => (
            <span key={ing} className="rounded-full bg-ink/5 px-2.5 py-1 text-xs text-ink/60">
              {ing}
            </span>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-ink/50">
          <span className="flex items-center gap-1">
            <Calendar size={12} /> {food.bestSeason}
          </span>
          <span className="flex items-center gap-1 font-semibold text-kiremit">
            <Tag size={12} /> {food.priceRange}
          </span>
        </div>

        {food.tips && (
          <p className="mt-3 rounded-lg bg-turkuaz/10 p-2.5 text-xs text-ink/70">
            💡 {food.tips}
          </p>
        )}
      </div>
    </motion.div>
  );
}
