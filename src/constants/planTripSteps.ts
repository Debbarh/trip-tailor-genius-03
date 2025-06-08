
import { MapPin, Users, DollarSign, Bed, Activity } from "lucide-react";

export const stepConfigs = [
  { 
    id: 'destination', 
    title: 'Votre Destination de Rêve', 
    subtitle: 'Où votre aventure commence-t-elle ?', 
    icon: MapPin,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
  },
  { 
    id: 'travelWith', 
    title: 'Vos Compagnons d\'Aventure', 
    subtitle: 'Avec qui partagerez-vous ces moments magiques ?', 
    icon: Users,
    image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
  },
  { 
    id: 'budgetAndFood', 
    title: 'Budget & Saveurs', 
    subtitle: 'Définissons votre budget et vos envies culinaires', 
    icon: DollarSign,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
  },
  { 
    id: 'accommodation', 
    title: 'Votre Refuge', 
    subtitle: 'Où rêvez-vous de poser vos valises ?', 
    icon: Bed,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
  },
  { 
    id: 'activities', 
    title: 'Expériences Inoubliables', 
    subtitle: 'Quelles aventures vous font vibrer ?', 
    icon: Activity,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
  }
];

export const countries = [
  { code: 'MA', name: 'Maroc', cities: ['Marrakech', 'Casablanca', 'Fès', 'Rabat'], emoji: '🇲🇦' },
  { code: 'FR', name: 'France', cities: ['Paris', 'Lyon', 'Marseille', 'Nice'], emoji: '🇫🇷' },
  { code: 'ES', name: 'Espagne', cities: ['Madrid', 'Barcelone', 'Séville', 'Valence'], emoji: '🇪🇸' },
  { code: 'IT', name: 'Italie', cities: ['Rome', 'Milan', 'Florence', 'Venise'], emoji: '🇮🇹' },
  { code: 'GR', name: 'Grèce', cities: ['Athènes', 'Thessalonique', 'Santorin', 'Mykonos'], emoji: '🇬🇷' },
  { code: 'TR', name: 'Turquie', cities: ['Istanbul', 'Ankara', 'Antalya', 'Cappadoce'], emoji: '🇹🇷' }
];

export const travelSegments = [
  { id: 'solo', name: 'Solo', desc: 'Liberté totale et découvertes personnelles', emoji: '🎒' },
  { id: 'couple', name: 'En Couple', desc: 'Moments romantiques et complicité', emoji: '💕' },
  { id: 'family', name: 'En Famille', desc: 'Souvenirs partagés et joie des enfants', emoji: '👨‍👩‍👧‍👦' },
  { id: 'friends', name: 'Entre Amis', desc: 'Fous rires et aventures collectives', emoji: '👥' }
];
