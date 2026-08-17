import { Plane, Bus, Train, Car } from "lucide-react";
import { Locale, translateDataText } from "@/lib/i18n";

interface ArrivalOptionsTableProps {
  howToArrive: {
    byAir?: string;
    byBus?: string;
    byTrain?: string;
    byCar?: string;
  };
  locale: string;
  title: string;
}

const MODE_ICONS = {
  byAir: Plane,
  byBus: Bus,
  byTrain: Train,
  byCar: Car,
} as const;

// city.howToArrive zaten curated bir alan ama hiçbir yerde render edilmiyordu
// (parça 1, madde 1 follow-up) — sadece serbest metin howToGetThere
// gösteriliyordu. Bu, var olan aynı veriyi mod bazlı bir tabloya çeviriyor;
// yeni bir maliyet/süre rakamı EKLEMİYOR (curated veride o alan yok, uydurmak
// veri-dürüstlüğü ilkesini ihlal eder) — sadece zaten yazılmış metni
// (ör. "Zonguldak Çaycuma Havalimanı'ndan 100 km") düzenli bir tabloda
// gösteriyor.
export default function ArrivalOptionsTable({ howToArrive, locale, title }: ArrivalOptionsTableProps) {
  const modeLabels: Record<keyof typeof MODE_ICONS, string> = {
    byAir: locale === "tr" ? "Uçakla" : locale === "de" ? "Mit dem Flugzeug" : locale === "ar" ? "بالطائرة" : locale === "ru" ? "Самолётом" : "By Air",
    byBus: locale === "tr" ? "Otobüsle" : locale === "de" ? "Mit dem Bus" : locale === "ar" ? "بالحافلة" : locale === "ru" ? "Автобусом" : "By Bus",
    byTrain: locale === "tr" ? "Trenle" : locale === "de" ? "Mit dem Zug" : locale === "ar" ? "بالقطار" : locale === "ru" ? "Поездом" : "By Train",
    byCar: locale === "tr" ? "Arabayla" : locale === "de" ? "Mit dem Auto" : locale === "ar" ? "بالسيارة" : locale === "ru" ? "Автомобилем" : "By Car",
  };

  const entries = (Object.keys(MODE_ICONS) as (keyof typeof MODE_ICONS)[])
    .map((mode) => ({ mode, text: howToArrive[mode] }))
    .filter((e): e is { mode: keyof typeof MODE_ICONS; text: string } => !!e.text);

  if (entries.length === 0) return null;

  return (
    <div className="rounded-xl border border-ink/10 bg-paper p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-kiremit">{title}</h3>
      <div className="space-y-3">
        {entries.map(({ mode, text }) => {
          const Icon = MODE_ICONS[mode];
          return (
            <div key={mode} className="flex items-start gap-3 border-b border-ink/5 pb-3 last:border-0 last:pb-0">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-kiremit/10 text-kiremit">
                <Icon size={15} />
              </span>
              <div>
                <p className="text-xs font-bold text-ink/75">{modeLabels[mode]}</p>
                <p className="text-sm text-ink/70 leading-relaxed">{translateDataText(text, locale as Locale)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
