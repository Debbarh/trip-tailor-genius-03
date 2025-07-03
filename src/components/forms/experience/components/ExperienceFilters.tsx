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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filtres</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Type d'expérience */}
          <div className="space-y-3">
            <Label className="font-medium">Type d'expérience</Label>
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
            <Label className="font-medium">Budget</Label>
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
            <Label className="font-medium">
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
            <Label className="font-medium">Localisation</Label>
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
        <div className="space-y-3">
          <Label className="font-medium">Catégories d'activités</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {activityCategories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`filter-${category}`}
                  checked={(filters.categories || []).includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
                <Label htmlFor={`filter-${category}`} className="text-sm">
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