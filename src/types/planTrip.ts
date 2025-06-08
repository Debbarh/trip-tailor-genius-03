
export interface Destination {
  country: string;
  city: string;
  dates: string;
}

export interface TravelWith {
  segment: string;
  subSegment: string;
}

export interface BudgetAndFood {
  budget: string;
  cuisine: string[];
}

export interface Accommodation {
  type: string;
  preferences: string[];
}

export interface PlanTripFormData {
  destination: Destination;
  travelWith: TravelWith;
  budgetAndFood: BudgetAndFood;
  accommodation: Accommodation;
  activities: string[];
}

export interface PlanTripStepsProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

export interface StepProps {
  formData: PlanTripFormData;
  setFormData: (data: PlanTripFormData) => void;
}
