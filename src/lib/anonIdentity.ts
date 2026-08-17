import { cookies } from "next/headers";
import { randomUUID } from "crypto";

// No accounts/passwords anywhere on this site — this cookie is not an identity
// the visitor logs into, just a silent, random per-browser token so the
// community route gallery can (a) rate-limit posts per browser and (b) let one
// browser like a given route only once (routes/comments/likes tables all key
// on this). It carries no personal data, matches the "localStorage-only,
// nothing stored server-side is tied to a person" posture already described in
// gizlilik-politikasi.
const IDENTITY_COOKIE = "ydf_identity";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export async function getOrCreateAnonIdentity(): Promise<string> {
  const store = await cookies();
  const existing = store.get(IDENTITY_COOKIE)?.value;
  if (existing) return existing;

  const id = randomUUID();
  store.set(IDENTITY_COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ONE_YEAR_SECONDS,
  });
  return id;
}
