import { City } from "@/lib/types";

export const cities: City[] = [
  {
    slug: "amasra",
    regionSlug: "karadeniz",
    name: "Amasra",
    title: "Amasra Gezi Rehberi",
    summary: "Karadeniz''in en sakin liman kasabası",
    longDescription: "Amasra, Karadeniz''in en korunmuş ve turizmin etkilerinden uzak kasabalarından biridir.",
    heroTagline: "İki koy arasında sakin bir liman kasabası",
    heroImage: "/images/amasra-hero.jpg",
    location: { lat: 41.7479, lng: 32.0208 },
    region: "Karadeniz",
    howToGetThere: "İstanbul''dan otobüs ile Bartın''a, Bartın''dan minibüsle Amasra''ya",
    howToArrive: { byBus: "4.5 saat" },
    whenToGo: "Haziran-Eylül",
    climate: "Yazları ılık",
    whereToStay: "Butik pansiyonlar",
    budget: "1.000-1.500 TL/gün",
    budgetBreakdown: { accommodation: "400-600 TL", food: "150-300 TL", activities: "50-150 TL", transport: "10-20 TL" },
    transportation: "Yürüyerek",
    bestDuration: "2-3 gün",
    attractions: [],
    restaurants: [],
    accommodations: [],
    localFood: [],
    itineraries: [],
    instagram: "@amasra_official",
    tags: ["Balık", "Liman", "Tarihi"],
    highlights: ["Kale", "Balık Çorbası", "Gün Batımı"],
  },
  {
    slug: "safranbolu",
    regionSlug: "karadeniz",
    name: "Safranbolu",
    title: "Safranbolu Gezi Rehberi",
    summary: "UNESCO Dünya Mirası listesindeki Osmanlı kasabası",
    longDescription: "Safranbolu'nun kalbinde yer alan çarşı, tahta döşemeli dar sokakları ve kırmızı çatılı evleriyle 18. yüzyıl şehir mimarisini tam olarak koruyor.",
    heroTagline: "Zamanın durduğu Osmanlı kasabası",
    heroImage: "/images/safranbolu-hero.jpg",
    location: { lat: 40.7516, lng: 35.4813 },
    region: "Karadeniz",
    howToGetThere: "Karabük''ten dolmuş ile 20 dakika",
    howToArrive: { byBus: "6 saat (İstanbul''dan)" },
    whenToGo: "İlkbahar ve sonbahar",
    climate: "Kışları soğuk, yazları ılık",
    whereToStay: "Konak-oteller",
    budget: "900-1.800 TL/gün",
    budgetBreakdown: { accommodation: "500-800 TL", food: "150-300 TL", activities: "100-200 TL", transport: "50 TL" },
    transportation: "Yaya",
    bestDuration: "1-2 gün",
    attractions: [],
    restaurants: [],
    accommodations: [],
    localFood: [],
    itineraries: [],
    instagram: "@safranbolu_official",
    tags: ["UNESCO", "Osmanlı", "Tarih"],
    highlights: ["Çarşı", "Kaymakamlar Evi", "Hıdırlık Tepesi"],
  },
];

export function getCity(regionSlug: string, citySlug: string): City | undefined {
  return cities.find((c) => c.regionSlug === regionSlug && c.slug === citySlug);
}

export function getCitiesByRegion(regionSlug: string): City[] {
  return cities.filter((c) => c.regionSlug === regionSlug);
}
