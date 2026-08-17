const LOCAL_AUTHOR_KEY = "yoldefteri_local_author_name";

// Display name shown on routes/comments this browser publishes to the
// community route gallery. No account, no password — just a locally-
// remembered name; the real write/read now goes through /api/community/*
// (Supabase), see src/lib/communityApi.ts. This file used to also hold a
// full localStorage-only mock DB (routes/comments never left the browser) —
// removed once the real API replaced it.
export function getLocalAuthorName(): string {
  if (typeof window === "undefined") return "Misafir Gezgin";
  try {
    return localStorage.getItem(LOCAL_AUTHOR_KEY) || "Misafir Gezgin";
  } catch {
    return "Misafir Gezgin";
  }
}

export function setLocalAuthorName(name: string) {
  if (typeof window === "undefined") return;
  const trimmed = name.trim();
  try {
    localStorage.setItem(LOCAL_AUTHOR_KEY, trimmed || "Misafir Gezgin");
  } catch {
    // localStorage unavailable (private mode etc.) — non-fatal, name just won't persist.
  }
}
