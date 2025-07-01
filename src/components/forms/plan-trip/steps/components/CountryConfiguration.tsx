
import React from 'react';
import { X, Plus, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CountryConfigurationProps {
  activeCountry: any;
  removeCountry: (countryCode: string) => void;
  addCity: (countryCode: string, cityName: string) => void;
  removeCity: (countryCode: string, cityName: string) => void;
  updateCityDates: (countryCode: string, cityName: string, dates: any) => void;
  isCountryComplete: (country: any) => boolean;
}

const CountryConfiguration = ({
  activeCountry,
  removeCountry,
  addCity,
  removeCity,
  updateCityDates,
  isCountryComplete
}: CountryConfigurationProps) => {
  if (!activeCountry) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center text-gray-500">
          <div className="text-6xl mb-4">🗺️</div>
          <h3 className="text-xl font-semibold mb-2">Sélectionnez un pays</h3>
          <p>Choisissez un pays dans la liste pour configurer votre séjour</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{activeCountry.flagCode}</span>
          <h3 className="text-2xl font-bold text-gray-900">{activeCountry.name}</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => removeCountry(activeCountry.code)}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <X className="w-4 h-4 mr-1" />
          Retirer
        </Button>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-800">Villes à visiter</h4>
        
        {activeCountry.cities?.map((city: any) => (
          <div key={city.name} className="p-4 bg-gray-50 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-semibold text-gray-800">{city.name}</h5>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeCity(activeCountry.code, city.name)}
                className="text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">
                  Date d'arrivée
                </label>
                <Input
                  type="date"
                  value={city.dates?.arrival || ''}
                  onChange={(e) => updateCityDates(activeCountry.code, city.name, {
                    ...city.dates,
                    arrival: e.target.value
                  })}
                  className="border-gray-200"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">
                  Date de départ
                </label>
                <Input
                  type="date"
                  value={city.dates?.departure || ''}
                  onChange={(e) => updateCityDates(activeCountry.code, city.name, {
                    ...city.dates,
                    departure: e.target.value
                  })}
                  className="border-gray-200"
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          onClick={() => {
            const cityName = prompt('Nom de la ville à ajouter :');
            if (cityName) {
              addCity(activeCountry.code, cityName);
            }
          }}
          className="w-full border-dashed border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50 text-gray-600 hover:text-purple-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une ville
        </Button>
      </div>

      <div className={`p-4 rounded-2xl ${
        isCountryComplete(activeCountry) 
          ? 'bg-green-50 border-2 border-green-200' 
          : 'bg-yellow-50 border-2 border-yellow-200'
      }`}>
        <div className="flex items-center space-x-2">
          <Calendar className={`w-5 h-5 ${
            isCountryComplete(activeCountry) ? 'text-green-600' : 'text-yellow-600'
          }`} />
          <span className={`font-medium ${
            isCountryComplete(activeCountry) ? 'text-green-800' : 'text-yellow-800'
          }`}>
            {isCountryComplete(activeCountry) 
              ? 'Configuration complète ✓' 
              : 'Veuillez ajouter des villes et des dates'
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default CountryConfiguration;
