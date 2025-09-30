#!/usr/bin/env node

/**
 * Script de vérification des dépendances et de la configuration
 */

const fs = require('fs');
const path = require('path');

function checkFile(filePath, description) {
  const exists = fs.existsSync(filePath);
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${description}: ${filePath}`);
  return exists;
}

function checkEnvVar(varName, description) {
  const value = process.env[varName];
  const status = value ? '✅' : '⚠️ ';
  const displayValue = value ? (varName.includes('PASSWORD') || varName.includes('KEY') ? '***' : value) : 'Non défini';
  console.log(`${status} ${description}: ${displayValue}`);
  return !!value;
}

function checkNodeModules() {
  const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  
  if (!fs.existsSync(nodeModulesPath)) {
    console.log('❌ node_modules non trouvé - Exécutez: npm install');
    return false;
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    let missingDeps = [];
    
    for (const dep of Object.keys(dependencies)) {
      const depPath = path.join(nodeModulesPath, dep);
      if (!fs.existsSync(depPath)) {
        missingDeps.push(dep);
      }
    }
    
    if (missingDeps.length > 0) {
      console.log('❌ Dépendances manquantes:', missingDeps.join(', '));
      console.log('   Exécutez: npm install');
      return false;
    } else {
      console.log('✅ Toutes les dépendances sont installées');
      return true;
    }
  } catch (error) {
    console.log('❌ Erreur lors de la vérification des dépendances:', error.message);
    return false;
  }
}

async function checkSmtpConnection() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
    console.log('⚠️  Configuration SMTP non complète - impossible de tester');
    return false;
  }
  
  try {
    const { createTransporter } = require('../config/mailer');
    const transporter = createTransporter();
    
    await transporter.verify();
    console.log('✅ Connexion SMTP Gmail réussie');
    return true;
  } catch (error) {
    console.log('❌ Erreur connexion SMTP:', error.message);
    return false;
  }
}

async function checkGoogleApi() {
  if (!process.env.GOOGLE_API_KEY || !process.env.GOOGLE_PLACE_ID) {
    console.log('⚠️  Configuration Google API non complète - fonctionnalité désactivée');
    return false;
  }
  
  try {
    const { googleApiConfig } = require('../config/googleApi');
    const isConfigured = googleApiConfig.isConfigured();
    
    if (isConfigured) {
      console.log('✅ Configuration Google API valide');
      return true;
    } else {
      console.log('❌ Configuration Google API invalide');
      return false;
    }
  } catch (error) {
    console.log('❌ Erreur Google API:', error.message);
    return false;
  }
}

async function main() {
  console.log('🔍 Vérification de la configuration MonsieurClim Backend\n');
  
  // Charger les variables d'environnement
  require('dotenv').config();
  
  console.log('📁 Vérification des fichiers:');
  const filesOk = [
    checkFile('.env', 'Fichier de configuration'),
    checkFile('package.json', 'Configuration npm'),
    checkFile('server.js', 'Serveur principal')
  ].every(Boolean);
  
  console.log('\n📦 Vérification des dépendances:');
  const depsOk = checkNodeModules();
  
  console.log('\n🔧 Vérification des variables d\'environnement:');
  const envVarsOk = [
    checkEnvVar('PORT', 'Port du serveur'),
    checkEnvVar('NODE_ENV', 'Environnement'),
    checkEnvVar('GMAIL_USER', 'Email Gmail'),
    checkEnvVar('GMAIL_PASSWORD', 'Mot de passe Gmail'),
    checkEnvVar('ADMIN_EMAIL', 'Email administrateur'),
    checkEnvVar('FRONTEND_URL', 'URL du frontend'),
    checkEnvVar('COMPANY_NAME', 'Nom de l\'entreprise'),
    checkEnvVar('COMPANY_EMAIL', 'Email de l\'entreprise'),
    checkEnvVar('COMPANY_PHONE', 'Téléphone de l\'entreprise')
  ];
  
  // Variables optionnelles
  console.log('\n🌐 Variables optionnelles:');
  checkEnvVar('GOOGLE_API_KEY', 'Clé API Google');
  checkEnvVar('GOOGLE_PLACE_ID', 'Place ID Google');
  
  console.log('\n🧪 Tests de connexion:');
  const smtpOk = await checkSmtpConnection();
  const googleOk = await checkGoogleApi();
  
  // Résumé
  console.log('\n📊 Résumé:');
  const coreRequirementsOk = filesOk && depsOk && envVarsOk.slice(0, 6).every(Boolean);
  
  if (coreRequirementsOk) {
    console.log('✅ Configuration de base complète');
    console.log('🚀 Le serveur peut être démarré avec: npm run dev');
    
    if (smtpOk) {
      console.log('✅ Service email opérationnel');
    } else {
      console.log('⚠️  Service email nécessite une configuration');
    }
    
    if (googleOk) {
      console.log('✅ Service avis Google opérationnel');
    } else {
      console.log('⚠️  Service avis Google en mode fallback');
    }
  } else {
    console.log('❌ Configuration incomplète');
    console.log('🔧 Exécutez le script de configuration: node scripts/setup.js');
  }
  
  console.log('\n💡 Commandes utiles:');
  console.log('   npm run dev          - Démarrer en mode développement');
  console.log('   node test-api.js     - Tester l\'API');
  console.log('   node scripts/setup.js - Configuration interactive');
  console.log('   ./start.sh           - Script de démarrage rapide');
}

main().catch(console.error);
