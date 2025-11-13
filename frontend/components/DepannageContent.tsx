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
  AnimatedCTASection,
  AnimatedProcessSection 
} from "@/components/ServicePageLayout";

interface DepannageContentProps {
  features: string[];
  processSteps: Array<{ title: string; description: string }>;
}

export default function DepannageContent({ features, processSteps }: DepannageContentProps) {
  return (
    <ServicePageLayout>
      {/* Hero Section */}
      <AnimatedHeroSection
        title="Dépannage et Réparation"
        description="Une équipe de techniciens qualifiés pour un dépannage rapide et efficace de votre installation."
        imageSrc="/services/depannage/hero.webp"
        imageAlt="Dépannage climatisation et PAC"
        buttonText="Demander une intervention"
      />

      {/* Description Section */}
      <AnimatedDescriptionSection>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Heading level={2} className="mb-6">
              Intervention Rapide
            </Heading>
            <p className="mb-4 text-foreground/80">
              Une panne de climatisation ou de pompe à chaleur peut survenir à tout moment. Notre équipe de techniciens expérimentés intervient rapidement pour diagnostiquer et réparer votre installation, quelle que soit la marque.
            </p>
            <p className="mb-8 text-foreground/80">
              Nous travaillons avec un réseau de fournisseurs fiables pour nous procurer rapidement les pièces détachées nécessaires à la réparation de votre installation.
            </p>
            <AnimatedFeaturesList features={features} />
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
            <Image
              src="/services/depannage/depannage2.webp"
              alt="image de dépannage"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </AnimatedDescriptionSection>

      {/* Process Steps Section */}
      <AnimatedProcessSection 
        title="Notre Processus de Dépannage"
        steps={processSteps}
      />

      {/* CTA Section */}
      <AnimatedCTASection 
        title="Besoin d'une Intervention ?"
        description="Ne laissez pas une panne gâcher votre confort. Contactez-nous pour une intervention rapide et professionnelle."
      />
    </ServicePageLayout>
  );
}


