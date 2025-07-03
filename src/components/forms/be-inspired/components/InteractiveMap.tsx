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

  // Créer des icônes personnalisées pour chaque catégorie
  const createCategoryIcon = (category: string) => {
    const categoryData = activityCategories.find(cat => cat.id === category);
    const emoji = categoryData?.emoji || '📍';
    
    return L.divIcon({
      html: `<div style="
        background: white;
        border: 2px solid #3b82f6;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        cursor: pointer;
      ">${emoji}</div>`,
      className: 'custom-poi-icon',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });
  };

  // Icône pour la position utilisateur
  const userIcon = L.divIcon({
    html: `<div style="
      background: #ef4444;
      border: 3px solid white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    className: 'user-location-icon',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
  });

  if (!isMapReady) {
    return (
      <div className="h-full w-full bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de la carte...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg z-0"
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <MapController center={center} />
        
        {/* Couche de tuiles OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {/* Marqueur de position utilisateur */}
        <Marker position={userLocation} icon={userIcon}>
          <Popup>
            <div className="text-center p-2">
              <strong className="text-red-600">📍 Votre position</strong>
              <br />
              <span className="text-sm text-gray-600">Vous êtes ici</span>
            </div>
          </Popup>
        </Marker>

        {/* Marqueurs des POIs */}
        {pois.map((poi) => (
          <Marker
            key={poi.id}
            position={[poi.latitude, poi.longitude]}
            icon={createCategoryIcon(poi.category)}
            eventHandlers={{
              click: () => onPOIClick(poi),
            }}
          >
            <Popup maxWidth={250} minWidth={200}>
              <div className="p-2">
                <h3 className="font-bold text-lg mb-2 text-gray-800">{poi.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{poi.description}</p>
                
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-semibold text-sm">{poi.rating}</span>
                    <span className="text-xs text-gray-500">({poi.reviews.length})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-green-600 text-sm">💰</span>
                    <span className="text-xs capitalize text-gray-600">{poi.budget}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1">
                    <span className="text-blue-600 text-sm">⏱️</span>
                    <span className="text-xs capitalize text-gray-600">{poi.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-purple-600 text-sm">📍</span>
                    <span className="text-xs text-gray-600">Proche</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPOIClick(poi);
                  }}
                  className="w-full bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Voir les détails
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;