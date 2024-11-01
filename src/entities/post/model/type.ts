import { User } from "../../user/model/type"

export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  author?: User
}

// 수정용 타입 추가
export type EditablePost = Partial<Post> & {
  title: string // title만 필수로 지정
}

export interface PostsResponse {
  posts: Post[]
  total: number
}

export interface NewPost {
  title: string
  body: string
  userId: number
}

export interface Tag {
  slug: string
  url: string
}
