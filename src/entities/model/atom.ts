import { atom } from "jotai"

// User 인터페이스
export interface User {
  id: number
  username: string | null
  image: string | null
}

// 게시물 리스트 상태
export const userAtom = atom<User[]>([])
