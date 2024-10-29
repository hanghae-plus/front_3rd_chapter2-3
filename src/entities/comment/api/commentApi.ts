import apiClient from "../../../shared/api"

export const fetchCommentsApi = async (postId: string) => {
    return apiClient.get(`/comments/post/${postId}`);
};

export const addCommentApi = async (newComment: any) => {
    return apiClient.post('/comments/add', newComment);
};

export const updateCommentApi = async (commentId: string, updatedComment: any) => {
    return apiClient.put(`/comments/${commentId}`, updatedComment);
};

export const deleteCommentApi = async (commentId: string) => {
    return apiClient.delete(`/comments/${commentId}`);
};

export const likeCommentApi = async (commentId: string, updatedLikes: number) => {
    return apiClient.patch(`/comments/${commentId}`, { likes: updatedLikes });
};