"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, UtensilsCrossed, Building2 } from "lucide-react";

interface DayPlanProps {
  day: number;
  title: string;
  stops: Array<{
    order: number;
    title: string;
    type: "attraction" | "dining" | "accommodation";
    duration: string;
  }>;
}

export function DayPlanCard({ day, title, stops }: DayPlanProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "attraction":
        return <MapPin size={18} />;
      case "dining":
        return <UtensilsCrossed size={18} />;
      case "accommodation":
        return <Building2 size={18} />;
      default:
        return <Clock size={18} />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "attraction":
        return "text-turkuaz";
      case "dining":
        return "text-safran";
      case "accommodation":
        return "text-kiremit";
      default:
        return "text-ink/50";
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl border border-ink/10 bg-gradient-to-br from-paper to-ink/5 p-8 backdrop-blur-sm"
    >
      <motion.div
        variants={itemVariants}
        className="mb-6 flex items-center justify-between border-b border-ink/10 pb-4"
      >
        <h3 className="font-display text-2xl italic text-ink">
          Gün {day}: {title}
        </h3>
        <div className="rounded-full bg-kiremit/20 px-3 py-1 text-sm font-semibold text-kiremit">
          {stops.length} durak
        </div>
      </motion.div>

      <motion.div variants={containerVariants} className="space-y-4">
        {stops.map((stop) => (
          <motion.div
            key={stop.order}
            variants={itemVariants}
            className="flex gap-4"
          >
            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-kiremit text-paper font-semibold text-sm">
                {stop.order}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className={`${getColor(stop.type)}`}>
                  {getIcon(stop.type)}
                </span>
                <h4 className="font-semibold text-ink">{stop.title}</h4>
              </div>
              <p className="mt-1 text-sm text-ink/60">⏱ {stop.duration}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

interface ItineraryDisplayProps {
  days: number;
  plans: DayPlanProps[];
}

export default function ItineraryDisplay({ days, plans }: ItineraryDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
      className="space-y-6"
    >
      <div>
        <h2 className="font-display text-3xl italic text-ink mb-2">
          {days} Gün İtinerary
        </h2>
        <p className="text-ink/70">
          Her gün için optimize edilmiş plan, duraklar, yemekler ve zamanlamalar.
        </p>
      </div>

      <div className="space-y-6">
        {plans.map((plan) => (
          <DayPlanCard key={plan.day} {...plan} />
        ))}
      </div>
    </motion.div>
  );
}
