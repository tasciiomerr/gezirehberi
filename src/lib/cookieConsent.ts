const CONSENT_KEY = "yoldefteri_cookie_consent"; // "accepted" | "declined"

export type ConsentValue = "accepted" | "declined";

export function getCookieConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(CONSENT_KEY);
  return v === "accepted" || v === "declined" ? v : null;
}

export function setCookieConsent(value: ConsentValue) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent("yoldefteri_cookie_consent_change", { detail: value }));
}

// Use this before loading any non-essential script (AdSense, GA, etc.) once one
// is actually integrated — see report items 30/132/133/134.
export function hasAnalyticsConsent(): boolean {
  return getCookieConsent() === "accepted";
}
