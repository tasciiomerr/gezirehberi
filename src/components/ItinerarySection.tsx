"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import DurationSelector from "./DurationSelector";
import { DayPlanCard } from "./ItineraryDisplay";
import { generateItinerary } from "@/lib/itinerary";
import { City } from "@/lib/types";

export default function ItinerarySection({ city }: { city: City }) {
  const [selectedDays, setSelectedDays] = useState(3);

  const itinerary = useMemo(() => generateItinerary(city, selectedDays), [city, selectedDays]);

  return (
    <div>
      <div className="mb-10 rounded-xl border border-ink/10 bg-gradient-to-b from-ink/5 to-transparent p-6 sm:p-8">
        <DurationSelector selected={selectedDays} onSelect={setSelectedDays} />
      </div>

      <motion.div
        key={selectedDays}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <div>
          <h2 className="font-display text-3xl italic text-ink mb-2">{itinerary.title}</h2>
          <p className="text-ink/70">{itinerary.summary}</p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-safran/20 px-3 py-1 text-kiremit font-medium">
              💰 {itinerary.budgetPerPerson}
            </span>
            <span className="rounded-full bg-turkuaz/10 px-3 py-1 text-deniz font-medium">
              📅 En iyi zaman: {itinerary.bestSeason}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {itinerary.dayPlans.map((plan) => (
            <DayPlanCard
              key={plan.day}
              day={plan.day}
              title={plan.title}
              stops={plan.stops.map((s) => ({
                order: s.order,
                title: s.title,
                type: s.type as "attraction" | "dining" | "accommodation",
                duration: s.duration,
              }))}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
