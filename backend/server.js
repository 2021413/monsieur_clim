const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import des routes
const formRoutes = require('./routes/formRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Import des middlewares
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuration des middlewares de sécurité
app.use(helmet());

// Configuration CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite de 100 requêtes par fenêtre
  message: {
    error: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard.'
  }
});
app.use(limiter);

// Rate limiting spécifique pour les formulaires
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // maximum 5 soumissions de formulaire par 15 minutes
  message: {
    error: 'Trop de soumissions de formulaire, veuillez patienter.'
  }
});

// Middleware pour parser le JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Route de santé
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'MonsieurClim Backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Routes API
app.use('/api/form', formLimiter, formRoutes);
app.use('/api/reviews', reviewRoutes);

// Route 404
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route non trouvée',
    message: `La route ${req.originalUrl} n'existe pas`
  });
});

// Middleware de gestion d'erreurs (doit être en dernier)
app.use(errorHandler);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur MonsieurClim démarré sur le port ${PORT}`);
  console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📧 Email admin: ${process.env.ADMIN_EMAIL || 'non configuré'}`);
  console.log(`🔗 CORS autorisé pour: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});

// Gestion des erreurs non capturées
process.on('uncaughtException', (err) => {
  console.error('❌ Erreur non capturée:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('❌ Promise rejetée non gérée:', err);
  process.exit(1);
});

module.exports = app;
