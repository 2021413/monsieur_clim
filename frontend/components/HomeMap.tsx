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
    <div className={`grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-stretch ${className || ''}`}>
      {/* Carte à gauche - Animation depuis la gauche */}
      <motion.div
        ref={mapRef}
        initial="hidden"
        animate={mapInView ? "visible" : "hidden"}
        variants={mapVariants}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="order-2 lg:order-1"
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
        className="min-h-[380px] sm:min-h-[420px] rounded-xl sm:rounded-2xl border border-secondary/10 bg-gradient-to-br from-background to-secondary/5 p-5 sm:p-6 lg:p-8 flex flex-col justify-center shadow-lg order-1 lg:order-2"
      >
        <div className="text-center mb-4 sm:mb-6">
          <h3 className="font-display text-xl sm:text-2xl text-primary mb-1 sm:mb-2">
            Zones d'intervention
          </h3>
          <p className="text-foreground/70 text-xs sm:text-sm">
            Golfe de Saint-Tropez et environs
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-secondary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                <span className="text-secondary text-sm sm:text-base">🏖️</span>
              </div>
              <div>
                <h4 className="font-medium text-secondary mb-0.5 sm:mb-1 text-sm sm:text-base">Communes côtières</h4>
                <p className="text-xs sm:text-sm text-foreground/70">Saint-Tropez, Sainte-Maxime, Ramatuelle, Cavalaire-sur-Mer, La Croix-Valmer...</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                <span className="text-accent text-sm sm:text-base">🏡</span>
              </div>
              <div>
                <h4 className="font-medium text-accent mb-0.5 sm:mb-1 text-sm sm:text-base">Arrière-pays</h4>
                <p className="text-xs sm:text-sm text-foreground/70">La Môle, La Garde-Freinet, Le Plan-de-la-Tour, Grimaud, Cogolin...</p>
              </div>
            </div>
          </div>

          <div className="border-t border-primary/10 pt-3 sm:pt-4">
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div className="text-center p-2 sm:p-3 rounded-lg bg-background/50">
                <div className="text-base sm:text-lg font-bold text-primary">Résidentiel</div>
                <div className="text-[10px] sm:text-xs text-foreground/70">Villas & Appartements</div>
              </div>
              <div className="text-center p-2 sm:p-3 rounded-lg bg-background/50">
                <div className="text-base sm:text-lg font-bold text-secondary">Commercial</div>
                <div className="text-[10px] sm:text-xs text-foreground/70">Bureaux & Commerces</div>
              </div>
            </div>
          </div>

          <div className="text-center pt-2 sm:pt-0">
            <button 
              onClick={() => router.push('/zones')}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors text-xs sm:text-sm font-medium"
            >
              Voir toutes nos zones
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
