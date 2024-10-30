export interface UserType {
  id: number
  username: string
  firstName: string
  lastName: string
  age: number
  email: string
  phone: number
  address: address
  company: company
  image: string
}

type address = {
  address: string
  city: string
  state: string
}
type company = {
  name: string
  title: string
}
