
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapIcon, PlaneIcon } from "lucide-react";
import PlanTripForm from "@/components/PlanTripForm";
import BeInspiredForm from "@/components/BeInspiredForm";
import ItineraryDisplay from "@/components/ItineraryDisplay";

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

  if (mode === 'itinerary' && tripData) {
    return <ItineraryDisplay data={tripData} onBack={handleBackToHome} />;
  }

  if (mode === 'plan') {
    return <PlanTripForm onComplete={handleFormComplete} onBack={handleBackToHome} />;
  }

  if (mode === 'inspire') {
    return <BeInspiredForm onComplete={handleFormComplete} onBack={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-green-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Moteur de Recommandation
              <br />
              <span className="text-orange-300">Voyage Intelligent</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Découvrez votre voyage parfait grâce à notre intelligence artificielle qui s'adapte à vos envies et votre profil
            </p>
          </div>
        </div>
      </div>

      {/* Mode Selection */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choisissez votre mode de voyage
          </h2>
          <p className="text-lg text-gray-600">
            Deux approches différentes pour créer l'itinéraire de vos rêves
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Plan Your Trip Mode */}
          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
            <CardHeader className="text-center p-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MapIcon className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                Plan Your Trip
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                Voyage Planifié
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Sélectionnez vos destinations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Choisissez vos dates et villes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Personnalisez selon vos préférences</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Recevez un itinéraire détaillé</span>
                </div>
              </div>
              <Button 
                onClick={() => handleModeSelect('plan')}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 text-lg font-semibold transition-all duration-300"
              >
                Commencer la planification
              </Button>
            </CardContent>
          </Card>

          {/* Be Inspired Mode */}
          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
            <CardHeader className="text-center p-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <PlaneIcon className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                Be Inspired
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                Inspiration Voyage
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Partagez vos envies de voyage</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Découvrez des destinations uniques</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Explorez de nouvelles expériences</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Laissez-vous surprendre</span>
                </div>
              </div>
              <Button 
                onClick={() => handleModeSelect('inspire')}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 text-lg font-semibold transition-all duration-300"
              >
                Trouvez l'inspiration
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Pourquoi choisir notre moteur de recommandation ?
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Personnalisation Avancée</h4>
              <p className="text-gray-600">Itinéraires adaptés à votre profil, vos préférences et votre style de voyage</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Intelligence Artificielle</h4>
              <p className="text-gray-600">Algorithmes avancés pour des recommandations précises et pertinentes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Instantané & Flexible</h4>
              <p className="text-gray-600">Générez et modifiez vos itinéraires en temps réel selon vos envies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
