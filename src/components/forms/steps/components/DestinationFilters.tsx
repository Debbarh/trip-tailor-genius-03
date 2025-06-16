
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DestinationFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  regions: string[];
}

const DestinationFilters = React.memo<DestinationFiltersProps>(({
  searchTerm,
  setSearchTerm,
  selectedRegion,
  setSelectedRegion,
  regions
}) => {
  return (
    <div className="bg-gray-50 p-1 rounded">
      <h4 className="text-xs font-semibold text-gray-900 mb-0.5">Trouvez vos destinations</h4>
      <div className="space-y-0.5">
        <div className="relative">
          <Search className="absolute left-1.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-2.5 h-2.5" />
          <Input
            type="text"
            placeholder="Rechercher un pays..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-5 h-5 text-xs py-0.5 px-1"
          />
        </div>
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="h-5 text-xs py-0.5 px-1">
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
  );
});

DestinationFilters.displayName = 'DestinationFilters';

export default DestinationFilters;
