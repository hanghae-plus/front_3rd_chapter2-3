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

export type Post = {
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

export type PostWithAuthor = Post & {
  author: Author | undefined
}

export type NewPost = Pick<Post, "title" | "body" | "userId">

export type PostsResponse = {
  limit: number
  posts: Post[]
  skip: number
  total: number
}

export type UsersResponse = {
  limit: number
  users: Author[]
  skip: number
  total: number
}
