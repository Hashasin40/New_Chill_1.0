// src/store/useDaftarSayaStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useDaftarSayaStore = create(
  persist(
    (set, get) => ({
      daftar: [],
      addToDaftar: (movie) => {
        const exists = get().daftar.some((m) => m.title === movie.title);
        if (!exists) {
          set({ daftar: [...get().daftar, movie] });
        }
      },
      removeFromDaftar: (title) => {
        set({ daftar: get().daftar.filter((m) => m.title !== title) });
      },
      clearDaftar: () => set({ daftar: [] }),
    }),
    {
      name: "daftar-saya", // key di localStorage
    }
  )
);

export default useDaftarSayaStore;
