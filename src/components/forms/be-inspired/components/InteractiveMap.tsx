import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { POI } from '@/types/beInspired';
import { activityCategories } from '@/constants/beInspiredData';
import { MapPin, Navigation, Zap, Star, Clock, Euro, Users } from 'lucide-react';

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

  // Couleurs par catégorie
  const getCategoryColors = (category: string) => {
    const colors = {
      'culture-history': { bg: 'linear-gradient(135deg, #8B5CF6, #A855F7)', border: '#8B5CF6' },
      'adventure-sport': { bg: 'linear-gradient(135deg, #F59E0B, #F97316)', border: '#F59E0B' },
      'relaxation-wellness': { bg: 'linear-gradient(135deg, #10B981, #059669)', border: '#10B981' },
      'gastronomy-flavors': { bg: 'linear-gradient(135deg, #EF4444, #DC2626)', border: '#EF4444' },
      'nightlife-entertainment': { bg: 'linear-gradient(135deg, #EC4899, #BE185D)', border: '#EC4899' },
      'nature-landscapes': { bg: 'linear-gradient(135deg, #22C55E, #16A34A)', border: '#22C55E' },
      'shopping-crafts': { bg: 'linear-gradient(135deg, #3B82F6, #2563EB)', border: '#3B82F6' },
    };
    return colors[category as keyof typeof colors] || colors['culture-history'];
  };

  // Créer des icônes modernes avec couleurs par catégorie
  const createModernPOIIcon = (category: string) => {
    const categoryData = activityCategories.find(cat => cat.id === category);
    const emoji = categoryData?.emoji || '📍';
    const colors = getCategoryColors(category);
    
    return L.divIcon({
      html: `
        <div class="poi-marker-modern" style="position: relative;">
          <div class="poi-marker-content" style="
            position: relative;
            width: 48px;
            height: 48px;
            background: ${colors.bg};
            border: 3px solid white;
            border-radius: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15), 0 4px 20px ${colors.border}30;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 2;
          ">
            <span style="
              filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
              transform: scale(1.1);
            ">${emoji}</span>
          </div>
          <div class="poi-marker-pulse" style="
            position: absolute;
            top: 6px;
            left: 6px;
            width: 36px;
            height: 36px;
            background: ${colors.border};
            border-radius: 50%;
            opacity: 0.4;
            animation: poi-pulse 3s infinite;
          "></div>
          <div class="poi-marker-ring" style="
            position: absolute;
            top: 12px;
            left: 12px;
            width: 24px;
            height: 24px;
            border: 2px solid ${colors.border};
            border-radius: 50%;
            opacity: 0.6;
            animation: poi-ring 2s infinite;
          "></div>
        </div>
        <style>
          @keyframes poi-pulse {
            0%, 100% { 
              transform: scale(1); 
              opacity: 0.4; 
            }
            50% { 
              transform: scale(1.5); 
              opacity: 0.1; 
            }
          }
          @keyframes poi-ring {
            0% { 
              transform: scale(1); 
              opacity: 0.6; 
            }
            100% { 
              transform: scale(2); 
              opacity: 0; 
            }
          }
        </style>
      `,
      className: 'custom-poi-marker-enhanced',
      iconSize: [48, 48],
      iconAnchor: [24, 24],
      popupAnchor: [0, -24],
    });
  };

  // Icône ultra-moderne pour l'utilisateur
  const createUserIcon = () => {
    return L.divIcon({
      html: `
        <div class="user-marker-modern" style="position: relative;">
          <div style="
            position: relative;
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #EF4444, #DC2626);
            border: 4px solid white;
            border-radius: 50%;
            box-shadow: 0 8px 32px rgba(239, 68, 68, 0.4), 0 4px 16px rgba(0, 0, 0, 0.15);
            z-index: 3;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              width: 12px;
              height: 12px;
              background: white;
              border-radius: 50%;
              box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            "></div>
          </div>
          <div style="
            position: absolute;
            top: 4px;
            left: 4px;
            width: 24px;
            height: 24px;
            background: #EF4444;
            border-radius: 50%;
            opacity: 0.4;
            animation: user-wave 2s infinite;
          "></div>
          <div style="
            position: absolute;
            top: 8px;
            left: 8px;
            width: 16px;
            height: 16px;
            background: #EF4444;
            border-radius: 50%;
            opacity: 0.3;
            animation: user-wave 2s infinite 0.5s;
          "></div>
        </div>
        <style>
          @keyframes user-wave {
            0%, 100% { 
              transform: scale(1); 
              opacity: 0.4; 
            }
            50% { 
              transform: scale(3); 
              opacity: 0; 
            }
          }
        </style>
      `,
      className: 'user-location-marker-enhanced',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });
  };

  if (!mapReady) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-3xl flex items-center justify-center border border-border/30 backdrop-blur-sm">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-primary/20 border-t-primary mx-auto"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 animate-pulse"></div>
            <MapPin className="absolute inset-0 m-auto w-8 h-8 text-primary animate-bounce" />
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-foreground">Chargement de la carte interactive</h3>
            <p className="text-muted-foreground">Préparation de vos expériences personnalisées...</p>
            <div className="flex justify-center items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative rounded-3xl overflow-hidden border border-border/30 shadow-2xl bg-gradient-to-br from-background to-muted/20">
      {/* Overlay artistique */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent via-50% to-secondary/5 pointer-events-none z-[1000] rounded-3xl" />
      
      {/* Header moderne flottant */}
      <div className="absolute top-6 left-6 z-[1000] bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl px-6 py-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Navigation className="w-5 h-5 text-primary" />
            <div className="absolute -inset-1 bg-primary/20 rounded-full animate-ping"></div>
          </div>
          <div>
            <span className="font-bold text-foreground">Carte Interactive</span>
            <div className="flex items-center gap-1 mt-1">
              <Zap className="w-3 h-3 text-secondary" />
              <span className="text-xs text-muted-foreground">Temps réel</span>
            </div>
          </div>
        </div>
      </div>

      {/* Compteur stylisé */}
      <div className="absolute top-6 right-6 z-[1000] bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl px-6 py-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-3 h-3 bg-primary/30 rounded-full animate-ping"></div>
          </div>
          <div>
            <span className="font-bold text-lg text-foreground">{pois.length}</span>
            <p className="text-xs text-muted-foreground">expériences uniques</p>
          </div>
        </div>
      </div>

      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={true}
        className="h-full w-full rounded-3xl"
        style={{ height: '100%', width: '100%', borderRadius: '24px' }}
      >
        <MapController center={center} />
        
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          opacity={0.9}
        />

        <Marker position={userLocation} icon={createUserIcon()}>
          <Popup closeButton={false} offset={[0, -10]}>
            <div className="bg-gradient-to-br from-background to-muted border border-border/50 rounded-2xl shadow-2xl p-4 min-w-[200px]">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-4 h-4 bg-destructive rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-destructive/30 rounded-full animate-ping"></div>
                </div>
                <div>
                  <h4 className="font-bold text-foreground flex items-center gap-2">
                    📍 Votre position actuelle
                  </h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    Nous sommes ici, prêts à explorer !
                  </p>
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
            <Popup closeButton={false} maxWidth={350} offset={[0, -10]}>
              <div className="bg-gradient-to-br from-background to-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden min-w-[320px]">
                {/* Header avec gradient dynamique */}
                <div 
                  className="p-6 text-white relative overflow-hidden"
                  style={{ 
                    background: getCategoryColors(poi.category).bg,
                  }}
                >
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-xl leading-tight">{poi.name}</h3>
                      <span className="text-3xl ml-2">
                        {activityCategories.find(cat => cat.id === poi.category)?.emoji}
                      </span>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed">{poi.description}</p>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute -top-2 -left-2 w-12 h-12 bg-white/10 rounded-full"></div>
                </div>
                
                {/* Corps avec informations structurées */}
                <div className="p-6 space-y-4">
                  {/* Statistiques en grille moderne */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-3 rounded-xl border border-yellow-200/50">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-600" fill="currentColor" />
                        <div>
                          <div className="font-bold text-sm text-foreground">{poi.rating}</div>
                          <div className="text-xs text-muted-foreground">({poi.reviews.length} avis)</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-3 rounded-xl border border-green-200/50">
                      <div className="flex items-center gap-2">
                        <Euro className="w-4 h-4 text-green-600" />
                        <div>
                          <div className="font-bold text-sm text-foreground capitalize">{poi.budget}</div>
                          <div className="text-xs text-muted-foreground">Budget</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-3 rounded-xl border border-blue-200/50">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <div>
                          <div className="font-bold text-sm text-foreground capitalize">{poi.duration}</div>
                          <div className="text-xs text-muted-foreground">Durée</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-3 rounded-xl border border-purple-200/50">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-600" />
                        <div>
                          <div className="font-bold text-sm text-foreground">{poi.reviews.length}</div>
                          <div className="text-xs text-muted-foreground">Visiteurs</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bouton d'action premium */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPOIClick(poi);
                    }}
                    className="w-full bg-gradient-to-r from-primary via-primary to-secondary text-white py-4 px-6 rounded-xl font-bold text-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Découvrir cette expérience
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </span>
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Styles CSS avancés */}
      <style>{`
        .custom-poi-marker-enhanced:hover .poi-marker-content {
          transform: translateY(-4px) scale(1.15) !important;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25), 0 8px 30px rgba(59, 130, 246, 0.4) !important;
        }
        
        .leaflet-popup-content-wrapper {
          background: transparent !important;
          padding: 0 !important;
          border-radius: 16px !important;
          box-shadow: none !important;
          border: none !important;
        }
        
        .leaflet-popup-content {
          margin: 0 !important;
          font-family: inherit !important;
        }
        
        .leaflet-popup-tip {
          background: hsl(var(--background)) !important;
          border: 1px solid hsl(var(--border)) !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15) !important;
        }
        
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15) !important;
          border-radius: 16px !important;
          overflow: hidden;
        }
        
        .leaflet-control-zoom a {
          background: hsl(var(--background))/95 !important;
          backdrop-filter: blur(12px) !important;
          border: 1px solid hsl(var(--border))/50 !important;
          color: hsl(var(--foreground)) !important;
          border-radius: 0 !important;
          transition: all 0.3s ease !important;
          font-weight: bold !important;
        }
        
        .leaflet-control-zoom a:hover {
          background: hsl(var(--primary)) !important;
          color: white !important;
          transform: scale(1.05);
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3) !important;
        }
        
        .leaflet-control-zoom a:first-child {
          border-top-left-radius: 16px !important;
          border-top-right-radius: 16px !important;
        }
        
        .leaflet-control-zoom a:last-child {
          border-bottom-left-radius: 16px !important;
          border-bottom-right-radius: 16px !important;
        }
        
        .leaflet-control-attribution {
          display: none !important;
        }
        
        .leaflet-popup {
          margin-bottom: 20px !important;
        }
      `}</style>
    </div>
  );
};

export default InteractiveMap;