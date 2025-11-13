"use client";

import * as React from "react";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import Image from "next/image";
import Button from "@/components/ui/Button";
import ServicePageLayout, { 
  AnimatedDescriptionSection, 
  AnimatedBenefitsSection,
  AnimatedFeaturesList,
  AnimatedCTASection,
  AnimatedProcessSection 
} from "@/components/ServicePageLayout";
import { motion } from "framer-motion";

interface InstallationContentProps {
  features: string[];
  processSteps: Array<{ title: string; description: string }>;
}

// Composant Hero personnalisé avec transition avant/après
function InstallationHeroSection() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative overflow-hidden -mt-32 [&_header]:bg-black/80 [&_header]:border-0 min-h-[500px] sm:min-h-[600px] dynamic-vh">
      {/* Container pour les images avec transition infinie */}
      <div className="absolute inset-0">
        <div className="w-[200%] h-full flex installation-hero-slide">
          {/* Image avant */}
          <div className="w-1/2 h-full relative">
            <Image
              src={isMobile ? "/services/installation/installation_avant_mobile.webp" : "/services/installation/installation_avant.webp"}
              alt="Installation avant - Avant les travaux"
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority
            />
          </div>
          {/* Image après */}
          <div className="w-1/2 h-full relative">
            <Image
              src={isMobile ? "/services/installation/installation_apres_mobile.webp" : "/services/installation/installation_apres.webp"}
              alt="Installation après - Après les travaux"
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </div>
      
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Contenu texte */}
      <div className="relative z-10 flex items-center px-4 sm:px-6 lg:px-8 min-h-[500px] sm:min-h-[600px] dynamic-vh">
        <div className="w-full max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Heading level={1} className="mb-4 text-white">
                Installation Professionnelle
              </Heading>
            </motion.div>
            <motion.p 
              className="mb-6 text-lg text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Une installation soignée et garantie de votre système de climatisation ou pompe à chaleur par des experts certifiés.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button href="/contact">Demander un devis</Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InstallationContent({ features, processSteps }: InstallationContentProps) {
  return (
    <ServicePageLayout>
      {/* Hero Section avec transition avant/après */}
      <InstallationHeroSection />

      {/* Description Section */}
      <AnimatedDescriptionSection>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Heading level={2} className="mb-6">
              Installation Experte et Garantie
            </Heading>
            <p className="mb-4 text-foreground/80">
              L'installation de votre système de climatisation ou pompe à chaleur est une étape cruciale qui détermine les performances et la durabilité de votre équipement. Nos techniciens certifiés respectent scrupuleusement les normes en vigueur.
            </p>
            <p className="mb-8 text-foreground/80">
              De l'étude préalable à la mise en service, nous vous accompagnons à chaque étape pour garantir une installation parfaite adaptée à vos besoins et contraintes techniques.
            </p>
            <AnimatedFeaturesList features={features} />
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
            <Image
              src="/services/installation/installation2.webp"
              alt="Technicien installation climatisation"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </AnimatedDescriptionSection>

      {/* Process Section */}
      <AnimatedProcessSection 
        title="Notre Processus d'Installation"
        steps={processSteps}
      />

      {/* CTA Section */}
      <AnimatedCTASection 
        title="Planifiez votre Installation"
        description="Confiez l'installation de votre système à des professionnels expérimentés pour une tranquillité d'esprit totale."
      />
    </ServicePageLayout>
  );
}


