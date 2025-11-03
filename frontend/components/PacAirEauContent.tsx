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

interface PacAirEauContentProps {
  features: string[];
  benefits: Array<{ title: string; description: string }>;
}

export default function PacAirEauContent({ features, benefits }: PacAirEauContentProps) {
  return (
    <ServicePageLayout>
      {/* Hero Section */}
      <AnimatedHeroSection
        title="Pompe à Chaleur Air/Eau"
        description="La solution moderne pour le chauffage et l'eau chaude sanitaire de votre maison, économique et respectueuse de l'environnement."
        imageSrc="/services/pac_air_eau/hero.jpg"
        imageAlt="Pompe à chaleur Air/Eau"
      />

      {/* Description Section */}
      <AnimatedDescriptionSection>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Heading level={2} className="mb-6">
              Chauffage et Eau Chaude Écologiques
            </Heading>
            <p className="mb-4 text-foreground/80">
              La pompe à chaleur air/eau puise les calories dans l'air extérieur pour produire le chauffage et l'eau chaude sanitaire de votre logement. Cette technologie innovante peut remplacer avantageusement votre ancienne chaudière.
            </p>
            <p className="mb-8 text-foreground/80">
              Compatible avec vos radiateurs existants et le plancher chauffant, elle s'intègre parfaitement dans votre installation actuelle tout en réduisant considérablement vos factures énergétiques.
            </p>
            <AnimatedFeaturesList features={features} />
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
            <Image
              src="/services/pac_air_eau/air_eau2.jpg"
              alt="Installation PAC Air/Eau"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </AnimatedDescriptionSection>

      {/* Benefits Section */}
      <AnimatedBenefitsSection 
        title="Les Avantages de la PAC Air/Eau"
        benefits={benefits}
      />

      {/* CTA Section */}
      <AnimatedCTASection 
        title="Modernisez votre Chauffage"
        description="Découvrez comment une PAC air/eau peut transformer votre confort tout en réduisant vos factures énergétiques."
      />
    </ServicePageLayout>
  );
}


