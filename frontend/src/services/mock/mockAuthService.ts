import { mockUsers, findById } from '../../data/mockData';
import type { AuthResponse, User } from '../../types';
import { delay, createMockError, getCurrentUserId } from './mockHelpers';

// Simple token: base64 of userId — not secure, but matches backend JWT shape for the demo
const generateMockToken = (userId: string) =>
  btoa(JSON.stringify({ userId, email: '' }));

export const mockAuthService = {
  async register(data: { email: string; password: string; firstName: string; lastName: string }): Promise<AuthResponse> {
    await delay();

    const existing = mockUsers.find(u => u.email === data.email);
    if (existing) throw createMockError(400, 'Email already registered');

    const newUser = {
      _id: `507f1f77bcf86cd79943901${mockUsers.length + 1}`,
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      avatar: `https://i.pravatar.cc/150?img=${mockUsers.length + 10}`,
      phone: '',
      bio: '',
      isHost: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);

    const token = generateMockToken(newUser._id);
    return {
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        avatar: newUser.avatar,
        isHost: newUser.isHost,
      },
    };
  },

  async login(credentials: { email: string; password: string }): Promise<AuthResponse> {
    await delay();

    const user = mockUsers.find(u => u.email === credentials.email);
    if (!user || user.password !== credentials.password) {
      throw createMockError(401, 'Invalid credentials');
    }

    const token = generateMockToken(user._id);
    return {
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        isHost: user.isHost,
      },
    };
  },

  async getProfile(): Promise<{ user: User }> {
    await delay();

    const userId = getCurrentUserId();
    if (!userId) throw createMockError(401, 'Not authenticated');

    const user = findById(mockUsers, userId);
    if (!user) throw createMockError(404, 'User not found');

    return {
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        phone: user.phone,
        bio: user.bio,
        isHost: user.isHost,
      },
    };
  },

  async updateProfile(data: Partial<User>): Promise<{ user: User }> {
    await delay();

    const userId = getCurrentUserId();
    if (!userId) throw createMockError(401, 'Not authenticated');

    const idx = mockUsers.findIndex(u => u._id === userId);
    if (idx === -1) throw createMockError(404, 'User not found');

    const existing = mockUsers[idx];
    mockUsers[idx] = {
      ...existing,
      firstName: data.firstName || existing.firstName,
      lastName: data.lastName || existing.lastName,
      phone: data.phone || existing.phone,
      bio: data.bio || existing.bio,
      avatar: data.avatar || existing.avatar,
      updatedAt: new Date().toISOString(),
    };

    const user = mockUsers[idx];
    return {
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        phone: user.phone,
        bio: user.bio,
        isHost: user.isHost,
      },
    };
  },
};
