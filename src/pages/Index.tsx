import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PlanTripSteps from "@/components/forms/plan-trip/PlanTripSteps";
import BeInspiredSteps from "@/components/forms/be-inspired/BeInspiredSteps";
import ItineraryDisplay from "@/components/ItineraryDisplay";
import InspirationLandingPage from "@/components/inspiration/InspirationLandingPage";
import HomeScreen from "@/components/home/HomeScreen";

type Mode = 'home' | 'plan' | 'inspire' | 'inspiration-landing' | 'itinerary';

interface BeInspiredFormData {
  mode: 'plan' | 'inspire';
  activities: string[];
  travelWith: string;
  budget: string;
  accommodation: string;
  [key: string]: any;
}

const Index = () => {
  const [mode, setMode] = useState<Mode>('home');
  const [tripData, setTripData] = useState<BeInspiredFormData | null>(null);
  const [searchParams] = useSearchParams();

  const createInitialTripData = (selectedMode: 'plan' | 'inspire'): BeInspiredFormData => ({
    mode: selectedMode,
    activities: [],
    travelWith: '',
    budget: '',
    accommodation: ''
  });

  // Handle URL params for mode selection
  useEffect(() => {
    const modeParam = searchParams.get('mode');
    if (modeParam === 'plan' || modeParam === 'inspire') {
      setMode(modeParam);
      setTripData(createInitialTripData(modeParam));
    }
  }, [searchParams]);

  const handleModeSelect = (selectedMode: 'plan' | 'inspire') => {
    setMode(selectedMode);
    setTripData(createInitialTripData(selectedMode));
  };

  const handleFormComplete = (data: BeInspiredFormData) => {
    setTripData(data);
    setMode(data.mode === 'inspire' ? 'inspiration-landing' : 'itinerary');
  };

  const handleCreateItinerary = (destinationOrExperience: any) => {
    if (tripData) {
      const enhancedData = {
        ...tripData,
        selectedDestination: destinationOrExperience
      };
      setTripData(enhancedData);
      setMode('itinerary');
    }
  };

  const handleBackToHome = () => {
    setMode('home');
    setTripData(null);
  };

  const handleBackToInspiration = () => {
    setMode('inspiration-landing');
  };

  const renderContent = () => {
    if (!tripData && (mode === 'inspiration-landing' || mode === 'itinerary')) {
      return null;
    }

    const contentMap = {
      'inspiration-landing': () => (
        <InspirationLandingPage 
          formData={tripData!} 
          onBack={handleBackToHome}
          onCreateItinerary={handleCreateItinerary}
        />
      ),
      'itinerary': () => (
        <ItineraryDisplay 
          data={tripData!} 
          onBack={tripData!.mode === 'inspire' ? handleBackToInspiration : handleBackToHome} 
        />
      ),
      'plan': () => (
        <PlanTripSteps onComplete={handleFormComplete} onBack={handleBackToHome} />
      ),
      'inspire': () => (
        <BeInspiredSteps onComplete={handleFormComplete} onBack={handleBackToHome} />
      ),
      'home': () => <HomeScreen onModeSelect={handleModeSelect} />
    };

    return contentMap[mode]?.() || contentMap['home']();
  };

  return (
    <div className="min-h-screen">
      {renderContent()}
    </div>
  );
};

export default Index;
