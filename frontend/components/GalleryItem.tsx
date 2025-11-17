"use client";

import * as React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import Image from "next/image";

export default function GalleryItem({ src, title }: { src: string; title: string }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { amount: 0.1, once: true });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, scale: 1, y: 0 });
    }
  }, [isInView, controls]);

  return (
    <motion.figure 
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={controls}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="overflow-hidden"
    >
      <div className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-lg group bg-black/20">
        <Image 
          src={src} 
          alt={title} 
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 95vw, (max-width: 768px) 48vw, (max-width: 1024px) 32vw, 400px"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA="
        />
      </div>
    </motion.figure>
  );
}
