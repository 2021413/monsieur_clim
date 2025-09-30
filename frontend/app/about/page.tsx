import AboutContent from "@/components/AboutContent";

export const metadata = {
  title: "À propos de Monsieur Clim | Expert en climatisation Golfe de Saint-Tropez",
  description: "Découvrez Monsieur Clim, votre expert en climatisation dans le Golfe de Saint-Tropez. Nicolas Lounes et son équipe vous accompagnent dans l'installation, l'entretien et le dépannage de systèmes de climatisation.",
  openGraph: {
    title: "À propos de Monsieur Clim | Expert climatisation",
    description: "Entreprise familiale dirigée par Nicolas Lounes, spécialisée dans la climatisation et pompes à chaleur dans le Golfe de Saint-Tropez.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function Page() {
  return <AboutContent />;
}
