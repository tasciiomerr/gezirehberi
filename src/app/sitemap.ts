import { MetadataRoute } from "next";
import { regions } from "@/lib/data/regions";
import { allCities } from "@/lib/data/cities";

const locales = ["tr", "en", "de", "ar"];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://yoldefteri.com";
  const sitemapRoutes: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    // Static Routes
    sitemapRoutes.push(
      {
        url: `${siteUrl}/${locale}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: `${siteUrl}/${locale}/bolgeler`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9,
      }
    );

    // Region Routes
    regions.forEach((region) => {
      sitemapRoutes.push({
        url: `${siteUrl}/${locale}/bolgeler/${region.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    });

    // City Routes
    allCities.forEach((city) => {
      sitemapRoutes.push({
        url: `${siteUrl}/${locale}/bolgeler/${city.regionSlug}/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    });
  });

  return sitemapRoutes;
}
