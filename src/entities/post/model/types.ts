interface Author {
  id: number
  username: string
  image: string
}

interface Reactions {
  likes: number
  dislikes: number
}

export interface Post {
  id: number
  title: string
  body: string
  author?: Author
  reactions: Reactions
  tags: string[]
  userId: number
  views: number
}

export interface PostsResponse {
  limit: number
  skip: number
  total: number
  posts: Post[]
}

export interface User {
  id: number
  image: string
  username: string
}

export interface UserResponse {
  limit: number
  skip: number
  total: number
  users: User[]
}
