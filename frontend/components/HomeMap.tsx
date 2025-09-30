"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import MapWrapper from './MapWrapper';
import { useScrollAnimation, animationVariants } from '@/hooks/useScrollAnimation';

interface HomeMapProps {
  className?: string;
}


export default function HomeMap({ className }: HomeMapProps) {
  const router = useRouter();
  const { ref: mapRef, isInView: mapInView } = useScrollAnimation({ amount: 0.2 });
  const { ref: zoneRef, isInView: zoneInView } = useScrollAnimation({ amount: 0.2 });

  // Variantes d'animation personnalisées avec délais
  const mapVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0
    }
  };

  const zoneVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0
    }
  };

  return (
    <div className={`grid lg:grid-cols-2 gap-12 items-center ${className || ''}`}>
      {/* Carte à gauche - Animation depuis la gauche */}
      <motion.div
        ref={mapRef}
        initial="hidden"
        animate={mapInView ? "visible" : "hidden"}
        variants={mapVariants}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <MapWrapper 
          onZoneClick={() => router.push('/zones')}
          showButton={true}
          interactive={false}
        />
      </motion.div>

      {/* Contenu zones d'intervention à droite - Animation depuis la droite */}
      <motion.div 
        ref={zoneRef}
        initial="hidden"
        animate={zoneInView ? "visible" : "hidden"}
        variants={zoneVariants}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="h-[420px] rounded-2xl border border-secondary/10 bg-gradient-to-br from-background to-secondary/5 p-8 flex flex-col justify-center shadow-lg"
      >
        <div className="text-center mb-6">
          <h3 className="font-display text-2xl text-primary mb-2">
            Zones d'intervention
          </h3>
          <p className="text-foreground/70 text-sm">
            Golfe de Saint-Tropez et environs
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center mt-0.5">
                <span className="text-secondary">🏖️</span>
              </div>
              <div>
                <h4 className="font-medium text-secondary mb-1">Communes côtières</h4>
                <p className="text-sm text-foreground/70">Saint-Tropez, Sainte-Maxime, Ramatuelle, Cavalaire-sur-Mer, La Croix-Valmer...</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mt-0.5">
                <span className="text-accent">🏡</span>
              </div>
              <div>
                <h4 className="font-medium text-accent mb-1">Arrière-pays</h4>
                <p className="text-sm text-foreground/70">La Môle, La Garde-Freinet, Le Plan-de-la-Tour, Grimaud, Cogolin...</p>
              </div>
            </div>
          </div>

          <div className="border-t border-primary/10 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-lg bg-background/50">
                <div className="text-lg font-bold text-primary">Résidentiel</div>
                <div className="text-xs text-foreground/70">Villas & Appartements</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-background/50">
                <div className="text-lg font-bold text-secondary">Commercial</div>
                <div className="text-xs text-foreground/70">Bureaux & Commerces</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={() => router.push('/zones')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              Voir toutes nos zones
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
