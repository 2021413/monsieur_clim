"use client";

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

interface PacPiscineContentProps {
  features: string[];
  benefits: Array<{ title: string; description: string }>;
}

export default function PacPiscineContent({ features, benefits }: PacPiscineContentProps) {
  return (
    <ServicePageLayout>
      {/* Hero Section */}
      <AnimatedHeroSection
        title="Pompe à Chaleur Piscine"
        description="Profitez de votre piscine plus longtemps dans l'année avec une solution de chauffage économique et écologique."
        imageSrc="/services/pac_piscine/hero.jpg"
        imageAlt="Pompe à chaleur Piscine"
      />

      {/* Description Section */}
      <AnimatedDescriptionSection>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Heading level={2} className="mb-6">
              Le Confort de la Baignade Toute l'Année
            </Heading>
            <p className="mb-4 text-foreground/80">
              La pompe à chaleur piscine est la solution idéale pour chauffer votre piscine de manière économique. Elle utilise les calories présentes dans l'air pour chauffer l'eau de votre piscine, vous permettant ainsi de profiter de votre bassin plus longtemps dans l'année.
            </p>
            <p className="mb-8 text-foreground/80">
              Nos experts vous conseillent sur le choix de la PAC adaptée à votre piscine et assurent une installation professionnelle pour des performances optimales.
            </p>
            <AnimatedFeaturesList features={features} />
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
            <Image
              src="/services/pac_piscine/piscine2.jpg"
              alt="Installation PAC Piscine"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </AnimatedDescriptionSection>

      {/* Benefits Section */}
      <AnimatedBenefitsSection 
        title="Les Avantages de la PAC Piscine"
        benefits={benefits}
      />

      {/* CTA Section */}
      <AnimatedCTASection 
        title="Étendez votre Saison de Baignade"
        description="Découvrez comment une PAC piscine peut prolonger vos plaisirs aquatiques tout en maîtrisant vos coûts énergétiques."
      />
    </ServicePageLayout>
  );
}


