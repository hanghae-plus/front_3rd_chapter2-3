import { FetchUsersProps, User } from "../model/types";

// query
const fetchUsers = async (props: FetchUsersProps = {}): Promise<User[]> => {
  const queries = props.select?.join(",");
  const response = await fetch(`/api/users?limit=0&select=${queries}`);
  const data = await response.json();
  return data.users;
};

// query
const fetchUser = async (id: number): Promise<User> => {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return data;
};

// ======================================================

// total
export const userApi = Object.freeze({
  getUsers: fetchUsers,
  getUser: fetchUser,
});
