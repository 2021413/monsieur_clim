import * as React from "react";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import Image from "next/image";
import Button from "@/components/ui/Button";
import ServicePageLayout, { 
  AnimatedHeroSection, 
  AnimatedDescriptionSection, 
  AnimatedBenefitsSection,
  AnimatedFeaturesList,
  AnimatedCTASection 
} from "@/components/ServicePageLayout";

export const metadata = {
  title: "Climatisation réversible PAC air/air | Installation Golfe de Saint-Tropez",
  description: "Installation et entretien de climatisation réversible (PAC air/air) dans le Golfe de Saint-Tropez. Chauffage et climatisation en un seul système. Devis gratuit.",
  openGraph: {
    title: "PAC Air/Air | Monsieur Clim",
    description: "Climatisation réversible pour chauffage et refroidissement. Installation professionnelle dans le Golfe de Saint-Tropez.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function Page() {
  const features = [
    "Chauffage et climatisation en un seul système",
    "Installation flexible (mono ou multi-split)",
    "Technologie Inverter pour plus d'économies",
    "Fonctionnement silencieux",
    "Contrôle précis de la température",
    "Filtration de l'air intégrée",
  ];

  const benefits = [
    {
      title: "Économique",
      description: "Jusqu'à 70% d'économies par rapport à un chauffage électrique"
    },
    {
      title: "Polyvalent", 
      description: "Chauffage en hiver, climatisation en été"
    },
    {
      title: "Efficace",
      description: "Performances élevées même par températures négatives"
    }
  ];

  return (
    <ServicePageLayout>
      {/* Hero Section */}
      <AnimatedHeroSection
        title="Pompe à Chaleur Air/Air"
        description="La solution idéale pour chauffer et climatiser votre intérieur avec un seul système performant et économique."
        imageSrc="/hero/clim2.jpg"
        imageAlt="Pompe à chaleur Air/Air"
      />

      {/* Description Section */}
      <AnimatedDescriptionSection>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Heading level={2} className="mb-6">
              Chauffage et Climatisation Réversible
            </Heading>
            <p className="mb-4 text-foreground/80">
              La pompe à chaleur air/air, aussi appelée climatisation réversible, est la solution parfaite pour maintenir une température idéale toute l'année. Elle puise les calories dans l'air extérieur pour chauffer en hiver et inverse son cycle pour rafraîchir en été.
            </p>
            <p className="mb-8 text-foreground/80">
              Disponible en version mono-split (une unité extérieure pour une unité intérieure) ou multi-split (une unité extérieure pour plusieurs unités intérieures), elle s'adapte à tous les logements.
            </p>
            <AnimatedFeaturesList features={features} />
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
            <Image
              src="/hero/clim1.jpg"
              alt="Installation PAC Air/Air"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </AnimatedDescriptionSection>

      {/* Benefits Section */}
      <AnimatedBenefitsSection 
        title="Les Avantages de la PAC Air/Air"
        benefits={benefits}
      />

      {/* CTA Section */}
      <AnimatedCTASection 
        title="Découvrez la PAC Air/Air"
        description="Obtenez le confort toute l'année avec une solution économique et écologique adaptée à vos besoins."
      />
    </ServicePageLayout>
  );
}