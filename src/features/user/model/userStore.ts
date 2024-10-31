import { atom, useAtom } from "jotai";
import { User } from "../../../entities/user/model/types";

const selectedUserAtom = atom<User|null>(null)

export const useUsers = () => {
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom)

  return {
    selectedUser,
    setSelectedUser
  }
}