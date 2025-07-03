import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { FilterOptions } from '@/types/beInspired';
import { activityCategories, budgetOptions, durationOptions, accommodationTypes } from '@/constants/beInspiredData';
import { travelSegments } from '@/constants/stepConfigs';

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const FilterPanel = ({ filters, onFilterChange }: FilterPanelProps) => {
  const handleActivityToggle = (activityId: string) => {
    const newActivities = filters.activities.includes(activityId)
      ? filters.activities.filter(id => id !== activityId)
      : [...filters.activities, activityId];
    
    onFilterChange({
      ...filters,
      activities: newActivities
    });
  };

  const handleAccommodationToggle = (accommodationId: string) => {
    const newAccommodations = filters.accommodationType.includes(accommodationId)
      ? filters.accommodationType.filter(id => id !== accommodationId)
      : [...filters.accommodationType, accommodationId];
    
    onFilterChange({
      ...filters,
      accommodationType: newAccommodations
    });
  };

  const clearFilters = () => {
    onFilterChange({
      activities: [],
      travelerSegment: { type: 'solo' },
      budget: null,
      duration: null,
      proximity: 50,
      accommodationType: []
    });
  };

  return (
    <Card className="p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Filtres</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearFilters}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Réinitialiser
        </Button>
      </div>

      <div className="space-y-6">
        {/* Activités et Passions */}
        <div>
          <Label className="text-base font-semibold mb-3 block">
            🎯 Activités et Passions
          </Label>
          <div className="space-y-3">
            {activityCategories.map((category) => (
              <div key={category.id} className="flex items-center space-x-3">
                <Checkbox
                  id={category.id}
                  checked={filters.activities.includes(category.id)}
                  onCheckedChange={() => handleActivityToggle(category.id)}
                />
                <Label htmlFor={category.id} className="text-sm cursor-pointer">
                  <span className="mr-2">{category.emoji}</span>
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Segment de Voyageur */}
        <div>
          <Label className="text-base font-semibold mb-3 block">
            👥 Type de Voyageur
          </Label>
          <Select 
            value={filters.travelerSegment.type}
            onValueChange={(value: any) => 
              onFilterChange({
                ...filters,
                travelerSegment: { type: value }
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez votre profil" />
            </SelectTrigger>
            <SelectContent>
              {travelSegments.map((segment) => (
                <SelectItem key={segment.id} value={segment.id}>
                  <span className="mr-2">{segment.emoji}</span>
                  {segment.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Budget */}
        <div>
          <Label className="text-base font-semibold mb-3 block">
            💰 Budget
          </Label>
          <Select 
            value={filters.budget || undefined}
            onValueChange={(value: any) => 
              onFilterChange({
                ...filters,
                budget: value === 'all' ? null : value
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Tout budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tout budget</SelectItem>
              {budgetOptions.map((budget) => (
                <SelectItem key={budget.id} value={budget.id}>
                  <span className="mr-2">{budget.emoji}</span>
                  {budget.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Durée */}
        <div>
          <Label className="text-base font-semibold mb-3 block">
            ⏱️ Durée de l'Expérience
          </Label>
          <Select 
            value={filters.duration || undefined}
            onValueChange={(value: any) => 
              onFilterChange({
                ...filters,
                duration: value === 'all' ? null : value
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Toute durée" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toute durée</SelectItem>
              {durationOptions.map((duration) => (
                <SelectItem key={duration.id} value={duration.id}>
                  <span className="mr-2">{duration.emoji}</span>
                  {duration.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Proximité */}
        <div>
          <Label className="text-base font-semibold mb-3 block">
            📍 Proximité ({filters.proximity} km)
          </Label>
          <Slider
            value={[filters.proximity]}
            onValueChange={(value) => 
              onFilterChange({
                ...filters,
                proximity: value[0]
              })
            }
            max={200}
            min={5}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>5 km</span>
            <span>200 km</span>
          </div>
        </div>

        {/* Type d'Hébergement */}
        <div>
          <Label className="text-base font-semibold mb-3 block">
            🏨 Type d'Hébergement Souhaité
          </Label>
          <div className="space-y-3">
            {accommodationTypes.map((accommodation) => (
              <div key={accommodation.id} className="flex items-center space-x-3">
                <Checkbox
                  id={accommodation.id}
                  checked={filters.accommodationType.includes(accommodation.id)}
                  onCheckedChange={() => handleAccommodationToggle(accommodation.id)}
                />
                <Label htmlFor={accommodation.id} className="text-sm cursor-pointer">
                  <span className="mr-2">{accommodation.emoji}</span>
                  {accommodation.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FilterPanel;