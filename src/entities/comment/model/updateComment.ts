import useCommentStore from "./useCommentStore"

const updateComment = async () => {
  const { comments, setComments, selectedComment, setShowEditCommentDialog } = useCommentStore.getState()

  try {
    const response = await fetch(`/api/comments/${selectedComment?.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: selectedComment?.body }),
    })
    const data = await response.json()
    setComments(
      data.postId,
      comments[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
    )
    setShowEditCommentDialog(false)
  } catch (error) {
    console.error("댓글 업데이트 오류:", error)
  }
}

export default updateComment
