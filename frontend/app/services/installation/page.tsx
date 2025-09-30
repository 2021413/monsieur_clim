import * as React from "react";
import InstallationContent from "@/components/InstallationContent";

export const metadata = {
  title: "Installation climatisation & PAC | Golfe de Saint-Tropez",
  description: "Installation professionnelle de climatisation et pompes à chaleur dans le Golfe de Saint-Tropez. Étude technique, pose selon les normes, mise en service. Devis gratuit.",
  openGraph: {
    title: "Installation | Monsieur Clim",
    description: "Installation professionnelle de climatisation et pompes à chaleur par des experts qualifiés.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function Page() {
  const features = [
    "Étude technique préalable",
    "Installation selon les normes",
    "Mise en service et réglages",
    "Formation à l'utilisation",
    "Garantie constructeur",
    "Service après-vente",
  ];

  const processSteps = [
    {
      title: "Étude",
      description: "Analyse de vos besoins et de votre logement"
    },
    {
      title: "Devis",
      description: "Proposition détaillée et transparente"
    },
    {
      title: "Installation",
      description: "Pose professionnelle par nos experts"
    },
    {
      title: "Mise en service",
      description: "Tests et formation à l'utilisation"
    }
  ];

  return <InstallationContent features={features} processSteps={processSteps} />;
}