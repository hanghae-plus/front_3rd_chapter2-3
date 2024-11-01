import { create } from "zustand"

type UserStore = {
  currentUserId: number
  updateCurrentUserId: (id: number) => void
}

export const useUserStore = create<UserStore>((set) => ({
  currentUserId: -1,
  updateCurrentUserId: (id: number) => set({ currentUserId: id }),
}))
