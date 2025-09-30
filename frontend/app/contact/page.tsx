import ContactContent from "@/components/ContactContent";

export const metadata = {
  title: "Contact | Devis gratuit climatisation Golfe de Saint-Tropez",
  description: "Contactez Monsieur Clim pour tous vos besoins en climatisation, pompe à chaleur et chauffage. Installation, entretien et dépannage dans le Golfe de Saint-Tropez. Devis gratuit.",
  openGraph: {
    title: "Contact | Monsieur Clim",
    description: "Obtenez votre devis gratuit pour l'installation, l'entretien ou le dépannage de votre climatisation dans le Golfe de Saint-Tropez.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}