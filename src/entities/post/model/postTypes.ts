import { User } from '../../user/model/userTypes';

export interface Post {
  body: string
  id: number
  reactions: {
    likes: number
    dislikes: number
  }
  tags?: string[]
  title: string
  userId: number
  views: number
  author?: User
  createdAt?: string
  updatedAt?: string
}

export interface PostRequests {
  Create: {
    title: string
    body: string
    userId: number
    tags?: string[]
  }
  Update: {
    title?: string
    body?: string
    tags?: string[]
  }
}

export interface PostsResponse {
  posts: Post[]
  total: number
  limit: number
  skip: number
}

export interface NewPost {
  title: string
  body: string
  userId: number
}

export interface PostState {
  posts: Post[]
  total: number
  selectedPost: Post | null
  newPost: NewPost
  setPosts: (posts: Post[]) => void
  setTotal: (total: number) => void
  setSelectedPost: (post: Post | null) => void
  setNewPost: (post: Partial<NewPost>) => void // Partial<NewPost>로 변경
  resetNewPost: () => void
}
