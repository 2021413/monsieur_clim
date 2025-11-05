# MonsieurClim - Application Web Complète

Site vitrine professionnel pour Monsieur Clim, spécialiste en climatisation et pompes à chaleur dans le Golfe de Saint-Tropez.

## 📋 Vue d'ensemble

Cette application est composée de deux parties :

- **Frontend** : Site web Next.js 15 avec TypeScript et Tailwind CSS
- **Backend** : API REST Express.js pour la gestion des formulaires et des avis Google

## 🏗️ Architecture

```
MonsieurClim/
├── frontend/          # Application Next.js (port 3000)
│   └── README.md      # Documentation détaillée du frontend
├── backend/           # API Express.js (port 3001)
│   └── README.md      # Documentation détaillée du backend
└── README.md          # Ce fichier
```

## 🚀 Installation rapide

### Prérequis

- **Node.js** 16.0.0 ou supérieur
- **npm** ou **yarn**
- **Compte Gmail** avec authentification à 2 facteurs (pour l'envoi d'emails)

### Installation complète

```bash
# 1. Installer les dépendances du backend
cd backend
npm install

# 2. Configurer le backend (mode interactif)
npm run setup

# 3. Installer les dépendances du frontend
cd ../frontend
npm install

# 4. Configurer le frontend
cp env.local.example env.local
# Éditer env.local et configurer NEXT_PUBLIC_BACKEND_URL
```

### Démarrage

**Terminal 1 - Backend :**
```bash
cd backend
npm run dev
```
Le backend sera accessible sur **http://localhost:3001**

**Terminal 2 - Frontend :**
```bash
cd frontend
npm run dev
```
Le frontend sera accessible sur **http://localhost:3000**

## ⚙️ Configuration

### Backend

Le backend nécessite :
- `GMAIL_USER` : Adresse Gmail pour l'envoi d'emails
- `GMAIL_PASSWORD` : Mot de passe d'application Gmail
- `ADMIN_EMAIL` : Email de réception des formulaires
- `GOOGLE_API_KEY` : (Optionnel) Clé API Google Places pour les avis
- `GOOGLE_PLACE_ID` : (Optionnel) ID du lieu Google

**Configuration automatique (recommandé) :**
```bash
cd backend
npm run setup
```

Voir [backend/README.md](backend/README.md) pour plus de détails.

### Frontend

