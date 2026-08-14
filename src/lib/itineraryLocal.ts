// Bölüm 2: kullanıcının check-off, not ve gün-kopyalama tercihlerini
// localStorage'da saklayan hafif bir overlay katmanı (backend yok).

export interface ItineraryLocalState {
  checked: Record<string, boolean>; // key: `${day}-${order}`
  notes: Record<number, string>; // key: day
  budgets?: Record<number, { accommodation: number; food: number; tickets: number; transport: number }>;
}

function keyFor(citySlug: string, days: number) {
  return `yoldefteri_itinerary_${citySlug}_${days}d`;
}

const EMPTY: ItineraryLocalState = { checked: {}, notes: {}, budgets: {} };

export function loadItineraryLocalState(citySlug: string, days: number): ItineraryLocalState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(keyFor(citySlug, days));
    return raw ? JSON.parse(raw) : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function saveItineraryLocalState(citySlug: string, days: number, state: ItineraryLocalState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(keyFor(citySlug, days), JSON.stringify(state));
}

/**
 * Mock hava durumu — gerçek bir Weather API key'i olmadan, il koordinatına ve
 * gün indexine göre deterministik (her yenilemede aynı) bir tahmin üretir.
 *
 * NOT (uzun vadeli plan): Bir rota günlerce/haftalarca önceden planlandığı için
 * gerçek bir hava durumu API'si de bu ufukta güvenilir bir tahmin veremez —
 * API'ler genelde ~10 günden öteye gitmez. Asıl doğru çözüm muhtemelen bu mock
 * günlük tahmini "aylık ortalama iklim bilgisine" (örn. "Haziran'da ortalama
 * 24°C, yağış az") çevirmek olacak. Şimdilik burada yalnızca sıcaklık ile hava
 * koşulunun (örn. "19°C ve karlı" gibi) meteorolojik olarak tutarlı çıkmasını
 * sağlayan bir iç-tutarlılık düzeltmesi yapıldı; veri hâlâ gerçek değil.
 */
export interface MockWeather {
  tempC: number;
  condition: "güneşli" | "parçalı bulutlu" | "yağmurlu" | "karlı" | "sisli";
  icon: string;
  rainChance: number;
  windKmh: number;
}

const ICONS: Record<MockWeather["condition"], string> = {
  "güneşli": "☀️",
  "parçalı bulutlu": "⛅",
  "yağmurlu": "🌧️",
  "karlı": "❄️",
  "sisli": "🌫️",
};

// Madde 293 follow-up — city.whenToGo/climate ("yaz çok sıcak (40°C+)",
// "-30°C'ye kadar") and the mock weather generator used to be completely
// disconnected: getMockWeather() was always called with its default
// avgTempHint=18 regardless of the city, so Şanlıurfa in summer and Kars in
// winter both got the same mild 12-24°C mock range. This pulls a rough
// (deliberately not more than that — see the long-term "monthly climate"
// note above) temperature hint out of that existing curated text via regex,
// so hot/cold cities at least land in a plausible range. Real per-month
// climate data is a separate, larger task.
// Regex, "gidilecek mevsim" ile "kaçınılacak mevsim"i ayırt edemiyor — Kars'ın
// "Haziran-Eylül (kışlar aşırı soğuk, -30°C'ye kadar)" metni önerilen mevsim
// için (yaz) hiç sayı vermiyor, tek yakalanan sayı kaçınılması gereken kışın
// en düşüğü oluyor. Clamp olmadan bu, "Haziran-Eylül'de gidin" tavsiyesiyle
// çelişen, sürekli -33°C/karlı bir mock hava durumuna yol açıyordu. -15/+40°C
// sınırı, şehri hâlâ "soğuk" ya da "sıcak" gösterirken uç/absürt değerleri
// engelliyor.
const MIN_TEMP_HINT = -15;
const MAX_TEMP_HINT = 40;

export function extractTempHint(...texts: (string | undefined)[]): number | undefined {
  for (const text of texts) {
    if (!text) continue;
    const match = text.match(/(-?\d+)\s*°C/);
    if (match) {
      const value = parseInt(match[1], 10);
      if (!isNaN(value)) return Math.min(MAX_TEMP_HINT, Math.max(MIN_TEMP_HINT, value));
    }
  }
  return undefined;
}

function seededRandom(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h << 5) - h + seed.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h % 1000) / 1000;
}

export function getMockWeather(citySlug: string, day: number, avgTempHint = 18): MockWeather {
  const r1 = seededRandom(`${citySlug}-${day}-t`);
  const r2 = seededRandom(`${citySlug}-${day}-c`);
  const r3 = seededRandom(`${citySlug}-${day}-r`);
  const r4 = seededRandom(`${citySlug}-${day}-w`);

  const tempC = Math.round(avgTempHint - 6 + r1 * 12);

  // Only offer conditions that are meteorologically possible at this temperature
  // (e.g. "karlı" can no longer be picked at 19°C) before choosing among them.
  let eligible: MockWeather["condition"][];
  if (tempC <= 2) {
    eligible = ["karlı", "sisli", "parçalı bulutlu"];
  } else if (tempC <= 10) {
    eligible = ["yağmurlu", "sisli", "parçalı bulutlu", "güneşli"];
  } else if (tempC <= 22) {
    eligible = ["güneşli", "parçalı bulutlu", "yağmurlu", "sisli"];
  } else {
    eligible = ["güneşli", "parçalı bulutlu", "yağmurlu"];
  }
  const condition = eligible[Math.floor(r2 * eligible.length)];

  return {
    tempC,
    condition,
    icon: ICONS[condition],
    rainChance: Math.round(r3 * (condition === "yağmurlu" ? 80 : 25)),
    windKmh: Math.round(8 + r4 * 22),
  };
}
