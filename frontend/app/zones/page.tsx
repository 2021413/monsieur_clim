import type { Metadata } from "next";
import ZonesContent from "@/components/ZonesContent";

export const metadata: Metadata = {
  title: "Zones d'intervention | Monsieur Clim – Golfe de Saint-Tropez et Var",
  description: "Installation, entretien et dépannage de climatisation et pompes à chaleur dans tout le Golfe de Saint-Tropez : de Saint-Tropez à Rayol-Canadel, La Môle, La Garde-Freinet, Le Plan-de-la-Tour.",
  openGraph: {
    title: "Zones d'intervention | Monsieur Clim",
    description: "Intervention rapide dans tout le Golfe de Saint-Tropez et les communes environnantes pour vos besoins en climatisation et pompes à chaleur.",
    type: "website",
    locale: "fr_FR",
  },
};


export default function ZonesPage() {
  return <ZonesContent />;
}