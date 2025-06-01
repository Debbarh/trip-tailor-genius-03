import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeftIcon, MapIcon, CalendarIcon, HotelIcon, StarIcon, HeartIcon, ShareIcon, EditIcon, CameraIcon, SunIcon, CloudRainIcon } from "lucide-react";

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
      title: "Votre voyage sur mesure au Maroc",
      destinations: data.countries || ["Maroc"],
      duration: "14 jours",
      overview: "Un voyage inoubliable alliant l'authenticité des traditions berbères, le luxe des riads et la magie du désert",
      budget: "2,800€ par personne",
      bestTime: "Mars - Mai & Septembre - Novembre",
      highlights: [
        "🌅 Lever de soleil sur les dunes de Merzouga",
        "🍽️ Cours de cuisine dans une famille berbère",
        "🏛️ Visite privée des palais de Marrakech",
        "🐪 Caravane de chameaux dans le Sahara",
        "🧘 Séance de hammam traditionnel"
      ],
      weather: { icon: SunIcon, temp: "25°C", condition: "Ensoleillé" },
      days: [
        {
          day: 1,
          city: "Marrakech",
          title: "Arrivée dans la Ville Rouge",
          weather: { icon: SunIcon, temp: "26°C" },
          image: "https://images.unsplash.com/photo-1489749798305-4fea3ae436d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          activities: [
            { 
              time: "14:00", 
              activity: "Arrivée et installation au Riad La Maison Arabe", 
              type: "Hébergement",
              description: "Riad de luxe au cœur de la médina avec spa traditionnel",
              price: "180€/nuit",
              rating: 4.8
            },
            { 
              time: "16:00", 
              activity: "Première exploration de la place Jemaa el-Fna", 
              type: "Culture",
              description: "Spectacle permanent de conteurs, musiciens et danseurs",
              price: "Gratuit",
              rating: 4.9
            },
            { 
              time: "19:30", 
              activity: "Dîner sur terrasse avec vue sur la médina", 
              type: "Gastronomie",
              description: "Tajine d'agneau aux abricots et pâtisseries orientales",
              price: "45€/personne",
              rating: 4.7
            }
          ]
        },
        {
          day: 2,
          city: "Marrakech",
          title: "Immersion culturelle",
          weather: { icon: SunIcon, temp: "28°C" },
          image: "https://images.unsplash.com/photo-1539650116574-75c0c6d89c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          activities: [
            { 
              time: "09:00", 
              activity: "Visite guidée du Palais de la Bahia", 
              type: "Culture",
              description: "Architecture mauresque et jardins somptueux",
              price: "25€/personne",
              rating: 4.6
            },
            { 
              time: "11:30", 
              activity: "Exploration des Tombeaux Saadiens", 
              type: "Culture",
              description: "Nécropole royale aux décorations somptueuses",
              price: "7€/personne",
              rating: 4.5
            },
            { 
              time: "14:00", 
              activity: "Déjeuner dans un café traditionnel des souks", 
              type: "Gastronomie",
              description: "Couscous royal et thé à la menthe fraîche",
              price: "20€/personne",
              rating: 4.4
            },
            { 
              time: "16:00", 
              activity: "Atelier de cuisine marocaine authentique", 
              type: "Expérience",
              description: "Apprenez les secrets du tajine et des épices",
              price: "85€/personne",
              rating: 4.9
            }
          ]
        },
        {
          day: 3,
          city: "Atlas",
          title: "Évasion dans les montagnes",
          weather: { icon: CloudRainIcon, temp: "18°C" },
          image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          activities: [
            { 
              time: "08:00", 
              activity: "Départ pour les vallées de l'Atlas", 
              type: "Transport",
              description: "Route panoramique vers les villages berbères",
              price: "Inclus",
              rating: 4.3
            },
            { 
              time: "10:30", 
              activity: "Randonnée guidée dans les villages berbères", 
              type: "Trekking",
              description: "Rencontre avec les familles locales et leurs traditions",
              price: "65€/personne",
              rating: 4.8
            },
            { 
              time: "13:00", 
              activity: "Déjeuner chez l'habitant avec vue sur les sommets", 
              type: "Authentique",
              description: "Repas partagé dans une maison traditionnelle en terre",
              price: "30€/personne",
              rating: 4.9
            },
            { 
              time: "18:00", 
              activity: "Retour à Marrakech au coucher du soleil", 
              type: "Transport",
              description: "Paysages magiques baignés de lumière dorée",
              price: "Inclus",
              rating: 4.7
            }
          ]
        }
      ]
    };
  } else {
    return {
      title: "Découverte magique : Le Maroc Impérial",
      destinations: ["Maroc"],
      duration: "10 jours",
      overview: "Un voyage enchanteur à travers les villes impériales, mêlant histoire millénaire et hospitalité berbère",
      reasoning: "Basé sur votre profil et vos envies d'authenticité, le Maroc vous offre une expérience sensorielle unique entre traditions ancestrales et luxe oriental.",
      budget: "2,200€ par personne",
      bestTime: "Mars - Mai & Octobre - Décembre",
      highlights: [
        "🕌 Architecture islamique exceptionnelle",
        "🎭 Spectacles folkloriques berbères",
        "🍽️ Gastronomie épicée et raffinée",
        "🛍️ Artisanat authentique des souks",
        "🏺 Ateliers poterie et tapis"
      ],
      weather: { icon: SunIcon, temp: "24°C", condition: "Parfait" },
      days: [
        {
          day: 1,
          city: "Casablanca",
          title: "Gateway to Morocco",
          weather: { icon: SunIcon, temp: "23°C" },
          image: "https://images.unsplash.com/photo-1539650116574-75c0c6d89c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          activities: [
            { 
              time: "15:00", 
              activity: "Installation au Four Seasons Casablanca", 
              type: "Hébergement",
              description: "Luxe moderne face à l'océan Atlantique",
              price: "280€/nuit",
              rating: 4.9
            },
            { 
              time: "17:00", 
              activity: "Visite de la Mosquée Hassan II", 
              type: "Culture",
              description: "Joyau architectural face à l'océan",
              price: "15€/personne",
              rating: 4.8
            },
            { 
              time: "20:00", 
              activity: "Dîner au légendaire Rick's Café", 
              type: "Gastronomie",
              description: "Ambiance Casablanca et cuisine franco-marocaine",
              price: "65€/personne",
              rating: 4.6
            }
          ]
        },
        {
          day: 2,
          city: "Rabat",
          title: "La capitale aux mille charmes",
          weather: { icon: SunIcon, temp: "25°C" },
          image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          activities: [
            { 
              time: "09:00", 
              activity: "Route vers Rabat la capitale", 
              type: "Transport",
              description: "Paysages côtiers et campagne marocaine",
              price: "Inclus",
              rating: 4.4
            },
            { 
              time: "11:00", 
              activity: "Exploration de la Tour Hassan et du Mausolée", 
              type: "Culture",
              description: "Symboles de la grandeur almoravide",
              price: "10€/personne",
              rating: 4.7
            },
            { 
              time: "14:00", 
              activity: "Déjeuner dans la médina authentique", 
              type: "Gastronomie",
              description: "Pastilla au pigeon et thé à la menthe",
              price: "25€/personne",
              rating: 4.5
            },
            { 
              time: "16:00", 
              activity: "Flânerie dans les Jardins Andalous", 
              type: "Bien-être",
              description: "Oasis de paix aux parfums d'orange",
              price: "5€/personne",
              rating: 4.6
            }
          ]
        }
      ]
    };
  }
};

