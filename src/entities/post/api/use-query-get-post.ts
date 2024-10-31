import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import apiRequest from "@/shared/api";
import { userListState } from "@/entities/user/model/user-state";
import { UserType } from "@/entities/user/model/user-type";
import { PostType, PostWithAuthorType } from "../model/post-type";

const getBaseURL = (queryParams: { [key: string]: string }) => {
  if (queryParams.keyword !== undefined && queryParams.keyword !== "") {
    return "/api/posts/search";
  }
  if (queryParams.tag !== undefined && queryParams.tag !== "all") {
    return `/api/posts/tag/${queryParams.tag}`;
  }
  return "/api/posts";
};

const fetchPostList = async (userList: UserType[], searchParams: URLSearchParams) => {
  const searchQuery = Object.fromEntries([...searchParams.entries()]);
  const baseURL = getBaseURL(searchQuery);
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
  const [searchParams] = useSearchParams();
  return useQuery<PostWithAuthorType[]>({
    queryKey: ["search-post"],
    queryFn: () => fetchPostList(userList, searchParams),
    enabled: false,
  });
};
