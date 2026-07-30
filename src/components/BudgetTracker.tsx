"use client";

import { useState, useEffect } from "react";
import { Wallet, ChevronDown, Landmark, Utensils, Car, BedDouble } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getDictionary, Locale } from "@/lib/i18n";

export interface DayBudget {
  accommodation: number;
  food: number;
  tickets: number;
  transport: number;
}

interface BudgetTrackerProps {
  citySlug: string;
  day: number;
  locale: string;
  onBudgetChange: (day: number, budget: DayBudget) => void;
  initialBudget: DayBudget;
}

export default function BudgetTracker({
  citySlug,
  day,
  locale,
  onBudgetChange,
  initialBudget,
}: BudgetTrackerProps) {
  const dict = getDictionary(locale as Locale);
  const [isOpen, setIsOpen] = useState(false);
  const [budget, setBudget] = useState<DayBudget>(initialBudget);

  useEffect(() => {
    setBudget(initialBudget);
  }, [initialBudget]);

  const handleChange = (field: keyof DayBudget, value: string) => {
    const num = Math.max(0, parseInt(value) || 0);
    const updated = { ...budget, [field]: num };
    setBudget(updated);
    onBudgetChange(day, updated);
  };

  const total = budget.accommodation + budget.food + budget.tickets + budget.transport;

  const categories = [
    { field: "accommodation" as const, label: dict.city.whereToStay, icon: <BedDouble size={14} />, color: "bg-kiremit", textColor: "text-kiremit" },
    { field: "food" as const, label: dict.city.whereToEat, icon: <Utensils size={14} />, color: "bg-safran", textColor: "text-safran" },
    { field: "tickets" as const, label: dict.city.attractions, icon: <Landmark size={14} />, color: "bg-deniz", textColor: "text-deniz" },
    { field: "transport" as const, label: dict.city.transit, icon: <Car size={14} />, color: "bg-turkuaz", textColor: "text-turkuaz" },
  ];

  return (
    <div className="rounded-xl border border-ink/10 bg-paper/60 backdrop-blur-sm shadow-sm overflow-hidden mt-4">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between p-4 font-semibold text-xs uppercase tracking-wider text-ink/75 hover:bg-ink/[0.02] transition-colors"
      >
        <span className="flex items-center gap-2">
          <Wallet size={15} className="text-kiremit" />
          {dict.city.budgetTracker}: <span className="font-bold text-kiremit">{total} ₺</span>
        </span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-ink/40">
          <ChevronDown size={16} />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-ink/10"
          >
            <div className="p-4 space-y-4">
              {/* Premium Segmented Bar */}
              {total > 0 && (
                <div className="h-2 w-full overflow-hidden rounded-full bg-ink/5 flex">
                  {categories.map((cat) => {
                    const value = budget[cat.field];
                    if (value === 0) return null;
                    const pct = (value / total) * 100;
                    return (
                      <div
                        key={cat.field}
                        className={`${cat.color} h-full transition-all duration-500`}
                        style={{ width: `${pct}%` }}
                        title={`${cat.label}: ${value} ₺`}
                      />
                    );
                  })}
                </div>
              )}

              {/* Input Grid */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {categories.map((cat) => (
                  <div key={cat.field} className="space-y-1.5">
                    <label className={`flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider ${cat.textColor}`}>
                      {cat.icon}
                      {cat.field === "accommodation" ? (locale === "tr" ? "Otel" : locale === "de" ? "Hotel" : locale === "ar" ? "فندق" : "Hotel") :
                       cat.field === "food" ? (locale === "tr" ? "Yemek" : locale === "de" ? "Essen" : locale === "ar" ? "طعام" : "Food") :
                       cat.field === "tickets" ? (locale === "tr" ? "Bilet" : locale === "de" ? "Ticket" : locale === "ar" ? "تذكرة" : "Ticket") :
                       (locale === "tr" ? "Ulaşım" : locale === "de" ? "Transit" : locale === "ar" ? "مواصلات" : "Transit")}
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="number"
                        min="0"
                        value={budget[cat.field] || ""}
                        onChange={(e) => handleChange(cat.field, e.target.value)}
                        placeholder="0"
                        className="w-full rounded-lg border border-ink/10 bg-paper px-2 py-1.5 pr-6 text-sm text-ink focus:border-kiremit focus:outline-none"
                      />
                      <span className="absolute right-2 text-xs font-bold text-ink/30">₺</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
