import { Post } from "@/shared/types"
import { atom } from "jotai"

export const postsAtom = atom<Post[]>([])
export const postAtom = atom<Post | null>(null)
