import { ResponseData } from "../../../types.ts";

export interface User {
  id: number;
  image: string;
  username: string;
}

export interface UserResponse extends ResponseData {
  users: User[];
}

export interface SelectedUser {
  address: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    country: string;
    postalCode: string;
    state: string;
    stateCode: string;
  };
  age: number;
  bank: {
    cardExpire: string;
    cardNumber: number;
    cardType: string;
    currency: string;
    iban: string;
  };
  birthDate: string;
  bloodGroup: string;
  company: {
    department: string;
    name: string;
    address: {
      address: string;
      city: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      country: string;
      postalCode: string;
      state: string;
      stateCode: string;
    };
    title: string;
  };
  crypto: {
    coin: string;
    network: string;
    wallet: string;
  };
  ein: string;
  email: string;
  eyeColor: string;
  firstName: string;
  gender: string;
  hair: {
    color: string;
    type: string;
  };
  height: number;
  id: number;
  image: string;
  ip: string;
  lastName: string;
  macAddress: string;
  maidenName: string;
  password: string;
  phone: string;
  role: string;
  ssn: string;
  university: string;
  userAgent: string;
  username: string;
  weight: number;
}
