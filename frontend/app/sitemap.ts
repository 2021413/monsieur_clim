import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://monsieurclim.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: string[] = [
    "/",
    "/services",
    "/realisations",
    "/zones",
    "/about",
    "/contact",
    "/services/pac-air-air",
    "/services/pac-air-eau",
    "/services/pac-piscine",
    "/services/installation",
    "/services/entretien",
    "/services/depannage",
    "/legal/mentions-legales",
    "/legal/politique-confidentialite",
    "/legal/plan-du-site",
    "/avis",
  ];

  const lastModified = new Date();

  return routes.map((route): MetadataRoute.Sitemap[0] => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}


