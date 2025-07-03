import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { RecommendationFilters, ExperienceType } from '@/types/recommendations';

const activityCategories = [
  'Culture', 'Gastronomie', 'Nature', 'Adventure', 'Shopping', 
  'Vie nocturne', 'Wellness', 'Histoire', 'Art', 'Sport'
];

const experienceTypes: { value: ExperienceType; label: string }[] = [
  { value: 'generated-tour', label: 'Tours/Programmes' },
  { value: 'simple-experience', label: 'Expériences simples' },
  { value: 'restaurant', label: 'Restaurants' },
  { value: 'hotel', label: 'Hébergements' },
  { value: 'activity', label: 'Activités' },
  { value: 'event', label: 'Événements' }
];

const budgetOptions = [
  { value: 'economic', label: 'Économique (€)' },
  { value: 'standard', label: 'Standard (€€)' },
  { value: 'premium', label: 'Premium (€€€)' },
  { value: 'luxury', label: 'Luxe (€€€€)' }
];

interface ExperienceFiltersProps {
  filters: RecommendationFilters;
  onFiltersChange: (filters: RecommendationFilters) => void;
}

const ExperienceFilters = ({ filters, onFiltersChange }: ExperienceFiltersProps) => {
  const updateFilter = (key: keyof RecommendationFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleCategory = (category: string) => {
    const currentCategories = filters.categories || [];
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];
    updateFilter('categories', newCategories);
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-white/30 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">Filtres de recherche</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Type d'expérience */}
          <div className="space-y-3">
            <Label className="font-semibold text-gray-700">Type d'expérience</Label>
            <Select 
              value={filters.type || ''} 
              onValueChange={(value) => updateFilter('type', value as ExperienceType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tous les types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les types</SelectItem>
                {experienceTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Budget */}
          <div className="space-y-3">
            <Label className="font-semibold text-gray-700">Budget</Label>
            <Select 
              value={filters.budget || ''} 
              onValueChange={(value) => updateFilter('budget', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tous les budgets" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les budgets</SelectItem>
                {budgetOptions.map((budget) => (
                  <SelectItem key={budget.value} value={budget.value}>
                    {budget.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Note minimale */}
          <div className="space-y-3">
            <Label className="font-semibold text-gray-700">
              Note minimale: {filters.minRating || 0}/5
            </Label>
            <Slider
              value={[filters.minRating || 0]}
              onValueChange={(value) => updateFilter('minRating', value[0])}
              max={5}
              min={0}
              step={0.5}
              className="w-full"
            />
          </div>

          {/* Localisation */}
          <div className="space-y-3">
            <Label className="font-semibold text-gray-700">Localisation</Label>
            <Select 
              value={filters.location || ''} 
              onValueChange={(value) => updateFilter('location', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Toutes les destinations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Toutes les destinations</SelectItem>
                <SelectItem value="paris">Paris</SelectItem>
                <SelectItem value="lyon">Lyon</SelectItem>
                <SelectItem value="marseille">Marseille</SelectItem>
                <SelectItem value="nice">Nice</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Catégories d'activités */}
        <div className="space-y-4">
          <Label className="font-semibold text-gray-700 text-lg">Catégories d'activités</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {activityCategories.map((category) => (
              <div key={category} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-purple-50 transition-colors">
                <Checkbox
                  id={`filter-${category}`}
                  checked={(filters.categories || []).includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
                <Label htmlFor={`filter-${category}`} className="font-medium text-gray-700 cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceFilters;