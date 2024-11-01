import { create } from "zustand";

type PostsState = {
  total: number;
  selectedPost: Post | null;
  showAddPostDialog: boolean;
  showEditDialog: boolean;
  showPostDetailDialog: boolean;
};

type PostsAction = {
  setTotal: (total: number) => void;
  setSelectedPost: (post: Post | null) => void;
  setShowAddPostDialog: (show: boolean) => void;
  setShowEditPostDialog: (show: boolean) => void;
  setShowPostDetailDialog: (show: boolean) => void;
};

export const usePostsStore = create<PostsState & PostsAction>((set) => ({
  total: 0,
  selectedPost: null,
  showAddPostDialog: false,
  showEditDialog: false,
  showPostDetailDialog: false,

  setTotal: (total) => set({ total }),
  setShowAddPostDialog: (show) => set({ showAddPostDialog: show }),
  setSelectedPost: (post) => set({ selectedPost: post }),
  setShowEditPostDialog: (show) => set({ showEditDialog: show }),
  setShowPostDetailDialog: (show) => set({ showPostDetailDialog: show }),
}));
