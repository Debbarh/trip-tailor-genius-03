import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { POI } from '@/types/beInspired';
import { activityCategories } from '@/constants/beInspiredData';
import { MapPin, Navigation, Zap } from 'lucide-react';

// Configuration des icônes Leaflet
const setupLeafletIcons = () => {
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

// Composant pour contrôler la vue de la carte
const MapController = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  
  useEffect(() => {
    if (map && center) {
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
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    setupLeafletIcons();
    setMapReady(true);
  }, []);

  // Créer des icônes modernes personnalisées
  const createModernPOIIcon = (category: string) => {
    const categoryData = activityCategories.find(cat => cat.id === category);
    const emoji = categoryData?.emoji || '📍';
    
    return L.divIcon({
      html: `
        <div style="
          position: relative;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, hsl(217.2, 91.2%, 59.8%), hsl(221.2, 83.2%, 53.3%));
          border: 3px solid white;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3), 0 4px 16px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: all 0.3s ease;
        ">
          ${emoji}
        </div>
      `,
      className: 'modern-poi-marker',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -20],
    });
  };

  // Icône moderne pour l'utilisateur
  const createUserIcon = () => {
    return L.divIcon({
      html: `
        <div style="
          position: relative;
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, hsl(0, 84.2%, 60.2%), hsl(0, 62.8%, 50.6%));
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
          animation: pulse 2s infinite;
        ">
        </div>
        <style>
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }
        </style>
      `,
      className: 'user-location-marker',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12],
    });
  };

  if (!mapReady) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl flex items-center justify-center border border-border/50">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary mx-auto"></div>
            <MapPin className="absolute inset-0 m-auto w-6 h-6 text-primary animate-pulse" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Chargement de la carte</h3>
            <p className="text-muted-foreground text-sm">Préparation de votre expérience interactive...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
      {/* Overlay de style moderne */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none z-[1000] rounded-2xl" />
      
      {/* Indicateur de contrôles en haut */}
      <div className="absolute top-4 left-4 z-[1000] bg-background/95 backdrop-blur-md border border-border/50 rounded-xl px-4 py-2 shadow-lg">
        <div className="flex items-center gap-2 text-sm">
          <Navigation className="w-4 h-4 text-primary" />
          <span className="font-medium text-foreground">Carte interactive</span>
          <Zap className="w-3 h-3 text-secondary" />
        </div>
      </div>

      {/* Compteur de POIs */}
      <div className="absolute top-4 right-4 z-[1000] bg-background/95 backdrop-blur-md border border-border/50 rounded-xl px-4 py-2 shadow-lg">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="font-medium text-foreground">{pois.length} expériences</span>
        </div>
      </div>

      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={true}
        className="h-full w-full rounded-2xl"
        style={{ height: '100%', width: '100%', borderRadius: '16px' }}
      >
        <MapController center={center} />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={userLocation} icon={createUserIcon()}>
          <Popup closeButton={false}>
            <div className="p-3 bg-background border border-border rounded-lg shadow-sm">
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

        {pois.map((poi) => (
          <Marker
            key={poi.id}
            position={[poi.latitude, poi.longitude]}
            icon={createModernPOIIcon(poi.category)}
            eventHandlers={{
              click: () => onPOIClick(poi),
            }}
          >
            <Popup closeButton={false} maxWidth={300}>
              <div className="bg-card border border-border rounded-xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white">
                  <h3 className="font-bold text-lg mb-1">{poi.name}</h3>
                  <p className="text-white/90 text-sm opacity-90">{poi.description}</p>
                </div>
                
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 bg-yellow-100 px-2 py-1 rounded-md">
                      <span>⭐</span>
                      <span className="text-xs font-medium">{poi.rating}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-green-100 px-2 py-1 rounded-md">
                      <span>💰</span>
                      <span className="text-xs font-medium capitalize">{poi.budget}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-100 px-2 py-1 rounded-md">
                      <span>⏱️</span>
                      <span className="text-xs font-medium capitalize">{poi.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-purple-100 px-2 py-1 rounded-md">
                      <span>👥</span>
                      <span className="text-xs font-medium">{poi.reviews.length} avis</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPOIClick(poi);
                    }}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white py-2 px-3 rounded-lg text-sm font-medium hover:opacity-90 transition-all duration-200"
                  >
                    Voir les détails →
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <style>{`
        .modern-poi-marker:hover {
          transform: translateY(-2px) scale(1.05) !important;
        }
        .leaflet-popup-content-wrapper {
          background: transparent !important;
          box-shadow: none !important;
          border-radius: 0 !important;
          padding: 0 !important;
        }
        .leaflet-popup-content {
          margin: 0 !important;
        }
        .leaflet-popup-tip {
          background: hsl(var(--card)) !important;
          border: 1px solid hsl(var(--border)) !important;
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
        }
        .leaflet-control-zoom a {
          background: hsl(var(--background)) !important;
          border: 1px solid hsl(var(--border)) !important;
          color: hsl(var(--foreground)) !important;
          border-radius: 8px !important;
          transition: all 0.2s ease !important;
        }
        .leaflet-control-zoom a:hover {
          background: hsl(var(--muted)) !important;
          transform: scale(1.05);
        }
        .leaflet-control-attribution {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default InteractiveMap;