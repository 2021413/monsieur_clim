#!/usr/bin/env node

/**
 * Script de configuration initiale pour MonsieurClim Backend
 * Aide à la configuration des variables d'environnement
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Configuration par défaut
const defaultConfig = {
  PORT: '3001',
  NODE_ENV: 'development',
  FRONTEND_URL: 'http://localhost:3000',
  COMPANY_NAME: 'MonsieurClim',
  COMPANY_PHONE: '01 23 45 67 89',
  COMPANY_EMAIL: 'contact@monsieurclim.fr'
};

async function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function setupEnvironment() {
  console.log('🔧 Configuration initiale du backend MonsieurClim\n');
  
  const envPath = path.join(__dirname, '..', '.env');
  const envExamplePath = path.join(__dirname, '..', '.env.example');
  
  // Vérifier si .env existe déjà
  if (fs.existsSync(envPath)) {
    const overwrite = await question('Un fichier .env existe déjà. Le remplacer ? (y/N): ');
    if (overwrite.toLowerCase() !== 'y') {
      console.log('Configuration annulée.');
      rl.close();
      return;
    }
  }
  
  console.log('📝 Configuration des variables d\'environnement...\n');
  
  const config = { ...defaultConfig };
  
  // Configuration du serveur
  console.log('🖥️  Configuration du serveur:');
  const port = await question(`Port du serveur (${defaultConfig.PORT}): `);
  if (port) config.PORT = port;
  
  const env = await question('Environnement (development/production) [development]: ');
  if (env) config.NODE_ENV = env;
  
  // Configuration Gmail
  console.log('\n📧 Configuration Gmail SMTP:');
  console.log('(Nécessite un compte Gmail avec authentification à 2 facteurs)');
  console.log('💡 Conseil : Utilisez le même Gmail pour l\'envoi ET la réception (plus simple)');
  
  const gmailUser = await question('Email Gmail pour l\'envoi: ');
  if (gmailUser) config.GMAIL_USER = gmailUser;
  
  const gmailPassword = await question('Mot de passe d\'application Gmail: ');
  if (gmailPassword) config.GMAIL_PASSWORD = gmailPassword;
  
  const sameEmail = await question(`Utiliser le même email (${gmailUser || 'Gmail'}) pour la réception ? (Y/n): `);
  if (sameEmail.toLowerCase() !== 'n') {
    config.ADMIN_EMAIL = gmailUser || config.ADMIN_EMAIL;
  } else {
    const adminEmail = await question('Email de réception des formulaires: ');
    if (adminEmail) config.ADMIN_EMAIL = adminEmail;
  }
  
  // Configuration Google API (optionnel)
  console.log('\n🌐 Configuration Google API (optionnel):');
  const useGoogleApi = await question('Configurer l\'API Google pour les avis ? (y/N): ');
  
  if (useGoogleApi.toLowerCase() === 'y') {
    const googleApiKey = await question('Clé API Google Places: ');
    if (googleApiKey) config.GOOGLE_API_KEY = googleApiKey;
    
    const placeId = await question('Google Place ID: ');
    if (placeId) config.GOOGLE_PLACE_ID = placeId;
  }
  
  // Configuration de l'entreprise
  console.log('\n🏢 Configuration de l\'entreprise:');
  const companyName = await question(`Nom de l'entreprise (${defaultConfig.COMPANY_NAME}): `);
  if (companyName) config.COMPANY_NAME = companyName;
  
  const companyPhone = await question(`Téléphone (${defaultConfig.COMPANY_PHONE}): `);
  if (companyPhone) config.COMPANY_PHONE = companyPhone;
  
  const companyEmail = await question(`Email contact (${defaultConfig.COMPANY_EMAIL}): `);
  if (companyEmail) config.COMPANY_EMAIL = companyEmail;
  
  // Configuration CORS
  const frontendUrl = await question(`URL du frontend (${defaultConfig.FRONTEND_URL}): `);
  if (frontendUrl) config.FRONTEND_URL = frontendUrl;
  
  // Générer le fichier .env
  const envContent = Object.entries(config)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
  
  const fullEnvContent = `# Configuration serveur
PORT=${config.PORT}
NODE_ENV=${config.NODE_ENV}

# Configuration Gmail SMTP
GMAIL_USER=${config.GMAIL_USER || 'votre.email@gmail.com'}
GMAIL_PASSWORD=${config.GMAIL_PASSWORD || 'votre_mot_de_passe_application'}

# Email de réception des formulaires
ADMIN_EMAIL=${config.ADMIN_EMAIL || 'admin@monsieurclim.fr'}

# Configuration Google My Business API
GOOGLE_API_KEY=${config.GOOGLE_API_KEY || 'votre_google_api_key'}
GOOGLE_PLACE_ID=${config.GOOGLE_PLACE_ID || 'votre_place_id'}

# URLs autorisées (CORS)
FRONTEND_URL=${config.FRONTEND_URL}

# Configuration emails
COMPANY_NAME=${config.COMPANY_NAME}
COMPANY_PHONE=${config.COMPANY_PHONE}
COMPANY_EMAIL=${config.COMPANY_EMAIL}
`;
  
  try {
    fs.writeFileSync(envPath, fullEnvContent);
    console.log('\n✅ Fichier .env créé avec succès !');
    
    // Afficher un résumé
    console.log('\n📋 Résumé de la configuration:');
    console.log(`   Serveur: http://localhost:${config.PORT}`);
    console.log(`   Environnement: ${config.NODE_ENV}`);
    console.log(`   Email Gmail: ${config.GMAIL_USER || 'Non configuré'}`);
    console.log(`   Email admin: ${config.ADMIN_EMAIL || 'Non configuré'}`);
    console.log(`   API Google: ${config.GOOGLE_API_KEY ? 'Configurée' : 'Non configurée'}`);
    console.log(`   Frontend: ${config.FRONTEND_URL}`);
    
    console.log('\n🚀 Prochaines étapes:');
    console.log('   1. Vérifiez la configuration dans .env');
    console.log('   2. Installez les dépendances: npm install');
    console.log('   3. Démarrez le serveur: npm run dev');
    console.log('   4. Testez l\'API: node test-api.js');
    
  } catch (error) {
    console.error('\n❌ Erreur lors de la création du fichier .env:', error.message);
  }
  
  rl.close();
}

// Fonction d'aide pour la configuration Gmail
function showGmailHelp() {
  console.log('\n📧 Aide pour la configuration Gmail:');
  console.log('1. Connectez-vous à votre compte Gmail');
  console.log('2. Activez l\'authentification à 2 facteurs');
  console.log('3. Allez dans "Gérer votre compte Google" > Sécurité');
  console.log('4. Sous "Se connecter à Google", sélectionnez "Mots de passe d\'application"');
  console.log('5. Générez un nouveau mot de passe pour "Mail"');
  console.log('6. Utilisez ce mot de passe (pas votre mot de passe Gmail normal)\n');
}

// Fonction d'aide pour l'API Google
function showGoogleApiHelp() {
  console.log('\n🌐 Aide pour l\'API Google Places:');
  console.log('1. Allez sur https://console.cloud.google.com');
  console.log('2. Créez un nouveau projet ou sélectionnez un projet existant');
  console.log('3. Activez l\'API "Places API"');
  console.log('4. Créez des identifiants (clé API)');
  console.log('5. Trouvez votre Place ID: https://developers.google.com/maps/documentation/places/web-service/place-id\n');
}

// Interface en ligne de commande
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log('🔧 Script de configuration MonsieurClim Backend\n');
    console.log('Usage:');
    console.log('  node setup.js              - Configuration interactive');
    console.log('  node setup.js --gmail-help - Aide pour Gmail');
    console.log('  node setup.js --google-help - Aide pour Google API');
    console.log('  node setup.js --help       - Afficher cette aide');
    return;
  }
  
  if (args.includes('--gmail-help')) {
    showGmailHelp();
    return;
  }
  
  if (args.includes('--google-help')) {
    showGoogleApiHelp();
    return;
  }
  
  await setupEnvironment();
}

main().catch(console.error);
