import { Plus, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ExperienceActionSelectorProps {
  onActionSelect: (action: 'create' | 'discover') => void;
}

const ExperienceActionSelector = ({ onActionSelect }: ExperienceActionSelectorProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-secondary/20 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Moteur de Recommandation
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Partagez vos meilleures expériences de voyage ou découvrez de nouveaux lieux recommandés par la communauté
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/50"
                onClick={() => onActionSelect('create')}>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Plus className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Recommander une Expérience</CardTitle>
              <CardDescription className="text-center">
                Partagez vos découvertes et aidez d'autres voyageurs à vivre des expériences inoubliables
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li>• Tours et programmes de voyage</li>
                <li>• Restaurants et hébergements</li>
                <li>• Activités et événements</li>
                <li>• Conseils pratiques</li>
              </ul>
              <Button className="w-full" size="lg">
                Commencer à recommander
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/50"
                onClick={() => onActionSelect('discover')}>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <Search className="h-8 w-8 text-secondary" />
              </div>
              <CardTitle className="text-xl">Découvrir des Expériences</CardTitle>
              <CardDescription className="text-center">
                Explorez les recommandations de la communauté et trouvez votre prochaine aventure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li>• Recherche par localisation</li>
                <li>• Filtres par catégories</li>
                <li>• Notes et avis détaillés</li>
                <li>• Sauvegarder vos favoris</li>
              </ul>
              <Button variant="secondary" className="w-full" size="lg">
                Explorer les recommandations
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExperienceActionSelector;