"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Footprints,
  Car,
  AlertTriangle,
  Printer,
  Copy,
  StickyNote,
  BedDouble,
  MapPin,
  UtensilsCrossed,
  ShoppingBag,
  Compass,
} from "lucide-react";
import { DayPlan, TransferBlock } from "@/lib/types";
import { TIME_SLOT_LABELS } from "@/lib/geo";
import {
  loadItineraryLocalState,
  saveItineraryLocalState,
  getMockWeather,
  ItineraryLocalState,
} from "@/lib/itineraryLocal";

const TYPE_ICON: Record<string, React.ReactNode> = {
  attraction: <MapPin size={15} />,
  dining: <UtensilsCrossed size={15} />,
  accommodation: <BedDouble size={15} />,
  shopping: <ShoppingBag size={15} />,
  activity: <Compass size={15} />,
  travel: <Car size={15} />,
};

function TransferRow({ transfer }: { transfer: TransferBlock }) {
  return (
    <div
      className={`ml-5 flex items-center gap-2 border-l-2 border-dashed py-2 pl-4 text-xs ${
        transfer.isLongTransfer ? "border-safran text-kiremit" : "border-ink/15 text-ink/50"
      }`}
    >
      {transfer.mode === "walk" ? <Footprints size={13} /> : <Car size={13} />}
      <span>
        {transfer.distanceKm} km · ~{transfer.estimatedMinutes} dk {transfer.mode === "walk" ? "yürüyüş" : "sürüş"}
      </span>
      {transfer.isLongTransfer && (
        <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-safran/20 px-2 py-0.5 font-medium">
          <AlertTriangle size={11} /> Uzun transfer
        </span>
      )}
    </div>
  );
}

