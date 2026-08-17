import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

// Parti 2, madde 9 — şehir sayfasındaki topluluk istatistiği rozeti için
// (rota/yorum/beğeni sayısı). "Gezgin sayısı" yerine bu üç somut, doğrudan
// sayılabilir metriği kullanıyoruz — "gezgin" kelimesi hangi eylemlerin
// birini benzersiz bir kişi saydıracağı belirsiz olduğundan (rota mı
// paylaşmalı, yorum mu yapmalı, ikisi de mi?), tanımı net olmayan bir
// rakam uydurmak yerine üç ayrı, dürüst sayı gösteriyoruz.
export async function GET(request: NextRequest) {
  const supabase = getSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Community DB not configured" }, { status: 503 });

  const citySlug = request.nextUrl.searchParams.get("citySlug");
  if (!citySlug) return NextResponse.json({ error: "citySlug is required" }, { status: 400 });

  const { data: routeRows, error: routesError } = await supabase
    .from("routes")
    .select("id, like_count")
    .eq("city_slug", citySlug);

  if (routesError) return NextResponse.json({ error: routesError.message }, { status: 500 });

  const routeIds = (routeRows ?? []).map((r) => r.id);
  const routeCount = routeIds.length;
  const likeCount = (routeRows ?? []).reduce((sum, r) => sum + (r.like_count ?? 0), 0);

  let commentCount = 0;
  if (routeIds.length > 0) {
    const { count } = await supabase
      .from("comments")
      .select("id", { count: "exact", head: true })
      .in("route_id", routeIds);
    commentCount = count ?? 0;
  }

  return NextResponse.json({ routeCount, commentCount, likeCount });
}
