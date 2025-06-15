
import { useCallback } from 'react';
import { PlanTripFormData, CountryWithCities } from '../types/planTrip';

interface UseDestinationLogicProps {
  formData: PlanTripFormData;
  setFormData: (data: PlanTripFormData) => void;
  selectedCountries: CountryWithCities[];
  activeCountryIndex: number;
  setActiveCountryIndex: (index: number) => void;
}

export const useDestinationLogic = ({
  formData,
  setFormData,
  selectedCountries,
  activeCountryIndex,
  setActiveCountryIndex
}: UseDestinationLogicProps) => {
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
  }, [selectedCountries, formData, setFormData, setActiveCountryIndex]);

  const removeCountry = useCallback((name: string) => {
    const updated = selectedCountries.filter((c) => c.countryName !== name);
    setFormData({ 
      ...formData, 
      destination: { countries: updated } 
    });
    
    // Ajuster l'index actif si nécessaire
    if (updated.length === 0) {
      setActiveCountryIndex(0);
    } else {
      const newIndex = Math.min(activeCountryIndex, updated.length - 1);
      setActiveCountryIndex(newIndex);
    }
  }, [selectedCountries, formData, setFormData, activeCountryIndex, setActiveCountryIndex]);

  const addCity = useCallback((cityName: string) => {
    if (!cityName.trim()) return;

    const activeCountry = selectedCountries[activeCountryIndex];
    if (!activeCountry || activeCountry.cities.some(city => city.cityName === cityName)) {
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
  }, [selectedCountries, activeCountryIndex, formData, setFormData]);

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
  }, [selectedCountries.length, setActiveCountryIndex]);

  const isCountryComplete = useCallback((country: CountryWithCities) => {
    return country.cities.length > 0 && 
           country.cities.every((city) => city.startDate && city.endDate);
  }, []);

  return {
    addCountry,
    removeCountry,
    addCity,
    removeCity,
    updateCityDates,
    navigateToCountry,
    isCountryComplete
  };
};
