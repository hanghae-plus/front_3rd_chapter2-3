export interface Address {
  address: string
  city: string
  state: string
  postalCode?: string
}

export interface Company {
  name: string
  title: string
  department?: string
}

export interface UserData {
  id: number
  username: string
  firstName: string
  lastName: string
  age: number
  email: string
  phone: string
  image: string
  address?: Address
  company?: Company
}

export interface UserResponse {
  users: UserData[]
  total: number
  skip: number
  limit: number
}

export interface UserDetailsResponse extends UserData {
  // 추가적인 상세 정보가 필요한 경우를 위한 확장
}

// 사용자 생성/수정 시 필요한 요청 타입
export interface CreateUserRequest {
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
  image?: string
}

export interface UpdateUserRequest {
  id: number
  username?: string
  firstName?: string
  lastName?: string
  email?: string
  image?: string
}
