
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapIcon, SparklesIcon } from "lucide-react";
import PlanTripForm from "@/components/PlanTripForm";
import BeInspiredForm from "@/components/BeInspiredForm";
import ItineraryDisplay from "@/components/ItineraryDisplay";
import AppLayout from "@/components/layout/AppLayout";

type Mode = 'select' | 'plan' | 'inspire' | 'itinerary';

interface TripData {
  mode: 'plan' | 'inspire';
  countries?: string[];
  cities?: { [country: string]: string[] };
  dates?: { [city: string]: { start: string; end: string } };
  travelerProfile?: {
    segment: string;
    subSegment: string;
    groupComposition: string;
  };
  preferences?: {
    accommodation: string;
    ambiance: string;
    gastronomy: string[];
    experiences: string[];
  };
}

const Index = () => {
  const [mode, setMode] = useState<Mode>('select');
  const [tripData, setTripData] = useState<TripData | null>(null);

  const handleModeSelect = (selectedMode: 'plan' | 'inspire') => {
    console.log('Mode selected:', selectedMode);
    setMode(selectedMode);
    setTripData({ mode: selectedMode });
  };

  const handleFormComplete = (data: TripData) => {
    setTripData(data);
    setMode('itinerary');
  };

  const handleBackToHome = () => {
    setMode('select');
    setTripData(null);
  };

  const handleBackToMode = () => {
    if (mode === 'itinerary') {
      setMode(tripData?.mode === 'plan' ? 'plan' : 'inspire');
    } else {
      setMode('select');
    }
  };

  const getSteps = () => {
    if (mode === 'plan') {
      return ['Destination', 'Travel With', 'Budget', 'Accommodation', 'Activities'];
    }
    if (mode === 'inspire') {
      return ['Activities', 'Travel With', 'Budget', 'Accommodation'];
    }
    return [];
  };

  const renderContent = () => {
    switch (mode) {
      case 'itinerary':
        return tripData ? (
          <ItineraryDisplay data={tripData} onBack={handleBackToMode} />
        ) : null;

      case 'plan':
        return (
          <PlanTripForm onComplete={handleFormComplete} onBack={handleBackToHome} />
        );

      case 'inspire':
        return (
          <BeInspiredForm onComplete={handleFormComplete} onBack={handleBackToHome} />
        );

      default:
        return <HomeContent onModeSelect={handleModeSelect} />;
    }
  };

  return (
    <AppLayout
      currentStep={mode === 'plan' ? 'Plan Your Trip' : mode === 'inspire' ? 'Be Inspired' : 'TASARINI'}
      onBack={mode !== 'select' ? handleBackToMode : undefined}
      onHome={mode !== 'select' ? handleBackToHome : undefined}
      showProgress={mode === 'plan' || mode === 'inspire'}
      steps={getSteps()}
      progressCount={mode === 'plan' ? 1 : mode === 'inspire' ? 1 : 0}
      totalSteps={mode === 'plan' ? 5 : mode === 'inspire' ? 4 : 0}
    >
      {renderContent()}
    </AppLayout>
  );
};

// Interface d'accueil ultra-simplifiée
const HomeContent = ({ onModeSelect }: { onModeSelect: (mode: 'plan' | 'inspire') => void }) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-md mx-auto px-6 text-center">
        {/* Logo */}
        <div className="mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 relative">
              <div className="w-12 h-12 border-4 border-black rounded-full absolute top-0 left-2"></div>
              <div className="w-8 h-8 border-4 border-black rounded-full absolute top-2 left-4"></div>
              <div className="w-2 h-6 bg-black absolute top-12 left-7"></div>
              <div className="w-10 h-6 border-4 border-black border-t-0 rounded-b-xl absolute top-16 left-3"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-black">TASARINI</h1>
        </div>

        {/* Question simple */}
        <div className="mb-12">
          <h2 className="text-2xl font-light text-gray-800 mb-2">
            Comment voulez-vous voyager ?
          </h2>
        </div>

        {/* Deux boutons simples */}
        <div className="space-y-4">
          <Button 
            onClick={() => onModeSelect('plan')}
            className="w-full h-14 bg-black hover:bg-gray-800 text-white text-lg font-medium rounded-lg"
          >
            <MapIcon className="w-5 h-5 mr-3" />
            Je sais où aller
          </Button>
          
          <Button 
            onClick={() => onModeSelect('inspire')}
            variant="outline"
            className="w-full h-14 border-2 border-black text-black hover:bg-black hover:text-white text-lg font-medium rounded-lg"
          >
            <SparklesIcon className="w-5 h-5 mr-3" />
            Inspirez-moi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
