import { CommentResponse, Comments, NewComment } from "../../../temp/types.ts";

export const getComments = async (postId: number): Promise<CommentResponse | undefined> => {
  try {
    const response = await fetch(`/api/comments/post/${postId}`);

    return await response.json();
  } catch (error) {
    console.error("댓글 가져오기 오류:", error);
  }
};

export const postNewComment = async (newComment: NewComment): Promise<Comments | undefined> => {
  try {
    const response = await fetch("/api/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    });

    return await response.json();
  } catch (error) {
    console.error("댓글 추가 오류:", error);
  }
};

export const putExistingComment = async (id: number, body: string): Promise<Comments | undefined> => {
  try {
    const response = await fetch(`/api/comments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: body }),
    });

    return await response.json();
  } catch (error) {
    console.error("댓글 업데이트 오류:", error);
  }
};

export const deleteExistingComment = async (id: number) => {
  try {
    await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("댓글 삭제 오류:", error);
  }
};

export const patchLikeComment = async (id: number, likes: number): Promise<Comments | undefined> => {
  try {
    const response = await fetch(`/api/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: likes + 1 }),
    });

    return await response.json();
  } catch (error) {
    console.error("댓글 좋아요 오류:", error);
  }
};
