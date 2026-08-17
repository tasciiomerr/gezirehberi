// city.budgetBreakdown zaten curated, gerçek bir "orta segment" rakamı —
// ama sadece tek bir katman. "Bütçe" ve "Lüks" katmanları için yeni bir
// rakam UYDURMAK yerine (veri-dürüstlüğü ilkesini ihlal eder), bu curated
// rakamlardan matematiksel olarak türetilmiş, açıkça "tahmini" etiketli bir
// projeksiyon üretiyoruz — gerçek bir kaynağa dayanmayan hiçbir sayı yok,
// sadece var olan sayının ölçeklenmesi var.
// Sadece "TL" ile doğrudan ilişkili sayıları hedefler — "2 yıldız (otel)"
// veya "3+ yıldız" gibi ifadelerdeki sayıları fiyat sanıp min/max'ı bozmasın
// diye (ör. "400-600 TL (2 yıldız) - 800-1.200 TL (3+ yıldız)" metninde "2"
// ve "3" birer yıldız derecesi, fiyat değil).
const TL_NUMBER_RE = /(\d{1,3}(?:\.\d{3})*)\s*(?:-\s*(\d{1,3}(?:\.\d{3})*)\s*)?TL/g;

function parseNumbers(text: string): number[] {
  const numbers: number[] = [];
  let match: RegExpExecArray | null;
  TL_NUMBER_RE.lastIndex = 0;
  while ((match = TL_NUMBER_RE.exec(text))) {
    for (const group of [match[1], match[2]]) {
      if (!group) continue;
      const n = parseInt(group.replace(/\./g, ""), 10);
      if (!isNaN(n) && n > 0) numbers.push(n);
    }
  }
  return numbers;
}

export interface TierEstimate {
  min: number;
  max: number;
}

const BUDGET_FACTOR = 0.6;
const LUXURY_FACTOR = 1.8;

// Yuvarlama adımı değerin büyüklüğüne göre ölçekleniyor (küçük rakamlarda
// 50'lik adım 10 TL'yi 0'a yuvarlayabiliyordu) — ve sonuç her zaman en az
// 10 TL olacak şekilde taban konuyor, asla 0 veya negatif gösterilmiyor.
function roundScaled(value: number): number {
  const step = value < 100 ? 10 : value < 1000 ? 50 : 100;
  return Math.max(10, Math.round(value / step) * step);
}

export function estimateTiers(midRangeText: string): { budget: TierEstimate; luxury: TierEstimate } | null {
  const numbers = parseNumbers(midRangeText);
  if (numbers.length === 0) return null;
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);

  return {
    budget: {
      min: roundScaled(min * BUDGET_FACTOR),
      max: roundScaled(max * BUDGET_FACTOR),
    },
    luxury: {
      min: roundScaled(min * LUXURY_FACTOR),
      max: roundScaled(max * LUXURY_FACTOR),
    },
  };
}

export function formatTL(estimate: TierEstimate): string {
  if (estimate.min === estimate.max) return `~${estimate.min.toLocaleString("tr-TR")} TL`;
  return `~${estimate.min.toLocaleString("tr-TR")}-${estimate.max.toLocaleString("tr-TR")} TL`;
}
