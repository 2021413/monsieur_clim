const express = require('express');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

/**
 * Routes pour la gestion des avis Google My Business
 */

// GET /api/reviews - Récupération des avis Google
router.get('/', reviewController.getReviews);

// GET /api/reviews/stats - Récupération des statistiques des avis
router.get('/stats', reviewController.getReviewStats);

// GET /api/reviews/test - Test de la configuration Google API
router.get('/test', reviewController.testGoogleApi);

// POST /api/reviews/refresh - Rafraîchissement forcé des avis
router.post('/refresh', reviewController.refreshReviews);

module.exports = router;
