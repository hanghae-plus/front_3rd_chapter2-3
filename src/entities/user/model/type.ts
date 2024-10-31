type UserAddressCoordinates = {
  lat: number
  lng: number
}

type UserAddress = {
  address: string
  city: string
  state: string
  stateCode: string
  postalCode: string
  coordinates: UserAddressCoordinates
  country: string
}

type UserCompanyAddress = {
  address: string
  city: string
  state: string
  stateCode: string
  postalCode: string
  coordinates: UserAddressCoordinates
  country: string
}

type UserCompany = {
  department: string
  name: string
  title: string
  address: UserCompanyAddress
}

type UserBank = {
  cardExpire: string
  cardNumber: string
  cardType: string
  currency: string
  iban: string
}

type UserHair = {
  color: string
  type: string
}

type UserCrypto = {
  coin: string
  wallet: string
  network: string
}

export type User = {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  age: number
  gender: "male" | "female"
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
  hair: UserHair
  ip: string
  address: UserAddress
  macAddress: string
  university: string
  bank: UserBank
  company: UserCompany
  ein: string
  ssn: string
  userAgent: string
  crypto: UserCrypto
  role: string
}
