"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { Locale } from "@/lib/i18n";

interface DurationSelectorProps {
  onSelect: (days: number) => void;
  selected: number;
}

export default function DurationSelector({ onSelect, selected }: DurationSelectorProps) {
  const params = useParams();
  const locale = (params?.locale || "tr") as Locale;

  const durations = [
    {
      days: 1,
      label: locale === "tr" ? "1 Gün" : locale === "de" ? "1 Tag" : locale === "ar" ? "١ يوم" : "1 Day",
      description: locale === "tr" ? "Kısa ziyaret" : locale === "de" ? "Kurzbesuch" : locale === "ar" ? "زيارة قصيرة" : "Short visit",
    },
    {
      days: 2,
      label: locale === "tr" ? "2 Gün" : locale === "de" ? "2 Tage" : locale === "ar" ? "٢ يوم" : "2 Days",
      description: locale === "tr" ? "Hafta sonu" : locale === "de" ? "Wochenende" : locale === "ar" ? "عطلة الأسبوع" : "Weekend",
    },
    {
      days: 3,
      label: locale === "tr" ? "3 Gün" : locale === "de" ? "3 Tage" : locale === "ar" ? "٣ يوم" : "3 Days",
      description: locale === "tr" ? "Uzun hafta sonu" : locale === "de" ? "Langes Wochenende" : locale === "ar" ? "عطلة طويلة" : "Long weekend",
    },
    {
      days: 5,
      label: locale === "tr" ? "5 Gün" : locale === "de" ? "5 Tage" : locale === "ar" ? "٥ يوم" : "5 Days",
      description: locale === "tr" ? "Kısa tur" : locale === "de" ? "Kurzreise" : locale === "ar" ? "جولة قصيرة" : "Short tour",
    },
    {
      days: 7,
      label: locale === "tr" ? "1 Hafta" : locale === "de" ? "1 Woche" : locale === "ar" ? "١ أسبوع" : "1 Week",
      description: locale === "tr" ? "Tam tecrübe" : locale === "de" ? "Volles Erlebnis" : locale === "ar" ? "تجربة كاملة" : "Full experience",
    },
    {
      days: 14,
      label: locale === "tr" ? "2 Hafta" : locale === "de" ? "2 Wochen" : locale === "ar" ? "٢ أسبوع" : "2 Weeks",
      description: locale === "tr" ? "Derinlemesine" : locale === "de" ? "Ausgiebig" : locale === "ar" ? "استكشاف عميق" : "In-depth",
    },
  ];

  const titleText = locale === "tr"
    ? "Kaç Gün Kalacaksınız?"
    : locale === "de"
    ? "Wie lange bleiben Sie?"
    : locale === "ar"
    ? "كم يوماً ستقيم؟"
    : "How Many Days Will You Stay?";

  const descText = locale === "tr"
    ? "Kalış sürenize göre ideal bir rota hazırlarız."
    : locale === "de"
    ? "Wir erstellen eine ideale Route basierend auf Ihrer Aufenthaltsdauer."
    : locale === "ar"
    ? "سنقوم بإعداد مسار مثالي بناءً على مدة إقامتك."
    : "We create an ideal route based on your length of stay.";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl italic text-ink mb-2">{titleText}</h2>
        <p className="text-sm text-ink/70 leading-normal">{descText}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {durations.map((duration) => (
          <motion.button
            key={duration.days}
            onClick={() => onSelect(duration.days)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`group relative rounded-xl p-4 transition-all duration-300 ${
              selected === duration.days
                ? "bg-kiremit text-paper shadow-lg scale-105 font-semibold"
                : "border border-ink/10 bg-paper text-ink hover:border-kiremit hover:shadow-sm"
            }`}
          >
            <div className="font-bold text-base">{duration.label}</div>
            <div className={`text-[10px] uppercase font-bold tracking-wider mt-1.5 ${
              selected === duration.days ? "text-paper/80" : "text-ink/65"
            }`}>
              {duration.description}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
