export const commentCreateApi = async (comment: Comment) => {
  try {
    const response = await fetch("/api/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    })

    return await response.json()
  } catch (error) {
    throw new Error("댓글 생성 실패" + error)
  }
}
