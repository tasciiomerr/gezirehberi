import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { getOrCreateAnonIdentity } from "@/lib/anonIdentity";
import { friendlyDbError } from "@/lib/communityDbErrors";

// No unlike — a browser's like is a one-way "I found this useful" signal,
// consistent with the rest of the site having no accounts to manage state for.
export async function POST(_request: NextRequest, props: { params: Promise<{ routeId: string }> }) {
  const supabase = getSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Community DB not configured" }, { status: 503 });

  const { routeId } = await props.params;
  const identity = await getOrCreateAnonIdentity();

  const { error } = await supabase.from("likes").insert({
    route_id: routeId,
    author_identity: identity,
  });

  if (error) {
    // unique(route_id, author_identity) — bu tarayıcı bu rotayı zaten beğenmiş.
    if (error.code === "23505") {
      return NextResponse.json({ success: true, alreadyLiked: true });
    }
    return NextResponse.json({ error: friendlyDbError(error) }, { status: 400 });
  }

  const { count } = await supabase
    .from("likes")
    .select("id", { count: "exact", head: true })
    .eq("route_id", routeId);

  return NextResponse.json({ success: true, likeCount: count ?? 0 });
}

export async function GET(_request: NextRequest, props: { params: Promise<{ routeId: string }> }) {
  const supabase = getSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Community DB not configured" }, { status: 503 });

  const { routeId } = await props.params;
  const identity = await getOrCreateAnonIdentity();

  const [{ count }, { data: mine }] = await Promise.all([
    supabase.from("likes").select("id", { count: "exact", head: true }).eq("route_id", routeId),
    supabase.from("likes").select("id").eq("route_id", routeId).eq("author_identity", identity).maybeSingle(),
  ]);

  return NextResponse.json({ likeCount: count ?? 0, likedByMe: !!mine });
}
