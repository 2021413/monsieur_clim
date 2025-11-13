"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import Container from "@/components/Container";
import AnimatedSection from "@/components/AnimatedSection";
import { useScrollAnimation, animationVariants } from "@/hooks/useScrollAnimation";
import Image from "next/image";
import Link from "next/link";

interface Service {
  title: string;
  description: string;
  href: string;
  image: string;
}

interface ServicesPageContentProps {
  services: Service[];
}

export default function ServicesPageContent({ services }: ServicesPageContentProps) {
  const { ref: gridRef, isInView: gridInView } = useScrollAnimation({ amount: 0.1 });
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
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden -mt-32 [&_header]:bg-black/80 [&_header]:border-0 min-h-[500px] sm:min-h-[600px]" style={{height: 'calc(100vh + 128px)'}}>
        <Image
            src={isMobile ? "/services/hero2.webp" : "/services/hero.webp"}
            alt="Services de climatisation et pompe à chaleur Monsieur Clim"
            fill
            sizes="100vw"
            className="object-cover scale-105 sm:scale-110"
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
                  Nos Services Complets
                </Heading>
              </motion.div>
              <motion.p 
                className="mb-6 text-lg text-white/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Découvrez nos services complets en climatisation et pompes à chaleur
                dans le golf de Saint-Tropez. Chaque projet est réalisé avec le plus grand soin pour
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
                Nos services
              </Heading>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                Des solutions complètes pour tous vos besoins en climatisation et pompes à chaleur.
              </p>
            </div>
          </AnimatedSection>

          <motion.div 
            ref={gridRef}
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
            variants={animationVariants.stagger as any}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={animationVariants.staggerItem as any}
              >
                <Link
                  href={service.href}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lg transition-all hover:shadow-xl block"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20">
                    <div className="absolute bottom-0 p-6 text-text-light">
                      <h3 className="mb-2 font-display text-2xl font-semibold">
                        {service.title}
                      </h3>
                      <p className="text-text-light">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>
    </>
  );
}

