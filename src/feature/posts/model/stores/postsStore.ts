import { create } from "zustand"
import { Post } from "../types"

interface PostsModalState {
  showAddDialog: boolean
  showEditDialog: boolean
  showPostDetailDialog: boolean
  selectedPost: Post | null
  setShowAddDialog: (show: boolean) => void
  setShowEditDialog: (show: boolean) => void
  setShowPostDetailDialog: (show: boolean) => void
  setSelectedPost: (post: Post | null) => void
}

export const usePostsModalStore = create<PostsModalState>((set) => ({
  showAddDialog: false,
  showEditDialog: false,
  showPostDetailDialog: false,
  selectedPost: null,
  setShowAddDialog: (show) => set({ showAddDialog: show }),
  setShowEditDialog: (show) => set({ showEditDialog: show }),
  setShowPostDetailDialog: (show) => set({ showPostDetailDialog: show }),
  setSelectedPost: (post) => set({ selectedPost: post }),
}))