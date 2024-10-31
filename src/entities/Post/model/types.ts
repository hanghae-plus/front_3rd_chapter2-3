import { UserType } from "../../User/model/types"

export interface PostType {
  id: number
  userId: number
  title: string
  body: string
  tags: string[]
  reactions: reactions
  views: number
  author?: author
}

export interface PostsResponseType {
  posts: PostType[]
  total: number
  skip: number
  users: UserType[]
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

export interface PostMutationState {
  isPending: boolean
  isError: boolean
  error: Error | null
}
