export const commentLikeApi = async (id: number) => {
  try {
    const data = await fetch(`/api/comments/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ likes: 1 }),
      headers: { "Content-Type": "application/json" },
    })

    return { data, error: null }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error("댓글 좋아요 오류:", errorMessage)
    return { data: null, error: errorMessage }
  }
}
