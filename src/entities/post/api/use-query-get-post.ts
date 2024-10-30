import { userListState } from "./../../user/model/user-state";
import { useQuery } from "@tanstack/react-query";

import apiRequest from "@/shared/api";
import { UserType } from "@/entities/user/model/user-type";
import { PostType, PostWithAuthorType } from "../model/post-type";

const locationToObject = (queryString: string) => {
  const queryArray = queryString
    .replace("?", "")
    .split("&")
    .map(query => query.split("="));

  return Object.fromEntries(queryArray);
};

const fetchPostList = async (userList: UserType[]) => {
  const params = locationToObject(location.search);

  try {
    const apiURL =
      params.keyword === undefined
        ? `/api/posts?limit=${params.limit ?? 10}&skip=${params.skip ?? 0}`
        : `/api/posts/search?q=${params.keyword}`;

    const res = await apiRequest.get(apiURL);
    const postListWithAuthor = postListWithUser(res.data.posts, userList);

    return postListWithAuthor;
  } catch (error) {
    console.error("게시물 검색 오류: ", error);
    throw error;
  }
};

const postListWithUser = (postList: PostType[], userList: UserType[]) => {
  return postList.map(post => ({
    ...post,
    author: userList.find(user => user.id === post.userId) ?? {
      id: 0,
      image: "",
      username: "",
    },
  }));
};

export const useQueryGetPost = () => {
  const { userList } = userListState();
  return useQuery<PostWithAuthorType[]>({
    queryKey: ["search-post"],
    queryFn: () => fetchPostList(userList),
  });
};
