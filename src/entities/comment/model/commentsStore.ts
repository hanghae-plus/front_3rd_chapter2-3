import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { createSelectors } from '~/shared/lib/zustandUtil';

import { Comment, CommentResponseDto } from './type';

type State = {
  comments: Record<string, Comment[]>;
  selectedComment: Comment | null;
};
type Action = {
  addComments: (postId: number, newComments: Comment[]) => void;
  addComment: (postId: number, newComment: Comment) => void;
  updateCommentAction: (updatedComment: Comment) => void;
  deleteCommentAction: (id: number, postId: number) => void;
};

const useCommentsStoreBase = create<State & Action>()(
  immer((set) => ({
    comments: {},
    selectedComment: null,
    addComment: (postId: number, newComment: Comment) =>
      set((state) => {
        if (!state.comments?.[postId]) {
          state.comments[postId] = [];
        }
        state.comments[postId].push(newComment);
      }),
    addComments: (postId: number, newComments: Comment[]) =>
      set((state) => {
        state.comments[postId] = newComments;
      }),
    updateCommentAction: (updatedComment: Comment) =>
      set((state) => {
        state.comments[updatedComment.postId] = state.comments[updatedComment.postId].map((cm) =>
          cm.id === updatedComment.id ? updatedComment : cm
        );
      }),
    deleteCommentAction: (id: number, postId: number) =>
      set((state) => {
        state.comments?.[postId].filter((comment) => comment.id !== id);
      }),
    selectComment: (selectedComment: CommentResponseDto) => set(() => ({ selectedComment: selectedComment })),
  }))
);

export const useCommentsStore = createSelectors(useCommentsStoreBase);
