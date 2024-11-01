type ResUser = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};

type User = {
  id: number;
  username: string;
  image: string;
};

type ResUserDetail = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  image: string;
  address: Address;
  company: Company;
};

type Address = {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
};

type Company = {
  department: string;
  name: string;
  title: string;
  address: Address2;
};
