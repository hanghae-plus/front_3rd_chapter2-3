import { postApi } from "@/entities/post/api/postApi";
import { Post } from "@/entities/post/model/types";
import { useEffect, useState } from "react";
import { searchPostApi } from "../api/searchPostApi";

type UseSearchPostsProps = {
  searchQuery: string;
  limit: number;
  skip: number;
};

export const useSearchPosts = ({ searchQuery, limit, skip }: UseSearchPostsProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const searchPosts = async () => {
    if (!searchQuery) {
      const { posts, total } = await postApi.getPosts({ limit, skip });
      setPosts(posts);
      setTotal(total);
      return;
    }
    setIsLoading(true);
    try {
      const { posts, total } = await searchPostApi.getSearchPosts(searchQuery);
      setPosts(posts);
      setTotal(total);
    } catch (error) {
      console.error("게시물 검색 오류:", error);
    }
    setIsLoading(false);
  };

  const refetch = () => {
    searchPosts();
  };

  useEffect(() => {
    searchPosts();
  }, []);

  return { posts, total, isLoading, refetch };
};
