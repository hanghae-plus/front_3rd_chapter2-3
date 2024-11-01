import { atom } from "jotai"
import { Post } from "../types"
import { DEFAULT_POST } from "../constants"

export const postsAtom = atom<Post[]>([])

export const selectedPostsAtom = atom<Post>(DEFAULT_POST)
