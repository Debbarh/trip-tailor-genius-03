
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
          <div className="space-y-6">
            <h2 className="text-2xl font-medium text-black">What are your interests?</h2>
            
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: 'Culture', icon: '🏛️' },
                { name: 'Food', icon: '🍽️' },
                { name: 'Nature', icon: '🌿' },
                { name: 'Art', icon: '🎨' },
                { name: 'Adventure', icon: '🏔️' },
                { name: 'Relaxation', icon: '🏖️' }
              ].map((interest) => (
                <div key={interest.name} className="flex items-center space-x-2 p-3 border rounded hover:bg-gray-50">
                  <Checkbox id={interest.name} />
                  <span className="text-lg mr-2">{interest.icon}</span>
                  <label htmlFor={interest.name} className="text-sm">{interest.name}</label>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-medium text-black">With whom?</h2>
            
            <div className="space-y-4">
              <Input placeholder="Family travelers" />
              
              <RadioGroup className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="family-young" id="family-young" />
                  <label htmlFor="family-young" className="text-sm">Family with Young Children</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="multi-generational" id="multi-generational" />
                  <label htmlFor="multi-generational" className="text-sm">Multi-generational Family</label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-medium text-black">What is your budget?</h2>
            
            <div className="space-y-4">
              <RadioGroup className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <label htmlFor="low" className="text-sm">Low</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="normal" />
                  <label htmlFor="normal" className="text-sm">Normal</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high" />
                  <label htmlFor="high" className="text-sm">High</label>
                </div>
              </RadioGroup>

              <div className="pt-4">
                <Label className="text-sm text-gray-600 mb-3 block">Cuisine preferences</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['Local cuisine', 'French cuisine', 'Italian cuisine', 'Asian cuisine'].map((cuisine) => (
                    <div key={cuisine} className="flex items-center space-x-2">
                      <Checkbox id={cuisine} />
                      <label htmlFor={cuisine} className="text-sm">{cuisine}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-medium text-black">Where do you want to stay?</h2>
            
            <div className="space-y-4">
              <Input placeholder="Hotel preference" />
              
              <div className="grid grid-cols-2 gap-3">
                {['Proximity to Attractions', 'Security', 'Atmosphere', 'Accessibility'].map((preference) => (
                  <div key={preference} className="flex items-center space-x-2">
                    <Checkbox id={preference} />
                    <label htmlFor={preference} className="text-sm">{preference}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      {renderStep()}
      
      <div className="flex justify-between mt-8 pt-6 border-t">
        <Button 
          variant="ghost" 
          onClick={handlePrevious}
          className="text-gray-600"
        >
          {currentStep === 1 ? 'Back' : 'Previous'}
        </Button>
        <Button 
          onClick={handleNext}
          className="bg-black hover:bg-gray-800 text-white"
        >
          {currentStep === 4 ? 'Get Inspired' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default BeInspiredSteps;
