const WISHLIST_KEY = "yoldefteri_wishlist";

export interface WishlistItem {
  citySlug: string;
  regionSlug: string;
  cityName: string;
  addedAt: string;
}

const EMPTY_WISHLIST: WishlistItem[] = [];
const listeners = new Set<() => void>();
let cachedRaw: string | null = null;
let cachedItems: WishlistItem[] = EMPTY_WISHLIST;

function readWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return EMPTY_WISHLIST;
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    if (raw === cachedRaw) return cachedItems;
    cachedRaw = raw;
    cachedItems = raw ? JSON.parse(raw) : EMPTY_WISHLIST;
    return cachedItems;
  } catch {
    return EMPTY_WISHLIST;
  }
}

function writeWishlist(items: WishlistItem[]) {
  if (typeof window === "undefined") return;
  const raw = JSON.stringify(items);
  localStorage.setItem(WISHLIST_KEY, raw);
  cachedRaw = raw;
  cachedItems = items;
  listeners.forEach((listener) => listener());
}

export function subscribeWishlist(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function getWishlistSnapshot(): WishlistItem[] {
  return readWishlist();
}

export function getWishlistServerSnapshot(): WishlistItem[] {
  return EMPTY_WISHLIST;
}

export function getWishlist(): WishlistItem[] {
  return readWishlist();
}

export function isInWishlist(citySlug: string): boolean {
  return readWishlist().some((item) => item.citySlug === citySlug);
}

export function toggleWishlist(item: Omit<WishlistItem, "addedAt">): boolean {
  const items = readWishlist();
  const exists = items.some((i) => i.citySlug === item.citySlug);

  if (exists) {
    writeWishlist(items.filter((i) => i.citySlug !== item.citySlug));
    return false;
  } else {
    writeWishlist([...items, { ...item, addedAt: new Date().toISOString() }]);
    return true;
  }
}

export function removeFromWishlist(citySlug: string) {
  writeWishlist(readWishlist().filter((i) => i.citySlug !== citySlug));
}
