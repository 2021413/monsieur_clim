'use client';

/**
 * Modal de paramètres des cookies
 * Permet à l'utilisateur de personnaliser ses préférences
 */

import React, { useState, useEffect } from 'react';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import type { CookieConsent } from '@/types/cookies';
import { X, Check, Cookie, BarChart3, Megaphone, Sliders } from 'lucide-react';
import { COOKIES_INFO } from '@/lib/cookies';

export default function CookieSettings() {
  const { consent, showSettings, updateConsent, closeSettings, acceptAll, rejectAll } = useCookieConsent();
  const [localConsent, setLocalConsent] = useState<CookieConsent>(consent);
  const [activeTab, setActiveTab] = useState<'overview' | 'details'>('overview');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showSettings) {
      setLocalConsent(consent);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [showSettings, consent]);

  if (!showSettings) return null;

  const handleSave = () => {
    updateConsent(localConsent);
  };

  const handleToggle = (category: keyof CookieConsent) => {
    if (category === 'necessary') return; // Les cookies nécessaires ne peuvent pas être désactivés
    
    setLocalConsent(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const cookieCategories = [
    {
      id: 'necessary' as const,
      title: 'Cookies nécessaires',
      description: 'Ces cookies sont essentiels au fonctionnement du site et ne peuvent pas être désactivés. Ils permettent des fonctionnalités de base comme la navigation sécurisée et l\'accès aux zones protégées.',
      icon: Cookie,
      color: 'text-green-500',
      required: true,
    },
    {
      id: 'analytics' as const,
      title: 'Cookies analytiques',
      description: 'Ces cookies nous permettent de mesurer et d\'analyser l\'utilisation du site pour améliorer ses performances. Toutes les données collectées sont anonymisées.',
      icon: BarChart3,
      color: 'text-blue-500',
      required: false,
    },
    {
      id: 'marketing' as const,
      title: 'Cookies marketing',
      description: 'Ces cookies sont utilisés pour afficher des publicités pertinentes et suivre l\'efficacité de nos campagnes marketing.',
      icon: Megaphone,
      color: 'text-orange-500',
      required: false,
    },
    {
      id: 'preferences' as const,
      title: 'Cookies de préférences',
      description: 'Ces cookies permettent au site de mémoriser vos préférences (langue, région, etc.) pour vous offrir une expérience personnalisée.',
      icon: Sliders,
      color: 'text-purple-500',
      required: false,
    },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeSettings}
      />

      {/* Modal */}
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none`}
      >
        <div
          className={`bg-gradient-to-br from-[#1a2332] to-[#0f1419] rounded-2xl shadow-2xl border border-primary/20 w-full max-w-4xl max-h-[90vh] overflow-hidden pointer-events-auto transform transition-all duration-300 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          {/* En-tête */}
          <div className="relative border-b border-white/10">
            <div className="h-1 bg-gradient-to-r from-primary via-accent to-secondary" />
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-text-light mb-2">
                    Paramètres des cookies
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Gérez vos préférences en matière de cookies et de confidentialité
                  </p>
                </div>
                <button
                  onClick={closeSettings}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Onglets */}
              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'overview'
                      ? 'bg-primary text-background'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  Vue d&apos;ensemble
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'details'
                      ? 'bg-primary text-background'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  Détails des cookies
                </button>
              </div>
            </div>
          </div>

          {/* Contenu */}
          <div className="overflow-y-auto max-h-[calc(90vh-220px)] p-6">
            {activeTab === 'overview' ? (
              <div className="space-y-4">
                {cookieCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <div
                      key={category.id}
                      className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className={`p-3 rounded-lg bg-white/5 ${category.color}`}>
                            <Icon className="w-6 h-6" />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold text-text-light">
                                {category.title}
                              </h3>
                              {category.required && (
                                <span className="px-2 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded">
                                  Obligatoire
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed">
                              {category.description}
                            </p>
                          </div>
                        </div>

                        {/* Toggle Switch */}
                        <button
                          onClick={() => handleToggle(category.id)}
                          disabled={category.required}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                            category.required
                              ? 'bg-green-500/50 cursor-not-allowed'
                              : localConsent[category.id]
                              ? 'bg-primary'
                              : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              localConsent[category.id] ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-6">
                {cookieCategories.map((category) => {
                  const categoryCookies = COOKIES_INFO.filter(
                    cookie => cookie.category === category.id
                  );

                  if (categoryCookies.length === 0) return null;

                  return (
                    <div key={category.id} className="space-y-3">
                      <h3 className="text-lg font-semibold text-text-light flex items-center gap-2">
                        {category.title}
                      </h3>
                      <div className="space-y-2">
                        {categoryCookies.map((cookie, index) => (
                          <div
                            key={index}
                            className="bg-white/5 rounded-lg p-4 border border-white/10"
                          >
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-400">Nom :</span>
                                <span className="ml-2 text-text-light font-mono">{cookie.name}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Durée :</span>
                                <span className="ml-2 text-text-light">{cookie.duration}</span>
                              </div>
                              <div className="col-span-2">
                                <span className="text-gray-400">Objectif :</span>
                                <span className="ml-2 text-text-light">{cookie.purpose}</span>
                              </div>
                              {cookie.provider && (
                                <div>
                                  <span className="text-gray-400">Fournisseur :</span>
                                  <span className="ml-2 text-text-light">{cookie.provider}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Pied de page avec boutons */}
          <div className="border-t border-white/10 p-6 bg-white/5">
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    acceptAll();
                  }}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-text-light font-medium rounded-lg transition-all duration-200 border border-white/20"
                >
                  Tout accepter
                </button>
                <button
                  onClick={() => {
                    rejectAll();
                  }}
                  className="px-6 py-3 text-gray-400 hover:text-text-light font-medium rounded-lg transition-colors"
                >
                  Tout refuser
                </button>
              </div>
              <button
                onClick={handleSave}
                className="px-8 py-3 bg-primary hover:bg-primary/90 text-background font-semibold rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Enregistrer mes choix
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

