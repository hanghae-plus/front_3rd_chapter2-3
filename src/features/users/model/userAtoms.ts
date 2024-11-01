import { atom } from "jotai"
import { SelectedUser } from "../../../entities/users/model/User"

const showUserModalAtom = atom(false)
const selectedUserAtom = atom<SelectedUser | null>(null)

export { showUserModalAtom, selectedUserAtom }
