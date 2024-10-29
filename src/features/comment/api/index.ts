export const likeCommentApi = async (id: number, likes: number) => {
  try {
    const response = await fetch(`/api/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes }),
    })
    const data = await response.json()

    return data
  } catch (error) {
    console.error("댓글 좋아요 오류:", error)
  }
}
