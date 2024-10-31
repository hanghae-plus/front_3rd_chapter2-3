import { useCommentStore } from "../model/stores/useCommentStore"

export const LikeComment = (commentId: number, postId: string | number) => {
  const { comments, setComments } = useCommentStore()

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          likes: (comments[postId]?.find((c) => c.id === commentId)?.likes ?? 0) + 1,
        }),
      })
      const data = await response.json()
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  return handleLike
}
