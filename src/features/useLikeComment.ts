import useCommentManagement from "./useCommentManagement"

const useLikeComment = () => {
  const { comments, setComments } = useCommentManagement()
  const likeComment = async (id: number, postId: number) => {
    try {
      const comment = comments[postId]?.find((c) => c.id === id)
      if (!comment) {
        console.error("댓글을 찾을 수 없습니다.")
        return
      }

      const response = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: comment.likes + 1 }),
      })

      const data = await response.json()
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId]?.map((c) => (c.id === data.id ? data : c)) || [],
      }))
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  return { likeComment }
}

export default useLikeComment
