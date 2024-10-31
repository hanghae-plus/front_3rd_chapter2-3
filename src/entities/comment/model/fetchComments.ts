const fetchComments = async (postId: number) => {
  // 이미 불러온 댓글이 있으면 다시 불러오지 않음
  try {
    const response = await fetch(`/api/comments/post/${postId}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("댓글 가져오기 오류:", error)
  }
}

export default fetchComments
