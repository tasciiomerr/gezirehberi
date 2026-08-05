export interface GuideArticle {
  slug: string;
  title: string;
  summary: string;
  coverImage?: string;
  body: string;
  publishedAt: string; // ISO date
  relatedCitySlugs?: string[];
}

// Editorial list/blog content layer (report item 83 — "En iyi 10 Ege koyu",
// "Kasım ayında nereye gidilir" style articles). Architecture only: this
// stays empty until real, hand-written articles are added here — never
// auto-generate entries (same data-honesty rule as madde 34/167).
export const guides: GuideArticle[] = [];

export function getAllGuides(): GuideArticle[] {
  return [...guides].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getGuideBySlug(slug: string): GuideArticle | undefined {
  return guides.find((g) => g.slug === slug);
}
