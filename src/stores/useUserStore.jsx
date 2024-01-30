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
export const venueManager = () => useUserStore((state) => state.user?.venueManager(true));

export const useUserActions = () => {
	const { setUser, clearUser } = useUserStore();
	return { setUser, clearUser };
};