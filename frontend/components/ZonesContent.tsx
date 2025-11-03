"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import Image from "next/image";
import MapWrapper from "@/components/MapWrapper";
import AnimatedSection from "@/components/AnimatedSection";
import { useScrollAnimation, animationVariants } from "@/hooks/useScrollAnimation";

export default function ZonesContent() {
  const { ref: mapRef, isInView: mapInView } = useScrollAnimation({ amount: 0.2 });
  const { ref: servicesRef, isInView: servicesInView } = useScrollAnimation({ amount: 0.2 });

  const services = [
    {
      title: "Installation & Remplacement",
      description: "Climatiseurs et pompes à chaleur neufs avec garantie. Devis gratuit dans les plus brefs délais.",
      icon: "🔧"
    },
    {
      title: "Dépannage Express",
      description: "Intervention dans toute la zones. Réparation sur place ou échange.",
      icon: "⚡"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden -mt-32 [&_header]:bg-black/80 [&_header]:border-0 min-h-[500px] sm:min-h-[600px]" style={{height: 'calc(100vh + 128px)'}}>
        <Image
            src="/zones/hero.jpg"
            alt="Pompe à chaleur Air/Air"
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
                  Zones d'intervention
                </Heading>
              </motion.div>
              <motion.p 
                className="mb-6 text-lg text-white/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Monsieur Clim intervient dans tout le Golfe de Saint-Tropez et les communes environnantes pour vos besoins en climatisation et pompes à chaleur. De la côte (Saint-Tropez à Rayol-Canadel) aux villages de l'arrière-pays (La Môle, La Garde-Freinet, Le Plan-de-la-Tour), notre équipe se déplace rapidement.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
      
      <main>
        {/* Carte interactive */}
        <Section gradient="primary" className="pt-8">
          <Container>
            <AnimatedSection animation="slideUp" delay={0.1}>
              <Heading level={2} className="mb-8 text-center">
                Notre zone de couverture
              </Heading>
            </AnimatedSection>
            
            <motion.div 
              ref={mapRef}
              initial="hidden"
              animate={mapInView ? "visible" : "hidden"}
              variants={animationVariants.stagger as any}
              className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-8 lg:mb-12"
            >
              <motion.div variants={animationVariants.slideRight as any} className="order-2 lg:order-1">
                <MapWrapper interactive={true} />
              </motion.div>
              
              <motion.div 
                variants={animationVariants.slideLeft as any}
                className="space-y-6 order-1 lg:order-2"
              >
                <div>
                  <h3 className="font-display text-xl text-primary mb-3">
                    Intervention dans tout le Golfe de Saint-Tropez
                  </h3>
                  <p className="text-foreground/80 mb-4">
                    Notre équipe couvre l'ensemble du territoire du Golfe de Saint-Tropez, des communes côtières prestigieuses aux villages de l'arrière-pays.
                  </p>
                </div>
                
                <div className="grid gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center mt-0.5">
                      <span className="text-secondary">🏖️</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-secondary mb-1">Communes côtières</h4>
                      <p className="text-sm text-foreground/70">Saint-Tropez, Sainte-Maxime, Ramatuelle, Cavalaire-sur-Mer, La Croix-Valmer, Rayol-Canadel-sur-Mer</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mt-0.5">
                      <span className="text-accent">🏡</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-accent mb-1">Villages de l'arrière-pays</h4>
                      <p className="text-sm text-foreground/70">La Môle, La Garde-Freinet, Le Plan-de-la-Tour, Grimaud, Cogolin, Gassin...</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h4 className="font-display text-lg text-white mb-3">Types de projets</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 rounded-lg bg-white/5">
                      <div className="text-2xl font-bold text-primary">Résidentiel</div>
                      <div className="text-xs text-foreground/70">Villas & Appartements</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/5">
                      <div className="text-2xl font-bold text-secondary">Commercial</div>
                      <div className="text-xs text-foreground/70">Bureaux & Commerces</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </Container>
        </Section>

        {/* Services dans la zones */}
        <Section gradient="secondary">
          <Container>
            <div className="mx-auto max-w-3xl">
              <AnimatedSection animation="slideUp" delay={0.1}>
                <Heading level={2} className="mb-8 text-center">
                  Services disponibles dans toute la zone
                </Heading>
              </AnimatedSection>
              
              <motion.div 
                ref={servicesRef}
                initial="hidden"
                animate={servicesInView ? "visible" : "hidden"}
                variants={animationVariants.stagger as any}
                className="grid gap-6 md:grid-cols-2"
              >
                {services.map((service) => (
                  <motion.div 
                    key={service.title} 
                    variants={animationVariants.staggerItem as any}
                    className="rounded-xl border border-accent/20 bg-gradient-to-br from-accent/5 to-background p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <h3 className="font-display text-lg text-accent mb-3 flex items-center gap-3">
                      <span className="text-2xl">{service.icon}</span>
                      {service.title}
                    </h3>
                    <p className="text-sm text-foreground/70">
                      {service.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </Container>
        </Section>
      </main>
    </>
  );
}

