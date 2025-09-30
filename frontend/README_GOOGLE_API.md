# Configuration Google Places API pour les Avis

## Étapes de configuration

### 1. Google Cloud Console
1. Rendez-vous sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez l'API **Places** dans votre projet

### 2. Créer une clé API
1. Allez dans "Identifiants" > "Créer des identifiants" > "Clé API"
2. Créez **2 clés API** :
   - **Clé serveur** : restreinte par adresse IP de votre serveur
   - **Clé publique** : restreinte par domaine HTTP (votre site web)

### 3. Trouver votre Place ID
1. Utilisez l'outil [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
2. Recherchez "Monsieur Clim" dans votre zone géographique
3. Copiez le Place ID obtenu

### 4. Configuration des variables d'environnement

Créez un fichier `.env.local` dans le dossier `frontend/` avec :

```bash
# Clé API Google Places (côté serveur - ne pas exposer publiquement)
GOOGLE_PLACES_API_KEY=AIzaSyC-xxxxxxxxxxxxxxxxxxxxxxxxxxx

# Clé API publique pour le frontend (restreinte au domaine)
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=AIzaSyC-xxxxxxxxxxxxxxxxxxxxxxxxxxx

# ID de votre établissement Google (Place ID)
NEXT_PUBLIC_GOOGLE_PLACE_ID=ChIJN1t_tDeuEmsRUsoyG83frY4
```

### 5. Sécurité des clés API

#### Restrictions recommandées :

**Clé serveur (`GOOGLE_PLACES_API_KEY`)** :
- Type : Restriction par adresse IP serveur
- IPs autorisées : Votre serveur de production

**Clé publique (`NEXT_PUBLIC_GOOGLE_PLACES_API_KEY`)** :
- Type : Restriction par referrer HTTP
- Domaines autorisés : `monsieurclim.fr/*`, `*.monsieurclim.fr/*`

## Fonctionnement

Une fois configuré, le composant `Testimonials` :
1. Récupère automatiquement les vrais avis Google de votre établissement
2. Affiche la note moyenne et le nombre total d'avis
3. Utilise des avis de fallback si l'API n'est pas disponible
4. Met à jour les données en temps réel

## Tests

Pour tester localement :
1. Configurez les variables d'environnement
2. Redémarrez votre serveur de développement
3. Vérifiez la console pour les logs d'API
4. Les avis Google devraient s'afficher sur la page d'accueil

## Dépannage

- **Erreur 403** : Vérifiez les restrictions de votre clé API
- **Pas d'avis** : Vérifiez que votre Place ID est correct
- **Fallback utilisé** : L'API Google peut avoir des limites de quota
