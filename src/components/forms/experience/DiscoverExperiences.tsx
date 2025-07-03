import { useState } from 'react';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ExperienceCard from './components/ExperienceCard';
import ExperienceFilters from './components/ExperienceFilters';
import { Recommendation, RecommendationFilters } from '@/types/recommendations';

// Mock data - à remplacer par des données Supabase
const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    title: 'Tour gastronomique de Paris',
    description: 'Découvrez les meilleurs restaurants cachés du Marais avec un guide local passionné.',
    type: 'generated-tour',
    location: {
      address: 'Le Marais, Paris, France',
      coordinates: { latitude: 48.8566, longitude: 2.3522 }
    },
    categories: {
      activities: ['gastronomie', 'culture'],
      travelerType: ['couple', 'solo'],
      budget: 'standard'
    },
    media: {
      photos: ['/placeholder.svg'],
      videos: []
    },
    rating: 4.8,
    practicalTips: ['Réservez à l\'avance', 'Portez des chaussures confortables'],
    authorId: '1',
    authorName: 'Marie Dupont',
    createdAt: '2024-01-15',
    likes: 124,
    saves: 67,
    comments: []
  }
];

interface DiscoverExperiencesProps {
  onBack: () => void;
}

const DiscoverExperiences = ({ onBack }: DiscoverExperiencesProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<RecommendationFilters>({});
  const [recommendations] = useState<Recommendation[]>(mockRecommendations);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-secondary/20">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center gap-4 mb-8 pt-4">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
          <h1 className="text-2xl font-bold">Découvrir des Expériences</h1>
        </div>

        {/* Search and filters */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher des expériences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Filtres
            </Button>
          </div>

          {showFilters && (
            <ExperienceFilters
              filters={filters}
              onFiltersChange={setFilters}
            />
          )}
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((recommendation) => (
            <ExperienceCard
              key={recommendation.id}
              recommendation={recommendation}
            />
          ))}
        </div>

        {recommendations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Aucune expérience trouvée pour vos critères de recherche.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoverExperiences;