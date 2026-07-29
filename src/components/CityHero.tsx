"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Calendar, DollarSign, Navigation, ChevronRight } from "lucide-react";

interface CityHeroProps {
  city: {
    name: string;
    heroTagline: string;
    region: string;
    heroImage: string;
  };
}

export default function CityHero({ city }: CityHeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative h-96 overflow-hidden bg-gradient-to-b from-ink/10 to-transparent"
      style={{
        backgroundImage: `url(${city.heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-transparent" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12"
      >
        <motion.p
          variants={itemVariants}
          className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-safran/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-kiremit"
        >
          <MapPin size={14} /> {city.region}
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="font-display text-4xl italic leading-tight text-ink sm:text-6xl"
        >
          {city.name}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-4 max-w-2xl text-lg text-kiremit font-semibold sm:text-xl"
        >
          {city.heroTagline}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
