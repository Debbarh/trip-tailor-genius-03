import { Heart, Bookmark, MapPin, Star, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Recommendation } from '@/types/recommendations';

interface ExperienceCardProps {
  recommendation: Recommendation;
  onSave?: (id: string) => void;
  onLike?: (id: string) => void;
  onClick?: (recommendation: Recommendation) => void;
}

const ExperienceCard = ({ recommendation, onSave, onLike, onClick }: ExperienceCardProps) => {
  const handleCardClick = () => {
    onClick?.(recommendation);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSave?.(recommendation.id);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike?.(recommendation.id);
  };

  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={recommendation.media.photos[0] || '/placeholder.svg'}
            alt={recommendation.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 bg-white/90 hover:bg-white"
              onClick={handleSave}
            >
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 bg-white/90 hover:bg-white"
              onClick={handleLike}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          <Badge className="absolute bottom-2 left-2 bg-white/90 text-black">
            {recommendation.type}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {recommendation.title}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span className="line-clamp-1">{recommendation.location.address}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {recommendation.description}
          </p>

          <div className="flex flex-wrap gap-1">
            {recommendation.categories.activities.slice(0, 3).map((activity) => (
              <Badge key={activity} variant="secondary" className="text-xs">
                {activity}
              </Badge>
            ))}
            {recommendation.categories.activities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{recommendation.categories.activities.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{recommendation.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Heart className="h-3 w-3" />
                <span>{recommendation.likes}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-muted-foreground">
              <User className="h-3 w-3" />
              <span className="text-xs">{recommendation.authorName}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceCard;