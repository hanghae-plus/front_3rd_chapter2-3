export interface User {
  id: number
  age: number
  phone: string
  username: string
  firstName: string
  lastName: string
  address: { address: string; city: string; state: string }
  company: { name: string; title: string }
  email: string
  image: string
}

export interface UserList {
  users: User[]
  total?: number
  limit?: number
  skip?: number
}

export type UserInfoProps = Omit<User, 'id'>