const ItineraryDisplay = ({ data, onBack }: ItineraryDisplayProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [favorites, setFavorites] = useState<number[]>([]);
  const itinerary = generateSampleItinerary(data);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "Culture": return "🏛️";
      case "Gastronomie": return "🍽️";
      case "Hébergement": return "🏨";
      case "Aventure": case "Trekking": return "🥾";
      case "Bien-être": return "🧘";
      case "Transport": return "🚗";
      case "Expérience": return "✨";
      case "Authentique": return "🏡";
      default: return "📍";
    }
  };

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
            <CardHeader className="bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 text-white relative overflow-hidden">
              {/* Éléments décoratifs */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
              
              <div className="flex items-center justify-between mb-6 relative z-10">
                <Button 
                  variant="ghost" 
                  onClick={onBack}
                  className="text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Nouvelle recherche
                </Button>
                
                <div className="flex gap-3">
                  <Button variant="ghost" className="text-white hover:bg-white/20">
                    <ShareIcon className="w-4 h-4 mr-2" />
                    Partager
                  </Button>
                  <Button variant="ghost" className="text-white hover:bg-white/20">
                    <EditIcon className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                </div>
              </div>

              <div className="relative z-10">
                <CardTitle className="text-4xl font-bold mb-4 flex items-center gap-3">
                  ✨ {itinerary.title}
                </CardTitle>
                
                <div className="grid md:grid-cols-4 gap-6 text-sm mb-6">
                  <div className="flex items-center bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                    <MapIcon className="w-5 h-5 mr-2 text-yellow-300" />
                    <div>
                      <div className="font-semibold">Destinations</div>
                      <div className="opacity-90">{itinerary.destinations.join(", ")}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                    <CalendarIcon className="w-5 h-5 mr-2 text-green-300" />
                    <div>
                      <div className="font-semibold">Durée</div>
                      <div className="opacity-90">{itinerary.duration}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                    <HotelIcon className="w-5 h-5 mr-2 text-blue-300" />
                    <div>
                      <div className="font-semibold">Budget</div>
                      <div className="opacity-90">{itinerary.budget}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                    <itinerary.weather.icon className="w-5 h-5 mr-2 text-orange-300" />
                    <div>
                      <div className="font-semibold">Météo</div>
                      <div className="opacity-90">{itinerary.weather.temp} {itinerary.weather.condition}</div>
                    </div>
                  </div>
                </div>

                <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <p className="text-lg leading-relaxed">{itinerary.overview}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-gray-50 to-blue-50">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-emerald-100">✨ Aperçu</TabsTrigger>
                  <TabsTrigger value="itinerary" className="data-[state=active]:bg-blue-100">📅 Programme</TabsTrigger>
                  <TabsTrigger value="accommodations" className="data-[state=active]:bg-purple-100">🏨 Hébergements</TabsTrigger>
                  <TabsTrigger value="experiences" className="data-[state=active]:bg-orange-100">🎭 Expériences</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-emerald-50 to-blue-50 p-6 rounded-xl">
                        <h3 className="text-2xl font-bold mb-4 text-emerald-800">🌟 Points forts de votre voyage</h3>
                        <div className="space-y-3">
                          {itinerary.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                              <span className="text-lg">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {'reasoning' in itinerary && (
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
                          <h4 className="text-xl font-bold text-blue-900 mb-3">🎯 Pourquoi cette destination ?</h4>
                          <p className="text-blue-800 leading-relaxed">{itinerary.reasoning}</p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-orange-50 to-pink-50 p-6 rounded-xl">
                        <h3 className="text-xl font-bold mb-4 text-orange-800">👤 Votre profil voyageur</h3>
                        <div className="grid gap-4">
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="font-semibold text-gray-700">Segment</div>
                            <div className="text-lg text-orange-600">{data.travelerProfile?.segment}</div>
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="font-semibold text-gray-700">Style</div>
                            <div className="text-lg text-orange-600">{data.preferences?.ambiance}</div>
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="font-semibold text-gray-700">Hébergement</div>
                            <div className="text-lg text-orange-600">{data.preferences?.accommodation}</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                        <h3 className="text-xl font-bold mb-4 text-purple-800">🎭 Vos expériences</h3>
                        <div className="flex flex-wrap gap-2">
                          {data.preferences?.experiences?.map(exp => (
                            <Badge key={exp} className="bg-purple-100 text-purple-800 px-3 py-1 text-sm">
                              {exp}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="itinerary" className="p-8">
                  <div className="space-y-8">
                    <div className="text-center mb-8">
                      <h3 className="text-3xl font-bold text-gray-800 mb-2">📅 Votre aventure jour par jour</h3>
                      <p className="text-gray-600">Chaque moment a été pensé pour vous émerveiller</p>
                    </div>

                    {itinerary.days.map((day, dayIndex) => (
                      <Card key={day.day} className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-0">
                        {/* En-tête du jour avec image */}
                        <div 
                          className="h-48 bg-cover bg-center relative"
                          style={{ backgroundImage: `url('${day.image}')` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
                          <div className="absolute inset-0 flex items-end p-6">
                            <div className="text-white">
                              <div className="flex items-center gap-4 mb-2">
                                <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                                  {day.day}
                                </div>
                                <div>
                                  <h3 className="text-2xl font-bold">{day.title}</h3>
                                  <div className="flex items-center gap-3 text-sm opacity-90">
                                    <span className="flex items-center gap-1">
                                      📍 {day.city}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <day.weather.icon className="w-4 h-4" />
                                      {day.weather.temp}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => toggleFavorite(dayIndex)}
                              className="ml-auto p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                            >
                              <HeartIcon 
                                className={`w-6 h-6 transition-colors ${
                                  favorites.includes(dayIndex) ? 'text-red-500 fill-current' : 'text-white'
                                }`} 
                              />
                            </button>
                          </div>
                        </div>

                        <CardContent className="p-0">
                          <div className="p-6 space-y-4">
                            {day.activities.map((activity, idx) => (
                              <div key={idx} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 hover:shadow-md transition-all duration-200">
                                <div className="flex items-start gap-4">
                                  <div className="text-sm font-mono bg-emerald-100 text-emerald-800 px-3 py-2 rounded-lg font-bold min-w-fit">
                                    {activity.time}
                                  </div>
                                  
                                  <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                      <div className="flex items-center gap-3">
                                        <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                                        <div>
                                          <h4 className="font-bold text-gray-800 text-lg">{activity.activity}</h4>
                                          <p className="text-gray-600 text-sm">{activity.description}</p>
                                        </div>
                                      </div>
                                      
                                      <div className="text-right">
                                        <div className="flex items-center gap-1 text-yellow-500 mb-1">
                                          {[...Array(5)].map((_, i) => (
                                            <StarIcon key={i} className={`w-3 h-3 ${i < Math.floor(activity.rating) ? 'fill-current' : ''}`} />
                                          ))}
                                          <span className="text-xs text-gray-600 ml-1">{activity.rating}</span>
                                        </div>
                                        <div className="font-bold text-emerald-600">{activity.price}</div>
                                      </div>
                                    </div>
                                    
                                    <div className="flex justify-between items-center">
                                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                        {activity.type}
                                      </Badge>
                                      <Button size="sm" variant="outline" className="text-xs">
                                        <CameraIcon className="w-3 h-3 mr-1" />
                                        Photos
                                      </Button>
                                    </div>
                                  </div>
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
