import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '../services/api';
import { API_ENDPOINTS } from '../config/endpoints';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  email_verified: boolean;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  
  // Actions
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => Promise<void>;
  setTokens: (accessToken: string, refreshToken: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      login: (user, accessToken, refreshToken) => {
        set({ user, accessToken, refreshToken, isAuthenticated: true });
      },

      logout: async () => {
        try {
          await api.post(API_ENDPOINTS.AUTH.LOGOUT);
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
        }
      },

      setTokens: (accessToken, refreshToken) => {
        set({ accessToken, refreshToken });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

