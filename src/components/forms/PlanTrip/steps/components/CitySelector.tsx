
import React, { useMemo, useCallback } from 'react';

interface City {
  id: number;
  name: string;
}

interface CitySelectorProps {
  citiesList: City[];
  selectedCityNames: Set<string>;
  onCityToggle: (cityName: string) => void;
}

const CitySelector = React.memo<CitySelectorProps>(({ 
  citiesList, 
  selectedCityNames, 
  onCityToggle 
}) => {
  const handleCityClick = useCallback((cityName: string) => {
    onCityToggle(cityName);
  }, [onCityToggle]);

  return (
    <div className="space-y-3">
      <h6 className="text-lg font-semibold text-gray-800">Villes</h6>
      <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
        {citiesList.map((city) => {
          const isSelected = selectedCityNames.has(city.name);
          return (
            <button
              key={city.id}
              onClick={() => handleCityClick(city.name)}
              className={`p-2 border rounded text-sm text-center transition-colors ${
                isSelected
                  ? 'bg-green-50 border-green-500 text-green-700'
                  : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="font-medium">{city.name}</div>
              {isSelected && (
                <div className="text-xs text-green-600 mt-1">✓</div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
});

CitySelector.displayName = 'CitySelector';

export default CitySelector;
