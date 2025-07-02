
import React from 'react';
import { CountryWithCities } from '@/types/planTrip';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, MapPin } from 'lucide-react';

interface DestinationSummaryProps {
  selectedCountries: CountryWithCities[];
  activeCountryIndex: number;
  navigateToCountry: (index: number) => void;
  isCountryComplete: (country: CountryWithCities) => boolean;
}

const DestinationSummary = ({
  selectedCountries,
  activeCountryIndex,
  navigateToCountry,
  isCountryComplete
}: DestinationSummaryProps) => {
  if (selectedCountries.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <MapPin className="w-5 h-5" />
        Pays sélectionnés
      </h3>
      <div className="flex flex-wrap gap-2">
        {selectedCountries.map((country, index) => (
          <Button
            key={index}
            onClick={() => navigateToCountry(index)}
            variant={index === activeCountryIndex ? "default" : "outline"}
            size="sm"
            className={`flex items-center gap-2 ${
              index === activeCountryIndex 
                ? 'bg-purple-600 hover:bg-purple-700' 
                : 'hover:bg-purple-50'
            }`}
          >
            {isCountryComplete(country) ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <Circle className="w-4 h-4" />
            )}
            {country.countryName}
            <span className="text-xs opacity-70">
              ({country.cities.length} ville{country.cities.length > 1 ? 's' : ''})
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DestinationSummary;
