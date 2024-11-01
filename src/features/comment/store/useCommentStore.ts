import { create } from "zustand";

type PostsState = {
  selectedComment: CommentDetail | null;
  showEditCommentDialog: boolean;
};

type PostsAction = {
  setSelectedComment: (comment: CommentDetail | null) => void;
  setShowEditCommentDialog: (show: boolean) => void;
};

export const useCommentStore = create<PostsState & PostsAction>((set) => ({
  selectedComment: null,
  showEditCommentDialog: false,

  setSelectedComment: (comment) => set({ selectedComment: comment }),
  setShowEditCommentDialog: (show) => set({ showEditCommentDialog: show }),
}));
