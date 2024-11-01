interface Reaction {
  likes: number
  dislikes: number
}

export interface Post {
  author: User
  id: number
  title: string
  body: string
  tags: string[]
  reactions: Reaction
  views: number
  userId: number
}

export interface PostsRes {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

export interface Comment {
  id: number
  body: string
  postId: number
  likes: number
  user: {
    id: number
    username: string
    fullName: string
  }
}

export interface CommentsRes {
  comments: Comment[]
  total: number
  skip: number
  limit: number
}

export interface User {
  id: number
  username: string
  image: string
}

export interface UsersRes {
  users: User[]
  total: number
  skip: number
  limit: number
}

export interface Tag {
  slug: string
  name: string
  url: string
}
