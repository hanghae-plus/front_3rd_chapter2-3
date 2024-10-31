import { atom } from "jotai"
import type { Post, NewPost, User } from "../../../shared/types"

export const postsAtom = atom<Post[]>([])
export const totalAtom = atom<number>(0)
export const isLoadingAtom = atom<boolean>(false)
export const selectedPostAtom = atom<Post | null>(null)
export const showPostDetailDialogAtom = atom<boolean>(false)
export const selectedUserAtom = atom<User | null>(null)
export const showUserModalAtom = atom<boolean>(false)
export const showAddDialogAtom = atom<boolean>(false)
export const showEditDialogAtom = atom<boolean>(false)
export const newPostAtom = atom<NewPost>({
  title: "",
  body: "",
  userId: 0,
})
