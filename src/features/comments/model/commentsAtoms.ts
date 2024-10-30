import { atom } from "jotai"
import { Comments, CommentsState, NewComment } from "../../../entities/comments/model/Comments"
const commentsAtom = atom<CommentsState>({})
const selectedCommentAtom = atom<Comments | null>(null)
const newCommentAtom = atom<NewComment>({ body: "", postId: null, userId: 1 })
const showAddCommentDialogAtom = atom(false)
const showEditCommentDialogAtom = atom(false)

export { commentsAtom, selectedCommentAtom, newCommentAtom, showAddCommentDialogAtom, showEditCommentDialogAtom }
