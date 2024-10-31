import useCommentStore from "./useCommentStore"

// 댓글 추가
const addComment = async () => {
  const { comments, newComment, setComments, setShowAddCommentDialog, setNewComment } = useCommentStore.getState()
  try {
    const response = await fetch("/api/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
    const data = await response.json()
    setComments(data.postId, [...(comments[data.postId] || []), data])
    setShowAddCommentDialog(false)
    setNewComment({ body: "", postId: null, userId: 1 })
  } catch (error) {
    console.error("댓글 추가 오류:", error)
  }
}

export default addComment
