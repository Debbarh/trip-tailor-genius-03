
import { Sparkles, Users, DollarSign, Bed } from "lucide-react";
import { CountryService } from "@/services/countryService";

export const stepConfigs = [
  { 
    id: 'activities', 
    title: 'Vos Passions', 
    subtitle: 'Qu\'est-ce qui fait battre votre cœur de voyageur ?', 
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
  },
  { 
    id: 'travelWith', 
    title: 'Votre Tribu', 
    subtitle: 'Avec qui partagerez-vous ces instants magiques ?', 
    icon: Users,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
  },
  { 
    id: 'budget', 
    title: 'Votre Investissement Bonheur', 
    subtitle: 'Combien voulez-vous investir dans vos rêves ?', 
    icon: DollarSign,
    image: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
  },
  { 
    id: 'accommodation', 
    title: 'Votre Cocon', 
    subtitle: 'Où aimez-vous poser vos valises pour rêver ?', 
    icon: Bed,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
  }
];

// Utilisation de la nouvelle base de données pour les pays
export const countries = CountryService.getAllCountries().map(country => ({
  code: country.code,
  name: country.name,
  cities: country.cities || [],
  emoji: country.flagCode
}));

export const travelSegments = [
  { 
    id: 'solo', 
    name: 'Solo', 
    desc: 'Liberté totale et découvertes personnelles', 
    emoji: '🎒',
    subSegments: [
      { id: 'young-adult-solo', name: 'Young Adult Solo', desc: 'Aventure et découverte (18-35 ans)', emoji: '🌟' },
      { id: 'senior-solo', name: 'Senior Solo', desc: 'Voyage serein et culturel (55+ ans)', emoji: '🧳' }
    ]
  },
  { 
    id: 'couple', 
    name: 'En Couple', 
    desc: 'Moments romantiques et complicité', 
    emoji: '💕',
    subSegments: [
      { id: 'young-couple', name: 'Jeune Couple', desc: 'Romance et aventure (20-40 ans)', emoji: '💑' },
      { id: 'senior-couple', name: 'Couple Senior', desc: 'Confort et moments privilégiés (50+ ans)', emoji: '👫' }
    ]
  },
  { 
    id: 'family', 
    name: 'En Famille', 
    desc: 'Souvenirs partagés et joie des enfants', 
    emoji: '👨‍👩‍👧‍👦',
    subSegments: [
      { id: 'young-family', name: 'Jeune Famille', desc: 'Avec enfants en bas âge (0-12 ans)', emoji: '👶' },
      { id: 'senior-family', name: 'Famille Senior', desc: 'Voyage multi-générationnel', emoji: '👴👵' }
    ]
  },
  { 
    id: 'friends', 
    name: 'Entre Amis', 
    desc: 'Fous rires et aventures collectives', 
    emoji: '👥',
    subSegments: [
      { id: 'group-friends', name: 'Group of Friends', desc: 'Amis du même âge', emoji: '🎉' },
      { id: 'multi-generational', name: 'Multi-generational Group', desc: 'Groupe mixte d\'âges différents', emoji: '👨‍👩‍👧‍👦' }
    ]
  }
];
