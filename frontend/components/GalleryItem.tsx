"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useScrollAnimation, animationVariants } from "@/hooks/useScrollAnimation";

export default function GalleryItem({ src, title }: { src: string; title: string }) {
  const { ref, isInView } = useScrollAnimation({ amount: 0.15 });

  return (
    <motion.figure 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={animationVariants.individualScale as any}
      className="overflow-hidden"
    >
      <div className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-lg">
        <Image 
          src={src} 
          alt={title} 
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
    </motion.figure>
  );
}
