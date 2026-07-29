export type RegionSlug =
  | "karadeniz"
  | "ege"
  | "akdeniz"
  | "marmara"
  | "ic-anadolu"
  | "dogu-anadolu"
  | "guneydogu-anadolu";

export type ImportanceLevel = "must-see" | "should-see" | "nice-to-have";
export type PlaceCategory =
  | "historical"
  | "nature"
  | "beach"
  | "viewpoint"
  | "museum"
  | "activity"
  | "shopping";
export type DiningType = "restaurant" | "cafe" | "street-food" | "market";
export type PriceRange = "budget" | "mid" | "luxury";
export type AccommodationType = "hotel" | "guesthouse" | "boutique" | "resort";

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface Region {
  slug: RegionSlug;
  name: string;
  tagline: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  cityCount: number;
  accentColor?: string;
}

export interface PlaceImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface Attraction {
  id: string;
  name: string;
  category: PlaceCategory;
  description: string;
  longDescription: string;
  images: PlaceImage[];
  location: GeoPoint;
  address: string;
  openingHours: string;
  entranceFee: string;
  duration: string;
  bestTime: string;
  importance: ImportanceLevel;
  tips: string[];
  accessibility: string;
  phone?: string;
  website?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  diningType: DiningType;
  description: string;
  specialties: string[];
  images: PlaceImage[];
  location: GeoPoint;
  address: string;
  priceRange: PriceRange;
  averageCost: string;
  openingHours: string;
  phone?: string;
  website?: string;
  reservationNeeded: boolean;
  features: string[];
}

export interface Accommodation {
  id: string;
  name: string;
  type: AccommodationType;
  description: string;
  images: PlaceImage[];
  location: GeoPoint;
  address: string;
  priceRange: PriceRange;
  pricePerNight: string;
  rating: number;
  amenities: string[];
  phone?: string;
  website?: string;
  bookingUrl?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  images: PlaceImage[];
  origin: string;
  ingredients: string[];
  whereToTry: Restaurant[];
  bestSeason: string;
  priceRange: string;
  tips: string;
  importance: ImportanceLevel;
}

export interface RouteStop {
  order: number;
  title: string;
  description?: string;
  duration: string;
  type: "attraction" | "dining" | "accommodation" | "travel" | "shopping";
  itemId?: string;
  location?: GeoPoint;
  tips?: string[];
}

export interface DayPlan {
  day: number;
  title: string;
  theme?: string;
  stops: RouteStop[];
  totalDuration: string;
  distance?: string;
  mealSuggestions?: {
    breakfast: Restaurant | any;
    lunch: Restaurant | any;
    dinner: Restaurant | any;
  };
  accommodationSuggestion?: Accommodation | any;
  notes?: string;
}

export interface ItineraryRoute {
  id: string;
  title: string;
  description: string;
  days: number;
  summary: string;
  importance: "full-experience" | "highlights" | "quick-visit";
  dayPlans: DayPlan[];
  totalDistance?: string;
  bestSeason: string;
  budgetPerPerson: string;
  images: PlaceImage[];
}

export interface City {
  slug: string;
  regionSlug: RegionSlug;
  name: string;
  title: string;
  summary: string;
  longDescription: string;
  heroTagline: string;
  heroImage: string;
  location: GeoPoint;
  region: string;

  // Practical Info
  howToGetThere: string;
  howToArrive: {
    byAir?: string;
    byBus?: string;
    byTrain?: string;
    byCar?: string;
  };
  whenToGo: string;
  climate: string;
  whereToStay: string;
  budget: string;
  budgetBreakdown: {
    accommodation: string;
    food: string;
    activities: string;
    transport: string;
  };
  transportation: string;
  bestDuration: string;

  // Content
  attractions: Attraction[];
  restaurants: Restaurant[];
  accommodations: Accommodation[];
  localFood: FoodItem[];
  itineraries: ItineraryRoute[];

  // Social
  instagram?: string;
  tags: string[];
  highlights: string[];
}

export interface RoutePage {
  slug: string;
  title: string;
  regionSlug: RegionSlug;
  citySlugs: string[];
  days: number;
  summary: string;
  intro: string;
  stops: RouteStop[];
  budgetNote: string;
  bestSeason: string;
}
