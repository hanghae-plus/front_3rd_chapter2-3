import apiClient from "../../../shared/api"


export const fetchPostsApi = async (limit: number, skip: number) => {
    return apiClient.get<{ posts: any[], total: number }>('/posts', { limit, skip });
};
  
export const searchPostsApi = async (searchQuery: string) => {
    return apiClient.get<{ posts: any[], total: number }>('/posts/search', { q: searchQuery });
};
  
export const fetchPostsByTagApi = async (tag: string) => {
    return apiClient.get<{ posts: any[], total: number }>(`/posts/tag/${tag}`);
};

export const addPostApi = async (newPost: any) => {
    return apiClient.post('/posts/add', newPost);
};  

export const updatePostApi = async (postId: string, updatedPost: any) => {
    return apiClient.put(`/posts/${postId}`, updatedPost);
};

export const deletePostApi = async (postId: string) => {
    return apiClient.delete(`/posts/${postId}`);
};