
import React, { useState, useEffect } from 'react';
import api from '../../../../services/api';
import DestinationHeader from './components/DestinationHeader';
import DestinationSummary from './components/DestinationSummary';
import CountrySelector from './components/CountrySelector';
import CityConfiguration from './components/CityConfiguration';

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

  // Helpers
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
      <DestinationHeader />
      
      <DestinationSummary 
        selectedCountries={selectedCountries}
        activeCountryIndex={activeCountryIndex}
        navigateToCountry={navigateToCountry}
        isCountryComplete={isCountryComplete}
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <CountrySelector 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredCountries={filteredCountries}
          selectedCountries={selectedCountries}
          addCountry={addCountry}
          removeCountry={removeCountry}
        />

        <CityConfiguration 
          activeCountry={activeCountry}
          citiesList={citiesList}
          removeCountry={removeCountry}
          addCity={addCity}
          removeCity={removeCity}
          updateCityDates={updateCityDates}
          isCountryComplete={isCountryComplete}
        />
      </div>
    </div>
  );
}
