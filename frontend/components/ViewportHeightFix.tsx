"use client";

import { useEffect } from "react";

/**
 * Composant pour corriger la hauteur du viewport sur mobile
 * Nécessaire car 100vh ne prend pas en compte la barre d'adresse du navigateur
 */
export default function ViewportHeightFix() {
  useEffect(() => {
    function setVhProperty() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    // Initialiser au chargement
    setVhProperty();

    // Mettre à jour lors du redimensionnement avec debounce
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setVhProperty, 100);
    };

    // Mettre à jour lors de l'orientation change
    const handleOrientationChange = () => {
      setTimeout(setVhProperty, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      clearTimeout(resizeTimer);
    };
  }, []);

  return null;
}

