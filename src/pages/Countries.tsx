
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Users } from 'lucide-react';
import { CountryService } from '@/services/countryService';
import { Country } from '@/data/countries';
import BrandLogo from '@/components/layout/BrandLogo';
import LanguageSelector from '@/components/ui/LanguageSelector';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Countries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    const allCountries = CountryService.getAllCountries();
    setCountries(allCountries);
    setFilteredCountries(allCountries);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = CountryService.searchCountries(searchTerm);
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  }, [searchTerm, countries]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="px-6 py-6 border-b border-white/20 bg-white/30 backdrop-blur-sm">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/">
            <BrandLogo />
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Accueil
            </Link>
            <Link to="/countries" className="text-purple-600 font-medium">
              Pays
            </Link>
            <LanguageSelector />
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-4">
            Explorez nos
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">
              Destinations
            </span>
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
            Découvrez {countries.length} pays merveilleux pour votre prochaine aventure
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Rechercher un pays..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg border-white/30 bg-white/80 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCountries.map((country) => (
            <Card key={country.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm border-white/30">
              <CardHeader className="text-center pb-4">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {country.flagCode}
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {country.name}
                </CardTitle>
                <Badge variant="secondary" className="text-sm">
                  {country.code}
                </Badge>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{country.cities.length} villes</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-purple-600 group-hover:text-white transition-colors"
                >
                  Découvrir
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCountries.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              Aucun pays trouvé pour "{searchTerm}"
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Countries;
