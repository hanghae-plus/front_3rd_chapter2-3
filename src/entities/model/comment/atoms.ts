import { atom } from "jotai"
import type { Comment, NewComment } from "../../../shared/types"

export const commentsAtom = atom<Record<number, Comment[]>>({})
export const newCommentAtom = atom<NewComment>({
  body: "",
  postId: null,
  userId: 1,
})
export const showAddCommentDialogAtom = atom<boolean>(false)
export const showEditCommentDialogAtom = atom<boolean>(false)
export const selectedCommentAtom = atom<Comment | null>(null)
