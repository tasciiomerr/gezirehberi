"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { getRegion } from "@/lib/data/regions";
import { translateDataText, Locale } from "@/lib/i18n";
import { getCityImage } from "@/lib/cityImages";

interface CityHeroProps {
  city: {
    slug: string;
    name: string;
    heroTagline: string;
    region: string;
    regionSlug: string;
  };
  locale?: string;
}

export default function CityHero({ city, locale = "tr" }: CityHeroProps) {
  const regionData = getRegion(city.regionSlug);
  const colorAccent = regionData?.gradientFrom ?? "#0F5257";

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

  const bgImage = getCityImage(city.slug, city.regionSlug);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative h-96 overflow-hidden text-paper"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt={translateDataText(city.name, locale as Locale)}
          fill
          priority
          sizes="100vw"
          className="object-cover filter brightness-[0.65] contrast-[1.03]"
        />
        {/* Subtle color tint overlay reflecting the region's theme */}
        <div 
          className="absolute inset-0 opacity-15 mix-blend-color"
          style={{ backgroundColor: colorAccent }}
        />
        {/* Premium dark gradient bottom overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-transparent z-10 opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-10" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12 z-20"
      >
        <motion.p
          variants={itemVariants}
          className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-safran/20 px-4 py-2 text-xs font-bold uppercase tracking-wide text-kiremit shadow-sm"
        >
          <MapPin size={14} /> {translateDataText(city.region, locale as Locale)}
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="font-display text-4xl italic leading-tight text-paper sm:text-6xl drop-shadow-md"
        >
          {translateDataText(city.name, locale as Locale)}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-4 max-w-2xl text-lg text-paper/90 font-semibold sm:text-xl drop-shadow"
        >
          {translateDataText(city.heroTagline, locale as Locale)}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
