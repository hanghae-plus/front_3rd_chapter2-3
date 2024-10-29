import { useState } from "react";
import { PostType } from "@/entities/post/model/post-type";
import { postListState } from "@/entities/post/model/post-state";
import { fetchAddPost } from "@/entities/post/api/fetch-add-post";
import { updateState } from "@/shared/model";

const AddNewPost = () => {
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 });
  const { addPostState } = postListState();

  // 게시물 추가
  const addPost = async () => {
    try {
      const fetchPostData: PostType = await fetchAddPost(newPost);
      addPostState(fetchPostData);
      setNewPost({ title: "", body: "", userId: 1 });
    } catch (error) {
      console.error("게시물 추가 오류:", error);
    }
  };

  const updateNewPost = <K extends keyof PostType>(key: K, value: PostType[K]) => {
    setNewPost(prev => updateState(prev, key, value));
  };

  return { newPost, updateNewPost, addPost };
};

export default AddNewPost;
