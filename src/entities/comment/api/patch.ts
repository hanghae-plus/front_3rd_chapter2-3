export const likeComment = async (id: number, postId: number): Promise<void> => {
  try {
    const response = await fetch(`/api/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: comments[postId].find((c) => c.id === id)!.likes + 1 }),
    })
    const data: Comment = await response.json()
    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId].map((comment) => (comment.id === data.id ? data : comment)),
    }))
  } catch (error) {
    console.error("댓글 좋아요 오류:", error)
  }
}
