import { User } from "@entities/user/model"
import { atom, useAtom } from "jotai"
import { selectedUserValue } from "../config/selectedUserValue"

const selectedUserAtom = atom<User | null>(null)

export const useSelectedUser = () => {
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom)

  const updateSelectedUser = (user: User) => {
    setSelectedUser(user)
  }

  const resetUser = () => {
    setSelectedUser(null)
  }

  return {
    selectedUser: selectedUser || selectedUserValue.initial,
    updateSelectedUser,
    resetUser,
  }
} 