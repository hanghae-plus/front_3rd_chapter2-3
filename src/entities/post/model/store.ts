import { StateCreator, create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { createSelectors } from '~/shared/lib/zustandUtil';

import { Post } from './types';

type PostsState = { posts: Post[]; selectedPost: Post | null; totalPost: number };

type PostsAction = {
  fetchPostsAction: ({ posts, total }: { posts: Post[]; total: number }) => void;
  addNewPostAction: (post: Post) => void;
  updatePostAction: (updatedPost: Post) => void;
  deletePostAction: (id: number) => void;
  selectPost: (selectedPost: Post) => void;
};

// interface IPostSlice {
//   posts: Post[];
//   addNewPostAction: (post: Post) => void;
//   updatePostAction: (id: number) => void;
//   deletePostAction: () => void;
// }

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  totalPost: 0,
};

// Post Type
const postSlice: StateCreator<PostsState & PostsAction, [], [['zustand/immer', never]], PostsState & PostsAction> =
  immer((set) => ({
    ...initialState,
    fetchPostsAction: ({ posts, total }: { posts: Post[]; total: number }) =>
      set((state) => {
        state.posts = posts;
        state.totalPost = total;
      }),
    addNewPostAction: (newPost) =>
      set((state) => {
        state.posts.unshift(newPost);
      }),
    updatePostAction: (updatedPost) =>
      set((state) => state.posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))),
    deletePostAction: (id) => set((state) => state.posts.filter((post) => post.id !== id)),
    selectPost: (selectedPost: Post) =>
      set(() => ({
        selectedPost: selectedPost,
      })),
  }));

const usePostStoreBase = create<PostsState & PostsAction>()(postSlice);

export const usePostStore = createSelectors(usePostStoreBase);
