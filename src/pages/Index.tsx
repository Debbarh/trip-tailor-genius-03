import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapIcon, PlaneIcon, StarIcon, HeartIcon, CameraIcon } from "lucide-react";
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
    if (mode === 'plan' || mode === 'inspire') {
      return ['Sélection', 'Formulaire', 'Itinéraire'];
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

// Composant séparé pour le contenu d'accueil
const HomeContent = ({ onModeSelect }: { onModeSelect: (mode: 'plan' | 'inspire') => void }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div 
          className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 min-h-[70vh] flex items-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-purple-900/70 to-orange-900/70"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                Votre Voyage de
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-rose-300">
                  Rêve Vous Attend
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
                Découvrez des destinations magiques avec notre intelligence artificielle qui comprend vos envies les plus profondes
              </p>
              
              {/* Inspiring Stats */}
              <div className="flex justify-center gap-8 md:gap-12 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-300">127+</div>
                  <div className="text-blue-100">Pays explorés</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-rose-300">50K+</div>
                  <div className="text-blue-100">Voyages créés</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">4.9★</div>
                  <div className="text-blue-100">Note moyenne</div>
                </div>
              </div>

              {/* Inspirational Quote */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-white/20">
                <p className="text-lg text-white italic mb-2">
                  "Le monde est un livre et ceux qui ne voyagent pas n'en lisent qu'une page"
                </p>
                <p className="text-orange-200 text-sm">- Saint Augustin</p>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 animate-bounce delay-1000">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <PlaneIcon className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="absolute bottom-32 right-16 animate-bounce delay-2000">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <CameraIcon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Mode Selection */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Comment souhaitez-vous voyager ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choisissez votre style de voyage et laissez notre IA créer l'expérience parfaite pour vous
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Plan Your Trip Mode */}
          <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="text-center p-10 relative">
              <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <MapIcon className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900 mb-3">
                Plan Your Trip
              </CardTitle>
              <CardDescription className="text-xl text-blue-600 font-medium">
                Voyage Sur Mesure
              </CardDescription>
            </CardHeader>
            <CardContent className="px-10 pb-10">
              <div className="space-y-6 mb-10">
                <div className="flex items-center space-x-4 group/item">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full group-hover/item:scale-125 transition-transform"></div>
                  <span className="text-gray-700 text-lg">Choisissez vos destinations de rêve</span>
                </div>
                <div className="flex items-center space-x-4 group/item">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full group-hover/item:scale-125 transition-transform"></div>
                  <span className="text-gray-700 text-lg">Planifiez vos dates parfaites</span>
                </div>
                <div className="flex items-center space-x-4 group/item">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full group-hover/item:scale-125 transition-transform"></div>
                  <span className="text-gray-700 text-lg">Personnalisez chaque détail</span>
                </div>
                <div className="flex items-center space-x-4 group/item">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full group-hover/item:scale-125 transition-transform"></div>
                  <span className="text-gray-700 text-lg">Recevez votre itinéraire magique</span>
                </div>
              </div>
              <Button 
                onClick={() => onModeSelect('plan')}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-4 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                ✨ Créer mon voyage
              </Button>
            </CardContent>
          </Card>

          {/* Be Inspired Mode */}
          <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 shadow-xl bg-gradient-to-br from-orange-50 to-rose-100">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="text-center p-10 relative">
              <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-orange-500 to-rose-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <PlaneIcon className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900 mb-3">
                Be Inspired
              </CardTitle>
              <CardDescription className="text-xl text-orange-600 font-medium">
                Surprise & Émerveillement
              </CardDescription>
            </CardHeader>
            <CardContent className="px-10 pb-10">
              <div className="space-y-6 mb-10">
                <div className="flex items-center space-x-4 group/item">
                  <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full group-hover/item:scale-125 transition-transform"></div>
                  <span className="text-gray-700 text-lg">Révélez vos envies secrètes</span>
                </div>
                <div className="flex items-center space-x-4 group/item">
                  <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full group-hover/item:scale-125 transition-transform"></div>
                  <span className="text-gray-700 text-lg">Découvrez l'inattendu</span>
                </div>
                <div className="flex items-center space-x-4 group/item">
                  <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full group-hover/item:scale-125 transition-transform"></div>
                  <span className="text-gray-700 text-lg">Explorez sans limites</span>
                </div>
                <div className="flex items-center space-x-4 group/item">
                  <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full group-hover/item:scale-125 transition-transform"></div>
                  <span className="text-gray-700 text-lg">Vivez l'extraordinaire</span>
                </div>
              </div>
              <Button 
                onClick={() => onModeSelect('inspire')}
                className="w-full bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white py-4 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                🌟 Surprenez-moi
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">
              L'expérience voyage réinventée
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre technologie révolutionnaire transforme vos rêves en réalité
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <StarIcon className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-2xl font-semibold text-gray-900 mb-4">IA Personnalisée</h4>
              <p className="text-gray-600 text-lg leading-relaxed">Une intelligence qui apprend de vos passions pour créer des expériences uniques</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <HeartIcon className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-2xl font-semibold text-gray-900 mb-4">Émotions Garanties</h4>
              <p className="text-gray-600 text-lg leading-relaxed">Chaque recommandation est pensée pour créer des souvenirs inoubliables</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <CameraIcon className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-2xl font-semibold text-gray-900 mb-4">Instantané & Magique</h4>
              <p className="text-gray-600 text-lg leading-relaxed">Des itinéraires parfaits générés en quelques clics, modifiables à l'infini</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-6">
              Ils ont vécu la magie
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-300 fill-current" />
                ))}
              </div>
              <p className="text-white mb-4 italic">"Un voyage au Maroc absolument parfait ! Chaque détail était pensé."</p>
              <p className="text-orange-300 font-medium">- Marie & Pierre, Paris</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-300 fill-current" />
                ))}
              </div>
              <p className="text-white mb-4 italic">"L'IA a trouvé des endroits secrets que nous n'aurions jamais découverts !"</p>
              <p className="text-orange-300 font-medium">- Sophie, Lyon</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-300 fill-current" />
                ))}
              </div>
              <p className="text-white mb-4 italic">"Notre lune de miel en Thaïlande restera gravée à jamais dans nos cœurs."</p>
              <p className="text-orange-300 font-medium">- Lucas & Emma, Bordeaux</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
