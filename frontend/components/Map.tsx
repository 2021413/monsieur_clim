"use client";

import React from "react";
import { MapContainer, TileLayer, Polygon, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  className?: string;
  interactive?: boolean;
  showButton?: boolean;
  onZoneClick?: () => void;
}

const DEFAULT_CENTER: [number, number] = [43.27, 6.59];
const DEFAULT_ZOOM = 10;

// Coordonnées du Golfe de Saint-Tropez incluant Rayol-Canadel, La Môle et Le Rayol
const GOLF_SAINT_TROPEZ_COORDS: [number, number][] = [
  [43.33, 6.45], // Nord-Ouest (Grimaud centre)
  [43.36, 6.55], // Nord (Sainte-Maxime côte)
  [43.33, 6.65], // Nord-Est (Sainte-Maxime est)
  [43.30, 6.72], // Est (Saint-Tropez)
  [43.27, 6.74], // Sud-Est (Ramatuelle)
  [43.22, 6.70], // Sud (La Croix-Valmer côte)
  [43.18, 6.65], // Sud (Cavalaire côte)
  [43.13, 6.55], // Sud-Ouest (Rayol-Canadel-sur-Mer)
  [43.14, 6.48], // Sud-Ouest (Le Rayol)
  [43.17, 6.45], // Ouest (La Môle centre)
  [43.22, 6.47], // Nord-Ouest (vers La Garde-Freinet)
  [43.28, 6.46], // Retour vers Grimaud
];

function FitBounds() {
  const map = useMap();

  React.useEffect(() => {
    const bounds = GOLF_SAINT_TROPEZ_COORDS.map(([lat, lng]) => [lat, lng] as [number, number]);
    map.fitBounds(bounds, { padding: [24, 24] });
  }, [map]);

  return null;
}

export default function Map({ 
  className, 
  interactive = true, 
  showButton = false, 
  onZoneClick 
}: MapProps) {
  const [primaryColor, setPrimaryColor] = React.useState<string>("#00CFFF");

  React.useEffect(() => {
    const root = document.documentElement;
    const cssPrimary = getComputedStyle(root).getPropertyValue("--primary").trim();
    if (cssPrimary) setPrimaryColor(cssPrimary);
  }, []);

  const mapClassNames = [
    "w-full",
    "h-[420px]",
    "rounded-2xl",
    "overflow-hidden",
    "border",
    "border-secondary/10",
    "shadow-lg",
    "bg-gradient-to-br",
    "from-background",
    "to-secondary/5",
    onZoneClick ? "cursor-pointer" : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  const leafletInteraction = React.useMemo(
    () => ({
      zoomControl: interactive,
      scrollWheelZoom: interactive,
      dragging: interactive,
      doubleClickZoom: interactive,
      boxZoom: interactive,
      keyboard: interactive,
      touchZoom: interactive,
    }),
    [interactive]
  );

  const polygonOptions = React.useMemo(
    () => ({
      color: primaryColor,
      weight: 3,
      opacity: 1,
      fillColor: primaryColor,
      fillOpacity: 0.25,
    }),
    [primaryColor]
  );

  return (
    <div className="relative">
      <div className={mapClassNames}>
        <MapContainer
          center={DEFAULT_CENTER}
          zoom={DEFAULT_ZOOM}
          style={{ width: "100%", height: "100%" }}
          attributionControl={false}
          {...leafletInteraction}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Polygon 
            positions={GOLF_SAINT_TROPEZ_COORDS} 
            pathOptions={polygonOptions}
            eventHandlers={{
              click: () => {
                if (onZoneClick) {
                  onZoneClick();
                }
              },
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  ...polygonOptions,
                  fillOpacity: 0.4,
                  weight: 4,
                });
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle(polygonOptions);
              },
            }}
          />
          
          <FitBounds />
        </MapContainer>
      </div>

      {showButton && (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex w-full justify-center px-4">
          <div className="pointer-events-auto">
            <button 
              onClick={onZoneClick}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium shadow-lg"
            >
              Découvrir nos zones d'intervention
            </button>
          </div>
        </div>
      )}
    </div>
  );
}