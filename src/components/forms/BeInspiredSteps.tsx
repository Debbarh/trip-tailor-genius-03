
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
    interests: [],
    travelWith: '',
    budget: '',
    accommodation: { type: '', preferences: [] }
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

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStepIndicator = () => (
    <div className="w-full mb-8">
      <div className="text-right mb-2">
        <span className="text-sm text-gray-600">{currentStep} of 4 Completed</span>
      </div>
      <div className="w-full bg-gray-200 h-2 mb-6">
        <div 
          className="bg-[#2BBBD4] h-2 transition-all duration-300"
          style={{ width: `${(currentStep / 4) * 100}%` }}
        />
      </div>
      <div className="flex justify-between">
        {['Activities', 'Travel With', 'Budget', 'Accommodation'].map((step, index) => (
          <div 
            key={step}
            className={`flex-1 px-4 py-3 text-center rounded-full mx-1 text-sm font-medium ${
              index < currentStep 
                ? 'bg-[#2BBBD4] text-white' 
                : 'bg-gray-300 text-gray-600'
            }`}
          >
            ✓ {step}
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">What are your interests?</h2>
            
            <div className="grid grid-cols-5 gap-6 max-w-4xl mx-auto mb-8">
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
              ].map((interest, index) => (
                <div key={interest.name} className="text-center">
                  <div className={`w-24 h-24 border-2 rounded-lg flex flex-col items-center justify-center mb-2 cursor-pointer transition-colors ${
                    index === 2 ? 'border-[#2BBBD4] bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <Checkbox 
                      id={interest.name}
                      className={`mb-2 ${index === 2 ? 'border-[#2BBBD4] bg-[#2BBBD4]' : 'border-gray-300'}`}
                      defaultChecked={index === 2}
                    />
                    <span className="text-2xl">{interest.icon}</span>
                  </div>
                  <Label htmlFor={interest.name} className="text-sm cursor-pointer">{interest.name}</Label>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-16">
              <h3 className="text-2xl font-bold text-gray-900">Similar Product</h3>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">With whom?</h2>
            
            <div className="max-w-md mx-auto">
              <Input 
                placeholder="Family travelers"
                className="h-12 text-lg border-gray-300 mb-8"
                onChange={(e) => updateFormData('travelWith', e.target.value)}
              />
              
              <div className="grid grid-cols-2 gap-8">
                <div className="text-left">
                  <Label className="text-lg font-medium mb-4 block">Family with Young Children</Label>
                  <RadioGroup onValueChange={(value) => updateFormData('travelWith', value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="family-young" id="family-young" className="border-[#2BBBD4]" />
                      <Label htmlFor="family-young" className="cursor-pointer"></Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="text-left">
                  <Label className="text-lg font-medium mb-4 block">Multi-generational Family</Label>
                  <RadioGroup onValueChange={(value) => updateFormData('travelWith', value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="multi-gen" id="multi-gen" className="border-gray-300" />
                      <Label htmlFor="multi-gen" className="cursor-pointer"></Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-16">
              <h3 className="text-2xl font-bold text-gray-900">Similar Product</h3>
              <p className="text-gray-600 mt-2">Sost Brilliant reasons Emprise should be your one-stop-shop!</p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">What is your budget?</h2>
            
            <div className="max-w-md mx-auto">
              <div className="text-left mb-8">
                <Label className="text-lg font-medium mb-4 block">Budget</Label>
                <RadioGroup onValueChange={(value) => updateFormData('budget', value)}>
                  <div className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value="low" id="low" className="border-[#2BBBD4]" />
                    <Label htmlFor="low" className="cursor-pointer">Low</Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value="normal" id="normal" className="border-gray-300" />
                    <Label htmlFor="normal" className="cursor-pointer">Normal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" className="border-gray-300" />
                    <Label htmlFor="high" className="cursor-pointer">High</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="text-left mb-8">
                <Label className="text-lg font-medium mb-4 block">I want to try this cuisine</Label>
                <div className="grid grid-cols-3 gap-4">
                  {['Local cuisine', 'Moroccan cuisine', 'French cuisine', 'International cuisine', 'Italian cuisine', 'Japanese cuisine', 'Spanish cuisine', 'Asiatic cuisine', 'Lebanese Cuisine'].map((cuisine) => (
                    <div key={cuisine} className="flex items-center space-x-2">
                      <Checkbox 
                        id={cuisine} 
                        className="border-gray-300"
                      />
                      <Label htmlFor={cuisine} className="text-sm cursor-pointer">{cuisine}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-left">
                <Label className="text-lg font-medium mb-4 block">And I prefer to eat</Label>
                <div className="grid grid-cols-3 gap-4">
                  {['casual dining', 'fast food', 'fine dining', 'buffet', 'café or bistro', 'pub or bar', 'food trucks', 'Street food', 'farm to table', 'Sea food', 'vegetarian or vegan', 'barbecue'].map((dining) => (
                    <div key={dining} className="flex items-center space-x-2">
                      <Checkbox 
                        id={dining} 
                        className="border-gray-300"
                      />
                      <Label htmlFor={dining} className="text-sm cursor-pointer">{dining}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">Where do you want to stay?</h2>
            
            <div className="max-w-md mx-auto">
              <Input 
                placeholder="palais"
                className="h-12 text-lg border-gray-300 mb-8"
                onChange={(e) => updateFormData('accommodation', { ...formData.accommodation, type: e.target.value })}
              />
              
              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="proximity" 
                    className="border-[#2BBBD4] bg-[#2BBBD4]"
                    defaultChecked
                  />
                  <Label htmlFor="proximity" className="cursor-pointer">Proximity to Attractions</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="accessibility" className="border-gray-300" />
                  <Label htmlFor="accessibility" className="cursor-pointer">Accessibility</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="atmosphere" className="border-gray-300" />
                  <Label htmlFor="atmosphere" className="cursor-pointer">Atmosphere</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="security" className="border-gray-300" />
                  <Label htmlFor="security" className="cursor-pointer">Security</Label>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-16">
              <h3 className="text-2xl font-bold text-gray-900">Similar Product</h3>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-8 py-12">
        {renderStepIndicator()}
        
        <div className="mb-16">
          {renderStep()}
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline"
            onClick={handlePrevious}
            className="px-8 py-3 bg-[#D4B5A0] text-white border-none hover:bg-[#C4A590] rounded-full"
          >
            Previous
          </Button>
          
          <Button 
            onClick={handleNext}
            className={`px-8 py-3 text-white border-none rounded-full ${
              currentStep === 4 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-[#2BBBD4] hover:bg-[#1BAAC4]'
            }`}
          >
            {currentStep === 4 ? 'Submit' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BeInspiredSteps;
