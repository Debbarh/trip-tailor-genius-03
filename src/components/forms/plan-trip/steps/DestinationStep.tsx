
import React, { useState, useMemo } from 'react';
import { PlanTripFormData, StepProps } from '../../../../types/planTrip';
import { useDestinationLogic } from '../../../../hooks/useDestinationLogic';
import { useCountriesData } from '../../../../hooks/useCountriesData';
import { countriesData } from '@/data/countries';
import DestinationSummary from './components/DestinationSummary';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, MapPin, Plus, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DestinationStepProps extends StepProps {
  onNext?: () => void;
}

export default function DestinationStep({ formData, setFormData, onNext }: DestinationStepProps) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCountryIndex, setActiveCountryIndex] = useState(0);
  const [newCityName, setNewCityName] = useState('');
  const [expandedCountries, setExpandedCountries] = useState<Set<string>>(new Set());

  const selectedCountries = useMemo(() => 
    formData.destination.countries || [], 
    [formData.destination.countries]
  );

  const activeCountry = useMemo(() => 
    selectedCountries[activeCountryIndex], 
    [selectedCountries, activeCountryIndex]
  );

  const { countriesList } = useCountriesData(activeCountry);

  const {
    addCountry,
    removeCountry,
    addCity,
    removeCity,
    updateCityDates,
    navigateToCountry,
    isCountryComplete,
    validateDestinationData
  } = useDestinationLogic({
    formData,
    setFormData,
    selectedCountries,
    activeCountryIndex,
    setActiveCountryIndex
  });

  const filteredCountries = useMemo(() => {
    if (!searchTerm.trim()) return countriesData;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return countriesData.filter((country) =>
      country.name.toLowerCase().includes(lowerSearchTerm)
    );
  }, [searchTerm]);

  const activeCountryData = useMemo(() => {
    if (!activeCountry) return null;
    return countriesData.find(c => c.name === activeCountry.countryName);
  }, [activeCountry]);

  const handleNext = () => {
    if (validateDestinationData() && onNext) {
      onNext();
    }
  };

  const handleAddCity = () => {
    if (newCityName.trim()) {
      addCity(newCityName.trim());
      setNewCityName('');
    }
  };

  const handleAddPredefinedCity = (cityName: string) => {
    addCity(cityName);
  };

  const toggleCountryExpansion = (countryName: string) => {
    const newExpanded = new Set(expandedCountries);
    if (newExpanded.has(countryName)) {
      newExpanded.delete(countryName);
    } else {
      newExpanded.add(countryName);
    }
    setExpandedCountries(newExpanded);
  };

  const handleCountrySelection = (countryName: string, isSelected: boolean) => {
    if (isSelected) {
      removeCountry(countryName);
    } else {
      addCountry(countryName);
      // Auto-expand the country when it's selected
      const newExpanded = new Set(expandedCountries);
      newExpanded.add(countryName);
      setExpandedCountries(newExpanded);
    }
  };

  return (
    <div className="space-y-4">
      <DestinationSummary 
        selectedCountries={selectedCountries}
        activeCountryIndex={activeCountryIndex}
        navigateToCountry={navigateToCountry}
        isCountryComplete={isCountryComplete}
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Country Selector */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Sélectionner des pays
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un pays..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto">
              {filteredCountries.map((country) => {
                const isSelected = selectedCountries.some(c => c.countryName === country.name);
                const isExpanded = expandedCountries.has(country.name);
                const selectedCountry = selectedCountries.find(c => c.countryName === country.name);
                
                return (
                  <div key={country.id} className="border rounded-lg">
                    <button
                      onClick={() => handleCountrySelection(country.name, isSelected)}
                      className={`w-full px-3 py-2 text-left border-0 rounded-t-lg transition-colors ${
                        isSelected
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-purple-300 bg-white hover:bg-purple-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{country.flagCode}</span>
                          <span className="font-medium text-sm">{country.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {isSelected && (
                            <span className="text-purple-600 text-xs">✓</span>
                          )}
                          {isSelected && country.cities && country.cities.length > 0 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCountryExpansion(country.name);
                              }}
                              className="text-purple-600 hover:text-purple-800 text-xs"
                            >
                              {isExpanded ? '▼' : '▶'}
                            </button>
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Cities list - only show when country is selected and expanded */}
                    {isSelected && isExpanded && country.cities && country.cities.length > 0 && (
                      <div className="px-3 pb-3 bg-gray-50 rounded-b-lg border-t">
                        <div className="pt-2">
                          <p className="text-xs text-gray-600 mb-2">Villes disponibles:</p>
                          <div className="grid grid-cols-2 gap-1">
                            {country.cities.map((cityName) => {
                              const isAlreadyAdded = selectedCountry?.cities.some(city => city.cityName === cityName);
                              return (
                                <button
                                  key={cityName}
                                  onClick={() => {
                                    if (!isAlreadyAdded) {
                                      // Set this country as active first
                                      const countryIndex = selectedCountries.findIndex(c => c.countryName === country.name);
                                      if (countryIndex !== -1) {
                                        setActiveCountryIndex(countryIndex);
                                        setTimeout(() => handleAddPredefinedCity(cityName), 0);
                                      }
                                    }
                                  }}
                                  className={`text-xs px-2 py-1 rounded text-left ${
                                    isAlreadyAdded
                                      ? 'bg-green-100 text-green-700 cursor-default'
                                      : 'bg-white hover:bg-purple-100 text-gray-700 hover:text-purple-700 border'
                                  }`}
                                  disabled={isAlreadyAdded}
                                >
                                  {isAlreadyAdded && <span className="mr-1">✓</span>}
                                  {cityName}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* City Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                {activeCountry ? (
                  <div className="flex items-center gap-2">
                    <span>{activeCountryData?.flagCode}</span>
                    <span>Villes - {activeCountry.countryName}</span>
                  </div>
                ) : 'Sélectionnez un pays'}
              </span>
              {activeCountry && (
                <Button
                  onClick={() => removeCountry(activeCountry.countryName)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeCountry ? (
              <>
                {/* Predefined Cities */}
                {activeCountryData?.cities && activeCountryData.cities.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Villes populaires</h4>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {activeCountryData.cities.map((cityName) => {
                        const isAlreadyAdded = activeCountry.cities.some(city => city.cityName === cityName);
                        return (
                          <Button
                            key={cityName}
                            onClick={() => handleAddPredefinedCity(cityName)}
                            variant={isAlreadyAdded ? "secondary" : "outline"}
                            size="sm"
                            disabled={isAlreadyAdded}
                            className="text-xs"
                          >
                            {isAlreadyAdded && <span className="mr-1">✓</span>}
                            {cityName}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Add Custom City */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Ajouter une ville personnalisée</h4>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Nom de la ville"
                      value={newCityName}
                      onChange={(e) => setNewCityName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddCity()}
                    />
                    <Button onClick={handleAddCity} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Cities List */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {activeCountry.cities.map((city, index) => (
                    <div key={index} className="p-3 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{city.cityName}</h4>
                        <Button
                          onClick={() => removeCity(city.cityName)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs text-gray-600">Arrivée</label>
                          <Input
                            type="date"
                            value={city.startDate}
                            onChange={(e) => updateCityDates(city.cityName, 'startDate', e.target.value)}
                            className="text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-600">Départ</label>
                          <Input
                            type="date"
                            value={city.endDate}
                            onChange={(e) => updateCityDates(city.cityName, 'endDate', e.target.value)}
                            className="text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {activeCountry.cities.length === 0 && (
                  <p className="text-gray-500 text-sm text-center py-4">
                    Aucune ville ajoutée pour ce pays
                  </p>
                )}
              </>
            ) : (
              <p className="text-gray-500 text-center py-8">
                Sélectionnez un pays pour commencer à ajouter des villes
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Navigation Button */}
      <div className="flex justify-end mt-8">
        <Button
          onClick={handleNext}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-2xl shadow-2xl border-0"
        >
          {t('planTrip.next')}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
