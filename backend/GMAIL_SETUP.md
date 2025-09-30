# 📧 Configuration Gmail Classique - MonsieurClim

Guide complet pour configurer le backend avec un compte Gmail personnel.

## 🎯 Configuration recommandée

### Avec un seul Gmail (plus simple)

```bash
# .env
GMAIL_USER=contact.monsieurclim@gmail.com
GMAIL_PASSWORD=abcd_efgh_ijkl_mnop
ADMIN_EMAIL=contact.monsieurclim@gmail.com    # Même adresse !
```

### ✅ Avantages
- 🔄 **Centralisation** : Tous les emails au même endroit
- 💰 **Économique** : Pas d'email professionnel nécessaire
- 🛠️ **Simple** : Un seul compte à configurer
- 📱 **Mobile** : Accès Gmail partout

## 🔧 Étapes de configuration

### 1. Créer un Gmail dédié (recommandé)

```
Nom suggéré : contact.monsieurclim@gmail.com
OU : monsieurclim.contact@gmail.com
OU : utilisez votre Gmail existant
```

### 2. Activer l'authentification à 2 facteurs

1. **Gmail** → **Gérer votre compte Google**
2. **Sécurité** → **Validation en 2 étapes**
3. **Activer** et suivre les instructions

### 3. Générer un mot de passe d'application

1. **Sécurité** → **Mots de passe d'application**
2. **Sélectionner l'application** : Autre (nom personnalisé)
3. **Nom** : "MonsieurClim Backend"
4. **Copier** le mot de passe généré (16 caractères)

### 4. Configuration .env

```bash
# Remplacez avec vos vraies valeurs
GMAIL_USER=votre.gmail@gmail.com
GMAIL_PASSWORD=abcd_efgh_ijkl_mnop    # Mot de passe d'application
ADMIN_EMAIL=votre.gmail@gmail.com     # Même adresse
```

## 📬 Comment ça marche

### Réception d'un formulaire

1. **Client** soumet le formulaire sur le site
2. **Backend** traite et envoie 2 emails :

#### Email 1 : Notification admin
```
DE : votre.gmail@gmail.com
VERS : votre.gmail@gmail.com  (vous-même)
OBJET : 🔔 Nouveau message depuis le site - Installation climatisation
```

#### Email 2 : Confirmation client  
```
DE : votre.gmail@gmail.com
VERS : client@email.com
OBJET : ✅ Confirmation de réception - MonsieurClim
```

### Dans votre boîte Gmail

Vous recevrez :
- ✉️ **Messages envoyés** : Confirmations aux clients
- ✉️ **Messages reçus** : Notifications de nouveaux formulaires

## 🎨 Personnalisation des emails

Les templates incluent automatiquement :
- 🏢 **Nom entreprise** : `COMPANY_NAME`
- 📞 **Téléphone** : `COMPANY_PHONE`  
- 📧 **Email contact** : `COMPANY_EMAIL`

```bash
# Dans .env
COMPANY_NAME=MonsieurClim
COMPANY_PHONE=01 23 45 67 89
COMPANY_EMAIL=contact.monsieurclim@gmail.com
```

## 📱 Gestion mobile

Avec Gmail :
- 📲 **App Gmail** : Notifications instantanées
- 🔔 **Push** : Alertes de nouveaux formulaires
- 📧 **Réponse rapide** : Directement depuis l'app

## 🔍 Exemple complet

### Fichier .env final
```bash
# Serveur
PORT=3001
NODE_ENV=development

# Gmail (même compte pour tout)
GMAIL_USER=contact.monsieurclim@gmail.com
GMAIL_PASSWORD=abcd_efgh_ijkl_mnop
ADMIN_EMAIL=contact.monsieurclim@gmail.com

# Frontend
FRONTEND_URL=http://localhost:3000

# Entreprise
COMPANY_NAME=MonsieurClim
COMPANY_PHONE=01 23 45 67 89
COMPANY_EMAIL=contact.monsieurclim@gmail.com
```

### Test de la configuration
```bash
npm run check    # Vérifier la config
npm run dev      # Démarrer le serveur
npm test         # Tester l'envoi d'emails
```

## 🚨 Dépannage

### ❌ "Invalid login"
- ✅ Vérifiez que l'authentification 2FA est activée
- ✅ Utilisez le mot de passe d'application (pas votre mot de passe Gmail normal)

### ❌ "Less secure app"
- ✅ N'activez PAS l'option "Applications moins sécurisées"
- ✅ Utilisez exclusivement les mots de passe d'application

### ❌ Emails non reçus
- ✅ Vérifiez les spams
- ✅ Testez avec `npm test`
- ✅ Consultez les logs : `npm run dev`

## 💡 Conseils Pro

1. **Organisation Gmail** :
   ```
   Créez des libellés : "MonsieurClim - Formulaires"
   Règles de tri automatique
   ```

2. **Sauvegarde** :
   ```
   Exportez régulièrement vos emails importants
   ```

3. **Suivi** :
   ```
   Utilisez Gmail Tasks pour le suivi clients
   ```

## 🆘 Support

Besoin d'aide ? 
1. **Test rapide** : `npm run check`
2. **Logs détaillés** : `npm run dev`
3. **Documentation Gmail** : [Gmail App Passwords](https://support.google.com/accounts/answer/185833)

---

✅ **Prêt !** Votre Gmail est configuré pour MonsieurClim !
