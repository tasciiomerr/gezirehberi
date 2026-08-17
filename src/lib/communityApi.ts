"use client";

// Thin client for /api/community/* — the browser-side counterpart to
// supabaseServer.ts. Normalizes the DB's snake_case rows into the
// camelCase shape components use (mirrors the old socialDb.ts SocialRoute/
// SocialComment naming so UserRouteCard/RouteBuilder needed minimal changes).

export interface CommunityStop {
  order: number;
  title: string;
  description: string;
  duration: string;
  type: "attraction" | "dining" | "accommodation" | "activity";
}

export interface CommunityRoute {
  id: string;
  citySlug: string;
  regionSlug: string;
  title: string;
  days: number;
  stops: CommunityStop[];
  authorName: string;
  createdAt: string;
  ratingAvg: number;
  ratingCount: number;
  likeCount: number;
}

export interface CommunityComment {
  id: string;
  routeId: string;
  authorName: string;
  text: string;
  rating: number;
  createdAt: string;
}

interface RouteRow {
  id: string;
  city_slug: string;
  region_slug: string;
  title: string;
  days: number;
  stops: CommunityStop[];
  author_name: string;
  created_at: string;
  rating_avg: number;
  rating_count: number;
  like_count: number;
}

interface CommentRow {
  id: string;
  route_id: string;
  author_name: string;
  text: string;
  rating: number;
  created_at: string;
}

function mapRoute(row: RouteRow): CommunityRoute {
  return {
    id: row.id,
    citySlug: row.city_slug,
    regionSlug: row.region_slug,
    title: row.title,
    days: row.days,
    stops: row.stops,
    authorName: row.author_name,
    createdAt: row.created_at,
    ratingAvg: row.rating_avg,
    ratingCount: row.rating_count,
    likeCount: row.like_count,
  };
}

function mapComment(row: CommentRow): CommunityComment {
  return {
    id: row.id,
    routeId: row.route_id,
    authorName: row.author_name,
    text: row.text,
    rating: row.rating,
    createdAt: row.created_at,
  };
}

async function parseJsonSafe(res: Response): Promise<any> {
  try {
    return await res.json();
  } catch {
    return {};
  }
}

export async function fetchCommunityRoutes(
  citySlug: string,
  sort: "newest" | "popular" = "newest"
): Promise<{ routes: CommunityRoute[]; error?: string }> {
  try {
    const res = await fetch(`/api/community/routes?citySlug=${encodeURIComponent(citySlug)}&sort=${sort}`);
    const body = await parseJsonSafe(res);
    if (!res.ok) return { routes: [], error: body.error || `HTTP ${res.status}` };
    return { routes: (body.routes as RouteRow[]).map(mapRoute) };
  } catch (e: any) {
    return { routes: [], error: e?.message || "Network error" };
  }
}

export interface CommunityStats {
  routeCount: number;
  commentCount: number;
  likeCount: number;
}

export async function fetchCommunityStats(citySlug: string): Promise<CommunityStats | null> {
  try {
    const res = await fetch(`/api/community/stats?citySlug=${encodeURIComponent(citySlug)}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function reportContent(payload: {
  targetType: "route" | "comment";
  targetId: string;
  reason: "spam" | "inappropriate" | "incorrect" | "other";
}): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch("/api/community/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await parseJsonSafe(res);
    if (!res.ok) return { success: false, error: body.error || `HTTP ${res.status}` };
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message || "Network error" };
  }
}

export async function submitContentFeedback(payload: {
  citySlug: string;
  isAccurate: boolean;
  note?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch("/api/community/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await parseJsonSafe(res);
    if (!res.ok) return { success: false, error: body.error || `HTTP ${res.status}` };
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message || "Network error" };
  }
}

export async function createCommunityRoute(payload: {
  citySlug: string;
  regionSlug: string;
  title: string;
  days: number;
  stops: CommunityStop[];
  authorName: string;
}): Promise<{ route?: CommunityRoute; error?: string }> {
  try {
    const res = await fetch("/api/community/routes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await parseJsonSafe(res);
    if (!res.ok) return { error: body.error || `HTTP ${res.status}` };
    return { route: mapRoute(body.route as RouteRow) };
  } catch (e: any) {
    return { error: e?.message || "Network error" };
  }
}

export async function fetchCommunityComments(routeId: string): Promise<{ comments: CommunityComment[]; error?: string }> {
  try {
    const res = await fetch(`/api/community/routes/${routeId}/comments`);
    const body = await parseJsonSafe(res);
    if (!res.ok) return { comments: [], error: body.error || `HTTP ${res.status}` };
    return { comments: (body.comments as CommentRow[]).map(mapComment) };
  } catch (e: any) {
    return { comments: [], error: e?.message || "Network error" };
  }
}

export async function createCommunityComment(
  routeId: string,
  payload: { text: string; rating: number; authorName: string }
): Promise<{ comment?: CommunityComment; error?: string }> {
  try {
    const res = await fetch(`/api/community/routes/${routeId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await parseJsonSafe(res);
    if (!res.ok) return { error: body.error || `HTTP ${res.status}` };
    return { comment: mapComment(body.comment as CommentRow) };
  } catch (e: any) {
    return { error: e?.message || "Network error" };
  }
}

export async function likeCommunityRoute(
  routeId: string
): Promise<{ success: boolean; likeCount?: number; alreadyLiked?: boolean; error?: string }> {
  try {
    const res = await fetch(`/api/community/routes/${routeId}/like`, { method: "POST" });
    const body = await parseJsonSafe(res);
    if (!res.ok) return { success: false, error: body.error || `HTTP ${res.status}` };
    return body;
  } catch (e: any) {
    return { success: false, error: e?.message || "Network error" };
  }
}

export async function getCommunityLikeStatus(routeId: string): Promise<{ likeCount: number; likedByMe: boolean }> {
  try {
    const res = await fetch(`/api/community/routes/${routeId}/like`);
    const body = await parseJsonSafe(res);
    if (!res.ok) return { likeCount: 0, likedByMe: false };
    return body;
  } catch {
    return { likeCount: 0, likedByMe: false };
  }
}
