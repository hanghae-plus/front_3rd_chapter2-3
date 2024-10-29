import { create } from "zustand";
import { PostType } from "./post-type";

interface PostListState {
  postList: PostType[];
  addPostState: (post: PostType) => void;
}

export const postListState = create<PostListState>(set => ({
  postList: [],
  addPostState: post =>
    set(prev => ({
      postList: [...prev.postList, post],
    })),
}));
