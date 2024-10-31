import { atom } from "jotai"

// 댓글 상태
export const commentsAtom = atom<Record<number, Comment[]>>({})
export const selectedCommentAtom = atom<Comment | null>(null)
export const newCommentAtom = atom<{ body: string; postId: number | null; userId: number }>({
  body: "",
  postId: null,
  userId: 1,
})

// 댓글 다이얼로그 상태
export const showAddCommentDialogAtom = atom<boolean>(false)
export const showEditCommentDialogAtom = atom<boolean>(false)
