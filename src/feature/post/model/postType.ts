// 게시물과 사용자 타입 정의
export interface Post {
  id: number
  userId: number
  title: string
  body: string
  author?: {
    id: number
    username: string
    image: string
  }
  tags: string[]
}

export interface PostFetchResponse {
  posts: Post[]
  total: number
  error?: unknown
}
