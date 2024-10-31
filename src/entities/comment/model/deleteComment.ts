import useCommentStore from "./useCommentStore"

const deleteComment = async (id: number, postId: number) => {
  const { comments, setComments } = useCommentStore.getState()
  try {
    await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    })
    setComments(
      postId,
      comments[postId].filter((comment) => comment.id !== id),
    )
  } catch (error) {
    console.error("댓글 삭제 오류:", error)
  }
}

export default deleteComment
