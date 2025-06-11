
import { Globe, Camera, Calendar, Plus, X, ArrowRight, Search } from "lucide-react";
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

  const addCountry = (countryName: string) => {
    const existingCountries = formData.destination.countries || [];
    if (existingCountries.find(c => c.countryName === countryName)) return;
    
    const newCountry = {
      countryName,
      cities: []
    };
    
    setFormData({
      ...formData,
      destination: {
        countries: [...existingCountries, newCountry]
      }
    });
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

  // Filtrer les pays selon la recherche et la région
  const filteredCountries = countriesData.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === "Tous" || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const selectedCountries = formData.destination.countries || [];

  return (
    <div className="space-y-10">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
          <Globe className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-3">Planifiez votre voyage multi-destinations</h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Découvrez le monde entier ! Sélectionnez plusieurs pays, villes et définissez les dates pour chaque étape de votre voyage
        </p>
      </div>

      {/* Filtres de recherche */}
      <div className="space-y-4 bg-gray-50 p-6 rounded-2xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Trouvez vos destinations</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      {/* Sélection des pays */}
      <div className="space-y-6">
        <h4 className="text-2xl font-bold text-gray-900 text-center">
          Choisissez vos destinations ({filteredCountries.length} pays disponibles)
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto p-4 bg-gray-50 rounded-2xl">
          {filteredCountries.map((country) => {
            const isSelected = selectedCountries.find(c => c.countryName === country.name);
            
            return (
              <button
                key={country.code}
                onClick={() => isSelected ? removeCountry(country.name) : addCountry(country.name)}
                className={`group p-4 rounded-2xl border-2 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg relative ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                    : 'border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/50'
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                    ✓
                  </div>
                )}
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {country.flagCode}
                </div>
                <div className="font-medium text-sm">{country.name}</div>
                <div className="text-xs text-gray-500 mt-1">{country.region}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Configuration des villes et dates pour chaque pays sélectionné */}
      {selectedCountries.length > 0 && (
        <div className="space-y-8">
          <h4 className="text-2xl font-bold text-gray-900 text-center">
            Configurez vos étapes
          </h4>
          
          {selectedCountries.map((selectedCountry) => {
            const countryData = countriesData.find(c => c.name === selectedCountry.countryName);
            
            return (
              <Card key={selectedCountry.countryName} className="p-6 border-2 border-blue-200 bg-blue-50/30">
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                      {countryData?.flagCode} {selectedCountry.countryName}
                      <span className="text-sm font-normal text-gray-600">({countryData?.region})</span>
                    </h5>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCountry(selectedCountry.countryName)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Sélection des villes */}
                  <div className="space-y-4">
                    <p className="font-medium text-gray-700">Sélectionnez vos villes :</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-48 overflow-y-auto">
                      {countryData?.cities?.map((city) => {
                        const isCitySelected = selectedCountry.cities.find(c => c.cityName === city);
                        
                        return (
                          <button
                            key={city}
                            onClick={() => 
                              isCitySelected 
                                ? removeCity(selectedCountry.countryName, city)
                                : addCity(selectedCountry.countryName, city)
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

                  {/* Configuration des dates pour chaque ville */}
                  {selectedCountry.cities.length > 0 && (
                    <div className="space-y-4">
                      <p className="font-medium text-gray-700 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Définissez vos dates :
                      </p>
                      
                      {selectedCountry.cities.map((city) => (
                        <div key={city.cityName} className="bg-white p-4 rounded-xl border border-gray-200">
                          <div className="flex items-center gap-4 mb-3">
                            <span className="font-medium text-gray-900">{city.cityName}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCity(selectedCountry.countryName, city.cityName)}
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
                                  selectedCountry.countryName, 
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
                                  selectedCountry.countryName, 
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
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Résumé du voyage */}
      {selectedCountries.length > 0 && (
        <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
          <CardContent className="p-6">
            <h5 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ArrowRight className="w-5 h-5 text-green-600" />
              Résumé de votre voyage ({selectedCountries.length} pays)
            </h5>
            
            <div className="space-y-3">
              {selectedCountries.map((country) => (
                <div key={country.countryName} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                  <div>
                    <span className="font-medium text-gray-900">{country.countryName}</span>
                    <span className="text-sm text-gray-600 ml-2">
                      ({country.cities.length} ville{country.cities.length > 1 ? 's' : ''})
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {country.cities.map(city => city.cityName).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DestinationStep;
