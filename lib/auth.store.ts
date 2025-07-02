import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthState } from '@/types';
import { login } from './api/auth.service';

function getErrorMessage(error: unknown, fallback = 'Authentication error'): string {
  return error instanceof Error ? error.message : fallback;
}

const setLoading = (set: any) => set({ isLoading: true, error: null });
const setError = (set: any, msg: string) => set({ isLoading: false, error: msg });

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (alias, password) => {
        setLoading(set);
        try {
          const user = await login(alias, password);
          set({
            ...user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          setError(set, getErrorMessage(error, 'Failed to login'));
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      updateProfile: async (userData) => {
        setLoading(set);
        try {
          await new Promise((r) => setTimeout(r, 500));
          const currentUser = get().user;
          if (currentUser) {
            set({
              user: { ...currentUser, ...userData },
              isLoading: false,
            });
          }
        } catch (error) {
          setError(set, getErrorMessage(error, 'Failed to update profile'));
        }
      },

      clearError: () => set({ error: null }),

      reset: () => set({ user: null, isAuthenticated: false, isLoading: false, error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
