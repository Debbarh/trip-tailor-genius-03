export const activityCategories = [
  {
    id: 'culture-history',
    name: 'Culture et Histoire',
    emoji: '🏛️',
    description: 'Musées, monuments historiques, sites culturels'
  },
  {
    id: 'adventure-sport',
    name: 'Aventure et Sport',
    emoji: '⛰️',
    description: 'Randonnée, sports extrêmes, activités outdoor'
  },
  {
    id: 'relaxation-wellness',
    name: 'Détente et Bien-être',
    emoji: '🧘',
    description: 'Spas, yoga, détente'
  },
  {
    id: 'gastronomy-flavors',
    name: 'Gastronomie et Saveurs',
    emoji: '🍷',
    description: 'Restaurants, marchés locaux, dégustation'
  },
  {
    id: 'nightlife-entertainment',
    name: 'Vie Nocturne et Divertissement',
    emoji: '🎭',
    description: 'Bars, clubs, spectacles'
  },
  {
    id: 'nature-landscapes',
    name: 'Nature et Paysages',
    emoji: '🌿',
    description: 'Parcs naturels, jardins, paysages'
  },
  {
    id: 'shopping-crafts',
    name: 'Shopping et Artisanat',
    emoji: '🛍️',
    description: 'Boutiques, marchés, artisanat local'
  }
];

export const budgetOptions = [
  {
    id: 'economic',
    name: 'Économique',
    emoji: '💰',
    description: 'Budget serré, options abordables'
  },
  {
    id: 'standard',
    name: 'Standard',
    emoji: '💳',
    description: 'Budget moyen, bon rapport qualité-prix'
  },
  {
    id: 'premium',
    name: 'Premium',
    emoji: '💎',
    description: 'Budget élevé, expériences haut de gamme'
  },
  {
    id: 'luxury',
    name: 'Luxe',
    emoji: '👑',
    description: 'Budget illimité, expériences exceptionnelles'
  }
];

export const durationOptions = [
  {
    id: 'hours',
    name: 'Quelques heures',
    emoji: '⏰',
    description: '2-4 heures'
  },
  {
    id: 'day',
    name: 'Une journée',
    emoji: '☀️',
    description: 'Journée complète'
  },
  {
    id: 'weekend',
    name: 'Week-end',
    emoji: '📅',
    description: '2-3 jours'
  },
  {
    id: 'week',
    name: 'Une semaine',
    emoji: '🗓️',
    description: '7 jours ou plus'
  }
];

export const accommodationTypes = [
  {
    id: 'hotel',
    name: 'Hôtel',
    emoji: '🏨',
    description: 'Hôtels traditionnels'
  },
  {
    id: 'boutique-hotel',
    name: 'Hôtel Boutique',
    emoji: '🏛️',
    description: 'Hôtels de charme'
  },
  {
    id: 'apartment',
    name: 'Appartement',
    emoji: '🏠',
    description: 'Location d\'appartement'
  },
  {
    id: 'villa',
    name: 'Villa',
    emoji: '🏡',
    description: 'Maisons et villas privées'
  },
  {
    id: 'hostel',
    name: 'Auberge de Jeunesse',
    emoji: '🎒',
    description: 'Hébergement économique'
  },
  {
    id: 'guesthouse',
    name: 'Maison d\'Hôtes',
    emoji: '🏘️',
    description: 'Hébergement chez l\'habitant'
  }
];

// Sample POI data for demonstration
export const samplePOIs = [
  {
    id: '1',
    name: 'Musée du Louvre',
    description: 'Le plus grand musée d\'art au monde',
    latitude: 48.8606,
    longitude: 2.3376,
    category: 'culture-history',
    rating: 4.7,
    photos: ['/placeholder.svg'],
    reviews: [
      {
        id: '1',
        userId: '1',
        userName: 'Marie',
        rating: 5,
        comment: 'Incontournable ! La Joconde vaut le détour.',
        date: '2024-01-15'
      }
    ],
    practicalInfo: {
      openingHours: '9h-18h (fermé mardi)',
      price: '17€ (gratuit -18 ans)',
      accessibility: 'Accessible PMR',
      website: 'www.louvre.fr',
      phone: '+33 1 40 20 50 50',
      address: 'Rue de Rivoli, 75001 Paris'
    },
    budget: 'standard' as const,
    duration: 'day' as const,
    travelerSegment: ['solo', 'couple', 'family', 'friends'],
    accommodationType: ['hotel', 'boutique-hotel']
  },
  {
    id: '2',
    name: 'Parc des Buttes-Chaumont',
    description: 'Magnifique parc avec vue sur Paris',
    latitude: 48.8799,
    longitude: 2.3831,
    category: 'nature-landscapes',
    rating: 4.5,
    photos: ['/placeholder.svg'],
    reviews: [
      {
        id: '2',
        userId: '2',
        userName: 'Pierre',
        rating: 4,
        comment: 'Parfait pour une promenade relaxante.',
        date: '2024-01-20'
      }
    ],
    practicalInfo: {
      openingHours: '7h-20h (été), 7h-19h (hiver)',
      price: 'Gratuit',
      accessibility: 'Partiellement accessible',
      address: '1 Rue Botzaris, 75019 Paris'
    },
    budget: 'economic' as const,
    duration: 'hours' as const,
    travelerSegment: ['solo', 'couple', 'family'],
    accommodationType: ['apartment', 'hotel']
  }
];