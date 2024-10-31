import { useAtom } from "jotai"
import {
  commentsAtom,
  newCommentAtom,
  selectedCommentAtom,
  showAddCommentDialogAtom,
  showEditCommentDialogAtom,
} from "../../../../app/atom"
import { useMutation } from "@tanstack/react-query"

export const useAddComment = () => {
  const [, setComments] = useAtom(commentsAtom)
  const [, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom)
  const [newComment] = useAtom(newCommentAtom)
  return useMutation({
    mutationKey: ["addComment"],
    mutationFn: async () => {
      const response = await fetch("/api/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      return data
    },
    onSuccess: (data) => {
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))
      setShowAddCommentDialog(false)
    },
    onError: (error) => {
      console.error("댓글 추가 오류:", error)
    },
  })
}

export const useUpdateComment = () => {
  const [selectedComment] = useAtom(selectedCommentAtom)
  const [, setComments] = useAtom(commentsAtom)
  const [, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom)

  return useMutation({
    mutationKey: ["updateComment"],
    mutationFn: async () => {
      if (!selectedComment) return

      const response = await fetch(`/api/comments/${selectedComment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: selectedComment.body }),
      })
      const data = await response.json()
      return data
    },
    onSuccess: (data) => {
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
      setShowEditCommentDialog(false)
    },
    onError: (error) => {
      console.error("댓글 업데이트 오류:", error)
    },
  })
}

export const useDeleteComment = () => {
  const [, setComments] = useAtom(commentsAtom)

  return useMutation({
    mutationKey: ["deleteComment"],
    mutationFn: async ({ id, postId }: { id: number; postId: number }) => {
      const response = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("댓글 삭제 오류")
      return { id, postId } // id와 postId를 객체로 반환
    },
    onSuccess: ({ id, postId }) => {
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
    },
    onError: (error) => {
      console.error("댓글 삭제 오류:", error)
    },
  })
}
