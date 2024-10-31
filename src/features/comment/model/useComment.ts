import { atom, useAtom } from "jotai"
import { Comment, Comments } from "./types"
import { NewComment } from "../../../entities/comment/model/types"

const commentsAtom = atom<Comments>({})
const selectedCommentAtom = atom<Comment | null>(null)
const newCommentAtom = atom<NewComment>({ body: "", postId: null, userId: 1 })
const showAddCommentDialogAtom = atom(false)
const showEditCommentDialogAtom = atom(false)

export const useComment = () => {
  const [comments, setComments] = useAtom(commentsAtom)
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom)
  const [newComment, setNewComment] = useAtom(newCommentAtom)
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom)
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom)
  return new (class {
    comments = comments
    setComments = setComments
    selectedComment = selectedComment
    setSelectedComment = setSelectedComment
    newComment = newComment
    setNewComment = setNewComment
    showAddCommentDialog = showAddCommentDialog
    setShowAddCommentDialog = setShowAddCommentDialog
    showEditCommentDialog = showEditCommentDialog
    setShowEditCommentDialog = setShowEditCommentDialog
  })()
}
