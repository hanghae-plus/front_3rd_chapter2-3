import { User } from "@/shared/types"
import { atom } from "jotai"

export const userAtom = atom<User | null>(null)
