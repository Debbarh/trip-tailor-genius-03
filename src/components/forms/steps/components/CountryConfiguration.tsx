
import React from 'react';
import { Camera, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { countriesData } from '@/data/countries';
import CityDateConfiguration from './CityDateConfiguration';

interface Country {
  countryName: string;
  cities: Array<{
    cityName: string;
    startDate: string;
    endDate: string;
  }>;
}

interface CountryConfigurationProps {
  activeCountry: Country | undefined;
  removeCountry: (name: string) => void;
  addCity: (countryName: string, cityName: string) => void;
  removeCity: (countryName: string, cityName: string) => void;
  updateCityDates: (countryName: string, cityName: string, field: string, value: string) => void;
  isCountryComplete: (country: Country) => boolean;
}

const CountryConfiguration = React.memo<CountryConfigurationProps>(({
  activeCountry,
  removeCountry,
  addCity,
  removeCity,
  updateCityDates,
  isCountryComplete
}) => {
  if (!activeCountry) {
    return (
      <Card className="border-2 border-dashed border-gray-300">
        <CardContent className="p-6 text-center">
          <div className="w-10 h-10 text-gray-400 mx-auto mb-3 text-2xl">🌍</div>
          <h4 className="text-lg font-medium text-gray-600 mb-1">
            Aucun pays sélectionné
          </h4>
          <p className="text-gray-500 text-sm">
            Choisissez un pays à gauche pour commencer à configurer votre voyage
          </p>
        </CardContent>
      </Card>
    );
  }

  const countryData = countriesData.find(c => c.name === activeCountry.countryName);

  return (
    <Card className="border-2 border-blue-200 bg-blue-50/30">
      <CardContent className="p-4 space-y-4">
        {/* En-tête du pays actif */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{countryData?.flagCode}</span>
            <div>
              <h5 className="text-lg font-bold text-gray-900">{activeCountry.countryName}</h5>
              <span className="text-xs text-gray-600">Configuration des villes et dates</span>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeCountry(activeCountry.countryName)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Sélection des villes */}
        <div className="space-y-3">
          <p className="font-medium text-gray-700 flex items-center gap-2 text-sm">
            <Camera className="w-4 h-4" />
            Sélectionnez vos villes :
          </p>
          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
            {countryData?.cities?.map((city) => {
              const isCitySelected = activeCountry.cities.find(c => c.cityName === city);
              
              return (
                <button
                  key={city}
                  onClick={() => 
                    isCitySelected 
                      ? removeCity(activeCountry.countryName, city)
                      : addCity(activeCountry.countryName, city)
                  }
                  className={`p-2 rounded-lg border-2 text-center transition-all duration-300 hover:scale-105 ${
                    isCitySelected
                      ? 'border-blue-500 bg-blue-100 text-blue-700 shadow-md'
                      : 'border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/30'
                  }`}
                >
                  <Camera className="w-3 h-3 mx-auto mb-1" />
                  <span className="font-medium text-xs">{city}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Configuration des dates */}
        <CityDateConfiguration
          cities={activeCountry.cities}
          countryName={activeCountry.countryName}
          removeCity={removeCity}
          updateCityDates={updateCityDates}
        />

        {/* Indicateur de progression */}
        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">
              Progression: {activeCountry.cities.length} ville{activeCountry.cities.length > 1 ? 's' : ''} sélectionnée{activeCountry.cities.length > 1 ? 's' : ''}
            </span>
            {isCountryComplete(activeCountry) && (
              <span className="text-green-600 font-medium flex items-center gap-1">
                <span>✓</span> Configuration terminée
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

CountryConfiguration.displayName = 'CountryConfiguration';

export default CountryConfiguration;
