import { useAtom } from "jotai"
import {
  newCommentAtom,
  showAddCommentDialogAtom,
  showEditCommentDialogAtom,
  selectedCommentAtom,
} from "../../../entities/model/comment/atoms"
import { useCommentsQuery, useCommentMutations } from "../../../entities/api/comment/useCommentQuery"
import { NewComment, Comment } from "../../../shared/types"
import { useCommentLike } from "./useCommentLike"

export const useComment = (postId?: number) => {
  const [newComment, setNewComment] = useAtom(newCommentAtom)
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom)
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom)
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom)

  const { data: comments, isLoading, refetch } = useCommentsQuery(postId || 0)
  const { addCommentMutation, updateCommentMutation, deleteCommentMutation } = useCommentMutations()
  const like = useCommentLike()

  const handleFetchComments = async (postId: number) => {
    if (!postId) return
    await refetch()
  }

  const handleAddComment = async (newComment: NewComment) => {
    const result = await addCommentMutation.mutateAsync(newComment)
    if (result) {
      setShowAddCommentDialog(false)
      return result
    }
  }

  const handleUpdateComment = async (comment: Comment) => {
    const result = await updateCommentMutation.mutateAsync(comment)
    if (result) {
      setShowEditCommentDialog(false)
      return result
    }
  }

  const handleDeleteComment = async (id: number) => {
    return await deleteCommentMutation.mutateAsync(id)
  }

  return {
    comments: comments?.comments || [],
    isLoading,
    handleFetchComments,
    handleAddComment,
    handleUpdateComment,
    handleDeleteComment,
    newComment,
    setNewComment,
    showAddCommentDialog,
    setShowAddCommentDialog,
    showEditCommentDialog,
    setShowEditCommentDialog,
    selectedComment,
    setSelectedComment,
    ...like,
  }
}
