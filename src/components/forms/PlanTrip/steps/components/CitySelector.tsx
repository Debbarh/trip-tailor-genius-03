
import React, { useMemo, useCallback } from 'react';
import { Camera } from 'lucide-react';

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
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
          <Camera className="w-4 h-4 text-white" />
        </div>
        <h6 className="text-xl font-bold text-gray-800">Sélectionnez vos villes</h6>
      </div>
      <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
        {citiesList.map((city) => {
          const isSelected = selectedCityNames.has(city.name);
          return (
            <button
              key={city.id}
              onClick={() => handleCityClick(city.name)}
              className={`p-4 border-2 rounded-2xl text-sm text-center transition-all duration-300 transform hover:scale-105 ${
                isSelected
                  ? 'bg-gradient-to-br from-green-500 to-teal-600 border-transparent text-white shadow-xl'
                  : 'border-gray-200 hover:border-green-300 bg-white hover:shadow-lg'
              }`}
            >
              <Camera className="w-4 h-4 mx-auto mb-2 opacity-75" />
              <div className="font-semibold">{city.name}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
});

CitySelector.displayName = 'CitySelector';

export default CitySelector;
