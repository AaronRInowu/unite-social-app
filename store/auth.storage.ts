import { User } from "@/global/interfaces/users.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type AuthSession = {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
};

type AuthActions = {
  setSession: (payload: {
    accessToken: string;
    user: User;
    refreshToken?: string | null;
  }) => void;
  clearSession: () => void;
  updateUserProfile: (user: Partial<User>) => void;
};

type AuthStore = AuthSession & AuthActions;

const initialState: AuthSession = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      setSession: ({ accessToken, user, refreshToken }) =>
        set(() => ({
          accessToken,
          refreshToken: refreshToken ?? null,
          user,
          isAuthenticated: true,
        })),
      clearSession: () => set(() => ({ ...initialState })),
      updateUserProfile: (partialUser) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...partialUser } : null,
        })),
    }),
    {
      name: "auth-session-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;

export const selectAuthToken = (state: AuthStore) => state.accessToken;
export const selectAuthUser = (state: AuthStore) => state.user;
export const selectIsAuthenticated = (state: AuthStore) => state.isAuthenticated;
