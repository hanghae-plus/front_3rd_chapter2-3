import { useAtom } from "jotai"
import { commentsAtom } from "../../entities/model/comment/atoms"
import { likeComment } from "../../shared/api/comment"

export const useCommentLike = () => {
  const [comments, setComments] = useAtom(commentsAtom)

  const handleLikeComment = async (id: number, postId: number) => {
    const currentComment = comments[postId].find((c) => c.id === id)
    if (!currentComment) return

    const data = await likeComment(id, currentComment.likes)
    if (data) {
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
    }
  }

  return { handleLikeComment }
}
