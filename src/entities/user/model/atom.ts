import { DEFAULT_USER_DATA } from "@entities/user/constants"
import { User } from "@entities/user/types"
import { atom } from "jotai"

export const userList = atom<User[]>([])

export const selectedUserAtom = atom<User>({ ...DEFAULT_USER_DATA })
