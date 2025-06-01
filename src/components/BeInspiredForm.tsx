
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

interface TripData {
  mode: 'plan' | 'inspire';
  travelerProfile?: {
    segment: string;
    subSegment: string;
    groupComposition: string;
  };
  preferences?: {
    accommodation: string;
    ambiance: string;
    gastronomy: string[];
    experiences: string[];
  };
  inspiration?: {
    budget: string;
    duration: string;
    season: string;
    interests: string;
  };
}

interface BeInspiredFormProps {
  onComplete: (data: TripData) => void;
  onBack: () => void;
}

const travelerSegments = {
  "Senior": ["Retraité actif", "Voyage de luxe", "Croisière", "Circuit culturel"],
  "Junior": ["Backpacker", "Étudiant", "Digital nomad", "Aventurier"],
  "Famille": ["Famille avec enfants", "Famille recomposée", "Grands-parents et petits-enfants"],
  "Couple": ["Lune de miel", "Anniversaire", "Voyage romantique", "Week-end"],
  "Groupe": ["Amis", "Voyage d'affaires", "Événement spécial", "Club/Association"]
};

const accommodationTypes = [
  "Hôtel", "Riad", "Maison d'hôtes", "Villa", "Appartement", "Auberge", "Camping", "Resort"
];

const ambianceTypes = [
  "Luxe", "Authentique", "Décontractée", "Aventure", "Romantique", "Familiale", "Culturelle", "Nature"
];

const gastronomyOptions = [
  "Cuisine locale", "Gastronomie fine", "Street food", "Végétarien/Vegan", "Halal", "Sans gluten", "Cours de cuisine"
];

const experienceTypes = [
  "Trekking", "Culture", "Gastronomie", "Bien-être", "Aventure", "Shopping", "Photographie", "Art", "Musique", "Histoire"
];

const budgetRanges = [
  "Économique (< 50€/jour)", 
  "Moyen (50-100€/jour)", 
  "Confort (100-200€/jour)", 
  "Luxe (> 200€/jour)"
];

const durations = [
  "Week-end (2-3 jours)",
  "Court séjour (4-7 jours)",
  "Séjour moyen (1-2 semaines)",
  "Long voyage (3+ semaines)"
];

const seasons = [
  "Printemps", "Été", "Automne", "Hiver", "Peu importe"
];

