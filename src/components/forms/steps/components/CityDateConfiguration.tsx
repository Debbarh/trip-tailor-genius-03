
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CityDateConfigurationProps {
  city: {
    cityName: string;
    startDate: string;
    endDate: string;
  };
  countryName: string;
  removeCity: (countryName: string, cityName: string) => void;
  updateCityDates: (countryName: string, cityName: string, field: string, value: string) => void;
}

const CityDateConfiguration = React.memo<CityDateConfigurationProps>(({
  city,
  countryName,
  removeCity,
  updateCityDates
}) => {
  return (
    <div className="bg-gray-50 p-2 rounded border">
      <div className="flex items-center justify-between mb-2">
        <h6 className="font-medium text-sm text-gray-900">{city.cityName}</h6>
        <Button
          onClick={() => removeCity(countryName, city.cityName)}
          variant="ghost"
          size="sm"
          className="text-red-600 hover:text-red-700 p-1 h-auto"
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs text-gray-600 mb-1">Arrivée</label>
          <input
            type="date"
            value={city.startDate}
            onChange={(e) => updateCityDates(countryName, city.cityName, 'startDate', e.target.value)}
            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">Départ</label>
          <input
            type="date"
            value={city.endDate}
            onChange={(e) => updateCityDates(countryName, city.cityName, 'endDate', e.target.value)}
            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
});

CityDateConfiguration.displayName = 'CityDateConfiguration';

export default CityDateConfiguration;
