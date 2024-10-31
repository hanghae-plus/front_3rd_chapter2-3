import { create } from 'zustand'
import { UserDetail } from '../../../entities/User/model/types'

interface PostManagerState {
  sortBy: string
  sortOrder: string
  selectedTag: string
  showPostDetailDialog: boolean
  showUserDialog: boolean
  selectedUser: UserDetail | null
  
  // actions
  setSortBy: (sortBy: string) => void
  setSortOrder: (order: string) => void
  setSelectedTag: (tag: string) => void
  setShowPostDetailDialog: (show: boolean) => void
  setShowUserDialog: (show: boolean) => void
  setSelectedUser: (user: UserDetail | null) => void
}

export const usePostManagerStore = create<PostManagerState>((set) => ({
  sortBy: '',
  sortOrder: 'asc',
  selectedTag: '',
  showPostDetailDialog: false,
  showUserDialog: false,
  selectedUser: null,

  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setSelectedTag: (selectedTag) => set({ selectedTag }),
  setShowPostDetailDialog: (show) => set({ showPostDetailDialog: show }),
  setShowUserDialog: (show) => set({ showUserDialog: show }),
  setSelectedUser: (user) => set({ selectedUser: user }),
}))