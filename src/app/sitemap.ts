import { MetadataRoute } from "next";
import { regions } from "@/lib/data/regions";
import { allCities } from "@/lib/data/cities";
import { popularDistricts } from "@/lib/data/districts";

// Only list locales that are actually indexable. en/de/ar are temporarily
// noindexed (report items 22/283 — untranslated content) so listing them here
// would just trigger Search Console's "submitted URL marked 'noindex'" warning.
const locales = ["tr"];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://www.yoldefterim.com.tr";
  const sitemapRoutes: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    // 1. Core/Home & Discovery Routes
    sitemapRoutes.push(
      {
        url: `${siteUrl}/${locale}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },
      {
        url: `${siteUrl}/${locale}/bolgeler`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${siteUrl}/${locale}/kayitlerim`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.5,
      },
      {
        url: `${siteUrl}/${locale}/hakkimizda`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      },
      {
        url: `${siteUrl}/${locale}/gizlilik-politikasi`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.4,
      },
      {
        url: `${siteUrl}/${locale}/cerez-politikasi`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.4,
      },
      {
        url: `${siteUrl}/${locale}/iletisim`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      }
    );

    // 2. Region Routes
    regions.forEach((region) => {
      sitemapRoutes.push({
        url: `${siteUrl}/${locale}/bolgeler/${region.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    });

    // 3. City Routes & Category Sub-Tabs
    allCities.forEach((city) => {
      // Main City page
      // Note: the "?tab=" category variants were removed — CityContentSections
      // never reads a tab value from the URL, so those entries pointed to pages
      // that render byte-for-byte identical content to the bare city URL (fake
      // duplicate-content entries wasting crawl budget, report item 16).
      sitemapRoutes.push({
        url: `${siteUrl}/${locale}/bolgeler/${city.regionSlug}/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      });
    });

    // 4. Tourist District Routes (Long-Tail Programmatic SEO)
    popularDistricts.forEach((district) => {
      sitemapRoutes.push({
        url: `${siteUrl}/${locale}/bolgeler/${district.regionSlug}/${district.citySlug}/${district.slug}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.7,
      });
    });
  });

  return sitemapRoutes;
}
