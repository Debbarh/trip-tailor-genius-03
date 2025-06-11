
import React from 'react';
import { Globe, Camera, Calendar, X } from 'lucide-react';

export default function CityConfiguration({ 
  activeCountry, 
  citiesList, 
  removeCountry, 
  addCity, 
  removeCity, 
  updateCityDates, 
  isCountryComplete 
}) {
  if (!activeCountry) {
    return (
      <div className="p-12 text-center border-2 border-dashed border-gray-300 rounded-3xl bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
          <Globe className="w-8 h-8 text-white" />
        </div>
        <h4 className="text-xl font-semibold text-gray-600 mb-2">
          Aucun pays sélectionné
        </h4>
        <p className="text-gray-500">
          Choisissez un pays à gauche pour commencer la configuration
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-8 border-2 border-blue-200 rounded-3xl bg-gradient-to-br from-white to-blue-50 shadow-2xl">
      {/* Header du pays avec style moderne */}
      <div className="flex justify-between items-center pb-6 border-b border-blue-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
            {activeCountry.countryName.charAt(0)}
          </div>
          <div>
            <h5 className="text-2xl font-bold text-gray-900">
              {activeCountry.countryName}
            </h5>
            <p className="text-gray-600">Configuration des villes et dates</p>
          </div>
        </div>
        <button
          onClick={() => removeCountry(activeCountry.countryName)}
          className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Sélection villes avec style moderne */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
            <Camera className="w-4 h-4 text-white" />
          </div>
          <h6 className="text-xl font-bold text-gray-800">Sélectionnez vos villes</h6>
        </div>
        <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
          {citiesList.map((city) => {
            const isSel = activeCountry.cities.some(
              (ci) => ci.cityName === city.name
            );
            return (
              <button
                key={city.id}
                onClick={() =>
                  isSel
                    ? removeCity(city.name)
                    : addCity(city.name)
                }
                className={`p-4 border-2 rounded-2xl text-sm text-center transition-all duration-300 transform hover:scale-105 ${
                  isSel
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

      {/* Configuration des dates avec style moderne */}
      {activeCountry.cities.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <h6 className="text-xl font-bold text-gray-800">Définissez vos dates</h6>
          </div>
          <div className="space-y-4">
            {activeCountry.cities.map((ci) => (
              <div key={ci.cityName} className="p-6 bg-white rounded-2xl border-2 border-gray-200 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {ci.cityName.charAt(0)}
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                      {ci.cityName}
                    </span>
                  </div>
                  <button
                    onClick={() => removeCity(ci.cityName)}
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
                      value={ci.startDate}
                      onChange={(e) =>
                        updateCityDates(ci.cityName, 'startDate', e.target.value)
                      }
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      🎯 Date de départ
                    </label>
                    <input
                      type="date"
                      value={ci.endDate}
                      onChange={(e) =>
                        updateCityDates(ci.cityName, 'endDate', e.target.value)
                      }
                      min={ci.startDate}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Indicateur de progression stylé */}
      <div className="pt-6 border-t border-blue-200">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="font-semibold text-gray-700">
              Progression: {activeCountry.cities.length} ville{activeCountry.cities.length > 1 ? 's' : ''} sélectionnée{activeCountry.cities.length > 1 ? 's' : ''}
            </span>
          </div>
          {isCountryComplete(activeCountry) && (
            <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-full text-xs font-bold">
              <span>✓</span> Configuration terminée
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
