/**
 * Hook personnalisé pour faciliter l'utilisation du tracking
 * basé sur le consentement des cookies
 */

import { useEffect } from 'react';
import { useCookieConsent } from '@/contexts/CookieConsentContext';

/**
 * Hook pour exécuter du code seulement si l'utilisateur a consenti
 * à une catégorie spécifique de cookies
 * 
 * @example
 * ```tsx
 * useCookieTracking('analytics', () => {
 *   // Ce code ne s'exécutera que si l'utilisateur a accepté les cookies analytiques
 *   trackPageView();
 * });
 * ```
 */
export function useCookieTracking(
  category: 'analytics' | 'marketing' | 'preferences',
  callback: () => void | (() => void),
  dependencies: unknown[] = []
) {
  const { consent, hasConsent } = useCookieConsent();

  useEffect(() => {
    if (hasConsent && consent[category]) {
      return callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasConsent, consent, category, ...dependencies]);
}

/**
 * Hook pour tracker un événement personnalisé
 * Seulement si l'utilisateur a consenti aux cookies analytiques
 * 
 * @example
 * ```tsx
 * function ContactButton() {
 *   const trackEvent = useEventTracking();
 *   
 *   const handleClick = () => {
 *     trackEvent('contact', 'click', 'button_cta');
 *   };
 *   
 *   return <button onClick={handleClick}>Contact</button>;
 * }
 * ```
 */
export function useEventTracking() {
  const { consent, hasConsent } = useCookieConsent();

  return (
    action: string,
    category?: string,
    label?: string,
    value?: number
  ) => {
    if (!hasConsent || !consent.analytics) return;

    // @ts-ignore
    if (typeof window !== 'undefined' && window.gtag) {
      // @ts-ignore
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };
}

/**
 * Hook pour vérifier si une catégorie de cookies est acceptée
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const canTrack = useCookieCategory('analytics');
 *   
 *   if (canTrack) {
 *     return <AnalyticsWidget />;
 *   }
 *   
 *   return null;
 * }
 * ```
 */
export function useCookieCategory(
  category: 'necessary' | 'analytics' | 'marketing' | 'preferences'
): boolean {
  const { consent, hasConsent } = useCookieConsent();

  if (category === 'necessary') return true;
  return hasConsent && consent[category];
}

