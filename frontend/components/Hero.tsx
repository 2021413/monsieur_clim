"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import Heading from "./Heading";
import Button from "./ui/Button";
import Image from "next/image";
import Link from "next/link";

const HERO_IMAGES = [
  {
    desktop: "/hero/clim1.webp",
    mobile: "/hero/clim1_mobile.webp",
    alt: "Système de climatisation intégré"
  },
  {
    desktop: "/hero/clim2.webp",
    mobile: "/hero/clim2_mobile.webp",
    alt: "Climatisation murale contemporaine"
  },
  {
    desktop: "/hero/clim3.webp",
    mobile: "/hero/clim3_mobile.webp",
    alt: "Installation climatisation design moderne"
  },
  {
    desktop: "/hero/clim4.webp",
    mobile: "/hero/clim4_mobile.webp",
    alt: "Installation climatisation résidentielle"
  },
  {
    desktop: "/hero/clim5.webp",
    mobile: "/hero/clim5_mobile.webp",
    alt: "Climatisation moderne avec technologie avancée"
  },
  {
    desktop: "/hero/clim6.webp",
    mobile: "/hero/clim6_mobile.webp",
    alt: "Installation climatisation élégante"
  },
  {
    desktop: "/hero/clim7.webp",
    mobile: "/hero/clim7_mobile.webp",
    alt: "Système climatisation haute performance"
  }
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    // Détection de la taille d'écran
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const interval = setInterval(() => {
      setCurrentImageIndex((current) => (current + 1) % HERO_IMAGES.length);
    }, 5000); // Change d'image toutes les 5 secondes

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="relative overflow-hidden -mt-32 [&_header]:bg-black/80 [&_header]:border-0 min-h-[600px] sm:min-h-[700px] dynamic-vh">
      {/* Images de fond avec transition */}
      {HERO_IMAGES.map((image, index) => (
        <div
          key={`${image.desktop}-${index}`}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image 
            src={isMobile ? image.mobile : image.desktop}
            alt={image.alt} 
            fill
            sizes="100vw"
            className="animate-ken-burns object-cover scale-110 sm:scale-125"
            priority={index === 0}
          />
        </div>
      ))}
      {/* Overlay pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Contenu */}
      <div className="relative z-10 flex items-center px-4 sm:px-6 lg:px-8 min-h-[600px] sm:min-h-[700px] dynamic-vh">
        <div className="w-full max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Heading level={1} kicker="Climatisation · PAC · Piscine" className="mb-4 text-white">
                Confort thermique <span className="text-primary">toute l'année</span>
              </Heading>
            </motion.div>
            <motion.p 
              className="mb-6 max-w-xl text-lg text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Installation, entretien et dépannage de climatisations et pompes à chaleur dans le Golfe de Saint‑Tropez.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button href="/contact">
                Devis gratuit
              </Button>
              <Button href="/services" variant="secondary">
                Voir les services
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
