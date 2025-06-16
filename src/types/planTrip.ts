
export interface CityWithDates {
  cityName: string;
  startDate: string;
  endDate: string;
}

export interface CountryWithCities {
  countryName: string;
  cities: CityWithDates[];
}

export interface Destination {
  countries: CountryWithCities[];
}

export interface TravelWith {
  segment: string;
  subSegment: string;
  details?: {
    children?: Array<{ name: string; age: string }>;
    groupSize?: number;
  };
}

export interface PlanTripFormData {
  activities: string[];
  travelWith: string;
  budget: string;
  accommodation: string;
}

export interface PlanTripStepsProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

export interface StepProps {
  formData: PlanTripFormData;
  setFormData: (data: PlanTripFormData) => void;
}