const BeInspiredForm = ({ onComplete, onBack }: BeInspiredFormProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<TripData>({ mode: 'inspire' });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    onComplete(formData);
  };

  const updateFormData = (updates: Partial<TripData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <Label className="text-lg font-semibold mb-4 block">Parlez-nous de vous</Label>
            
            <div>
              <Label className="text-base font-medium mb-2 block">Segment principal</Label>
              <Select 
                value={formData.travelerProfile?.segment || ""} 
                onValueChange={(value) => updateFormData({ 
                  travelerProfile: { ...formData.travelerProfile, segment: value } as any 
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisissez votre segment" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(travelerSegments).map(segment => (
                    <SelectItem key={segment} value={segment}>{segment}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.travelerProfile?.segment && (
              <div>
                <Label className="text-base font-medium mb-2 block">Sous-segment spécifique</Label>
                <Select 
                  value={formData.travelerProfile?.subSegment || ""} 
                  onValueChange={(value) => updateFormData({ 
                    travelerProfile: { ...formData.travelerProfile, subSegment: value } as any 
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Précisez votre profil" />
                  </SelectTrigger>
                  <SelectContent>
                    {travelerSegments[formData.travelerProfile.segment as keyof typeof travelerSegments].map(subSegment => (
                      <SelectItem key={subSegment} value={subSegment}>{subSegment}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label className="text-base font-medium mb-2 block">Composition du groupe</Label>
              <Input 
                placeholder="Ex: 2 adultes, 1 enfant de 8 ans"
                value={formData.travelerProfile?.groupComposition || ""}
                onChange={(e) => updateFormData({ 
                  travelerProfile: { ...formData.travelerProfile, groupComposition: e.target.value } as any 
                })}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Label className="text-lg font-semibold mb-4 block">Paramètres de voyage</Label>
            
            <div>
              <Label className="text-base font-medium mb-2 block">Budget approximatif</Label>
              <Select 
                value={formData.inspiration?.budget || ""} 
                onValueChange={(value) => updateFormData({ 
                  inspiration: { ...formData.inspiration, budget: value } as any 
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisissez votre budget" />
                </SelectTrigger>
                <SelectContent>
                  {budgetRanges.map(budget => (
                    <SelectItem key={budget} value={budget}>{budget}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium mb-2 block">Durée du voyage</Label>
              <Select 
                value={formData.inspiration?.duration || ""} 
                onValueChange={(value) => updateFormData({ 
                  inspiration: { ...formData.inspiration, duration: value } as any 
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisissez la durée" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map(duration => (
                    <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium mb-2 block">Saison préférée</Label>
              <Select 
                value={formData.inspiration?.season || ""} 
                onValueChange={(value) => updateFormData({ 
                  inspiration: { ...formData.inspiration, season: value } as any 
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisissez la saison" />
                </SelectTrigger>
                <SelectContent>
                  {seasons.map(season => (
                    <SelectItem key={season} value={season}>{season}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium mb-2 block">Décrivez vos centres d'intérêt</Label>
              <Textarea 
                placeholder="Ex: J'adore l'art contemporain, les marchés locaux, la randonnée en montagne..."
                value={formData.inspiration?.interests || ""}
                onChange={(e) => updateFormData({ 
                  inspiration: { ...formData.inspiration, interests: e.target.value } as any 
                })}
                rows={4}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Label className="text-lg font-semibold mb-4 block">Préférences de séjour</Label>
            
            <div>
              <Label className="text-base font-medium mb-2 block">Type d'hébergement</Label>
              <Select 
                value={formData.preferences?.accommodation || ""} 
                onValueChange={(value) => updateFormData({ 
                  preferences: { ...formData.preferences, accommodation: value } as any 
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisissez votre hébergement" />
                </SelectTrigger>
                <SelectContent>
                  {accommodationTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium mb-2 block">Ambiance recherchée</Label>
              <Select 
                value={formData.preferences?.ambiance || ""} 
                onValueChange={(value) => updateFormData({ 
                  preferences: { ...formData.preferences, ambiance: value } as any 
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisissez l'ambiance" />
                </SelectTrigger>
                <SelectContent>
                  {ambianceTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">Préférences gastronomiques</Label>
              <div className="grid grid-cols-2 gap-3">
                {gastronomyOptions.map(option => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox 
                      id={option}
                      checked={formData.preferences?.gastronomy?.includes(option) || false}
                      onCheckedChange={(checked) => {
                        const currentGastronomy = formData.preferences?.gastronomy || [];
                        if (checked) {
                          updateFormData({ 
                            preferences: { 
                              ...formData.preferences, 
                              gastronomy: [...currentGastronomy, option] 
                            } as any 
                          });
                        } else {
                          updateFormData({ 
                            preferences: { 
                              ...formData.preferences, 
                              gastronomy: currentGastronomy.filter(g => g !== option) 
                            } as any 
                          });
                        }
                      }}
                    />
                    <label htmlFor={option} className="text-sm font-medium cursor-pointer">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Label className="text-lg font-semibold mb-4 block">Types d'expériences souhaitées</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {experienceTypes.map(experience => (
                <div key={experience} className="flex items-center space-x-2">
                  <Checkbox 
                    id={experience}
                    checked={formData.preferences?.experiences?.includes(experience) || false}
                    onCheckedChange={(checked) => {
                      const currentExperiences = formData.preferences?.experiences || [];
                      if (checked) {
                        updateFormData({ 
                          preferences: { 
                            ...formData.preferences, 
                            experiences: [...currentExperiences, experience] 
                          } as any 
                        });
                      } else {
                        updateFormData({ 
                          preferences: { 
                            ...formData.preferences, 
                            experiences: currentExperiences.filter(e => e !== experience) 
                          } as any 
                        });
                      }
                    }}
                  />
                  <label htmlFor={experience} className="text-sm font-medium cursor-pointer">
                    {experience}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-pink-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Retour
              </Button>
              <CardTitle className="text-2xl font-bold">Be Inspired</CardTitle>
              <div className="text-sm">Étape {step}/4</div>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 mt-4">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>

          <div className="flex justify-between p-8 pt-0">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={step === 1}
              className="flex items-center"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Précédent
            </Button>
            
            {step < 4 ? (
              <Button 
                onClick={handleNext}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 flex items-center"
              >
                Suivant
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                Découvrir ma destination
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BeInspiredForm;
