export const likeComment = async (id) => {
  try {
    const response = await fetch(`/api/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: 1 }), // likes 증가만 전달
    })

    if (!response.ok) {
      throw new Error("좋아요 업데이트 실패")
    }

    const data = await response.json()
    return data // 업데이트된 댓글 데이터 반환
  } catch (error) {
    console.error("댓글 좋아요 오류:", error)
    return null // 오류 발생 시 null 반환
  }
}
