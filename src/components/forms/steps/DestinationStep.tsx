import { useState } from "react";
import { StepProps } from "@/types/planTrip";
import { countriesData, regions } from "@/data/countries";
import DestinationFilters from "./components/DestinationFilters";
import CountryGrid from "./components/CountryGrid";
import CountryConfiguration from "./components/CountryConfiguration";
import DestinationHeader from "../PlanTrip/steps/components/DestinationHeader";
import DestinationSummary from "../PlanTrip/steps/components/DestinationSummary";

const DestinationStep = ({ formData, setFormData }: StepProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("Tous");
  const [activeCountryIndex, setActiveCountryIndex] = useState(0);

  const selectedCountries = formData.destination.countries || [];
  const activeCountry = selectedCountries[activeCountryIndex];

  const addCountry = (countryName: string) => {
    const existingCountries = formData.destination.countries || [];
    if (existingCountries.find(c => c.countryName === countryName)) return;
    
    const newCountry = {
      countryName,
      cities: []
    };
    
    const updatedCountries = [...existingCountries, newCountry];
    
    setFormData({
      ...formData,
      destination: {
        countries: updatedCountries
      }
    });

    setActiveCountryIndex(updatedCountries.length - 1);
  };

  const removeCountry = (countryName: string) => {
    const updatedCountries = formData.destination.countries.filter(
      c => c.countryName !== countryName
    );
    
    setFormData({
      ...formData,
      destination: {
        countries: updatedCountries
      }
    });

    if (activeCountryIndex >= updatedCountries.length && updatedCountries.length > 0) {
      setActiveCountryIndex(updatedCountries.length - 1);
    } else if (updatedCountries.length === 0) {
      setActiveCountryIndex(0);
    }
  };

  const addCity = (countryName: string, cityName: string) => {
    const updatedCountries = formData.destination.countries.map(country => {
      if (country.countryName === countryName) {
        const existingCity = country.cities.find(c => c.cityName === cityName);
        if (existingCity) return country;
        
        return {
          ...country,
          cities: [...country.cities, {
            cityName,
            startDate: '',
            endDate: ''
          }]
        };
      }
      return country;
    });

    setFormData({
      ...formData,
      destination: {
        countries: updatedCountries
      }
    });
  };

  const removeCity = (countryName: string, cityName: string) => {
    const updatedCountries = formData.destination.countries.map(country => {
      if (country.countryName === countryName) {
        return {
          ...country,
          cities: country.cities.filter(c => c.cityName !== cityName)
        };
      }
      return country;
    });

    setFormData({
      ...formData,
      destination: {
        countries: updatedCountries
      }
    });
  };

  const updateCityDates = (countryName: string, cityName: string, field: string, value: string) => {
    const updatedCountries = formData.destination.countries.map(country => {
      if (country.countryName === countryName) {
        return {
          ...country,
          cities: country.cities.map(city => {
            if (city.cityName === cityName) {
              return {
                ...city,
                [field]: value
              };
            }
            return city;
          })
        };
      }
      return country;
    });

    setFormData({
      ...formData,
      destination: {
        countries: updatedCountries
      }
    });
  };

  const filteredCountries = searchTerm.trim() === "" 
    ? countriesData.filter(country => country.name === "Maroc")
    : countriesData.filter(country => {
        const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRegion = selectedRegion === "Tous" || country.region === selectedRegion;
        return matchesSearch && matchesRegion;
      });

  const navigateToCountry = (index: number) => {
    setActiveCountryIndex(index);
  };

  const isCountryComplete = (country: any) => {
    return country.cities.length > 0 && 
           country.cities.every((city: any) => city.startDate && city.endDate);
  };

  return (
    <div className="space-y-4">
      <DestinationHeader />
      
      <DestinationSummary 
        selectedCountries={selectedCountries}
        activeCountryIndex={activeCountryIndex}
        navigateToCountry={navigateToCountry}
        isCountryComplete={isCountryComplete}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <DestinationFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            regions={regions}
          />

          <CountryGrid
            filteredCountries={filteredCountries}
            selectedCountries={selectedCountries}
            searchTerm={searchTerm}
            addCountry={addCountry}
            removeCountry={removeCountry}
          />
        </div>

        <CountryConfiguration
          activeCountry={activeCountry}
          removeCountry={removeCountry}
          addCity={addCity}
          removeCity={removeCity}
          updateCityDates={updateCityDates}
          isCountryComplete={isCountryComplete}
        />
      </div>
    </div>
  );
};

export default DestinationStep;
