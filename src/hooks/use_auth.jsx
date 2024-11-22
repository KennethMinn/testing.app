import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAuth = create(
  persist(
    (set) => ({
      user: null,
      setAuth: (user) => set({ user }),
    }),
    { name: "user", storage: createJSONStorage(() => localStorage) }
  )
);
