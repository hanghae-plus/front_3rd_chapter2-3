type Address = {
  address: string
  city: string
  state: string
}

type Company = {
  name: string
  title: string
}

export type User = {
  id: number
  username: string
  image: string
  firstName: string
  lastName: string
  age: number
  email: string
  phone: string
  address: Address
  company: Company
}
