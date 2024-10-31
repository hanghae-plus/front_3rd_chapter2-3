import { atom, useAtom } from "jotai"
import { CommentType, NewCommentType } from "./types"
import { useQueryComment } from "../api/useQueryComment"
import { useMutationComment } from "../api/useMutationComment"

const newCommentAtom = atom<NewCommentType>({ body: "", postId: null, userId: 1 })
const selectedCommentAtom = atom<CommentType | undefined>(undefined)

export function useComments(postId: number) {
  const [newComment, setNewComment] = useAtom(newCommentAtom)
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom)
  const { data, isLoading, error, isError } = useQueryComment(postId)
  const { mutations, state: mutationState } = useMutationComment(postId)
  return {
    comments: data ?? [],
    isCommentsLoading: isLoading || mutationState.isPending,
    isCommentsError: isError || mutationState.isError,
    commentsError: error || mutationState.error,
    addComment: mutations.addComment,
    updateComment: mutations.updateComment,
    deleteComment: mutations.deleteComment,
    likeComment: mutations.likeComment,
    newComment,
    setNewComment,
    selectedComment,
    setSelectedComment,
  }
}
