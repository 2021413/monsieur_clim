'use client';

/**
 * Bannière de consentement des cookies
 * Conforme RGPD
 */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { Cookie, Settings, X } from 'lucide-react';

export default function CookieBanner() {
  const { showBanner, acceptAll, rejectAll, openSettings } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (showBanner) {
      // Petite animation d'entrée
      setTimeout(() => setIsVisible(true), 100);
    } else {
      setIsVisible(false);
    }
  }, [showBanner]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      rejectAll();
      setIsClosing(false);
    }, 300);
  };

  const handleAccept = () => {
    setIsClosing(true);
    setTimeout(() => {
      acceptAll();
      setIsClosing(false);
    }, 300);
  };

  const handleSettings = () => {
    openSettings();
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Overlay semi-transparent */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] transition-opacity duration-300 ${
          isVisible && !isClosing ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Bannière */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[9999] transform transition-transform duration-300 ${
          isVisible && !isClosing ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          <div className="bg-gradient-to-br from-[#1a2332] to-[#0f1419] rounded-2xl shadow-2xl border border-primary/20 overflow-hidden">
            {/* Barre décorative */}
            <div className="h-1 bg-gradient-to-r from-primary via-accent to-secondary" />

            <div className="p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Icône et titre */}
                <div className="flex items-start gap-4 lg:flex-1">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Cookie className="w-6 h-6 text-primary" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-text-light mb-3">
                      Respect de votre vie privée
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      Nous utilisons des cookies pour améliorer votre expérience de navigation, 
                      analyser le trafic du site et personnaliser le contenu. Vous pouvez choisir 
                      d&apos;accepter tous les cookies ou de personnaliser vos préférences.
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <Link
                        href="/legal/politique-confidentialite"
                        className="text-primary hover:text-accent transition-colors underline"
                      >
                        Politique de confidentialité
                      </Link>
                      <span className="text-gray-500">•</span>
                      <Link
                        href="/legal/politique-cookies"
                        className="text-primary hover:text-accent transition-colors underline"
                      >
                        En savoir plus sur les cookies
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-48">
                  <button
                    onClick={handleAccept}
                    className="px-6 py-3 bg-primary hover:bg-primary/90 text-background font-semibold rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                  >
                    Tout accepter
                  </button>

                  <button
                    onClick={handleSettings}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-text-light font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 border border-white/20"
                  >
                    <Settings className="w-4 h-4" />
                    Personnaliser
                  </button>

                  <button
                    onClick={handleClose}
                    className="px-6 py-3 text-gray-400 hover:text-text-light font-medium rounded-lg transition-colors"
                  >
                    Tout refuser
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

