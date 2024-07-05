import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, logout, getUser } from "./web3auth";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      privKey: null,
      isLoading: true,
      isInitialized: false,

      initialize: async () => {
        set({ isLoading: true });
        try {
          const userData = await getUser();
          if (userData) {
            set({
              user: userData.userInfo,
              isLoggedIn: true,
              privKey: userData.privKey,
            });
          } else {
            set({ user: null, isLoggedIn: false, privKey: null });
          }
        } catch (error) {
          console.error("Initialization error:", error);
        } finally {
          set({ isLoading: false, isInitialized: true });
        }
      },

      login: async (loginProvider) => {
        set({ isLoading: true });
        try {
          const userData = await login(loginProvider);
          if (userData) {
            set({
              user: userData.userInfo,
              isLoggedIn: true,
              privKey: userData.privKey,
            });
          } else {
            console.log("Login cancelled or no user data returned");
          }
        } catch (error) {
          console.error("Login error:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await logout();
          set({ user: null, isLoggedIn: false, privKey: null });
        } catch (error) {
          console.error("Logout failed:", error);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
