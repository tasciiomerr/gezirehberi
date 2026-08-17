import { Wallet, Info } from "lucide-react";
import { estimateTiers, formatTL } from "@/lib/budgetTiers";

interface BudgetTierTableProps {
  budgetBreakdown: {
    accommodation: string;
    food: string;
    activities: string;
    transport: string;
  };
  locale: string;
  title: string;
}

const CATEGORY_KEYS = ["accommodation", "food", "activities", "transport"] as const;

const CATEGORY_LABELS: Record<string, Record<(typeof CATEGORY_KEYS)[number], string>> = {
  tr: { accommodation: "Konaklama", food: "Yemek", activities: "Aktivite", transport: "Ulaşım" },
  en: { accommodation: "Accommodation", food: "Food", activities: "Activities", transport: "Transport" },
  de: { accommodation: "Unterkunft", food: "Essen", activities: "Aktivitäten", transport: "Transport" },
  ar: { accommodation: "الإقامة", food: "الطعام", activities: "الأنشطة", transport: "النقل" },
  ru: { accommodation: "Проживание", food: "Еда", activities: "Активности", transport: "Транспорт" },
};

const TIER_LABELS = {
  budget: { tr: "Bütçe", en: "Budget", de: "Budget", ar: "اقتصادي", ru: "Бюджетный" },
  mid: { tr: "Orta", en: "Mid-range", de: "Mittelklasse", ar: "متوسط", ru: "Средний" },
  luxury: { tr: "Lüks", en: "Luxury", de: "Luxus", ar: "فاخر", ru: "Люкс" },
};

const FOOTNOTE = {
  tr: "\"Bütçe\" ve \"Lüks\" değerleri, bu şehir için curated \"Orta\" segment rakamlarından matematiksel olarak türetilmiş tahminlerdir — ayrı bir kaynağa dayanmaz.",
  en: '"Budget" and "Luxury" figures are mathematical estimates derived from this city\'s curated "Mid-range" numbers — not independently sourced.',
  de: '"Budget"- und "Luxus"-Werte sind mathematische Schätzungen, die aus den kuratierten "Mittelklasse"-Zahlen dieser Stadt abgeleitet wurden — nicht unabhängig recherchiert.',
  ar: 'قيم "اقتصادي" و"فاخر" هي تقديرات رياضية مشتقة من أرقام "متوسط" المنسقة لهذه المدينة — وليست من مصدر مستقل.',
  ru: 'Значения «Бюджетный» и «Люкс» — это математические оценки, полученные из курируемых цифр «Среднего» сегмента для этого города, а не из отдельного источника.',
};

export default function BudgetTierTable({ budgetBreakdown, locale, title }: BudgetTierTableProps) {
  const labels = CATEGORY_LABELS[locale] || CATEGORY_LABELS.tr;
  const tierLabel = (tier: keyof typeof TIER_LABELS) =>
    (TIER_LABELS[tier] as Record<string, string>)[locale] || TIER_LABELS[tier].tr;
  const footnote = (FOOTNOTE as Record<string, string>)[locale] || FOOTNOTE.tr;

  return (
    <div className="rounded-xl border border-ink/10 bg-paper p-5 shadow-sm">
      <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-kiremit">
        <Wallet size={15} /> {title}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-left text-xs font-bold uppercase tracking-wider text-ink/65">
              <th className="py-2 pr-3"></th>
              <th className="py-2 px-3">{tierLabel("budget")}</th>
              <th className="py-2 px-3 text-kiremit">{tierLabel("mid")}</th>
              <th className="py-2 px-3">{tierLabel("luxury")}</th>
            </tr>
          </thead>
          <tbody>
            {CATEGORY_KEYS.map((key) => {
              const midText = budgetBreakdown[key];
              const tiers = estimateTiers(midText);
              return (
                <tr key={key} className="border-b border-ink/5 last:border-0">
                  <td className="py-2.5 pr-3 text-xs font-bold text-ink/75">{labels[key]}</td>
                  <td className="py-2.5 px-3 text-ink/70">{tiers ? formatTL(tiers.budget) : "—"}</td>
                  <td className="py-2.5 px-3 font-semibold text-ink">{midText}</td>
                  <td className="py-2.5 px-3 text-ink/70">{tiers ? formatTL(tiers.luxury) : "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 flex items-start gap-1.5 text-[11px] text-ink/55 leading-relaxed">
        <Info size={12} className="mt-0.5 shrink-0" /> {footnote}
      </p>
    </div>
  );
}
