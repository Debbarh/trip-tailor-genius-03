
import { Globe, Camera, Calendar, Plus, X, ArrowRight, Search, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { StepProps } from "@/types/planTrip";
import { countriesData, regions } from "@/data/countries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

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

    // Auto-focus sur le nouveau pays ajouté
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

    // Ajuster l'index actif si nécessaire
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

  const updateCityDates = (countryName: string, cityName: string, field: 'startDate' | 'endDate', value: string) => {
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
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
          <Globe className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-3">Planifiez votre voyage multi-destinations</h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Sélectionnez vos pays, configurez vos villes et définissez vos dates de voyage
        </p>
      </div>

      {/* Résumé sticky des pays sélectionnés */}
      {selectedCountries.length > 0 && (
        <div className="sticky top-0 z-10 bg-white border-2 border-blue-200 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Votre voyage ({selectedCountries.length} pays)
            </h4>
            
            {/* Navigation entre pays */}
            {selectedCountries.length > 1 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateToCountry(Math.max(0, activeCountryIndex - 1))}
                  disabled={activeCountryIndex === 0}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                <span className="text-sm text-gray-600 px-3">
                  {activeCountryIndex + 1} / {selectedCountries.length}
                </span>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateToCountry(Math.min(selectedCountries.length - 1, activeCountryIndex + 1))}
                  disabled={activeCountryIndex === selectedCountries.length - 1}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
          
          {/* Liste des pays avec navigation rapide */}
          <div className="flex flex-wrap gap-2">
            {selectedCountries.map((country, index) => {
              const countryData = countriesData.find(c => c.name === country.countryName);
              const isComplete = isCountryComplete(country);
              const isActive = index === activeCountryIndex;
              
              return (
                <button
                  key={country.countryName}
                  onClick={() => navigateToCountry(index)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all ${
                    isActive 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-200 hover:border-blue-300 bg-white'
                  }`}
                >
                  <span className="text-lg">{countryData?.flagCode}</span>
                  <span className="font-medium text-sm">{country.countryName}</span>
                  <span className="text-xs text-gray-500">
                    ({country.cities.length} ville{country.cities.length > 1 ? 's' : ''})
                  </span>
                  {isComplete && <span className="text-green-500 text-xs">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Interface principale en deux colonnes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Colonne gauche : Sélection des pays */}
        <div className="space-y-6">
          {/* Filtres de recherche */}
          <div className="bg-gray-50 p-6 rounded-2xl">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Trouvez vos destinations</h4>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Rechercher un pays..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir une région" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Liste des pays disponibles */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-gray-900">
              {searchTerm.trim() === "" 
                ? "Commencez par le Maroc"
                : `Pays disponibles (${filteredCountries.length})`
              }
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {filteredCountries.map((country) => {
                const isSelected = selectedCountries.find(c => c.countryName === country.name);
                
                return (
                  <button
                    key={country.code}
                    onClick={() => isSelected ? removeCountry(country.name) : addCountry(country.name)}
                    className={`p-4 rounded-xl border-2 text-center transition-all duration-300 hover:scale-105 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                        : 'border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/50'
                    }`}
                  >
                    <div className="text-3xl mb-2">{country.flagCode}</div>
                    <div className="font-medium">{country.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{country.region}</div>
                    {isSelected && (
                      <div className="mt-2 text-xs text-blue-600 font-medium">✓ Sélectionné</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Colonne droite : Configuration du pays actif */}
        <div className="space-y-6">
          {selectedCountries.length === 0 ? (
            <Card className="border-2 border-dashed border-gray-300">
              <CardContent className="p-8 text-center">
                <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-600 mb-2">
                  Aucun pays sélectionné
                </h4>
                <p className="text-gray-500">
                  Choisissez un pays à gauche pour commencer à configurer votre voyage
                </p>
              </CardContent>
            </Card>
          ) : activeCountry ? (
            <Card className="border-2 border-blue-200 bg-blue-50/30">
              <CardContent className="p-6 space-y-6">
                {/* En-tête du pays actif */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">
                      {countriesData.find(c => c.name === activeCountry.countryName)?.flagCode}
                    </span>
                    <div>
                      <h5 className="text-xl font-bold text-gray-900">{activeCountry.countryName}</h5>
                      <span className="text-sm text-gray-600">
                        Configuration des villes et dates
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCountry(activeCountry.countryName)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Sélection des villes */}
                <div className="space-y-4">
                  <p className="font-medium text-gray-700 flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Sélectionnez vos villes :
                  </p>
                  <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto">
                    {countriesData.find(c => c.name === activeCountry.countryName)?.cities?.map((city) => {
                      const isCitySelected = activeCountry.cities.find(c => c.cityName === city);
                      
                      return (
                        <button
                          key={city}
                          onClick={() => 
                            isCitySelected 
                              ? removeCity(activeCountry.countryName, city)
                              : addCity(activeCountry.countryName, city)
                          }
                          className={`p-3 rounded-xl border-2 text-center transition-all duration-300 hover:scale-105 ${
                            isCitySelected
                              ? 'border-blue-500 bg-blue-100 text-blue-700 shadow-md'
                              : 'border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/30'
                          }`}
                        >
                          <Camera className="w-4 h-4 mx-auto mb-2" />
                          <span className="font-medium text-sm">{city}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Configuration des dates */}
                {activeCountry.cities.length > 0 && (
                  <div className="space-y-4">
                    <p className="font-medium text-gray-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Définissez vos dates :
                    </p>
                    
                    {activeCountry.cities.map((city) => (
                      <div key={city.cityName} className="bg-white p-4 rounded-xl border border-gray-200">
                        <div className="flex items-center gap-4 mb-3">
                          <span className="font-medium text-gray-900">{city.cityName}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCity(activeCountry.countryName, city.cityName)}
                            className="text-red-500 hover:text-red-700 ml-auto"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Date d'arrivée
                            </label>
                            <Input
                              type="date"
                              value={city.startDate}
                              onChange={(e) => updateCityDates(
                                activeCountry.countryName, 
                                city.cityName, 
                                'startDate', 
                                e.target.value
                              )}
                              className="w-full"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Date de départ
                            </label>
                            <Input
                              type="date"
                              value={city.endDate}
                              onChange={(e) => updateCityDates(
                                activeCountry.countryName, 
                                city.cityName, 
                                'endDate', 
                                e.target.value
                              )}
                              className="w-full"
                              min={city.startDate}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Indicateur de progression */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Progression: {activeCountry.cities.length} ville{activeCountry.cities.length > 1 ? 's' : ''} sélectionnée{activeCountry.cities.length > 1 ? 's' : ''}
                    </span>
                    {isCountryComplete(activeCountry) && (
                      <span className="text-green-600 font-medium flex items-center gap-1">
                        <span>✓</span> Configuration terminée
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DestinationStep;
