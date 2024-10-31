// 게시물과 사용자 타입 정의
export interface Post {
  id: number
  userId: number
  title: string
  body: string
  tags: string[]
  author?: Author
  reactions?: Reactions
}

export interface Author {
  id: number
  username: string
  image: string
}

export interface Reactions {
  likes: number
  dislikes: number
}

export interface PostFetchResponse {
  posts: Post[]
  total: number
  error?: unknown
}

export interface Tag {
  name: string
  slug: string
  url: string
}
