const { googleApiConfig, formatReviewsResponse } = require('../config/googleApi');

/**
 * Service pour la récupération des avis Google My Business
 */
class GoogleReviewService {
  constructor() {
    this.cache = {
      data: null,
      timestamp: null,
      ttl: 15 * 60 * 1000 // Cache de 15 minutes
    };
  }

  /**
   * Récupère les avis Google My Business
   * @param {boolean} forceRefresh - Force le rafraîchissement du cache
   */
  async fetchReviews(forceRefresh = false) {
    try {
      // Vérification du cache si pas de rafraîchissement forcé
      if (!forceRefresh && this.isCacheValid()) {
        console.log('📋 Utilisation du cache pour les avis Google');
        return this.cache.data;
      }

      // Vérification de la configuration
      if (!googleApiConfig.isConfigured()) {
        throw new Error('Configuration Google API non configurée');
      }

      console.log('🌐 Récupération des avis depuis l\'API Google...');

      // Récupération des données depuis l'API Google Places
      const reviewsData = await this.fetchFromGoogleAPI();

      // Mise en cache des données
      this.updateCache(reviewsData);

      console.log(`✅ Avis récupérés et mis en cache: ${reviewsData.reviews.length} avis`);
      return reviewsData;

    } catch (error) {
      console.error('❌ Erreur récupération avis Google:', error);
      
      // Fallback sur le cache en cas d'erreur API
      if (this.cache.data) {
        console.log('🔄 Utilisation du cache de secours');
        return this.cache.data;
      }

      // Fallback sur des données par défaut
      return this.getFallbackData();
    }
  }

  /**
   * Récupère les données depuis l'API Google Places
   */
  async fetchFromGoogleAPI() {
    try {
      // Simulation d'appel API Google Places
      // Dans un cas réel, vous utiliseriez l'API Google Places
      // const placesClient = googleApiConfig.getPlacesClient();
      // const params = googleApiConfig.getDefaultReviewOptions();
      
      // Pour cette démo, on simule une réponse d'API
      const mockGoogleResponse = await this.getMockGoogleData();

      return formatReviewsResponse(mockGoogleResponse);
      
    } catch (error) {
      throw new Error(`Erreur API Google: ${error.message}`);
    }
  }

  /**
   * Données simulées pour la démonstration
   * En production, remplacez par un vrai appel à l'API Google Places
   */
  async getMockGoogleData() {
    // Simulation d'un délai d'API
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      name: "MonsieurClim - Expert Climatisation",
      rating: 4.8,
      user_ratings_total: 47,
      reviews: [
        {
          author_name: "Marie Dupont",
          rating: 5,
          text: "Service excellent ! Installation rapide et propre. L'équipe est très professionnelle et donne de bons conseils. Je recommande vivement !",
          time: Math.floor(Date.now() / 1000) - 86400, // Il y a 1 jour
          profile_photo_url: null,
          relative_time_description: "il y a 1 jour"
        },
        {
          author_name: "Pierre Martin",
          rating: 5,
          text: "Intervention de dépannage très rapide. Problème résolu en moins d'une heure. Prix correct et technicien compétent.",
          time: Math.floor(Date.now() / 1000) - 172800, // Il y a 2 jours
          profile_photo_url: null,
          relative_time_description: "il y a 2 jours"
        },
        {
          author_name: "Sophie Leblanc",
          rating: 4,
          text: "Bonne prestation pour l'entretien de ma climatisation. RDV respecté et travail soigné.",
          time: Math.floor(Date.now() / 1000) - 604800, // Il y a 1 semaine
          profile_photo_url: null,
          relative_time_description: "il y a 1 semaine"
        },
        {
          author_name: "Jean Moreau",
          rating: 5,
          text: "Installation d'une pompe à chaleur parfaitement réalisée. Équipe à l'écoute et devis transparent.",
          time: Math.floor(Date.now() / 1000) - 1209600, // Il y a 2 semaines
          profile_photo_url: null,
          relative_time_description: "il y a 2 semaines"
        },
        {
          author_name: "Anne Petit",
          rating: 5,
          text: "Très satisfaite du service. Installation propre et conseils personnalisés. A recommander !",
          time: Math.floor(Date.now() / 1000) - 1814400, // Il y a 3 semaines
          profile_photo_url: null,
          relative_time_description: "il y a 3 semaines"
        }
      ]
    };
  }

  /**
   * Vérifie si le cache est encore valide
   */
  isCacheValid() {
    if (!this.cache.data || !this.cache.timestamp) {
      return false;
    }
    
    const now = Date.now();
    return (now - this.cache.timestamp) < this.cache.ttl;
  }

  /**
   * Met à jour le cache avec de nouvelles données
   */
  updateCache(data) {
    this.cache.data = data;
    this.cache.timestamp = Date.now();
  }

  /**
   * Retourne des données de fallback en cas d'erreur
   */
  getFallbackData() {
    console.log('📋 Utilisation des données de fallback');
    
    return {
      businessName: "MonsieurClim",
      averageRating: 4.8,
      totalReviews: 0,
      reviews: [],
      lastUpdated: new Date().toISOString(),
      error: "Avis temporairement indisponibles"
    };
  }

  /**
   * Calcule les statistiques des avis
   */
  calculateStats(reviews) {
    if (!reviews || reviews.length === 0) {
      return {
        byRating: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        averageRating: 0,
        totalReviews: 0,
        recommendationRate: 0
      };
    }

    const byRating = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let totalRating = 0;

    reviews.forEach(review => {
      const rating = review.rating;
      if (byRating.hasOwnProperty(rating)) {
        byRating[rating]++;
      }
      totalRating += rating;
    });

    const averageRating = totalRating / reviews.length;
    const recommendationRate = ((byRating[4] + byRating[5]) / reviews.length) * 100;

    return {
      byRating,
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews: reviews.length,
      recommendationRate: Math.round(recommendationRate)
    };
  }

  /**
   * Vide le cache des avis
   */
  clearCache() {
    this.cache.data = null;
    this.cache.timestamp = null;
    console.log('🗑️ Cache des avis vidé');
  }

  /**
   * Test de la configuration Google API
   */
  async testConfiguration() {
    try {
      const isConfigured = googleApiConfig.isConfigured();
      
      if (isConfigured) {
        // Test simple de l'API (en production, faire un vrai test d'API)
        console.log('✅ Configuration Google API valide');
        return true;
      } else {
        console.log('❌ Configuration Google API incomplète');
        return false;
      }
    } catch (error) {
      console.error('❌ Erreur test configuration Google:', error);
      return false;
    }
  }

  /**
   * Récupère les informations du cache
   */
  getCacheInfo() {
    return {
      hasData: !!this.cache.data,
      timestamp: this.cache.timestamp,
      isValid: this.isCacheValid(),
      ttl: this.cache.ttl,
      reviewsCount: this.cache.data ? this.cache.data.reviews.length : 0
    };
  }
}

module.exports = new GoogleReviewService();
