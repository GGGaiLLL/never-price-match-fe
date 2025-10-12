import { create } from "zustand";
import type { MeQuery } from "../__generated__/graphql";

type AuthState = {
  user: MeQuery["me"] | null;
  setUser: (user: MeQuery["me"] | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
