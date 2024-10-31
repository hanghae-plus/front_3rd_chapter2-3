import apiClient from "../../../shared/api/base"
import { Post, NewPost, ReqUpdatePost } from "../model/types";


export const fetchPostsApi = async (limit: number, skip: number) => {
    return apiClient.get<{ posts: Post[], total: number }>('/posts', { limit, skip });
};
  
export const searchPostsApi = async (searchQuery: string) => {
    return apiClient.get<{ posts: Post[], total: number }>('/posts/search', { q: searchQuery });
};
  
export const fetchPostsByTagApi = async (tag: string) => {
    return apiClient.get<{ posts: Post[], total: number }>(`/posts/tag/${tag}`);
};

export const addPostApi = async (newPost: NewPost) => {
    return apiClient.post<Post>('/posts/add', newPost);
};  

export const updatePostApi = async (postId: number, updatedPost: ReqUpdatePost) => {
    return apiClient.put(`/posts/${postId}`, updatedPost);
};

export const deletePostApi = async (postId: number) => {
    return apiClient.delete(`/posts/${postId}`);
};