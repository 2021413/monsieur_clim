# 🚀 Guide de démarrage rapide - MonsieurClim Backend

## Mise en route en 5 minutes

### 1. Installation

```bash
cd backend
npm install
```

### 2. Configuration

```bash
# Configuration automatique (recommandé)
npm run setup

# OU configuration manuelle
cp .env.example .env
nano .env  # Configurer vos variables
```

### 3. Vérification

```bash
npm run check
```

### 4. Démarrage

```bash
# Démarrage simple
npm run dev

# OU avec le script de démarrage
./start.sh
```

### 5. Test

```bash
# Dans un autre terminal
npm test
# OU
node test-api.js
```

## ⚡ Configuration minimale

Pour un démarrage rapide avec Gmail classique :

```bash
# .env - Configuration Gmail simple (même adresse pour tout)
GMAIL_USER=contact.monsieurclim@gmail.com
GMAIL_PASSWORD=votre_mot_de_passe_app
ADMIN_EMAIL=contact.monsieurclim@gmail.com
```

💡 **Astuce** : Utilisez le même Gmail pour l'envoi ET la réception - c'est plus simple !

## 🧪 Endpoints de test

- **Santé** : http://localhost:3001/health
- **Formulaires** : http://localhost:3001/api/form/test
- **Avis** : http://localhost:3001/api/reviews/test

## 📋 Commandes utiles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Démarrage développement |
| `npm run check` | Vérification config |
| `npm run setup` | Configuration interactive |
| `npm test` | Test de l'API |
| `npm run info` | Infos du projet |

## 🔧 Gmail App Password

1. Compte Gmail → Sécurité
2. Authentification à 2 facteurs (obligatoire)
3. Mots de passe d'application → Autre (MonsieurClim Backend)
4. Copier le mot de passe généré dans `.env`

📖 **Guide complet** : [GMAIL_SETUP.md](./GMAIL_SETUP.md)

## 🐛 Problèmes courants

### Port déjà utilisé
```bash
# Changer le port dans .env
PORT=3002
```

### Erreurs SMTP
```bash
# Vérifier Gmail
npm run check
```

### Modules manquants
```bash
npm install
```

## 🆘 Aide

- **Documentation complète** : [README.md](./README.md)
- **Déploiement** : [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Support** : Consulter les logs avec `npm run dev`

---

✅ **Prêt !** Votre backend MonsieurClim est opérationnel sur http://localhost:3001
