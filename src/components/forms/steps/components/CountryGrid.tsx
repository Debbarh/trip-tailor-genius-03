
import React from 'react';
import { countriesData } from '@/data/countries';

interface Country {
  code: string;
  name: string;
  flagCode: string;
  region: string;
}

interface SelectedCountry {
  countryName: string;
  cities: Array<{
    cityName: string;
    startDate: string;
    endDate: string;
  }>;
}

interface CountryGridProps {
  filteredCountries: Country[];
  selectedCountries: SelectedCountry[];
  searchTerm: string;
  addCountry: (name: string) => void;
  removeCountry: (name: string) => void;
}

const CountryGrid = React.memo<CountryGridProps>(({
  filteredCountries,
  selectedCountries,
  searchTerm,
  addCountry,
  removeCountry
}) => {
  // Function to get flag for a country
  const getCountryFlag = (countryName: string) => {
    const country = countriesData.find(c => c.name === countryName);
    return country?.flagCode || '🌍';
  };

  return (
    <div className="space-y-0.25">
      <h4 className="text-xs font-bold text-gray-900">
        {searchTerm.trim() === "" 
          ? "Commencez par le Maroc"
          : `Pays disponibles (${filteredCountries.length})`
        }
      </h4>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.25 max-h-40 overflow-y-auto">
        {filteredCountries.map((country) => {
          const isSelected = selectedCountries.find(c => c.countryName === country.name);
          const flag = getCountryFlag(country.name);
          
          return (
            <button
              key={country.code}
              onClick={() => isSelected ? removeCountry(country.name) : addCountry(country.name)}
              className={`p-0.25 rounded border transition-all duration-200 hover:scale-105 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                  : 'border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="text-sm">{flag}</div>
                <div className="font-medium text-xs">{country.name}</div>
              </div>
              <div className="text-xs text-gray-500">{country.region}</div>
              {isSelected && (
                <div className="mt-0 text-xs text-blue-600 font-medium">✓ Sélectionné</div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
});

CountryGrid.displayName = 'CountryGrid';

export default CountryGrid;
