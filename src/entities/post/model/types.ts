export type PostReactions = {
  likes: number
  dislikes: number
}

export type Post = {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: PostReactions
  views: number
  userId: number
}
