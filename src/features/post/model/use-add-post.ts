import { useState } from "react";

import { updateState } from "@/shared/model";
import { PostType } from "@/entities/post/model/post-type";
import { postListState } from "@/entities/post/model/post-state";
import { useMutationAddPost } from "@/entities/post/api";
import { NewPostType } from "./type";

const initaialNewPost = { title: "", body: "", userId: 1 };

const useAddPost = () => {
  const [newPost, setNewPost] = useState<NewPostType>(initaialNewPost);
  const { addNewPost } = postListState();
  const mutation = useMutationAddPost(newPost);

  // 게시물 추가
  const addPost = async () => {
    try {
      const newPostData = await mutation.mutateAsync();
      addNewPost(newPostData || initaialNewPost);
      setNewPost(initaialNewPost);
    } catch (error) {
      console.error(error);
    }
  };

  const updateNewPost = <K extends keyof NewPostType>(key: K, value: PostType[K]) => {
    setNewPost(prev => updateState(prev, key, value));
  };

  return { newPost, updateNewPost, addPost };
};

export default useAddPost;
