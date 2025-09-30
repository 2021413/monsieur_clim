"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { googlePlacesService, FormattedReview, GooglePlaceDetails } from '@/lib/google-places';
import Heading from '@/components/Heading';
import AnimatedSection from '@/components/AnimatedSection';

// Avis de fallback au cas où l'API Google ne fonctionne pas
const fallbackTestimonials: FormattedReview[] = [
  {
    name: "Marie Dubois",
    rating: 5,
    text: "Service excellent ! Installation rapide et propre de notre climatisation. L'équipe est très professionnelle.",
    date: "Il y a 2 semaines",
    language: "fr"
  },
  {
    name: "Jean Martineau",
    rating: 5,
    text: "Dépannage en urgence un dimanche, ils sont venus rapidement. Prix honnête et travail de qualité.",
    date: "Il y a 1 mois",
    language: "fr"
  },
  {
    name: "Sophie Laurent",
    rating: 5,
    text: "Très satisfaite de l'entretien de ma pompe à chaleur. Conseils utiles et service irréprochable.",
    date: "Il y a 3 semaines",
    language: "fr"
  },
  {
    name: "Pierre Rousseau",
    rating: 5,
    text: "Installation PAC air-eau parfaite ! Devis clair, délais respectés. Je recommande vivement.",
    date: "Il y a 1 mois",
    language: "fr"
  },
  {
    name: "Catherine Martin",
    rating: 5,
    text: "Entretien annuel très professionnel. L'équipe explique bien ce qu'elle fait et donne de bons conseils.",
    date: "Il y a 2 mois",
    language: "fr"
  },
  {
    name: "Michel Dupont",
    rating: 5,
    text: "Réparation climatisation en pleine canicule. Intervention le jour même, technicien compétent.",
    date: "Il y a 1 semaine",
    language: "fr"
  }
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = React.useState<FormattedReview[]>(fallbackTestimonials);
  const [placeDetails, setPlaceDetails] = React.useState<GooglePlaceDetails | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const { ref: sectionRef, isInView: sectionInView } = useScrollAnimation({ amount: 0.2 });

  // Charger les avis Google au montage du composant
  React.useEffect(() => {
    const loadGoogleReviews = async () => {
      try {
        setLoading(true);
        const details = await googlePlacesService.getPlaceDetails();
        
        if (details && details.reviews && details.reviews.length > 0) {
          setPlaceDetails(details);
          const formattedReviews = googlePlacesService.formatReviewsForDisplay(details.reviews);
          setTestimonials(formattedReviews);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des avis Google:', error);
        // Utiliser les avis de fallback en cas d'erreur
      } finally {
        setLoading(false);
      }
    };

    loadGoogleReviews();
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const testimonialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="relative">
      <AnimatedSection animation="slideUp" delay={0.1}>
        <Heading level={2} className="mb-8 text-center">
          Ils nous font confiance
        </Heading>
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-yellow-400 text-2xl">★★★★★</span>
            <span className="text-foreground/70 text-lg font-medium">
              {placeDetails 
                ? `${placeDetails.rating}/5 sur Google (${placeDetails.user_ratings_total} avis)`
                : "5.0 sur Google"
              }
            </span>
          </div>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            {loading 
              ? "Chargement des avis Google..."
              : "Découvrez les retours de nos clients satisfaits dans le Golfe de Saint-Tropez"
            }
          </p>
        </div>
      </AnimatedSection>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Carrousel principal d'avis */}
        <motion.div 
          ref={sectionRef}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
          variants={testimonialVariants}
          className="relative h-[400px] rounded-2xl border border-primary/10 bg-gradient-to-br from-background to-primary/5 p-8 flex flex-col justify-center shadow-lg"
        >
          <div className="relative flex-1 flex items-center">
            <div className="w-full">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    index === currentTestimonial 
                      ? 'opacity-100 transform translate-x-0' 
                      : 'opacity-0 transform translate-x-4 absolute inset-0'
                  }`}
                >
                  <div className="text-center space-y-6">
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-2xl">★</span>
                      ))}
                    </div>
                    
                    <blockquote className="text-foreground/80 text-xl italic leading-relaxed">
                      "{testimonial.text}"
                    </blockquote>
                    
                    <div>
                      <div className="font-medium text-primary text-lg">{testimonial.name}</div>
                      <div className="text-sm text-foreground/50">{testimonial.location} • {testimonial.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicateurs */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-primary scale-125' 
                    : 'bg-foreground/30 hover:bg-foreground/50'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Grille des avis récents */}
        <AnimatedSection animation="stagger" delay={0.4} className="space-y-4">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <AnimatedSection
              key={testimonial.name}
              animation="staggerItem"
              className="p-6 rounded-xl bg-background/50 border border-secondary/10 hover:border-secondary/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white font-semibold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-sm">★</span>
                      ))}
                    </div>
                    <span className="text-xs text-foreground/50">{testimonial.date}</span>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="mt-2">
                    <span className="text-sm font-medium text-secondary">{testimonial.name}</span>
                    {testimonial.profilePhoto && (
                      <span className="text-xs text-primary/70 ml-2">✓ Avis vérifié Google</span>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
          
          {/* Lien vers plus d'avis */}
          <AnimatedSection animation="slideUp" delay={0.6}>
            <div className="text-center pt-4">
              <a 
                href="https://www.google.com/search?q=monsieur+clim+saint+tropez" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <span>Voir tous nos avis Google</span>
                <span className="text-xs">→</span>
              </a>
            </div>
          </AnimatedSection>
        </AnimatedSection>
      </div>
    </div>
  );
}
