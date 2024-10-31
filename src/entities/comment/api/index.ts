export const commentApis = {
  fetchCommentList: async (postId: number) => {
    const response = await fetch(`/api/comments/post/${postId}`);
    return await response.json();
  },

  addComment: async (comment: Comment) => {
    const response = await fetch("/api/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    });
    return await response.json();
  },

  updateComment: async (comment: CommentDetail) => {
    const response = await fetch(`/api/comments/${comment.id}`, {
      method: "PUT",
      body: JSON.stringify(comment),
    });
    return await response.json();
  },

  deleteComment: async (id: number) => {
    const response = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  },
};
