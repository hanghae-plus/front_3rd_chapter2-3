import { useState } from "react";
import { PostType } from "@/entities/post/model/post-type";
import { postListState } from "@/entities/post/model/post-state";

const AddNewPost = () => {
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 });
  const { addPostState } = postListState();

  // 게시물 추가
  const addPost = async () => {
    try {
      const response = await fetch("/api/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      const data: PostType = await response.json();
      addPostState(data);
      setNewPost({ title: "", body: "", userId: 1 });
    } catch (error) {
      console.error("게시물 추가 오류:", error);
    }
  };

  return { newPost, setNewPost, addPost };
};

export default AddNewPost;
