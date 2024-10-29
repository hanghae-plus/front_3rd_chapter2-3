export const deleteComment = async (id) => {
  try {
    const response = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("댓글 삭제 실패")
    }

    return true // 삭제 성공 시 true 반환
  } catch (error) {
    console.error("댓글 삭제 오류:", error)
    return false // 삭제 실패 시 false 반환
  }
}
