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

export const useToken = () => useUserStore((state) => state.user?.accessToken);
export const isManager = () => useUserStore((state) => state.user?.isManager || false);
export const useName = () => useUserStore((state) => state.user?.name);
export const useAvatar = () => useUserStore((state) => state.user?.avatar);

export const useUserActions = () => {
	const { setUser, clearUser } = useUserStore();
	return { setUser, clearUser };
};