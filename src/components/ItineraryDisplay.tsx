
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeftIcon, MapIcon, CalendarIcon, HotelIcon } from "lucide-react";

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
  inspiration?: {
    budget: string;
    duration: string;
    season: string;
    interests: string;
  };
}

interface ItineraryDisplayProps {
  data: TripData;
  onBack: () => void;
}

// Données d'exemple pour l'itinéraire généré
const generateSampleItinerary = (data: TripData) => {
  if (data.mode === 'plan') {
    return {
      title: "Votre itinéraire personnalisé",
      destinations: data.countries || ["Maroc"],
      duration: "14 jours",
      overview: "Un voyage sur mesure alliant culture authentique et détente",
      days: [
        {
          day: 1,
          city: "Marrakech",
          title: "Arrivée à Marrakech",
          activities: [
            { time: "14:00", activity: "Arrivée et installation au Riad La Maison Arabe", type: "Hébergement" },
            { time: "16:00", activity: "Exploration de la Médina et de la place Jemaa el-Fna", type: "Culture" },
            { time: "19:30", activity: "Dîner traditionnel au restaurant Dar Yacout", type: "Gastronomie" }
          ]
        },
        {
          day: 2,
          city: "Marrakech",
          title: "Découverte culturelle",
          activities: [
            { time: "09:00", activity: "Visite du Palais de la Bahia", type: "Culture" },
            { time: "11:00", activity: "Exploration des Tombeaux Saadiens", type: "Culture" },
            { time: "14:00", activity: "Déjeuner dans un café traditionnel", type: "Gastronomie" },
            { time: "16:00", activity: "Cours de cuisine marocaine", type: "Gastronomie" }
          ]
        },
        {
          day: 3,
          city: "Atlas",
          title: "Excursion dans l'Atlas",
          activities: [
            { time: "08:00", activity: "Départ pour les montagnes de l'Atlas", type: "Aventure" },
            { time: "10:30", activity: "Randonnée dans les villages berbères", type: "Trekking" },
            { time: "13:00", activity: "Déjeuner chez l'habitant", type: "Authentique" },
            { time: "18:00", activity: "Retour à Marrakech", type: "Transport" }
          ]
        }
      ]
    };
  } else {
    return {
      title: "Destination recommandée : Maroc Imperial",
      destinations: ["Maroc"],
      duration: "10 jours",
      overview: "Découverte des villes impériales et de la culture marocaine",
      reasoning: "Basé sur votre profil et vos préférences, le Maroc offre une expérience culturelle riche avec une gastronomie exceptionnelle.",
      days: [
        {
          day: 1,
          city: "Casablanca",
          title: "Arrivée à Casablanca",
          activities: [
            { time: "15:00", activity: "Arrivée et installation à l'hôtel Four Seasons", type: "Hébergement" },
            { time: "17:00", activity: "Visite de la Mosquée Hassan II", type: "Culture" },
            { time: "20:00", activity: "Dîner au restaurant Rick's Café", type: "Gastronomie" }
          ]
        },
        {
          day: 2,
          city: "Rabat",
          title: "Capitale administrative",
          activities: [
            { time: "09:00", activity: "Départ pour Rabat", type: "Transport" },
            { time: "11:00", activity: "Visite de la Tour Hassan", type: "Culture" },
            { time: "14:00", activity: "Déjeuner dans la Médina", type: "Gastronomie" },
            { time: "16:00", activity: "Promenade dans les Jardins Andalous", type: "Bien-être" }
          ]
        }
      ]
    };
  }
};

