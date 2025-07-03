import React, { useEffect, useRef, useState } from 'react';
import { POI } from '@/types/beInspired';
import { activityCategories } from '@/constants/beInspiredData';

interface InteractiveMapProps {
  center: [number, number];
  pois: POI[];
  onPOIClick: (poi: POI) => void;
  userLocation: [number, number];
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
  center, 
  pois, 
  onPOIClick, 
  userLocation 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [mapInstance, setMapInstance] = useState<any>(null);

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;

      try {
        // Import dynamique de Leaflet
        const L = await import('leaflet');
        await import('leaflet/dist/leaflet.css');

        // Fix des icônes
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        // Créer la carte
        const map = L.map(mapRef.current, {
          center: center,
          zoom: 13,
          scrollWheelZoom: true,
        });

        // Ajouter les tuiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Marqueur utilisateur simple
        const userMarker = L.marker(userLocation).addTo(map);
        userMarker.bindPopup('📍 Votre position');

        // Ajouter les POIs
        pois.forEach((poi) => {
          const marker = L.marker([poi.latitude, poi.longitude]).addTo(map);
          marker.bindPopup(`
            <div>
              <h3>${poi.name}</h3>
              <p>${poi.description}</p>
              <button onclick="window.selectPOI('${poi.id}')">Voir détails</button>
            </div>
          `);
        });

        // Gestionnaire global
        (window as any).selectPOI = (poiId: string) => {
          const poi = pois.find(p => p.id === poiId);
          if (poi) onPOIClick(poi);
        };

        setMapInstance(map);
        setIsMapReady(true);
      } catch (error) {
        console.error('Erreur lors du chargement de la carte:', error);
        setIsMapReady(true); // Afficher quand même le fallback
      }
    };

    initMap();

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
      delete (window as any).selectPOI;
    };
  }, [center, pois, onPOIClick, userLocation]);

  return (
    <div className="h-full w-full relative rounded-xl border border-border bg-background">
      {!isMapReady ? (
        <div className="h-full w-full flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto mb-4"></div>
            <p className="text-muted-foreground text-sm">Chargement de la carte...</p>
          </div>
        </div>
      ) : mapInstance ? (
        <div ref={mapRef} className="w-full h-full rounded-xl" />
      ) : (
        // Fallback si Leaflet ne se charge pas
        <div className="h-full w-full bg-muted rounded-xl flex flex-col items-center justify-center p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Carte non disponible</h3>
            <p className="text-muted-foreground">Voici les points d'intérêt à proximité :</p>
          </div>
          
          <div className="w-full max-w-md space-y-3 max-h-96 overflow-y-auto">
            {/* Position utilisateur */}
            <div className="bg-background border border-border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                <div>
                  <p className="font-medium text-foreground">Votre position</p>
                  <p className="text-sm text-muted-foreground">
                    {userLocation[0].toFixed(4)}°N, {userLocation[1].toFixed(4)}°E
                  </p>
                </div>
              </div>
            </div>

            {/* Liste des POIs */}
            {pois.map((poi) => {
              const categoryData = activityCategories.find(cat => cat.id === poi.category);
              return (
                <div 
                  key={poi.id}
                  className="bg-background border border-border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => onPOIClick(poi)}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{categoryData?.emoji || '📍'}</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-1">{poi.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{poi.description}</p>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="flex items-center gap-1">
                          ⭐ {poi.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          💰 {poi.budget}
                        </span>
                        <span className="flex items-center gap-1">
                          ⏱️ {poi.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;