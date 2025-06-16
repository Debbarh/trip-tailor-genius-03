
import React from 'react';
import { Calendar, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface City {
  cityName: string;
  startDate: string;
  endDate: string;
}

interface CityDateConfigurationProps {
  cities: City[];
  countryName: string;
  removeCity: (countryName: string, cityName: string) => void;
  updateCityDates: (countryName: string, cityName: string, field: string, value: string) => void;
}

const CityDateConfiguration = React.memo<CityDateConfigurationProps>(({
  cities,
  countryName,
  removeCity,
  updateCityDates
}) => {
  if (cities.length === 0) return null;

  return (
    <div className="space-y-3">
      <p className="font-medium text-gray-700 flex items-center gap-2">
        <Calendar className="w-4 h-4" />
        Définissez vos dates :
      </p>
      
      {cities.map((city) => (
        <div key={city.cityName} className="bg-white p-3 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-medium text-gray-900 text-sm">{city.cityName}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeCity(countryName, city.cityName)}
              className="text-red-500 hover:text-red-700 ml-auto h-6 w-6 p-0"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Date d'arrivée
              </label>
              <Input
                type="date"
                value={city.startDate}
                onChange={(e) => updateCityDates(countryName, city.cityName, 'startDate', e.target.value)}
                className="text-sm"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Date de départ
              </label>
              <Input
                type="date"
                value={city.endDate}
                onChange={(e) => updateCityDates(countryName, city.cityName, 'endDate', e.target.value)}
                className="text-sm"
                min={city.startDate}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

CityDateConfiguration.displayName = 'CityDateConfiguration';

export default CityDateConfiguration;
