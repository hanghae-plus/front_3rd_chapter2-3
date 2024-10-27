export interface NewPost {
  title: string
  body: string
  userId: number
}

export interface Post {
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
  author: {
    id: number
    username: string
    image: string
  }
}
