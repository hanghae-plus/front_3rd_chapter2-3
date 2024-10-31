export interface User {
  id: number
  username: string
  image: string
  firstName: string
  lastName: string
  age: number
  email: string
  phone: string
  address: {
    address: string
    city: string
    state: string
  }
  company: {
    name: string
    title: string
  }
}

export interface UserResponse {
  limit: number
  skip: number
  total: number
  users: User[]
}

export interface UserState {
  selectedUser: User | null
  setSelectedUser: (user: User | null) => void
}
