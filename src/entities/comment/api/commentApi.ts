import apiClient from "../../../shared/api"
import { ReqNewComment, ReqUpdateComment } from "../model/types";

export const fetchCommentsApi = async (postId: number) => {
    return apiClient.get(`/comments/post/${postId}`);
};

export const addCommentApi = async (newComment: ReqNewComment) => {
    return apiClient.post('/comments/add', newComment);
};

export const updateCommentApi = async (commentId: number, updatedComment: ReqUpdateComment) => {
    return apiClient.put(`/comments/${commentId}`, updatedComment);
};

export const deleteCommentApi = async (commentId: number) => {
    return apiClient.delete(`/comments/${commentId}`);
};

export const likeCommentApi = async (commentId: number, updatedLikes: number) => {
    return apiClient.patch(`/comments/${commentId}`, { likes: updatedLikes });
};