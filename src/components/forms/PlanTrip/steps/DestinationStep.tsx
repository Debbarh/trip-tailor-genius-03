
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { PlanTripFormData, StepProps } from '../../../types/planTrip';
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

// Mock data constants - moved outside component to prevent recreation
const MOCK_COUNTRIES: Country[] = [
  { id: 1, name: "Maroc" },
  { id: 2, name: "France" },
  { id: 3, name: "Espagne" },
  { id: 4, name: "Italie" },
  { id: 5, name: "Portugal" },
  { id: 6, name: "Grèce" },
  { id: 7, name: "Turquie" },
  { id: 8, name: "Égypte" }
];

const MOCK_CITIES: City[] = [
  { id: 1, name: "Casablanca" },
  { id: 2, name: "Marrakech" },
  { id: 3, name: "Rabat" },
  { id: 4, name: "Fès" },
  { id: 5, name: "Agadir" },
  { id: 6, name: "Tanger" }
];

export default function DestinationStep({ formData, setFormData }: StepProps) {
  // États locaux optimizés
  const [searchTerm, setSearchTerm] = useState('');
  const [countriesList, setCountriesList] = useState<Country[]>([]);
  const [citiesList, setCitiesList] = useState<City[]>([]);
  const [activeCountryIndex, setActiveCountryIndex] = useState(0);

  // Données dérivées memoized
  const selectedCountries = useMemo(() => 
    formData.destination.countries || [], 
    [formData.destination.countries]
  );

  const activeCountry = useMemo(() => 
    selectedCountries[activeCountryIndex], 
    [selectedCountries, activeCountryIndex]
  );

  // Chargement initial des pays
  useEffect(() => {
    setCountriesList(MOCK_COUNTRIES);
  }, []);

  // Chargement des villes optimisé
  useEffect(() => {
    if (!activeCountry) {
      setCitiesList([]);
      return;
    }
    
    // Simulation d'un délai API pour une expérience réaliste
    const timer = setTimeout(() => {
      setCitiesList(MOCK_CITIES);
    }, 100);

    return () => clearTimeout(timer);
  }, [activeCountry]);

  // Actions memoized avec validation
  const addCountry = useCallback((name: string) => {
    if (!name.trim() || selectedCountries.some((c) => c.countryName === name)) {
      return;
    }
    
    const updated = [...selectedCountries, { countryName: name, cities: [] }];
    setFormData({ 
      ...formData, 
      destination: { countries: updated } 
    });
    setActiveCountryIndex(updated.length - 1);
  }, [selectedCountries, formData, setFormData]);

  const removeCountry = useCallback((name: string) => {
    const updated = selectedCountries.filter((c) => c.countryName !== name);
    setFormData({ 
      ...formData, 
      destination: { countries: updated } 
    });
    
    // Ajustement intelligent de l'index actif
    setActiveCountryIndex((prevIndex) => {
      if (updated.length === 0) return 0;
      return Math.min(prevIndex, updated.length - 1);
    });
  }, [selectedCountries, formData, setFormData]);

  const addCity = useCallback((cityName: string) => {
    if (!cityName.trim() || !activeCountry) return;

    // Vérification des doublons
    if (activeCountry.cities.some(city => city.cityName === cityName)) {
      return;
    }

    const updated = selectedCountries.map((c, idx) =>
      idx === activeCountryIndex
        ? {
            ...c,
            cities: [...c.cities, { cityName, startDate: '', endDate: '' }],
          }
        : c
    );
    
    setFormData({ 
      ...formData, 
      destination: { countries: updated } 
    });
  }, [selectedCountries, activeCountryIndex, activeCountry, formData, setFormData]);

  const removeCity = useCallback((cityName: string) => {
    const updated = selectedCountries.map((c, idx) =>
      idx === activeCountryIndex
        ? { ...c, cities: c.cities.filter((ci) => ci.cityName !== cityName) }
        : c
    );
    
    setFormData({ 
      ...formData, 
      destination: { countries: updated } 
    });
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
    
    setFormData({ 
      ...formData, 
      destination: { countries: updated } 
    });
  }, [selectedCountries, activeCountryIndex, formData, setFormData]);

  const navigateToCountry = useCallback((index: number) => {
    if (index >= 0 && index < selectedCountries.length) {
      setActiveCountryIndex(index);
    }
  }, [selectedCountries.length]);
  
  const isCountryComplete = useCallback((country: typeof activeCountry) => {
    if (!country) return false;
    return country.cities.length > 0 && 
           country.cities.every((city) => city.startDate && city.endDate);
  }, []);

  // Filtrage optimisé des pays
  const filteredCountries = useMemo(() => {
    if (!searchTerm.trim()) return countriesList;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return countriesList.filter((country) =>
      country.name.toLowerCase().includes(lowerSearchTerm)
    );
  }, [countriesList, searchTerm]);

  // Statistiques memoized pour le debug/monitoring
  const stats = useMemo(() => ({
    totalCountries: selectedCountries.length,
    totalCities: selectedCountries.reduce((acc, country) => acc + country.cities.length, 0),
    completedCountries: selectedCountries.filter(isCountryComplete).length
  }), [selectedCountries, isCountryComplete]);

  // Log des stats pour le debug (seulement en développement)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('DestinationStep Stats:', stats);
    }
  }, [stats]);

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
