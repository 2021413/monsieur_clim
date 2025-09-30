import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const placeId = searchParams.get('placeId');

  if (!placeId) {
    return NextResponse.json(
      { error: 'Place ID is required' }, 
      { status: 400 }
    );
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Google Places API key not configured' }, 
      { status: 500 }
    );
  }

  try {
    // Récupération des détails du lieu avec les avis
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Filtrer et limiter les avis (maximum 5 avis récents)
    if (data.result && data.result.reviews) {
      data.result.reviews = data.result.reviews
        .sort((a: any, b: any) => b.time - a.time) // Trier par date (plus récent en premier)
        .slice(0, 6) // Limiter à 6 avis
        .filter((review: any) => review.rating >= 4); // Garder seulement les avis 4+ étoiles
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' }, 
      { status: 500 }
    );
  }
}
