// 댓글 업데이트
export const updateComment = async (selectedComment) => {
  try {
    const response = await fetch(`/api/comments/${selectedComment.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: selectedComment.body }),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("댓글 업데이트 오류:", error)
    return null
  }
}
