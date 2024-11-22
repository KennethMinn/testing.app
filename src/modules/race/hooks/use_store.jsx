import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// export const useCurrentUserGameEntry = create(
//   persist(
//     (set) => ({
//       userGameEntry: null,
//       setUserGameEntry: (userGameEntry) => set({ userGameEntry }),
//     }),
//     { name: "userGameEntry", storage: createJSONStorage(() => sessionStorage) }
//   )
// );

export const useNoLiveModalStore = create(
  persist(
    (set) => ({
      ids: [],
      setIds: (id) =>
        set((state) => ({
          ids: [...new Set([...state.ids, id])], // Add unique IDs only
        })),
    }),
    { name: "ids", storage: createJSONStorage(() => sessionStorage) }
  )
);
