import { create } from 'zustand';

import { CommentState } from './commentTypes';

export const useCommentStore = create<CommentState>((set) => ({
  comments: [],
  selectedComment: null,
  newComment: {
    body: "",
    postId: null,
    userId: 1,
  },
  setComments: (comments) => set({ comments }),
  setSelectedComment: (comment) => set({ selectedComment: comment }),
  setNewComment: (comment) =>
    set((state) => ({
      newComment: { ...state.newComment, ...comment },
    })),
  resetNewComment: () =>
    set({
      newComment: { body: "", postId: null, userId: 1 },
    }),
}))
