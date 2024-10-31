export const deleteCommentApi = async (id: number): Promise<number> => {
  try {
    await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    })
    return id
  } catch (error) {
    console.error("댓글 삭제 오류:", error)
    throw new Error(`댓글 삭제 오류: ${error}`)
  }
}
