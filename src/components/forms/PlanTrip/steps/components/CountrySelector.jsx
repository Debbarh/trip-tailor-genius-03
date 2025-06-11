
import React from 'react';
import { Search } from 'lucide-react';

export default function CountrySelector({ 
  searchTerm, 
  setSearchTerm, 
  filteredCountries, 
  selectedCountries, 
  addCountry, 
  removeCountry 
}) {
  return (
    <div className="space-y-6">
      {/* Barre de recherche stylée */}
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

      {/* Liste des pays avec design moderne */}
      <div className="space-y-4">
        <h4 className="text-2xl font-bold text-gray-900">
          Pays disponibles ({filteredCountries.length})
        </h4>
        <div className="max-h-96 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4 pr-2">
          {filteredCountries.map((c) => {
            const isSel = selectedCountries.some(
              (sc) => sc.countryName === c.name
            );
            return (
              <button
                key={c.id}
                onClick={() =>
                  isSel ? removeCountry(c.name) : addCountry(c.name)
                }
                className={`p-6 border-2 rounded-2xl text-center transition-all duration-300 transform hover:scale-105 ${
                  isSel
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 border-transparent text-white shadow-2xl'
                    : 'border-gray-200 hover:border-blue-300 bg-white hover:shadow-xl'
                }`}
              >
                <div className="text-lg font-semibold">{c.name}</div>
                {isSel && (
                  <div className="mt-2 text-sm opacity-90">✓ Sélectionné</div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
