
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BeInspiredStepsProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

const BeInspiredSteps = ({ onComplete, onBack }: BeInspiredStepsProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    interests: [],
    travelWith: '',
    budget: '',
    preferences: ''
  });

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete({ mode: 'inspire', ...formData });
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
            <h2 className="text-xl font-medium">Vos intérêts</h2>
            
            <div className="space-y-2">
              {['Culture', 'Gastronomie', 'Nature', 'Aventure', 'Détente', 'Art'].map((interest) => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox id={interest} />
                  <Label htmlFor={interest}>{interest}</Label>
                </div>
              ))}
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

            <div className="pt-4">
              <Label className="mb-3 block">Préférences culinaires</Label>
              <div className="space-y-2">
                {['Cuisine locale', 'Cuisine française', 'Cuisine italienne', 'Cuisine asiatique'].map((cuisine) => (
                  <div key={cuisine} className="flex items-center space-x-2">
                    <Checkbox id={cuisine} />
                    <Label htmlFor={cuisine}>{cuisine}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-medium">Préférences</h2>
            
            <div className="space-y-4">
              <div>
                <Label>Type d'hébergement préféré</Label>
                <Input placeholder="ex: Hôtel, Appartement..." />
              </div>
              
              <div>
                <Label>Décrivez votre voyage idéal</Label>
                <Textarea 
                  placeholder="Dites-nous ce qui vous fait rêver..."
                  rows={4}
                />
              </div>
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
        <div className="text-sm text-gray-500 mb-2">Étape {currentStep} sur 4</div>
        <div className="w-full bg-gray-200 h-1">
          <div 
            className="bg-black h-1 transition-all"
            style={{ width: `${(currentStep / 4) * 100}%` }}
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
          {currentStep === 4 ? 'Obtenir des suggestions' : 'Suivant'}
        </Button>
      </div>
    </div>
  );
};

export default BeInspiredSteps;
