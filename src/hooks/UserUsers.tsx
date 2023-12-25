import { User } from "@prisma/client";
import { create } from "zustand";

type UseUserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useUsers = create<UseUserStore>((set) => ({
  user: null,
  setUser: (user: User | null) => set((state) => ({ ...state, user })),
}));
