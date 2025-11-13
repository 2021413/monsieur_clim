import * as React from "react";
import RealisationsContent from "@/components/RealisationsContent";

const realisations = [
  {
    title: "Installation pompe à chaleur air/eau villa moderne",
    src: "/realisations/r1.webp",
  },
  {
    title: "Climatisation réversible appartement rénové",
    src: "/realisations/r2.webp",
  },
  {
    title: "Installation pompe à chaleur piscine extérieure",
    src: "/realisations/r3.webp",
  },
  {
    title: "Système multi-split maison contemporaine",
    src: "/realisations/r4.webp",
  },
  {
    title: "Installation climatisation gainable villa de luxe",
    src: "/realisations/r5.webp",
  },
  {
    title: "Pompe à chaleur air/air résidence principale",
    src: "/realisations/r6.webp",
  },
  {
    title: "Installation climatisation commerce",
    src: "/realisations/r7.webp",
  },
  {
    title: "Système de climatisation bureau open space",
    src: "/realisations/r8.webp",
  },
  {
    title: "Installation PAC air/eau maison neuve",
    src: "/realisations/r9.webp",
  },
  {
    title: "Climatisation réversible restaurant",
    src: "/realisations/r10.webp",
  },
  {
    title: "Installation pompe à chaleur piscine couverte",
    src: "/realisations/r11.webp",
  },
  {
    title: "Système multi-split villa méditerranéenne",
    src: "/realisations/r12.webp",
  },
  {
    title: "Climatisation gainable appartement haut standing",
    src: "/realisations/r13.webp",
  },
  {
    title: "Installation PAC air/air maison rénovée",
    src: "/realisations/r14.webp",
  },
  {
    title: "Climatisation salle de réunion entreprise",
    src: "/realisations/r15.webp",
  },
  {
    title: "Installation climatisation boutique centre-ville",
    src: "/realisations/r16.webp",
  },
  {
    title: "Pompe à chaleur air/eau maison individuelle",
    src: "/realisations/r17.webp",
  },
  {
    title: "Installation climatisation réversible duplex",
    src: "/realisations/r18.webp",
  },
  {
    title: "Système de climatisation salon de coiffure",
    src: "/realisations/r19.webp",
  },
  {
    title: "Installation PAC piscine résidence secondaire",
    src: "/realisations/r20.webp",
  },
  {
    title: "Climatisation gainable loft industriel",
    src: "/realisations/r21.webp",
  },
  {
    title: "Installation pompe à chaleur maison écologique",
    src: "/realisations/r22.webp",
  },
  {
    title: "Système multi-split cabinet médical",
    src: "/realisations/r23.webp",
  },
];

export const metadata = {
  title: "Nos Réalisations | Climatisation & PAC Golfe de Saint-Tropez",
  description: "Découvrez nos réalisations en climatisation et pompes à chaleur dans le Golfe de Saint-Tropez. Installation, dépannage et entretien par des professionnels qualifiés.",
  openGraph: {
    title: "Nos Réalisations | Monsieur Clim",
    description: "Galerie de nos installations de climatisation et pompes à chaleur dans le Golfe de Saint-Tropez. Qualité professionnelle garantie.",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/realisations/hero.webp",
        width: 1200,
        height: 630,
        alt: "Réalisations Monsieur Clim",
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <RealisationsContent realisations={realisations} />
    </>
  );
}
