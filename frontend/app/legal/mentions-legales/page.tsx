import Container from "@/components/Container";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import Link from "next/link";

export const metadata = {
  title: "Mentions légales | Monsieur Clim",
  description: "Mentions légales du site Monsieur Clim - Informations sur l'entreprise, l'hébergement et les conditions d'utilisation.",
  openGraph: {
    title: "Mentions légales | Monsieur Clim",
    description: "Informations légales de l'entreprise Monsieur Clim.",
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
          Mentions légales
        </Heading>

        <div className="prose prose-invert max-w-none">
          <div className="space-y-8">
            {/* Identification de l'entreprise */}
            <section className="bg-background/50 backdrop-blur-sm rounded-xl border border-primary/10 p-6">
              <h2 className="font-display text-2xl mb-4 text-primary">
                1. Identification de l'entreprise
              </h2>
              <div className="space-y-3 text-foreground/80">
                <p>
                  <strong className="text-foreground">Raison sociale :</strong> Monsieur Clim
                </p>
                <p>
                  <strong className="text-foreground">Forme juridique :</strong> Auto-entrepreneur / SASU (à préciser)
                </p>
                <p>
                  <strong className="text-foreground">Adresse du siège social :</strong> Golfe de Saint-Tropez, France
                </p>
                <p>
                  <strong className="text-foreground">SIRET :</strong> [À compléter]
                </p>
                <p>
                  <strong className="text-foreground">TVA intracommunautaire :</strong> [À compléter]
                </p>
                <p>
                  <strong className="text-foreground">Téléphone :</strong>{" "}
                  <a href="tel:+33646071539" className="text-primary hover:text-primary/80 transition-colors">
                    06 46 07 15 39
                  </a>
                </p>
                <p>
                  <strong className="text-foreground">Email :</strong>{" "}
                  <a href="mailto:monsieurclim83@gmail.com" className="text-primary hover:text-primary/80 transition-colors">
                    monsieurclim83@gmail.com
                  </a>
                </p>
                <p>
                  <strong className="text-foreground">Directeur de publication :</strong> Nicolas Lounes
                </p>
              </div>
            </section>

            {/* Conception et développement */}
            <section className="bg-background/50 backdrop-blur-sm rounded-xl border border-primary/10 p-6">
              <h2 className="font-display text-2xl mb-4 text-primary">
                2. Conception et développement du site
              </h2>
              <div className="space-y-3 text-foreground/80">
                <p>
                  <strong className="text-foreground">Agence :</strong> Fast2Web
                </p>
                <p>
                  <strong className="text-foreground">Site web :</strong>{" "}
                  <a 
                    href="https://fast2web.tech" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    fast2web.tech
                  </a>
                </p>
              </div>
            </section>

            {/* Hébergement */}
            <section className="bg-background/50 backdrop-blur-sm rounded-xl border border-primary/10 p-6">
              <h2 className="font-display text-2xl mb-4 text-primary">
                3. Hébergement du site
              </h2>
              <div className="space-y-3 text-foreground/80">
                <p>
                  <strong className="text-foreground">Hébergeur :</strong> Vercel Inc.
                </p>
                <p>
                  <strong className="text-foreground">Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA
                </p>
                <p>
                  <strong className="text-foreground">Site web :</strong>{" "}
                  <a 
                    href="https://vercel.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    vercel.com
                  </a>
                </p>
              </div>
            </section>

            {/* Propriété intellectuelle */}
            <section className="bg-background/50 backdrop-blur-sm rounded-xl border border-primary/10 p-6">
              <h2 className="font-display text-2xl mb-4 text-primary">
                4. Propriété intellectuelle
              </h2>
              <div className="space-y-3 text-foreground/80">
                <p>
                  L'ensemble du contenu de ce site (textes, images, vidéos, logos, graphismes, etc.) est la propriété exclusive de Monsieur Clim, 
                  sauf mention contraire. Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces différents 
                  éléments est strictement interdite sans l'accord écrit préalable de Monsieur Clim.
                </p>
                <p>
                  Les marques et logos des fabricants (Mitsubishi Electric, Daikin, Heiwa, etc.) appartiennent à leurs propriétaires respectifs 
                  et sont utilisés à des fins d'information uniquement.
                </p>
              </div>
            </section>

            {/* Responsabilité */}
            <section className="bg-background/50 backdrop-blur-sm rounded-xl border border-primary/10 p-6">
              <h2 className="font-display text-2xl mb-4 text-primary">
                5. Limitation de responsabilité
              </h2>
              <div className="space-y-3 text-foreground/80">
                <p>
                  Monsieur Clim s'efforce d'assurer au mieux l'exactitude et la mise à jour des informations diffusées sur ce site, 
                  dont elle se réserve le droit de corriger le contenu à tout moment et sans préavis.
                </p>
                <p>
                  Toutefois, Monsieur Clim ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur ce site. 
                  En conséquence, Monsieur Clim décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations 
                  disponibles sur ce site.
                </p>
                <p>
                  Les photos et illustrations présentées sur ce site sont non contractuelles.
                </p>
              </div>
            </section>

            {/* Liens hypertextes */}
            <section className="bg-background/50 backdrop-blur-sm rounded-xl border border-primary/10 p-6">
              <h2 className="font-display text-2xl mb-4 text-primary">
                6. Liens hypertextes
              </h2>
              <div className="space-y-3 text-foreground/80">
                <p>
                  Ce site peut contenir des liens hypertextes vers d'autres sites présents sur le réseau Internet. 
                  Les liens vers ces autres sites ne sauraient engager la responsabilité de Monsieur Clim quant au contenu de ces sites.
                </p>
                <p>
                  La création de liens hypertextes vers le site www.monsieurclim.fr nécessite l'autorisation préalable et écrite de Monsieur Clim.
                </p>
              </div>
            </section>

            {/* Cookies */}
            <section className="bg-background/50 backdrop-blur-sm rounded-xl border border-primary/10 p-6">
              <h2 className="font-display text-2xl mb-4 text-primary">
                7. Cookies
              </h2>
              <div className="space-y-3 text-foreground/80">
                <p>
                  Ce site utilise Google Analytics pour analyser l'audience du site et améliorer son contenu. 
                  Pour plus d'informations sur l'utilisation de vos données personnelles, veuillez consulter notre{" "}
                  <Link 
                    href="/legal/politique-confidentialite" 
                    className="text-primary hover:text-primary/80 transition-colors underline"
                  >
                    Politique de confidentialité
                  </Link>.
                </p>
              </div>
            </section>

            {/* Droit applicable */}
            <section className="bg-background/50 backdrop-blur-sm rounded-xl border border-primary/10 p-6">
              <h2 className="font-display text-2xl mb-4 text-primary">
                8. Droit applicable et juridiction compétente
              </h2>
              <div className="space-y-3 text-foreground/80">
                <p>
                  Les présentes mentions légales sont régies par le droit français. En cas de litige et à défaut d'accord amiable, 
                  le litige sera porté devant les tribunaux français conformément aux règles de compétence en vigueur.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-background/50 backdrop-blur-sm rounded-xl border border-primary/10 p-6">
              <h2 className="font-display text-2xl mb-4 text-primary">
                9. Contact
              </h2>
              <div className="space-y-3 text-foreground/80">
                <p>
                  Pour toute question concernant ces mentions légales ou pour toute demande d'information, 
                  vous pouvez nous contacter :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Par téléphone :{" "}
                    <a href="tel:+33646071539" className="text-primary hover:text-primary/80 transition-colors">
                      06 46 07 15 39
                    </a>
                  </li>
                  <li>
                    Par email :{" "}
                    <a href="mailto:monsieurclim83@gmail.com" className="text-primary hover:text-primary/80 transition-colors">
                      monsieurclim83@gmail.com
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
            href="/legal/politique-confidentialite"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors font-semibold border border-primary/20"
          >
            Politique de confidentialité
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
