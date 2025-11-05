// Types pour l'API Google Places
export interface GoogleReview {
  author_name: string;
  author_url?: string;
  language: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export interface GooglePlaceDetails {
  place_id: string;
  name: string;
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
}

export interface GooglePlacesResponse {
  result: GooglePlaceDetails;
  status: string;
}

// Service pour récupérer les avis Google
export class GooglePlacesService {
  private apiKey: string;
  private placeId: string;

  constructor(apiKey: string, placeId: string) {
    this.apiKey = apiKey;
    this.placeId = placeId;
  }

  async getPlaceDetails(): Promise<GooglePlaceDetails | null> {
    try {
      const response = await fetch(
        `/api/google-reviews?placeId=${this.placeId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: GooglePlacesResponse = await response.json();
      
      if (data.status === 'OK' && data.result) {
        return data.result;
      } else {
        console.error('Google Places API error:', data.status);
        return null;
      }
    } catch (error) {
      console.error('Error fetching Google reviews:', error);
      return null;
    }
  }

  // Méthode pour formater les avis pour l'affichage
  formatReviewsForDisplay(reviews: GoogleReview[]): FormattedReview[] {
    return reviews.map(review => ({
      name: review.author_name,
      rating: review.rating,
      text: review.text,
      date: review.relative_time_description,
      profilePhoto: review.profile_photo_url,
      language: review.language
    }));
  }
}

export interface FormattedReview {
  name: string;
  rating: number;
  text: string;
  date: string;
  profilePhoto?: string;
  language: string;
}

// Instance par défaut (à configurer avec vos vraies données)
export const googlePlacesService = new GooglePlacesService(
  process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || '',
  process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || ''
);
