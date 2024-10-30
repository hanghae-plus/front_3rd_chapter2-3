import { atom, useAtom } from "jotai"
import { NewComment, Comment } from "../../../entities/comment/model/types.ts"

const selectedCommentAtom = atom<Comment | null>(null)
const newCommentAtom = atom<NewComment>({ body: "", postId: null, userId: 1 })
const showAddCommentDialogAtom = atom(false)
const showEditCommentDialogAtom = atom(false)

export const useCommentDialog = () => {
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom)
  const [newComment, setNewComment] = useAtom(newCommentAtom)
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom)
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom)

  return {
    selectedComment,
    setSelectedComment,
    newComment,
    setNewComment,
    showAddCommentDialog,
    setShowAddCommentDialog,
    showEditCommentDialog,
    setShowEditCommentDialog,
  }
}
