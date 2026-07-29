import { MetadataRoute } from "next";
import { regions } from "@/lib/data/regions";
import { allCities } from "@/lib/data/cities";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://yoldefteri.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/bolgeler`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const regionRoutes: MetadataRoute.Sitemap = regions.map((region) => ({
    url: `${siteUrl}/bolgeler/${region.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const cityRoutes: MetadataRoute.Sitemap = allCities.map((city) => ({
    url: `${siteUrl}/bolgeler/${city.regionSlug}/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...regionRoutes, ...cityRoutes];
}
