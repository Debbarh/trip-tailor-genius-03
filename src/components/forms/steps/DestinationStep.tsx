
import React, { useState, useMemo } from 'react';
import { PlanTripFormData, StepProps } from '../../../../types/planTrip';
import { useDestinationLogic } from '../../../../hooks/useDestinationLogic';
import { useCountriesData } from '../../../../hooks/useCountriesData';
import DestinationHeader from './components/DestinationHeader';
import DestinationSummary from './components/DestinationSummary';
import CountrySelector from './components/CountrySelector';
import CityConfiguration from './components/CityConfiguration';

export default function DestinationStep({ formData, setFormData }: StepProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCountryIndex, setActiveCountryIndex] = useState(0);

  const selectedCountries = useMemo(() => 
    formData.destination.countries || [], 
    [formData.destination.countries]
  );

  const activeCountry = useMemo(() => 
    selectedCountries[activeCountryIndex], 
    [selectedCountries, activeCountryIndex]
  );

  const { countriesList, citiesList } = useCountriesData(activeCountry);

  const {
    addCountry,
    removeCountry,
    addCity,
    removeCity,
    updateCityDates,
    navigateToCountry,
    isCountryComplete
  } = useDestinationLogic({
    formData,
    setFormData,
    selectedCountries,
    activeCountryIndex,
    setActiveCountryIndex
  });

  const filteredCountries = useMemo(() => {
    if (!searchTerm.trim()) return countriesList;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return countriesList.filter((country) =>
      country.name.toLowerCase().includes(lowerSearchTerm)
    );
  }, [countriesList, searchTerm]);

  return (
    <div className="space-y-1">
      <DestinationHeader />
      
      <DestinationSummary 
        selectedCountries={selectedCountries}
        activeCountryIndex={activeCountryIndex}
        navigateToCountry={navigateToCountry}
        isCountryComplete={isCountryComplete}
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-1.5">
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
