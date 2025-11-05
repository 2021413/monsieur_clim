/**
 * Script pour récupérer les avis Google Places et les sauvegarder dans un fichier JSON
 * 
 * Usage: node scripts/fetch-google-reviews.js
 * 
 * Note: L'API Google Places Details ne retourne que les 5 avis les plus pertinents.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Charger les variables d'environnement depuis .env.local
function loadEnvFile() {
  const envPath = path.join(__dirname, '../.env.local');
  
  if (!fs.existsSync(envPath)) {
    console.error('❌ Fichier .env.local introuvable !');
    console.log('\n📝 Créez un fichier .env.local avec :');
    console.log('GOOGLE_PLACES_API_KEY=votre_clé_api');
    console.log('GOOGLE_PLACE_ID=votre_place_id');
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, 'utf-8');
  const envVars = {};

  envContent.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...valueParts] = trimmedLine.split('=');
      const value = valueParts.join('=').trim();
      envVars[key.trim()] = value;
    }
  });

  return envVars;
}

// Configuration depuis .env.local
const env = loadEnvFile();
const API_KEY = env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = env.GOOGLE_PLACE_ID;
const OUTPUT_FILE = path.join(__dirname, '../data/google-reviews.json');

// Validation
if (!API_KEY || !PLACE_ID) {
  console.error('❌ Variables manquantes dans .env.local !');
  console.log('\nAssurez-vous d\'avoir :');
  console.log('GOOGLE_PLACES_API_KEY=votre_clé_api');
  console.log('GOOGLE_PLACE_ID=votre_place_id');
  process.exit(1);
}

// Couleurs pour la console
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m'
};

/**
 * Effectue une requête HTTPS GET
 */
function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(new Error(`Erreur de parsing JSON: ${error.message}`));
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * Récupère les avis depuis l'API Google Places
 */
async function fetchGoogleReviews() {
  console.log(`${colors.cyan}🔍 Récupération des avis Google Places...${colors.reset}`);
  console.log(`${colors.blue}Place ID: ${PLACE_ID}${colors.reset}\n`);
  
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews,user_ratings_total,formatted_address,photos&key=${API_KEY}&language=fr`;
  
  try {
    const data = await httpsGet(url);
    
    if (data.status !== 'OK') {
      throw new Error(`Erreur API Google: ${data.status} - ${data.error_message || 'Aucun message d\'erreur'}`);
    }
    
    return data.result;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des avis: ${error.message}`);
  }
}

/**
 * Formatte les données pour le fichier JSON
 */
function formatReviewsData(placeDetails) {
  return {
    metadata: {
      lastUpdated: new Date().toISOString(),
      updateDate: new Date().toLocaleString('fr-FR', { 
        dateStyle: 'full', 
        timeStyle: 'short' 
      }),
      source: 'Google Places API',
      placeId: PLACE_ID,
      totalAvailableReviews: placeDetails.reviews ? placeDetails.reviews.length : 0,
      apiNote: "L'API Google Places Details ne retourne que les 5 avis les plus pertinents"
    },
    place: {
      name: placeDetails.name,
      rating: placeDetails.rating,
      userRatingsTotal: placeDetails.user_ratings_total,
      address: placeDetails.formatted_address || '',
      photos: placeDetails.photos ? placeDetails.photos.slice(0, 5).map(photo => photo.photo_reference) : []
    },
    reviews: placeDetails.reviews ? placeDetails.reviews.map(review => ({
      authorName: review.author_name,
      authorUrl: review.author_url || '',
      language: review.language || 'fr',
      originalLanguage: review.original_language || review.language || 'fr',
      profilePhotoUrl: review.profile_photo_url || '',
      rating: review.rating,
      relativeTimeDescription: review.relative_time_description,
      text: review.text,
      time: review.time,
      timestamp: new Date(review.time * 1000).toISOString(),
      formattedDate: new Date(review.time * 1000).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      translated: review.translated || false
    })).sort((a, b) => b.time - a.time) : []
  };
}

/**
 * Sauvegarde les données dans un fichier JSON
 */
function saveToJsonFile(data, filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`${colors.green}✓ Dossier créé: ${dir}${colors.reset}`);
  }
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`${colors.green}✓ Fichier sauvegardé: ${filePath}${colors.reset}`);
}

/**
 * Affiche un résumé des données récupérées
 */
function displaySummary(data) {
  console.log(`\n${colors.cyan}═══════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}📊 RÉSUMÉ DES DONNÉES RÉCUPÉRÉES${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════════════════${colors.reset}\n`);
  
  console.log(`${colors.blue}Établissement:${colors.reset} ${data.place.name}`);
  console.log(`${colors.blue}Note moyenne:${colors.reset} ${colors.yellow}⭐ ${data.place.rating}/5${colors.reset}`);
  console.log(`${colors.blue}Nombre total d'avis:${colors.reset} ${data.place.userRatingsTotal}`);
  console.log(`${colors.blue}Avis récupérés:${colors.reset} ${data.reviews.length}`);
  console.log(`${colors.blue}Dernière mise à jour:${colors.reset} ${data.metadata.updateDate}\n`);
  
  if (data.reviews.length > 0) {
    console.log(`${colors.cyan}📝 DERNIERS AVIS:${colors.reset}\n`);
    
    data.reviews.slice(0, 3).forEach((review, index) => {
      const stars = '⭐'.repeat(review.rating);
      console.log(`${colors.yellow}${index + 1}. ${stars} ${review.rating}/5${colors.reset}`);
      console.log(`   ${colors.blue}Auteur:${colors.reset} ${review.authorName}`);
      console.log(`   ${colors.blue}Date:${colors.reset} ${review.formattedDate}`);
      console.log(`   ${colors.blue}Avis:${colors.reset} ${review.text.substring(0, 100)}${review.text.length > 100 ? '...' : ''}\n`);
    });
    
    if (data.reviews.length > 3) {
      console.log(`   ${colors.blue}... et ${data.reviews.length - 3} autre(s) avis${colors.reset}\n`);
    }
  }
  
  console.log(`${colors.yellow}⚠️  Note importante:${colors.reset}`);
  console.log(`   ${data.metadata.apiNote}`);
  console.log(`   Total disponible via API: ${data.metadata.totalAvailableReviews}/${data.place.userRatingsTotal} avis\n`);
}

/**
 * Fonction principale
 */
async function main() {
  console.log(`\n${colors.green}╔═══════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.green}║   RÉCUPÉRATION DES AVIS GOOGLE PLACES           ║${colors.reset}`);
  console.log(`${colors.green}╚═══════════════════════════════════════════════════╝${colors.reset}\n`);
  
  try {
    const placeDetails = await fetchGoogleReviews();
    
    if (!placeDetails) {
      throw new Error('Aucune donnée récupérée');
    }
    
    console.log(`${colors.green}✓ Données récupérées avec succès${colors.reset}\n`);
    
    const formattedData = formatReviewsData(placeDetails);
    saveToJsonFile(formattedData, OUTPUT_FILE);
    displaySummary(formattedData);
    
    console.log(`${colors.cyan}═══════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.green}✅ TERMINÉ AVEC SUCCÈS !${colors.reset}`);
    console.log(`${colors.cyan}═══════════════════════════════════════════════════${colors.reset}\n`);
    
    process.exit(0);
  } catch (error) {
    console.error(`\n${colors.red}❌ ERREUR: ${error.message}${colors.reset}\n`);
    process.exit(1);
  }
}

// Exécuter le script
main();




