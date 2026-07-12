import type { MetadataRoute } from "next";
import { CITIES } from "@/lib/cities";
import { BUSINESS } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${BUSINESS.domain}`;
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/service-areas`, changeFrequency: "monthly", priority: 0.8 },
  ];
  const cityRoutes: MetadataRoute.Sitemap = CITIES.map((c) => ({
    url: `${base}/service-areas/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...staticRoutes, ...cityRoutes];
}
