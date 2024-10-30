import { useQuery } from "@tanstack/react-query";

import apiRequest from "@/shared/api";
import { userListState } from "./../../user/model/user-state";
import { PostType, PostWithAuthorType } from "../model/post-type";
import { UserType } from "@/entities/user/model/user-type";
import { SearchQueryType } from "@/features/searchPostList/model/search-query-type";

const getBaseURL = (queryParams: SearchQueryType) => {
  if (queryParams.keyword !== undefined && queryParams.keyword !== "") {
    return "/api/posts/search";
  }
  if (queryParams.tag !== undefined && queryParams.tag !== "all") {
    return `/api/posts/tag/${queryParams.tag}`;
  }
  return "/api/posts";
};

const locationToObject = (queryString: string) => {
  const queryArray = queryString
    .replace("?", "")
    .split("&")
    .map(query => query.split("="));

  return Object.fromEntries(queryArray);
};

const fetchPostList = async (userList: UserType[]) => {
  const queryParams = locationToObject(location.search);
  const baseURL = getBaseURL(queryParams);
  const queryString = location.search.replace("?keyword", "?q");

  try {
    const res = await apiRequest.get(`${baseURL}${queryString}`);
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
    author: (userList ?? []).find(user => user.id === post.userId) ?? {
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