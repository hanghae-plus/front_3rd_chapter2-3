import { atom } from "jotai"

// API 상태 관련
export const loadingAtom = atom<boolean>(false)
export const errorAtom = atom<Error | null>(null)
