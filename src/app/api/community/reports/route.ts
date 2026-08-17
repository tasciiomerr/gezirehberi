import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { getOrCreateAnonIdentity } from "@/lib/anonIdentity";
import { isRateLimited } from "@/lib/communityRateLimit";
import { friendlyDbError } from "@/lib/communityDbErrors";

interface CreateReportBody {
  targetType: "route" | "comment";
  targetId: string;
  reason: "spam" | "inappropriate" | "incorrect" | "other";
  hp?: string;
}

// Parti 2, madde 7 — moderasyon bildirme. Bilinçli olarak GET yok: reports
// tablosunda public SELECT RLS policy'si yok (bkz. migration 0003), bu
// sadece bir yazma uç noktası — bildirimler herkese açık bir liste değil,
// site sahibinin Supabase dashboard'undan incelediği bir kuyruk.
export async function POST(request: NextRequest) {
  const supabase = getSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Community DB not configured" }, { status: 503 });

  let body: CreateReportBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (body.hp) {
    return NextResponse.json({ success: true });
  }

  const { targetType, targetId, reason } = body;
  if (!targetType || !targetId || !reason) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const identity = await getOrCreateAnonIdentity();

  // 5 bildirim / saat / tarayıcı — moderasyon kuyruğunun spam bildirimlerle
  // boğulmasını engellemek için, gerçek bir kullanıcının birkaç öğeyi
  // bildirmesini engellemeyecek kadar gevşek.
  if (await isRateLimited(supabase, "reports", identity, 60, 5)) {
    return NextResponse.json({ error: "Çok sık bildirim yapıldı, lütfen daha sonra tekrar deneyin." }, { status: 429 });
  }

  const { error } = await supabase.from("reports").insert({
    target_type: targetType,
    target_id: targetId,
    reason,
    author_identity: identity,
  });

  if (error) return NextResponse.json({ error: friendlyDbError(error) }, { status: 400 });
  return NextResponse.json({ success: true }, { status: 201 });
}
