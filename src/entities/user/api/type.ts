export type UserDto = { id: number; username: string; fullName: string };

export interface UsersResponseDto {
  users: UserDto[];
  total: number;
  skip: number;
  limit: number;
}
