import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Filter, X } from 'lucide-react';
import InteractiveMap from './components/InteractiveMap';
import FilterPanel from './components/FilterPanel';
import POIDetailModal from './components/POIDetailModal';
import { FilterOptions, POI } from '@/types/beInspired';
import { samplePOIs } from '@/constants/beInspiredData';

interface BeInspiredMainProps {
  onBack?: () => void;
}

const BeInspiredMain = ({ onBack }: BeInspiredMainProps) => {
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number]>([48.8566, 2.3522]); // Paris par défaut
  const [filters, setFilters] = useState<FilterOptions>({
    activities: [],
    travelerSegment: {
      type: 'solo'
    },
    budget: null,
    duration: null,
    proximity: 50, // 50km par défaut
    accommodationType: []
  });
  const [filteredPOIs, setFilteredPOIs] = useState<POI[]>(samplePOIs);

  // Utiliser des coordonnées par défaut (Paris)
  useEffect(() => {
    // Essayer la géolocalisation rapidement, sinon utiliser Paris
    if (navigator.geolocation) {
      const timeoutId = setTimeout(() => {
        console.log('Géolocalisation timeout - utilisation de Paris par défaut');
      }, 2000);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(timeoutId);
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          clearTimeout(timeoutId);
          console.log('Géolocalisation refusée - utilisation de Paris par défaut:', error);
        },
        { timeout: 2000 }
      );
    }
  }, []);

  // Filtrer les POIs en fonction des critères
  useEffect(() => {
    let filtered = samplePOIs;

    // Filtrer par activités
    if (filters.activities.length > 0) {
      filtered = filtered.filter(poi => 
        filters.activities.includes(poi.category)
      );
    }

    // Filtrer par budget
    if (filters.budget) {
      filtered = filtered.filter(poi => poi.budget === filters.budget);
    }

    // Filtrer par durée
    if (filters.duration) {
      filtered = filtered.filter(poi => poi.duration === filters.duration);
    }

    // Filtrer par segment de voyageur
    if (filters.travelerSegment.type) {
      filtered = filtered.filter(poi => 
        poi.travelerSegment.includes(filters.travelerSegment.type)
      );
    }

    // Filtrer par type d'hébergement
    if (filters.accommodationType.length > 0) {
      filtered = filtered.filter(poi => 
        poi.accommodationType && 
        poi.accommodationType.some(type => filters.accommodationType.includes(type))
      );
    }

    setFilteredPOIs(filtered);
  }, [filters]);

  const handlePOIClick = (poi: POI) => {
    setSelectedPOI(poi);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button 
                variant="outline" 
                onClick={onBack}
                className="flex items-center gap-2"
              >
                ← Retour
              </Button>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="w-8 h-8 text-blue-600" />
                Be Inspired
              </h1>
              <p className="text-gray-600 mt-1">
                Découvrez des expériences uniques près de vous
              </p>
            </div>
          </div>

          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant={showFilters ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            {showFilters ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
            {showFilters ? 'Fermer' : 'Filtres'}
          </Button>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4">
            <div className="text-2xl font-bold text-blue-600">{filteredPOIs.length}</div>
            <div className="text-sm text-gray-600">Expériences trouvées</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {Math.round(userLocation[0] * 1000) / 1000}°N
            </div>
            <div className="text-sm text-gray-600">Votre position</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-purple-600">{filters.proximity}km</div>
            <div className="text-sm text-gray-600">Rayon de recherche</div>
          </Card>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Panel de filtres */}
          {showFilters && (
            <div className="lg:col-span-1">
              <FilterPanel 
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          )}

          {/* Carte */}
          <div className={`${showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
            <Card className="h-[600px] overflow-hidden">
              <InteractiveMap
                center={userLocation}
                pois={filteredPOIs}
                onPOIClick={handlePOIClick}
                userLocation={userLocation}
              />
            </Card>
          </div>
        </div>

        {/* Modal de détail POI */}
        {selectedPOI && (
          <POIDetailModal
            poi={selectedPOI}
            onClose={() => setSelectedPOI(null)}
            onSave={(poi) => {
              console.log('POI sauvegardé:', poi);
              // Ici on pourrait ajouter la logique pour sauvegarder
            }}
            onAddToTrip={(poi) => {
              console.log('POI ajouté au voyage:', poi);
              // Ici on pourrait rediriger vers Plan Your Trip
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BeInspiredMain;