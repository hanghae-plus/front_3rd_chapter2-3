import { Comment, CommentResponse, NewComment } from "@/entities/comment/model/types";
import { createRequestOptions, fetchApi } from "@/shared/lib/api";
import { COMMENT_API_PATHS } from "../config/comment-api-paths";

//query
const getComments = async (postId: number) => {
  const response = await fetchApi<CommentResponse>(COMMENT_API_PATHS.byPostId(postId));
  return response.comments;
};

// ======================================================

//mutate
const addComment = async (newComment: NewComment) => {
  const response = await fetchApi<Comment>(COMMENT_API_PATHS.add, createRequestOptions("POST", newComment));
  return response;
};

//mutate
const updateComment = async (comment: Comment) => {
  const response = await fetchApi<Comment>(
    COMMENT_API_PATHS.byId(comment.id),
    createRequestOptions("PUT", { body: comment.body }),
  );
  return response;
};

//mutate
const deleteComment = async (id: number) => {
  const response = await fetchApi<boolean>(COMMENT_API_PATHS.byId(id), createRequestOptions("DELETE"));
  return response;
};

//mutate
const likeComment = async (comment: Comment) => {
  const response = await fetchApi<Comment>(
    COMMENT_API_PATHS.byId(comment.id),
    createRequestOptions("PATCH", { likes: comment.likes + 1 }),
  );
  return response;
};

// ======================================================

// total

export const commentApi = Object.freeze({
  getComments,
  addComment,
  updateComment,
  deleteComment,
  likeComment,
});
