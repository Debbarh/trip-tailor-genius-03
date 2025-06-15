
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PlanTripSteps from "@/components/forms/PlanTripSteps";
import BeInspiredSteps from "@/components/forms/BeInspiredSteps";
import ItineraryDisplay from "@/components/ItineraryDisplay";
import HomeScreen from "@/components/home/HomeScreen";

type Mode = 'home' | 'plan' | 'inspire' | 'itinerary';

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
    setMode('itinerary');
  };

  const handleBackToHome = () => {
    setMode('home');
    setTripData(null);
  };

  const renderContent = () => {
    switch (mode) {
      case 'itinerary':
        return tripData ? (
          <ItineraryDisplay data={tripData} onBack={handleBackToHome} />
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
