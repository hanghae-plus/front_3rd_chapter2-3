import { atom, useAtom } from "jotai"
import { commentCreateApi } from "../api/commentCreateApi"
import { commentDeleteApi } from "../api/commentDeleteApi"
import { commentLikeApi } from "../api/commentLikeAip"
import { commentUpdateApi } from "../api/commentUpdateApi"

const commentsAtom = atom<Comment[]>([])

export const useCommentHandler = () => {
  const [, setComments] = useAtom(commentsAtom)

  // 댓글 추가
  const commentCreate = async (newComment: Omit<Comment, "id" | "likes">) => {
    const createComment = await commentCreateApi(newComment)

    if (!createComment) {
      return
    }

    setComments((prev) => [...prev, createComment])
  }

  // 댓글 삭제
  const deleteComment = async (deleteId: number) => {
    const deleteComment = await commentDeleteApi(deleteId)
    if (deleteComment) {
      alert("삭제완료")
      setComments((prev) => prev.filter((comment) => comment.id !== deleteId))
    }
  }

  // 댓글 좋아요
  const likeComment = async (id: number) => {
    const data = await commentLikeApi(id)

    if (data.data) {
      setComments((prev) => prev.map((comment) => (comment.id === id ? { ...comment, likes: data.likes } : comment)))
    }
  }

  // 댓글 업데이트
  const updateComment = async (selectedComment: Pick<Comment, "id" | "body">) => {
    const data = commentUpdateApi(selectedComment)

    setComments((prev) => prev.map((comment) => (comment.id === data.id ? data : comment)))
  }

  return {
    commentCreate,
    deleteComment,
    likeComment,
    updateComment,
  }
}
