interface PatchLikeCommentParamsType {
  commentId: number;
  postId: number;
}

// 댓글 좋아요
export const patchLikeComment = async ({ commentId, postId }: PatchLikeCommentParamsType) => {
  try {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // likes: comments[postId].find((c: any) => c.id === commentId).likes + 1,
      }),
    });
    const data: any = await response.json();
    // setComments((prev: any) => ({
    //   ...prev,
    //   [postId]: prev[postId].map((comment: any) => (comment.id === data.id ? data : comment)),
    // }));
    return data;
  } catch (error) {
    console.error("댓글 좋아요 오류:", error);
    throw error;
  }
}; 