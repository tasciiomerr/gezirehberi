// Dynamic Pricing & Freshness Engine

export function getWeekNumber(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return Math.ceil((dayOfYear + start.getDay() + 1) / 7);
}

export function getDynamicPriceMultiplier(seed: string): number {
  const weekNum = getWeekNumber();
  
  // 1. Seasonal base factors (Summer peaks, Winter drops)
  let seasonalFactor = 1.0;
  if (weekNum >= 22 && weekNum <= 36) {
    seasonalFactor = 1.25; // +25% Summer peak
  } else if (weekNum >= 48 || weekNum <= 10) {
    seasonalFactor = 0.90; // -10% Winter drop
  }

  // 2. Stable weekly fluctuation based on seed hash + week number
  let hash = 0;
  const key = `${seed}-week-${weekNum}`;
  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }
  const fluctuation = ((hash % 10) - 5) / 100; // -5% to +4%

  return parseFloat((seasonalFactor + fluctuation).toFixed(2));
}

export function getDynamicPrice(baseValue: any, seed: string): string {
  if (!baseValue) return "";
  const str = String(baseValue);
  if (
    str.toLowerCase().includes("ücretsiz") || 
    str.toLowerCase().includes("free") || 
    str.toLowerCase() === "tbd"
  ) {
    return baseValue;
  }

  const multiplier = getDynamicPriceMultiplier(seed);

  // Case A: Price range like "150-250 TL"
  if (str.includes("-")) {
    const parts = str.split("-");
    const num1 = parseInt(parts[0].replace(/[^0-9]/g, ""), 10);
    const num2 = parseInt(parts[1].replace(/[^0-9]/g, ""), 10);
    if (!isNaN(num1) && !isNaN(num2)) {
      const p1 = Math.round(num1 * multiplier);
      const p2 = Math.round(num2 * multiplier);
      return `${p1}-${p2} TL`;
    }
  }

  // Case B: Single price like "120 TL" or "1.500 TL"
  const cleanStr = str.replace(/\./g, ""); // strip thousand separators
  const num = parseInt(cleanStr.replace(/[^0-9]/g, ""), 10);
  if (!isNaN(num)) {
    const updated = Math.round(num * multiplier);
    // Format with thousand separator if it's large
    const formatted = updated >= 1000 
      ? updated.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") 
      : updated.toString();
    return `${formatted} TL`;
  }

  return baseValue;
}

export function getLastMondayDate(locale: string = "tr"): string {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diff));
  return monday.toLocaleDateString(locale === "tr" ? "tr-TR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

// Get the date of the next Monday (pricing cycle expiration)
export function getNextMondayISO(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? 1 : 8);
  const nextMonday = new Date(now.setDate(diff));
  return nextMonday.toISOString().split("T")[0]; // YYYY-MM-DD
}
