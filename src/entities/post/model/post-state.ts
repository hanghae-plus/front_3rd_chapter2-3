import { create } from "zustand";

import { PostWithAuthorType } from "./post-type";
import { NewPostType } from "@/features/post/model/type";

interface PostListState {
  postList: PostWithAuthorType[];
  addNewPost: (post: NewPostType) => void;
  setNewPostList: (newPostList: PostWithAuthorType[]) => void;
}

const postDetail = (newPost: NewPostType): PostWithAuthorType => {
  return {
    ...newPost,
    id: 1,
    tags: [],
    reactions: {
      likes: 0,
      dislikes: 0,
    },
    views: 0,
    author: {
      id: 0,
      username: "",
      image: "",
    },
  };
};

const updateIndexList = (postList: PostWithAuthorType[]) => {
  return postList.map(post => ({
    ...post,
    id: post.id + 1,
  }));
};

export const postListState = create<PostListState>(set => ({
  postList: [],
  addNewPost: newPost => {
    set(prev => ({
      postList: [postDetail(newPost), ...updateIndexList(prev.postList)],
    }));
  },
  setNewPostList: newPostList => {
    set(() => ({ postList: newPostList }));
  },
}));
