"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import Button from "./ui/Button";
import Link from "next/link";
import { useScrollAnimation, animationVariants } from "@/hooks/useScrollAnimation";

export default function CTA() {
  const { ref, isInView } = useScrollAnimation();
  
  return (
    <Section muted className="my-8 sm:my-12 lg:my-16 rounded-xl sm:rounded-2xl py-8 sm:py-10">
      <motion.div 
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={animationVariants.stagger as any}
        className="flex flex-col items-center gap-3 sm:gap-4 text-center"
      >
        <motion.h3 
          variants={animationVariants.staggerItem as any}
          className="font-display text-xl sm:text-2xl"
        >
          Un projet ou une panne ?
        </motion.h3>
        <motion.p 
          variants={animationVariants.staggerItem as any}
          className="text-sm sm:text-base text-foreground/70 max-w-2xl px-4"
        >
          Recevez un devis gratuit et rapide, intervention sur tout le Golfe de Saint‑Tropez.
        </motion.p>
        <motion.div 
          variants={animationVariants.staggerItem as any}
          className="flex flex-col sm:flex-row flex-wrap gap-3 w-full sm:w-auto px-4 sm:px-0"
        >
          <Button href="/contact#contact-form">
            Demander un devis
          </Button>
          <Button href="/contact#contact-form" variant="secondary">
            Nous contacter
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  );
}
