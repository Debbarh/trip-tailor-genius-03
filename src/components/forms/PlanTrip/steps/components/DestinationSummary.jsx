
import React from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

export default function DestinationSummary({ 
  selectedCountries, 
  activeCountryIndex, 
  navigateToCountry, 
  isCountryComplete 
}) {
  if (selectedCountries.length === 0) return null;

  return (
    <div className="sticky top-4 bg-white/95 backdrop-blur-sm border-2 border-blue-200 rounded-3xl p-6 shadow-2xl z-10 transform transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h4 className="flex items-center gap-3 font-bold text-xl text-gray-900">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          Votre voyage ({selectedCountries.length} pays)
        </h4>
        {selectedCountries.length > 1 && (
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-2">
            <button
              onClick={() =>
                navigateToCountry(Math.max(0, activeCountryIndex - 1))
              }
              disabled={activeCountryIndex === 0}
              className="p-2 bg-white border-2 border-gray-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-300 hover:shadow-md transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-semibold text-gray-700 px-4 py-2 bg-white rounded-xl border border-gray-200">
              {activeCountryIndex + 1} / {selectedCountries.length}
            </span>
            <button
              onClick={() =>
                navigateToCountry(
                  Math.min(
                    selectedCountries.length - 1,
                    activeCountryIndex + 1
                  )
                )
              }
              disabled={
                activeCountryIndex === selectedCountries.length - 1
              }
              className="p-2 bg-white border-2 border-gray-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-300 hover:shadow-md transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        {selectedCountries.map((c, idx) => (
          <button
            key={c.countryName}
            onClick={() => navigateToCountry(idx)}
            className={`px-4 py-3 border-2 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
              idx === activeCountryIndex
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-transparent text-white shadow-xl'
                : 'border-gray-200 hover:border-blue-300 bg-white hover:shadow-lg'
            }`}
          >
            <span className="flex items-center gap-2">
              {c.countryName}
              <span className="text-xs opacity-75">
                ({c.cities.length})
              </span>
              {isCountryComplete(c) && (
                <span className="text-green-400">✓</span>
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
