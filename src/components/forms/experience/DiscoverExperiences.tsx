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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center gap-4 mb-8 pt-8">
          <Button variant="ghost" onClick={onBack} className="gap-2 text-gray-600 hover:text-purple-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Découvrir des Expériences</h1>
        </div>

        {/* Search and filters */}
        <div className="mb-10 space-y-6">
          <div className="flex gap-4 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Rechercher des expériences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-3 text-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500 bg-white/80 backdrop-blur-sm"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-colors"
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((recommendation) => (
            <ExperienceCard
              key={recommendation.id}
              recommendation={recommendation}
            />
          ))}
        </div>

        {recommendations.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <Search className="h-12 w-12 text-blue-500" />
            </div>
            <p className="text-gray-600 text-xl">
              Aucune expérience trouvée pour vos critères de recherche.
            </p>
            <p className="text-gray-500 mt-2">
              Essayez de modifier vos filtres ou votre recherche.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoverExperiences;