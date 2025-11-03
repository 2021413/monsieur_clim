"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Heading from '@/components/Heading';
import AnimatedSection from '@/components/AnimatedSection';
import googleReviewsData from '@/data/google-reviews.json';

// Interface pour les avis
interface Review {
  authorName: string;
  rating: number;
  text: string;
  relativeTimeDescription: string;
  formattedDate: string;
  profilePhotoUrl?: string;
}

// Formatter les avis du JSON pour l'affichage
const formatReviewsForDisplay = (reviews: typeof googleReviewsData.reviews) => {
  return reviews.map(review => ({
    name: review.authorName,
    rating: review.rating,
    text: review.text,
    date: review.relativeTimeDescription,
    profilePhoto: review.profilePhotoUrl,
    language: review.language
  }));
};

export default function Testimonials() {
  const testimonials = formatReviewsForDisplay(googleReviewsData.reviews);
  const placeDetails = {
    rating: googleReviewsData.place.rating,
    user_ratings_total: googleReviewsData.place.userRatingsTotal,
    name: googleReviewsData.place.name
  };
  
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);
  const { ref: sectionRef, isInView: sectionInView } = useScrollAnimation({ amount: 0.2 });

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
              {placeDetails.rating}/5 sur Google ({placeDetails.user_ratings_total} avis)
            </span>
          </div>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Découvrez les retours de nos clients satisfaits dans le Golfe de Saint-Tropez
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
                      <div className="text-sm text-foreground/50">{testimonial.date}</div>
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
                href="https://share.google/QeN1rZMnxvairuSF6" 
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
