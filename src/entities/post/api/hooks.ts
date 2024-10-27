import { useEffect, useState } from "react";
import { Post } from "../model/types";
import { postApi } from "./postApi";

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

  const getPosts = async () => {
    setLoading(true);
    try {
      const { posts: postsData, total: totalCount } = await postApi.getAll(props || {});
      setPosts(postsData);
      setTotal(totalCount);
    } catch (error) {
      console.error("게시물 가져오기 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 게시물 가져오기
    getPosts();
  }, [props]);

  const refetch = () => {
    getPosts();
  };

  return { posts, loading, total, refetch };
};
