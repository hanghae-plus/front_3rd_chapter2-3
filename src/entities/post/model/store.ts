import {create} from 'zustand';
import { api } from '../../../shared/api/base';
import { Post, BasePaginationParams, SortOrder } from './types';
import { createQueryString } from '../../../shared/lib/query';
import { User } from '../../user/model/type';

type PostState = {
  posts: Post[];
  total: number;
  loading: boolean;
  selectedPost: Post | null;
  
  // 필터 상태
  filters: BasePaginationParams & {
    searchQuery: string;
    sortBy: string;
    sortOrder: SortOrder;
    selectedTag: string;
  };
  
  // 액션
  fetchPosts: () => Promise<void>;
  searchPosts: (query: string) => Promise<void>;
  addPost: (post: Omit<Post, 'id'>) => Promise<void>;
  updatePost: (post: Post) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
  setSelectedPost: (post: Post | null) => void;
  updateFilters: (filters: Partial<PostState['filters']>) => void;
};

export const usePostStore = create<PostState>(
 (set, get) => ({
    posts: [],
    total: 0,
    loading: false,
    selectedPost: null,
    
    filters: {
      skip: 0,
      limit: 10,
      searchQuery: '',
      sortBy: '',
      sortOrder: 'asc',
      selectedTag: '',
    },

    fetchPosts: async () => {
      set({ loading: true });
      try {
        const { filters } = get() as PostState;
        const response = await api.get(`/posts?${createQueryString(filters)}`);
        const usersResponse = await api.get('/users?limit=0&select=username,image');
        
        const postsWithUsers = response.data.posts.map((post: Post) => ({
          ...post,
          author: usersResponse.data.users.find((user: User) => user.id === post.userId),
        }));
        
        set({ posts: postsWithUsers, total: response.data.total });
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        set({ loading: false });
      }
    },

    searchPosts: async (query: string) => {
      if (!query) {
        (get() as PostState).fetchPosts();
        return;
      }
      
      set({ loading: true });
      try {
        const response = await api.get(`/posts/search?q=${query}`);
        set({ 
          posts: response.data.posts,
          total: response.data.total,
        });
      } catch (error) {
        console.error('Failed to search posts:', error);
      } finally {
        set({ loading: false });
      }
    },

    addPost: async (post: Omit<Post, 'id'>) => {
      try {
        const response = await api.post('/posts/add', post);
        set((state: PostState) => ({
          posts: [response.data, ...state.posts],
        }));
      } catch (error) {
        console.error('Failed to add post:', error);
      }
    },

    updatePost: async (post: Post) => {
      try {
        const response = await api.put(`/posts/${post.id}`, post);
        set((state: PostState) => ({
          posts: state.posts.map((p:Post) => 
            p.id === response.data.id ? response.data : p
          ),
        }));
      } catch (error) {
        console.error('Failed to update post:', error);
      }
    },

    deletePost: async (id: number) => {
      try {
        await api.delete(`/posts/${id}`);
        set((state: { posts: Post[]; }) => ({
          posts: state.posts.filter((p: Post) => p.id !== id),
        }));
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    },

    setSelectedPost: (post:  Post | null) => {
      set({ selectedPost: post });
    },

    updateFilters: (newFilters: Partial<PostState['filters']>) => {
      set((state: PostState ) => ({
        filters: { ...state.filters, ...newFilters },
      }));
    },
  })
);