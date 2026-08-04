import { NextRequest, NextResponse } from "next/server";
import { getPlacesForCity } from "@/lib/places";

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

    const result = getPlacesForCity(citySlug, { type, limit, offset, sort, query, districtSlug });
    if (!result) {
      return NextResponse.json({ error: "City not found" }, { status: 404 });
    }

    // Create JSON response
    const response = NextResponse.json(result);

    // Edge Caching and Revalidation (Cache response in Vercel Edge for 24h, revalidate in background)
    response.headers.set("Cache-Control", "s-maxage=86400, stale-while-revalidate=3600");

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
