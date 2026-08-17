import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { getOrCreateAnonIdentity } from "@/lib/anonIdentity";
import { isRateLimited } from "@/lib/communityRateLimit";
import { friendlyDbError } from "@/lib/communityDbErrors";

interface CreateCommentBody {
  text: string;
  rating: number;
  authorName?: string;
  hp?: string;
}

export async function GET(_request: NextRequest, props: { params: Promise<{ routeId: string }> }) {
  const supabase = getSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Community DB not configured" }, { status: 503 });

  const { routeId } = await props.params;
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("route_id", routeId)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return NextResponse.json({ error: friendlyDbError(error) }, { status: 500 });
  return NextResponse.json({ comments: data });
}

export async function POST(request: NextRequest, props: { params: Promise<{ routeId: string }> }) {
  const supabase = getSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Community DB not configured" }, { status: 503 });

  const { routeId } = await props.params;

  let body: CreateCommentBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (body.hp) {
    return NextResponse.json({ success: true });
  }

  const { text, rating, authorName } = body;
  if (!text?.trim() || !rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const identity = await getOrCreateAnonIdentity();

  // 10 yeni yorum / saat / tarayıcı.
  if (await isRateLimited(supabase, "comments", identity, 60, 10)) {
    return NextResponse.json({ error: "Çok sık yorum yapıldı, lütfen daha sonra tekrar deneyin." }, { status: 429 });
  }

  const { data: comment, error } = await supabase
    .from("comments")
    .insert({
      route_id: routeId,
      text: text.trim(),
      rating,
      author_name: authorName?.trim() || "Misafir Gezgin",
      author_identity: identity,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: friendlyDbError(error) }, { status: 400 });

  // routes.rating_avg/rating_count güncellemesi migration 0002'deki DB
  // trigger'ında — burada ayrıca bir UPDATE çağrısına gerek yok (ve zaten
  // routes tablosunda public UPDATE RLS policy'si de bilinçli olarak yok).
  return NextResponse.json({ comment }, { status: 201 });
}