function DayCard({
  plan,
  citySlug,
  isOpen,
  onToggle,
  localState,
  onToggleCheck,
  onNoteChange,
  onDuplicate,
  totalDays,
}: {
  plan: DayPlan;
  citySlug: string;
  isOpen: boolean;
  onToggle: () => void;
  localState: ItineraryLocalState;
  onToggleCheck: (day: number, order: number) => void;
  onNoteChange: (day: number, note: string) => void;
  onDuplicate: (fromDay: number, toDay: number) => void;
  totalDays: number;
}) {
  const weather = getMockWeather(citySlug, plan.day);
  const checkedCount = plan.stops.filter((s) => localState.checked[`${plan.day}-${s.order}`]).length;
  const progress = plan.stops.length > 0 ? Math.round((checkedCount / plan.stops.length) * 100) : 0;

  const grouped: Record<string, typeof plan.stops> = { morning: [], afternoon: [], evening: [] };
  plan.stops.forEach((s) => {
    const slot = s.timeSlot ?? "morning";
    grouped[slot].push(s);
  });

  const [showDuplicateMenu, setShowDuplicateMenu] = useState(false);
  const [noteValue, setNoteValue] = useState(localState.notes[plan.day] ?? "");

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-paper">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-ink/[0.02] sm:p-6"
      >
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-xl italic text-ink sm:text-2xl">
              Gün {plan.day}: {plan.title}
            </h3>
            <span className="rounded-full bg-kiremit/10 px-2.5 py-1 text-xs font-semibold text-kiremit">
              {plan.stops.length} durak
            </span>
            <span className="flex items-center gap-1 text-xs text-ink/50">
              {weather.icon} {weather.tempC}°C · {weather.condition}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink/50">
            {plan.totalWalkingKm !== undefined && plan.totalWalkingKm > 0 && (
              <span className="flex items-center gap-1">
                <Footprints size={12} /> {plan.totalWalkingKm} km yürüyüş
              </span>
            )}
            {plan.estimatedSpend && <span>💰 {plan.estimatedSpend}</span>}
            <span>⏱ {plan.totalDuration}</span>
          </div>
          <div className="mt-3 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-ink/10">
            <div
              className="h-full rounded-full bg-turkuaz transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-ink/40 flex-shrink-0">
          <ChevronDown size={20} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-ink/10 px-5 pb-6 pt-4 sm:px-6">
              <div className="mb-4 flex flex-wrap gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 text-xs font-medium text-ink/70 hover:border-kiremit hover:text-kiremit"
                >
                  <Printer size={13} /> Yazdır / PDF
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowDuplicateMenu((v) => !v)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 text-xs font-medium text-ink/70 hover:border-kiremit hover:text-kiremit"
                  >
                    <Copy size={13} /> Günü Kopyala
                  </button>
                  {showDuplicateMenu && (
                    <div className="absolute left-0 top-full z-10 mt-1 rounded-lg border border-ink/10 bg-paper p-2 shadow-lg">
                      {Array.from({ length: totalDays }, (_, i) => i + 1)
                        .filter((d) => d !== plan.day)
                        .map((d) => (
                          <button
                            key={d}
                            onClick={() => {
                              onDuplicate(plan.day, d);
                              setShowDuplicateMenu(false);
                            }}
                            className="block w-full whitespace-nowrap rounded px-3 py-1.5 text-left text-xs text-ink/70 hover:bg-kiremit/10 hover:text-kiremit"
                          >
                            Gün {d}&apos;e kopyala
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              {(["morning", "afternoon", "evening"] as const).map((slot) => {
                const stopsInSlot = grouped[slot];
                if (stopsInSlot.length === 0) return null;
                return (
                  <div key={slot} className="mb-6 last:mb-0">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="text-sm font-semibold text-deniz">
                        {TIME_SLOT_LABELS[slot].label}
                      </span>
                      <span className="text-xs text-ink/40">{TIME_SLOT_LABELS[slot].range}</span>
                    </div>
                    <div className="space-y-1">
                      {stopsInSlot.map((stop) => {
                        const isChecked = !!localState.checked[`${plan.day}-${stop.order}`];
                        const transfer = plan.transfers?.find((t) => t.fromOrder === stop.order);
                        return (
                          <div key={stop.order}>
                            <div className="flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-ink/[0.02]">
                              <button
                                onClick={() => onToggleCheck(plan.day, stop.order)}
                                className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors ${
                                  isChecked
                                    ? "border-turkuaz bg-turkuaz text-paper"
                                    : "border-ink/20 text-ink/40 hover:border-kiremit"
                                }`}
                                aria-label={isChecked ? "Tamamlandı işaretini kaldır" : "Tamamlandı işaretle"}
                              >
                                {isChecked ? "✓" : stop.order}
                              </button>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-kiremit">{TYPE_ICON[stop.type]}</span>
                                  <h4
                                    className={`font-semibold text-ink ${
                                      isChecked ? "line-through text-ink/40" : ""
                                    }`}
                                  >
                                    {stop.title}
                                  </h4>
                                </div>
                                {stop.description && (
                                  <p className={`mt-1 text-sm text-ink/60 ${isChecked ? "line-through" : ""}`}>
                                    {stop.description}
                                  </p>
                                )}
                                <p className="mt-1 text-xs text-ink/40">⏱ {stop.duration}</p>
                              </div>
                            </div>
                            {transfer && <TransferRow transfer={transfer} />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              <div className="mt-4 rounded-lg border border-ink/10 bg-ink/[0.02] p-3">
                <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-ink/60">
                  <StickyNote size={13} /> Gün Notları (bilet PNR, rezervasyon adı, hatırlatma...)
                </label>
                <textarea
                  value={noteValue}
                  onChange={(e) => setNoteValue(e.target.value)}
                  onBlur={() => onNoteChange(plan.day, noteValue)}
                  placeholder="Örn: Uçak bileti PNR ABC123, otel rezervasyon adı Yılmaz..."
                  className="w-full resize-none rounded-md border border-ink/10 bg-paper p-2 text-sm text-ink placeholder:text-ink/30 focus:border-kiremit focus:outline-none"
                  rows={2}
                />
              </div>

              {plan.notes && (
                <p className="mt-3 rounded-lg bg-safran/10 p-3 text-sm text-ink/70">💡 {plan.notes}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ItineraryTimeline({
  citySlug,
  days,
  dayPlans,
}: {
  citySlug: string;
  days: number;
  dayPlans: DayPlan[];
}) {
  // Not: bu bileşen üst bileşende `key={selectedDays}` ile sarmalandığı için
  // gün sayısı değiştiğinde tamamen yeniden mount edilir, ayrıca senkronizasyona gerek yok.
  const [openDay, setOpenDay] = useState<number>(1);
  const [localState, setLocalState] = useState<ItineraryLocalState>({ checked: {}, notes: {} });
  const [plans, setPlans] = useState<DayPlan[]>(dayPlans);

  useEffect(() => {
    // localStorage okuması mount sonrası yapılıyor (SSR uyumsuzluğunu önlemek için)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalState(loadItineraryLocalState(citySlug, days));
  }, [citySlug, days]);

  const persist = useCallback(
    (next: ItineraryLocalState) => {
      setLocalState(next);
      saveItineraryLocalState(citySlug, days, next);
    },
    [citySlug, days]
  );

  const handleToggleCheck = (day: number, order: number) => {
    const key = `${day}-${order}`;
    persist({
      ...localState,
      checked: { ...localState.checked, [key]: !localState.checked[key] },
    });
  };

  const handleNoteChange = (day: number, note: string) => {
    persist({ ...localState, notes: { ...localState.notes, [day]: note } });
  };

  const handleDuplicate = (fromDay: number, toDay: number) => {
    const source = plans.find((p) => p.day === fromDay);
    if (!source) return;
    setPlans((prev) =>
      prev.map((p) =>
        p.day === toDay
          ? { ...p, stops: source.stops.map((s) => ({ ...s })), transfers: source.transfers, title: `${source.title} (kopya)` }
          : p
      )
    );
  };

  const overallProgress = useMemo(() => {
    const totalStops = plans.reduce((sum, p) => sum + p.stops.length, 0);
    const totalChecked = plans.reduce(
      (sum, p) => sum + p.stops.filter((s) => localState.checked[`${p.day}-${s.order}`]).length,
      0
    );
    return totalStops > 0 ? Math.round((totalChecked / totalStops) * 100) : 0;
  }, [plans, localState]);

  return (
    <div className="print-itinerary">
      <div className="mb-4 flex items-center justify-between rounded-xl bg-deniz/5 px-4 py-3">
        <span className="text-sm font-medium text-deniz">Genel ilerleme</span>
        <div className="flex items-center gap-2">
          <div className="h-2 w-32 overflow-hidden rounded-full bg-ink/10">
            <div
              className="h-full rounded-full bg-turkuaz transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-deniz">{overallProgress}%</span>
        </div>
      </div>

      <div className="space-y-4">
        {plans.map((plan) => (
          <DayCard
            key={plan.day}
            plan={plan}
            citySlug={citySlug}
            isOpen={openDay === plan.day}
            onToggle={() => setOpenDay(openDay === plan.day ? -1 : plan.day)}
            localState={localState}
            onToggleCheck={handleToggleCheck}
            onNoteChange={handleNoteChange}
            onDuplicate={handleDuplicate}
            totalDays={days}
          />
        ))}
      </div>
    </div>
  );
}
