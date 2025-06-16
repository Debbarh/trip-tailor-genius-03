
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
    <div className="min-h-screen py-6">
      <div className="max-w-6xl mx-auto px-4">
        <Card className="shadow-lg bg-white border border-purple-200">
          <ItineraryHeader itinerary={itinerary} onBack={onBack} />

          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-gradient-to-r from-purple-50 via-blue-50 to-pink-50 border-b border-purple-200">
                <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-purple-700 font-medium">
                  Aperçu
                </TabsTrigger>
                <TabsTrigger value="itinerary" className="data-[state=active]:bg-white data-[state=active]:text-purple-700 font-medium">
                  Programme
                </TabsTrigger>
                <TabsTrigger value="practical" className="data-[state=active]:bg-white data-[state=active]:text-purple-700 font-medium">
                  Infos Pratiques
                </TabsTrigger>
                <TabsTrigger value="accommodations" className="data-[state=active]:bg-white data-[state=active]:text-purple-700 font-medium">
                  Hébergements
                </TabsTrigger>
                <TabsTrigger value="experiences" className="data-[state=active]:bg-white data-[state=active]:text-purple-700 font-medium">
                  Expériences
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="p-6">
                <ItineraryOverview itinerary={itinerary} data={data} />
              </TabsContent>

              <TabsContent value="itinerary" className="p-6">
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      Votre programme jour par jour
                    </h3>
                    <p className="text-gray-600">Découvrez votre itinéraire détaillé</p>
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

              <TabsContent value="practical" className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    Informations Pratiques
                  </h3>
                  <p className="text-gray-600">Conseils et recommandations pour votre voyage</p>
                </div>
                <PracticalInfoTab />
              </TabsContent>

              <TabsContent value="accommodations" className="p-6">
                <AccommodationsTab />
              </TabsContent>

              <TabsContent value="experiences" className="p-6">
                <ExperiencesTab />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-6 text-center space-y-4">
          <div className="flex justify-center gap-4">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 hover:from-purple-700 hover:via-blue-700 hover:to-pink-700 text-white px-8 py-3"
            >
              Personnaliser cet itinéraire
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3"
            >
              Sauvegarder
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryDisplay;
