import { CommentType } from "../model/comment";

interface UpdateCommentParamsType {
  selectedComment: CommentType;
}

// 댓글 업데이트
export const updateComment = async ({ selectedComment }: UpdateCommentParamsType) => {
  try {
    const response = await fetch(`/api/comments/${selectedComment.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: selectedComment.body }),
    });
    const data: any = await response.json();
    // setComments((prev: any) => ({
    //   ...prev,
    //   [data.postId]: prev[data.postId].map((comment: any) =>
    //     comment.id === data.id ? data : comment,
    //   ),
    // }));
    // setShowEditCommentDialog(false);
    return data;
  } catch (error) {
    console.error("댓글 업데이트 오류:", error);
    throw error;
  }
}; 