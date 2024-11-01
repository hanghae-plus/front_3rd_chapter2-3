import { UserType } from "../../user";
import { PostType } from "../model/post";
import { getPostList } from "./get-post-list";

interface GetSearchPostListParamsType {
  searchQuery?: string;
  limit: number;
  skip: number;
}

export const getSearchedPostList = async ({
  searchQuery,
  limit,
  skip,
}: GetSearchPostListParamsType) => {
  if (!searchQuery) {
    return getPostList({ limit, skip });
  }

  try {
    const [postsResponse, usersResponse] = await Promise.all([
      fetch(`/api/posts/search?q=${searchQuery}`),
      fetch("/api/users?limit=0&select=username,image"),
    ]);

    const postsData = await postsResponse.json();
    const usersData = await usersResponse.json();

    const postsWithUsers = postsData.posts.map((post: PostType) => ({
      ...post,
      author: usersData.users.find((user: UserType) => user.id === post.userId),
    }));

    return { postList: postsWithUsers, total: postsData.total };
  } catch (error) {
    console.error("게시물 검색 오류:", error);
  }
};
