import { MetadataRoute } from "next";
import { getTelos } from "@/lib/db/telos";
import { getDistritos } from "@/lib/db/distritos";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://teloscuento.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [telos, distritos] = await Promise.all([getTelos(), getDistritos()]);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/alojamientos`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const distritoPages: MetadataRoute.Sitemap = distritos.map((distrito) => ({
    url: `${BASE_URL}/alojamientos?districts=${distrito.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const teloPages: MetadataRoute.Sitemap = telos
    .filter((telo) => telo.slug && telo.distrito?.slug)
    .map((telo) => ({
      url: `${BASE_URL}/alojamientos/${telo.distrito?.slug}/${telo.slug}`,
      lastModified: new Date(telo.created_at),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  return [...staticPages, ...distritoPages, ...teloPages];
}
