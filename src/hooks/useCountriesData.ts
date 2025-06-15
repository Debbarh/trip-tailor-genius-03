
import { useState, useEffect } from 'react';

interface Country {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
}

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

export const useCountriesData = (activeCountry?: { countryName: string }) => {
  const [countriesList, setCountriesList] = useState<Country[]>([]);
  const [citiesList, setCitiesList] = useState<City[]>([]);

  useEffect(() => {
    setCountriesList(MOCK_COUNTRIES);
  }, []);

  useEffect(() => {
    if (!activeCountry) {
      setCitiesList([]);
      return;
    }
    
    const timer = setTimeout(() => {
      setCitiesList(MOCK_CITIES);
    }, 100);

    return () => clearTimeout(timer);
  }, [activeCountry]);

  return { countriesList, citiesList };
};
