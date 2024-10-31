import type { Post, NewPost, User } from "../../../shared/types"

export interface UsePostProps {
  posts: Post[]
  total: number
  isLoading: boolean
  selectedPost: Post | null
  selectedUser: User | null
  newPost: NewPost

  showPostDetailDialog: boolean
  showUserModal: boolean
  showAddDialog: boolean
  showEditDialog: boolean

  openPostDetail: (post: Post) => void
  openUserModal: (user: User) => void
  setShowPostDetailDialog: (show: boolean) => void
  setShowUserModal: (show: boolean) => void
  setShowAddDialog: (show: boolean) => void
  setShowEditDialog: (show: boolean) => void

  setSelectedPost: (post: Post | null) => void
  setNewPost: (post: NewPost) => void
  setPosts: (posts: Post[]) => void
  setTotal: (total: number) => void

  handleAddPost: (newPost: NewPost) => Promise<void>
  handleUpdatePost: (post: Post) => Promise<void>
  handleDeletePost: (id: number) => Promise<void>
  handleFetchPostsByTag: (tag: string) => Promise<void>
  handleFetchPosts: (params: { limit: number; skip: number }) => Promise<void>
  handleSearchPosts: (query: string) => Promise<void>
}
