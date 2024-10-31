import { useAtom } from "jotai"
import {
  commentsAtom,
  newCommentAtom,
  showAddCommentDialogAtom,
  showEditCommentDialogAtom,
  selectedCommentAtom,
} from "../../../entities/model/comment/atoms"
import { useCommentActions } from "./useCommentActions"
import { useCommentLike } from "./useCommentLike"

export const useComment = () => {
  const [comments, setComments] = useAtom(commentsAtom)
  const [newComment, setNewComment] = useAtom(newCommentAtom)
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom)
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom)
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom)

  const actions = useCommentActions()
  const like = useCommentLike()

  return {
    ...actions,
    ...like,
    comments,
    setComments,
    newComment,
    setNewComment,
    showAddCommentDialog,
    setShowAddCommentDialog,
    showEditCommentDialog,
    setShowEditCommentDialog,
    selectedComment,
    setSelectedComment,
  }
}
