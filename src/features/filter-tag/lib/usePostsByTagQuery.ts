import { Post } from "@/entities/post/model/types";
import { userApi } from "@/entities/user/api/userApi";
import { findById } from "@/shared/lib/array";
import { useEffect, useState } from "react";
import { filterTagApi } from "../api/filterTagApi";

export const usePostsByTagQuery = (tag: string) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const getPostsByTag = async (tag: string) => {
    setLoading(true);
    try {
      const { posts, total } = await filterTagApi.getPostsByTag({ tag });
      const users = await userApi.getUsers();
      const postsWithUsers = posts.map((post) => ({
        ...post,
        author: findById(users, post.userId),
      }));
      setPosts(postsWithUsers);
      setTotal(total);
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostsByTag(tag);
  }, [tag, getPostsByTag]);

  return { posts, total, loading, refetch: getPostsByTag };
};
