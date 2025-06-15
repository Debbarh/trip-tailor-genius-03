
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import api from '../../../../services/api';
import DestinationHeader from './components/DestinationHeader';
import DestinationSummary from './components/DestinationSummary';
import CountrySelector from './components/CountrySelector';
import CityConfiguration from './components/CityConfiguration';

interface City {
  id: number;
  name: string;
}

interface Country {
  id: number;
  name: string;
}

interface CityData {
  cityName: string;
  startDate: string;
  endDate: string;
}

interface SelectedCountry {
  countryName: string;
  cities: CityData[];
}

interface FormData {
  destination: {
    countries: SelectedCountry[];
  };
}

interface DestinationStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export default function DestinationStep({ formData, setFormData }: DestinationStepProps) {
  // États
  const [searchTerm, setSearchTerm] = useState('');
  const [countriesList, setCountriesList] = useState<Country[]>([]);
  const [citiesList, setCitiesList] = useState<City[]>([]);
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

  // Helpers memoized
  const addCountry = useCallback((name: string) => {
    if (selectedCountries.some((c) => c.countryName === name)) return;
    const updated = [...selectedCountries, { countryName: name, cities: [] }];
    setFormData({ ...formData, destination: { countries: updated } });
    setActiveCountryIndex(updated.length - 1);
  }, [selectedCountries, formData, setFormData]);

  const removeCountry = useCallback((name: string) => {
    const updated = selectedCountries.filter((c) => c.countryName !== name);
    setFormData({ ...formData, destination: { countries: updated } });
    setActiveCountryIndex((i) => Math.max(0, Math.min(i, updated.length - 1)));
  }, [selectedCountries, formData, setFormData]);

  const addCity = useCallback((cityName: string) => {
    const updated = selectedCountries.map((c, idx) =>
      idx === activeCountryIndex
        ? {
            ...c,
            cities: [...c.cities, { cityName, startDate: '', endDate: '' }],
          }
        : c
    );
    setFormData({ ...formData, destination: { countries: updated } });
  }, [selectedCountries, activeCountryIndex, formData, setFormData]);

  const removeCity = useCallback((cityName: string) => {
    const updated = selectedCountries.map((c, idx) =>
      idx === activeCountryIndex
        ? { ...c, cities: c.cities.filter((ci) => ci.cityName !== cityName) }
        : c
    );
    setFormData({ ...formData, destination: { countries: updated } });
  }, [selectedCountries, activeCountryIndex, formData, setFormData]);

  const updateCityDates = useCallback((cityName: string, field: string, value: string) => {
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
  }, [selectedCountries, activeCountryIndex, formData, setFormData]);

  const navigateToCountry = useCallback((i: number) => setActiveCountryIndex(i), []);
  
  const isCountryComplete = useCallback((c: SelectedCountry) =>
    c.cities.length > 0 && c.cities.every((ci) => ci.startDate && ci.endDate), []);

  // Filter memoized
  const filteredCountries = useMemo(() => 
    countriesList.filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [countriesList, searchTerm]);

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
