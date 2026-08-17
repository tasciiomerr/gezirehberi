"use client";

import { useState, useEffect, useCallback } from "react";
import { Users, Plus, Compass, Loader2, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchCommunityRoutes, CommunityRoute } from "@/lib/communityApi";
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
  const [routes, setRoutes] = useState<CommunityRoute[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);

  const loadRoutes = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    const res = await fetchCommunityRoutes(city.slug);
    setRoutes(res.routes);
    if (res.error) setLoadError(res.error);
    setIsLoading(false);
  }, [city.slug]);

  useEffect(() => {
    loadRoutes();
  }, [loadRoutes]);

  const handlePublish = (newRoute: CommunityRoute) => {
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
            <p className="text-xs text-ink/65 font-semibold">
              {isLoading
                ? locale === "tr" ? "Yükleniyor..." : "Loading..."
                : `${routes.length} ${locale === "tr" ? "rota paylaşıldı" : "itineraries shared"}`}
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
      {isLoading ? (
        <div className="flex items-center justify-center gap-2 rounded-xl border border-ink/10 p-10 text-sm font-semibold text-ink/65">
          <Loader2 size={16} className="animate-spin" />
          {locale === "tr" ? "Rotalar yükleniyor..." : "Loading routes..."}
        </div>
      ) : loadError ? (
        <div className="rounded-xl border border-dashed border-kiremit/30 bg-kiremit/5 p-8 text-center">
          <p className="text-xs text-kiremit font-semibold mb-3">
            {locale === "tr" ? "Rotalar yüklenemedi." : "Couldn't load routes."} ({loadError})
          </p>
          <button
            onClick={loadRoutes}
            className="inline-flex items-center gap-1 rounded-full border border-kiremit/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-kiremit hover:bg-kiremit/5 transition-colors focus:outline-none"
          >
            <RefreshCw size={12} /> {locale === "tr" ? "Tekrar dene" : "Retry"}
          </button>
        </div>
      ) : routes.length === 0 ? (
        <div className="rounded-xl border border-dashed border-ink/20 p-8 text-center bg-paper/30">
          <p className="text-xs text-ink/65 font-semibold mb-3">
            {locale === "tr" ? "Bu şehir için henüz paylaşılan rota yok, ilk sen ol!" : "No routes shared for this city yet — be the first!"}
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
