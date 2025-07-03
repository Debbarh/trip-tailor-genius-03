import React, { useEffect, useRef, useState } from 'react';
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
const MapController: React.FC<{ center: [number, number] }> = ({ center }) => {
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
  const mapRef = useRef<any>(null);

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
        <div class="modern-poi-marker">
          <div class="marker-content">
            <span class="marker-emoji">${emoji}</span>
          </div>
          <div class="marker-pulse"></div>
        </div>
      `,
      className: 'custom-poi-marker',
      iconSize: [50, 50],
      iconAnchor: [25, 45],
      popupAnchor: [0, -45],
    });
  };

  // Icône moderne pour l'utilisateur
  const createUserIcon = () => {
    return L.divIcon({
      html: `
        <div class="user-location-marker">
          <div class="user-marker-inner">
            <div class="user-dot"></div>
          </div>
          <div class="user-pulse"></div>
        </div>
      `,
      className: 'custom-user-marker',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -15],
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
        ref={mapRef}
      >
        <MapController center={center} />
        
        {/* Tuiles de carte avec style moderne */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles"
        />

        {/* Marqueur utilisateur */}
        <Marker position={userLocation} icon={createUserIcon()}>
          <Popup closeButton={false} className="modern-popup">
            <div className="modern-popup-content">
              <div className="popup-header user-location">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-destructive rounded-full animate-pulse"></div>
                  <div>
                    <h4 className="font-bold text-white">Votre position</h4>
                    <p className="text-white/80 text-sm">Vous êtes ici</p>
                  </div>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>

        {/* Marqueurs POI */}
        {pois.map((poi) => (
          <Marker
            key={poi.id}
            position={[poi.latitude, poi.longitude]}
            icon={createModernPOIIcon(poi.category)}
            eventHandlers={{
              click: () => onPOIClick(poi),
            }}
          >
            <Popup closeButton={false} className="modern-popup" maxWidth={320}>
              <div className="modern-popup-content">
                {/* Header avec gradient */}
                <div className="popup-header">
                  <h3 className="popup-title">{poi.name}</h3>
                  <p className="popup-description">{poi.description}</p>
                </div>
                
                {/* Corps du contenu */}
                <div className="popup-body">
                  {/* Statistiques */}
                  <div className="stats-grid">
                    <div className="stat-item rating">
                      <span className="stat-icon">⭐</span>
                      <div className="stat-content">
                        <span className="stat-value">{poi.rating}</span>
                        <span className="stat-label">({poi.reviews.length})</span>
                      </div>
                    </div>
                    
                    <div className="stat-item budget">
                      <span className="stat-icon">💰</span>
                      <div className="stat-content">
                        <span className="stat-value">{poi.budget}</span>
                        <span className="stat-label">Budget</span>
                      </div>
                    </div>
                    
                    <div className="stat-item duration">
                      <span className="stat-icon">⏱️</span>
                      <div className="stat-content">
                        <span className="stat-value">{poi.duration}</span>
                        <span className="stat-label">Durée</span>
                      </div>
                    </div>
                    
                    <div className="stat-item distance">
                      <span className="stat-icon">📍</span>
                      <div className="stat-content">
                        <span className="stat-value">Proche</span>
                        <span className="stat-label">Distance</span>
                      </div>
                    </div>
                  </div>

                  {/* Bouton d'action */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPOIClick(poi);
                    }}
                    className="action-button"
                  >
                    <span>Voir les détails</span>
                    <span className="button-arrow">→</span>
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Styles CSS modernes */}
      <style>{`
        /* Marqueur POI moderne */
        .modern-poi-marker {
          position: relative;
          width: 50px;
          height: 50px;
        }
        
        .marker-content {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, hsl(var(--map-primary)), hsl(var(--map-secondary)));
          border: 3px solid white;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3), 0 4px 16px rgba(0, 0, 0, 0.1);
          z-index: 2;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .marker-emoji {
          font-size: 20px;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
        }
        
        .marker-pulse {
          position: absolute;
          top: 5px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 30px;
          background: hsl(var(--map-primary));
          border-radius: 50%;
          opacity: 0.3;
          animation: marker-pulse 2s infinite;
        }
        
        @keyframes marker-pulse {
          0% { transform: translateX(-50%) scale(1); opacity: 0.3; }
          50% { transform: translateX(-50%) scale(1.5); opacity: 0.1; }
          100% { transform: translateX(-50%) scale(2); opacity: 0; }
        }
        
        .modern-poi-marker:hover .marker-content {
          transform: translateX(-50%) translateY(-4px) scale(1.1);
          box-shadow: 0 12px 40px rgba(59, 130, 246, 0.4), 0 6px 20px rgba(0, 0, 0, 0.15);
        }
        
        /* Marqueur utilisateur */
        .user-location-marker {
          position: relative;
          width: 30px;
          height: 30px;
        }
        
        .user-marker-inner {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
          z-index: 2;
        }
        
        .user-dot {
          width: 12px;
          height: 12px;
          background: hsl(var(--destructive));
          border-radius: 50%;
        }
        
        .user-pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background: hsl(var(--destructive));
          border-radius: 50%;
          opacity: 0.3;
          animation: user-pulse 2s infinite;
        }
        
        @keyframes user-pulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
        }
        
        /* Popups modernes */
        .modern-popup .leaflet-popup-content-wrapper {
          background: transparent !important;
          padding: 0 !important;
          border-radius: 16px !important;
          box-shadow: none !important;
          border: none !important;
        }
        
        .modern-popup .leaflet-popup-content {
          margin: 0 !important;
          font-family: inherit !important;
        }
        
        .modern-popup .leaflet-popup-tip {
          background: hsl(var(--background)) !important;
          border: 1px solid hsl(var(--border)) !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1) !important;
        }
        
        .modern-popup-content {
          background: hsl(var(--background));
          border: 1px solid hsl(var(--border));
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          min-width: 280px;
        }
        
        .popup-header {
          background: linear-gradient(135deg, hsl(var(--map-primary)), hsl(var(--map-secondary)));
          color: white;
          padding: 16px;
        }
        
        .popup-header.user-location {
          background: linear-gradient(135deg, hsl(var(--destructive)), hsl(var(--destructive)) 80%);
        }
        
        .popup-title {
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 4px 0;
          line-height: 1.2;
        }
        
        .popup-description {
          font-size: 14px;
          margin: 0;
          opacity: 0.9;
          line-height: 1.4;
        }
        
        .popup-body {
          padding: 16px;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 16px;
        }
        
        .stat-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 8px;
          transition: all 0.2s ease;
        }
        
        .stat-item.rating { background: hsl(var(--map-warning) / 0.1); }
        .stat-item.budget { background: hsl(var(--map-accent) / 0.1); }
        .stat-item.duration { background: hsl(var(--map-secondary) / 0.1); }
        .stat-item.distance { background: hsl(var(--map-primary) / 0.1); }
        
        .stat-icon {
          font-size: 16px;
        }
        
        .stat-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        
        .stat-value {
          font-size: 12px;
          font-weight: 600;
          color: hsl(var(--foreground));
          text-transform: capitalize;
        }
        
        .stat-label {
          font-size: 10px;
          color: hsl(var(--muted-foreground));
        }
        
        .action-button {
          width: 100%;
          background: linear-gradient(135deg, hsl(var(--map-primary)), hsl(var(--map-secondary)));
          color: white;
          border: none;
          padding: 12px 16px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
        }
        
        .action-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
          background: linear-gradient(135deg, hsl(var(--map-secondary)), hsl(var(--map-primary)));
        }
        
        .action-button:active {
          transform: translateY(0);
        }
        
        .button-arrow {
          transition: transform 0.3s ease;
        }
        
        .action-button:hover .button-arrow {
          transform: translateX(4px);
        }
        
        /* Contrôles de zoom stylisés */
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
        
        /* Attribution cachée */
        .leaflet-control-attribution {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default InteractiveMap;