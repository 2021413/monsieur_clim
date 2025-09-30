# Guide de déploiement - MonsieurClim Backend

Ce guide détaille les différentes options pour déployer le backend MonsieurClim en production.

## 🚀 Options de déploiement

### 1. Déploiement simple avec Node.js

```bash
# Sur le serveur de production
git clone https://votre-repo/MonsieurClim.git
cd MonsieurClim/backend

# Configuration
cp .env.example .env
nano .env  # Configurer les variables

# Installation
npm ci --only=production

# Démarrage
npm start
```

### 2. Déploiement avec PM2 (recommandé)

```bash
# Installation de PM2
npm install -g pm2

# Configuration PM2
npm ci --only=production

# Création du fichier ecosystem.config.js
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'monsieur-clim-backend',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    max_memory_restart: '1G',
    node_args: '--max_old_space_size=1024'
  }]
}
EOF

# Création du dossier logs
mkdir -p logs

# Démarrage avec PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 3. Déploiement avec Docker

```bash
# Construction de l'image
docker build -t monsieur-clim-backend .

# Exécution du conteneur
docker run -d \
  --name monsieur-clim-backend \
  --restart unless-stopped \
  -p 3001:3001 \
  --env-file .env \
  monsieur-clim-backend
```

### 4. Déploiement avec Docker Compose

```bash
# Démarrage complet avec nginx
docker-compose --profile with-nginx up -d

# Backend seul
docker-compose up -d monsieur-clim-backend
```

## 🔧 Configuration de production

### Variables d'environnement essentielles

```bash
# .env de production
NODE_ENV=production
PORT=3001

# Gmail SMTP (obligatoire) - Gmail classique recommandé
GMAIL_USER=contact.monsieurclim@gmail.com
GMAIL_PASSWORD=votre_mot_de_passe_app
ADMIN_EMAIL=contact.monsieurclim@gmail.com

# Configuration entreprise
COMPANY_NAME=MonsieurClim
COMPANY_PHONE=01 23 45 67 89
COMPANY_EMAIL=contact.monsieurclim@gmail.com

# CORS et sécurité
FRONTEND_URL=https://monsieurclim.fr

# Google API (optionnel)
GOOGLE_API_KEY=votre_cle_api
GOOGLE_PLACE_ID=votre_place_id
```

### Configuration Gmail pour la production

1. **Compte Gmail dédié** (recommandé)
   ```
   Créer un Gmail spécifique : contact.monsieurclim@gmail.com
   Utiliser le même pour l'envoi ET la réception
   ```

2. **Authentification à 2 facteurs**
   ```
   Activer 2FA sur le compte Gmail
   ```

3. **Mot de passe d'application**
   ```
   Générer un mot de passe d'application spécifique
   Utiliser ce mot de passe dans GMAIL_PASSWORD
   ```

### Configuration reverse proxy (Nginx)

```nginx
# /etc/nginx/sites-available/monsieur-clim-api
server {
    listen 80;
    server_name api.monsieurclim.fr;

    location / {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 🔒 Sécurité en production

### 1. Firewall
```bash
# Ubuntu/Debian avec ufw
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

### 2. SSL/TLS avec Let's Encrypt
```bash
# Installation Certbot
sudo apt install certbot python3-certbot-nginx

# Génération du certificat
sudo certbot --nginx -d api.monsieurclim.fr
```

### 3. Monitoring et logs

```bash
# Surveillance avec PM2
pm2 monit

# Logs
pm2 logs
tail -f logs/combined.log

# Métriques système
htop
df -h
free -m
```

## 📊 Monitoring et maintenance

### Scripts de maintenance

```bash
# Redémarrage sécurisé
pm2 reload ecosystem.config.js

# Mise à jour des dépendances
npm audit
npm update

# Nettoyage des logs
pm2 flush
find logs/ -name "*.log" -mtime +30 -delete
```

### Métriques importantes

- **RAM usage** : < 1GB par instance
- **CPU usage** : < 50% en moyenne
- **Disk usage** : Surveiller les logs
- **Response time** : < 200ms pour /health
- **Error rate** : < 1%

## 🚨 Dépannage

### Problèmes courants

1. **Service ne démarre pas**
   ```bash
   npm run check    # Vérifier la configuration
   pm2 logs         # Consulter les logs
   ```

2. **Emails non envoyés**
   ```bash
   # Tester Gmail
   curl -X POST http://localhost:3001/api/form/test
   
   # Vérifier les logs
   grep "SMTP" logs/combined.log
   ```

3. **API Google indisponible**
   ```bash
   # Vérifier la configuration
   curl http://localhost:3001/api/reviews/test
   ```

### Logs d'erreur

```bash
# Logs en temps réel
pm2 logs --lines 100

# Recherche d'erreurs
grep -i error logs/combined.log
grep -i "SMTP" logs/combined.log
```

## 🔄 Mise à jour

### Procédure de mise à jour

```bash
# Sauvegarde
cp .env .env.backup

# Récupération du code
git pull origin main

# Mise à jour des dépendances
npm ci --only=production

# Redémarrage
pm2 reload ecosystem.config.js

# Vérification
curl http://localhost:3001/health
npm run check
```

## 📈 Optimisations

### Performance

```bash
# Activation du cache npm
npm config set cache-min 86400

# Optimisation Node.js
export NODE_OPTIONS="--max-old-space-size=1024"
```

### Base de données (si ajoutée)

```bash
# MongoDB
# Redis pour le cache
# PostgreSQL pour les données transactionnelles
```

## 🆘 Support

En cas de problème :

1. Consulter les logs : `pm2 logs`
2. Vérifier la configuration : `npm run check`
3. Tester les services : `node test-api.js`
4. Consulter la documentation : [README.md](./README.md)

## 📋 Checklist de déploiement

- [ ] Configuration .env complète
- [ ] Tests de l'API fonctionnels
- [ ] SSL/TLS configuré
- [ ] Monitoring en place
- [ ] Sauvegardes configurées
- [ ] Documentation mise à jour
- [ ] Équipe formée sur l'utilisation
