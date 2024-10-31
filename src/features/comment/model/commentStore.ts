import { atom, useAtom } from "jotai"
import { Comment } from "../../../entities/comment/model/types"

const selectedCommentAtom = atom<Comment | null>(null)
const showEditCommentDialogAtom = atom(false)

export const useCommentsStore = () => {
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom)
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom)

  return {
    selectedComment,
    setSelectedComment,
    showEditCommentDialog,
    setShowEditCommentDialog,
  }
}
