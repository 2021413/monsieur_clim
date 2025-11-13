"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";
import Button from "@components/ui/Button";
import AnimatedSection from "@/components/AnimatedSection";
import { useScrollAnimation, animationVariants } from "@/hooks/useScrollAnimation";

export default function ContactContent() {
  const { ref: formRef, isInView: formInView } = useScrollAnimation({ amount: 0.2 });

  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden -mt-32 [&_header]:bg-black/80 [&_header]:border-0 min-h-[500px] sm:min-h-[600px] dynamic-vh">
        <Image
            src="/contact/hero.webp"
            alt="Contactez Monsieur Clim - Expert climatisation Golfe de Saint-Tropez"
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
                  Contactez Monsieur Clim
                </Heading>
              </motion.div>
              <motion.p 
                className="mb-6 text-lg text-white/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Une question ? Un projet ? Notre équipe d'experts est à votre écoute pour vous accompagner dans tous vos besoins en climatisation.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button href="#contact-form" variant="secondary" className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  Contactez-nous
                </Button>
                <Button href="#contact-form" className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Demander un devis
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Section principale avec formulaire centré */}
      <Section className="relative overflow-hidden bg-gradient-to-br from-background via-background/95 to-header-dark">
        <div className="max-w-6xl mx-auto">
          {/* Titre et description centrés */}
          <AnimatedSection animation="slideUp" delay={0.1}>
            <div id="contact-form" className="text-center mb-16 pt-32 -mt-32">
              <Heading level={2} kicker="Contact" className="mb-6">
                Parlons de votre projet
              </Heading>
              <p className="text-xl text-muted max-w-3xl mx-auto">
                Besoin d'un devis, d'un conseil ou d'une intervention ? 
                Remplissez le formulaire ci-dessous et nous vous recontacterons dans les plus brefs délais.
              </p>
            </div>
          </AnimatedSection>

          {/* Contenu principal en grille */}
          <motion.div 
            ref={formRef}
            initial="hidden"
            animate={formInView ? "visible" : "hidden"}
            variants={animationVariants.stagger as any}
            className="grid gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-3"
          >
            
            {/* Formulaire (2 colonnes sur desktop) */}
            <motion.div 
              variants={animationVariants.slideLeft as any}
              className="lg:col-span-2 order-2 lg:order-1"
            >
              <ContactForm />
            </motion.div>

            {/* Informations de contact (1 colonne) */}
            <motion.div 
              variants={animationVariants.slideRight as any}
              className="relative order-1 lg:order-2"
            >
              {/* Carte d'informations principale */}
              <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-background/80 to-accent/5 backdrop-blur-xl border border-primary/20 p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Contactez-nous
                  </h3>
                  <p className="text-muted">Réponse garantie</p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-foreground">Réponse rapide</h4>
                      <p className="text-sm text-muted leading-relaxed">
                        en semaine
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-accent/5 to-transparent border border-accent/10">
                    <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-foreground">Devis gratuit</h4>
                      <p className="text-sm text-muted leading-relaxed">
                        Sans engagement
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-secondary/5 to-transparent border border-secondary/10">
                    <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-foreground">Zone d'intervention</h4>
                      <p className="text-sm text-muted leading-relaxed">
                        Golfe de Saint-Tropez
                      </p>
                    </div>
                  </div>
                </div>

                {/* Zone d'intervention avec style spécial */}
                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <h4 className="font-display font-semibold text-foreground">Zone d'intervention</h4>
                  </div>
                  <p className="text-sm text-muted">
                    Golfe de Saint-Tropez et région. Consultez notre carte des zones pour plus de détails.
                  </p>
                  <Button href="/zones" variant="secondary" className="mt-4 w-full">
                    Voir la carte
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Éléments décoratifs de fond */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/10 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-secondary/20 to-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-2xl -z-10" />
      </Section>
    </>
  );
}

