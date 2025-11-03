import Container from "@/components/Container";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import Link from "next/link";

export const metadata = {
  title: "Plan du site | Monsieur Clim – Toutes les pages",
  description: "Retrouvez toutes les pages du site Monsieur Clim : services, réalisations, zones d'intervention et informations légales.",
  openGraph: {
    title: "Plan du site | Monsieur Clim",
    description: "Navigation complète du site Monsieur Clim.",
    type: "website",
    locale: "fr_FR",
  },
};

const siteStructure = [
  {
    category: "Pages principales",
    links: [
      { name: "Accueil", href: "/", description: "Page d'accueil du site" },
      { name: "À propos", href: "/about", description: "Découvrez Monsieur Clim et son équipe" },
      { name: "Contact", href: "/contact", description: "Demandez votre devis gratuit" },
      { name: "Avis clients", href: "/avis", description: "Consultez les avis de nos clients" },
      { name: "Nos réalisations", href: "/realisations", description: "Galerie de nos installations" },
      { name: "Zones d'intervention", href: "/zones", description: "Découvrez nos zones de service" },
    ],
  },
  {
    category: "Services",
    links: [
      { name: "Tous nos services", href: "/services", description: "Vue d'ensemble de nos services" },
      { name: "PAC Air/Air (Climatisation)", href: "/services/pac-air-air", description: "Climatisation réversible" },
      { name: "PAC Air/Eau", href: "/services/pac-air-eau", description: "Chauffage et eau chaude sanitaire" },
      { name: "PAC Piscine", href: "/services/pac-piscine", description: "Chauffage de piscine" },
      { name: "Installation", href: "/services/installation", description: "Installation professionnelle" },
      { name: "Entretien", href: "/services/entretien", description: "Maintenance préventive" },
      { name: "Dépannage", href: "/services/depannage", description: "Intervention rapide en cas de panne" },
    ],
  },
  {
    category: "Informations légales",
    links: [
      { name: "Mentions légales", href: "/legal/mentions-legales", description: "Informations légales de l'entreprise" },
      { name: "Politique de confidentialité", href: "/legal/politique-confidentialite", description: "Protection de vos données personnelles" },
      { name: "Plan du site", href: "/legal/plan-du-site", description: "Cette page" },
    ],
  },
];

export default function Page() {
  return (
    <Section gradient="primary">
      <Container className="py-16">
        <Heading level={1} className="mb-4 text-center">
          Plan du site
        </Heading>
        <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto">
          Retrouvez l'ensemble des pages de notre site web organisées par catégorie pour faciliter votre navigation.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {siteStructure.map((section) => (
            <div
              key={section.category}
              className="bg-background/50 backdrop-blur-sm rounded-xl border border-primary/10 p-6 hover:border-primary/20 transition-colors"
            >
              <h2 className="font-display text-2xl mb-4 text-primary">
                {section.category}
              </h2>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group block hover:bg-primary/5 rounded-lg p-2 -ml-2 transition-colors"
                    >
                      <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {link.name}
                      </span>
                      <p className="text-sm text-foreground/60 mt-1">
                        {link.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-foreground/70 mb-4">
            Vous ne trouvez pas ce que vous cherchez ?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            Contactez-nous
          </Link>
        </div>
      </Container>
    </Section>
  );
}
