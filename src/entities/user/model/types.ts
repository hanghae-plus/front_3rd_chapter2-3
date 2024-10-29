export interface UserResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}

interface User {
  id: number
  username: string
  image: string
}

export interface UserParams {
  limit?: number
  select?: string
}
