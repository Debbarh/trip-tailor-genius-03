
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapIcon, SparklesIcon, PlusIcon } from "lucide-react";
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

// Interface d'accueil simplifiée et moderne
const HomeContent = ({ onModeSelect }: { onModeSelect: (mode: 'plan' | 'inspire') => void }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8">
              Planifiez votre voyage
              <br />
              <span className="text-cyan-600">parfait</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Découvrez des destinations uniques avec notre IA qui transforme vos envies en aventures inoubliables
            </p>

            {/* Main CTA Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Plan Your Trip Card */}
              <div 
                onClick={() => onModeSelect('plan')}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-cyan-500 group"
              >
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-cyan-600 transition-colors">
                  <MapIcon className="w-8 h-8 text-cyan-600 group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Plan Your Trip</h3>
                <p className="text-gray-600 mb-6">
                  Vous savez où vous voulez aller ? Créez votre itinéraire personnalisé étape par étape.
                </p>
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3">
                  Commencer à planifier
                  <PlusIcon className="w-5 h-5 ml-2" />
                </Button>
              </div>

              {/* Be Inspired Card */}
              <div 
                onClick={() => onModeSelect('inspire')}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-purple-500 group"
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-600 transition-colors">
                  <SparklesIcon className="w-8 h-8 text-purple-600 group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Be Inspired</h3>
                <p className="text-gray-600 mb-6">
                  Laissez-vous surprendre ! Notre IA trouve la destination parfaite selon vos envies.
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3">
                  Trouvez ma destination
                  <SparklesIcon className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Pourquoi choisir TASARINI ?
            </h2>
            <p className="text-xl text-gray-600">
              Une approche révolutionnaire pour créer vos voyages sur mesure
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <SparklesIcon className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">IA Personnalisée</h3>
              <p className="text-gray-600">
                Notre intelligence artificielle apprend de vos préférences pour créer des expériences uniques
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Itinéraires Optimisés</h3>
              <p className="text-gray-600">
                Des parcours pensés pour maximiser votre temps et minimiser les contraintes
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <PlusIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Simple & Rapide</h3>
              <p className="text-gray-600">
                Des itinéraires parfaits générés en quelques minutes, modifiables à volonté
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
