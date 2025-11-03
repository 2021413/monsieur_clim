import * as React from "react";
import ServicesPageContent from "@/components/ServicesPageContent";

export const metadata = {
  title: "Services climatisation & pompes à chaleur Golfe de Saint-Tropez",
  description: "Découvrez nos services complets : installation PAC air/air, air/eau, piscine, entretien et dépannage de climatisation dans le Golfe de Saint-Tropez. Devis gratuit.",
  openGraph: {
    title: "Services | Monsieur Clim",
    description: "Installation, entretien et dépannage de climatisation et pompes à chaleur dans le Golfe de Saint-Tropez. Tous types d'équipements.",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/services/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Services Monsieur Clim",
      },
    ],
  },
};

export default function Page() {
  const services = [
    {
      title: "PAC Air/Air",
      description: "Solution idéale pour la climatisation et le chauffage",
      href: "/services/pac-air-air",
      image: "/services/pac_air_air/air_air1.jpg"
    },
    {
      title: "PAC Air/Eau",
      description: "Chauffage et eau chaude sanitaire écologique",
      href: "/services/pac-air-eau",
      image: "/services/pac_air_eau/air_eau1.jpg"
    },
    {
      title: "PAC Piscine",
      description: "Profitez de votre piscine toute l'année",
      href: "/services/pac-piscine",
      image: "/services/pac_piscine/piscine1.jpg"
    },
    {
      title: "Installation",
      description: "Installation professionnelle de vos équipements",
      href: "/services/installation",
      image: "/services/installation/installation1.jpg"
    },
    {
      title: "Entretien",
      description: "Maintenance régulière pour une performance optimale",
      href: "/services/entretien",
      image: "/services/entretien/entretien1.jpg"
    },
    {
      title: "Dépannage",
      description: "Intervention rapide en cas de panne",
      href: "/services/depannage",
      image: "/services/depannage/depannage1.jpg"
    }
  ];

  return <ServicesPageContent services={services} />;
}
