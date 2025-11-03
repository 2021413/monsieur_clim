'use client';

/**
 * Wrapper client pour le CookieConsentProvider
 * Nécessaire pour éviter les erreurs de hydration avec Next.js
 */

import { CookieConsentProvider } from '@/contexts/CookieConsentContext';
import CookieBanner from '@/components/CookieBanner';
import CookieSettings from '@/components/CookieSettings';

interface CookieProviderProps {
  children: React.ReactNode;
}

export default function CookieProvider({ children }: CookieProviderProps) {
  return (
    <CookieConsentProvider>
      {children}
      <CookieBanner />
      <CookieSettings />
    </CookieConsentProvider>
  );
}

