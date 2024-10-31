export const commentDeleteApi = async (id: number) => {
  try {
    await fetch(`/api/comments/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })

    return { success: true, error: null }
  } catch (error) {
    throw new Error("댓글 생성 실패" + error)
  }
}
