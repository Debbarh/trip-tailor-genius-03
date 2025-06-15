
import React, { useMemo } from 'react';
import { Search } from 'lucide-react';

interface Country {
  id: number;
  name: string;
}

interface SelectedCountry {
  countryName: string;
  cities: Array<{
    cityName: string;
    startDate: string;
    endDate: string;
  }>;
}

interface CountrySelectorProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredCountries: Country[];
  selectedCountries: SelectedCountry[];
  addCountry: (name: string) => void;
  removeCountry: (name: string) => void;
}

const CountrySelector = React.memo<CountrySelectorProps>(({ 
  searchTerm, 
  setSearchTerm, 
  filteredCountries, 
  selectedCountries, 
  addCountry, 
  removeCountry 
}) => {
  const selectedCountryNames = useMemo(
    () => new Set(selectedCountries.map(sc => sc.countryName)),
    [selectedCountries]
  );

  const handleCountryToggle = (countryName: string) => {
    if (selectedCountryNames.has(countryName)) {
      removeCountry(countryName);
    } else {
      addCountry(countryName);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-3xl border border-gray-200">
        <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Search className="w-5 h-5 text-blue-600" />
          Trouvez vos destinations
        </h4>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher un pays..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 text-lg"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-2xl font-bold text-gray-900">
          Pays disponibles ({filteredCountries.length})
        </h4>
        <div className="max-h-96 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4 pr-2">
          {filteredCountries.map((country) => {
            const isSelected = selectedCountryNames.has(country.name);
            return (
              <button
                key={country.id}
                onClick={() => handleCountryToggle(country.name)}
                className={`p-6 border-2 rounded-2xl text-center transition-all duration-300 transform hover:scale-105 ${
                  isSelected
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 border-transparent text-white shadow-2xl'
                    : 'border-gray-200 hover:border-blue-300 bg-white hover:shadow-xl'
                }`}
              >
                <div className="text-lg font-semibold">{country.name}</div>
                {isSelected && (
                  <div className="mt-2 text-sm opacity-90">✓ Sélectionné</div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
});

CountrySelector.displayName = 'CountrySelector';

export default CountrySelector;
