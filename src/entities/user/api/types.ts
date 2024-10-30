export interface UserDto {
  id: number;
  image: string;
  username: string;
}

export interface UsersDto {
  limit: number;
  skip: number;
  total: number;
  users: UserDto[];
}
