
const API_BASE_URL = 'http://localhost:8000/api';

export interface Country {
  id?: number;
  name: string;
  code: string;
  flag_code: string;
  region?: string;
  user_count?: number;
  cities_count?: number;
  created?: string;
  updated?: string;
}

export interface CountryFormData {
  name: string;
  code: string;
  flag_code: string;
  region?: string;
}

class CountryApiService {
  private getAuthHeader() {
    const token = localStorage.getItem('authToken');
    return token ? { Authorization: `Token ${token}` } : {};
  }

  async getAllCountries(): Promise<Country[]> {
    const response = await fetch(`${API_BASE_URL}/countries/`, {
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des pays');
    }

    return response.json();
  }

  async searchCountries(search: string): Promise<Country[]> {
    const response = await fetch(`${API_BASE_URL}/countries/?search=${encodeURIComponent(search)}`, {
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la recherche des pays');
    }

    return response.json();
  }

  async createCountry(data: CountryFormData): Promise<Country> {
    const response = await fetch(`${API_BASE_URL}/countries/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Erreur lors de la création du pays');
    }

    return response.json();
  }

  async updateCountry(id: number, data: CountryFormData): Promise<Country> {
    const response = await fetch(`${API_BASE_URL}/countries/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Erreur lors de la modification du pays');
    }

    return response.json();
  }

  async deleteCountry(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/countries/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Erreur lors de la suppression du pays');
    }
  }
}

export const countryApiService = new CountryApiService();
