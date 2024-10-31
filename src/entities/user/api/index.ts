export interface IUser {
  id: number
  username: string
  image: string
}

export interface IUsersQueryResponse {
  limit: number
  users: IUser[]
  skip: number
  total: number
}

export const fetchUsersApi = async (): Promise<IUsersQueryResponse> => {
  const response = await fetch("/api/users?limit=0&select=username,image")
  return response.json()
}
