import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { getOrCreateAnonIdentity } from "@/lib/anonIdentity";
import { isRateLimited } from "@/lib/communityRateLimit";
import { friendlyDbError } from "@/lib/communityDbErrors";

interface CreateRouteBody {
  citySlug: string;
  regionSlug: string;
  title: string;
  days: number;
  stops: unknown[];
  authorName?: string;
  hp?: string; // honeypot — same pattern as ContactForm.tsx, silently drop if filled
}

export async function GET(request: NextRequest) {
  const supabase = getSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Community DB not configured" }, { status: 503 });

  const citySlug = request.nextUrl.searchParams.get("citySlug");
  if (!citySlug) return NextResponse.json({ error: "citySlug is required" }, { status: 400 });

  // Parti 2, madde 8 — "en çok beğenilen" sıralaması like_count'a (migration
  // 0003'teki trigger ile güncel tutulan denormalize sütun) göre, varsayılan
  // "en yeni" ise created_at'e göre.
  const sort = request.nextUrl.searchParams.get("sort") === "popular" ? "popular" : "newest";
  const orderColumn = sort === "popular" ? "like_count" : "created_at";

  const { data, error } = await supabase
    .from("routes")
    .select("*")
    .eq("city_slug", citySlug)
    .order(orderColumn, { ascending: false })
    .limit(50);

  if (error) return NextResponse.json({ error: friendlyDbError(error) }, { status: 500 });
  return NextResponse.json({ routes: data });
}

export async function POST(request: NextRequest) {
  const supabase = getSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Community DB not configured" }, { status: 503 });

  let body: CreateRouteBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (body.hp) {
    // Bot tripped the honeypot — pretend success, don't tip it off.
    return NextResponse.json({ success: true });
  }

  const { citySlug, regionSlug, title, days, stops, authorName } = body;
  if (!citySlug || !regionSlug || !title || !days || !Array.isArray(stops) || stops.length === 0) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const identity = await getOrCreateAnonIdentity();

  // 3 yeni rota / saat / tarayıcı — spam'i zorlaştırır, gerçek bir gezginin
  // akışını engellemez.
  if (await isRateLimited(supabase, "routes", identity, 60, 3)) {
    return NextResponse.json({ error: "Çok sık rota paylaşıldı, lütfen daha sonra tekrar deneyin." }, { status: 429 });
  }

  const { data, error } = await supabase
    .from("routes")
    .insert({
      city_slug: citySlug,
      region_slug: regionSlug,
      title,
      days,
      stops,
      author_name: authorName?.trim() || "Misafir Gezgin",
      author_identity: identity,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: friendlyDbError(error) }, { status: 400 });
  return NextResponse.json({ route: data }, { status: 201 });
}
