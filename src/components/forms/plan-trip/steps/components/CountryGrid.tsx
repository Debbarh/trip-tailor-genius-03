
import React from 'react';
import { Plus, X } from 'lucide-react';

interface Country {
  code: string;
  name: string;
  flagCode: string;
  region: string;
}

interface CountryGridProps {
  filteredCountries: Country[];
  selectedCountries: any[];
  searchTerm: string;
  addCountry: (countryName: string) => void;
  removeCountry: (countryName: string) => void;
}

const CountryGrid = ({
  filteredCountries,
  selectedCountries,
  searchTerm,
  addCountry,
  removeCountry
}: CountryGridProps) => {
  const isCountrySelected = (countryName: string) => {
    return selectedCountries.some(c => c.countryName === countryName);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        {searchTerm ? `Résultats pour "${searchTerm}"` : 'Choisissez vos destinations'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
        {filteredCountries.map((country) => {
          const isSelected = isCountrySelected(country.name);
          
          return (
            <button
              key={country.code}
              onClick={() => isSelected ? removeCountry(country.name) : addCountry(country.name)}
              className={`p-4 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-105 ${
                isSelected
                  ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-lg'
                  : 'border-gray-200 hover:border-purple-300 bg-white hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{country.flagCode}</span>
                  <div>
                    <div className="font-semibold">{country.name}</div>
                    <div className="text-sm opacity-70">{country.region}</div>
                  </div>
                </div>
                
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isSelected 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {isSelected ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      {filteredCountries.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Aucun pays trouvé pour "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default CountryGrid;
