/**
 * Page de politique des cookies
 * Conforme RGPD
 */

import type { Metadata } from 'next';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import Section from '@/components/Section';
import { Cookie, Shield, Settings, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Politique de Cookies',
  description: 'Informations sur l\'utilisation des cookies sur le site Monsieur Clim et comment gérer vos préférences.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PolitiqueCookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-secondary/10">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Cookie className="w-8 h-8 text-primary" />
            </div>
            <Heading level={1} className="mb-6">
              Politique de Cookies
            </Heading>
            <p className="text-xl text-gray-300">
              Comment nous utilisons les cookies et comment vous pouvez contrôler vos préférences
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </Container>
      </Section>

      {/* Contenu principal */}
      <Section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-invert prose-lg max-w-none">
              
              {/* Introduction */}
              <div className="bg-white/5 rounded-xl p-8 mb-12 border border-primary/20">
                <div className="flex items-start gap-4">
                  <Shield className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-bold text-text-light mt-0 mb-4">
                      Qu&apos;est-ce qu&apos;un cookie ?
                    </h2>
                    <p className="text-gray-300 leading-relaxed mb-0">
                      Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) 
                      lors de la visite d&apos;un site internet. Il permet au site de se souvenir de vos actions et 
                      préférences durant une période donnée, afin que vous n&apos;ayez pas à les ressaisir à chaque fois 
                      que vous revenez sur le site ou naviguez d&apos;une page à l&apos;autre.
                    </p>
                  </div>
                </div>
              </div>

              {/* Types de cookies */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-text-light mb-8 flex items-center gap-3">
                  <FileText className="w-8 h-8 text-primary" />
                  Les cookies que nous utilisons
                </h2>

                <div className="space-y-6">
                  {/* Cookies nécessaires */}
                  <div className="bg-gradient-to-r from-green-500/10 to-transparent rounded-xl p-6 border border-green-500/20">
                    <h3 className="text-2xl font-bold text-text-light mb-3 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-green-500"></span>
                      Cookies strictement nécessaires
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Ces cookies sont essentiels pour vous permettre de naviguer sur le site et d&apos;utiliser ses 
                      fonctionnalités. Sans ces cookies, les services que vous avez demandés ne peuvent pas être fournis.
                    </p>
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="font-semibold text-text-light mb-2">Exemples :</h4>
                      <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                        <li>Mémorisation de vos préférences en matière de cookies</li>
                        <li>Sécurisation de votre connexion</li>
                        <li>Maintien de votre session de navigation</li>
                      </ul>
                      <p className="text-xs text-gray-400 mt-3">
                        <strong>Durée :</strong> 13 mois maximum
                      </p>
                    </div>
                  </div>

                  {/* Cookies analytiques */}
                  <div className="bg-gradient-to-r from-blue-500/10 to-transparent rounded-xl p-6 border border-blue-500/20">
                    <h3 className="text-2xl font-bold text-text-light mb-3 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                      Cookies analytiques
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Ces cookies nous permettent de reconnaître et de comptabiliser le nombre de visiteurs, et de voir 
                      comment les visiteurs se déplacent sur le site. Cela nous aide à améliorer le fonctionnement de notre 
                      site en nous assurant que les utilisateurs trouvent facilement ce qu&apos;ils recherchent.
                    </p>
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="font-semibold text-text-light mb-2">Fournisseur : Google Analytics</h4>
                      <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                        <li>Nombre de visiteurs et pages vues</li>
                        <li>Source du trafic (recherche, réseaux sociaux, etc.)</li>
                        <li>Temps passé sur le site</li>
                        <li>Taux de rebond et parcours utilisateur</li>
                      </ul>
                      <p className="text-xs text-gray-400 mt-3">
                        <strong>Durée :</strong> Jusqu&apos;à 2 ans • <strong>Anonymisation IP :</strong> Activée
                      </p>
                    </div>
                  </div>

                  {/* Cookies marketing */}
                  <div className="bg-gradient-to-r from-orange-500/10 to-transparent rounded-xl p-6 border border-orange-500/20">
                    <h3 className="text-2xl font-bold text-text-light mb-3 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                      Cookies marketing
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Ces cookies sont utilisés pour suivre les visiteurs sur les sites web. L&apos;objectif est d&apos;afficher 
                      des publicités qui sont pertinentes et engageantes pour l&apos;utilisateur individuel.
                    </p>
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-sm text-gray-400">
                        Actuellement, nous n&apos;utilisons pas de cookies marketing sur notre site. Cette section sera mise 
                        à jour si nous décidons d&apos;en utiliser à l&apos;avenir.
                      </p>
                    </div>
                  </div>

                  {/* Cookies de préférences */}
                  <div className="bg-gradient-to-r from-purple-500/10 to-transparent rounded-xl p-6 border border-purple-500/20">
                    <h3 className="text-2xl font-bold text-text-light mb-3 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                      Cookies de préférences
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Ces cookies permettent au site de mémoriser les choix que vous faites (comme votre nom d&apos;utilisateur, 
                      votre langue ou la région dans laquelle vous vous trouvez) et de fournir des fonctionnalités améliorées 
                      et plus personnelles.
                    </p>
                    <div className="bg-white/5 rounded-lg p-4">
                      <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                        <li>Préférences linguistiques</li>
                        <li>Paramètres d&apos;affichage</li>
                        <li>Options de personnalisation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gestion des cookies */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8 mb-12 border border-primary/20">
                <div className="flex items-start gap-4">
                  <Settings className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-bold text-text-light mt-0 mb-4">
                      Comment gérer vos cookies ?
                    </h2>
                    <div className="space-y-4 text-gray-300">
                      <div>
                        <h3 className="font-semibold text-text-light mb-2">Via notre site</h3>
                        <p className="mb-2">
                          Vous pouvez à tout moment modifier vos préférences en matière de cookies en cliquant sur le 
                          bouton &quot;Gérer les cookies&quot; présent dans le pied de page de notre site.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-text-light mb-2">Via votre navigateur</h3>
                        <p className="mb-2">
                          La plupart des navigateurs vous permettent de contrôler les cookies via leurs paramètres. 
                          Voici comment accéder aux paramètres de cookies des navigateurs les plus courants :
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li><strong>Google Chrome :</strong> Paramètres &gt; Confidentialité et sécurité &gt; Cookies</li>
                          <li><strong>Firefox :</strong> Options &gt; Vie privée et sécurité &gt; Cookies et données de sites</li>
                          <li><strong>Safari :</strong> Préférences &gt; Confidentialité &gt; Cookies et données de sites web</li>
                          <li><strong>Microsoft Edge :</strong> Paramètres &gt; Confidentialité &gt; Cookies et autorisations</li>
                        </ul>
                      </div>

                      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-4">
                        <p className="text-sm mb-0">
                          ⚠️ <strong>Attention :</strong> La désactivation de certains cookies peut affecter votre 
                          expérience de navigation et limiter l&apos;accès à certaines fonctionnalités du site.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cookies tiers */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-text-light mb-6">
                  Cookies tiers
                </h2>
                <p className="text-gray-300 mb-4">
                  Notre site peut contenir des cookies provenant de services tiers (comme Google Analytics). Ces cookies 
                  sont régis par les politiques de confidentialité respectives de ces services :
                </p>
                <ul className="space-y-2">
                  <li className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <strong className="text-text-light">Google Analytics :</strong>
                    <a 
                      href="https://policies.google.com/privacy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-accent transition-colors ml-2 underline"
                    >
                      Politique de confidentialité de Google
                    </a>
                  </li>
                </ul>
              </div>

              {/* Vos droits */}
              <div className="bg-white/5 rounded-xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-text-light mt-0 mb-4">
                  Vos droits
                </h2>
                <p className="text-gray-300 mb-4">
                  Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Droit d&apos;accès à vos données personnelles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Droit de rectification de vos données</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Droit à l&apos;effacement de vos données</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Droit à la limitation du traitement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Droit à la portabilité de vos données</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Droit d&apos;opposition au traitement de vos données</span>
                  </li>
                </ul>
                <p className="text-gray-300 mt-6 mb-0">
                  Pour exercer ces droits, vous pouvez nous contacter à l&apos;adresse : 
                  <a href="mailto:contact@monsieurclim.fr" className="text-primary hover:text-accent transition-colors ml-1">
                    contact@monsieurclim.fr
                  </a>
                </p>
              </div>

              {/* Contact */}
              <div className="mt-12 text-center">
                <p className="text-gray-400">
                  Pour toute question concernant notre politique de cookies, n&apos;hésitez pas à nous contacter :
                </p>
                <a 
                  href="mailto:contact@monsieurclim.fr"
                  className="inline-block mt-4 px-8 py-3 bg-primary hover:bg-primary/90 text-background font-semibold rounded-lg transition-all duration-200 hover:scale-105"
                >
                  Nous contacter
                </a>
              </div>

            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

