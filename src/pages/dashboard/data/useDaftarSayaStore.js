import { create } from "zustand";
import { persist } from "zustand/middleware";

const useDaftarSayaStore = create(
  persist(
    (set, get) => ({
      daftar: [],
      addToDaftar: (movie) => {
        const exists = get().daftar.some((m) => m.id === movie.id);
        if (!exists) {
          set({ daftar: [...get().daftar, movie] });
        }
      },
      removeFromDaftar: (id) => {
        set({ daftar: get().daftar.filter((m) => m.id !== id) });
      },
      clearDaftar: () => set({ daftar: [] }),
    }),
    {
      name: "daftar-saya",
    }
  )
);

export default useDaftarSayaStore;
