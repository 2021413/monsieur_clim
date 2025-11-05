'use client';

/**
 * Contexte React pour gérer le consentement des cookies
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { CookieConsent } from '@/types/cookies';
import {
  DEFAULT_CONSENT,
  getCookiePreferences,
  saveCookiePreferences,
  hasConsent as checkHasConsent,
  deleteNonEssentialCookies,
  loadGoogleAnalytics,
  disableGoogleAnalytics,
} from '@/lib/cookies';

interface CookieConsentContextType {
  consent: CookieConsent;
  hasConsent: boolean;
  showBanner: boolean;
  showSettings: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  updateConsent: (consent: CookieConsent) => void;
  openSettings: () => void;
  closeSettings: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

interface CookieConsentProviderProps {
  children: ReactNode;
}

export function CookieConsentProvider({ children }: CookieConsentProviderProps) {
  const [consent, setConsent] = useState<CookieConsent>(DEFAULT_CONSENT);
  const [hasConsent, setHasConsent] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  // Charger les préférences au montage du composant
  useEffect(() => {
    setIsClient(true);
    
    const preferences = getCookiePreferences();
    
    if (preferences) {
      setConsent(preferences.consent);
      setHasConsent(true);
      setShowBanner(false);
      
      // Charger les scripts selon les préférences
      applyConsent(preferences.consent);
    } else {
      setShowBanner(true);
      setHasConsent(false);
    }
  }, []);

  // Appliquer le consentement (charger ou désactiver les scripts)
  const applyConsent = (newConsent: CookieConsent) => {
    if (typeof window === 'undefined') return;

    const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    // Google Analytics
    if (newConsent.analytics && GA_MEASUREMENT_ID) {
      loadGoogleAnalytics(GA_MEASUREMENT_ID);
    } else if (GA_MEASUREMENT_ID) {
      disableGoogleAnalytics(GA_MEASUREMENT_ID);
    }

    // Si l'utilisateur refuse certains cookies, les supprimer
    if (!newConsent.analytics || !newConsent.marketing || !newConsent.preferences) {
      deleteNonEssentialCookies();
    }
  };

  // Accepter tous les cookies
  const acceptAll = () => {
    const allAccepted: CookieConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };

    setConsent(allAccepted);
    setHasConsent(true);
    setShowBanner(false);
    saveCookiePreferences(allAccepted);
    applyConsent(allAccepted);
  };

  // Rejeter tous les cookies non nécessaires
  const rejectAll = () => {
    setConsent(DEFAULT_CONSENT);
    setHasConsent(true);
    setShowBanner(false);
    saveCookiePreferences(DEFAULT_CONSENT);
    applyConsent(DEFAULT_CONSENT);
    deleteNonEssentialCookies();
  };

  // Mettre à jour le consentement
  const updateConsent = (newConsent: CookieConsent) => {
    // S'assurer que les cookies nécessaires sont toujours activés
    const updatedConsent = { ...newConsent, necessary: true };
    
    setConsent(updatedConsent);
    setHasConsent(true);
    setShowBanner(false);
    setShowSettings(false);
    saveCookiePreferences(updatedConsent);
    applyConsent(updatedConsent);
  };

  // Ouvrir les paramètres
  const openSettings = () => {
    setShowSettings(true);
  };

  // Fermer les paramètres
  const closeSettings = () => {
    setShowSettings(false);
  };

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        hasConsent,
        showBanner: isClient ? showBanner : false,
        showSettings: isClient ? showSettings : false,
        acceptAll,
        rejectAll,
        updateConsent,
        openSettings,
        closeSettings,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte
export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  
  return context;
}

