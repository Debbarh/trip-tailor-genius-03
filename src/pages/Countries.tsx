
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Search, MapPin, Users, Plus, Edit, Trash, Settings, Loader2 } from 'lucide-react';
import { countryApiService, Country, CountryFormData } from '@/services/countryService';
import BrandLogo from '@/components/layout/BrandLogo';
import LanguageSelector from '@/components/ui/LanguageSelector';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const regions = ['Europe', 'Asie', 'Afrique', 'Amérique du Nord', 'Amérique du Sud', 'Océanie'];

const Countries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();

  const form = useForm<CountryFormData>({
    defaultValues: {
      name: '',
      code: '',
      flag_code: '',
      region: ''
    }
  });

  // Load countries on component mount
  useEffect(() => {
    loadCountries();
  }, []);

  // Real-time search
  useEffect(() => {
    const searchCountries = async () => {
      if (searchTerm) {
        try {
          const results = await countryApiService.searchCountries(searchTerm);
          setCountries(results);
        } catch (error) {
          console.error('Search error:', error);
        }
      } else {
        loadCountries();
      }
    };

    const timeoutId = setTimeout(searchCountries, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const loadCountries = async () => {
    try {
      setIsLoading(true);
      const data = await countryApiService.getAllCountries();
      setCountries(data);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les pays",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCountry = async (data: CountryFormData) => {
    try {
      setIsSubmitting(true);
      const newCountry = await countryApiService.createCountry(data);
      setCountries(prev => [...prev, newCountry]);
      toast({
        title: "Pays ajouté",
        description: `${data.name} a été ajouté avec succès.`,
      });
      setIsAddDialogOpen(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur lors de l'ajout",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditCountry = async (data: CountryFormData) => {
    if (!editingCountry?.id) return;
    
    try {
      setIsSubmitting(true);
      const updatedCountry = await countryApiService.updateCountry(editingCountry.id, data);
      setCountries(prev => 
        prev.map(country => 
          country.id === editingCountry.id ? updatedCountry : country
        )
      );
      toast({
        title: "Pays modifié",
        description: `${data.name} a été modifié avec succès.`,
      });
      setIsEditDialogOpen(false);
      setEditingCountry(null);
      form.reset();
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur lors de la modification",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCountry = async (country: Country) => {
    if (!country.id) return;
    
    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${country.name} ?`)) {
      return;
    }

    try {
      await countryApiService.deleteCountry(country.id);
      setCountries(prev => prev.filter(c => c.id !== country.id));
      toast({
        title: "Pays supprimé",
        description: `${country.name} a été supprimé avec succès.`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur lors de la suppression",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (country: Country) => {
    setEditingCountry(country);
    form.reset({
      name: country.name,
      code: country.code,
      flag_code: country.flag_code,
      region: country.region || ''
    });
    setIsEditDialogOpen(true);
  };

  const CountryForm = ({ onSubmit, submitLabel }: { onSubmit: (data: CountryFormData) => void, submitLabel: string }) => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          rules={{ required: "Le nom est requis" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du pays</FormLabel>
              <FormControl>
                <Input placeholder="France" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="code"
          rules={{ 
            required: "Le code est requis",
            pattern: {
              value: /^[A-Z]{2,3}$/,
              message: "Le code doit contenir 2-3 lettres majuscules"
            }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code pays (ISO)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="FR" 
                  maxLength={3} 
                  {...field} 
                  onChange={(e) => field.onChange(e.target.value.toUpperCase())} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="flag_code"
          rules={{ required: "Le drapeau est requis" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emoji drapeau</FormLabel>
              <FormControl>
                <Input placeholder="🇫🇷" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Région (optionnel)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une région" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {submitLabel}...
            </>
          ) : (
            submitLabel
          )}
        </Button>
      </form>
    </Form>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Chargement des pays...</span>
      </div>
    );
  }

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
            <Link to="/admin" className="text-gray-700 hover:text-purple-600 transition-colors font-medium flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Admin
            </Link>
            <LanguageSelector />
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-light text-gray-900 mb-2">
                Gestion des
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">
                  Pays
                </span>
              </h1>
              <p className="text-xl text-gray-700">
                {countries.length} pays dans la base de données
              </p>
            </div>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un pays
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter un nouveau pays</DialogTitle>
                </DialogHeader>
                <CountryForm onSubmit={handleAddCountry} submitLabel="Ajouter" />
              </DialogContent>
            </Dialog>
          </div>

          {/* Search */}
          <div className="relative max-w-md mb-6">
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

        {/* Countries Table */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/30">
          <CardHeader>
            <CardTitle>Liste des pays</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Drapeau</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Région</TableHead>
                  <TableHead>Utilisateurs</TableHead>
                  <TableHead>Créé le</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {countries.map((country) => (
                  <TableRow key={country.id}>
                    <TableCell>
                      <span className="text-2xl">{country.flag_code}</span>
                    </TableCell>
                    <TableCell className="font-medium">{country.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{country.code}</Badge>
                    </TableCell>
                    <TableCell>
                      {country.region && <Badge variant="outline">{country.region}</Badge>}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-500" />
                        {country.user_count || 0}
                      </div>
                    </TableCell>
                    <TableCell>
                      {country.created ? new Date(country.created).toLocaleDateString() : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(country)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteCountry(country)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {countries.length === 0 && (
              <div className="text-center py-8">
                <p className="text-xl text-gray-600">
                  {searchTerm ? `Aucun pays trouvé pour "${searchTerm}"` : 'Aucun pays enregistré'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier le pays</DialogTitle>
            </DialogHeader>
            <CountryForm onSubmit={handleEditCountry} submitLabel="Modifier" />
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Countries;
