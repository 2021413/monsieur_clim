import * as React from "react";
import DepannageContent from "@/components/DepannageContent";

export const metadata = {
  title: "Dépannage climatisation urgence | Réparation Golfe de Saint-Tropez",
  description: "Dépannage et réparation de climatisation et pompes à chaleur dans le Golfe de Saint-Tropez. Intervention rapide, diagnostic précis, pièces de qualité. Devis gratuit.",
  openGraph: {
    title: "Dépannage | Monsieur Clim",
    description: "Service de dépannage rapide pour vos équipements de climatisation et pompes à chaleur en panne.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function Page() {
  const features = [
    "Intervention rapide",
    "Diagnostic précis et transparent",
    "Pièces détachées de qualité",
    "Techniciens certifiés et expérimentés",
    "Devis gratuit avant intervention",
  ];

  const processSteps = [
    {
      title: "Contact",
      description: "Appelez-nous pour décrire votre problème"
    },
    {
      title: "Diagnostic",
      description: "Analyse complète de votre installation"
    },
    {
      title: "Devis",
      description: "Proposition de réparation transparente"
    },
    {
      title: "Réparation",
      description: "Intervention rapide avec des pièces de qualité"
    }
  ];

  return <DepannageContent features={features} processSteps={processSteps} />;
}