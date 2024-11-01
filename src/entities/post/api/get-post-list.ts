import { UserType } from "../../user";
import { PostType } from "../model/post";

interface GetPostsParamsType {
  limit?: number;
  skip?: number;
  tag?: string;
}

export const getPostList = async ({ limit = 10, skip = 0, tag }: GetPostsParamsType = {}) => {
  try {
    let postsUrl = "/api/posts";

    if (tag && tag !== "all") {
      postsUrl = `/api/posts/tag/${tag}`;
    } else {
      const queryParams = new URLSearchParams();
      if (limit) queryParams.append("limit", limit.toString());
      if (skip) queryParams.append("skip", skip.toString());
      postsUrl = queryParams.toString() ? `${postsUrl}?${queryParams.toString()}` : postsUrl;
    }

    const [postsResponse, usersResponse] = await Promise.all([
      fetch(postsUrl),
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
    console.error("게시물 가져오기 오류:", error);
  }
};
