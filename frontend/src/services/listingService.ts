import api from './api';
import { mockListingService } from './mock/mockListingService';
import type { Listing, ListingsResponse, SearchFilters } from '../types';

const realListingService = {
  async getAllListings(filters?: SearchFilters, page = 1, limit = 20): Promise<ListingsResponse> {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (Array.isArray(value)) {
            params.append(key, value.join(','));
          } else {
            params.append(key, value.toString());
          }
        }
      });
    }

    params.append('page', page.toString());
    params.append('limit', limit.toString());

    const response = await api.get<ListingsResponse>(`/listings?${params.toString()}`);
    return response.data;
  },

  async getListingById(id: string): Promise<{ listing: Listing; reviews: any[] }> {
    const response = await api.get<{ listing: Listing; reviews: any[] }>(`/listings/${id}`);
    return response.data;
  },

  async createListing(data: Partial<Listing>): Promise<{ listing: Listing }> {
    const response = await api.post<{ listing: Listing }>('/listings', data);
    return response.data;
  },

  async updateListing(id: string, data: Partial<Listing>): Promise<{ listing: Listing }> {
    const response = await api.put<{ listing: Listing }>(`/listings/${id}`, data);
    return response.data;
  },

  async deleteListing(id: string): Promise<void> {
    await api.delete(`/listings/${id}`);
  },

  async getAvailability(
    id: string,
    startDate: Date,
    endDate: Date
  ): Promise<{ available: boolean; blockedDates: any[] }> {
    const response = await api.get<{ available: boolean; blockedDates: any[] }>(
      `/listings/${id}/availability`,
      {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      }
    );
    return response.data;
  },
};

export const listingService = import.meta.env.VITE_MOCK_API === 'true'
  ? mockListingService
  : realListingService;
