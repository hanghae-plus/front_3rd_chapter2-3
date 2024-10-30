export interface Comment {
  id: number
  body: string
  postId: number
  userId: number
  user: {
    username: string
  }
  likes: number
}
