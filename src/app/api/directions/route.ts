import { NextRequest, NextResponse } from "next/server";

// Server-only — MAPBOX_ACCESS_TOKEN is never exposed to the client (report item
// 53-55: real Mapbox Directions data, cached so we don't re-query on every page
// load, only when a route is actually generated/changed).

interface DirectionsRequestBody {
  coordinates: { lat: number; lng: number }[];
  mode: "walking" | "driving";
}

interface CachedResult {
  legs: { distanceKm: number; durationMin: number }[];
  cachedAt: number;
}

// Module-scoped in-memory cache: survives for the lifetime of this server
// process/instance (i.e. not re-fetched on every subsequent page load for the
// same route), reset on redeploy/restart. A DB/file-backed cache would persist
// longer but is a separate infrastructure decision outside this task's scope.
const cache = new Map<string, CachedResult>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24h — matches the report's "cache in edge for 24h" idea (item 55)

function cacheKey(coordinates: { lat: number; lng: number }[], mode: string): string {
  return `${mode}:${coordinates.map((c) => `${c.lat.toFixed(5)},${c.lng.toFixed(5)}`).join(";")}`;
}

export async function POST(request: NextRequest) {
  const token = process.env.MAPBOX_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "MAPBOX_ACCESS_TOKEN not configured" }, { status: 503 });
  }

  let body: DirectionsRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { coordinates, mode } = body;
  if (!Array.isArray(coordinates) || coordinates.length < 2) {
    return NextResponse.json({ error: "At least 2 coordinates required" }, { status: 400 });
  }

  const key = cacheKey(coordinates, mode);
  const cached = cache.get(key);
  if (cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
    return NextResponse.json({ legs: cached.legs, cached: true });
  }

  // Mapbox profile naming: "walking" | "driving" (matches our TravelMode values)
  const profile = mode === "driving" ? "driving" : "walking";
  const coordStr = coordinates.map((c) => `${c.lng},${c.lat}`).join(";");
  const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${coordStr}?access_token=${token}&overview=false&geometries=geojson`;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) {
      return NextResponse.json({ error: `Mapbox API error: ${res.status}` }, { status: 502 });
    }
    const data = await res.json();
    const route = data.routes?.[0];
    if (!route || !Array.isArray(route.legs)) {
      return NextResponse.json({ error: "No route found" }, { status: 502 });
    }

    const legs = route.legs.map((leg: any) => ({
      distanceKm: Math.round((leg.distance / 1000) * 10) / 10,
      durationMin: Math.max(1, Math.round(leg.duration / 60)),
    }));

    cache.set(key, { legs, cachedAt: Date.now() });
    return NextResponse.json({ legs, cached: false });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Mapbox request failed" }, { status: 502 });
  }
}
