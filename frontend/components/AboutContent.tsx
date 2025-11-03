"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Container from "@/components/Container";
import CTA from "@/components/CTA";
import Heading from "@/components/Heading";
import LogoCloud from "@/components/LogoCloud";
import Section from "@/components/Section";
import AnimatedSection from "@/components/AnimatedSection";
import { useScrollAnimation, animationVariants } from "@/hooks/useScrollAnimation";
import Image from "next/image";

export default function AboutContent() {
  const { ref: valuesRef, isInView: valuesInView } = useScrollAnimation({ amount: 0.2 });
  const { ref: engagementRef, isInView: engagementInView } = useScrollAnimation({ amount: 0.2 });

  const values = [
    {
      title: "Expertise",
      description: "Notre équipe de techniciens qualifiés possède toutes les certifications nécessaires pour garantir des installations conformes aux normes en vigueur."
    },
    {
      title: "Qualité",
      description: "Nous travaillons exclusivement avec les meilleures marques du marché et garantissons la qualité de nos installations."
    },
    {
      title: "Service",
      description: "La satisfaction client est notre priorité. Nous assurons un suivi personnalisé et restons disponibles pour répondre à vos besoins."
    }
  ];

  const engagements = [
    "Installation professionnelle et soignée",
    "Maintenance préventive régulière",
    "Intervention rapide en cas de panne",
    "Conseils personnalisés adaptés à vos besoins",
    "Devis détaillé et transparent"
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden -mt-32 [&_header]:bg-black/80 [&_header]:border-0 min-h-[500px] sm:min-h-[600px]" style={{height: 'calc(100vh + 128px)'}}>
        <Image
            src="/about/about_hero.jpg"
            alt="À propos de Monsieur Clim - Expert climatisation Golfe de Saint-Tropez"
            fill
            sizes="100vw"
            className="object-cover scale-105"
            priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex items-center px-4 sm:px-6 lg:px-8 min-h-[500px] sm:min-h-[600px]" style={{height: 'calc(100vh + 128px)'}}>
          <div className="w-full max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Heading level={1} className="mb-4 text-white">
                  Notre Histoire
                </Heading>
              </motion.div>
              <motion.p 
                className="mb-6 text-lg text-white/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Découvrez notre entreprise familiale dirigée par Nicolas Lounes et son épouse Jennifer, spécialisée dans la climatisation dans tout le golfe de Saint-Tropez. Une entreprise de confiance et de proximité fondée sur des valeurs de rigueur, qualité et service client.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
      
      <Section>
        <Container>
          <AnimatedSection animation="slideUp" delay={0.1}>
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div>
                <Heading level={2}>Notre Histoire</Heading>
                <p className="mt-4">
                  Depuis notre création, MONSIEUR CLIM s'est imposé comme un acteur majeur dans le domaine de la climatisation dans tout le golfe de Saint-Tropez.
                </p>
                <p className="mt-4">
                  Notre entreprise familiale, dirigée par NICOLAS LOUNES et son épouse JENNIFER est fondée sur des valeurs de rigueur, de qualité et de service client, qui font de MONSIEUR CLIM une entreprise de confiance et de proximité, qui vous guide et vous accompagne au mieux dans vos besoins en climatisation.
                </p>
                <p className="mt-4">
                  Notre expertise s'étend de l'installation de vos systèmes de climatisation à leur maintenance, en passant par le dépannage et le conseil personnalisé.
                </p>
              </div>
              <div className="relative w-full rounded-xl overflow-hidden bg-gray-100">
                <div className="aspect-[16/9]">
                  <Image
                    src="/about/mr_clim.jpg"
                    alt="Nicolas Lounes - Monsieur Clim, expert climatisation Golfe de Saint-Tropez"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      <Section className="bg-gradient-to-b from-[#161c2e] to-[#1a2135]">
        <Container>
          <AnimatedSection animation="slideUp" delay={0.1}>
            <Heading level={2} className="text-center">Nos Valeurs</Heading>
          </AnimatedSection>
          
          <motion.div 
            ref={valuesRef}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
            variants={animationVariants.stagger as any}
            className="grid gap-8 mt-12 md:grid-cols-3"
          >
            {values.map((value, index) => (
              <motion.div 
                key={index} 
                variants={animationVariants.staggerItem as any}
                className="p-6 bg-[#1d2438] rounded-lg border border-primary/10 hover:border-primary/20 transition-colors"
              >
                <h3 className="text-xl font-semibold text-primary">{value.title}</h3>
                <p className="mt-4 text-foreground/80">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      <Section>
        <Container>
          <AnimatedSection animation="slideUp" delay={0.1}>
            <Heading level={2} className="text-center">Nos Partenaires</Heading>
            <p className="mt-4 text-center max-w-2xl mx-auto">
              Nous collaborons avec les plus grandes marques du secteur pour vous offrir des solutions de climatisation performantes et durables.
            </p>
          </AnimatedSection>
          <AnimatedSection animation="fadeIn" delay={0.3}>
            <div className="mt-12">
              <LogoCloud />
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      <Section className="bg-gradient-to-b from-[#1a2135] to-[#161c2e]">
        <Container>
          <AnimatedSection animation="slideUp" delay={0.1}>
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div className="relative h-[400px]">
                <Image
                  src="/about/about_engagement.jpg"
                  alt="Service de climatisation dans le Golfe de Saint-Tropez"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                <Heading level={2}>Notre Engagement</Heading>
                <p className="mt-4 text-foreground/80">
                  Chez Monsieur Clim, nous nous engageons à fournir des services de haute qualité tout en respectant l'environnement. Nous privilégions les solutions écoénergétiques et les pratiques durables dans toutes nos interventions.
                </p>
                <motion.ul 
                  ref={engagementRef}
                  initial="hidden"
                  animate={engagementInView ? "visible" : "hidden"}
                  variants={animationVariants.stagger as any}
                  className="mt-6 space-y-4 text-foreground/80"
                >
                  {engagements.map((item, index) => (
                    <motion.li 
                      key={index} 
                      variants={animationVariants.staggerItem as any}
                      className="flex items-center"
                    >
                      <svg className="w-5 h-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      <AnimatedSection animation="slideUp" delay={0.2}>
        <CTA />
      </AnimatedSection>
    </>
  );
}

