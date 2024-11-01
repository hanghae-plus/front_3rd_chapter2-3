export interface User {
  id: number
  age: number
  phone: string
  username: string
  firstName: string
  lastName: string
  address: { address: string; city: string; state: string }
  company: { name: string; title: string }
  email: string
  image: string
}
