// User 인터페이스
export interface UserData {
  id: number
  username: string
  image: string
}

export interface UserProps {
  showUserModal: boolean
}

export interface Address {
  address: string
  city: string
  state: string
}

export interface Company {
  name: string
  title: string
}

export interface UserType {
  image: string
  username: string
  firstName: string
  lastName: string
  age: number
  email: string
  phone: string
  address?: Address
  company?: Company
}

export interface Post {
  id: number
  body: string
  reactions: { likes: number; dislikes: number }
  tags: string[]
  title: string
  userId: number
  views: number
}

export interface PostForm {
  body: string
  title: string
  userId: number
}
