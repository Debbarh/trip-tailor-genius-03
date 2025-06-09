
export interface Country {
  id: string;
  name: string;
  code: string;
  flagCode: string;
  cities?: string[];
}

export const countriesData: Country[] = [
  {
    id: '1',
    name: 'Maroc',
    code: 'MA',
    flagCode: '🇲🇦',
    cities: ['Marrakech', 'Casablanca', 'Fès', 'Rabat', 'Agadir', 'Tanger']
  },
  {
    id: '2',
    name: 'France',
    code: 'FR',
    flagCode: '🇫🇷',
    cities: ['Paris', 'Lyon', 'Marseille', 'Nice', 'Bordeaux', 'Strasbourg']
  },
  {
    id: '3',
    name: 'Espagne',
    code: 'ES',
    flagCode: '🇪🇸',
    cities: ['Madrid', 'Barcelone', 'Séville', 'Valence', 'Bilbao', 'Saragosse']
  },
  {
    id: '4',
    name: 'Italie',
    code: 'IT',
    flagCode: '🇮🇹',
    cities: ['Rome', 'Milan', 'Florence', 'Venise', 'Naples', 'Turin']
  },
  {
    id: '5',
    name: 'Grèce',
    code: 'GR',
    flagCode: '🇬🇷',
    cities: ['Athènes', 'Thessalonique', 'Santorin', 'Mykonos', 'Rhodes', 'Crète']
  },
  {
    id: '6',
    name: 'Turquie',
    code: 'TR',
    flagCode: '🇹🇷',
    cities: ['Istanbul', 'Ankara', 'Antalya', 'Cappadoce', 'Izmir', 'Bodrum']
  },
  {
    id: '7',
    name: 'Portugal',
    code: 'PT',
    flagCode: '🇵🇹',
    cities: ['Lisbonne', 'Porto', 'Faro', 'Braga', 'Coimbra', 'Aveiro']
  },
  {
    id: '8',
    name: 'Allemagne',
    code: 'DE',
    flagCode: '🇩🇪',
    cities: ['Berlin', 'Munich', 'Hambourg', 'Cologne', 'Francfort', 'Stuttgart']
  },
  {
    id: '9',
    name: 'Royaume-Uni',
    code: 'GB',
    flagCode: '🇬🇧',
    cities: ['Londres', 'Manchester', 'Liverpool', 'Edinburgh', 'Belfast', 'Cardiff']
  },
  {
    id: '10',
    name: 'Japon',
    code: 'JP',
    flagCode: '🇯🇵',
    cities: ['Tokyo', 'Kyoto', 'Osaka', 'Hiroshima', 'Nara', 'Sapporo']
  }
];
