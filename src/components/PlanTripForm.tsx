
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

interface TripData {
  mode: 'plan' | 'inspire';
  countries?: string[];
  cities?: { [country: string]: string[] };
  dates?: { [city: string]: { start: string; end: string } };
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
}

interface PlanTripFormProps {
  onComplete: (data: TripData) => void;
  onBack: () => void;
}

const countries = [
  "Maroc", "France", "Espagne", "Italie", "Grèce", "Turquie", "Portugal", "Égypte",
  "Tunisie", "Jordanie", "Japon", "Thaïlande", "Vietnam", "Inde", "Sri Lanka"
];

const cities = {
  "Maroc": ["Marrakech", "Fès", "Casablanca", "Rabat", "Chefchaouen", "Essaouira", "Ouarzazate"],
  "France": ["Paris", "Lyon", "Marseille", "Nice", "Bordeaux", "Toulouse", "Strasbourg"],
  "Espagne": ["Madrid", "Barcelona", "Séville", "Valence", "Grenade", "Bilbao", "Saint-Sébastien"],
  "Italie": ["Rome", "Florence", "Venise", "Milan", "Naples", "Turin", "Bologne"],
  "Grèce": ["Athènes", "Thessalonique", "Mykonos", "Santorin", "Rhodes", "Crète", "Corfou"]
};

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

const PlanTripForm = ({ onComplete, onBack }: PlanTripFormProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<TripData>({ mode: 'plan' });

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
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
            <div>
              <Label className="text-lg font-semibold mb-4 block">Sélectionnez vos pays de destination</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {countries.map(country => (
                  <div key={country} className="flex items-center space-x-2">
                    <Checkbox 
                      id={country}
                      checked={formData.countries?.includes(country) || false}
                      onCheckedChange={(checked) => {
                        const currentCountries = formData.countries || [];
                        if (checked) {
                          updateFormData({ countries: [...currentCountries, country] });
                        } else {
                          updateFormData({ countries: currentCountries.filter(c => c !== country) });
                        }
                      }}
                    />
                    <label htmlFor={country} className="text-sm font-medium cursor-pointer">
                      {country}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Label className="text-lg font-semibold mb-4 block">Choisissez vos villes pour chaque pays</Label>
            {formData.countries?.map(country => (
              <div key={country} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">{country}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {(cities[country as keyof typeof cities] || []).map(city => (
                    <div key={city} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`${country}-${city}`}
                        checked={formData.cities?.[country]?.includes(city) || false}
                        onCheckedChange={(checked) => {
                          const currentCities = formData.cities || {};
                          const countryCities = currentCities[country] || [];
                          if (checked) {
                            updateFormData({ 
                              cities: { 
                                ...currentCities, 
                                [country]: [...countryCities, city] 
                              } 
                            });
                          } else {
                            updateFormData({ 
                              cities: { 
                                ...currentCities, 
                                [country]: countryCities.filter(c => c !== city) 
                              } 
                            });
                          }
                        }}
                      />
                      <label htmlFor={`${country}-${city}`} className="text-sm font-medium cursor-pointer">
                        {city}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Label className="text-lg font-semibold mb-4 block">Profil voyageur</Label>
            
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

      case 4:
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

      case 5:
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-green-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Retour
              </Button>
              <CardTitle className="text-2xl font-bold">Plan Your Trip</CardTitle>
              <div className="text-sm">Étape {step}/5</div>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 mt-4">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
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
            
            {step < 5 ? (
              <Button 
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 flex items-center"
              >
                Suivant
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                Générer mon itinéraire
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PlanTripForm;
