import type { SupabaseClient } from "@supabase/supabase-js";

// DB-backed (not in-memory) rate limiting — Vercel serverless functions can run
// as multiple concurrent instances with no shared memory, so an in-process
// counter would under-count and let spam through. Querying Supabase for the
// requester's own recent rows is slightly slower but actually correct, and
// needs no extra paid infra (no Redis) to stay within the free-tier constraint.
export async function isRateLimited(
  supabase: SupabaseClient,
  table: "routes" | "comments" | "likes",
  identity: string,
  windowMinutes: number,
  maxCount: number
): Promise<boolean> {
  const since = new Date(Date.now() - windowMinutes * 60 * 1000).toISOString();
  const { count, error } = await supabase
    .from(table)
    .select("id", { count: "exact", head: true })
    .eq("author_identity", identity)
    .gte("created_at", since);

  if (error) {
    // Fail open on a rate-limit *check* error (e.g. transient DB issue) — the
    // insert itself still goes through Supabase's own constraints/RLS, so this
    // only disables the extra throttle, not the base data validation.
    return false;
  }
  return (count ?? 0) >= maxCount;
}
