import { CommonResDto } from "../../../shared/model";

export interface UserType {
  id: number;
  username: string;
  image: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  email?: string;
  phone?: string;
  address?: AddressType;
  company?: CompanyType;
}

export interface AddressType {
  address: string;
  city: string;
  state: string;
}

export interface CompanyType {
  name: string;
  title: string;
}

export interface UserListResDto extends CommonResDto<UserType> {}
