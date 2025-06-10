import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ItineraryDisplayProps } from "@/types/itinerary";
import { generateSampleItinerary } from "@/utils/itineraryGenerator";
import ItineraryHeader from "@/components/itinerary/ItineraryHeader";
import ItineraryOverview from "@/components/itinerary/ItineraryOverview";
import DayCard from "@/components/itinerary/DayCard";
import AccommodationsTab from "@/components/itinerary/AccommodationsTab";
import ExperiencesTab from "@/components/itinerary/ExperiencesTab";
import PracticalInfoTab from "@/components/itinerary/PracticalInfoTab";

const ItineraryDisplay = ({ data, onBack }: ItineraryDisplayProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [favorites, setFavorites] = useState<number[]>([]);
  const itinerary = generateSampleItinerary(data);

  const toggleFavorite = (dayIndex: number) => {
    setFavorites(prev => 
      prev.includes(dayIndex) 
        ? prev.filter(i => i !== dayIndex)
        : [...prev, dayIndex]
    );
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-2xl bg-white/95 backdrop-blur-sm border-0 overflow-hidden">
          <ItineraryHeader itinerary={itinerary} onBack={onBack} />

          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-gradient-to-r from-purple-50 via-blue-50 to-pink-50 border-b border-purple-100">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-100 data-[state=active]:to-purple-200 data-[state=active]:text-purple-800 font-medium"
                >
                  ✨ Aperçu
                </TabsTrigger>
                <TabsTrigger 
                  value="itinerary" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-100 data-[state=active]:to-blue-200 data-[state=active]:text-blue-800 font-medium"
                >
                  📅 Programme
                </TabsTrigger>
                <TabsTrigger 
                  value="practical" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-100 data-[state=active]:to-green-200 data-[state=active]:text-green-800 font-medium"
                >
                  💡 Infos Pratiques
                </TabsTrigger>
                <TabsTrigger 
                  value="accommodations" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-100 data-[state=active]:to-pink-100 data-[state=active]:text-purple-800 font-medium"
                >
                  🏨 Hébergements
                </TabsTrigger>
                <TabsTrigger 
                  value="experiences" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-100 data-[state=active]:to-purple-100 data-[state=active]:text-pink-800 font-medium"
                >
                  🎭 Expériences
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="p-8 bg-gradient-to-br from-purple-50/30 via-blue-50/30 to-pink-50/30">
                <ItineraryOverview itinerary={itinerary} data={data} />
              </TabsContent>

              <TabsContent value="itinerary" className="p-8 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30">
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      📅 Votre aventure jour par jour
                    </h3>
                    <p className="text-purple-700/80">Chaque moment a été pensé pour vous émerveiller</p>
                  </div>

                  {itinerary.days.map((day, dayIndex) => (
                    <DayCard
                      key={day.day}
                      day={day}
                      dayIndex={dayIndex}
                      isFavorite={favorites.includes(dayIndex)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="practical" className="p-8 bg-gradient-to-br from-green-50/30 via-blue-50/30 to-purple-50/30">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    💡 Informations Pratiques & Recommandations
                  </h3>
                  <p className="text-green-700/80">Tout ce qu'il faut savoir pour réussir votre voyage</p>
                </div>
                <PracticalInfoTab />
              </TabsContent>

              <TabsContent value="accommodations" className="p-8 bg-gradient-to-br from-purple-50/30 via-pink-50/30 to-blue-50/30">
                <AccommodationsTab />
              </TabsContent>

              <TabsContent value="experiences" className="p-8 bg-gradient-to-br from-pink-50/30 via-purple-50/30 to-blue-50/30">
                <ExperiencesTab />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Boutons d'action avec les couleurs du logo */}
        <div className="mt-8 text-center space-y-6">
          <div className="flex justify-center gap-6">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 hover:from-purple-700 hover:via-blue-700 hover:to-pink-700 text-white px-10 py-6 text-lg shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 border-0"
            >
              ✨ Personnaliser cet itinéraire
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-purple-400 bg-white/90 backdrop-blur-sm text-purple-700 hover:bg-purple-50 hover:border-purple-500 px-10 py-6 text-lg shadow-xl hover:shadow-purple-500/20 transform hover:scale-105 transition-all duration-300"
            >
              💾 Sauvegarder
            </Button>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-purple-100">
            <p className="text-purple-700 italic text-lg font-medium bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
              "Un voyage se vit trois fois : quand on le rêve, quand on le vit, et quand on s'en souvient" ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryDisplay;
