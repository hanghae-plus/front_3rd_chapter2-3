interface Reactions {
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
  author?: {
    username: string
    image: string
  }
}

export interface PostsResponse {
  posts: Post[]
  total: number
}