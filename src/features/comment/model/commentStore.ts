import { useQueryClient } from "@tanstack/react-query"
import { atom, useAtom } from "jotai"
import { Comment, CommentDTO, NewComment } from "../../../entities/comment/model/types"
import { useMutationCommentAdd } from "../api/useMutationCommentAdd"
import { useMutationCommentDelete } from "../api/useMutationCommentDelete"
import { useMutationCommentLike } from "../api/useMutationCommentLike"
import { useMutationCommentUpdate } from "../api/useMutationCommentUpdate"

const newCommentAtom = atom<NewComment>({ body: "", postId: null, userId: 1 })
const showAddCommentDialogAtom = atom(false)

const selectedCommentAtom = atom<Comment | null>(null)
const showEditCommentDialogAtom = atom(false)

export const useComments = (postId: number) => {
  const queryClient = useQueryClient()

  const [newComment, setNewComment] = useAtom(newCommentAtom)
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom)

  const { mutate: addCommentMutate } = useMutationCommentAdd()
  const addComment = () => {
    addCommentMutate(newComment)

    setShowAddCommentDialog(false)
    setNewComment({ body: "", postId: null, userId: 1 })
  }

  const { mutate: likeCommentMutate } = useMutationCommentLike()
  const likeComment = (commentId: number) => {
    const data = queryClient.getQueryData<CommentDTO>(["comments", postId])
    const targetComment = data?.comments.find((comment) => comment.id === commentId)
    if (!targetComment) return
    const newLike = targetComment.likes + 1
    likeCommentMutate({ commentId, newLike })
  }

  const { mutate: deleteCommentMutate } = useMutationCommentDelete()
  const deleteComment = (commentId: number) => {
    deleteCommentMutate(commentId)
  }

  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom)
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom)

  const { mutate: updateCommentMutate } = useMutationCommentUpdate()
  const updateComment = async () => {
    if (!selectedComment) return
    if (selectedComment.body === "") {
      alert("댓글을 입력해주세요.")
      return
    }

    updateCommentMutate(selectedComment)

    setShowEditCommentDialog(false)
  }

  return {
    newComment,
    setNewComment,
    showAddCommentDialog,
    setShowAddCommentDialog,
    addComment,
    likeComment,
    deleteComment,

    selectedComment,
    setSelectedComment,
    showEditCommentDialog,
    setShowEditCommentDialog,
    updateComment,
  }
}
