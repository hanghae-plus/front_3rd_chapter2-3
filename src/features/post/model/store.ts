import { create } from 'zustand';
import { Post } from '../../../entities/post/model/types';
import { Comment } from '../../../entities/comment/model/types';

interface PostStore {
  selectedPost: Post | null;
  selectedComment: Comment | null;
  setSelectedPost: (post: Post | null) => void;
  setSelectedComment: (comment: Comment | null) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  selectedPost: null,
  selectedComment: null,
  setSelectedPost: (post) => set({ selectedPost: post }),
  setSelectedComment: (comment) => set({ selectedComment: comment }),
}));