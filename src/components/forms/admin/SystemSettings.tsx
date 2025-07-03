import { useState } from 'react';
import { Cog, Database, Shield, Plus, Edit, Trash2, Globe, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { countriesData, Country } from '@/data/countries';

const SystemSettings = () => {
  const [countries, setCountries] = useState<Country[]>(countriesData);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [newCountry, setNewCountry] = useState({
    name: '',
    code: '',
    flagCode: '',
    region: '',
    cities: [] as string[]
  });

  const [newCity, setNewCity] = useState('');

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCountry = () => {
    if (newCountry.name && newCountry.code && newCountry.flagCode && newCountry.region) {
      const country: Country = {
        id: `${countries.length + 1}`,
        name: newCountry.name,
        code: newCountry.code,
        flagCode: newCountry.flagCode,
        region: newCountry.region,
        cities: newCountry.cities
      };
      setCountries([...countries, country]);
      setNewCountry({ name: '', code: '', flagCode: '', region: '', cities: [] });
      setIsAddDialogOpen(false);
    }
  };

  const handleEditCountry = () => {
    if (selectedCountry) {
      setCountries(countries.map(c => 
        c.id === selectedCountry.id ? selectedCountry : c
      ));
      setIsEditDialogOpen(false);
      setSelectedCountry(null);
    }
  };

  const handleDeleteCountry = (id: string) => {
    setCountries(countries.filter(c => c.id !== id));
  };

  const addCityToNewCountry = () => {
    if (newCity.trim()) {
      setNewCountry({
        ...newCountry,
        cities: [...newCountry.cities, newCity.trim()]
      });
      setNewCity('');
    }
  };

  const removeCityFromNewCountry = (index: number) => {
    setNewCountry({
      ...newCountry,
      cities: newCountry.cities.filter((_, i) => i !== index)
    });
  };

  const addCityToSelectedCountry = () => {
    if (newCity.trim() && selectedCountry) {
      setSelectedCountry({
        ...selectedCountry,
        cities: [...(selectedCountry.cities || []), newCity.trim()]
      });
      setNewCity('');
    }
  };

  const removeCityFromSelectedCountry = (index: number) => {
    if (selectedCountry) {
      setSelectedCountry({
        ...selectedCountry,
        cities: selectedCountry.cities?.filter((_, i) => i !== index) || []
      });
    }
  };

  const CountryForm = ({ country, isEdit = false }: { country: any, isEdit?: boolean }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nom du pays</Label>
          <Input
            id="name"
            value={country.name}
            onChange={(e) => isEdit 
              ? setSelectedCountry({...selectedCountry!, name: e.target.value})
              : setNewCountry({...newCountry, name: e.target.value})
            }
            placeholder="France"
          />
        </div>
        <div>
          <Label htmlFor="code">Code pays</Label>
          <Input
            id="code"
            value={country.code}
            onChange={(e) => isEdit 
              ? setSelectedCountry({...selectedCountry!, code: e.target.value})
              : setNewCountry({...newCountry, code: e.target.value})
            }
            placeholder="FR"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="flagCode">Emoji drapeau</Label>
          <Input
            id="flagCode"
            value={country.flagCode}
            onChange={(e) => isEdit 
              ? setSelectedCountry({...selectedCountry!, flagCode: e.target.value})
              : setNewCountry({...newCountry, flagCode: e.target.value})
            }
            placeholder="🇫🇷"
          />
        </div>
        <div>
          <Label htmlFor="region">Région</Label>
          <Input
            id="region"
            value={country.region}
            onChange={(e) => isEdit 
              ? setSelectedCountry({...selectedCountry!, region: e.target.value})
              : setNewCountry({...newCountry, region: e.target.value})
            }
            placeholder="Europe"
          />
        </div>
      </div>

      <div>
        <Label>Villes</Label>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              placeholder="Ajouter une ville"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  isEdit ? addCityToSelectedCountry() : addCityToNewCountry();
                }
              }}
            />
            <Button 
              type="button"
              onClick={isEdit ? addCityToSelectedCountry : addCityToNewCountry}
              size="sm"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {country.cities?.map((city: string, index: number) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {city}
                <button
                  type="button"
                  onClick={() => isEdit ? removeCityFromSelectedCountry(index) : removeCityFromNewCountry(index)}
                  className="ml-1 hover:text-red-600"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-2">
          Paramètres Système
        </h2>
        <p className="text-gray-600">Configuration technique de la plateforme</p>
      </div>

      <Tabs defaultValue="countries" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="countries">Pays & Villes</TabsTrigger>
          <TabsTrigger value="system">Configuration</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>

        <TabsContent value="countries">
          <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Gestion des Pays et Villes
                </CardTitle>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Ajouter un pays
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Ajouter un nouveau pays</DialogTitle>
                    </DialogHeader>
                    <CountryForm country={newCountry} />
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Annuler
                      </Button>
                      <Button onClick={handleAddCountry}>
                        Ajouter
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="flex items-center gap-4">
                <Input
                  placeholder="Rechercher un pays ou une région..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-md"
                />
                <Badge variant="outline">{filteredCountries.length} pays</Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pays</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Région</TableHead>
                      <TableHead>Villes</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCountries.map((country) => (
                      <TableRow key={country.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{country.flagCode}</span>
                            {country.name}
                          </div>
                        </TableCell>
                        <TableCell>{country.code}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{country.region}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {country.cities?.length || 0} villes
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Dialog open={isEditDialogOpen && selectedCountry?.id === country.id} onOpenChange={setIsEditDialogOpen}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedCountry(country)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Modifier {selectedCountry?.name}</DialogTitle>
                                </DialogHeader>
                                {selectedCountry && <CountryForm country={selectedCountry} isEdit />}
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline" onClick={() => {
                                    setIsEditDialogOpen(false);
                                    setSelectedCountry(null);
                                  }}>
                                    Annuler
                                  </Button>
                                  <Button onClick={handleEditCountry}>
                                    Sauvegarder
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteCountry(country.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cog className="h-5 w-5" />
                Configuration Système
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Paramètres système avancés</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Paramètres de Sécurité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Configuration sécurité</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;