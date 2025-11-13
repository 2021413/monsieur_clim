import Hero from "@/components/Hero";
import LogoCloud from "@/components/LogoCloud";
import ServicesGrid from "@/components/ServicesGrid";
import CTA from "@/components/CTA";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import HomeMap from "@/components/HomeMap";
import AnimatedSection from "@/components/AnimatedSection";
import Testimonials from "@/components/Testimonials";
import Image from "next/image";
import Script from "next/script";

export const metadata = {
  title: "Monsieur Clim – Climatisation & Pompes à chaleur Golfe de Saint-Tropez",
  description:
    "Installation, entretien et dépannage de climatisations (PAC air/air), pompes à chaleur air/eau et pompes à chaleur piscine. Devis gratuit, intervention rapide.",
  openGraph: {
    title: "Monsieur Clim – Climatisation & PAC",
    description:
      "Installation, entretien et dépannage – Golfe de Saint‑Tropez. Mitsubishi, Daikin, Heiwa. Toutes marques entretenues et dépannées.",
    type: "website",
    locale: "fr_FR",
    url: "https://monsieurclim.fr/",
  },
};

export default function Page() {
  return (
    <>
      <Script id="ld-localbusiness" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Monsieur Clim",
            url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://monsieurclim.fr"),
            telephone: "+33615938538",
            image: [
              (process.env.NEXT_PUBLIC_SITE_URL ?? "https://monsieurclim.fr") + "/services/hero.webp"
            ],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Golfe de Saint-Tropez",
              addressCountry: "FR",
            },
            areaServed: [
              "Saint-Tropez",
              "Cogolin",
              "Grimaud",
              "Sainte-Maxime",
              "Gassin",
              "La Croix-Valmer",
            ],
            priceRange: "€€",
            sameAs: [
            ],
          }),
        }}
      />
      {/* Hero principal */}
      <Hero />

      {/* Marques partenaires */}
      <Section gradient="accent">
        <AnimatedSection animation="fadeIn">
          <LogoCloud />
        </AnimatedSection>
      </Section>

      {/* Services */}
      <Section gradient="primary">
        <AnimatedSection animation="slideUp" delay={0.2}>
          <ServicesGrid />
        </AnimatedSection>
      </Section>

      {/* Équipements */}
      <Section gradient="accent">
        <AnimatedSection animation="slideUp" delay={0.1}>
          <Heading level={2} className="mb-8 text-center">
            Équipements pris en charge
          </Heading>
        </AnimatedSection>
        <AnimatedSection animation="stagger" delay={0.3} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatedSection animation="staggerItem" className="p-6 rounded-xl bg-background/50 border border-primary/10 hover:border-primary/20 transition-colors">
            <h3 className="font-display text-xl">
              PAC air/eau
              <span className="ml-2 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-sm text-primary">
                Économique
              </span>
            </h3>
            <p className="mt-2 text-sm text-foreground/70">
              Chauffage & eau chaude performants. <span className="text-primary">Idéal maisons individuelles</span> et rénovations.
            </p>
          </AnimatedSection>
          <AnimatedSection animation="staggerItem" className="p-6 rounded-xl bg-background/50 border border-primary/10 hover:border-primary/20 transition-colors">
            <h3 className="font-display text-xl">
              Climatisation (PAC air/air)
              <span className="ml-2 inline-block rounded-full bg-accent/10 px-2 py-0.5 text-sm text-accent">
                Populaire
              </span>
            </h3>
            <p className="mt-2 text-sm text-foreground/70">
              Mono/multi-splits, gainables, confort été comme hiver avec <span className="text-accent">technologie Inverter</span>.
            </p>
          </AnimatedSection>
          <AnimatedSection animation="staggerItem" className="p-6 rounded-xl bg-background/50 border border-primary/10 hover:border-primary/20 transition-colors">
            <h3 className="font-display text-xl">
              Pompes à chaleur piscine
              <span className="ml-2 inline-block rounded-full bg-secondary/10 px-2 py-0.5 text-sm text-secondary">
                Confort
              </span>
            </h3>
            <p className="mt-2 text-sm text-foreground/70">
              Prolongez la <span className="text-secondary">saison de baignade</span> tout en maîtrisant votre consommation.
            </p>
          </AnimatedSection>
        </AnimatedSection>
      </Section>

      {/* Zones d'intervention */}
      <Section gradient="secondary">
        <Container>
          <AnimatedSection animation="slideUp" delay={0.1}>
            <Heading level={2} className="mb-8 text-center">
              Zones d'intervention
            </Heading>
          </AnimatedSection>
          <div className="mt-8">
            <HomeMap />
          </div>
        </Container>
      </Section>

      {/* Avis clients */}
      <Section gradient="accent">
        <Container>
          <Testimonials />
        </Container>
      </Section>
      
      {/* Preuves / différenciants */}
      <Section gradient="primary">
        <AnimatedSection animation="fadeIn" delay={0.1}>
          <Heading level={2} className="mb-8 text-center">
            Pourquoi choisir Monsieur Clim ?
          </Heading>
        </AnimatedSection>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Devis gratuit",
              text: "Réponse rapide avec recommandations adaptées à votre logement.",
              icon: "📝"
            },
            { 
              title: "Intervention locale", 
              text: "Golfe de Saint‑Tropez et alentours.",
              icon: "📍"
            },
            { 
              title: "Toutes marques", 
              text: "Entretien & dépannage marques grand public.",
              icon: "🛠"
            },
            { 
              title: "Partenaires de confiance", 
              text: "Mitsubishi, Daikin, Heiwa.",
              icon: "🤝"
            },
          ].map((b, index) => (
            <AnimatedSection
              key={b.title}
              animation="fadeIn"
              delay={0.2 + (index * 0.05)}
              className="rounded-xl bg-background/50 border border-primary/10 hover:border-primary/20 p-6 transition-all duration-300"
            >
              <h3 className="font-display text-lg text-primary mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {b.icon}
                </span>
                {b.title}
              </h3>
              <p className="text-sm text-foreground/70">{b.text}</p>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* Bloc mise en avant */}
      <Section gradient="dark">
        <AnimatedSection animation="slideUp" delay={0.2}>
          <CTA />
        </AnimatedSection>
      </Section>
    </>
  );
}
