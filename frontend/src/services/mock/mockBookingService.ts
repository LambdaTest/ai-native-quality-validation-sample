import { mockBookings, mockListings, findById } from '../../data/mockData';
import type { Booking } from '../../types';
import { delay, createMockError, getCurrentUserId } from './mockHelpers';

export const mockBookingService = {
  async createBooking(data: {
    listingId: string;
    checkIn: Date;
    checkOut: Date;
    guests: number;
  }): Promise<{ booking: Booking }> {
    await delay();

    const userId = getCurrentUserId();
    if (!userId) throw createMockError(401, 'Not authenticated');

    const listing = findById(mockListings, data.listingId);
    if (!listing) throw createMockError(404, 'Listing not found');

    const start = new Date(data.checkIn);
    const end = new Date(data.checkOut);

    const conflicts = mockBookings.filter(b => {
      if (b.listingId !== data.listingId) return false;
      if (!['confirmed', 'pending'].includes(b.status)) return false;

      const checkIn = new Date(b.checkIn);
      const checkOut = new Date(b.checkOut);

      return (
        (checkIn >= start && checkIn <= end) ||
        (checkOut >= start && checkOut <= end) ||
        (checkIn <= start && checkOut >= end)
      );
    });

    if (conflicts.length > 0) {
      throw createMockError(400, 'Listing not available for selected dates');
    }

    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * listing.price;

    const newBooking = {
      _id: `707f1f77bcf86cd79943903${mockBookings.length + 1}`,
      listingId: data.listingId,
      guestId: userId,
      hostId: listing.hostId,
      checkIn: start.toISOString(),
      checkOut: end.toISOString(),
      guests: data.guests,
      totalPrice,
      status: 'confirmed' as 'pending' | 'confirmed' | 'cancelled' | 'completed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockBookings.push(newBooking);

    return { booking: newBooking as unknown as Booking };
  },

  async getUserBookings(): Promise<{ bookings: Booking[] }> {
    await delay();

    const userId = getCurrentUserId();
    if (!userId) throw createMockError(401, 'Not authenticated');

    const userBookings = mockBookings.filter(b => b.guestId === userId);

    const bookingsWithDetails = userBookings.map(booking => {
      const listing = findById(mockListings, booking.listingId);
      return {
        ...booking,
        listing: listing
          ? { _id: listing._id, title: listing.title, images: listing.images, location: listing.location, price: listing.price }
          : null,
      };
    });

    return { bookings: bookingsWithDetails as unknown as Booking[] };
  },

  async getHostBookings(): Promise<{ bookings: Booking[] }> {
    await delay();

    const userId = getCurrentUserId();
    if (!userId) throw createMockError(401, 'Not authenticated');

    const hostBookings = mockBookings.filter(b => b.hostId === userId);

    const bookingsWithDetails = hostBookings.map(booking => {
      const listing = findById(mockListings, booking.listingId);
      return {
        ...booking,
        listing: listing
          ? { _id: listing._id, title: listing.title, images: listing.images, location: listing.location, price: listing.price }
          : null,
      };
    });

    return { bookings: bookingsWithDetails as unknown as Booking[] };
  },

  async getBookingById(id: string): Promise<{ booking: Booking }> {
    await delay();

    const booking = findById(mockBookings, id);
    if (!booking) throw createMockError(404, 'Booking not found');

    return { booking: booking as unknown as Booking };
  },

  async cancelBooking(id: string): Promise<{ booking: Booking }> {
    await delay();

    const userId = getCurrentUserId();
    if (!userId) throw createMockError(401, 'Not authenticated');

    const idx = mockBookings.findIndex(b => b._id === id);
    if (idx === -1) throw createMockError(404, 'Booking not found');

    const booking = mockBookings[idx];
    if (booking.guestId !== userId && booking.hostId !== userId) {
      throw createMockError(403, 'Not authorized to cancel this booking');
    }

    mockBookings[idx] = {
      ...booking,
      status: 'cancelled' as 'pending' | 'confirmed' | 'cancelled' | 'completed',
      updatedAt: new Date().toISOString(),
    };

    return { booking: mockBookings[idx] as unknown as Booking };
  },
};
