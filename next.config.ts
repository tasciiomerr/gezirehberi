import type { NextConfig } from "next";
import { distancePairs, distancePairSlug } from "./src/lib/data/distancePairs";

// Search Console (2026-09): "mardin gaziantep", "osmaniye hatay" gibi ters
// yön sorguları toplamda binlerce gösterim alıyor ama kanonik sayfa tek yönlü
// (alfabetik) — ters URL 404 veriyordu. Ters slug kalıcı (308) olarak kanonik
// sayfaya yönleniyor, duplicate content oluşmuyor. Ters slug'ı zaten ayrı bir
// kanonik çift olan durum (teoride imkansız ama) atlanıyor.
const distanceSlugs = new Set(distancePairs.map(distancePairSlug));
const reverseDistanceRedirects = distancePairs
  .map((pair) => {
    const [a, b] = [pair.cityA, pair.cityB].sort();
    return { canonical: distancePairSlug(pair), reverse: `${b}-${a}` };
  })
  .filter(({ reverse }) => !distanceSlugs.has(reverse))
  .map(({ canonical, reverse }) => ({
    source: `/:locale(tr|en|de|ar|ru)/mesafe/${reverse}`,
    destination: `/:locale/mesafe/${canonical}`,
    permanent: true,
  }));

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  // Report items 255-267 — Vercel terminates HTTPS and redirects HTTP->HTTPS
  // automatically, but does NOT add the Strict-Transport-Security response
  // header on its own; without it, a browser's very first (never-yet-HSTS'd)
  // request to the domain is still made over plain HTTP before any redirect.
  // Bundled with the other zero-config, zero-risk security headers from the
  // same checklist item since they cost nothing and touch no business logic.
  async redirects() {
    return reverseDistanceRedirects;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
