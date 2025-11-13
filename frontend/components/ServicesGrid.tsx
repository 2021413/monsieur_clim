"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import Heading from "./Heading";
import Image from "next/image";
import Link from "next/link";
import { useScrollAnimation, animationVariants } from "@/hooks/useScrollAnimation";

export default function ServicesGrid() {
  const { ref, isInView } = useScrollAnimation();
  
  const items = [
    {
      title: "Installation",
      description: "Climatisation PAC air/air, PAC air/eau, PAC piscine",
      tagline: "Un confort optimal pour votre habitat",
      href: "/services/installation",
      image: "/services/installation/installation1.webp"
    },
    {
      title: "Entretien",
      description: "Contrats & maintenances toutes marques",
      tagline: "La durabilité de vos équipements assurée",
      href: "/services/entretien",
      image: "/services/entretien/entretien1.webp"
    },
    {
      title: "Dépannage",
      description: "Diagnostic & réparation rapides",
      tagline: "Une intervention rapide et efficace",
      href: "/services/depannage",
      image: "/services/depannage/depannage1.webp"
    },
  ];
  
  return (
    <Section className="py-16">
      <Heading level={2} className="mb-12 text-center">Nos services</Heading>
      <motion.div 
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={animationVariants.stagger as any}
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            variants={animationVariants.staggerItem as any}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <Link 
              href={item.href}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lg transition-all hover:shadow-xl block"
            >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10">
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="mb-2 font-display text-2xl font-semibold">
                  {item.title}
                </h3>
                <p className="mb-2 text-white/90">
                  {item.description}
                </p>
                <p className="text-sm font-light text-white/75 italic">
                  {item.tagline}
                </p>
              </div>
            </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
