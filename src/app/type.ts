interface Address {
  address: string
  city: string
  state: string
}

interface Company {
  name: string
  title: string
}

export interface User {
  id?: number
  username: string
  firstName: string
  lastName: string
  age: number
  email: string
  phone: string
  address: Address
  company: Company
  image?: string
}

// User 타입 정의
// export interface User {
//     id: number;
//     username: string;
//     image: string;
//   }

// Reaction 타입 정의
export interface Reactions {
  likes: number
  dislikes: number
}

// Post 타입 정의
export interface Post {
  userId?: number
  id: number
  title: string
  body: string
  author: User
  tags: PostsManagerProps
  reactions: Reactions
}

// Comment 타입 정의
export interface Comment {
  id: number
  user: User
  body: string
  likes: number
  postId: number // 해당 댓글이 속한 게시물의 ID
}

export type Comments = { [postId: number]: Comment[] }

// State 관련 타입 정의
export interface NewPost {
  title: string
  body: string
  userId: number
}

export interface NewComment {
  postId: number
  body: string
}

// Pagination 타입 정의
export interface Pagination {
  limit: number
  skip: number
  total: number
}

// PostsManagerProps 타입 정의
export interface PostsManagerProps {
  posts: Post[]
  comments: Record<number, Comment[]>
  loading: boolean
  tags: Array<{ url: string; slug: string }>
  selectedTag: string
  searchQuery: string
  setSearchQuery: (query: string) => void
  addPost: () => void
  updatePost: () => void
  deletePost: (id: number) => void
  likeComment: (commentId: number, postId: number) => void
  deleteComment: (commentId: number, postId: number) => void
  fetchPostsByTag: (tag: string) => void
  updateURL: () => void
}
