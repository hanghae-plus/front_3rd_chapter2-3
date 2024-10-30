import { useState } from "react";

import { PostType } from "@/entities/post/model/post-type";
import { postListState } from "@/entities/post/model/post-state";
import { updateState } from "@/shared/model";
import { useQueryAddPost } from "@/entities/post/api";

import { NewPostType } from "./type";

const initaialNewPost = { title: "", body: "", userId: 1 };

const useAddPost = () => {
  const [newPost, setNewPost] = useState<NewPostType>(initaialNewPost);
  const { addNewPost } = postListState();

  // 게시물 추가
  const addPost = async () => {
    try {
      const { data } = await useQueryAddPost(newPost);
      addNewPost(data || initaialNewPost);
      setNewPost(initaialNewPost);
    } catch (error) {
      console.error("게시물 추가 오류:", error);
    }
  };

  const updateNewPost = <K extends keyof NewPostType>(key: K, value: PostType[K]) => {
    setNewPost(prev => updateState(prev, key, value));
  };

  return { newPost, updateNewPost, addPost };
};

export default useAddPost;
