export interface Users {
  id: number
  image: string
  username?: string
  fullName?: string
}

export interface UsersData {
  limit: number
  skip: number
  total: number
  users: Users[]
}

export interface Address {
  address: string
  city: string
  state: string
  stateCode: string
  postalCode: string
}

export interface Bank {
  cardExpire: string
  cardNumber: string
  cardType: string
  currency: string
  iban: string
}

export interface Company {
  department: string
  name: string
  title: string
  address: Address
}

export interface Crypto {
  coin: string
  wallet: string
  network: string
}

export interface Hair {
  color: string
  type: string
}

export interface SelectedUser {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  email: string
  password: string
  phone: string
  gender: string
  hair: Hair
  age: number
  height: number
  weight: number
  eyeColor: string
  bloodGroup: string
  birthDate: string
  image: string
  role: string
  username: string
  university: string
  ssn: string
  ip: string
  macAddress: string
  userAgent: string
  address: Address
  bank: Bank
  company: Company
  crypto: Crypto
}
