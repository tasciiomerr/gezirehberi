"use client";

import { useState, useEffect } from "react";
import { Users, Plus, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getUserRoutes, SocialRoute, initializeSocialDB } from "@/lib/socialDb";
import { getDictionary, Locale } from "@/lib/i18n";
import { City } from "@/lib/types";
import UserRouteCard from "./UserRouteCard";
import RouteBuilder from "./RouteBuilder";

interface CommunityRoutesProps {
  city: City;
  locale: string;
}

export default function CommunityRoutes({ city, locale }: CommunityRoutesProps) {
  const dict = getDictionary(locale as Locale);
  const [routes, setRoutes] = useState<SocialRoute[]>([]);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);

  useEffect(() => {
    initializeSocialDB();
    setRoutes(getUserRoutes(city.slug));
  }, [city.slug]);

  const handlePublish = (newRoute: SocialRoute) => {
    setRoutes((prev) => [newRoute, ...prev]);
    setIsBuilderOpen(false);
  };

  const handleCreateClick = () => {
    setIsBuilderOpen(true);
  };

  return (
    <div className="mt-16 border-t border-ink/10 pt-16 no-print">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-kiremit/10 text-kiremit shadow-sm">
            <Users size={18} />
          </span>
          <div>
            <h3 className="font-display text-2xl italic text-ink">
              {locale === "tr" ? "Gezginlerin Paylaştığı Rotalar" : "Gezgin Community Rotaları"}
            </h3>
            <p className="text-xs text-ink/45 font-semibold">
              {routes.length} {locale === "tr" ? "rota paylaşıldı" : "itineraries shared"}
            </p>
          </div>
        </div>

        {!isBuilderOpen && (
          <button
            onClick={handleCreateClick}
            className="flex items-center gap-1.5 rounded-full bg-kiremit px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-paper shadow-md hover:bg-ink hover:scale-105 transition-all focus:outline-none"
          >
            <Plus size={14} />
            {locale === "tr" ? "Kendi Rotanı Paylaş" : "Share Your Route"}
          </button>
        )}
      </div>

      {/* Custom Route Builder Wizard */}
      <AnimatePresence>
        {isBuilderOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8"
          >
            <RouteBuilder
              city={city}
              locale={locale}
              onPublish={handlePublish}
              onClose={() => setIsBuilderOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shared Community Routes Feed */}
      {routes.length === 0 ? (
        <div className="rounded-xl border border-dashed border-ink/20 p-8 text-center bg-paper/30">
          <p className="text-xs text-ink/50 font-semibold mb-3">
            {locale === "tr" ? "Bu şehir için henüz bir kullanıcı rotası paylaşılmamış." : "No user itineraries shared for this city yet."}
          </p>
          <button
            onClick={handleCreateClick}
            className="inline-flex items-center gap-1 rounded-full border border-kiremit/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-kiremit hover:bg-kiremit/5 transition-colors focus:outline-none"
          >
            <Plus size={12} /> {locale === "tr" ? "İlk sen paylaş!" : "Share the first one!"}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {routes.map((route) => (
            <UserRouteCard key={route.id} route={route} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
