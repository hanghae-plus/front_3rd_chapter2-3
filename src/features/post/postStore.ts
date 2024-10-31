import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Post } from '../entities/post/model/types';

type PostState = {
  selectedPost: Post | null;
  showEditDialog: boolean;
};

type PostAction = {
  setSelectedPost: (value: Post | null) => void;
  setShowEditDialog: (show: boolean) => void;
};

export const usePostStore = create<PostState & PostAction>()(
  devtools(
    (set) => ({
      selectedPost: null,
      setSelectedPost: (post) => set({ selectedPost: post }),

      showEditDialog: false,
      setShowEditDialog: (show) => set({ showEditDialog: show }),
    }),
    { name: 'post-store' },
  ),
);
