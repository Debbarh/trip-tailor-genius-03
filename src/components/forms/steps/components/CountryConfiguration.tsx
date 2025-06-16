
import React from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CityDateConfiguration from './CityDateConfiguration';

interface CountryConfigurationProps {
  activeCountry: any;
  removeCountry: (name: string) => void;
  addCity: (countryName: string, cityName: string) => void;
  removeCity: (countryName: string, cityName: string) => void;
  updateCityDates: (countryName: string, cityName: string, field: string, value: string) => void;
  isCountryComplete: (country: any) => boolean;
}

const CountryConfiguration = React.memo<CountryConfigurationProps>(({
  activeCountry,
  removeCountry,
  addCity,
  removeCity,
  updateCityDates,
  isCountryComplete
}) => {
  const [newCityName, setNewCityName] = React.useState('');

  if (!activeCountry) {
    return (
      <div className="bg-gray-50 rounded p-0.5 text-center">
        <h4 className="text-xs font-semibold text-gray-900 mb-0">Configuration des villes</h4>
        <p className="text-xs text-gray-500">Sélectionnez d'abord un pays pour configurer vos villes</p>
      </div>
    );
  }

  const handleAddCity = () => {
    if (newCityName.trim()) {
      addCity(activeCountry.countryName, newCityName.trim());
      setNewCityName('');
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded p-0.5 max-h-72 overflow-y-auto">
      <div className="flex items-center justify-between mb-0.5">
        <h4 className="text-xs font-semibold text-gray-900">
          {activeCountry.countryName}
        </h4>
        <Button
          onClick={() => removeCountry(activeCountry.countryName)}
          variant="outline"
          size="sm"
          className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400 h-3 px-0.5 text-xs py-0"
        >
          <X className="w-1.5 h-1.5 mr-0" />
          Supprimer
        </Button>
      </div>

      <div className="space-y-0.5 mb-0.5">
        <h5 className="text-xs font-medium text-gray-700">Villes visitées</h5>
        
        <div className="flex gap-0.5">
          <input
            type="text"
            value={newCityName}
            onChange={(e) => setNewCityName(e.target.value)}
            placeholder="Nom de la ville"
            className="flex-1 px-0.5 py-0 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleAddCity()}
          />
          <Button
            onClick={handleAddCity}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white px-0.5 py-0 h-4"
          >
            <Plus className="w-1.5 h-1.5" />
          </Button>
        </div>
      </div>

      {activeCountry.cities.length > 0 && (
        <div className="space-y-0.5">
          {activeCountry.cities.map((city: any, index: number) => (
            <CityDateConfiguration
              key={`${city.cityName}-${index}`}
              city={city}
              countryName={activeCountry.countryName}
              removeCity={removeCity}
              updateCityDates={updateCityDates}
            />
          ))}
        </div>
      )}

      {isCountryComplete(activeCountry) && (
        <div className="mt-0.5 p-0 bg-green-50 border border-green-200 rounded text-center">
          <span className="text-green-700 text-xs font-medium">✓ Configuration complète</span>
        </div>
      )}
    </div>
  );
});

CountryConfiguration.displayName = 'CountryConfiguration';

export default CountryConfiguration;
