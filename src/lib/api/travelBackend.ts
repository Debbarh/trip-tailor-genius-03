// Minimal client for the Django backend (not auto-used by the app)
// Default base URL points to local docker-compose backend
export const TRAVEL_BACKEND_BASE_URL = 'http://localhost:8000/api';

export type StepConfig = {
  id: string;
  title: string;
  enabled: boolean;
  order: number;
};

export type StepperConfig = {
  name: string; // 'plan-trip'
  steps: StepConfig[];
  updated_at: string;
};

export type Trip = {
  id: string;
  data: any;
  status: 'draft' | 'submitted' | 'confirmed' | string;
  created_at: string;
  updated_at: string;
  steps?: Array<{ key: string; data: any; order: number }>;
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${TRAVEL_BACKEND_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    ...options,
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${await res.text()}`);
  return res.json() as Promise<T>;
}

// Stepper endpoints
export const getPlanTripStepper = () => request<StepperConfig>('/stepper/plan-trip');
export const updatePlanTripStepper = (payload: Partial<StepperConfig>) =>
  request<StepperConfig>('/stepper/plan-trip', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

// Trips endpoints
export const createTrip = (payload: Partial<Trip>) =>
  request<Trip>('/trips', { method: 'POST', body: JSON.stringify(payload) });
export const listTrips = () => request<Trip[]>('/trips');
export const getTrip = (id: string) => request<Trip>(`/trips/${id}`);
export const updateTrip = (id: string, payload: Partial<Trip>) =>
  request<Trip>(`/trips/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
