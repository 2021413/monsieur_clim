"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

export interface AnimationConfig {
  amount?: number;
  triggerOnce?: boolean;
  delay?: number;
}

export function useScrollAnimation(config: AnimationConfig = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: config.amount || 0.2,
    once: config.triggerOnce !== false, // Par défaut true
  });

  return { ref, isInView };
}

// Variantes d'animation prédéfinies
export const animationVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  },
  slideDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  },
  slideLeft: {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  },
  slideRight: {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: "easeOut",
        opacity: { duration: 0.6 },
        scale: { duration: 0.7 },
        y: { duration: 0.6 }
      }
    }
  },
  stagger: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  },
  galleryStagger: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  },
  galleryItem: {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut"
      }
    }
  },
  individualScale: {
    hidden: { opacity: 0, scale: 0.7, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        opacity: { duration: 0.6 },
        scale: { duration: 0.8 },
        y: { duration: 0.7 }
      }
    }
  }
};
