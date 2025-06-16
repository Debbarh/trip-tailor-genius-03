
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
    <div className="bg-gray-50 p-0.5 rounded border">
      <div className="flex items-center justify-between mb-0.5">
        <h6 className="font-medium text-xs text-gray-900">{city.cityName}</h6>
        <Button
          onClick={() => removeCity(countryName, city.cityName)}
          variant="ghost"
          size="sm"
          className="text-red-600 hover:text-red-700 p-0.5 h-auto"
        >
          <X className="w-2.5 h-2.5" />
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-0.5">
        <div>
          <label className="block text-xs text-gray-600 mb-0.5">Arrivée</label>
          <input
            type="date"
            value={city.startDate}
            onChange={(e) => updateCityDates(countryName, city.cityName, 'startDate', e.target.value)}
            className="w-full px-0.5 py-0.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-0.5">Départ</label>
          <input
            type="date"
            value={city.endDate}
            onChange={(e) => updateCityDates(countryName, city.cityName, 'endDate', e.target.value)}
            className="w-full px-0.5 py-0.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
});

CityDateConfiguration.displayName = 'CityDateConfiguration';

export default CityDateConfiguration;
