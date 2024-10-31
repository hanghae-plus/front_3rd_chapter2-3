type BloodGroupType = "A+" | "A-" | "B+" | "B-" | "O-" | "O+" | "AB+" | "AB-"

type GenderType = "male" | "female"

type EyeColorType = "Green" | "Red" | "Hazel" | "Amber" | "Blue" | "Brown" | "Violet" | "Gray"

type HairColorType = "Brown" | "Green" | "White" | "Blonde" | "Gray" | "Red" | "Purple" | "Blue" | "Black"

type HairTypeType = "Wavy" | "Curly" | "Straight" | "Kinky"

type RoleType = "admin" | "moderator" | "user"

type AddressStateMappingType = {
  "Mississippi": "MS"
  "Alabama": "AL"
  "Pennsylvania": "PA"
  "Colorado": "CO"
  "Tennessee": "TN"
  "Delaware": "DE"
  "Rhode Island": "RI"
  "Louisiana": "LA"
  "Utah": "UT"
  "South Dakota": "SD"
  "West Virginia": "WV"
  "North Dakota": "ND"
  "Ohio": "OH"
  "Iowa": "IA"
  "Wyoming": "WY"
  "Arkansas": "AR"
  "New Mexico": "NM"
  "New Jersey": "NJ"
  "Illinois": "IL"
  "Missouri": "MO"
  "New York": "NY"
  "Maine": "ME"
  "Nevada": "NV"
  "Massachusetts": "MA"
  "Montana": "MT"
}

type AddressCityType =
  | "Phoenix"
  | "Houston"
  | "Washington"
  | "Seattle"
  | "Jacksonville"
  | "Fort Worth"
  | "Indianapolis"
  | "San Antonio"
  | "New York"
  | "Denver"
  | "Columbus"
  | "San Jose"
  | "San Diego"
  | "Chicago"
  | "Philadelphia"
  | "Dallas"
  | "Los Angeles"
  | "San Francisco"

type AddressCountryType = "United States"

interface AddressType {
  address: string
  city: AddressCityType
  state: keyof AddressStateMappingType
  stateCode: AddressStateMappingType[AddressType["state"]]
  postalCode: string
  coordinates: {
    lat: number
    lng: number
  }
  country: AddressCountryType
}

type BackCardTypeType =
  | "Elo"
  | "Korean Express"
  | "Mastercard"
  | "American Express"
  | "Diners Club International"
  | "JCB"
  | "Maestro"
  | "Visa"
  | "NPS"
  | "Discover"
  | "Carte Bancaire"
  | "Mir"
  | "UnionPay"
  | "RuPay"
  | "BC Card"

type BankCurrencyType = "CNY" | "SEK" | "INR" | "CAD" | "BRL" | "EUR" | "GBP" | "USD" | "NZD" | "PKR" | "TRY" | "JPY"

export interface UserType {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  age: number
  gender: GenderType
  email: string
  phone: string
  username: string
  password: string
  birthDate: string
  image: string
  bloodGroup: BloodGroupType
  height: number
  weight: number
  eyeColor: EyeColorType
  hair: {
    color: HairColorType
    type: HairTypeType
  }
  ip: string
  address: AddressType
  macAddress: string
  university: string
  bank: {
    cardExpire: string
    cardNumber: string
    cardType: BackCardTypeType
    currency: BankCurrencyType
    iban: string
  }
  company: {
    department: string
    name: string
    title: string
    address: AddressType
  }
  ein: string
  ssn: string
  userAgent: string
  crypto: {
    coin: string
    wallet: string
    network: string
  }
  role: RoleType

  get fullname(): string
}

export interface FetchAllUserReturnType {
  limit: number
  users: UserType[]
  skip: number
  total: number
}
