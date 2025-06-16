
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
    <div className="p-4 bg-gradient-to-br from-white to-purple-50/30 rounded-xl border border-purple-200/60 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {city.cityName.charAt(0)}
            </span>
          </div>
          <span className="font-semibold text-gray-800">
            {city.cityName}
          </span>
        </div>
        <button
          onClick={handleRemove}
          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-purple-700 mb-2">
            Arrivée
          </label>
          <input
            type="date"
            value={city.startDate}
            onChange={(e) => handleDateChange('startDate', e.target.value)}
            className="w-full p-3 text-sm border border-purple-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-400 transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-blue-700 mb-2">
            Départ
          </label>
          <input
            type="date"
            value={city.endDate}
            onChange={(e) => handleDateChange('endDate', e.target.value)}
            min={city.startDate}
            className="w-full p-3 text-sm border border-blue-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400 transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );
});

CityDatePicker.displayName = 'CityDatePicker';

export default CityDatePicker;
