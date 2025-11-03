# Frontend - Monsieur Clim

Site web vitrine pour Monsieur Clim, spécialiste en climatisation et pompes à chaleur dans le Golfe de Saint-Tropez.

## 🚀 Démarrage rapide

```bash
# Installation des dépendances
npm install

# Lancement en développement
npm run dev

# Build de production
npm run build

# Démarrage du serveur de production
npm start
```

Le site sera accessible sur `http://localhost:3000`

## 📋 Variables d'environnement

Créer un fichier `.env.local` à la racine du dossier frontend :

```env
# URL du backend (obligatoire)
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

# URL publique du site (pour le SEO)
NEXT_PUBLIC_SITE_URL=https://monsieurclim.fr

# Google Analytics (optionnel)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Places API (pour le script des avis)
GOOGLE_PLACES_API_KEY=votre_clé_api
GOOGLE_PLACE_ID=votre_place_id
```

Voir `env.local.example` pour plus de détails.

## 🏗️ Architecture

### Structure des dossiers

```
frontend/
├── app/                    # Pages et routes (Next.js 15 App Router)
│   ├── page.tsx           # Page d'accueil
│   ├── services/          # Pages des services
│   ├── contact/           # Page de contact
│   ├── api/               # Routes API (Google Reviews)
│   └── legal/             # Pages légales
├── components/            # Composants React réutilisables
│   ├── ui/               # Composants UI de base (Button, Input, etc.)
│   ├── Hero.tsx          # Hero avec carrousel d'images
│   ├── ContactForm.tsx   # Formulaire de contact
│   └── ...
├── contexts/             # Contextes React (Cookies)
├── hooks/                # Hooks personnalisés
├── lib/                  # Utilitaires et services
├── types/                # Définitions TypeScript
└── public/               # Fichiers statiques (images)
```

## 🎨 Technologies

- **Next.js 15** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utility-first
- **Framer Motion** - Animations
- **React Leaflet** - Cartes interactives
- **React Hook Form** + **Zod** - Gestion des formulaires

## 🔧 Fonctionnalités principales

### 1. Formulaire de contact
Le formulaire envoie les données au backend qui gère l'envoi des emails.

```tsx
import ContactForm from "@/components/ContactForm";

<ContactForm 
  title="Contactez-nous" 
  description="Nous répondons sous 24h"
/>
```

### 2. Gestion des cookies (RGPD)
Système complet de gestion du consentement des cookies.

```tsx
// Utiliser le contexte
import { useCookieConsent } from "@/contexts/CookieConsentContext";

const { consent, acceptAll, rejectAll } = useCookieConsent();
```

```tsx
// Tracker un événement (uniquement si consentement)
import { useEventTracking } from "@/hooks/useCookieTracking";

const trackEvent = useEventTracking();
trackEvent('button_click', 'engagement', 'cta_contact');
```

### 3. Cartes interactives
Affichage des zones d'intervention avec React Leaflet.

```tsx
import MapWrapper from "@/components/MapWrapper";

<MapWrapper 
  interactive={true}
  showButton={true}
  onZoneClick={() => router.push('/zones')}
/>
```

### 4. Animations au scroll
Composants animés avec Framer Motion.

```tsx
import AnimatedSection from "@/components/AnimatedSection";

<AnimatedSection animation="slideUp" delay={0.2}>
  <h2>Titre animé</h2>
</AnimatedSection>
```

### 5. Avis Google
Les avis sont stockés dans `data/google-reviews.json` et affichés via le composant `Testimonials`.

## 📱 Pages du site

- `/` - Accueil
- `/services` - Services (Installation, Entretien, Dépannage)
- `/services/pac-air-air` - PAC Air/Air
- `/services/pac-air-eau` - PAC Air/Eau
- `/services/pac-piscine` - PAC Piscine
- `/contact` - Formulaire de contact
- `/about` - À propos
- `/zones` - Zones d'intervention
- `/avis` - Avis clients
- `/realisations` - Galerie de réalisations

## 🎯 SEO

Le site est optimisé pour le référencement :
- Metadata dynamique dans chaque page
- Sitemap automatique (`/sitemap.xml`)
- Robots.txt (`/robots.txt`)
- Schema.org (LocalBusiness)
- Open Graph / Twitter Cards

## 🛠️ Scripts NPM

```bash
npm run dev      # Développement avec hot-reload
npm run build    # Build de production
npm run start    # Serveur de production
npm run lint     # Vérification du code
```

## 📥 Scripts utilitaires

### Mise à jour des avis Google

Pour récupérer les derniers avis depuis Google Places :

```bash
node scripts/fetch-google-reviews.js
```

Ce script nécessite `GOOGLE_PLACES_API_KEY` et `GOOGLE_PLACE_ID` dans `.env.local`.
Voir `scripts/README.md` pour plus de détails.

## 🔒 Sécurité

- Variables d'environnement pour les clés API
- Validation des formulaires (Zod)
- Headers de sécurité (Next.js)
- Gestion RGPD des cookies
- Pas de données sensibles côté client

## 📝 Bonnes pratiques

1. **Composants** : Un composant = un fichier, nommage en PascalCase
2. **Hooks** : Préfixe `use`, logique réutilisable
3. **Types** : Toujours typer les props et les données
4. **Styles** : Tailwind CSS, classes utilitaires
5. **Images** : Utiliser `next/image` pour l'optimisation

## 🐛 Debugging

En cas d'erreur :

1. Vérifier les variables d'environnement (`.env.local`)
2. Vérifier que le backend est lancé
3. Regarder les logs dans la console du navigateur
4. Regarder les logs du terminal (serveur Next.js)

## 📚 Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [React Leaflet](https://react-leaflet.js.org/)

