import { Comment, CommentResponse, NewComment } from "../model"

export const fetchComments = async (postId: number): Promise<CommentResponse> => {
  try {
    const response = await fetch(`/api/comments/post/${postId}`);
    if (!response.ok) {
      throw new Error(`댓글 가져오기 실패: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("댓글 가져오기 오류:", error);
    throw error;
  }
}

export const addComment = async (newComment: NewComment): Promise<any> => {
  try {
    const response = await fetch("/api/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    });
    if (!response.ok) {
      throw new Error(`댓글 추가 실패: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("댓글 추가 오류:", error);
    throw error;
  }
}

export const updateComment = async (targetComment: Comment): Promise<any> => {
  try {
    const response = await fetch(`/api/comments/${targetComment.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: targetComment.body }),
    });
    if (!response.ok) {
      throw new Error(`댓글 업데이트 실패: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("댓글 업데이트 오류:", error);
    throw error;
  }
}

export const deleteComment = async (commentId: number): Promise<void> => {
  try {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`댓글 삭제 실패: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("댓글 삭제 오류:", error);
    throw error;
  }
}

export const likeComment = async (commentId: number, newLike: number): Promise<any> => {
  try {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ like: newLike }),
    });
    if (!response.ok) {
      throw new Error(`댓글 좋아요 실패: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("댓글 좋아요 오류:", error);
    throw error;
  }
}
