import { usePostContext } from "@/entities/post/model/PostContext";
import { userApi } from "@/entities/user/api/userApi";
import { findById } from "@/shared/lib/array";
import { postApi } from "../api/postApi";

type UseFetchPostsProps = {
  limit?: number;
  skip?: number;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
  tag?: string;
};

export const useFetchPosts = () => {
  const { setPosts, setTotal, setLoading } = usePostContext();

  const fetchPosts = async (props?: UseFetchPostsProps) => {
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

  return { fetchPosts };
};
