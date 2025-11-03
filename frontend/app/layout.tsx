import type { Metadata, Viewport } from "next";
import "./globals.css";
import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";
import CookieProvider from "@/components/CookieProvider";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://monsieurclim.fr"),
  title: {
    default: "Monsieur Clim | Climatisation & Pompes à chaleur",
    template: "%s | Monsieur Clim",
  },
  description:
    "Installation, entretien et dépannage de climatisations (PAC air/air), pompes à chaleur air/eau et pompes à chaleur piscine dans le Golfe de Saint‑Tropez. Devis gratuit, intervention rapide.",
  keywords: [
    "climatisation",
    "pompe à chaleur",
    "PAC air/air",
    "PAC air/eau",
    "entretien climatisation",
    "dépannage climatisation",
    "installation climatisation",
    "Golfe de Saint-Tropez",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Monsieur Clim",
    title: "Monsieur Clim – Climatisation & Pompes à chaleur",
    description:
      "Installation, entretien et dépannage – Golfe de Saint‑Tropez. Mitsubishi, Daikin, Heiwa. Toutes marques entretenues et dépannées.",
    images: [
      {
        url: "/services/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Monsieur Clim – Climatisation & PAC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Monsieur Clim – Climatisation & PAC",
    description:
      "Installation, entretien et dépannage – Golfe de Saint‑Tropez. Mitsubishi, Daikin, Heiwa.",
    images: ["/services/hero.jpg"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#161c2e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <CookieProvider>
          <MainNav />
          {children}
          <Footer />
        </CookieProvider>
      </body>
    </html>
  );
}
