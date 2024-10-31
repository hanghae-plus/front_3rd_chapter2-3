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
  author: Author
}

export interface Author {
  id: number
  username: string
  image: string
}

export interface Page {
  limit: number
  skip: number
  sortBy: string
  sortOrder: string
}

export interface NewPost {
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
}
