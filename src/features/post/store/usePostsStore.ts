import { create } from "zustand";

type PostsState = {
  total: number;
  selectedTag: string;
  selectedPost: Post | null;
  showEditDialog: boolean;
  showPostDetailDialog: boolean;
};

type PostsAction = {
  setTotal: (total: number) => void;
  setSelectedTag: (tag: string) => void;
  setSelectedPost: (post: Post | null) => void;
  setShowEditDialog: (show: boolean) => void;
  setShowPostDetailDialog: (show: boolean) => void;
};

export const usePostsStore = create<PostsState & PostsAction>((set) => ({
  total: 0,
  selectedTag: "",
  selectedPost: null,
  showEditDialog: false,
  showPostDetailDialog: false,

  setTotal: (total) => set({ total }),
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  setSelectedPost: (post) => set({ selectedPost: post }),
  setShowEditDialog: (show) => set({ showEditDialog: show }),
  setShowPostDetailDialog: (show) => set({ showPostDetailDialog: show }),
}));
