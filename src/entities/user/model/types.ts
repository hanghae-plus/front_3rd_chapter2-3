export type UserData = {
  image: string
  username: string
  firstName: string
  lastName: string
  age: number
  email: string
  phone: string
  address: Address
  company: Company
}

export type Address = {
  address: string
  city: string
  state: string
}

export type Company = {
  name: string
  title: string
}
