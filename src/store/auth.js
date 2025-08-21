import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import IconProfile from '../assets/icon profile2.png';

const useAuth = create(
  persist(
    (set) => ({
      user: null,
      avatar: IconProfile,

      setUser: (user) => {
        const normalizedUser = {
          name: user?.name || "", // ✅ konsisten pakai 'name'
          email: user?.email || "",
          avatar: user?.avatar || IconProfile,
        };
        set({
          user: normalizedUser,
          avatar: normalizedUser.avatar,
        });
      },

      setAvatar: (avatar) => set({ avatar }),

      logout: () => {
        localStorage.removeItem("user");
        set({ user: null, avatar: IconProfile });
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        avatar: state.avatar,
      }),
    }
  )
);

export default useAuth;
