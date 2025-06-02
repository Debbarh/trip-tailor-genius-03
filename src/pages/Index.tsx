
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapIcon, PlaneIcon, StarIcon, HeartIcon, CameraIcon, CompassIcon } from "lucide-react";
import PlanTripForm from "@/components/PlanTripForm";
import BeInspiredForm from "@/components/BeInspiredForm";
import ItineraryDisplay from "@/components/ItineraryDisplay";
import AppLayout from "@/components/layout/AppLayout";
import TransitionWrapper from "@/components/layout/TransitionWrapper";

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
      return ['Sélection', 'Planification', 'Itinéraire'];
    }
    if (mode === 'inspire') {
      return ['Sélection', 'Inspiration', 'Itinéraire'];
    }
    return [];
  };

  const renderContent = () => {
    switch (mode) {
      case 'itinerary':
        return tripData ? (
          <TransitionWrapper isVisible={true} direction="left">
            <ItineraryDisplay data={tripData} onBack={handleBackToMode} />
          </TransitionWrapper>
        ) : null;

      case 'plan':
        return (
          <TransitionWrapper isVisible={true} direction="right">
            <PlanTripForm onComplete={handleFormComplete} onBack={handleBackToHome} />
          </TransitionWrapper>
        );

      case 'inspire':
        return (
          <TransitionWrapper isVisible={true} direction="right">
            <BeInspiredForm onComplete={handleFormComplete} onBack={handleBackToHome} />
          </TransitionWrapper>
        );

      default:
        return (
          <TransitionWrapper isVisible={true} direction="fade">
            <HomeContent onModeSelect={handleModeSelect} />
          </TransitionWrapper>
        );
    }
  };

  return (
    <AppLayout
      currentStep={mode}
      onBack={mode !== 'select' ? handleBackToMode : undefined}
      onHome={mode !== 'select' ? handleBackToHome : undefined}
      showProgress={mode === 'plan' || mode === 'inspire'}
      steps={getSteps()}
    >
      {renderContent()}
    </AppLayout>
  );
};

// Composant d'accueil simplifié et inspirant
const HomeContent = ({ onModeSelect }: { onModeSelect: (mode: 'plan' | 'inspire') => void }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section épuré */}
      <div className="relative">
        <div 
          className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-blue-600 to-indigo-700 min-h-[80vh] flex items-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-blue-900/75 to-indigo-900/80"></div>
          
          {/* Floating elements simplifiés */}
          <div className="absolute top-20 left-10 animate-pulse">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
              <PlaneIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="absolute bottom-32 right-16 animate-pulse delay-1000">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
              <CompassIcon className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                Explorez le Monde
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-blue-300">
                  À Votre Façon
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
                Découvrez des destinations uniques avec notre IA qui transforme vos envies en aventures inoubliables
              </p>

              {/* CTA Principal simplifié */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
                <Button
                  onClick={() => onModeSelect('plan')}
                  size="lg"
                  className="w-full sm:w-auto bg-white text-emerald-700 hover:bg-gray-50 font-semibold py-4 px-8 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <MapIcon className="w-5 h-5 mr-2" />
                  Planifier mon voyage
                </Button>
                
                <Button
                  onClick={() => onModeSelect('inspire')}
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-emerald-700 font-semibold py-4 px-8 text-lg transition-all duration-300 hover:scale-105"
                >
                  <StarIcon className="w-5 h-5 mr-2" />
                  Inspirez-moi
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Avantages simplifiée */}
      <div className="relative bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Pourquoi choisir TASARINI ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une approche révolutionnaire pour créer vos voyages sur mesure
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <StarIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">IA Personnalisée</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Notre intelligence artificielle apprend de vos préférences pour créer des expériences uniques
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <HeartIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Émotions Garanties</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Chaque destination est choisie pour créer des souvenirs mémorables
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <CameraIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Simple & Rapide</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Des itinéraires parfaits générés en quelques minutes, modifiables à volonté
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section témoignages épurée */}
      <div className="relative bg-gradient-to-r from-emerald-600 to-blue-600 py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">
              Ils nous font confiance
            </h3>
            <p className="text-xl text-emerald-100">Plus de 10 000 voyageurs satisfaits</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-300 fill-current" />
                ))}
              </div>
              <p className="text-white mb-4 italic text-lg">
                "TASARINI a transformé notre façon de voyager. Chaque suggestion était parfaite !"
              </p>
              <p className="text-emerald-200 font-medium">- Marie & Pierre, Lyon</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-300 fill-current" />
                ))}
              </div>
              <p className="text-white mb-4 italic text-lg">
                "L'IA a découvert des endroits magiques que nous n'aurions jamais trouvés seuls."
              </p>
              <p className="text-emerald-200 font-medium">- Sophie & Lucas, Paris</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
