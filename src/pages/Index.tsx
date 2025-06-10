
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plane, Camera, Heart, Globe, SparklesIcon } from "lucide-react";
import BrandLogo from "@/components/layout/BrandLogo";
import LanguageSelector from "@/components/ui/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <HomeScreen />
    </div>
  );
};

const HomeScreen = () => {
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDestination((prev) => (prev + 1) % destinations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [destinations.length]);

  const handlePlanTrip = () => {
    console.log('Planifier un voyage');
  };

  const handleInspire = () => {
    console.log('Inspirer');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Hero Images Carousel */}
      <div className="absolute inset-0">
        {destinations.map((dest, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
              index === currentDestination ? 'opacity-40 scale-105' : 'opacity-0 scale-100'
            }`}
          >
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-blue-900/40 to-purple-900/30"></div>
          </div>
        ))}
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-cyan-300/15 to-blue-400/15 rounded-full blur-2xl animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <BrandLogo />
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-slate-700 hover:text-indigo-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-white/10">
              Pays
            </a>
            <a href="#" className="text-slate-700 hover:text-indigo-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-white/10">
              {t('nav.destinations')}
            </a>
            <a href="#" className="text-slate-700 hover:text-indigo-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-white/10">
              {t('nav.inspiration')}
            </a>
            <a href="#" className="text-slate-700 hover:text-indigo-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-white/10">
              {t('nav.about')}
            </a>
            <Button variant="ghost" className="text-slate-700 hover:text-indigo-600 font-medium hover:bg-white/10">
              {t('nav.login')}
            </Button>
            <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300">
              {t('nav.signup')}
            </Button>
            <LanguageSelector />
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6">
        <div className="max-w-6xl mx-auto text-center pt-12 pb-16">
          {/* Floating destination badge */}
          <div className="mb-10 inline-flex items-center gap-3 bg-white/95 backdrop-blur-md px-8 py-4 rounded-full shadow-xl border border-white/30 animate-fade-in">
            <Camera className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-semibold text-slate-700">
              {destinations[currentDestination].name} • {destinations[currentDestination].description}
            </span>
          </div>

          {/* Hero Title */}
          <div className="mb-16 space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-slate-800 leading-tight">
              {t('hero.adventure')}
              <span className="block bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent font-medium mt-2">
                {t('hero.awaits')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              {t('hero.description')}
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-slate-600 pt-4">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="font-medium">{t('hero.travelers')}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <Globe className="w-4 h-4 text-blue-500" />
                <span className="font-medium">{t('hero.destinations')}</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <Button 
              onClick={handlePlanTrip}
              className="group bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-12 py-6 text-lg rounded-2xl h-auto transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-indigo-500/25 border-0 font-semibold"
            >
              <Plane className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
              {t('hero.plan')}
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            <Button 
              onClick={handleInspire}
              className="group bg-white/95 backdrop-blur-md hover:bg-white text-slate-700 hover:text-indigo-700 px-12 py-6 text-lg rounded-2xl h-auto transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-purple-500/25 border border-white/40 font-semibold"
            >
              <SparklesIcon className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
              {t('hero.inspire')}
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="group bg-white/90 backdrop-blur-md rounded-2xl p-8 border border-white/40 hover:bg-white/95 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <SparklesIcon className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">IA Intuitive</h3>
              <p className="text-slate-600 leading-relaxed">
                Notre intelligence artificielle comprend vos envies et crée des voyages parfaitement adaptés à votre personnalité
              </p>
            </div>

            <div className="group bg-white/90 backdrop-blur-md rounded-2xl p-8 border border-white/40 hover:bg-white/95 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Destinations Secrètes</h3>
              <p className="text-slate-600 leading-relaxed">
                Explorez des lieux magiques hors des sentiers battus, sélectionnés par nos experts locaux
              </p>
            </div>

            <div className="group bg-white/90 backdrop-blur-md rounded-2xl p-8 border border-white/40 hover:bg-white/95 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Expériences Authentiques</h3>
              <p className="text-slate-600 leading-relaxed">
                Vivez des moments uniques et créez des souvenirs qui dureront toute une vie
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-white/30 bg-white/20 backdrop-blur-md">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Prêt pour l'aventure ?</h3>
          <p className="text-slate-600 mb-8 text-lg">Rejoignez des milliers de voyageurs qui ont trouvé leur destination de rêve</p>
          <div className="flex justify-center space-x-8 mb-6">
            <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors font-medium">Conditions</a>
            <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors font-medium">Confidentialité</a>
            <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors font-medium">Support</a>
          </div>
          <p className="text-slate-500">© 2024 TASARINI. Votre passeport vers l'extraordinaire.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
