import { create } from "zustand";
import { User } from "@prisma/client";

type UseUserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useUser = create<UseUserStore>((set) => ({
  user: null,
  setUser: (user: User | null) => set((state) => ({ ...state, user })),
}));
