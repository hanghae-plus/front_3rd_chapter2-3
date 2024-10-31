import useCommentStore from "./useCommentStore"

const likeComment = async (id: number, postId: number) => {
  const { comments, setComments } = useCommentStore.getState()

  try {
    const response = await fetch(`/api/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: (comments[postId].find((c) => c.id === id)?.likes as number) + 1 }),
    })
    const data = await response.json()
    setComments(
      postId,
      comments[postId].map((comment) => (comment.id === data.id ? data : comment)),
    )
  } catch (error) {
    console.error("댓글 좋아요 오류:", error)
  }
}

export default likeComment
