
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStepIndicator = () => (
    <div className="w-full mb-8">
      <div className="text-right mb-2">
        <span className="text-sm text-gray-600">{currentStep} of 5 Completed</span>
      </div>
      <div className="w-full bg-gray-200 h-2 mb-6">
        <div 
          className="bg-[#2BBBD4] h-2 transition-all duration-300"
          style={{ width: `${(currentStep / 5) * 100}%` }}
        />
      </div>
      <div className="flex justify-between">
        {['Destination', 'Travel With', 'Budget', 'Accommodation', 'Activities'].map((step, index) => (
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
            <h2 className="text-4xl font-bold text-gray-900 mb-12">Where would you like to go?</h2>
            
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div>
                <Select onValueChange={(value) => updateFormData('destination', { ...formData.destination, country: value })}>
                  <SelectTrigger className="h-12 text-lg border-gray-300">
                    <SelectValue placeholder="Select a Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="france">France</SelectItem>
                    <SelectItem value="spain">Spain</SelectItem>
                    <SelectItem value="italy">Italy</SelectItem>
                    <SelectItem value="morocco">Morocco</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select onValueChange={(value) => updateFormData('destination', { ...formData.destination, city: value })}>
                  <SelectTrigger className="h-12 text-lg border-gray-300">
                    <SelectValue placeholder="Select a City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paris">Paris</SelectItem>
                    <SelectItem value="madrid">Madrid</SelectItem>
                    <SelectItem value="rome">Rome</SelectItem>
                    <SelectItem value="marrakech">Marrakech</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Input 
                  placeholder="06/02/2025 - 06/02/2025"
                  className="h-12 text-lg border-gray-300"
                  onChange={(e) => updateFormData('destination', { ...formData.destination, dates: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center gap-6 justify-center text-gray-600">
              <button className="flex items-center gap-2">
                <span className="text-xl">📍</span>
                <span>+ Add destination</span>
              </button>
              <button className="flex items-center gap-2">
                <span className="text-xl">📍</span>
                <span>- Remove destination</span>
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">With whom?</h2>
            
            <div className="max-w-md mx-auto">
              <Input 
                placeholder="Solo traveler"
                className="h-12 text-lg border-gray-300 mb-8"
                onChange={(e) => updateFormData('travelWith', e.target.value)}
              />
              
              <div className="grid grid-cols-2 gap-8">
                <div className="text-left">
                  <Label className="text-lg font-medium mb-4 block">Young Adult Solo</Label>
                  <RadioGroup onValueChange={(value) => updateFormData('travelWith', value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="young-adult-solo" id="young-adult-solo" className="border-[#2BBBD4]" />
                      <Label htmlFor="young-adult-solo" className="cursor-pointer"></Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="text-left">
                  <Label className="text-lg font-medium mb-4 block">Adult Solo</Label>
                  <RadioGroup onValueChange={(value) => updateFormData('travelWith', value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="adult-solo" id="adult-solo" className="border-gray-300" />
                      <Label htmlFor="adult-solo" className="cursor-pointer"></Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
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
                        className={cuisine === 'Local cuisine' ? 'border-[#2BBBD4] bg-[#2BBBD4]' : 'border-gray-300'}
                        defaultChecked={cuisine === 'Local cuisine'}
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
                        className={dining === 'casual dining' ? 'border-[#2BBBD4] bg-[#2BBBD4]' : 'border-gray-300'}
                        defaultChecked={dining === 'casual dining'}
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
          </div>
        );

      case 5:
        return (
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">What are your interests?</h2>
            
            <div className="grid grid-cols-5 gap-6 max-w-4xl mx-auto">
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
              currentStep === 5 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-[#2BBBD4] hover:bg-[#1BAAC4]'
            }`}
          >
            {currentStep === 5 ? 'Submit' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlanTripSteps;
