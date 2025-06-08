
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapIcon, SparklesIcon, ArrowRight } from "lucide-react";
import PlanTripSteps from "@/components/forms/PlanTripSteps";
import BeInspiredSteps from "@/components/forms/BeInspiredSteps";
import ItineraryDisplay from "@/components/ItineraryDisplay";

type Mode = 'home' | 'plan' | 'inspire' | 'itinerary';

interface TripData {
  mode: 'plan' | 'inspire';
  [key: string]: any;
}

const Index = () => {
  const [mode, setMode] = useState<Mode>('home');
  const [tripData, setTripData] = useState<TripData | null>(null);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {renderContent()}
    </div>
  );
};

const HomeScreen = ({ onModeSelect }: { onModeSelect: (mode: 'plan' | 'inspire') => void }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <MapIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              TASARINI
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Destinations</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Inspiration</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">À propos</a>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              Se connecter
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6">
        <div className="max-w-4xl mx-auto text-center pt-20 pb-32">
          {/* Hero Title */}
          <div className="mb-12">
            <h1 className="text-6xl md:text-7xl font-light text-gray-900 mb-6 leading-tight">
              Votre voyage
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">
                commence ici
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Planifiez des voyages extraordinaires avec l'intelligence artificielle. 
              Découvrez des destinations uniques adaptées à vos envies.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <Button 
              onClick={() => onModeSelect('plan')}
              className="group bg-black hover:bg-gray-800 text-white px-8 py-6 text-lg rounded-2xl h-auto transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <MapIcon className="w-6 h-6 mr-3" />
              Planifier mon voyage
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              onClick={() => onModeSelect('inspire')}
              variant="outline"
              className="group border-2 border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 px-8 py-6 text-lg rounded-2xl h-auto transition-all duration-300 hover:scale-105 bg-white/70 backdrop-blur-sm"
            >
              <SparklesIcon className="w-6 h-6 mr-3" />
              M'inspirer
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/80 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <SparklesIcon className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">IA Avancée</h3>
              <p className="text-gray-600 leading-relaxed">
                Notre intelligence artificielle analyse vos préférences pour créer des voyages sur mesure.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/80 transition-all duration-300">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <MapIcon className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Destinations Uniques</h3>
              <p className="text-gray-600 leading-relaxed">
                Découvrez des lieux extraordinaires sélectionnés selon vos goûts et votre budget.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/80 transition-all duration-300">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <ArrowRight className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Planification Simple</h3>
              <p className="text-gray-600 leading-relaxed">
                Un processus intuitif en quelques étapes pour organiser votre voyage parfait.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-300/10 to-purple-300/10 rounded-full blur-3xl"></div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-gray-200/50 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 mb-4">© 2024 TASARINI. Votre compagnon de voyage intelligent.</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">Conditions</a>
            <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">Confidentialité</a>
            <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
