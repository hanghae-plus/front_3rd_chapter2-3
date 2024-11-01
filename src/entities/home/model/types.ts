interface Hair {
  color: string;
  type: string;
}

interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

interface Company {
  department: string;
  name: string;
  title: string;
  address: Address;
}

interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}

interface Reactions {
  likes: number;
  dislikes: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
  role: string;
}

export interface NewPost {
  title: string;
  body: string;
  userId: User['id'];
}

export interface Post extends NewPost {
  id: number;
  tags: string[];
  reactions: Reactions;
  views: number;
  author?: User;
}

export interface NewCommnet {
  body: string;
  postId: Post['id'] | null;
  userId: User['id'];
}

export interface Comment extends NewCommnet {
  id: number;
  likes: number;
  user: User;
}

export interface Tag {
  slug: string;
  name: string;
  url: string;
}
