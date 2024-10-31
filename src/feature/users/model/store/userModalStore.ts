import { create } from "zustand"

interface UserModalState {
  isOpen: boolean
  userId: number | null
  setOpen: (isOpen: boolean) => void
  setUserId: (userId: number | null) => void
}

export const useUserModalStore = create<UserModalState>((set) => ({
  isOpen: false,
  userId: null,
  setOpen: (isOpen) => set({ isOpen }),
  setUserId: (userId) => set({ userId }),
}))