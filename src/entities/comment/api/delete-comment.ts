interface DeleteCommentParamsType {
  commentId: number;
  postId: number;
}

// 댓글 삭제
export const deleteComment = async ({ commentId, postId }: DeleteCommentParamsType) => {
  try {
    await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
    });
    // setComments((prev: any) => ({
    //   ...prev,
    //   [postId]: prev[postId].filter((comment: any) => comment.id !== commentId),
    // }));
  } catch (error) {
    console.error("댓글 삭제 오류:", error);
    throw error;
  }
}; 