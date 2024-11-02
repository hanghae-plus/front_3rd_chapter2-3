import { NewPost, Post } from '@entities/post/model/post.types'
import { create } from 'zustand'

interface PostState {
  newPost: NewPost
  selectedPost: Post | null
  showAddDialog: boolean
  showEditDialog: boolean
  showPostDetailDialog: boolean
}

interface PostAction {
  setNewPost: (newPost: NewPost) => void
  setSelectedPost: (selectedPost: Post | null) => void
  setShowAddDialog: (showAddDialog: boolean) => void
  setShowEditDialog: (showEditDialog: boolean) => void
  setShowPostDetailDialog: (showPostDetailDialog: boolean) => void
}

export const postStore = create<PostState & PostAction>((set) => ({
  newPost: { title: '', body: '', userId: 1 },
  selectedPost: null,
  showAddDialog: false,
  showEditDialog: false,
  showPostDetailDialog: false,
  setNewPost: (newPost) => set({ newPost }),

  setSelectedPost: (selectedPost) => set({ selectedPost }),
  setShowAddDialog: (showAddDialog) => set({ showAddDialog }),
  setShowEditDialog: (showEditDialog) => set({ showEditDialog }),
  setShowPostDetailDialog: (showPostDetailDialog) => set({ showPostDetailDialog }),
}))
