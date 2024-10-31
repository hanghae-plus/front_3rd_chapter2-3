export const commentUpdateApi = async (selectedComment: Comment) => {
  console.log("selectedComment3", selectedComment)

  if (!selectedComment) {
    return
  }

  try {
    const data = await fetch(`/api/comments/${selectedComment.id}`, {
      method: "PUT",
      body: JSON.stringify({ body: selectedComment.body }),
    })

    if (!data) {
      return
    }
    return selectedComment
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error("댓글 업데이트 오류:", errorMessage)
    return { data: null, error: errorMessage }
  }
}
