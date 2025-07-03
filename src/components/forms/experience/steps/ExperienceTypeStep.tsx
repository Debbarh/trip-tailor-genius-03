import { useState } from 'react';
import { MapPin, Utensils, Hotel, Calendar, Route } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExperienceType } from '@/types/recommendations';

const experienceTypes = [
  {
    type: 'generated-tour' as ExperienceType,
    icon: Route,
    title: 'Tour/Programme',
    description: 'Un programme de voyage complet généré par la plateforme'
  },
  {
    type: 'activity' as ExperienceType,
    icon: Calendar,
    title: 'Activité',
    description: 'Une activité spécifique ou un événement'
  },
  {
    type: 'restaurant' as ExperienceType,
    icon: Utensils,
    title: 'Restaurant',
    description: 'Un restaurant ou une expérience gastronomique'
  },
  {
    type: 'hotel' as ExperienceType,
    icon: Hotel,
    title: 'Hébergement',
    description: 'Un hôtel, B&B ou autre type de logement'
  },
  {
    type: 'simple-experience' as ExperienceType,
    icon: MapPin,
    title: 'Lieu/Expérience',
    description: 'Un lieu d\'intérêt ou une expérience simple'
  }
];

interface ExperienceTypeStepProps {
  data: { type?: ExperienceType };
  onNext: (data: { type: ExperienceType }) => void;
}

const ExperienceTypeStep = ({ data, onNext }: ExperienceTypeStepProps) => {
  const [selectedType, setSelectedType] = useState<ExperienceType | undefined>(data.type);

  const handleSubmit = () => {
    if (selectedType) {
      onNext({ type: selectedType });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Quel type d'expérience souhaitez-vous recommander ?</h2>
        <p className="text-muted-foreground">
          Choisissez le type qui correspond le mieux à votre recommandation
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {experienceTypes.map((type) => {
          const Icon = type.icon;
          return (
            <Card
              key={type.type}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedType === type.type
                  ? 'border-primary bg-primary/5'
                  : 'hover:border-primary/50'
              }`}
              onClick={() => setSelectedType(type.type)}
            >
              <CardHeader className="text-center pb-2">
                <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                  selectedType === type.type ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}>
                  <Icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{type.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-sm">
                  {type.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={handleSubmit} 
          disabled={!selectedType}
          size="lg"
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default ExperienceTypeStep;