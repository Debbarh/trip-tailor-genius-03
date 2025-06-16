
import React, { useCallback } from 'react';
import { X } from 'lucide-react';

interface CityData {
  cityName: string;
  startDate: string;
  endDate: string;
}

interface CityDatePickerProps {
  city: CityData;
  onDateChange: (cityName: string, field: string, value: string) => void;
  onRemoveCity: (cityName: string) => void;
}

const CityDatePicker = React.memo<CityDatePickerProps>(({ 
  city, 
  onDateChange, 
  onRemoveCity 
}) => {
  const handleDateChange = useCallback((field: string, value: string) => {
    onDateChange(city.cityName, field, value);
  }, [city.cityName, onDateChange]);

  const handleRemove = useCallback(() => {
    onRemoveCity(city.cityName);
  }, [city.cityName, onRemoveCity]);

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <span className="font-medium text-gray-900">
          {city.cityName}
        </span>
        <button
          onClick={handleRemove}
          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Arrivée
          </label>
          <input
            type="date"
            value={city.startDate}
            onChange={(e) => handleDateChange('startDate', e.target.value)}
            className="w-full p-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-purple-400"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Départ
          </label>
          <input
            type="date"
            value={city.endDate}
            onChange={(e) => handleDateChange('endDate', e.target.value)}
            min={city.startDate}
            className="w-full p-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-purple-400"
          />
        </div>
      </div>
    </div>
  );
});

CityDatePicker.displayName = 'CityDatePicker';

export default CityDatePicker;
