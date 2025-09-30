"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import Image from "next/image";
import { useScrollAnimation, animationVariants } from "@/hooks/useScrollAnimation";

export default function LogoCloud() {
  const { ref, isInView } = useScrollAnimation();
  
  const brands = [
    { src: "/brands/mitsubishi.png", alt: "Mitsubishi Electric" },
    { src: "/brands/daikin.png", alt: "Daikin" },
    { src: "/brands/heiwa.png", alt: "Heiwa" },
  ];
  return (
    <Section muted className="py-16">
      <div className="mb-12 text-center">
        <h2 className="font-display text-2xl font-bold mb-4">Nos Partenaires de Confiance</h2>
        <p className="text-lg mb-2">Leaders mondiaux de la climatisation et du confort thermique</p>
        <p className="text-foreground/70">
          Installation, maintenance et SAV officiel — <strong>Mitsubishi Electric</strong>, <strong>Daikin</strong>, et <strong>Heiwa</strong>
        </p>
      </div>
      <motion.div 
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={animationVariants.stagger as any}
        className="grid grid-cols-1 sm:grid-cols-3 items-center justify-items-center gap-16 lg:gap-24 opacity-90 max-w-7xl mx-auto px-8 mb-12"
      >
        {brands.map((b, index) => (
          <motion.div 
            key={b.alt} 
            variants={animationVariants.staggerItem as any}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="w-full flex justify-center items-center px-4"
          >
            <Image src={b.src} alt={b.alt} width={400} height={111} className="object-contain max-w-full" />
          </motion.div>
        ))}
      </motion.div>
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-sm text-foreground/70">
          Nous assurons également l'entretien et le dépannage de toutes les marques grand public. Notre expertise s'étend sur une large gamme de systèmes de climatisation et pompes à chaleur.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-foreground/50">
          <span>Atlantic</span> · <span>LG</span> · <span>Samsung</span> · <span>Toshiba</span> · <span>Fujitsu</span> · <span>Hitachi</span> · <span>Et bien d'autres...</span>
        </div>
      </div>
    </Section>
  );
}
