export interface PostsResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

export interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: Reactions
  views: number
  userId: number
}

export interface Reactions {
  likes: number
  dislikes: number
}

export interface NewPostDto {
  title: string
  body: string
  userId: number
}

export type UpdatePostDto = Pick<Post, "id" | "title" | "body">
