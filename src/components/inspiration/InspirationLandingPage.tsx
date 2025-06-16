
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Calendar, Users, Wallet, Heart, Star, Sparkles, Clock, Globe, Camera } from "lucide-react";
import { activityOptions, travelOptions, budgetOptions, accommodationOptions } from "@/constants/beInspiredSteps";
import InspirationDestinations from "./InspirationDestinations";
import InspirationExperiences from "./InspirationExperiences";
import InspirationTips from "./InspirationTips";
import InspirationTestimonials from "./InspirationTestimonials";

interface FormData {
  activities: string[];
  travelWith: string;
  budget: string;
  accommodation: string;
  mode: string;
}

interface InspirationLandingPageProps {
  formData: FormData;
  onBack: () => void;
  onCreateItinerary: (destination: any) => void;
}

const InspirationLandingPage = ({ formData, onBack, onCreateItinerary }: InspirationLandingPageProps) => {
  const [selectedTab, setSelectedTab] = useState<'destinations' | 'experiences' | 'tips' | 'testimonials'>('destinations');

  // Parse budget data
  let budgetInfo = { budget: '', period: '' };
  try {
    if (formData.budget) {
      budgetInfo = JSON.parse(formData.budget);
    }
  } catch {
    budgetInfo = { budget: formData.budget, period: '' };
  }

  // Get user profile summary
  const getActivityLabels = () => {
    return formData.activities.map(actId => {
      if (actId.startsWith('custom:')) {
        return actId.replace('custom:', '');
      }
      return activityOptions.find(opt => opt.id === actId)?.label || actId;
    }).join(', ');
  };

  const getTravelLabel = () => {
    return travelOptions.find(opt => opt.id === formData.travelWith)?.label || formData.travelWith;
  };

  const getBudgetLabel = () => {
    return budgetOptions.find(opt => opt.id === budgetInfo.budget)?.label || budgetInfo.budget;
  };

  const getAccommodationLabel = () => {
    const accommodationTypes = [
      { id: 'chez-habitant', label: 'Chez l\'habitant' },
      { id: 'hotelier-classe', label: 'Établissement hôtelier classé' },
      { id: 'camping', label: 'Camping' },
      { id: 'experience-unique', label: 'Expérience unique' },
      { id: 'riad-traditionnel', label: 'Riad traditionnel' },
      { id: 'auberge-jeunesse', label: 'Auberge de jeunesse' }
    ];
    return accommodationTypes.find(opt => opt.id === formData.accommodation)?.label || formData.accommodation;
  };

  // Get personalized welcome message
  const getWelcomeMessage = () => {
    const messages = [
      "✨ Découvrez votre prochaine aventure !",
      "🌍 Le monde vous attend, explorez vos possibilités !",
      "🎯 Des destinations parfaites pour votre profil !",
      "💫 Votre voyage de rêve commence ici !",
      "🔮 L'inspiration voyage personnalisée pour vous !"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const tabs = [
    { id: 'destinations', label: 'Destinations', icon: MapPin, count: '12+' },
    { id: 'experiences', label: 'Expériences', icon: Star, count: '25+' },
    { id: 'tips', label: 'Conseils', icon: Sparkles, count: 'Pro' },
    { id: 'testimonials', label: 'Témoignages', icon: Heart, count: '4.9★' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {getWelcomeMessage()}
              </h1>
              <p className="text-gray-600">Basé sur vos préférences personnelles</p>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Globe className="w-4 h-4" />
              <span>Inspiration Premium</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-4 rounded-2xl text-center">
            <div className="text-2xl font-bold">98%</div>
            <div className="text-sm opacity-90">Satisfaction</div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-2xl text-center">
            <div className="text-2xl font-bold">150+</div>
            <div className="text-sm opacity-90">Destinations</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-violet-600 text-white p-4 rounded-2xl text-center">
            <div className="text-2xl font-bold">500+</div>
            <div className="text-sm opacity-90">Expériences</div>
          </div>
          <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white p-4 rounded-2xl text-center">
            <div className="text-2xl font-bold">24h</div>
            <div className="text-sm opacity-90">Support</div>
          </div>
        </div>

        {/* User Profile Summary */}
        <Card className="mb-8 bg-white/70 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mr-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Votre Profil Voyageur</h2>
                <p className="text-gray-600">Personnalisé selon vos préférences</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-rose-100 via-pink-50 to-rose-100 p-6 rounded-2xl border border-rose-200">
                <div className="flex items-center mb-3">
                  <Heart className="w-6 h-6 text-rose-600 mr-3" />
                  <div className="text-sm font-bold text-rose-800 uppercase tracking-wide">Passions</div>
                </div>
                <div className="text-gray-900 font-medium">{getActivityLabels()}</div>
              </div>

              <div className="bg-gradient-to-br from-blue-100 via-cyan-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                <div className="flex items-center mb-3">
                  <Users className="w-6 h-6 text-blue-600 mr-3" />
                  <div className="text-sm font-bold text-blue-800 uppercase tracking-wide">Voyage</div>
                </div>
                <div className="text-gray-900 font-medium">{getTravelLabel()}</div>
              </div>

              <div className="bg-gradient-to-br from-green-100 via-emerald-50 to-green-100 p-6 rounded-2xl border border-green-200">
                <div className="flex items-center mb-3">
                  <Wallet className="w-6 h-6 text-green-600 mr-3" />
                  <div className="text-sm font-bold text-green-800 uppercase tracking-wide">Budget</div>
                </div>
                <div className="text-gray-900 font-medium">{getBudgetLabel()}</div>
              </div>

              <div className="bg-gradient-to-br from-purple-100 via-violet-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
                <div className="flex items-center mb-3">
                  <MapPin className="w-6 h-6 text-purple-600 mr-3" />
                  <div className="text-sm font-bold text-purple-800 uppercase tracking-wide">Hébergement</div>
                </div>
                <div className="text-gray-900 font-medium">{getAccommodationLabel()}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-3 shadow-xl border border-white/20">
            <div className="flex space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  className={`relative px-6 py-4 rounded-2xl font-medium transition-all duration-300 group ${
                    selectedTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      selectedTab === tab.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {tab.count}
                    </span>
                  </div>
                  {selectedTab !== tab.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          {selectedTab === 'destinations' && (
            <InspirationDestinations 
              formData={formData} 
              onCreateItinerary={onCreateItinerary}
            />
          )}
          {selectedTab === 'experiences' && (
            <InspirationExperiences 
              formData={formData}
              onCreateItinerary={onCreateItinerary}
            />
          )}
          {selectedTab === 'tips' && (
            <InspirationTips formData={formData} />
          )}
          {selectedTab === 'testimonials' && (
            <InspirationTestimonials formData={formData} />
          )}
        </div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-pink-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-6 right-6 z-20">
        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-2xl">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Camera className="w-6 h-6" />
              <div>
                <div className="font-bold text-sm">Inspiré ?</div>
                <div className="text-xs opacity-90">Partagez vos découvertes</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InspirationLandingPage;
