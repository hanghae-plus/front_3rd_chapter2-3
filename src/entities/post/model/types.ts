interface Author {
  id: number
  username: string
  image: string
}

interface Reactions {
  likes: number
  dislikes: number
}

export interface Post {
  id: number
  title: string
  body: string
  author?: Author
  reactions: Reactions
  tags: string[]
  userId: number
  views: number
}
