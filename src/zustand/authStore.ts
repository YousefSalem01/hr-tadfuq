import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// User interface matching your mock data
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}

// Auth state interface
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Auth actions interface
interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  clearError: () => void;
  checkAuth: () => void;
}

// Combined store type
type AuthStore = AuthState & AuthActions;

// Create the auth store with persistence
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login action
      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });

          // TODO: Replace with actual API call
          // Example API call structure:
          // const response = await fetch('/api/auth/login', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({ email, password })
          // });
          // const data = await response.json();

          // Mock login for now - remove when API is ready
          await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
          
          // TODO: Remove mock validation when API is ready
          console.log('Login attempt:', { email, password });

          // Mock successful response - replace with actual API response
          const mockUser: User = {
            id: 1,
            name: 'Mohamed Ali',
            email: email,
            role: 'Admin',
            permissions: ['All'],
          };
          const mockToken = 'mock-jwt-token-' + Date.now();

          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            error: error.message || 'Login failed. Please try again.',
            isLoading: false,
            isAuthenticated: false,
          });
        }
      },

      // Logout action
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });

        // TODO: Add API call to invalidate token on server
        // await fetch('/api/auth/logout', {
        //   method: 'POST',
        //   headers: { 'Authorization': `Bearer ${get().token}` }
        // });
      },

      // Set user manually
      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },

      // Set token manually
      setToken: (token: string) => {
        set({ token, isAuthenticated: true });
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },

      // Check authentication status (useful for app initialization)
      checkAuth: () => {
        const { token, user } = get();
        
        if (token && user) {
          // TODO: Optionally verify token with backend
          // const isValid = await verifyToken(token);
          // if (!isValid) {
          //   get().logout();
          // }
          set({ isAuthenticated: true });
        } else {
          set({ isAuthenticated: false, user: null, token: null });
        }
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Selector hooks for better performance (optional but recommended)
export const useUser = () => useAuthStore((state) => state.user);
export const useToken = () => useAuthStore((state) => state.token);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
export const useAuthError = () => useAuthStore((state) => state.error);

