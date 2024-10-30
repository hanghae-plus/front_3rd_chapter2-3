import { atom, useAtom } from "jotai"
import { UserType } from "../../../entities/User/model/types"

const selectedUserAtom = atom<UserType>()

export const useUser = () => {
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom)

  return { selectedUser, setSelectedUser }
}
