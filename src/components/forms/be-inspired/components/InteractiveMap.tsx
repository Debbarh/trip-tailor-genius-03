import { POI } from '@/types/beInspired';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Star } from 'lucide-react';

interface InteractiveMapProps {
  center: [number, number];
  pois: POI[];
  onPOIClick: (poi: POI) => void;
  userLocation: [number, number];
}

const InteractiveMap = ({ center, pois, onPOIClick, userLocation }: InteractiveMapProps) => {
  return (
    <div className="h-full w-full">
      {/* Placeholder pour la carte - nécessite configuration react-leaflet */}
      <div className="h-full bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex flex-col items-center justify-center p-6">
        <MapPin className="w-16 h-16 text-blue-600 mb-4" />
        <h3 className="text-xl font-bold text-gray-800 mb-2">Carte Interactive</h3>
        <p className="text-gray-600 text-center mb-6">
          La carte OpenStreetMap sera affichée ici avec {pois.length} points d'intérêt
        </p>
        
        {/* Liste temporaire des POIs */}
        <div className="w-full max-w-md space-y-3 max-h-60 overflow-y-auto">
          {pois.map((poi) => (
            <Card key={poi.id} className="p-3 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onPOIClick(poi)}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{poi.name}</h4>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Star className="w-3 h-3 text-yellow-500" />
                    {poi.rating}
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Voir
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
