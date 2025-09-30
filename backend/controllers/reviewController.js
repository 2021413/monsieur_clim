const googleReviewService = require('../services/googleReviewService');

/**
 * Contrôleur pour la gestion des avis Google My Business
 */
class ReviewController {
  /**
   * Récupère les avis Google My Business
   * GET /api/reviews
   */
  async getReviews(req, res, next) {
    try {
      console.log('📊 Récupération des avis Google...');

      // Récupération des avis via le service
      const reviewsData = await googleReviewService.fetchReviews();

      // Log du succès
      console.log(`✅ ${reviewsData.reviews.length} avis récupérés avec succès`);

      res.status(200).json({
        success: true,
        message: 'Avis récupérés avec succès',
        data: reviewsData
      });

    } catch (error) {
      console.error('❌ Erreur lors de la récupération des avis:', error);
      
      // Gestion spécifique des erreurs de configuration
      if (error.message.includes('non configuré')) {
        return res.status(503).json({
          success: false,
          message: 'Service d\'avis temporairement indisponible',
          error: 'Configuration Google API manquante'
        });
      }

      // Gestion des erreurs d'API Google
      if (error.message.includes('API')) {
        return res.status(503).json({
          success: false,
          message: 'Service d\'avis temporairement indisponible',
          error: 'Erreur API Google'
        });
      }

      next(error);
    }
  }

  /**
   * Récupère les statistiques des avis
   * GET /api/reviews/stats
   */
  async getReviewStats(req, res, next) {
    try {
      console.log('📈 Récupération des statistiques des avis...');

      const reviewsData = await googleReviewService.fetchReviews();
      
      // Calcul des statistiques
      const stats = googleReviewService.calculateStats(reviewsData.reviews);

      res.status(200).json({
        success: true,
        message: 'Statistiques des avis récupérées avec succès',
        data: {
          businessName: reviewsData.businessName,
          averageRating: reviewsData.averageRating,
          totalReviews: reviewsData.totalReviews,
          statistics: stats,
          lastUpdated: reviewsData.lastUpdated
        }
      });

    } catch (error) {
      console.error('❌ Erreur lors de la récupération des statistiques:', error);
      next(error);
    }
  }

  /**
   * Endpoint de test pour vérifier la configuration Google API
   * GET /api/reviews/test
   */
  async testGoogleApi(req, res) {
    try {
      const isConfigured = await googleReviewService.testConfiguration();
      
      if (isConfigured) {
        res.status(200).json({
          success: true,
          message: 'Configuration Google API opérationnelle',
          data: {
            apiConfigured: true,
            placeIdConfigured: !!process.env.GOOGLE_PLACE_ID,
            timestamp: new Date().toISOString()
          }
        });
      } else {
        res.status(503).json({
          success: false,
          message: 'Configuration Google API incomplète',
          data: {
            apiConfigured: !!process.env.GOOGLE_API_KEY,
            placeIdConfigured: !!process.env.GOOGLE_PLACE_ID,
            timestamp: new Date().toISOString()
          }
        });
      }
    } catch (error) {
      console.error('❌ Erreur test Google API:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors du test de la configuration Google API',
        error: error.message
      });
    }
  }

  /**
   * Force le rafraîchissement du cache des avis
   * POST /api/reviews/refresh
   */
  async refreshReviews(req, res, next) {
    try {
      console.log('🔄 Rafraîchissement forcé des avis...');

      // Force le rafraîchissement en ignorant le cache
      const reviewsData = await googleReviewService.fetchReviews(true);

      res.status(200).json({
        success: true,
        message: 'Avis rafraîchis avec succès',
        data: reviewsData
      });

    } catch (error) {
      console.error('❌ Erreur lors du rafraîchissement des avis:', error);
      next(error);
    }
  }
}

module.exports = new ReviewController();
