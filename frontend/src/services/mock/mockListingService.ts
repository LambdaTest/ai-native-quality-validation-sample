import { mockListings, mockReviews, mockUsers, mockBookings, findById } from '../../data/mockData';
import type { Listing, ListingsResponse, SearchFilters } from '../../types';
import { delay, createMockError, getCurrentUserId } from './mockHelpers';

export const mockListingService = {
  async getAllListings(filters?: SearchFilters, page = 1, limit = 20): Promise<ListingsResponse> {
    await delay();

    let filtered = [...mockListings];

    if (filters) {
      const { city, country, propertyType, minPrice, maxPrice, guests, bedrooms, bathrooms, amenities } = filters;

      if (city) {
        filtered = filtered.filter(l => l.location.city.toLowerCase().includes(city.toLowerCase()));
      }
      if (country) {
        filtered = filtered.filter(l => l.location.country.toLowerCase().includes(country.toLowerCase()));
      }
      if (propertyType) {
        filtered = filtered.filter(l => l.propertyType === propertyType);
      }
      if (guests) {
        filtered = filtered.filter(l => l.maxGuests >= guests);
      }
      if (bedrooms) {
        filtered = filtered.filter(l => l.bedrooms >= bedrooms);
      }
      if (bathrooms) {
        filtered = filtered.filter(l => l.bathrooms >= bathrooms);
      }
      if (minPrice) {
        filtered = filtered.filter(l => l.price >= minPrice);
      }
      if (maxPrice) {
        filtered = filtered.filter(l => l.price <= maxPrice);
      }
      if (amenities && amenities.length > 0) {
        filtered = filtered.filter(l => amenities.every(a => l.amenities.includes(a)));
      }
    }

    const total = filtered.length;
    const skip = (page - 1) * limit;
    const paginated = filtered.slice(skip, skip + limit);

    const listingsWithHost = paginated.map(listing => {
      const host = findById(mockUsers, listing.hostId);
      return {
        ...listing,
        hostId: host
          ? { _id: host._id, firstName: host.firstName, lastName: host.lastName, avatar: host.avatar }
          : listing.hostId,
      };
    });

    return {
      listings: listingsWithHost as unknown as Listing[],
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  },

  async getListingById(id: string): Promise<{ listing: Listing; reviews: any[] }> {
    await delay();

    const listing = findById(mockListings, id);
    if (!listing) throw createMockError(404, 'Listing not found');

    const host = findById(mockUsers, listing.hostId);
    const listingReviews = mockReviews.filter(r => r.listingId === id);

    const reviewsWithUser = listingReviews.map(review => {
      const user = findById(mockUsers, review.userId);
      return {
        ...review,
        userId: user
          ? { _id: user._id, firstName: user.firstName, lastName: user.lastName, avatar: user.avatar }
          : null,
      };
    });

    return {
      listing: {
        ...listing,
        hostId: host
          ? { _id: host._id, firstName: host.firstName, lastName: host.lastName, avatar: host.avatar, bio: host.bio, createdAt: host.createdAt }
          : listing.hostId,
      } as unknown as Listing,
      reviews: reviewsWithUser,
    };
  },

  async createListing(data: Partial<Listing>): Promise<{ listing: Listing }> {
    await delay();

    const userId = getCurrentUserId();
    if (!userId) throw createMockError(401, 'Not authenticated');

    const newListing = {
      _id: `607f1f77bcf86cd7994390${mockListings.length + 1}`,
      ...data,
      hostId: userId,
      rating: 0,
      reviewCount: 0,
      isAvailable: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as any;

    mockListings.push(newListing);
    return { listing: newListing };
  },

  async updateListing(id: string, data: Partial<Listing>): Promise<{ listing: Listing }> {
    await delay();

    const userId = getCurrentUserId();
    if (!userId) throw createMockError(401, 'Not authenticated');

    const idx = mockListings.findIndex(l => l._id === id);
    if (idx === -1) throw createMockError(404, 'Listing not found');

    if (mockListings[idx].hostId !== userId) {
      throw createMockError(403, 'Not authorized to update this listing');
    }

    mockListings[idx] = { ...mockListings[idx], ...(data as any), updatedAt: new Date().toISOString() };
    return { listing: mockListings[idx] as unknown as Listing };
  },

  async deleteListing(id: string): Promise<void> {
    await delay();

    const userId = getCurrentUserId();
    if (!userId) throw createMockError(401, 'Not authenticated');

    const idx = mockListings.findIndex(l => l._id === id);
    if (idx === -1) throw createMockError(404, 'Listing not found');

    if (mockListings[idx].hostId !== userId) {
      throw createMockError(403, 'Not authorized to delete this listing');
    }

    mockListings.splice(idx, 1);
  },

  async getAvailability(
    id: string,
    startDate: Date,
    endDate: Date,
  ): Promise<{ available: boolean; blockedDates: any[] }> {
    await delay();

    const listing = findById(mockListings, id);
    if (!listing) throw createMockError(404, 'Listing not found');

    const start = new Date(startDate);
    const end = new Date(endDate);

    const conflicts = mockBookings.filter(b => {
      if (b.listingId !== id) return false;
      if (!['confirmed', 'pending'].includes(b.status)) return false;

      const checkIn = new Date(b.checkIn);
      const checkOut = new Date(b.checkOut);

      return (
        (checkIn >= start && checkIn <= end) ||
        (checkOut >= start && checkOut <= end) ||
        (checkIn <= start && checkOut >= end)
      );
    });

    return {
      available: conflicts.length === 0,
      blockedDates: conflicts.map(b => ({ checkIn: b.checkIn, checkOut: b.checkOut })),
    };
  },
};
