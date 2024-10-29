export const deleteComment = async (id: number, postId: number): Promise<void> => {
  try {
    await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    })
    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId].filter((comment) => comment.id !== id),
    }))
  } catch (error) {
    console.error("댓글 삭제 오류:", error)
  }
}
