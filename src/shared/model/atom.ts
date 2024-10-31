import { atom } from "jotai"

export const searchQueryAtom = atom("")
export const skipAtom = atom(0)
export const limitAtom = atom(10)
export const sortByAtom = atom("")
export const sortOrderAtom = atom<"asc" | "desc">("asc")
export const selectedTagAtom = atom("")
