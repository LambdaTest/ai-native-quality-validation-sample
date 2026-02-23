import api from './api';
import { mockAuthService } from './mock/mockAuthService';
import type { AuthResponse, User } from '../types';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  firstName: string;
  lastName: string;
}

const realAuthService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  async getProfile(): Promise<{ user: User }> {
    const response = await api.get<{ user: User }>('/auth/profile');
    return response.data;
  },

  async updateProfile(data: Partial<User>): Promise<{ user: User }> {
    const response = await api.put<{ user: User }>('/auth/profile', data);
    return response.data;
  },
};

export const authService = import.meta.env.VITE_MOCK_API === 'true'
  ? mockAuthService
  : realAuthService;
