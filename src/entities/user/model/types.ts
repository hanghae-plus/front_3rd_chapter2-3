export interface User_i {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  age: number
  gender: string
  email: string
  phone: string
  username: string
  password: string
  birthDate: string
  image: string
  bloodGroup: string
  height: number
  weight: number
  eyeColor: string
  hair: Hair_i
  ip: string
  address: Address_i
  macAddress: string
  university: string
  bank: Bank_i
  company: Company_i
  ein: string
  ssn: string
  userAgent: string
  crypto: Crypto_i
  role: string
}

interface Hair_i {
  color: string
  type: string
}

interface Coordinates_i {
  lat: number
  lng: number
}

interface Address_i {
  address: string
  city: string
  state: string
  stateCode: string
  postalCode: string
  coordinates: Coordinates_i
  country: string
}

interface Bank_i {
  cardExpire: string
  cardNumber: string
  cardType: string
  currency: string
  iban: string
}

interface Company_i {
  department: string
  name: string
  title: string
  address: Address_i
}

interface Crypto_i {
  coin: string
  wallet: string
  network: string
}
