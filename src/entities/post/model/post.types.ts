import { User } from '@entities/user/model/user.types'

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
