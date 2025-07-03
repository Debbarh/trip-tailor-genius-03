import React, { useEffect, useRef, useState } from 'react';
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

const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
  center, 
  pois, 
  onPOIClick, 
  userLocation 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    fixLeafletIcons();

    // Créer la carte
    const map = L.map(mapRef.current, {
      center: center,
      zoom: 13,
      scrollWheelZoom: true,
      zoomControl: true,
    });

    // Ajouter la couche de tuiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Créer l'icône utilisateur
    const userIcon = L.divIcon({
      html: `<div style="
        background: linear-gradient(135deg, #ef4444, #dc2626);
        border: 3px solid white;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        animation: pulse 2s infinite;
      "></div>
      <style>
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      </style>`,
      className: 'user-location-icon',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    // Ajouter le marqueur utilisateur
    L.marker(userLocation, { icon: userIcon })
      .addTo(map)
      .bindPopup('<div style="padding: 8px; text-align: center;"><strong>📍 Votre position</strong><br><small>Vous êtes ici</small></div>');

    // Fonction pour créer les icônes de POI
    const createPOIIcon = (category: string) => {
      const categoryData = activityCategories.find(cat => cat.id === category);
      const emoji = categoryData?.emoji || '📍';
      
      return L.divIcon({
        html: `<div style="
          background: linear-gradient(135deg, hsl(217.2, 91.2%, 59.8%), hsl(221.2, 83.2%, 53.3%));
          border: 2px solid white;
          border-radius: 16px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
          cursor: pointer;
          transition: transform 0.2s ease;
        ">
          ${emoji}
        </div>`,
        className: 'poi-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });
    };

    // Ajouter les marqueurs POI
    pois.forEach((poi) => {
      const marker = L.marker([poi.latitude, poi.longitude], { 
        icon: createPOIIcon(poi.category) 
      });

      // Créer le contenu du popup
      const popupContent = `
        <div style="max-width: 250px; font-family: system-ui;">
          <div style="background: linear-gradient(135deg, hsl(217.2, 91.2%, 59.8%), hsl(221.2, 83.2%, 53.3%)); color: white; padding: 12px; margin: -9px -13px 12px -13px; border-radius: 8px 8px 0 0;">
            <h3 style="margin: 0 0 4px 0; font-size: 16px; font-weight: bold;">${poi.name}</h3>
            <p style="margin: 0; font-size: 12px; opacity: 0.9;">${poi.description}</p>
          </div>
          
          <div style="display: flex; gap: 8px; margin-bottom: 12px;">
            <div style="background: #fef3c7; padding: 6px 8px; border-radius: 6px; font-size: 12px;">
              ⭐ ${poi.rating} (${poi.reviews.length})
            </div>
            <div style="background: #d1fae5; padding: 6px 8px; border-radius: 6px; font-size: 12px;">
              💰 ${poi.budget}
            </div>
          </div>
          
          <div style="display: flex; gap: 8px; margin-bottom: 12px;">
            <div style="background: #dbeafe; padding: 6px 8px; border-radius: 6px; font-size: 12px;">
              ⏱️ ${poi.duration}
            </div>
            <div style="background: #ede9fe; padding: 6px 8px; border-radius: 6px; font-size: 12px;">
              📍 Proche
            </div>
          </div>
          
          <button 
            onclick="window.handlePOIClick('${poi.id}')"
            style="
              width: 100%; 
              background: linear-gradient(135deg, hsl(217.2, 91.2%, 59.8%), hsl(221.2, 83.2%, 53.3%)); 
              color: white; 
              border: none; 
              padding: 10px; 
              border-radius: 8px; 
              font-weight: 600; 
              cursor: pointer;
              transition: transform 0.2s ease;
            "
            onmouseover="this.style.transform='scale(1.02)'"
            onmouseout="this.style.transform='scale(1)'"
          >
            Voir les détails
          </button>
        </div>
      `;

      marker.bindPopup(popupContent, { 
        maxWidth: 280,
        closeButton: false 
      });
      
      marker.on('click', () => onPOIClick(poi));
      marker.addTo(map);
    });

    // Ajouter gestionnaire global pour les clics POI
    (window as any).handlePOIClick = (poiId: string) => {
      const poi = pois.find(p => p.id === poiId);
      if (poi) onPOIClick(poi);
    };

    mapInstanceRef.current = map;
    setIsMapReady(true);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      delete (window as any).handlePOIClick;
    };
  }, [center, pois, onPOIClick, userLocation]);

  // Mettre à jour le centre de la carte
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(center, mapInstanceRef.current.getZoom());
    }
  }, [center]);

  if (!isMapReady) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-background to-muted rounded-xl flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground font-medium">Chargement de la carte...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative overflow-hidden rounded-xl border border-border shadow-lg">
      <div ref={mapRef} className="w-full h-full rounded-xl" />
      
      {/* Style CSS pour améliorer l'apparence */}
      <style>{`
        .poi-marker:hover {
          transform: translateY(-2px) scale(1.1) !important;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 12px !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
        }
        .leaflet-popup-tip {
          background: white !important;
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
        }
        .leaflet-control-zoom a {
          border-radius: 8px !important;
          border: 1px solid hsl(var(--border)) !important;
          background: hsl(var(--background)) !important;
          color: hsl(var(--foreground)) !important;
        }
        .leaflet-control-zoom a:hover {
          background: hsl(var(--muted)) !important;
        }
      `}</style>
    </div>
  );
};

export default InteractiveMap;