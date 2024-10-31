import { create } from "zustand";

import { NewPostType } from "@/features/post/model/type";
import { PostWithAuthorType } from "./post-type";

interface PostListState {
  postList: PostWithAuthorType[];
  total: number;
  addNewPost: (post: NewPostType) => void;
  setNewPostList: (newPostList: PostWithAuthorType[]) => void;
  deletePost: (postId: number) => void;
  updatePost: (newPost: PostWithAuthorType) => void;
  setTotal: (num: number) => void;
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

const expectPost = (prev: PostWithAuthorType[], postId: number) => {
  return prev.filter(post => post.id !== postId);
};

const updatePostList = (prev: PostWithAuthorType[], newPost: PostWithAuthorType) => {
  return prev.map(post => {
    return post.id === newPost.id ? newPost : post;
  });
};

export const postListState = create<PostListState>(set => ({
  postList: [],
  total: 0,
  addNewPost: newPost => {
    set(prev => ({
      postList: [postDetail(newPost), ...updateIndexList(prev.postList)],
    }));
  },
  setNewPostList: newPostList => {
    set(() => ({ postList: newPostList }));
  },
  deletePost: postId => {
    set(prev => ({ postList: expectPost(prev.postList, postId) }));
  },
  updatePost: newPost => {
    set(prev => ({ postList: updatePostList(prev.postList, newPost) }));
  },
  setTotal: num => set(() => ({ total: num })),
}));
