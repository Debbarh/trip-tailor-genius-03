
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PlanTripStepsProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

const PlanTripSteps = ({ onComplete, onBack }: PlanTripStepsProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: { country: '', city: '', dates: '' },
    travelWith: '',
    budget: '',
    accommodation: { type: '', preferences: [] },
    activities: []
  });

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete({ mode: 'plan', ...formData });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-medium">Destination</h2>
            
            <div className="space-y-4">
              <div>
                <Label>Pays</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un pays" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="france">France</SelectItem>
                    <SelectItem value="italie">Italie</SelectItem>
                    <SelectItem value="espagne">Espagne</SelectItem>
                    <SelectItem value="maroc">Maroc</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Ville</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une ville" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paris">Paris</SelectItem>
                    <SelectItem value="lyon">Lyon</SelectItem>
                    <SelectItem value="marseille">Marseille</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Dates</Label>
                <Input placeholder="01/01/2025 - 07/01/2025" />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-medium">Avec qui?</h2>
            
            <RadioGroup className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="solo" id="solo" />
                <Label htmlFor="solo">Solo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="couple" id="couple" />
                <Label htmlFor="couple">En couple</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="famille" id="famille" />
                <Label htmlFor="famille">En famille</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="amis" id="amis" />
                <Label htmlFor="amis">Entre amis</Label>
              </div>
            </RadioGroup>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-medium">Budget</h2>
            
            <RadioGroup className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="economique" id="economique" />
                <Label htmlFor="economique">Économique</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="moyen" id="moyen" />
                <Label htmlFor="moyen">Moyen</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="confort" id="confort" />
                <Label htmlFor="confort">Confort</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="luxe" id="luxe" />
                <Label htmlFor="luxe">Luxe</Label>
              </div>
            </RadioGroup>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-medium">Hébergement</h2>
            
            <div className="space-y-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Type d'hébergement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hotel">Hôtel</SelectItem>
                  <SelectItem value="appartement">Appartement</SelectItem>
                  <SelectItem value="maison">Maison</SelectItem>
                  <SelectItem value="auberge">Auberge</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="space-y-2">
                <Label>Préférences</Label>
                {['Centre-ville', 'Vue mer', 'Parking', 'Wifi'].map((pref) => (
                  <div key={pref} className="flex items-center space-x-2">
                    <Checkbox id={pref} />
                    <Label htmlFor={pref}>{pref}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-medium">Activités</h2>
            
            <div className="space-y-2">
              {['Culture', 'Gastronomie', 'Nature', 'Sport', 'Shopping', 'Détente'].map((activity) => (
                <div key={activity} className="flex items-center space-x-2">
                  <Checkbox id={activity} />
                  <Label htmlFor={activity}>{activity}</Label>
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
    <div className="max-w-md mx-auto p-6 bg-white">
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-2">Étape {currentStep} sur 5</div>
        <div className="w-full bg-gray-200 h-1">
          <div 
            className="bg-black h-1 transition-all"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>

      {renderStep()}
      
      <div className="flex justify-between mt-8">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
        >
          {currentStep === 1 ? 'Retour' : 'Précédent'}
        </Button>
        <Button 
          onClick={handleNext}
          className="bg-black text-white hover:bg-gray-800"
        >
          {currentStep === 5 ? 'Créer l\'itinéraire' : 'Suivant'}
        </Button>
      </div>
    </div>
  );
};

export default PlanTripSteps;
