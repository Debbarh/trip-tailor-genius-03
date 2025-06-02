
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
            <h2 className="text-2xl font-medium text-black">Where would you like to go?</h2>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-gray-600">Country</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="france">France</SelectItem>
                    <SelectItem value="italy">Italy</SelectItem>
                    <SelectItem value="spain">Spain</SelectItem>
                    <SelectItem value="japan">Japan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm text-gray-600">City</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paris">Paris</SelectItem>
                    <SelectItem value="lyon">Lyon</SelectItem>
                    <SelectItem value="marseille">Marseille</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm text-gray-600">Travel dates</Label>
                <Input 
                  type="text" 
                  placeholder="06/02/2025 - 06/02/2025"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-medium text-black">With whom?</h2>
            
            <div className="space-y-4">
              <Input placeholder="Solo traveler" />
              
              <RadioGroup className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="young-adult" id="young-adult" />
                  <label htmlFor="young-adult" className="text-sm">Young Adult Solo</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="adult-solo" id="adult-solo" />
                  <label htmlFor="adult-solo" className="text-sm">Adult Solo</label>
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
              <Input placeholder="Hotel type preference" />
              
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

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-medium text-black">What are your interests?</h2>
            
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: 'Culture', icon: '🏛️' },
                { name: 'Food', icon: '🍽️' },
                { name: 'Nature', icon: '🌿' },
                { name: 'Art', icon: '🎨' },
                { name: 'History', icon: '📚' },
                { name: 'Shopping', icon: '🛍️' }
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
          {currentStep === 5 ? 'Create Itinerary' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default PlanTripSteps;
