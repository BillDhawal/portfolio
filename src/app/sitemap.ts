import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.thewallcodes.com";
  return [
    { url: base, lastModified: new Date(), priority: 1 },
    { url: `${base}/proof-of-work`, lastModified: new Date(), priority: 0.9 },
  ];
}
