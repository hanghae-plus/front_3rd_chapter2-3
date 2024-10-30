import { StateCreator, create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { createSelectors } from '~/shared/lib/zustandUtil';

import { Post } from './types';

type PostsState = { posts: Post[] };

type PostsAction = {
  addNewPostAction: (post: Post) => void;
  updatePostAction: (updatedPost: Post) => void;
  deletePostAction: (id: number) => void;
};

// interface IPostSlice {
//   posts: Post[];
//   addNewPostAction: (post: Post) => void;
//   updatePostAction: (id: number) => void;
//   deletePostAction: () => void;
// }

const initialState: Post[] = [];

// Post Type
const postSlice: StateCreator<PostsState & PostsAction, [], [['zustand/immer', never]], PostsState & PostsAction> =
  immer((set) => ({
    posts: initialState,
    addNewPostAction: (newPost) =>
      set((state) => {
        state.posts.unshift(newPost);
      }),
    updatePostAction: (updatedPost) =>
      set((state) => state.posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))),
    deletePostAction: (id) => set((state) => state.posts.filter((post) => post.id !== id)),
  }));

const usePostStoreBase = create<PostsState & PostsAction>()(postSlice);

export const usePostStore = createSelectors(usePostStoreBase);
