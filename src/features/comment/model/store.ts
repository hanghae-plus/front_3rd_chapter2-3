import { Comments, NewComment, Comment } from "../../../entities/comment/model/type"
import {
  createCommentApi,
  deleteCommentApi,
  fetchCommentsApi,
  likeCommentApi,
  updateCommentApi,
} from "../../../entities/comment/api"
import { atom, useAtom } from "jotai"

export const commentsAtom = atom<Comments>({})
export const selectedCommentAtom = atom<Comment | null>(null)
export const newCommentAtom = atom<NewComment>({ body: "", postId: null, userId: 1 })
export const showAddCommentDialogAtom = atom(false)
export const showEditCommentDialogAtom = atom(false)

export const useComment = () => {
  const [comments, setComments] = useAtom(commentsAtom)
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom)
  const [newComment, setNewComment] = useAtom(newCommentAtom)
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom)
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom)

  const deleteComment = async (id: number, postId: number) => {
    await deleteCommentApi(id)
    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId].filter((comment) => comment.id !== id),
    }))
  }
  const likeComment = async (id: number, postId: number) => {
    const newLikes = comments[postId].find((c) => c.id === id)?.likes || 0 + 1
    const data = await likeCommentApi(id, newLikes)
    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId].map((comment) => (comment.id === data.id ? data : comment)),
    }))
  }

  const addComment = async () => {
    const data = await createCommentApi(newComment)
    setComments((prev) => ({
      ...prev,
      [data.postId]: [...(prev[data.postId] || []), data],
    }))
    setShowAddCommentDialog(false)
    setNewComment({ body: "", postId: null, userId: 1 })
  }
  const updateComment = async (selectedComment: Comment) => {
    const data = await updateCommentApi(selectedComment)

    setComments((prev) => ({
      ...prev,
      [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
    }))
    setShowEditCommentDialog(false)
  }
  const fetchComments = async (postId: number) => {
    if (comments?.[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    const data = await fetchCommentsApi(postId)
    setComments((prev: Comments) => ({ ...prev, [postId]: data.comments }))
  }
  return {
    fetchComments,
    newComment,
    setNewComment,
    showAddCommentDialog,
    setShowAddCommentDialog,
    addComment,
    likeComment,
    deleteComment,
    comments,
    selectedComment,
    setSelectedComment,
    showEditCommentDialog,
    setShowEditCommentDialog,
    updateComment,
  }
}
