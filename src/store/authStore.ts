import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
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
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      login: (user, accessToken, refreshToken) => {
        set({ user, accessToken, refreshToken, isAuthenticated: true });
      },

      logout: async () => {
        const { accessToken, refreshToken, isAuthenticated } = get();
        // Prevent infinite loops (e.g., interceptor calls logout after we've already cleared state)
        if (!accessToken && !refreshToken && !isAuthenticated) return;

        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
        try {
          // Call logout without axios interceptors to avoid refresh/logout recursion
          if (accessToken) {
            const BASE_URL = import.meta.env.VITE_API_URL;
            await axios.post(
              `${BASE_URL}${API_ENDPOINTS.AUTH.LOGOUT}`,
              undefined,
              { headers: { Authorization: `Bearer ${accessToken}` } }
            );
          }
        } catch (error) {
          console.error('Logout error:', error);
        }
      },

      setTokens: (accessToken, refreshToken) => {
        set({ accessToken, refreshToken, isAuthenticated: Boolean(accessToken) });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

