import { atom } from "jotai"
import { UserType } from "./types"

// 게시물 리스트 상태
export const userAtom = atom<UserType | null>()
export const loadingAtom = atom<boolean>(false)
