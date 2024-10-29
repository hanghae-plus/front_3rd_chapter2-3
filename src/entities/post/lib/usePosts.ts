import { postApi } from "@/entities/post/api/postApi";
import { NewPost, Post } from "@/entities/post/model/types";
import { userApi } from "@/entities/user/api/userApi";
import { findById } from "@/shared/lib/array";
import { useCallback, useMemo, useState } from "react";

type UseSearchPostsProps = {
  searchQuery: string;
  limit: number;
  skip: number;
};

const handler = async <T>(fn: () => T, onError: (error: unknown) => void) => {
  try {
    return await fn();
  } catch (error) {
    onError(error);
    throw error;
  }
};

const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadingHandler = async <T>(...props: Parameters<typeof handler>): Promise<T> => {
    setLoading(true);
    const data = await handler(...props);
    setLoading(false);
    return data as T;
  };

  const fetchPosts = useCallback(async (props?: { limit: number; skip: number }) => {
    const { posts, total } = await handler(
      () => postApi.getPosts(props || { limit: 10, skip: 0 }),
      (error) => console.error("게시물 가져오기 오류:", error),
    );
    const users = await userApi.getUsers({ select: ["username", "image"] });
    const postsWithUsers = posts.map((post) => ({
      ...post,
      author: findById(users, post.userId),
    }));
    setPosts(postsWithUsers);
    setTotal(total);
  }, []);

  const addPost = useCallback(async (newPost: NewPost) => {
    setLoading(true);
    const data = await handler(
      () => postApi.addPost(newPost),
      (error) => console.error("게시물 추가 오류:", error),
    );
    //FIXME: 실제로 추가하면 필드가 부족해서 오류가 남 / 테스트 자체는 통과함
    setPosts((prev) => [data, ...prev]);
    setLoading(false);
  }, []);

  const updatePost = useCallback(async (post: Post) => {
    setLoading(true);
    const updatedPost = await handler(
      () => postApi.updatePost(post),
      (error) => console.error("게시물 업데이트 오류:", error),
    );
    setPosts((prev) => prev.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
    setLoading(false);
  }, []);

  const deletePost = useCallback(async (id: number) => {
    setLoading(true);
    await handler(
      () => postApi.deletePost(id),
      (error) => console.error("게시물 삭제 오류:", error),
    );
    setPosts((prev) => prev.filter((post) => post.id !== id));
    setLoading(false);
  }, []);

  const searchPosts = useCallback(
    async ({ searchQuery, limit, skip }: UseSearchPostsProps) => {
      if (!searchQuery) {
        await fetchPosts({ limit, skip });
        return;
      }
      setLoading(true);
      const { posts, total } = await handler(
        () => postApi.searchPosts(searchQuery),
        (error) => console.error("게시물 검색 오류:", error),
      );
      setPosts(posts);
      setTotal(total);
      setLoading(false);
    },
    [fetchPosts],
  );

  const fetchPostsByTag = useCallback(async (tag: string) => {
    setLoading(true);
    const { posts, total } = await handler(
      () => postApi.fetchPostsByTag(tag),
      (error) => console.error("태그별 게시물 가져오기 오류:", error),
    );
    const users = await userApi.getUsers({ select: ["username", "image"] });
    const postsWithUsers = posts.map((post) => ({
      ...post,
      author: findById(users, post.userId),
    }));
    setPosts(postsWithUsers);
    setTotal(total);
    setLoading(false);
  }, []);

  const actions = useMemo(
    () => ({ fetchPosts, addPost, updatePost, deletePost, searchPosts, fetchPostsByTag }),
    [fetchPosts, addPost, updatePost, deletePost, searchPosts, fetchPostsByTag],
  );

  return { posts, total, loading, actions };
};

export default usePosts;
