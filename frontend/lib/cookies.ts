/**
 * Utilitaires pour la gestion des cookies
 * Conforme RGPD
 */

import type { CookieConsent, CookiePreferences } from '@/types/cookies';

// Nom du cookie de consentement
export const CONSENT_COOKIE_NAME = 'monsieur-clim-consent';

// Version actuelle de la politique des cookies
export const COOKIE_POLICY_VERSION = '1.0';

// Durée de validité du consentement (13 mois en millisecondes)
export const CONSENT_DURATION = 13 * 30 * 24 * 60 * 60 * 1000;

/**
 * Consentement par défaut (seuls les cookies nécessaires sont activés)
 */
export const DEFAULT_CONSENT: CookieConsent = {
  necessary: true, // Toujours true, ne peut pas être désactivé
  analytics: false,
  marketing: false,
  preferences: false,
};

/**
 * Définir un cookie
 */
export function setCookie(name: string, value: string, days: number = 365): void {
  if (typeof window === 'undefined') return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax;Secure`;
}

/**
 * Récupérer un cookie
 */
export function getCookie(name: string): string | null {
  if (typeof window === 'undefined') return null;

  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  
  return null;
}

/**
 * Supprimer un cookie
 */
export function deleteCookie(name: string): void {
  if (typeof window === 'undefined') return;
  
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

/**
 * Sauvegarder les préférences de cookies
 */
export function saveCookiePreferences(consent: CookieConsent): void {
  const preferences: CookiePreferences = {
    consent,
    timestamp: Date.now(),
    version: COOKIE_POLICY_VERSION,
  };

  setCookie(CONSENT_COOKIE_NAME, JSON.stringify(preferences), 365);
}

/**
 * Récupérer les préférences de cookies
 */
export function getCookiePreferences(): CookiePreferences | null {
  const cookie = getCookie(CONSENT_COOKIE_NAME);
  
  if (!cookie) return null;

  try {
    const preferences: CookiePreferences = JSON.parse(cookie);
    
    // Vérifier si le consentement est encore valide
    if (Date.now() - preferences.timestamp > CONSENT_DURATION) {
      return null;
    }

    // Vérifier si la version de la politique a changé
    if (preferences.version !== COOKIE_POLICY_VERSION) {
      return null;
    }

    return preferences;
  } catch {
    return null;
  }
}

/**
 * Vérifier si l'utilisateur a déjà donné son consentement
 */
export function hasConsent(): boolean {
  return getCookiePreferences() !== null;
}

/**
 * Supprimer tous les cookies non nécessaires
 */
export function deleteNonEssentialCookies(): void {
  if (typeof window === 'undefined') return;

  const cookies = document.cookie.split(';');
  
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
    
    // Ne pas supprimer le cookie de consentement et les cookies essentiels
    if (name !== CONSENT_COOKIE_NAME && !isEssentialCookie(name)) {
      deleteCookie(name);
    }
  }
}

/**
 * Vérifier si un cookie est essentiel
 */
function isEssentialCookie(name: string): boolean {
  const essentialCookies = [
    CONSENT_COOKIE_NAME,
    '__Secure-next-auth.session-token', // NextAuth
    'next-auth.csrf-token', // NextAuth CSRF
    'next-auth.callback-url', // NextAuth callback
  ];

  return essentialCookies.some(essential => name.includes(essential));
}

/**
 * Charger Google Analytics si le consentement est donné
 */
export function loadGoogleAnalytics(measurementId: string): void {
  if (typeof window === 'undefined') return;

  // Injecter le script Google Analytics
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  // Initialiser gtag
  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}', {
      page_path: window.location.pathname,
      anonymize_ip: true
    });
  `;
  document.head.appendChild(script2);
}

/**
 * Désactiver Google Analytics
 */
export function disableGoogleAnalytics(measurementId: string): void {
  if (typeof window === 'undefined') return;

  // @ts-ignore
  window[`ga-disable-${measurementId}`] = true;
}

/**
 * Liste des cookies utilisés sur le site
 */
export const COOKIES_INFO = [
  {
    name: CONSENT_COOKIE_NAME,
    category: 'necessary' as const,
    purpose: 'Mémorise vos préférences en matière de cookies',
    duration: '13 mois',
    provider: 'Monsieur Clim',
  },
  {
    name: '_ga',
    category: 'analytics' as const,
    purpose: 'Utilisé par Google Analytics pour distinguer les utilisateurs',
    duration: '2 ans',
    provider: 'Google',
  },
  {
    name: '_ga_*',
    category: 'analytics' as const,
    purpose: 'Utilisé par Google Analytics pour maintenir l\'état de la session',
    duration: '2 ans',
    provider: 'Google',
  },
  {
    name: '_gid',
    category: 'analytics' as const,
    purpose: 'Utilisé par Google Analytics pour distinguer les utilisateurs',
    duration: '24 heures',
    provider: 'Google',
  },
];

