import * as React from "react";
import PacAirEauContent from "@/components/PacAirEauContent";

export const metadata = {
  title: "Pompe à chaleur air/eau | Installation & entretien Golfe de Saint-Tropez",
  description: "Installation et entretien de pompes à chaleur air/eau dans le Golfe de Saint-Tropez. Chauffage et eau chaude sanitaire économiques et écologiques. Devis gratuit.",
  openGraph: {
    title: "PAC Air/Eau | Monsieur Clim",
    description: "Pompe à chaleur air/eau pour chauffage et eau chaude sanitaire. Installation professionnelle dans le Golfe de Saint-Tropez.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function Page() {
  const features = [
    "Production de chauffage et d'eau chaude sanitaire",
    "Installation adaptée aux radiateurs et plancher chauffant",
    "Rendement énergétique exceptionnel",
    "Compatible avec les systèmes existants",
    "Solution durable et écologique",
  ];

  const benefits = [
    {
      title: "Tout-en-un",
      description: "Chauffage et eau chaude sanitaire avec un seul équipement"
    },
    {
      title: "Économique",
      description: "Jusqu'à 75% d'économies sur vos factures énergétiques"
    },
    {
      title: "Écologique",
      description: "Réduction significative de votre empreinte carbone"
    }
  ];

  return <PacAirEauContent features={features} benefits={benefits} />;
}