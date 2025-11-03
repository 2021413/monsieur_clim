/**
 * Types pour la gestion des cookies et du consentement RGPD
 */

export type CookieCategory = 'necessary' | 'analytics' | 'marketing' | 'preferences';

export interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export interface CookiePreferences {
  consent: CookieConsent;
  timestamp: number;
  version: string; // Version de la politique des cookies
}

export interface CookieInfo {
  name: string;
  category: CookieCategory;
  purpose: string;
  duration: string;
  provider?: string;
}

