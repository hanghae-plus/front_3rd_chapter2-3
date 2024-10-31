import { create } from "zustand";

type PostsState = {
  selectedTag: string;
  selectedPost: Post | null;
  showEditDialog: boolean;
  showPostDetailDialog: boolean;
};

type PostsAction = {
  setSelectedTag: (tag: string) => void;
  setSelectedPost: (post: Post | null) => void;
  setShowEditDialog: (show: boolean) => void;
  setShowPostDetailDialog: (show: boolean) => void;
};

export const usePostsStore = create<PostsState & PostsAction>((set) => ({
  selectedTag: "",
  selectedPost: null,
  showEditDialog: false,
  showPostDetailDialog: false,
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  setSelectedPost: (post) => set({ selectedPost: post }),
  setShowEditDialog: (show) => set({ showEditDialog: show }),
  setShowPostDetailDialog: (show) => set({ showPostDetailDialog: show }),
}));
