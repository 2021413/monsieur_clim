"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] rounded-2xl border border-secondary/10 bg-gradient-to-br from-background to-secondary/5 flex items-center justify-center">
      <div className="text-foreground/50">Chargement de la carte...</div>
    </div>
  ),
});

interface MapWrapperProps {
  interactive?: boolean;
  className?: string;
  showButton?: boolean;
  onZoneClick?: () => void;
}

export default function MapWrapper({ interactive = true, className, showButton, onZoneClick }: MapWrapperProps) {
  return <Map interactive={interactive} className={className} showButton={showButton} onZoneClick={onZoneClick} />;
}
