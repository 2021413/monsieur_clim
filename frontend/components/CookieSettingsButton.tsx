'use client';

/**
 * Bouton pour ouvrir les paramètres des cookies
 * Composant client séparé pour éviter les problèmes d'hydration
 */

import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { Cookie } from 'lucide-react';

export default function CookieSettingsButton() {
  const { openSettings } = useCookieConsent();

  return (
    <button
      onClick={openSettings}
      className="flex items-center gap-2 px-4 py-2 text-xs text-gray-400 hover:text-primary transition-colors duration-200 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10"
    >
      <Cookie className="w-4 h-4" />
      Gérer les cookies
    </button>
  );
}

