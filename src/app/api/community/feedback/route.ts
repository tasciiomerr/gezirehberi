import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { getOrCreateAnonIdentity } from "@/lib/anonIdentity";
import { isRateLimited } from "@/lib/communityRateLimit";
import { friendlyDbError } from "@/lib/communityDbErrors";

interface CreateFeedbackBody {
  citySlug: string;
  isAccurate: boolean;
  note?: string;
  hp?: string;
}

export async function POST(request: NextRequest) {
  const supabase = getSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Community DB not configured" }, { status: 503 });

  let body: CreateFeedbackBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (body.hp) return NextResponse.json({ success: true });

  const { citySlug, isAccurate, note } = body;
  if (!citySlug || typeof isAccurate !== "boolean") {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const identity = await getOrCreateAnonIdentity();

  // 10 geri bildirim / saat — tek bir sayfayı defalarca oylamak spam sayılır,
  // gerçek bir gezginin birkaç sayfada geri bildirim bırakmasını engellemez.
  if (await isRateLimited(supabase, "content_feedback", identity, 60, 10)) {
    return NextResponse.json({ error: "Çok sık geri bildirim gönderildi, lütfen daha sonra tekrar deneyin." }, { status: 429 });
  }

  const { error } = await supabase.from("content_feedback").insert({
    city_slug: citySlug,
    is_accurate: isAccurate,
    note: note?.trim() || null,
    author_identity: identity,
  });

  if (error) return NextResponse.json({ error: friendlyDbError(error) }, { status: 400 });
  return NextResponse.json({ success: true }, { status: 201 });
}
