import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { POI } from '@/types/beInspired';
import { activityCategories } from '@/constants/beInspiredData';

// Fix pour les icônes Leaflet par défaut
const fixLeafletIcons = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
};

interface InteractiveMapProps {
  center: [number, number];
  pois: POI[];
  onPOIClick: (poi: POI) => void;
  userLocation: [number, number];
}

// Composant pour centrer la carte sur la position utilisateur
const MapController: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    if (map) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);

  return null;
};

const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
  center, 
  pois, 
  onPOIClick, 
  userLocation 
}) => {
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    fixLeafletIcons();
    setIsMapReady(true);
  }, []);

  // Créer des icônes personnalisées modernes pour chaque catégorie
  const createCategoryIcon = (category: string) => {
    const categoryData = activityCategories.find(cat => cat.id === category);
    const emoji = categoryData?.emoji || '📍';
    
    return L.divIcon({
      html: `<div style="
        background: linear-gradient(135deg, hsl(217.2, 91.2%, 59.8%), hsl(221.2, 83.2%, 53.3%));
        border: 3px solid white;
        border-radius: 20px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        box-shadow: 0 8px 32px rgba(59, 130, 246, 0.25), 0 4px 16px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(8px);
        position: relative;
      ">
        <div style="
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 17px;
          backdrop-filter: blur(4px);
        "></div>
        <span style="position: relative; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));">${emoji}</span>
      </div>`,
      className: 'custom-poi-icon-modern',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -20],
    });
  };

  // Icône moderne pour la position utilisateur
  const userIcon = L.divIcon({
    html: `<div style="
      background: linear-gradient(135deg, hsl(0, 84.2%, 60.2%), hsl(0, 62.8%, 50.6%));
      border: 4px solid white;
      border-radius: 50%;
      width: 28px;
      height: 28px;
      box-shadow: 0 8px 32px rgba(239, 68, 68, 0.3), 0 4px 16px rgba(0, 0, 0, 0.15);
      position: relative;
      animation: pulse 2s infinite;
    ">
      <div style="
        position: absolute;
        inset: 2px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        backdrop-filter: blur(4px);
      "></div>
    </div>
    <style>
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
      }
    </style>`,
    className: 'user-location-icon-modern',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });

  if (!isMapReady) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-map-muted to-background rounded-xl flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-map-primary/20 border-t-map-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground font-medium">Chargement de la carte...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative overflow-hidden rounded-xl">
      {/* Overlay moderne avec bordure glassmorphism */}
      <div className="absolute inset-0 rounded-xl border border-white/20 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm z-10 pointer-events-none" />
      
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        className="rounded-xl relative z-0"
        scrollWheelZoom={true}
        zoomControl={true}
        attributionControl={false}
      >
        <MapController center={center} />
        
        {/* Couche de tuiles moderne */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {/* Marqueur de position utilisateur */}
        <Marker position={userLocation} icon={userIcon}>
          <Popup 
            closeButton={false}
            className="modern-popup"
          >
            <div className="p-4 bg-gradient-to-br from-background to-card border-0 rounded-lg shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-destructive rounded-full animate-pulse"></div>
                <div>
                  <strong className="text-foreground font-semibold">Votre position</strong>
                  <p className="text-muted-foreground text-sm mt-1">Vous êtes ici</p>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>

        {/* Marqueurs des POIs avec style moderne */}
        {pois.map((poi) => (
          <Marker
            key={poi.id}
            position={[poi.latitude, poi.longitude]}
            icon={createCategoryIcon(poi.category)}
            eventHandlers={{
              click: () => onPOIClick(poi),
            }}
          >
            <Popup 
              maxWidth={300} 
              minWidth={280}
              closeButton={false}
              className="modern-popup"
            >
              <div className="p-0 bg-gradient-to-br from-card to-background rounded-xl shadow-2xl border border-border/50 overflow-hidden">
                {/* Header avec gradient */}
                <div className="bg-gradient-to-r from-map-primary to-map-secondary p-4 text-white">
                  <h3 className="font-bold text-lg mb-1">{poi.name}</h3>
                  <p className="text-white/90 text-sm opacity-90">{poi.description}</p>
                </div>
                
                {/* Contenu */}
                <div className="p-4 space-y-4">
                  {/* Stats row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-map-warning/10 px-3 py-2 rounded-lg">
                      <span className="text-map-warning">⭐</span>
                      <span className="font-semibold text-sm text-foreground">{poi.rating}</span>
                      <span className="text-xs text-muted-foreground">({poi.reviews.length})</span>
                    </div>
                    <div className="flex items-center gap-2 bg-map-accent/10 px-3 py-2 rounded-lg">
                      <span className="text-map-accent">💰</span>
                      <span className="text-xs capitalize text-foreground font-medium">{poi.budget}</span>
                    </div>
                  </div>

                  {/* Details row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-map-secondary/10 px-3 py-2 rounded-lg">
                      <span className="text-map-secondary">⏱️</span>
                      <span className="text-xs capitalize text-foreground font-medium">{poi.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-map-primary/10 px-3 py-2 rounded-lg">
                      <span className="text-map-primary">📍</span>
                      <span className="text-xs text-foreground font-medium">Proche</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPOIClick(poi);
                    }}
                    className="w-full bg-gradient-to-r from-map-primary to-map-secondary text-white py-3 px-4 rounded-xl hover:from-map-secondary hover:to-map-primary transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Voir les détails
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Style CSS pour les popups modernes */}
      <style>{`
        .modern-popup .leaflet-popup-content-wrapper {
          background: transparent !important;
          box-shadow: none !important;
          border-radius: 0 !important;
          padding: 0 !important;
        }
        .modern-popup .leaflet-popup-content {
          margin: 0 !important;
        }
        .modern-popup .leaflet-popup-tip {
          background: hsl(var(--card)) !important;
          border: 1px solid hsl(var(--border)) !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1) !important;
        }
        .custom-poi-icon-modern:hover {
          transform: translateY(-2px) scale(1.05) !important;
          box-shadow: 0 12px 40px rgba(59, 130, 246, 0.4), 0 6px 20px rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </div>
  );
};

export default InteractiveMap;