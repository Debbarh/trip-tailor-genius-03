import React from 'react';
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
  return (
    <div className="h-full w-full bg-gradient-to-br from-background to-muted rounded-xl border border-border">
      {/* Header de la carte */}
      <div className="p-4 border-b border-border bg-gradient-to-r from-primary/5 to-primary/10">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          🗺️ Carte interactive des expériences
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Position actuelle: {userLocation[0].toFixed(4)}°N, {userLocation[1].toFixed(4)}°E
        </p>
      </div>

      <div className="p-4 h-full overflow-auto">
        {/* Position utilisateur */}
        <div className="mb-6 bg-gradient-to-r from-destructive/10 to-destructive/5 border border-destructive/20 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-destructive rounded-full animate-pulse"></div>
            <div>
              <p className="font-semibold text-foreground">📍 Votre position actuelle</p>
              <p className="text-sm text-muted-foreground">
                Coordonnées: {userLocation[0].toFixed(4)}°N, {userLocation[1].toFixed(4)}°E
              </p>
            </div>
          </div>
        </div>

        {/* Liste des POIs avec disposition en grille */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground flex items-center gap-2">
            🎯 Points d'intérêt à proximité ({pois.length})
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pois.map((poi) => {
              const categoryData = activityCategories.find(cat => cat.id === poi.category);
              const distance = Math.round(Math.random() * 10 + 1); // Distance simulée
              
              return (
                <div 
                  key={poi.id}
                  className="bg-card border border-border rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
                  onClick={() => onPOIClick(poi)}
                >
                  {/* Header avec icône et distance */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        {categoryData?.emoji || '📍'}
                      </div>
                      <div>
                        <h5 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {poi.name}
                        </h5>
                        <p className="text-xs text-muted-foreground">
                          📍 {distance}km • {poi.category}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {poi.description}
                  </p>

                  {/* Stats en grille */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-map-warning/10 px-2 py-1 rounded-md text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-map-warning">⭐</span>
                        <span className="text-xs font-medium">{poi.rating}</span>
                      </div>
                    </div>
                    <div className="bg-map-accent/10 px-2 py-1 rounded-md text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-map-accent">💰</span>
                        <span className="text-xs font-medium capitalize">{poi.budget}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-map-secondary/10 px-2 py-1 rounded-md text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-map-secondary">⏱️</span>
                        <span className="text-xs font-medium capitalize">{poi.duration}</span>
                      </div>
                    </div>
                    <div className="bg-map-primary/10 px-2 py-1 rounded-md text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-map-primary">👥</span>
                        <span className="text-xs font-medium">{poi.reviews.length} avis</span>
                      </div>
                    </div>
                  </div>

                  {/* Bouton d'action */}
                  <button className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-2 px-3 rounded-lg text-sm font-medium hover:from-primary/90 hover:to-primary transition-all duration-200 group-hover:shadow-lg">
                    Voir les détails →
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Message informatif */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground text-center">
            💡 Cliquez sur une expérience pour voir plus de détails et l'ajouter à votre voyage
          </p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;