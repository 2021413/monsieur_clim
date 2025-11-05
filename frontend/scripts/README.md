# Scripts Frontend

Scripts utilitaires pour le frontend.

## 📥 Récupération des avis Google

### Configuration

1. Ajoutez vos clés API dans `.env.local` à la racine du frontend :

```env
GOOGLE_PLACES_API_KEY=votre_clé_api_google
GOOGLE_PLACE_ID=votre_place_id
```

2. Assurez-vous que l'API Google Places est activée dans votre projet Google Cloud

### Utilisation

```bash
# Depuis le dossier frontend
node scripts/fetch-google-reviews.js
```

Le script va :
- 🔍 Récupérer les avis depuis Google Places API
- 💾 Les sauvegarder dans `data/google-reviews.json`
- 📊 Afficher un résumé dans la console

### Fonctionnement

L'API Google Places Details retourne jusqu'à 5 avis les plus pertinents. Le script :
- Récupère les informations de l'établissement
- Formate les avis avec leurs métadonnées
- Trie les avis par date (plus récent en premier)
- Ajoute la date de dernière mise à jour

### Fréquence de mise à jour

Il est recommandé de lancer ce script :
- ✅ Manuellement quand vous savez avoir de nouveaux avis
- ✅ Via un cron job (hebdomadaire ou mensuel)
- ⚠️ Éviter de le lancer trop souvent (limites API Google)

### Format des données

Les avis sont sauvegardés dans `data/google-reviews.json` :

```json
{
  "metadata": {
    "lastUpdated": "2024-01-15T10:30:00.000Z",
    "source": "Google Places API"
  },
  "place": {
    "name": "Monsieur Clim",
    "rating": 4.9,
    "userRatingsTotal": 42
  },
  "reviews": [
    {
      "authorName": "Jean D.",
      "rating": 5,
      "text": "Excellent service...",
      "formattedDate": "15 janvier 2024"
    }
  ]
}
```

### Sécurité

🔒 **Important** : Ne jamais commiter le fichier `.env.local` dans Git !
Le fichier `.gitignore` est déjà configuré pour l'ignorer.




