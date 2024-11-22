import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const usePrizePool = create(
  persist(
    (set) => ({
      prizePool: null,
      setPrizePool: (prizePool) => set({ prizePool }),
    }),
    { name: "prizePool", storage: createJSONStorage(() => sessionStorage) }
  )
);

export const useCurrentProfile = create(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
    }),
    { name: "profile", storage: createJSONStorage(() => sessionStorage) }
  )
);

export const useProfiles = create(
  persist(
    (set) => ({
      profiles: null,
      setProfiles: (profiles) => set({ profiles }),
    }),
    { name: "profiles", storage: createJSONStorage(() => sessionStorage) }
  )
);
