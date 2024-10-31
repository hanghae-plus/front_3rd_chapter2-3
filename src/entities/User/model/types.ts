export interface UserType {
  id: number
  username: string
  image: string
}

export interface UsersQueryProps {
  limit?: number
  select?: string
}

export interface UsersResponseType {
  users: UserType[]
}
