
import { SunIcon, CloudRainIcon } from "lucide-react";
import { TripData, GeneratedItinerary } from "@/types/itinerary";

export const generateSampleItinerary = (data: TripData): GeneratedItinerary => {
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

export const getActivityIcon = (type: string): string => {
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
