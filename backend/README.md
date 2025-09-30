# MonsieurClim Backend

Backend Express pour le site MonsieurClim - Gestion des formulaires de contact et récupération des avis Google.

## 🚀 Fonctionnalités

- **Formulaire de contact** : Réception et traitement des demandes clients
- **Emails automatiques** : Notification admin + confirmation client via Gmail
- **Avis Google** : Récupération des avis Google My Business via API
- **Validation robuste** : Validation et sanitisation des données
- **Sécurité** : Rate limiting, CORS, Helmet, protection anti-spam
- **Cache intelligent** : Mise en cache des avis pour optimiser les performances

## 📋 Prérequis

- Node.js >= 16.0.0
- Compte Gmail avec mot de passe d'application
- API Google Places (optionnel pour les avis)

## 🛠️ Installation

1. **Cloner et installer les dépendances :**
```bash
cd backend
npm install
```

2. **Configuration des variables d'environnement :**
```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer le fichier .env avec vos configurations
nano .env
```

3. **Configuration Gmail (compte classique recommandé) :**
   - Créer ou utiliser un Gmail dédié (ex: contact.monsieurclim@gmail.com)
   - Activer l'authentification à 2 facteurs sur ce compte Gmail
   - Générer un mot de passe d'application : [Guide Google](https://support.google.com/accounts/answer/185833)
   - Utiliser le même Gmail pour l'envoi ET la réception des emails
   - Guide détaillé : [GMAIL_SETUP.md](./GMAIL_SETUP.md)

4. **Configuration Google API (optionnel) :**
   - Créer un projet sur [Google Cloud Console](https://console.cloud.google.com)
   - Activer l'API Google Places
   - Créer une clé API et l'ajouter dans `.env`
   - Récupérer votre Place ID via [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)

## 🔧 Configuration

### 📧 Options de configuration email

#### Option 1 : Gmail classique (recommandé pour les indépendants)
```bash
# Simple : même Gmail pour tout
GMAIL_USER=contact.monsieurclim@gmail.com
ADMIN_EMAIL=contact.monsieurclim@gmail.com
```
✅ **Avantages** : Simple, gratuit, centralisation

#### Option 2 : Gmail + email professionnel  
```bash
# Gmail pour l'envoi, email pro pour la réception
GMAIL_USER=backend@gmail.com
ADMIN_EMAIL=contact@monsieurclim.fr
```
✅ **Avantages** : Image professionnelle

#### Option 3 : Gmail Workspace
```bash
# Gmail professionnel pour tout
GMAIL_USER=contact@monsieurclim.fr
ADMIN_EMAIL=contact@monsieurclim.fr
```
✅ **Avantages** : Domaine personnalisé

📖 **Guide détaillé Gmail** : [GMAIL_SETUP.md](./GMAIL_SETUP.md)

### Variables d'environnement (.env)

```bash
# Configuration serveur
PORT=3001
NODE_ENV=development

# Configuration Gmail SMTP (Gmail classique recommandé)
# Utilisez le même Gmail pour l'envoi ET la réception
GMAIL_USER=contact.monsieurclim@gmail.com
GMAIL_PASSWORD=votre_mot_de_passe_application

# Email de réception des formulaires (même que GMAIL_USER pour simplicité)
ADMIN_EMAIL=contact.monsieurclim@gmail.com

# Configuration Google My Business API (optionnel)
GOOGLE_API_KEY=votre_google_api_key
GOOGLE_PLACE_ID=votre_place_id

# URLs autorisées (CORS)
FRONTEND_URL=http://localhost:3000

# Configuration emails (informations affichées dans les emails)
COMPANY_NAME=MonsieurClim
COMPANY_PHONE=01 23 45 67 89
COMPANY_EMAIL=contact.monsieurclim@gmail.com
```

## 🚀 Démarrage

```bash
# Développement avec rechargement automatique
npm run dev

# Production
npm start
```

Le serveur démarre sur http://localhost:3001

## 📡 API Endpoints

### Formulaires

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/api/form/submit` | POST | Soumission du formulaire de contact |
| `/api/form/types` | GET | Types de demandes disponibles |
| `/api/form/test` | GET | Test du service de formulaire |

### Avis Google

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/api/reviews` | GET | Récupération des avis Google |
| `/api/reviews/stats` | GET | Statistiques des avis |
| `/api/reviews/test` | GET | Test de la configuration Google |
| `/api/reviews/refresh` | POST | Rafraîchissement forcé des avis |

### Utilitaires

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/health` | GET | Statut de santé du serveur |

## 📨 Exemple de formulaire

```javascript
const formData = {
  nom: "Jean Dupont",
  email: "jean.dupont@email.com",
  telephone: "01 23 45 67 89",
  typedemande: "Installation climatisation",
  message: "Je souhaite obtenir un devis pour l'installation d'une climatisation.",
  ville: "Paris",
  codepostal: "75001"
};

fetch('/api/form/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData)
});
```

## 🏗️ Architecture

```
backend/
├── config/           # Configuration (mailer, Google API)
├── controllers/      # Logique métier (formulaires, avis)
├── services/         # Services (emails, API Google)
├── routes/          # Routes Express
├── middlewares/     # Middlewares (erreurs, validation)
├── utils/           # Utilitaires (validation, sanitisation)
├── server.js        # Point d'entrée
└── package.json     # Dépendances
```

## 🔒 Sécurité

- **Rate limiting** : Protection contre le spam et les attaques
- **CORS** : Configuration des origines autorisées
- **Helmet** : Headers de sécurité HTTP
- **Validation** : Validation stricte des données entrantes
- **Sanitisation** : Nettoyage des données utilisateur
- **Protection anti-spam** : Honeypot et détection de mots-clés

## 📧 Templates d'emails

Le service génère automatiquement deux types d'emails :

1. **Email admin** : Notification de nouveau formulaire avec toutes les données
2. **Email client** : Confirmation de réception avec informations de contact

Les templates sont responsifs et incluent le branding MonsieurClim.

## 🔍 Logs et débogage

Les logs incluent :
- Requêtes HTTP avec ID unique
- Erreurs détaillées en mode développement
- Statut des envois d'emails
- Performance des requêtes API

## 🚨 Gestion d'erreurs

- Gestion centralisée des erreurs
- Messages d'erreur utilisateur-friendly
- Fallback en cas d'indisponibilité des services externes
- Logs détaillés pour le débogage

## 🧪 Tests

```bash
# Test de la configuration
curl http://localhost:3001/health

# Test du service formulaire
curl http://localhost:3001/api/form/test

# Test du service avis
curl http://localhost:3001/api/reviews/test
```

## 📈 Performance

- Cache des avis Google (15 minutes TTL)
- Rate limiting adaptatif
- Compression des réponses
- Optimisation des requêtes base de données

## 🔄 Mise à jour

```bash
# Mise à jour des dépendances
npm update

# Vérification des vulnérabilités
npm audit

# Correction automatique
npm audit fix
```

## 📞 Support

Pour toute question technique :
- Vérifier les logs du serveur
- Tester les endpoints `/test`
- Consulter la documentation des APIs utilisées
- 📚 **Documentation complète** : [DOCUMENTATION.md](./DOCUMENTATION.md)

## 📄 Licence

Ce projet est sous licence privée MonsieurClim.
