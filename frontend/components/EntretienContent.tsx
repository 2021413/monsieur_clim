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

interface EntretienContentProps {
  features: string[];
  maintenanceSteps: Array<{ title: string; description: string }>;
}

// Composant Hero personnalisé avec carrousel de 4 images
function EntretienHeroSection() {
  const images = [
    {
      src: "/services/entretien/hero1.jpg",
      alt: "Entretien climatisation - Nettoyage des filtres"
    },
    {
      src: "/services/entretien/hero2.jpg", 
      alt: "Entretien climatisation - Vérification technique"
    },
    {
      src: "/services/entretien/hero3.jpg",
      alt: "Entretien climatisation - Maintenance extérieure"
    },
    {
      src: "/services/entretien/hero4.jpg",
      alt: "Entretien climatisation - Contrôle qualité"
    }
  ];

  return (
    <div className="relative overflow-hidden -mt-32 [&_header]:bg-black/80 [&_header]:border-0 min-h-[500px] sm:min-h-[600px]" style={{height: 'calc(100vh + 128px)'}}>
      {/* Container pour les images avec défilement */}
      <div className="absolute inset-0">
        <div className="w-[400%] h-full flex entretien-hero-carousel">
          {images.map((image, index) => (
            <div key={index} className="w-1/4 h-full relative">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Contenu texte */}
      <div className="relative z-10 flex items-center px-4 sm:px-6 lg:px-8 min-h-[500px] sm:min-h-[600px]" style={{height: 'calc(100vh + 128px)'}}>
        <div className="w-full max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Heading level={1} className="mb-4 text-white">
                Entretien et Maintenance
              </Heading>
            </motion.div>
            <motion.p 
              className="mb-6 text-lg text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Un entretien régulier garantit les performances optimales et la longévité de votre installation.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button href="/contact">Planifier un entretien</Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EntretienContent({ features, maintenanceSteps }: EntretienContentProps) {
  return (
    <ServicePageLayout>
      {/* Hero Section avec carrousel d'images */}
      <EntretienHeroSection />

      {/* Description Section */}
      <AnimatedDescriptionSection>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Heading level={2} className="mb-6">
              Préservez vos Équipements et la Santé de vos Proches
            </Heading>
            <p className="mb-4 text-foreground/80">
                Il est vivement recommandé de réaliser tous les ans, un entretien minutieux et régulier de votre climatisation afin de maintenir le matériel en bon état de fonctionnement et de le nettoyer pour s'assurer de votre bonne santé. En effet il permet d'éviter la prolifération des bactéries, virus et parasites qui sont pathogènes pour l'homme et peuvent causer des allergies, des problèmes cutanés et oculaires ainsi que des maladies respiratoires.
            </p>
            <p className="mb-8 text-foreground/80">
              Nous proposons des contrats d'entretien adaptés à vos besoins, avec des interventions programmées pour une tranquillité d'esprit totale.
            </p>
            <AnimatedFeaturesList features={features} />
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
            <Image
              src="/services/entretien/entretien2.png"
              alt="entretien avant/après"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </AnimatedDescriptionSection>

      {/* Maintenance Steps Section */}
      <AnimatedProcessSection 
        title="Notre Processus d'Entretien"
        steps={maintenanceSteps}
      />

      {/* CTA Section */}
      <AnimatedCTASection 
        title="Planifiez votre Entretien"
        description="Assurez la performance et la durabilité de votre installation avec nos contrats d'entretien sur mesure."
      />
    </ServicePageLayout>
  );
}