Le frontend nécessite :
- `NEXT_PUBLIC_BACKEND_URL` : URL du backend (ex: `http://localhost:3001`)
- `NEXT_PUBLIC_SITE_URL` : URL publique du site (ex: `https://monsieurclim.fr`)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` : (Optionnel) ID Google Analytics
- `GOOGLE_PLACES_API_KEY` : (Optionnel) Pour le script des avis
- `GOOGLE_PLACE_ID` : (Optionnel) Pour le script des avis

**Configuration manuelle :**
```bash
cd frontend
cp env.local.example env.local
# Éditer env.local avec vos valeurs
```

Voir [frontend/README.md](frontend/README.md) pour plus de détails.

## 🔧 Technologies utilisées

### Frontend
- **Next.js 15** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utility-first
- **Framer Motion** - Animations
- **React Leaflet** - Cartes interactives
- **React Hook Form** + **Zod** - Gestion des formulaires

### Backend
- **Express.js** - Framework web Node.js
- **Nodemailer** - Envoi d'emails
- **Google APIs** - Récupération des avis Google Places
- **Express Validator** - Validation des données
- **Helmet** - Sécurité HTTP
- **CORS** - Gestion des origines croisées
- **Rate Limiting** - Protection contre les abus

## 📡 API Endpoints

### Backend (http://localhost:3001)

**Santé du serveur :**
- `GET /health` - Vérifie que le serveur fonctionne

**Formulaires :**
- `POST /api/form/submit` - Soumet un formulaire de contact
- `GET /api/form/types` - Liste les types de demandes
- `GET /api/form/test` - Test de la config email

**Avis Google :**
- `GET /api/reviews` - Récupère les avis Google
- `GET /api/reviews/stats` - Statistiques des avis
- `GET /api/reviews/test` - Test de la config Google API
- `POST /api/reviews/refresh` - Force le rafraîchissement

Voir [backend/README.md](backend/README.md) pour plus de détails sur l'API.

## 🎯 Fonctionnalités principales

### Frontend
- ✅ Site vitrine responsive avec pages de services
- ✅ Formulaire de contact avec validation
- ✅ Gestion des cookies (RGPD)
- ✅ Cartes interactives des zones d'intervention
- ✅ Galerie de réalisations
- ✅ Affichage des avis clients
- ✅ SEO optimisé (sitemap, robots.txt, metadata)

### Backend
- ✅ API REST pour les formulaires de contact
- ✅ Envoi d'emails via Gmail
- ✅ Récupération des avis Google Places
- ✅ Validation et sanitization des données
- ✅ Protection contre les abus (rate limiting)
- ✅ Gestion des erreurs

## 🧪 Tests

### Backend
```bash
cd backend
npm run check    # Vérifie la configuration
npm run test     # Teste l'API (serveur doit être démarré)
```

### Frontend
```bash
cd frontend
npm run lint     # Vérification du code
npm run build    # Build de production (teste la compilation)
```

## 📦 Production

### Build du frontend
```bash
cd frontend
npm run build
npm start
```

### Démarrage du backend
```bash
cd backend
npm start
```

## 📚 Documentation détaillée

- **Frontend** : Voir [frontend/README.md](frontend/README.md)
  - Architecture des composants
  - Guide des pages et routes
  - Configuration des variables d'environnement
  - Scripts utilitaires

- **Backend** : Voir [backend/README.md](backend/README.md)
  - Configuration des emails Gmail
  - Documentation complète de l'API
  - Guide de dépannage
  - Variables d'environnement

## 🐛 Dépannage

### Le backend ne démarre pas
1. Vérifier la configuration : `cd backend && npm run check`
2. Vérifier que les variables d'environnement sont correctes
3. Vérifier que le port 3001 n'est pas utilisé

### Le frontend ne se connecte pas au backend
1. Vérifier que `NEXT_PUBLIC_BACKEND_URL` dans `frontend/.env.local` est correct
2. Vérifier que le backend est démarré sur le port 3001
3. Vérifier les logs du backend pour les erreurs CORS

### Les emails ne s'envoient pas
1. Vérifier la configuration Gmail dans `backend/.env`
2. Vérifier que l'authentification 2FA est activée sur Gmail
3. Vérifier que le mot de passe d'application est valide (16 caractères)
4. Tester : `cd backend && npm run test`

## 🔒 Sécurité

L'application intègre plusieurs protections :
- **Helmet.js** : Protection des headers HTTP (backend)
- **Rate limiting** : Limite les requêtes (backend)
- **CORS** : Autorise uniquement le frontend configuré (backend)
- **Validation** : Validation stricte des données (frontend + backend)
- **RGPD** : Gestion du consentement des cookies (frontend)
- **Variables d'environnement** : Pas de données sensibles dans le code

## 📝 Structure du projet

```
MonsieurClim/
├── backend/
│   ├── config/           # Configuration (Gmail, Google API)
│   ├── controllers/      # Logique métier des routes
│   ├── middlewares/      # Middlewares Express
│   ├── routes/           # Définition des routes API
│   ├── services/         # Services (emails, avis Google)
│   ├── utils/            # Utilitaires
│   ├── scripts/          # Scripts de configuration
│   ├── server.js         # Point d'entrée
│   └── README.md         # Documentation backend
│
├── frontend/
│   ├── app/              # Pages et routes (Next.js App Router)
│   ├── components/       # Composants React
│   ├── contexts/         # Contextes React
│   ├── hooks/            # Hooks personnalisés
│   ├── lib/              # Utilitaires et services
│   ├── types/            # Définitions TypeScript
│   ├── public/           # Fichiers statiques
│   └── README.md         # Documentation frontend
│
└── README.md             # Ce fichier
```

## 🆘 Support

En cas de problème :
1. Vérifier la configuration : `cd backend && npm run check`
2. Lire les README spécifiques ([backend/README.md](backend/README.md) et [frontend/README.md](frontend/README.md))
3. Vérifier les logs des serveurs
4. Tester l'API : `cd backend && npm run test`

---

**Développé pour MonsieurClim - Expert en climatisation** 🌡️

