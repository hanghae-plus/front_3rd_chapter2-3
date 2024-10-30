import apiClient from "../../../shared/api/base"
import { NewComment, ReqUpdateComment, ResAddComment, ResFetchComments } from "../model/types";

export const fetchCommentsApi = async (postId: number) => {
    return apiClient.get<ResFetchComments>(`/comments/post/${postId}`);
};

export const addCommentApi = async (newComment: NewComment) => {
    return apiClient.post<ResAddComment>('/comments/add', newComment);
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