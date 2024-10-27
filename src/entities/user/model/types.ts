export interface User {
  id: number
  username: string
  image: string
}

export interface UserDTO {
  users: User[]
  total: number
  skip: number
  limit: number
}
