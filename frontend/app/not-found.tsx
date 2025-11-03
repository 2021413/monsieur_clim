"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Heading from "@/components/Heading";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {/* Grand 404 stylisé */}
          <div className="text-9xl font-bold mb-4">
            <span className="text-primary">4</span>
            <span className="text-secondary">0</span>
            <span className="text-accent">4</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Heading level={1} className="mb-4 text-text-light">
            Page introuvable
          </Heading>
          <p className="text-lg text-text-light/80 mb-8 max-w-md mx-auto">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée. 
            Retournez à l'accueil pour découvrir nos services de climatisation et pompes à chaleur.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button href="/" variant="primary">
            Retour à l'accueil
          </Button>
          <Button href="/contact" variant="secondary">
            Nous contacter
          </Button>
        </motion.div>

        {/* Liens rapides */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 pt-8 border-t border-text-light/10"
        >
          <p className="text-sm text-text-light/60 mb-4">Liens utiles :</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link 
              href="/services" 
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Nos services
            </Link>
            <Link 
              href="/realisations" 
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Réalisations
            </Link>
            <Link 
              href="/about" 
              className="text-primary hover:text-primary/80 transition-colors"
            >
              À propos
            </Link>
            <Link 
              href="/zones" 
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Zones d'intervention
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

