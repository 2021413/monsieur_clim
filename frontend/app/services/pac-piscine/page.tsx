import * as React from "react";
import PacPiscineContent from "@/components/PacPiscineContent";

export const metadata = {
  title: "Pompe à chaleur piscine | Chauffage piscine Golfe de Saint-Tropez",
  description: "Installation et entretien de pompes à chaleur pour piscine dans le Golfe de Saint-Tropez. Prolongez votre saison de baignade économiquement. Devis gratuit.",
  openGraph: {
    title: "PAC Piscine | Monsieur Clim",
    description: "Pompe à chaleur pour chauffer votre piscine efficacement. Installation dans le Golfe de Saint-Tropez.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function Page() {
  const features = [
    "Chauffage de piscine économique",
    "Prolongation de la saison de baignade",
    "Installation simple et rapide",
    "Fonctionnement silencieux",
    "Maintenance minimale",
    "Contrôle précis de la température",
  ];

  const benefits = [
    {
      title: "Économique",
      description: "Jusqu'à 80% d'économies par rapport à un chauffage électrique classique"
    },
    {
      title: "Écologique",
      description: "Utilisation des calories de l'air, une énergie naturelle et renouvelable"
    },
    {
      title: "Confort",
      description: "Profitez de votre piscine plus longtemps dans l'année à température idéale"
    }
  ];

  return <PacPiscineContent features={features} benefits={benefits} />;
}