import { atom, useAtom } from "jotai"
import { Comment, NewComment } from "../../../entities/comment/model/types"

const newCommentAtom = atom<NewComment>({ body: "", postId: null, userId: 1 })
const showAddCommentDialogAtom = atom(false)

const selectedCommentAtom = atom<Comment | null>(null)
const showEditCommentDialogAtom = atom(false)

export const useCommentsStore = () => {
  const [newComment, setNewComment] = useAtom(newCommentAtom)
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom)

  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom)
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom)

  return {
    newComment,
    setNewComment,
    showAddCommentDialog,
    setShowAddCommentDialog,

    selectedComment,
    setSelectedComment,
    showEditCommentDialog,
    setShowEditCommentDialog,
  }
}
