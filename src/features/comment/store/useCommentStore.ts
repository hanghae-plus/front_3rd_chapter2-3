import { create } from "zustand";

type PostsState = {
  selectedComment: CommentDetail | null;
  showAddCommentDialog: boolean;
  showEditCommentDialog: boolean;
};

type PostsAction = {
  setSelectedComment: (comment: CommentDetail | null) => void;
  setShowAddCommentDialog: (show: boolean) => void;
  setShowEditCommentDialog: (show: boolean) => void;
};

export const useCommentStore = create<PostsState & PostsAction>((set) => ({
  selectedComment: null,
  showAddCommentDialog: false,
  showEditCommentDialog: false,

  setSelectedComment: (comment) => set({ selectedComment: comment }),
  setShowAddCommentDialog: (show) => set({ showAddCommentDialog: show }),
  setShowEditCommentDialog: (show) => set({ showEditCommentDialog: show }),
}));
