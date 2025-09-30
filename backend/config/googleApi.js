const { google } = require('googleapis');

/**
 * Configuration de l'API Google My Business pour récupérer les avis
 */
class GoogleApiConfig {
  constructor() {
    this.apiKey = process.env.GOOGLE_API_KEY;
    this.placeId = process.env.GOOGLE_PLACE_ID;
    
    // Vérification des variables d'environnement
    if (!this.apiKey) {
      console.warn('⚠️  GOOGLE_API_KEY non configuré - les avis Google ne seront pas disponibles');
    }
    
    if (!this.placeId) {
      console.warn('⚠️  GOOGLE_PLACE_ID non configuré - les avis Google ne seront pas disponibles');
    }
  }

  /**
   * Initialise le client Google Places API
   */
  getPlacesClient() {
    if (!this.apiKey) {
      throw new Error('Google API Key non configuré');
    }

    return google.places({
      version: 'v1',
      auth: this.apiKey
    });
  }

  /**
   * Vérifie si la configuration Google est complète
   */
  isConfigured() {
    return !!(this.apiKey && this.placeId);
  }

  /**
   * Retourne les paramètres de base pour les requêtes Places API
   */
  getBaseParams() {
    return {
      key: this.apiKey,
      placeid: this.placeId
    };
  }

  /**
   * Configuration des champs à récupérer pour les avis
   */
  getReviewFields() {
    return [
      'reviews',
      'rating',
      'user_ratings_total',
      'name'
    ];
  }

  /**
   * Options par défaut pour la récupération des avis
   */
  getDefaultReviewOptions() {
    return {
      ...this.getBaseParams(),
      fields: this.getReviewFields().join(','),
      language: 'fr', // Langue française pour les avis
      reviews_sort: 'newest' // Trier par les plus récents
    };
  }
}

/**
 * Instance singleton de la configuration Google API
 */
const googleApiConfig = new GoogleApiConfig();

/**
 * Utilitaire pour formater les avis Google
 */
const formatGoogleReview = (review) => {
  return {
    id: review.time || Date.now(), // Utilise le timestamp comme ID
    author: review.author_name || 'Utilisateur anonyme',
    rating: review.rating || 0,
    text: review.text || '',
    date: review.time ? new Date(review.time * 1000).toISOString() : new Date().toISOString(),
    profilePhoto: review.profile_photo_url || null,
    relativeTime: review.relative_time_description || 'Récemment'
  };
};

/**
 * Utilitaire pour formater la réponse complète des avis
 */
const formatReviewsResponse = (placeData) => {
  const reviews = placeData.reviews || [];
  
  return {
    businessName: placeData.name || 'MonsieurClim',
    averageRating: placeData.rating || 0,
    totalReviews: placeData.user_ratings_total || 0,
    reviews: reviews.map(formatGoogleReview).slice(0, 10), // Limite à 10 avis max
    lastUpdated: new Date().toISOString()
  };
};

module.exports = {
  googleApiConfig,
  formatGoogleReview,
  formatReviewsResponse
};
