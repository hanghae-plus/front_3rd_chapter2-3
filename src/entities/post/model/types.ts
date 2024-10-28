export type Tag = {
  slug: string
  name: string
  url: string
}

export type Author = {
  id: number
  username: string
  image: string
}

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

export type PostsResponse = {
  limit: number
  posts: PostDTO[]
  skip: number
  total: number
}

export type UsersResponse = {
  limit: number
  users: Author[]
  skip: number
  total: number
}
