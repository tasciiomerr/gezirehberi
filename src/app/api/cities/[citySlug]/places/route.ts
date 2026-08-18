import { NextRequest, NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { getPlacesForCity, GetPlacesOptions } from "@/lib/places";

// Bulgu (madde 307): manuel `Cache-Control` set etmenin (önceki versiyon,
// s-maxage=86400) hiçbir etkisi yoktu — bkz. api/community/stats/route.ts'teki
// ayrıntılı not. Bu route'un altındaki getPlacesForCity zaten senkron/bellek
// içi statik veri okuduğu için (Supabase/DB maliyeti yok), buradaki asıl
// kazanç DB yükü azaltmak değil, tekrarlanan istekler için route handler'ı
// tekrar çalıştırmamak — yine de unstable_cache ile sarmalandı, diğer
// community route'larıyla tutarlı ve küçük bir CPU/latency kazancı sağlıyor.
const getCachedPlaces = unstable_cache(
  async (citySlug: string, options: GetPlacesOptions) => getPlacesForCity(citySlug, options),
  ["cities-places"],
  { revalidate: 86400 }
);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ citySlug: string }> }
) {
  try {
    const { citySlug } = await params;
    const { searchParams } = new URL(request.url);

    const type = searchParams.get("type") || "attractions"; // attractions, restaurants, accommodations, localFood
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);
    const sort = searchParams.get("sort") || "popularity"; // popularity, constructionYear, price, alphabetical
    const query = searchParams.get("query") || "";
    const districtSlug = searchParams.get("district") || "";

    const result = await getCachedPlaces(citySlug, { type, limit, offset, sort, query, districtSlug });
    if (!result) {
      return NextResponse.json({ error: "City not found" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
