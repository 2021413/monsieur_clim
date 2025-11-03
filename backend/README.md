# MonsieurClim Backend

API REST pour la gestion des formulaires de contact et des avis Google pour le site MonsieurClim.

## 🚀 Installation rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer l'environnement (mode interactif)
npm run setup

# 3. Démarrer le serveur
npm run dev
```

Le serveur démarre sur **http://localhost:3001**

## 📋 Prérequis

- **Node.js** 16.0.0 ou supérieur
- **Compte Gmail** avec authentification à 2 facteurs (pour l'envoi d'emails)
- **Clé API Google Places** (optionnel - pour les avis)

## ⚙️ Configuration

### Configuration automatique (recommandé)

```bash
npm run setup
```

Ce script interactif vous guide pour configurer toutes les variables d'environnement.

### Configuration manuelle

1. Copier le fichier d'exemple :
```bash
cp .env.example .env
```

2. Éditer `.env` et renseigner les valeurs :

#### Variables obligatoires

| Variable | Description | Exemple |
|----------|-------------|---------|
| `GMAIL_USER` | Adresse Gmail pour l'envoi | `monsieurclim83@gmail.com` |
| `GMAIL_PASSWORD` | Mot de passe d'application Gmail | `abcd efgh ijkl mnop` |
| `ADMIN_EMAIL` | Email de réception des formulaires | `monsieurclim83@gmail.com` |

#### Variables optionnelles

| Variable | Description | Par défaut |
|----------|-------------|------------|
| `PORT` | Port du serveur | `3001` |
| `FRONTEND_URL` | URL du frontend (CORS) | `http://localhost:3000` |
| `GOOGLE_API_KEY` | Clé API Google Places | - |
| `GOOGLE_PLACE_ID` | ID du lieu Google | - |

### Configuration Gmail

Pour obtenir un mot de passe d'application Gmail :

1. Aller sur [myaccount.google.com](https://myaccount.google.com)
2. **Sécurité** → Activer l'**authentification à 2 facteurs**
3. **Mots de passe d'application** → Créer un nouveau mot de passe
4. Choisir **Autre (nom personnalisé)** → "MonsieurClim Backend"
5. Copier le mot de passe généré (16 caractères) dans `GMAIL_PASSWORD`

💡 **Astuce** : Utilisez le même Gmail pour `GMAIL_USER` et `ADMIN_EMAIL` (plus simple).

## 📡 API Endpoints

### Santé du serveur
```
GET /health
```
Vérifie que le serveur fonctionne.

### Formulaires

| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/api/form/submit` | Soumet un formulaire de contact |
| `GET` | `/api/form/types` | Liste les types de demandes |
| `GET` | `/api/form/test` | Test de la config email |

#### Exemple de soumission
```bash
curl -X POST http://localhost:3001/api/form/submit \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Jean Dupont",
    "email": "jean@example.com",
    "telephone": "06 12 34 56 78",
    "typedemande": "Installation climatisation",
    "message": "Je souhaite un devis pour une climatisation",
    "ville": "Toulon",
    "codepostal": "83000"
  }'
```

### Avis Google

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/api/reviews` | Récupère les avis Google |
| `GET` | `/api/reviews/stats` | Statistiques des avis |
| `GET` | `/api/reviews/test` | Test de la config Google API |
| `POST` | `/api/reviews/refresh` | Force le rafraîchissement |

## 🧪 Tests

### Vérifier la configuration
```bash
npm run check
```
Vérifie que tout est correctement configuré (fichiers, dépendances, connexions).

### Tester l'API
```bash
npm run test
```
Lance une suite de tests sur tous les endpoints de l'API.

**Note** : Le serveur doit être démarré avant de lancer les tests.

## 🛠️ Commandes

| Commande | Description |
|----------|-------------|
| `npm start` | Démarre le serveur en production |
| `npm run dev` | Démarre avec rechargement auto (nodemon) |
| `npm run setup` | Configuration interactive |
| `npm run check` | Vérifie la configuration |
| `npm run test` | Teste l'API |

## 📁 Structure du projet

```
backend/
├── config/           # Configuration (Gmail, Google API)
├── controllers/      # Logique métier des routes
├── middlewares/      # Middlewares Express (erreurs, etc.)
├── routes/          # Définition des routes API
├── services/        # Services (emails, avis Google)
├── utils/           # Utilitaires (validation, etc.)
├── scripts/         # Scripts de configuration et vérification
├── server.js        # Point d'entrée de l'application
├── test-api.js      # Script de test de l'API
├── package.json     # Dépendances et scripts
└── .env             # Variables d'environnement (à créer)
```

## 🔒 Sécurité

L'API intègre plusieurs protections :

- **Helmet.js** : Protection des headers HTTP
- **Rate limiting** : Limite les requêtes (100/15min général, 5/15min pour les formulaires)
- **CORS** : Autorise uniquement le frontend configuré
- **Validation** : Validation stricte des données d'entrée
- **Sanitization** : Nettoyage des données utilisateur

## 🐛 Dépannage

### Le serveur ne démarre pas
```bash
# Vérifier la configuration
npm run check

# Vérifier les logs pour identifier l'erreur
npm run dev
```

### Les emails ne s'envoient pas
1. Vérifier `GMAIL_USER` et `GMAIL_PASSWORD` dans `.env`
2. Vérifier que l'authentification 2FA est activée sur Gmail
3. Vérifier que le mot de passe d'application est valide (16 caractères)
4. Tester : `npm run test`

### Les avis Google ne fonctionnent pas
1. C'est normal si `GOOGLE_API_KEY` et `GOOGLE_PLACE_ID` ne sont pas configurés
2. L'API fonctionne en mode fallback avec des données de démonstration
3. Pour activer les vrais avis, configurer l'API Google Places

## 📝 Variables d'environnement

### Obligatoires pour les emails
- `GMAIL_USER` : Email Gmail
- `GMAIL_PASSWORD` : Mot de passe d'application
- `ADMIN_EMAIL` : Email de réception

### Optionnelles
- `PORT` : Port du serveur (défaut: 3001)
- `NODE_ENV` : Environnement (development/production)
- `FRONTEND_URL` : URL du frontend (défaut: http://localhost:3000)
- `GOOGLE_API_KEY` : Clé API Google Places
- `GOOGLE_PLACE_ID` : Place ID Google
- `COMPANY_NAME` : Nom de l'entreprise
- `COMPANY_PHONE` : Téléphone
- `COMPANY_EMAIL` : Email public

## 📦 Dépendances principales

- **express** : Framework web
- **nodemailer** : Envoi d'emails
- **googleapis** : API Google Places
- **express-validator** : Validation des données
- **helmet** : Sécurité HTTP
- **cors** : Gestion CORS
- **express-rate-limit** : Limitation du débit

## 🆘 Support

Pour toute question sur la configuration :
1. Vérifier la configuration : `npm run check`
2. Lire les logs : `npm run dev`
3. Tester l'API : `npm run test`

---

**Développé pour MonsieurClim - Expert en climatisation** 🌡️
