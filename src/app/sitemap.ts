import type { MetadataRoute } from "next";
import { companions, bosses, codes } from "@/data/game";

import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "daily" },
    { path: "/codes/", priority: 0.9, freq: "daily" },
    { path: "/bosses/", priority: 0.9, freq: "weekly" },
    { path: "/companions/", priority: 0.9, freq: "weekly" },
    { path: "/pets/", priority: 0.7, freq: "weekly" },
    { path: "/races/", priority: 0.7, freq: "weekly" },
    { path: "/shadows/", priority: 0.8, freq: "weekly" },
    { path: "/classes/", priority: 0.8, freq: "weekly" },
    { path: "/guide/", priority: 0.7, freq: "weekly" },
    { path: "/about/", priority: 0.3, freq: "monthly" },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: SITE_URL + r.path,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...companions.map((c) => ({
      url: `${SITE_URL}/companions/${c.slug}/`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...bosses.map((b) => ({
      url: `${SITE_URL}/bosses/${b.slug}/`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}

export const dynamic = "force-static";

/** Exported so the codes page and sitemap can never drift apart. */
export const codeCount = codes.length;
