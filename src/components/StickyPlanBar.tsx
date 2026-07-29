"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays } from "lucide-react";

export default function StickyPlanBar({ cityName }: { cityName: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToItinerary = () => {
    const el = document.getElementById("itinerary-section");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-ink/10 bg-paper/95 p-3 backdrop-blur sm:hidden"
        >
          <button
            onClick={scrollToItinerary}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-kiremit px-6 py-3.5 text-sm font-semibold text-paper shadow-lg"
          >
            <CalendarDays size={18} />
            {cityName} için Rota Oluştur
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
