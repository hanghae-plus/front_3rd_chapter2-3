export interface UserDto {
  id: number;
  image: string;
  username: string;
}

export interface UsersDto {
  limit: number;
  skip: number;
  total: number;
  users: {
    id: number;
    image: string;
    username: string;
  }[];
}

export interface UserDetailDto {
  image: string;
  username: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  address: {
    address: string;
    city: string;
    state: string;
  };
  company: {
    name: string;
    title: string;
  };
}
