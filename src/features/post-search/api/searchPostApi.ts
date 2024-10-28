import { Post, PostsResponse } from "@/entities/post/model/types";

const searchPosts = async (search: string): Promise<{ posts: Post[]; total: number }> => {
  const postsResponse = await fetch(`/api/posts/search?q=${search}`);
  const postsData: PostsResponse = await postsResponse.json();

  return {
    posts: postsData.posts,
    total: postsData.total,
  };
};

export const searchPostApi = {
  getSearchPosts: searchPosts,
};
