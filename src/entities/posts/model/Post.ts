export interface Post {
  body: string
  id: number
  reactions: Reactions
  tags: string[]
  title: string
  userId: number
  views: number
  author?: Author
}

export interface Posts {
  limit: number
  posts: Post[]
  skip: number
  total: number
}

export interface Reactions {
  likes: number
  dislikes: number
}
export interface Author {
  id: number
  image: string
  username?: string
  fullName?: string
}

export interface Tag {
  name: string
  slug: string
  url: string
}

export interface SelectedPost {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: Reactions
  userId: number
  views: number
  author?: Author
}
