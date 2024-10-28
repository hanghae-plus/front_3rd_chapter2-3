import { Post, PostsResponse } from "@/entities/post/model/types";

type FetchPostsByTagProps = {
  tag: string;
};

const fetchPostsByTag = async (props: FetchPostsByTagProps): Promise<{ posts: Post[]; total: number }> => {
  const queries = Object.entries(props)
    .map(([key, value]) => (value ? `${key}=${value}` : ""))
    .join("&");

  const postsResponse = await fetch(`/api/posts/tag/${props.tag}?${queries}`);
  const postsData: PostsResponse = await postsResponse.json();

  return {
    posts: postsData.posts,
    total: postsData.total,
  };
};

export const filterTagApi = {
  getPostsByTag: fetchPostsByTag,
};
