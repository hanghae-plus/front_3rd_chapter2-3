export interface PostType {
  body: string
  id: number
  reactions: reactions
  tags: string[]
  title: string
  userId: number
  views: number
  author: author
}

type reactions = {
  likes: number
  dislikes: number
}
export type author = {
  id: number
  image: string
  username: string
}

export interface NewPostType {
  title: string
  body: string
  userId: number
}
