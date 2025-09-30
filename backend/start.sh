#!/bin/bash

# Script de démarrage rapide pour MonsieurClim Backend
# Utilisation: ./start.sh

echo "🚀 Démarrage du backend MonsieurClim..."

# Vérification de Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    exit 1
fi

# Vérification de npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé"
    exit 1
fi

# Vérification du fichier .env
if [ ! -f .env ]; then
    echo "⚠️  Fichier .env non trouvé"
    echo "📋 Copie du fichier d'exemple..."
    cp .env.example .env
    echo "✅ Fichier .env créé à partir de .env.example"
    echo "🔧 Veuillez configurer vos variables d'environnement dans le fichier .env"
    echo ""
    echo "Variables importantes à configurer :"
    echo "  - GMAIL_USER: votre email Gmail"
    echo "  - GMAIL_PASSWORD: mot de passe d'application Gmail"
    echo "  - ADMIN_EMAIL: email de réception des formulaires"
    echo "  - GOOGLE_API_KEY: clé API Google (optionnel)"
    echo "  - GOOGLE_PLACE_ID: ID du lieu Google (optionnel)"
    echo ""
    read -p "Appuyez sur Entrée pour continuer une fois la configuration terminée..."
fi

# Installation des dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Démarrage en mode développement
echo "🏃 Démarrage du serveur en mode développement..."
echo "📡 Le serveur sera disponible sur http://localhost:3001"
echo "🔍 Endpoint de test: http://localhost:3001/health"
echo ""
echo "Pour arrêter le serveur, utilisez Ctrl+C"
echo ""

npm run dev
