import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = ["", "/services", "/tracking", "/about", "/contact", "/quote"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
  }));
  const servicePages = services.map((s) => ({ url: `${site.url}/services/${s.slug}`, lastModified: now }));
  return [...staticPages, ...servicePages];
}
