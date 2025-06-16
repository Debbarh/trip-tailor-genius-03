
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PlanTripSteps from "@/components/forms/PlanTripSteps";
import BeInspiredSteps from "@/components/forms/BeInspiredSteps";
import ItineraryDisplay from "@/components/ItineraryDisplay";
import InspirationLandingPage from "@/components/inspiration/InspirationLandingPage";
import HomeScreen from "@/components/home/HomeScreen";

type Mode = 'home' | 'plan' | 'inspire' | 'inspiration-landing' | 'itinerary';

interface TripData {
  mode: 'plan' | 'inspire';
  [key: string]: any;
}

const Index = () => {
  const [mode, setMode] = useState<Mode>('home');
  const [tripData, setTripData] = useState<TripData | null>(null);
  const [searchParams] = useSearchParams();

  // Handle URL params for mode selection
  useEffect(() => {
    const modeParam = searchParams.get('mode');
    if (modeParam === 'plan' || modeParam === 'inspire') {
      setMode(modeParam);
      setTripData({ mode: modeParam });
    }
  }, [searchParams]);

  const handleModeSelect = (selectedMode: 'plan' | 'inspire') => {
    setMode(selectedMode);
    setTripData({ mode: selectedMode });
  };

  const handleFormComplete = (data: TripData) => {
    setTripData(data);
    if (data.mode === 'inspire') {
      setMode('inspiration-landing');
    } else {
      setMode('itinerary');
    }
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
    switch (mode) {
      case 'inspiration-landing':
        return tripData ? (
          <InspirationLandingPage 
            formData={tripData} 
            onBack={handleBackToHome}
            onCreateItinerary={handleCreateItinerary}
          />
        ) : null;

      case 'itinerary':
        return tripData ? (
          <ItineraryDisplay 
            data={tripData} 
            onBack={tripData.mode === 'inspire' ? handleBackToInspiration : handleBackToHome} 
          />
        ) : null;

      case 'plan':
        return (
          <PlanTripSteps onComplete={handleFormComplete} onBack={handleBackToHome} />
        );

      case 'inspire':
        return (
          <BeInspiredSteps onComplete={handleFormComplete} onBack={handleBackToHome} />
        );

      default:
        return <HomeScreen onModeSelect={handleModeSelect} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderContent()}
    </div>
  );
};

export default Index;
