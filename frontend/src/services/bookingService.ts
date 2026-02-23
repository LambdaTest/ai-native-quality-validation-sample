import api from './api';
import { mockBookingService } from './mock/mockBookingService';
import type { Booking } from '../types';

interface CreateBookingData {
  listingId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
}

const realBookingService = {
  async createBooking(data: CreateBookingData): Promise<{ booking: Booking }> {
    const response = await api.post<{ booking: Booking }>('/bookings', data);
    return response.data;
  },

  async getUserBookings(): Promise<{ bookings: Booking[] }> {
    const response = await api.get<{ bookings: Booking[] }>('/bookings/user');
    return response.data;
  },

  async getHostBookings(): Promise<{ bookings: Booking[] }> {
    const response = await api.get<{ bookings: Booking[] }>('/bookings/host');
    return response.data;
  },

  async getBookingById(id: string): Promise<{ booking: Booking }> {
    const response = await api.get<{ booking: Booking }>(`/bookings/${id}`);
    return response.data;
  },

  async cancelBooking(id: string): Promise<{ booking: Booking }> {
    const response = await api.put<{ booking: Booking }>(`/bookings/${id}/cancel`);
    return response.data;
  },
};

export const bookingService = import.meta.env.VITE_MOCK_API === 'true'
  ? mockBookingService
  : realBookingService;
