import * as React from "react";
import EntretienContent from "@/components/EntretienContent";

export const metadata = {
  title: "Entretien climatisation & PAC | Maintenance Golfe de Saint-Tropez",
  description: "Entretien et maintenance de climatisation et pompes à chaleur dans le Golfe de Saint-Tropez. Contrôle, nettoyage, optimisation des performances. Devis gratuit.",
  openGraph: {
    title: "Entretien | Monsieur Clim",
    description: "Entretien préventif pour optimiser les performances et la durée de vie de vos équipements de climatisation.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function Page() {
  const features = [
    "Vérification complète du système",
    "Nettoyage des filtres et unités",
    "Contrôle des performances",
    "Détection précoce des pannes",
    "Optimisation de la consommation",
    "Garantie de bon fonctionnement",
  ];

  const maintenanceSteps = [
    {
      title: "Diagnostic",
      description: "Contrôle général de votre installation"
    },
    {
      title: "Nettoyage",
      description: "Entretien des filtres et des unités"
    },
    {
      title: "Réglages",
      description: "Optimisation des performances"
    },
    {
      title: "Rapport",
      description: "Compte-rendu détaillé de l'intervention"
    }
  ];

  return <EntretienContent features={features} maintenanceSteps={maintenanceSteps} />;
}