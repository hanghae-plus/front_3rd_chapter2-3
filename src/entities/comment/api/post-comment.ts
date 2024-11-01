import { CommentType } from "../model/comment";

interface PostCommentParamsType {
  newComment: CommentType;
}

// 댓글 추가
export const postComment = async ({ newComment }: PostCommentParamsType) => {
  try {
    const response = await fetch("/api/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    });
    const data: any = await response.json();
    // setComments((prev: any) => ({
    //   ...prev,
    //   [data.postId]: [...(prev[data.postId] || []), data],
    // }));
    // setShowAddCommentDialog(false);
    // setNewComment({ body: "", postId: null, userId: 1 });
    return data;
  } catch (error) {
    console.error("댓글 추가 오류:", error);
    throw error;
  }
}; 