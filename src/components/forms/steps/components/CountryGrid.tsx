
import React from 'react';

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
  return (
    <div className="space-y-3">
      <h4 className="text-xl font-bold text-gray-900">
        {searchTerm.trim() === "" 
          ? "Commencez par le Maroc"
          : `Pays disponibles (${filteredCountries.length})`
        }
      </h4>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto">
        {filteredCountries.map((country) => {
          const isSelected = selectedCountries.find(c => c.countryName === country.name);
          
          return (
            <button
              key={country.code}
              onClick={() => isSelected ? removeCountry(country.name) : addCountry(country.name)}
              className={`p-3 rounded-xl border-2 text-center transition-all duration-300 hover:scale-105 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                  : 'border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/50'
              }`}
            >
              <div className="text-2xl mb-1">{country.flagCode}</div>
              <div className="font-medium text-sm">{country.name}</div>
              <div className="text-xs text-gray-500">{country.region}</div>
              {isSelected && (
                <div className="mt-1 text-xs text-blue-600 font-medium">✓ Sélectionné</div>
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
