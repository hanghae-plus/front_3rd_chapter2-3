import { User } from './user.types'

export interface Reactions {
  likes: number
  dislikes: number
}

export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: Reactions
  author?: User
}

export interface PostWithAuthor extends Post {
  author?: User
}

export interface NewPost {
  title: string
  body: string
  userId: number
}

export interface PostMutationState {
  isPending: boolean
  isError: boolean
  error: Error | null
}

export interface PostsQueryProps {
  limit: number
  skip: number
  tag: string
  searchQuery: string
}

export interface PostState {
  newPost: NewPost
  selectedPost: Post | null
  showAddDialog: boolean
  showEditDialog: boolean
  showPostDetailDialog: boolean
}

export interface PostAction {
  setNewPost: (newPost: NewPost) => void
  setSelectedPost: (selectedPost: Post | null) => void
  setShowAddDialog: (showAddDialog: boolean) => void
  setShowEditDialog: (showEditDialog: boolean) => void
  setShowPostDetailDialog: (showPostDetailDialog: boolean) => void
}
