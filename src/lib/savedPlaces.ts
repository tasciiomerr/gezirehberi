"use client";

const SAVED_PLACES_KEY = "yoldefteri_saved_places";

export interface SavedPlaceItem {
  id: string;
  name: string;
  description: string;
  category: string; // attractions, restaurants, accommodations, localFood
  citySlug: string;
  regionSlug?: string;
  rating?: number;
  reviewCount?: number;
  entranceFee?: string;
  priceRange?: string;
  pricePerNight?: string;
  bestSeason?: string;
  savedAt: string;
  specialties?: string[];
  features?: string[];
  amenities?: string[];
  ingredients?: string[];
  tips?: string;
  address?: string;
  openingHours?: string;
  duration?: string;
  bestTime?: string;
  accessibility?: string;
  bestPhotoTime?: string;
  parkingTip?: string;
}

const listeners = new Set<() => void>();
let cachedRaw: string | null = null;
let cachedItems: SavedPlaceItem[] = [];

function readSavedPlaces(): SavedPlaceItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SAVED_PLACES_KEY);
    if (raw === cachedRaw) return cachedItems;
    cachedRaw = raw;
    cachedItems = raw ? JSON.parse(raw) : [];
    return cachedItems;
  } catch {
    return [];
  }
}

function writeSavedPlaces(items: SavedPlaceItem[]) {
  if (typeof window === "undefined") return;
  const raw = JSON.stringify(items);
  localStorage.setItem(SAVED_PLACES_KEY, raw);
  cachedRaw = raw;
  cachedItems = items;
  listeners.forEach((listener) => listener());
}

export function subscribeSavedPlaces(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function getSavedPlaces(): SavedPlaceItem[] {
  return readSavedPlaces();
}

export function isPlaceSaved(placeId: string): boolean {
  return readSavedPlaces().some((item) => item.id === placeId);
}

export function toggleSavedPlace(place: any, category: string, citySlug: string): boolean {
  const items = readSavedPlaces();
  const exists = items.some((i) => i.id === place.id);

  if (exists) {
    writeSavedPlaces(items.filter((i) => i.id !== place.id));
    return false;
  } else {
    const newItem: SavedPlaceItem = {
      id: place.id,
      name: place.name,
      description: place.description || "",
      category: category,
      citySlug: citySlug,
      regionSlug: place.regionSlug || "marmara",
      rating: place.rating,
      reviewCount: place.reviewCount,
      entranceFee: place.entranceFee,
      priceRange: place.priceRange,
      pricePerNight: place.pricePerNight,
      bestSeason: place.bestSeason,
      specialties: place.specialties || [],
      features: place.features || [],
      amenities: place.amenities || [],
      ingredients: place.ingredients || [],
      tips: place.tips || "",
      address: place.address || "",
      openingHours: place.openingHours || "",
      duration: place.duration || "",
      bestTime: place.bestTime || "",
      accessibility: place.accessibility || "",
      bestPhotoTime: place.bestPhotoTime || "",
      parkingTip: place.parkingTip || "",
      savedAt: new Date().toISOString()
    };
    writeSavedPlaces([...items, newItem]);
    return true;
  }
}
