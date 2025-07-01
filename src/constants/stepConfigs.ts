
import { MapPin, Users, DollarSign, Bed, Activity } from "lucide-react";

export const stepConfigs = [
  {
    id: 'destination',
    title: 'Destination',
    subtitle: 'Où souhaitez-vous voyager ?',
    image: '/placeholder.svg',
    icon: MapPin
  },
  {
    id: 'travelWith',
    title: 'Avec qui voyagez-vous ?',
    subtitle: 'Définissez votre profil de voyage',
    image: '/placeholder.svg',
    icon: Users
  },
  {
    id: 'budgetAndFood',
    title: 'Budget et Cuisine',
    subtitle: 'Quel est votre budget et vos préférences culinaires ?',
    image: '/placeholder.svg',
    icon: DollarSign
  },
  {
    id: 'accommodation',
    title: 'Hébergement',
    subtitle: 'Quel type d\'hébergement préférez-vous ?',
    image: '/placeholder.svg',
    icon: Bed
  },
  {
    id: 'activities',
    title: 'Activités',
    subtitle: 'Quelles activités vous intéressent ?',
    image: '/placeholder.svg',
    icon: Activity
  }
];

export const travelSegments = [
  {
    id: 'solo',
    name: 'En solo',
    desc: 'Voyage en solitaire pour une expérience personnelle',
    emoji: '🧳',
    subSegments: [
      {
        id: 'solo-adventure',
        name: 'Aventurier solo',
        desc: 'Exploration et découverte en autonomie',
        emoji: '🎒'
      },
      {
        id: 'solo-relax',
        name: 'Solo détente',
        desc: 'Voyage de repos et relaxation',
        emoji: '🧘'
      }
    ]
  },
  {
    id: 'couple',
    name: 'En couple',
    desc: 'Voyage romantique à deux',
    emoji: '💑',
    subSegments: [
      {
        id: 'couple-romantic',
        name: 'Romantique',
        desc: 'Voyage romantique et intimiste',
        emoji: '💕'
      },
      {
        id: 'couple-adventure',
        name: 'Couple aventurier',
        desc: 'Aventures partagées à deux',
        emoji: '⛰️'
      }
    ]
  },
  {
    id: 'family',
    name: 'En famille',
    desc: 'Voyage avec enfants et famille',
    emoji: '👨‍👩‍👧‍👦',
    subSegments: [
      {
        id: 'family-young',
        name: 'Jeunes enfants',
        desc: 'Famille avec enfants de moins de 10 ans',
        emoji: '👶'
      },
      {
        id: 'family-teens',
        name: 'Adolescents',
        desc: 'Famille avec adolescents',
        emoji: '👦'
      }
    ]
  },
  {
    id: 'friends',
    name: 'Entre amis',
    desc: 'Voyage en groupe d\'amis',
    emoji: '👥',
    subSegments: [
      {
        id: 'friends-party',
        name: 'Groupe festif',
        desc: 'Voyage axé sur la fête et les sorties',
        emoji: '🎉'
      },
      {
        id: 'friends-culture',
        name: 'Groupe culturel',
        desc: 'Voyage culturel et découverte',
        emoji: '🏛️'
      }
    ]
  },
  {
    id: 'business',
    name: 'Professionnel',
    desc: 'Voyage d\'affaires ou conférence',
    emoji: '💼'
  }
];
