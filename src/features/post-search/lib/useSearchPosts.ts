import { postApi } from "@/entities/post/api/postApi";
import { usePostContext } from "@/shared/model/PostContext";
import { searchPostApi } from "../api/searchPostApi";

type UseSearchPostsProps = {
  searchQuery: string;
  limit: number;
  skip: number;
};

export const useSearchPosts = () => {
  const { setPosts, setTotal, setLoading, loading } = usePostContext();

  const searchPosts = async ({ searchQuery, limit, skip }: UseSearchPostsProps) => {
    if (!searchQuery) {
      const { posts, total } = await postApi.getPosts({ limit, skip });
      setPosts(posts);
      setTotal(total);
      return;
    }
    setLoading(true);
    try {
      const { posts, total } = await searchPostApi.getSearchPosts(searchQuery);
      setPosts(posts);
      setTotal(total);
    } catch (error) {
      console.error("게시물 검색 오류:", error);
    }
    setLoading(false);
  };

  return { searchPosts, loading };
};
