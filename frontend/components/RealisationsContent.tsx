"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import GalleryItem from "@/components/GalleryItem";
import AnimatedSection from "@/components/AnimatedSection";
import Image from "next/image";

interface Realisation {
  title: string;
  src: string;
}

interface RealisationsContentProps {
  realisations: Realisation[];
}

export default function RealisationsContent({ realisations }: RealisationsContentProps) {

  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden -mt-32 [&_header]:bg-black/80 [&_header]:border-0 min-h-[500px] sm:min-h-[600px] dynamic-vh">
        <Image
            src="/realisations/hero.webp"
            alt="Réalisations Monsieur Clim - Installations climatisation et pompes à chaleur"
            fill
            sizes="100vw"
            className="object-cover scale-105 sm:scale-110"
            priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex items-center px-4 sm:px-6 lg:px-8 min-h-[500px] sm:min-h-[600px] dynamic-vh">
          <div className="w-full max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Heading level={1} className="mb-4 text-white">
                  Des installations de qualité par des experts qualifiés
                </Heading>
              </motion.div>
              <motion.p 
                className="mb-6 text-lg text-white/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Découvrez quelques-unes de nos réalisations récentes en climatisation et pompes à chaleur
                dans le Golfe de Saint-Tropez. Chaque projet est réalisé avec le plus grand soin pour
                garantir votre confort.
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      <Section gradient="primary">
        <Container>
          <AnimatedSection animation="slideUp" delay={0.1}>
            <div className="text-center mb-12">
              <Heading level={2} className="mb-4">
                Nos réalisations récentes
              </Heading>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                Découvrez notre savoir-faire à travers une sélection de projets réalisés avec expertise et passion dans le Golfe de Saint-Tropez.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {realisations.map((realisation, index) => (
              <GalleryItem
                key={realisation.src}
                title={realisation.title}
                src={realisation.src}
              />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
