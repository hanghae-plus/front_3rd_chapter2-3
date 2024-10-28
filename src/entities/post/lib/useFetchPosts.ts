import { userApi } from "@/entities/user/api/userApi";
import { findById } from "@/shared/lib/array";
import { useEffect, useState } from "react";
import { postApi } from "../api/postApi";
import { Post } from "../model/types";

type UseFetchPostsProps = {
  limit?: number;
  skip?: number;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
  tag?: string;
};

export const useFetchPosts = (props?: UseFetchPostsProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const getPosts = async (props?: UseFetchPostsProps) => {
    setLoading(true);
    try {
      const { posts, total } = await postApi.getPosts(props || {});
      const users = await userApi.getUsers();
      const postsWithUsers = posts.map((post) => ({
        ...post,
        author: findById(users, post.userId),
      }));
      setPosts(postsWithUsers);
      setTotal(total);
    } catch (error) {
      console.error("게시물 가져오기 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 게시물 가져오기
    getPosts(props);
  }, [props, getPosts]);

  return { posts, loading, total, refetch: getPosts };
};
