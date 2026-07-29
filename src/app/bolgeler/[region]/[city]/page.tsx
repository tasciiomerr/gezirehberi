"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import CityHero from "@/components/CityHero";
import DurationSelector from "@/components/DurationSelector";
import ItineraryDisplay from "@/components/ItineraryDisplay";
import { getCityComprehensive } from "@/lib/data/comprehensive/karadeniz";

export default function CityDetailPage({ params }: { params: Promise<{ city: string; region: string }> }) {
  const [selectedDays, setSelectedDays] = useState(3);
  
  // Async params handling - we''ll use a simpler approach
  const testCity = getCityComprehensive("amasra");

  if (!testCity) {
    return (
      <div className="text-center py-20">
        <p className="text-ink/70">Şehir bulunamadı</p>
      </div>
    );
  }

  // Mock itineraries for different durations
  const mockItineraries = {
    1: [
      {
        day: 1,
        title: "Kale & Liman",
        stops: [
          { order: 1, title: "Kahvaltı", type: "dining" as const, duration: "1 saat" },
          { order: 2, title: "Amasra Kalesi", type: "attraction" as const, duration: "2 saat" },
          { order: 3, title: "Öğle Balık Çorbası", type: "dining" as const, duration: "1.5 saat" },
          { order: 4, title: "Küçük Liman Yürüyüş", type: "attraction" as const, duration: "1 saat" },
          { order: 5, title: "Gün Batımında Akşam Yemeği", type: "dining" as const, duration: "2 saat" },
        ],
      },
    ],
    3: [
      {
        day: 1,
        title: "Kale & Liman",
        stops: [
          { order: 1, title: "Amasra Kalesi", type: "attraction" as const, duration: "2 saat" },
          { order: 2, title: "Öğle Balık Çorbası", type: "dining" as const, duration: "1.5 saat" },
          { order: 3, title: "Küçük Liman", type: "attraction" as const, duration: "2 saat" },
          { order: 4, title: "Akşam Yemeği", type: "dining" as const, duration: "2 saat" },
        ],
      },
      {
        day: 2,
        title: "Tarihi Keşif",
        stops: [
          { order: 1, title: "Kahvaltı", type: "dining" as const, duration: "1 saat" },
          { order: 2, title: "Tavşan Adası", type: "attraction" as const, duration: "3 saat" },
          { order: 3, title: "Öğle Yemeği", type: "dining" as const, duration: "1.5 saat" },
          { order: 4, title: "Çarşı Gezisi", type: "attraction" as const, duration: "2 saat" },
          { order: 5, title: "Akşam Yemeği", type: "dining" as const, duration: "2 saat" },
        ],
      },
      {
        day: 3,
        title: "Doğa & Relaksasyon",
        stops: [
          { order: 1, title: "Sabah Balıkçılarını İzleme", type: "attraction" as const, duration: "2 saat" },
          { order: 2, title: "Kahvaltı", type: "dining" as const, duration: "1 saat" },
          { order: 3, title: "Denizde Yüzme", type: "attraction" as const, duration: "2 saat" },
          { order: 4, title: "Öğle Yemeği", type: "dining" as const, duration: "1.5 saat" },
          { order: 5, title: "Pazar: Rahatlama", type: "dining" as const, duration: "3 saat" },
        ],
      },
    ],
  };

  const currentItinerary = mockItineraries[selectedDays as keyof typeof mockItineraries] || mockItineraries[3];

  return (
    <div>
      <CityHero city={testCity} />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Link
          href={`/bolgeler/${testCity.regionSlug}`}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 text-sm font-semibold text-ink hover:border-kiremit hover:text-kiremit transition-colors"
        >
          <ArrowLeft size={16} /> Geri
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3"
        >
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl italic text-ink mb-4">Hakkında</h2>
            <p className="text-base text-ink/70 leading-relaxed mb-6">
              {testCity.longDescription}
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { label: "En İyi Zaman", value: testCity.whenToGo },
                { label: "Ulaşım", value: testCity.howToGetThere },
                { label: "Bütçe", value: testCity.budget },
                { label: "İdeal Süre", value: testCity.bestDuration },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-lg border border-ink/10 bg-paper p-4 hover:border-kiremit/50"
                >
                  <div className="text-xs font-semibold uppercase tracking-wide text-kiremit mb-1">
                    {item.label}
                  </div>
                  <p className="text-sm text-ink/80">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-xl border border-ink/10 bg-gradient-to-br from-safran/10 to-kiremit/5 p-6"
          >
            <div className="space-y-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-kiremit mb-2">
                  Konum
                </div>
                <div className="flex items-center gap-2 text-sm text-ink/80">
                  <MapPin size={16} className="text-kiremit" />
                  {testCity.region}
                </div>
              </div>
              <div className="border-t border-ink/10 pt-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-kiremit mb-3">
                  Hızlı İstatistikler
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-ink/70">🏨 5+ Konaklama Seçeneği</p>
                  <p className="text-ink/70">🍽️ 15+ Restaurant</p>
                  <p className="text-ink/70">📍 10+ Gezilecek Yer</p>
                  <p className="text-ink/70">🍴 12+ Yöresel Yemek</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="mb-16 rounded-xl border border-ink/10 bg-gradient-to-b from-ink/5 to-transparent p-8">
          <DurationSelector selected={selectedDays} onSelect={setSelectedDays} />
        </div>

        <ItineraryDisplay days={selectedDays} plans={currentItinerary} />
      </div>
    </div>
  );
}
