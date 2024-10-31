import { User } from '@entities/comment/model/types'
import { create } from 'zustand'

interface UserState {
  selectedUser: User | null
  showUserModal: boolean
}

interface UserAction {
  setSelectedUser: (selectedUser: User | null) => void
  setShowUserModal: (showUserModal: boolean) => void
}

export const userStore = create<UserState & UserAction>((set) => ({
  selectedUser: null,
  showUserModal: false,
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  setShowUserModal: (showUserModal) => set({ showUserModal }),
}))
