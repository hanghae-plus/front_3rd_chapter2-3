import { TagSlugType } from "../../tag/api/types"
import { UserType } from "../../user/api/types"

interface ReactionsType {
  likes: number
  dislikes: number
}

type AuthorType = Pick<UserType, "id" | "username" | "image">

export interface PostType {
  id: number
  title: string
  body: string
  tags: TagSlugType[]
  reactions: ReactionsType
  views: 305
  userId: number
  author: AuthorType
}

export interface PostFetchReturnType {
  limit: number
  posts: PostType[]
  skip: number
  total: number
}

export interface AddPostParamsType {
  body: string
  title: string
  userId: number
}

export interface AddPostReturnType extends AddPostParamsType {
  id: number
}
