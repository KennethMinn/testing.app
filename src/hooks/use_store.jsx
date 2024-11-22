import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useMusic = create(
  persist(
    (set) => ({
      isMusicOn: false,
      setIsMusicOn: (isMusicOn) => set({ isMusicOn }),
    }),
    { name: "isMusicOn", storage: createJSONStorage(() => sessionStorage) }
  )
);

export const useLanguage = create(
  persist(
    (set) => ({
      language: { label: "English", lng: "en" },
      setLanguage: (language) => set({ language }),
    }),
    { name: "language", storage: createJSONStorage(() => localStorage) }
  )
);

export const useShowGif = create(
  persist(
    (set) => ({
      isShowGif: sessionStorage.getItem("isShowGif") || true,
      setIsShowGif: (isShowGif) => set({ isShowGif }),
    }),
    {name: "isShowGif", storage: createJSONStorage(() => sessionStorage)}
  )
)




