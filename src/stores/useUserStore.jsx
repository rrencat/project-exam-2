import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
	persist(
		(set) => ({
			user: null,
			setUser: (user) => set({ user }),
			clearUser: () => set((state) => ({ ...state, user: null })),
		}),
		{
			name: "user",
		}
	)
);

export const useToken = () => {
	const user = useUserStore((state) => state.user);
	const isManager = user?.isManager || false;
  
	return { token: user?.accessToken, isManager };
  };

export const useName = () => useUserStore((state) => state.user?.name);
export const useAvatar = () => useUserStore((state) => state.user?.avatar);

export const useUserActions = () => {
	const { setUser, clearUser } = useUserStore();
	return { setUser, clearUser };
};