
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Background inspirant */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-blue-900/70 to-purple-900/80"></div>
      </div>

      <div className="relative z-10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl bg-white/95 backdrop-blur-sm border-0">
            <ItineraryHeader itinerary={itinerary} onBack={onBack} />

            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-gray-50 to-blue-50">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-emerald-100">✨ Aperçu</TabsTrigger>
                  <TabsTrigger value="itinerary" className="data-[state=active]:bg-blue-100">📅 Programme</TabsTrigger>
                  <TabsTrigger value="accommodations" className="data-[state=active]:bg-purple-100">🏨 Hébergements</TabsTrigger>
                  <TabsTrigger value="experiences" className="data-[state=active]:bg-orange-100">🎭 Expériences</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="p-8">
                  <ItineraryOverview itinerary={itinerary} data={data} />
                </TabsContent>

                <TabsContent value="itinerary" className="p-8">
                  <div className="space-y-8">
                    <div className="text-center mb-8">
                      <h3 className="text-3xl font-bold text-gray-800 mb-2">📅 Votre aventure jour par jour</h3>
                      <p className="text-gray-600">Chaque moment a été pensé pour vous émerveiller</p>
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

                <TabsContent value="accommodations" className="p-8">
                  <AccommodationsTab />
                </TabsContent>

                <TabsContent value="experiences" className="p-8">
                  <ExperiencesTab />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="mt-8 text-center space-y-4">
            <div className="flex justify-center gap-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white px-8 shadow-xl"
              >
                ✨ Personnaliser cet itinéraire
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-8"
              >
                💾 Sauvegarder
              </Button>
            </div>
            
            <p className="text-gray-600 italic">
              "Un voyage se vit trois fois : quand on le rêve, quand on le vit, et quand on s'en souvient" ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryDisplay;
