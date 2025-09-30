"use client";

import { motion } from "framer-motion";
import { useScrollAnimation, animationVariants, AnimationConfig } from "@/hooks/useScrollAnimation";

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: keyof typeof animationVariants;
  delay?: number;
  config?: AnimationConfig;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function AnimatedSection({ 
  children, 
  animation = "slideUp",
  delay = 0,
  config = {},
  className = "",
  as = "div"
}: AnimatedSectionProps) {
  const { ref, isInView } = useScrollAnimation(config);

  // Utiliser une approche plus simple avec un mapping des composants
  const getMotionComponent = () => {
    switch (as) {
      case "section":
        return motion.section;
      case "article":
        return motion.article;
      case "header":
        return motion.header;
      case "footer":
        return motion.footer;
      case "main":
        return motion.main;
      case "aside":
        return motion.aside;
      case "nav":
        return motion.nav;
      default:
        return motion.div;
    }
  };

  const MotionComponent = getMotionComponent();

  const variants = {
    ...animationVariants[animation],
    visible: {
      ...animationVariants[animation].visible,
      transition: {
        ...animationVariants[animation].visible.transition,
        delay: delay
      }
    }
  } as any;

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
