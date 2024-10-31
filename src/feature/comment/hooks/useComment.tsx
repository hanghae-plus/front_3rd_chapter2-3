import { fetchApi } from "../../../entities/model/fetch"
import { atom, useAtom } from "jotai"

const commentsAtom = atom<Comment[]>([])

export const useComment = () => {
  const [comments, setComments] = useAtom(commentsAtom)

  // 댓글 추가
  const addComment = async (newComment: Omit<Comment, "id" | "likes">) => {
    try {
      const { data } = await fetchApi<Comment>("/api/comments/add", {
        method: "POST",
        body: JSON.stringify(newComment),
      })

      setComments((prev) => [...prev, data])
      return { data, error: null }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      console.error("댓글 추가 오류:", errorMessage)
      return { data: null, error: errorMessage }
    }
  }

  // 댓글 삭제
  const deleteComment = async (id: number) => {
    try {
      await fetchApi<void>(`/api/comments/${id}`, {
        method: "DELETE",
      })

      setComments((prev) => prev.filter((comment) => comment.id !== id))
      return { success: true, error: null }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      console.error("댓글 삭제 오류:", errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  // 댓글 좋아요
  const likeComment = async (id: number) => {
    try {
      const { data } = await fetchApi<Comment>(`/api/comments/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ likes: 1 }),
      })

      setComments((prev) => prev.map((comment) => (comment.id === id ? { ...comment, likes: data.likes } : comment)))
      return { data, error: null }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      console.error("댓글 좋아요 오류:", errorMessage)
      return { data: null, error: errorMessage }
    }
  }

  // 댓글 업데이트
  const updateComment = async (selectedComment: Pick<Comment, "id" | "body">) => {
    try {
      const { data } = await fetchApi<Comment>(`/api/comments/${selectedComment.id}`, {
        method: "PUT",
        body: JSON.stringify({ body: selectedComment.body }),
      })

      setComments((prev) => prev.map((comment) => (comment.id === data.id ? data : comment)))
      return { data, error: null }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      console.error("댓글 업데이트 오류:", errorMessage)
      return { data: null, error: errorMessage }
    }
  }

  return {
    comments,
    addComment,
    deleteComment,
    likeComment,
    updateComment,
  }
}
