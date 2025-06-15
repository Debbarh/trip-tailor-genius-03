
import React, { useCallback } from 'react';
import { Calendar, X } from 'lucide-react';

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
    <div className="p-6 bg-white rounded-2xl border-2 border-gray-200 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            {city.cityName.charAt(0)}
          </div>
          <span className="text-lg font-bold text-gray-900">
            {city.cityName}
          </span>
        </div>
        <button
          onClick={handleRemove}
          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            📅 Date d'arrivée
          </label>
          <input
            type="date"
            value={city.startDate}
            onChange={(e) => handleDateChange('startDate', e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            🎯 Date de départ
          </label>
          <input
            type="date"
            value={city.endDate}
            onChange={(e) => handleDateChange('endDate', e.target.value)}
            min={city.startDate}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );
});

CityDatePicker.displayName = 'CityDatePicker';

export default CityDatePicker;
