
import React, { useState, useEffect } from 'react';
import {
  Globe,
  Camera,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
} from 'lucide-react';
import api from '../../../../services/api';

export default function DestinationStep({ formData, setFormData }) {
  // États
  const [searchTerm, setSearchTerm] = useState('');
  const [countriesList, setCountriesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [activeCountryIndex, setActiveCountryIndex] = useState(0);

  const selectedCountries = formData.destination.countries || [];
  const activeCountry = selectedCountries[activeCountryIndex];

  // Charger les pays
  useEffect(() => {
    api.get('countries/')
      .then(({ data }) => setCountriesList(data))
      .catch(console.error);
  }, []);

  // Charger les villes du pays actif
  useEffect(() => {
    if (!activeCountry) {
      setCitiesList([]);
      return;
    }
    const countryObj = countriesList.find(
      (c) => c.name === activeCountry.countryName
    );
    if (countryObj) {
      api
        .get(`countries/${countryObj.id}/cities/`)
        .then(({ data }) => setCitiesList(data))
        .catch(console.error);
    }
  }, [activeCountry, countriesList]);

  // Helpers corrigés
  const addCountry = (name) => {
    if (selectedCountries.some((c) => c.countryName === name)) return;
    const updated = [...selectedCountries, { countryName: name, cities: [] }];
    setFormData({ ...formData, destination: { countries: updated } });
    setActiveCountryIndex(updated.length - 1);
  };

  const removeCountry = (name) => {
    const updated = selectedCountries.filter((c) => c.countryName !== name);
    setFormData({ ...formData, destination: { countries: updated } });
    setActiveCountryIndex((i) => Math.max(0, Math.min(i, updated.length - 1)));
  };

  const addCity = (cityName) => {
    const updated = selectedCountries.map((c, idx) =>
      idx === activeCountryIndex
        ? {
            ...c,
            cities: [...c.cities, { cityName, startDate: '', endDate: '' }],
          }
        : c
    );
    setFormData({ ...formData, destination: { countries: updated } });
  };

  const removeCity = (cityName) => {
    const updated = selectedCountries.map((c, idx) =>
      idx === activeCountryIndex
        ? { ...c, cities: c.cities.filter((ci) => ci.cityName !== cityName) }
        : c
    );
    setFormData({ ...formData, destination: { countries: updated } });
  };

  const updateCityDates = (cityName, field, value) => {
    const updated = selectedCountries.map((c, idx) =>
      idx === activeCountryIndex
        ? {
            ...c,
            cities: c.cities.map((ci) =>
              ci.cityName === cityName ? { ...ci, [field]: value } : ci
            ),
          }
        : c
    );
    setFormData({ ...formData, destination: { countries: updated } });
  };

  const navigateToCountry = (i) => setActiveCountryIndex(i);
  const isCountryComplete = (c) =>
    c.cities.length > 0 && c.cities.every((ci) => ci.startDate && ci.endDate);

  // Filter
  const filteredCountries = countriesList.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header avec style moderne */}
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-300">
          <Globe className="w-10 h-10 text-white" />
        </div>
        <div>
          <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Planifiez votre voyage multi-destinations
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Sélectionnez vos pays, configurez vos villes et définissez vos dates pour créer votre voyage de rêve
          </p>
        </div>
      </div>

      {/* Sticky résumé avec style amélioré */}
      {selectedCountries.length > 0 && (
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
      )}

      {/* Interface principale stylée */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Colonne gauche avec design moderne */}
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

        {/* Colonne droite avec design moderne */}
        <div className="space-y-6">
          {!activeCountry ? (
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
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}
