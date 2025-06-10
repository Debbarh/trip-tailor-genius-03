import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapIcon, SparklesIcon, ArrowRight, Plane, Camera, Heart, Globe } from "lucide-react";
import PlanTripSteps from "@/components/forms/PlanTripSteps";
import BeInspiredSteps from "@/components/forms/BeInspiredSteps";
import ItineraryDisplay from "@/components/ItineraryDisplay";
import BrandLogo from "@/components/layout/BrandLogo";
import LanguageSelector from "@/components/ui/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {renderContent()}
    </div>
  );
};

const HomeScreen = ({ onModeSelect }: { onModeSelect: (mode: 'plan' | 'inspire') => void }) => {
  const { t } = useLanguage();
  const [currentDestination, setCurrentDestination] = useState(0);

  const destinations = [
    {
      name: "Santorini, Grèce",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      description: "Couchers de soleil magiques sur la mer Égée"
    },
    {
      name: "Kyoto, Japon",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      description: "Temples ancestraux et jardins zen"
    },
    {
      name: "Bali, Indonésie",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      description: "Plages paradisiaques et culture authentique"
    },
    {
      name: "Islande",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      description: "Aurores boréales et paysages lunaires"
    }
  ];

  useState(() => {
    const interval = setInterval(() => {
      setCurrentDestination((prev) => (prev + 1) % destinations.length);
    }, 4000);
    return () => clearInterval(interval);
  });

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Hero Images Carousel */}
      <div className="absolute inset-0">
        {destinations.map((dest, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentDestination ? 'opacity-30' : 'opacity-0'
            }`}
          >
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-pink-900/20"></div>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <BrandLogo />
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/countries" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Pays
            </Link>
            <Link to="/itinerary" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Itinéraire
            </Link>
            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">{t('nav.destinations')}</a>
            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">{t('nav.inspiration')}</a>
            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">{t('nav.about')}</a>
            <Link to="/login">
              <Button variant="ghost" className="text-gray-700 hover:text-purple-600 font-medium">
                {t('nav.login')}
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium">
                {t('nav.signup')}
              </Button>
            </Link>
            <LanguageSelector />
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6">
        <div className="max-w-6xl mx-auto text-center pt-16 pb-20">
          {/* Floating destination badge */}
          <div className="mb-8 inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/20 animate-fade-in">
            <Camera className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">
              {destinations[currentDestination].name} • {destinations[currentDestination].description}
            </span>
          </div>

          {/* Hero Title */}
          <div className="mb-16">
            <h1 className="text-6xl md:text-8xl font-light text-gray-900 mb-8 leading-tight">
              {t('hero.adventure')}
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-medium animate-fade-in">
                {t('hero.awaits')}
              </span>
            </h1>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
              {t('hero.description')}
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span>{t('hero.travelers')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-500" />
                <span>{t('hero.destinations')}</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-24">
            <Button 
              onClick={() => onModeSelect('plan')}
              className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-8 text-xl rounded-3xl h-auto transition-all duration-500 hover:scale-110 shadow-2xl hover:shadow-purple-500/25 border-0"
            >
              <Plane className="w-7 h-7 mr-4 group-hover:rotate-12 transition-transform duration-300" />
              {t('hero.plan')}
              <ArrowRight className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
            
            <Button 
              onClick={() => onModeSelect('inspire')}
              className="group bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 hover:text-purple-700 px-10 py-8 text-xl rounded-3xl h-auto transition-all duration-500 hover:scale-110 shadow-2xl hover:shadow-pink-500/25 border border-white/30"
            >
              <SparklesIcon className="w-7 h-7 mr-4 group-hover:rotate-12 transition-transform duration-300" />
              {t('hero.inspire')}
              <ArrowRight className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-10 border border-white/30 hover:bg-white/95 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform duration-300">
                <SparklesIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">IA Intuitive</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Notre intelligence artificielle comprend vos envies et crée des voyages parfaitement adaptés à votre personnalité
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-10 border border-white/30 hover:bg-white/95 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Destinations Secrètes</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Explorez des lieux magiques hors des sentiers battus, sélectionnés par nos experts locaux
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-10 border border-white/30 hover:bg-white/95 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Expériences Authentiques</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Vivez des moments uniques et créez des souvenirs qui dureront toute une vie
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-pink-300/20 to-yellow-300/20 rounded-full blur-2xl animate-pulse"></div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-16 border-t border-white/20 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Prêt pour l'aventure ?</h3>
          <p className="text-gray-700 mb-8 text-lg">Rejoignez des milliers de voyageurs qui ont trouvé leur destination de rêve</p>
          <div className="flex justify-center space-x-8 mb-8">
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">Conditions</a>
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">Confidentialité</a>
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">Support</a>
          </div>
          <p className="text-gray-600">© 2024 TASARINI. Votre passeport vers l'extraordinaire.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
