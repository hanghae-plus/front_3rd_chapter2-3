import { UserDTO } from "../../user/model/types"

export type PostDTO = {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  views: number
  userId: number
}

export type Post = PostDTO & {
  author: Author | undefined
}

export type NewPost = Pick<PostDTO, "title" | "body" | "userId">

export type Author = Pick<UserDTO, "id" | "username" | "image">

export type Tag = {
  slug: string
  name: string
  url: string
}

export type FetchPostsPayload = {
  limit: number
  skip: number
}

export type PostsResponse = {
  posts: PostDTO[]
  limit: number
  skip: number
  total: number
}

export type AuthorsResponse = {
  users: Author[]
  limit: number
  skip: number
  total: number
}
