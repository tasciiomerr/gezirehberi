import { City, RegionSlug, ImportanceLevel, PlaceCategory } from "@/lib/types";

export interface ProvinceInput {
  slug: string;
  name: string;
  regionSlug: RegionSlug;
  region: string;
  tagline: string;
  description: string;
  lat: number;
  lng: number;
  howToGetThere: string;
  whenToGo: string;
  climate: string;
  whereToStay: string;
  budget: string;
  bestDuration: string;
  attractions: {
    name: string;
    category: PlaceCategory;
    description: string;
    duration: string;
    entranceFee: string;
    tip: string;
    importance?: ImportanceLevel;
  }[];
  restaurant: {
    name: string;
    specialties: string[];
    cost: string;
  };
  food: {
    name: string;
    description: string;
    ingredients: string[];
  };
  accommodation: {
    name: string;
    price: string;
  };
  tags: string[];
}

export function createProvinceCity(input: ProvinceInput): City {
  return {
    slug: input.slug,
    regionSlug: input.regionSlug,
    name: input.name,
    title: `${input.name} Gezi Rehberi`,
    summary: input.tagline,
    longDescription: input.description,
    heroTagline: input.tagline,
    heroImage: `/images/${input.slug}-hero.jpg`,
    location: { lat: input.lat, lng: input.lng },
    region: input.region,
    howToGetThere: input.howToGetThere,
    howToArrive: { byCar: input.howToGetThere },
    whenToGo: input.whenToGo,
    climate: input.climate,
    whereToStay: input.whereToStay,
    budget: input.budget,
    budgetBreakdown: {
      accommodation: "400-800 TL",
      food: "150-300 TL/gün",
      activities: "50-250 TL",
      transport: "50-100 TL/gün",
    },
    transportation: "Şehir merkezi ve yakın ilçelere yerel dolmuş ve taksi ile ulaşım sağlanır.",
    bestDuration: input.bestDuration,
    attractions: input.attractions.map((a, i) => ({
      id: `${input.slug}-attraction-${i + 1}`,
      name: a.name,
      category: a.category,
      description: a.description,
      longDescription: a.description,
      images: [],
      location: { lat: input.lat, lng: input.lng },
      address: `${input.name} Merkez`,
      openingHours: "09:00 - 18:00",
      entranceFee: a.entranceFee,
      duration: a.duration,
      bestTime: "Sabah veya öğleden sonra",
      importance: a.importance ?? (i === 0 ? "must-see" : "should-see"),
      tips: [a.tip],
      accessibility: "Genel erişilebilir",
    })),
    restaurants: [
      {
        id: `${input.slug}-restaurant-1`,
        name: input.restaurant.name,
        diningType: "restaurant",
        description: `${input.name} yöresel mutfağını yansıtan tercih edilen bir mekan`,
        specialties: input.restaurant.specialties,
        images: [],
        location: { lat: input.lat, lng: input.lng },
        address: `${input.name} Merkez`,
        priceRange: "mid",
        averageCost: input.restaurant.cost,
        openingHours: "11:00 - 22:00",
        reservationNeeded: false,
        features: ["Yerel lezzetler", "Merkezi konum"],
      },
    ],
    accommodations: [
      {
        id: `${input.slug}-accommodation-1`,
        name: input.accommodation.name,
        type: "hotel",
        description: `${input.name} merkezde konforlu konaklama seçeneği`,
        images: [],
        location: { lat: input.lat, lng: input.lng },
        address: `${input.name} Merkez`,
        priceRange: "mid",
        pricePerNight: input.accommodation.price,
        rating: 4.3,
        amenities: ["WiFi", "Kahvaltı dahil"],
      },
    ],
    localFood: [
      {
        id: `${input.slug}-food-1`,
        name: input.food.name,
        description: input.food.description,
        longDescription: input.food.description,
        images: [],
        origin: input.name,
        ingredients: input.food.ingredients,
        whereToTry: [],
        bestSeason: "Yıl boyu",
        priceRange: "100-250 TL",
        tips: "Yöresel bir lokantada tazesini denemenizi öneririz.",
        importance: "must-see",
      },
    ],
    itineraries: [],
    tags: input.tags,
    highlights: input.attractions.map((a) => a.name),
  };
}
