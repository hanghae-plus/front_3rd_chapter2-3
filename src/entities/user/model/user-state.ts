import { create } from "zustand";
import { UserType } from "./user-type";

interface UserListState {
  userList: UserType[];
  setNewUserList: (newUser: UserType[]) => void;
}

export const userListState = create<UserListState>(set => ({
  userList: [],
  setNewUserList: newUserList => {
    set(() => ({ userList: newUserList }));
  },
}));
