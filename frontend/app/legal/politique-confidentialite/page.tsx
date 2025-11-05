import Container from "@/components/Container";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import Link from "next/link";

export const metadata = {
  title: "Politique de confidentialité | Monsieur Clim",
  description: "Politique de confidentialité et protection des données personnelles du site Monsieur Clim. Conformité RGPD.",
  openGraph: {
    title: "Politique de confidentialité | Monsieur Clim",
    description: "Protection de vos données personnelles - Politique conforme au RGPD.",
    type: "website",
    locale: "fr_FR",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <Section gradient="primary">
      <Container className="py-16 max-w-4xl">
        <Heading level={1} className="mb-8">
          Politique de confidentialité
        </Heading>

        <div className="prose prose-invert max-w-none">
          <div className="space-y-8">
            {/* Introduction */}
            <section className="bg-background/50 backdrop-blur-sm rounded-xl border border-primary/10 p-6">
              <h2 className="font-display text-2xl mb-4 text-primary">
                Introduction
              </h2>
              <div className="space-y-3 text-foreground/80">
                <p>
                  La présente politique de confidentialité a pour but de vous informer sur la manière dont Monsieur Clim 
                  collecte, utilise et protège les données personnelles que vous nous transmettez via notre site internet.
                </p>
                <p>
                  Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, 
                  vous disposez de droits sur vos données personnelles.
                </p>
              </div>
            </section>

            {/* Responsable du traitement */}
            <section className="bg-background/50 backdrop-blur-sm rounded-xl border border-primary/10 p-6">
              <h2 className="font-display text-2xl mb-4 text-primary">
                1. Responsable du traitement
              </h2>
              <div className="space-y-3 text-foreground/80">
                <p>
                  <strong className="text-foreground">Responsable du traitement :</strong> Monsieur Clim
                </p>
                <p>
                  <strong className="text-foreground">Contact :</strong>{" "}
                  <a href="mailto:monsieurclim83@gmail.com" className="text-primary hover:text-primary/80 transition-colors">
                    monsieurclim83@gmail.com
                  </a>
                </p>
                <p>
                  <strong className="text-foreground">Téléphone :</strong>{" "}
                  <a href="tel:+33646071539" className="text-primary hover:text-primary/80 transition-colors">
                    06 46 07 15 39
                  </a>
                </p>
              </div>
            </section>

            {/* Données collectées */}
            <section className="bg-background/50 backdrop-blur-sm rounded-xl border border-primary/10 p-6">
              <h2 className="font-display text-2xl mb-4 text-primary">
                2. Données personnelles collectées
              </h2>
              <div className="space-y-4 text-foreground/80">
                <p>
                  Nous collectons les données personnelles suivantes lorsque vous utilisez notre site :
                </p>
                
                <div className="ml-4 space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">2.1. Données collectées via le formulaire de contact</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Nom et prénom</li>
                      <li>Adresse email</li>
                      <li>Numéro de téléphone</li>
                      <li>Ville</li>
                      <li>Type de service demandé</li>
                      <li>Message libre</li>
                    </ul>
                    <p className="mt-2 text-sm text-foreground/60">
                      <strong>Finalité :</strong> Traiter votre demande de devis ou d'information et vous recontacter.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">2.2. Données collectées automatiquement (cookies)</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Adresse IP</li>
                      <li>Type de navigateur</li>
                      <li>Pages visitées</li>
                      <li>Durée de visite</li>
                      <li>Source de trafic</li>
                    </ul>
                    <p className="mt-2 text-sm text-foreground/60">
                      <strong>Finalité :</strong> Améliorer l'expérience utilisateur et analyser l'audience du site via Google Analytics.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Base légale */}
            <section className="bg-background/50 backdrop-blur-sm rounded-xl border border-primary/10 p-6">
              <h2 className="font-display text-2xl mb-4 text-primary">
                3. Base légale du traitement
              </h2>
              <div className="space-y-3 text-foreground/80">
                <p>
                  Le traitement de vos données personnelles repose sur les bases légales suivantes :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong className="text-foreground">Consentement :</strong> En remplissant notre formulaire de contact, 
                    vous consentez au traitement de vos données pour les finalités indiquées.
                  </li>
                  <li>
                    <strong className="text-foreground">Intérêt légitime :</strong> L'analyse statistique de notre site 
                    constitue un intérêt légitime nous permettant d'améliorer nos services.
                  </li>
                  <li>
                    <strong className="text-foreground">Exécution d'un contrat :</strong> Lorsque vous demandez un devis, 
                    le traitement de vos données est nécessaire à l'exécution du service demandé.
                  </li>
                </ul>
              </div>
            </section>

            {/* Utilisation des données */}
            <section className="bg-background/50 backdrop-blur-sm rounded-xl border border-primary/10 p-6">
              <h2 className="font-display text-2xl mb-4 text-primary">
                4. Utilisation des données
              </h2>
              <div className="space-y-3 text-foreground/80">
                <p>
                  Vos données personnelles sont utilisées pour :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Répondre à vos demandes de devis et d'information</li>
                  <li>Vous contacter pour planifier une intervention</li>
                  <li>Améliorer la qualité de nos services</li>
                  <li>Analyser le trafic et l'utilisation du site (statistiques anonymisées)</li>
                  <li>Respecter nos obligations légales et réglementaires</li>
                </ul>
                <p className="mt-4">
                  <strong className="text-foreground">Important :</strong> Nous ne vendons, ne louons ni ne partageons 
                  vos données personnelles avec des tiers à des fins commerciales.
                </p>
              </div>
            </section>

            {/* Destinataires des données */}
            <section className="bg-background/50 backdrop-blur-sm rounded-xl border border-primary/10 p-6">
              <h2 className="font-display text-2xl mb-4 text-primary">
                5. Destinataires des données
              </h2>
              <div className="space-y-3 text-foreground/80">
                <p>
                  Vos données personnelles sont destinées à :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong className="text-foreground">Monsieur Clim :</strong> Personnel habilité pour traiter votre demande
                  </li>
                  <li>
                    <strong className="text-foreground">Prestataires techniques :</strong> Hébergeur (OVH SAS), 
                    service d'analyse (Google Analytics)
                  </li>
                </ul>
                <p className="mt-4">
                  Ces prestataires sont soumis à des obligations de confidentialité et ne peuvent utiliser vos données 
                  que conformément à nos instructions et aux réglementations applicables.
                </p>
              </div>
            </section>

            {/* Durée de conservation */}
            <section className="bg-background/50 backdrop-blur-sm rounded-xl border border-primary/10 p-6">
              <h2 className="font-display text-2xl mb-4 text-primary">
                6. Durée de conservation
              </h2>
              <div className="space-y-3 text-foreground/80">
                <p>
                  Vos données personnelles sont conservées pendant les durées suivantes :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong className="text-foreground">Demandes de devis :</strong> 3 ans à compter du dernier contact
                  </li>
                  <li>
                    <strong className="text-foreground">Clients :</strong> Durée de la relation commerciale + 3 ans 
                    (conformément aux obligations légales comptables)
                  </li>
                  <li>
                    <strong className="text-foreground">Cookies Google Analytics :</strong> 26 mois maximum
                  </li>
                </ul>
                <p className="mt-4">
                  Au-delà de ces durées, vos données sont supprimées ou anonymisées de manière irréversible.
                </p>
              </div>
            </section>

            {/* Sécurité */}
            <section className="bg-background/50 backdrop-blur-sm rounded-xl border border-primary/10 p-6">
              <h2 className="font-display text-2xl mb-4 text-primary">
                7. Sécurité des données
              </h2>
              <div className="space-y-3 text-foreground/80">
                <p>
                  Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données 
                  personnelles contre la perte, l'utilisation abusive, l'accès non autorisé, la divulgation, l'altération 
                  ou la destruction :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Chiffrement SSL/TLS pour sécuriser les communications</li>
                  <li>Hébergement sécurisé sur des serveurs professionnels</li>
                  <li>Accès restreint aux données personnelles</li>
                  <li>Sauvegardes régulières</li>
                  <li>Mises à jour de sécurité régulières</li>
                </ul>
              </div>
            </section>

            {/* Cookies */}
            <section className="bg-background/50 backdrop-blur-sm rounded-xl border border-primary/10 p-6">
              <h2 className="font-display text-2xl mb-4 text-primary">
                8. Cookies et technologies similaires
              </h2>
              <div className="space-y-4 text-foreground/80">
                <p>
                  Notre site utilise des cookies pour améliorer votre expérience de navigation et analyser notre audience.
                </p>
                
                <div className="ml-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">8.1. Cookies Google Analytics</h3>
                    <p>
                      Nous utilisons Google Analytics pour comprendre comment les visiteurs utilisent notre site. 
                      Ces cookies collectent des informations de manière anonyme, notamment :
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                      <li>Nombre de visiteurs</li>
                      <li>Pages visitées</li>
                      <li>Durée de la visite</li>
                      <li>Source du trafic</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">8.2. Gestion des cookies</h3>
                    <p>
                      Vous pouvez à tout moment désactiver les cookies en configurant votre navigateur. 
                      Cependant, la désactivation des cookies peut limiter certaines fonctionnalités du site.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Vos droits */}
            <section className="bg-background/50 backdrop-blur-sm rounded-xl border border-primary/10 p-6">
              <h2 className="font-display text-2xl mb-4 text-primary">
                9. Vos droits
              </h2>
              <div className="space-y-3 text-foreground/80">
                <p>
                  Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong className="text-foreground">Droit d'accès :</strong> Vous pouvez obtenir une copie de vos données personnelles
                  </li>
                  <li>
                    <strong className="text-foreground">Droit de rectification :</strong> Vous pouvez demander la correction de vos données inexactes
                  </li>
                  <li>
                    <strong className="text-foreground">Droit à l'effacement :</strong> Vous pouvez demander la suppression de vos données
                  </li>
                  <li>
                    <strong className="text-foreground">Droit à la limitation :</strong> Vous pouvez demander la limitation du traitement de vos données
                  </li>
                  <li>
                    <strong className="text-foreground">Droit d'opposition :</strong> Vous pouvez vous opposer au traitement de vos données
                  </li>
                  <li>
                    <strong className="text-foreground">Droit à la portabilité :</strong> Vous pouvez récupérer vos données dans un format structuré
                  </li>
                  <li>
                    <strong className="text-foreground">Droit de retirer votre consentement :</strong> À tout moment, sans affecter les traitements antérieurs
                  </li>
                </ul>
                
                <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Comment exercer vos droits ?</h3>
                  <p>
                    Pour exercer vos droits, contactez-nous :
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>
                      Par email :{" "}
                      <a href="mailto:monsieurclim83@gmail.com" className="text-primary hover:text-primary/80 transition-colors">
                        monsieurclim83@gmail.com
                      </a>
                    </li>
                    <li>
                      Par téléphone :{" "}
                      <a href="tel:+33646071539" className="text-primary hover:text-primary/80 transition-colors">
                        06 46 07 15 39
                      </a>
                    </li>
                    <li>
                      Via notre{" "}
                      <Link 
                        href="/contact" 
                        className="text-primary hover:text-primary/80 transition-colors underline"
                      >
                        formulaire de contact
                      </Link>
                    </li>
                  </ul>
                  <p className="mt-2 text-sm text-foreground/60">
                    Nous nous engageons à répondre à votre demande dans un délai d'un mois maximum.
                  </p>
                </div>
              </div>
            </section>

            {/* Réclamation */}
            <section className="bg-background/50 backdrop-blur-sm rounded-xl border border-primary/10 p-6">
              <h2 className="font-display text-2xl mb-4 text-primary">
                10. Droit de réclamation
              </h2>
              <div className="space-y-3 text-foreground/80">
                <p>
                  Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la 
                  Commission Nationale de l'Informatique et des Libertés (CNIL) :
                </p>
                <div className="ml-4 space-y-2">
                  <p>
                    <strong className="text-foreground">CNIL</strong><br />
                    3 Place de Fontenoy<br />
                    TSA 80715<br />
                    75334 Paris Cedex 07
                  </p>
                  <p>
                    Site web :{" "}
                    <a 
                      href="https://www.cnil.fr" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      www.cnil.fr
                    </a>
                  </p>
                </div>
              </div>
            </section>

            {/* Modifications */}
            <section className="bg-background/50 backdrop-blur-sm rounded-xl border border-primary/10 p-6">
              <h2 className="font-display text-2xl mb-4 text-primary">
                11. Modifications de la politique de confidentialité
              </h2>
              <div className="space-y-3 text-foreground/80">
                <p>
                  Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
                  Toute modification sera publiée sur cette page avec une date de mise à jour.
                </p>
                <p>
                  Nous vous encourageons à consulter régulièrement cette page pour prendre connaissance des éventuelles modifications.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-background/50 backdrop-blur-sm rounded-xl border border-primary/10 p-6">
              <h2 className="font-display text-2xl mb-4 text-primary">
                12. Contact
              </h2>
              <div className="space-y-3 text-foreground/80">
                <p>
                  Pour toute question relative à cette politique de confidentialité ou à la protection de vos données personnelles, 
                  vous pouvez nous contacter :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Par email :{" "}
                    <a href="mailto:monsieurclim83@gmail.com" className="text-primary hover:text-primary/80 transition-colors">
                      monsieurclim83@gmail.com
                    </a>
                  </li>
                  <li>
                    Par téléphone :{" "}
                    <a href="tel:+33646071539" className="text-primary hover:text-primary/80 transition-colors">
                      06 46 07 15 39
                    </a>
                  </li>
                  <li>
                    Via notre{" "}
                    <Link 
                      href="/contact" 
                      className="text-primary hover:text-primary/80 transition-colors underline"
                    >
                      formulaire de contact
                    </Link>
                  </li>
                </ul>
              </div>
            </section>

            <div className="mt-8 text-center text-sm text-foreground/60">
              <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <Link
            href="/legal/mentions-legales"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors font-semibold border border-primary/20"
          >
            Mentions légales
          </Link>
          <Link
            href="/legal/plan-du-site"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors font-semibold border border-primary/20"
          >
            Plan du site
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            Nous contacter
          </Link>
        </div>
      </Container>
    </Section>
  );
}
