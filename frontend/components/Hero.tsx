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
  src: "/hero/clim1.webp",
  alt: "Système de climatisation intégré"
  },
  {
    src: "/hero/clim2.webp",
    alt: "Climatisation murale contemporaine"
  },
  {
    src: "/hero/clim3.webp",
    alt: "Installation climatisation design moderne"
  },
  {
    src: "/hero/clim4.webp",
    alt: "Installation climatisation résidentielle"
  },
  {
    src: "/hero/clim5.webp",
    alt: "Climatisation moderne avec technologie avancée"
  },
  {
    src: "/hero/clim6.webp",
    alt: "Installation climatisation élégante"
  },
  {
    src: "/hero/clim7.webp",
    alt: "Système climatisation haute performance"
  }
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((current) => (current + 1) % HERO_IMAGES.length);
    }, 5000); // Change d'image toutes les 5 secondes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden -mt-32 [&_header]:bg-black/80 [&_header]:border-0 min-h-[600px] sm:min-h-[700px]" style={{height: 'calc(100vh + 128px)'}}>
      {/* Images de fond avec transition */}
      {HERO_IMAGES.map((image, index) => (
        <div
          key={image.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image 
            src={image.src} 
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
      <div className="relative z-10 flex items-center px-4 sm:px-6 lg:px-8 min-h-[600px] sm:min-h-[700px]" style={{height: 'calc(100vh + 128px)'}}>
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
