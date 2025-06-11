
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
    <div className="space-y-8 px-4 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center shadow-lg">
          <Globe className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900">
          Planifiez votre voyage multi-destinations
        </h3>
        <p className="text-gray-600">
          Sélectionnez vos pays, configurez vos villes et définissez vos dates.
        </p>
      </div>

      {/* Sticky résumé */}
      {selectedCountries.length > 0 && (
        <div className="sticky top-4 bg-white border border-blue-200 rounded-xl p-4 shadow-md z-10">
          <div className="flex items-center justify-between mb-2">
            <h4 className="flex items-center gap-2 font-semibold text-gray-900">
              <MapPin className="text-blue-600" />
              Votre voyage ({selectedCountries.length} pays)
            </h4>
            {selectedCountries.length > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    navigateToCountry(Math.max(0, activeCountryIndex - 1))
                  }
                  disabled={activeCountryIndex === 0}
                  className="p-1 border rounded disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-600 px-2">
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
                  className="p-1 border rounded disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedCountries.map((c, idx) => (
              <button
                key={c.countryName}
                onClick={() => navigateToCountry(idx)}
                className={`px-3 py-1 border rounded-md text-sm transition ${
                  idx === activeCountryIndex
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-gray-300 hover:bg-gray-100'
                }`}
              >
                {c.countryName}{' '}
                <span className="text-xs text-gray-500">
                  ({c.cities.length})
                </span>
                {isCountryComplete(c) && (
                  <span className="ml-1 text-green-600">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Deux colonnes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Colonne gauche */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un pays..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="max-h-80 overflow-y-auto grid grid-cols-2 gap-4">
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
                  className={`p-3 border rounded-md text-center transition ${
                    isSel
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Colonne droite */}
        <div className="space-y-6">
          {!activeCountry ? (
            <div className="p-8 text-center border-2 border-dashed rounded-xl text-gray-500">
              <Globe className="mx-auto mb-4 text-gray-400 w-12 h-12" />
              Choisissez un pays pour commencer
            </div>
          ) : (
            <div className="space-y-4 p-6 border rounded-xl bg-white shadow">
              {/* Header du pays */}
              <div className="flex justify-between items-center">
                <h5 className="font-semibold text-lg text-gray-900">
                  {activeCountry.countryName}
                </h5>
                <button
                  onClick={() => removeCountry(activeCountry.countryName)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sélection villes */}
              <div className="space-y-2">
                <p className="flex items-center gap-2 font-medium text-gray-700">
                  <Camera className="w-4 h-4" /> Sélectionnez des villes
                </p>
                <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto">
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
                        className={`p-2 border rounded-md text-sm text-center transition ${
                          isSel
                            ? 'bg-blue-50 border-blue-500 text-blue-700'
                            : 'border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        {city.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dates */}
              {activeCountry.cities.length > 0 && (
                <div className="space-y-4">
                  <p className="flex items-center gap-2 font-medium text-gray-700">
                    <Calendar className="w-4 h-4" /> Définir vos dates
                  </p>
                  <div className="space-y-4">
                    {activeCountry.cities.map((ci) => (
                      <div key={ci.cityName} className="p-4 border rounded-lg bg-gray-50">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-medium text-gray-900">
                            {ci.cityName}
                          </span>
                          <button
                            onClick={() => removeCity(ci.cityName)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Date d'arrivée
                            </label>
                            <input
                              type="date"
                              value={ci.startDate}
                              onChange={(e) =>
                                updateCityDates(ci.cityName, 'startDate', e.target.value)
                              }
                              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Date de départ
                            </label>
                            <input
                              type="date"
                              value={ci.endDate}
                              onChange={(e) =>
                                updateCityDates(ci.cityName, 'endDate', e.target.value)
                              }
                              min={ci.startDate}
                              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Progression */}
              <div className="pt-4 border-t">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>
                    Progression: {activeCountry.cities.length} ville
                    {activeCountry.cities.length > 1 ? 's' : ''} sélectionnée
                    {activeCountry.cities.length > 1 ? 's' : ''}
                  </span>
                  {isCountryComplete(activeCountry) && (
                    <span className="text-green-600 font-medium">✓ Terminé</span>
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
