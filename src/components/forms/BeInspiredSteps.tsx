
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Activity, Users, DollarSign, Home } from "lucide-react";

interface BeInspiredStepsProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

const BeInspiredSteps = ({ onComplete, onBack }: BeInspiredStepsProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    activities: [],
    travelWith: '',
    budget: '',
    accommodation: ''
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
          <div className="space-y-8">
            <div className="text-center mb-8">
              <Activity className="w-12 h-12 mx-auto text-purple-600 mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">What are your interests?</h2>
              <p className="text-gray-600">Sélectionnez vos activités préférées</p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {[
                { name: 'Artisanat', icon: '🎨' },
                { name: 'Culture', icon: '🏛️' },
                { name: 'Business trip', icon: '💼' },
                { name: 'cruise', icon: '🚢' },
                { name: 'culinary', icon: '🍽️' },
                { name: 'culture', icon: '🎭' },
                { name: 'eco-tourism', icon: '🌿' },
                { name: 'family', icon: '👨‍👩‍👧‍👦' },
                { name: 'golf', icon: '⛳' }
              ].map((interest) => (
                <div key={interest.name} className="flex flex-col items-center p-4 border rounded-lg hover:bg-purple-50 cursor-pointer">
                  <div className="text-4xl mb-2">{interest.icon}</div>
                  <Checkbox id={interest.name} className="mb-2" />
                  <label htmlFor={interest.name} className="text-sm font-medium cursor-pointer">{interest.name}</label>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <Users className="w-12 h-12 mx-auto text-purple-600 mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">With whom?</h2>
              <p className="text-gray-600">Qui vous accompagne dans cette aventure ?</p>
            </div>

            <div>
              <Input 
                placeholder="Family travelers"
                className="h-12 text-lg mb-6"
              />
            </div>

            <div className="space-y-4">
              <RadioGroup className="space-y-4">
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-purple-50">
                  <RadioGroupItem value="family-young" id="family-young" />
                  <label htmlFor="family-young" className="flex-1 cursor-pointer">
                    <div className="font-medium">Family with Young Children</div>
                  </label>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-purple-50">
                  <RadioGroupItem value="multi-generational" id="multi-generational" />
                  <label htmlFor="multi-generational" className="flex-1 cursor-pointer">
                    <div className="font-medium">Multi-generational Family</div>
                  </label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <DollarSign className="w-12 h-12 mx-auto text-purple-600 mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">What is your budget?</h2>
              <p className="text-gray-600">Définissez votre budget pour ce voyage</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-lg font-medium mb-4 block">Budget</Label>
                <RadioGroup className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="low" id="low" />
                    <label htmlFor="low" className="cursor-pointer">Low</label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="normal" id="normal" />
                    <label htmlFor="normal" className="cursor-pointer">Normal</label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="high" id="high" />
                    <label htmlFor="high" className="cursor-pointer">High</label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-lg font-medium mb-4 block">I want to try this cuisine</Label>
                <div className="grid grid-cols-3 gap-4">
                  {['Local cuisine', 'Moroccan cuisine', 'French cuisine', 'International cuisine', 'Italian cuisine', 'Japanese cuisine', 'Spanish cuisine', 'Asiatic cuisine', 'Lebanese Cuisine'].map((cuisine) => (
                    <div key={cuisine} className="flex items-center space-x-2">
                      <Checkbox id={cuisine} />
                      <label htmlFor={cuisine} className="text-sm cursor-pointer">{cuisine}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-lg font-medium mb-4 block">And I prefer to eat</Label>
                <div className="grid grid-cols-3 gap-4">
                  {['casual dining', 'fast food', 'fine dining', 'buffet', 'café or bistro', 'pub or bar', 'food trucks', 'Street food', 'farm to table', 'Sea food', 'vegetarian or vegan', 'barbecue'].map((preference) => (
                    <div key={preference} className="flex items-center space-x-2">
                      <Checkbox id={preference} />
                      <label htmlFor={preference} className="text-sm cursor-pointer">{preference}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <Home className="w-12 h-12 mx-auto text-purple-600 mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Where do you want to stay?</h2>
              <p className="text-gray-600">Choisissez votre type d'hébergement</p>
            </div>

            <div>
              <Input 
                placeholder="palais"
                className="h-12 text-lg mb-6"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              {['Proximity to Attractions', 'Accessibility', 'Security', 'Atmosphere'].map((preference) => (
                <div key={preference} className="flex items-center space-x-3">
                  <Checkbox id={preference} />
                  <label htmlFor={preference} className="cursor-pointer font-medium">{preference}</label>
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {renderStep()}
          
          <div className="flex justify-between mt-12 pt-8 border-t">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              className="px-6"
            >
              {currentStep === 1 ? 'Retour' : 'Previous'}
            </Button>
            <Button 
              onClick={handleNext}
              className="bg-purple-600 hover:bg-purple-700 px-6"
            >
              {currentStep === 4 ? 'Submit' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeInspiredSteps;
