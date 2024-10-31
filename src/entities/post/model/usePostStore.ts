import { create } from 'zustand';

import { PostState } from './postTypes';

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  total: 0,
  selectedPost: null,
  newPost: {
    title: "",
    body: "",
    userId: 1,
  },

  setPosts: (posts) => set({ posts }),
  setTotal: (total) => set({ total }),
  setSelectedPost: (post) => set({ selectedPost: post }),

  setNewPost: (post) =>
    set((state) => ({
      newPost: {
        ...state.newPost,
        ...post,
      },
    })),

  resetNewPost: () =>
    set({
      newPost: {
        title: "",
        body: "",
        userId: 1,
      },
    }),
}))
