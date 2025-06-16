
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Calendar, Users, Wallet, Heart, Star, Sparkles } from "lucide-react";
import { activityOptions, travelOptions, budgetOptions, accommodationOptions } from "@/constants/beInspiredSteps";
import InspirationDestinations from "./InspirationDestinations";
import InspirationExperiences from "./InspirationExperiences";

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
  const [selectedTab, setSelectedTab] = useState<'destinations' | 'experiences'>('destinations');

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
    return formData.activities.map(actId => 
      activityOptions.find(opt => opt.id === actId)?.label || actId
    ).join(', ');
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
                ✨ Votre Inspiration Voyage
              </h1>
              <p className="text-gray-600">Destinations parfaites pour votre profil</p>
            </div>

            <div className="w-20"></div>
          </div>
        </div>
      </div>

      {/* User Profile Summary */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Card className="mb-8 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Votre Profil Voyageur</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3 bg-gradient-to-r from-rose-100 to-pink-100 p-4 rounded-xl">
                <Heart className="w-5 h-5 text-rose-600" />
                <div>
                  <div className="text-sm font-medium text-gray-600">Passions</div>
                  <div className="text-sm text-gray-900">{getActivityLabels()}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-100 to-cyan-100 p-4 rounded-xl">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-sm font-medium text-gray-600">Voyage</div>
                  <div className="text-sm text-gray-900">{getTravelLabel()}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-xl">
                <Wallet className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-sm font-medium text-gray-600">Budget</div>
                  <div className="text-sm text-gray-900">{getBudgetLabel()}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-100 to-violet-100 p-4 rounded-xl">
                <MapPin className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="text-sm font-medium text-gray-600">Hébergement</div>
                  <div className="text-sm text-gray-900">{getAccommodationLabel()}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedTab('destinations')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedTab === 'destinations'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                <MapPin className="w-4 h-4 inline mr-2" />
                Destinations
              </button>
              <button
                onClick={() => setSelectedTab('experiences')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedTab === 'experiences'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                <Star className="w-4 h-4 inline mr-2" />
                Expériences
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {selectedTab === 'destinations' ? (
          <InspirationDestinations 
            formData={formData} 
            onCreateItinerary={onCreateItinerary}
          />
        ) : (
          <InspirationExperiences 
            formData={formData}
            onCreateItinerary={onCreateItinerary}
          />
        )}
      </div>

      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-pink-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse"></div>
      </div>
    </div>
  );
};

export default InspirationLandingPage;
