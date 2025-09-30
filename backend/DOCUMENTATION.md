# 📚 Documentation complète - MonsieurClim Backend

Index de toute la documentation disponible.

## 🚀 Guides de démarrage

| Guide | Description | Pour qui ? |
|-------|-------------|------------|
| **[QUICKSTART.md](./QUICKSTART.md)** | Démarrage en 5 minutes | Développeurs expérimentés |
| **[README.md](./README.md)** | Documentation complète | Tous les utilisateurs |
| **[GMAIL_SETUP.md](./GMAIL_SETUP.md)** | Configuration Gmail détaillée | Utilisateurs Gmail |

## 🔧 Configuration

### 📧 Email

- **[GMAIL_SETUP.md](./GMAIL_SETUP.md)** - Guide complet Gmail classique
- **Configuration recommandée** : Même Gmail pour envoi + réception
- **Scripts automatiques** : `npm run setup`

### 🌐 API Google (optionnel)

- Configuration dans [README.md](./README.md#configuration)
- Récupération avis Google My Business
- Fallback automatique si non configuré

## 🚀 Déploiement

| Guide | Description | Niveau |
|-------|-------------|--------|
| **[DEPLOYMENT.md](./DEPLOYMENT.md)** | Déploiement production complet | Avancé |
| **Docker** | `docker-compose up` | Intermédiaire |
| **PM2** | Production avec clustering | Avancé |

## 🛠️ Outils et scripts

### Scripts npm disponibles

```bash
npm run dev          # Développement
npm run check        # Vérification config
npm run setup        # Configuration interactive
npm test             # Tests API
npm run info         # Informations projet
```

### Scripts utilitaires

- **`./start.sh`** - Démarrage rapide avec vérifications
- **`scripts/setup.js`** - Configuration interactive
- **`scripts/check-deps.js`** - Vérification système
- **`test-api.js`** - Tests complets de l'API

## 📡 API Reference

### Endpoints principaux

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/health` | GET | Santé du serveur |
| `/api/form/submit` | POST | Soumission formulaire |
| `/api/reviews` | GET | Avis Google |

### Tests et débogage

```bash
# Tests de santé
curl http://localhost:3001/health

# Test formulaire
curl http://localhost:3001/api/form/test

# Test avis Google
curl http://localhost:3001/api/reviews/test
```

## 🔍 Dépannage

### Problèmes courants

1. **Configuration email** → [GMAIL_SETUP.md](./GMAIL_SETUP.md)
2. **Erreurs de démarrage** → `npm run check`
3. **Tests API** → `npm test`

### Logs et monitoring

```bash
# Mode développement
npm run dev

# Logs détaillés
tail -f logs/combined.log  # Si PM2
```

## 🏗️ Architecture

### Structure du projet

```
backend/
├── 📋 Configuration (config/)
├── 🎮 Contrôleurs (controllers/)
├── 🔧 Services (services/)
├── 🛣️ Routes (routes/)
├── 🛡️ Middlewares (middlewares/)
├── 🚀 Scripts (scripts/)
└── 📚 Documentation
```

### Technologies utilisées

- **Runtime** : Node.js 16+
- **Framework** : Express.js
- **Email** : Nodemailer + Gmail
- **API** : Google Places (optionnel)
- **Sécurité** : Helmet, CORS, Rate limiting
- **Déploiement** : Docker, PM2, Nginx

## 📞 Support

### Ressources d'aide

1. **Vérification rapide** : `npm run check`
2. **Tests complets** : `npm test`
3. **Configuration guidée** : `npm run setup`

### Documentation externe

- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [Google Places API](https://developers.google.com/maps/documentation/places/web-service)
- [Express.js Documentation](https://expressjs.com/)
- [Nodemailer Documentation](https://nodemailer.com/)

## 🔄 Maintenance

### Mises à jour

```bash
# Vérification sécurité
npm audit

# Mise à jour dépendances
npm update

# Tests après mise à jour
npm run check && npm test
```

### Sauvegarde

- Configuration : `.env`
- Logs : `logs/` (si PM2)
- Code : Git repository

---

## 🎯 Checklist démarrage rapide

- [ ] `npm install`
- [ ] Configuration `.env` (Gmail obligatoire)
- [ ] `npm run check`
- [ ] `npm run dev`
- [ ] `npm test`
- [ ] ✅ **Opérationnel !**

**Tout fonctionne ?** Votre backend MonsieurClim est prêt ! 🎉

