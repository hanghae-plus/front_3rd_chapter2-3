import { atom, useAtom } from "jotai"
import { User } from "./types"

const selectedUserAtom = atom<User | null>(null)

export const useUser = () => {
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom)

  return new (class {
    selectedUser = selectedUser
    setSelectedUser = setSelectedUser
  })()
}
