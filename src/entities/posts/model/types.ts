export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export type PostPayload = Omit<Post, "id">
