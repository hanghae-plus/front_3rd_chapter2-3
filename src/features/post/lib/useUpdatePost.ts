import { Post } from "@/entities/post/model/types";
import { useState } from "react";

const useUpdatePost = () => {
  const [loading, setLoading] = useState(false);
  const mutateAsync = async (post: Post) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/posts/${post?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      const data = await response.json();
      return data as Post;
    } catch (error) {
      console.error("게시물 업데이트 오류:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { mutateAsync, loading };
};

export default useUpdatePost;