const ItineraryDisplay = ({ data, onBack }: ItineraryDisplayProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const itinerary = generateSampleItinerary(data);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "Culture": return "🏛️";
      case "Gastronomie": return "🍽️";
      case "Hébergement": return "🏨";
      case "Aventure": case "Trekking": return "🥾";
      case "Bien-être": return "🧘";
      case "Transport": return "🚗";
      default: return "📍";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white">
            <div className="flex items-center justify-between mb-4">
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Nouvelle recherche
              </Button>
              <div className="text-sm opacity-90">Itinéraire généré par IA</div>
            </div>
            <CardTitle className="text-3xl font-bold mb-2">{itinerary.title}</CardTitle>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center">
                <MapIcon className="w-4 h-4 mr-1" />
                {itinerary.destinations.join(", ")}
              </div>
              <div className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-1" />
                {itinerary.duration}
              </div>
              <div className="flex items-center">
                <HotelIcon className="w-4 h-4 mr-1" />
                {data.preferences?.accommodation || "Hébergement de qualité"}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Aperçu</TabsTrigger>
                <TabsTrigger value="itinerary">Itinéraire</TabsTrigger>
                <TabsTrigger value="accommodations">Hébergements</TabsTrigger>
                <TabsTrigger value="experiences">Expériences</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Résumé de votre voyage</h3>
                    <p className="text-gray-600 leading-relaxed">{itinerary.overview}</p>
                    {'reasoning' in itinerary && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Pourquoi cette destination ?</h4>
                        <p className="text-blue-800">{itinerary.reasoning}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Votre profil voyageur</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div><span className="font-medium">Segment :</span> {data.travelerProfile?.segment}</div>
                        <div><span className="font-medium">Profil :</span> {data.travelerProfile?.subSegment}</div>
                        <div><span className="font-medium">Groupe :</span> {data.travelerProfile?.groupComposition}</div>
                      </div>
                      <div className="space-y-2">
                        <div><span className="font-medium">Hébergement :</span> {data.preferences?.accommodation}</div>
                        <div><span className="font-medium">Ambiance :</span> {data.preferences?.ambiance}</div>
                        {data.inspiration?.budget && (
                          <div><span className="font-medium">Budget :</span> {data.inspiration.budget}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Expériences sélectionnées</h3>
                    <div className="flex flex-wrap gap-2">
                      {data.preferences?.experiences?.map(exp => (
                        <Badge key={exp} variant="secondary" className="px-3 py-1">
                          {exp}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="itinerary" className="p-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Programme détaillé jour par jour</h3>
                  {itinerary.days.map((day) => (
                    <Card key={day.day} className="border-l-4 border-l-emerald-500">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {day.day}
                          </div>
                          <div>
                            <div className="text-lg">{day.title}</div>
                            <div className="text-sm text-gray-600 font-normal">{day.city}</div>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {day.activities.map((activity, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                              <div className="text-sm font-mono bg-white px-2 py-1 rounded border">
                                {activity.time}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-lg">{getActivityIcon(activity.type)}</span>
                                  <span className="font-medium">{activity.activity}</span>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {activity.type}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="accommodations" className="p-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Hébergements recommandés</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          🏨 Riad La Maison Arabe
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-3">Riad de luxe au cœur de la médina de Marrakech</p>
                        <div className="space-y-2 text-sm">
                          <div>📍 Médina, Marrakech</div>
                          <div>⭐ 4.8/5 (240 avis)</div>
                          <div>💰 180-250€/nuit</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          🏨 Four Seasons Casablanca
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-3">Hôtel moderne avec vue sur l'océan Atlantique</p>
                        <div className="space-y-2 text-sm">
                          <div>📍 Corniche, Casablanca</div>
                          <div>⭐ 4.9/5 (310 avis)</div>
                          <div>💰 280-350€/nuit</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="experiences" className="p-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Expériences uniques recommandées</h3>
                  <div className="grid gap-6">
                    <Card className="border-l-4 border-l-orange-500">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          🍽️ Cours de cuisine marocaine authentique
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-3">Apprenez à préparer un tajine traditionnel avec une famille berbère</p>
                        <div className="flex gap-4 text-sm">
                          <span>⏱️ 4 heures</span>
                          <span>👥 Groupe de 6 max</span>
                          <span>💰 85€/personne</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-green-500">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          🥾 Randonnée dans l'Atlas avec guide berbère
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-3">Exploration des villages traditionnels et des paysages montagnards</p>
                        <div className="flex gap-4 text-sm">
                          <span>⏱️ Journée complète</span>
                          <span>👥 Groupe privé</span>
                          <span>💰 120€/personne</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white px-8"
          >
            Personnaliser cet itinéraire
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItineraryDisplay;
