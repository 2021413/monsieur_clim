"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import AnimatedSection from "@/components/AnimatedSection";
import { useScrollAnimation, animationVariants } from "@/hooks/useScrollAnimation";
import Image from "next/image";
import Button from "@/components/ui/Button";

interface ServicePageLayoutProps {
  children: React.ReactNode;
}

export default function ServicePageLayout({ children }: ServicePageLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedHeroSection({ 
  title, 
  description, 
  imageSrc, 
  imageAlt,
  buttonText = "Demander un devis",
  buttonHref = "/contact"
}: {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  buttonText?: string;
  buttonHref?: string;
}) {
  return (
    <div className="relative overflow-hidden -mt-32 [&_header]:bg-black/80 [&_header]:border-0 min-h-[500px] sm:min-h-[600px] dynamic-vh">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="100vw"
        className="object-cover object-center scale-105"
        priority
      />
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 flex items-center px-4 sm:px-6 lg:px-8 min-h-[500px] sm:min-h-[600px] dynamic-vh">
        <div className="w-full max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Heading level={1} className="mb-4 text-white">
                {title}
              </Heading>
            </motion.div>
            <motion.p 
              className="mb-6 text-lg text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button href={buttonHref}>{buttonText}</Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AnimatedDescriptionSection({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <Section gradient="primary">
      <AnimatedSection animation="slideUp" delay={0.1}>
        {children}
      </AnimatedSection>
    </Section>
  );
}

export function AnimatedBenefitsSection({ 
  title,
  benefits
}: { 
  title: string;
  benefits: Array<{ title: string; description: string }>;
}) {
  const { ref, isInView } = useScrollAnimation({ amount: 0.1 });

  return (
    <Section gradient="secondary">
      <AnimatedSection animation="slideUp" delay={0.1}>
        <Heading level={2} className="mb-12 text-center">
          {title}
        </Heading>
      </AnimatedSection>
      
      <motion.div 
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={animationVariants.stagger as any}
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {benefits.map((benefit) => (
          <motion.div
            key={benefit.title}
            variants={animationVariants.staggerItem as any}
            className="group rounded-xl bg-gradient-to-b from-[#161c2e] to-[#1a2135] border border-primary/10 hover:border-primary/20 p-6 transition-all duration-300"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" className="stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 12L11 14L15 10" className="stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="mb-3 font-display text-xl font-semibold text-foreground">
              {benefit.title}
            </h3>
            <p className="text-foreground/70">
              {benefit.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

export function AnimatedFeaturesList({ 
  features 
}: { 
  features: string[] 
}) {
  const { ref, isInView } = useScrollAnimation({ amount: 0.2 });

  return (
    <motion.ul 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={animationVariants.stagger as any}
      className="grid gap-3 sm:grid-cols-2"
    >
      {features.map((feature) => (
        <motion.li 
          key={feature} 
          variants={animationVariants.staggerItem as any}
          className="flex items-center gap-2"
        >
          <svg className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-foreground/80">{feature}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

export function AnimatedProcessSection({ 
  title,
  steps
}: { 
  title: string;
  steps: Array<{ title: string; description: string }>;
}) {
  const { ref, isInView } = useScrollAnimation({ amount: 0.1 });

  return (
    <Section gradient="secondary">
      <AnimatedSection animation="slideUp" delay={0.1}>
        <Heading level={2} className="mb-12 text-center">
          {title}
        </Heading>
      </AnimatedSection>
      
      <motion.div 
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={animationVariants.stagger as any}
        className="relative"
      >
        {/* Desktop layout with arrows */}
        <div className="hidden lg:flex items-stretch justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.title}>
              <motion.div
                variants={animationVariants.staggerItem as any}
                className="flex-1 max-w-xs"
              >
                <div className="group rounded-xl bg-gradient-to-b from-[#161c2e] to-[#1a2135] border border-primary/10 hover:border-primary/20 p-6 transition-all duration-300 text-center h-full flex flex-col">
                  <div className="mb-4 mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-base border-2 border-primary">
                    {index + 1}
                  </div>
                  <h3 className="mb-3 font-display text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-foreground/70 flex-1">
                    {step.description}
                  </p>
                </div>
              </motion.div>
              
              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <motion.div
                  variants={animationVariants.staggerItem as any}
                  className="flex-shrink-0 mx-4 flex items-center"
                >
                  <svg 
                    className="w-8 h-8 text-primary/60" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 7l5 5m0 0l-5 5m5-5H6" 
                    />
                  </svg>
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile layout - vertical stack */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => (
            <React.Fragment key={step.title}>
              <motion.div
                variants={animationVariants.staggerItem as any}
                className="group rounded-xl bg-gradient-to-b from-[#161c2e] to-[#1a2135] border border-primary/10 hover:border-primary/20 p-6 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-base border-2 border-primary">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="mb-3 font-display text-xl font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-foreground/70">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
              
              {/* Arrow between steps for mobile */}
              {index < steps.length - 1 && (
                <motion.div
                  variants={animationVariants.staggerItem as any}
                  className="flex justify-center"
                >
                  <svg 
                    className="w-6 h-6 text-primary/60" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M7 13l5 5m0 0l5-5m-5 5V6" 
                    />
                  </svg>
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

export function AnimatedCTASection({ 
  title,
  description,
  buttonText = "Contactez-nous",
  buttonHref = "/contact"
}: {
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
}) {
  return (
    <Section gradient="dark">
      <AnimatedSection animation="slideUp" delay={0.1}>
        <div className="text-center">
          <Heading level={2} className="mb-6">
            {title}
          </Heading>
          <p className="mx-auto mb-8 max-w-2xl text-white/90">
            {description}
          </p>
          <Button href={buttonHref} variant="secondary">
            {buttonText}
          </Button>
        </div>
      </AnimatedSection>
    </Section>
  );
}

