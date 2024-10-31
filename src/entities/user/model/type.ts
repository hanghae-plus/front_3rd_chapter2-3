export type UserAddress = {
  address: string;
  city: string;
  state: string;
}


export type UserCompany = {
  name: string;
  title: string;
} 

export type User = {
  id: number
  username: string
  image: string
  firstName?: string
  lastName?: string
  age?: number
  email?: string
  phone?: string
  address?: UserAddress
  company?: UserCompany
}