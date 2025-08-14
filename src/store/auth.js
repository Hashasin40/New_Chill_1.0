import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuth = create(
    persist(
        (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        logout: () => set({ user: null }),
        }),
        {
        name: 'auth',
        storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useAuth;
