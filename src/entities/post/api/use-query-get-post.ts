import { userListState } from "./../../user/model/user-state";
import { useQuery } from "@tanstack/react-query";

import apiRequest from "@/shared/api";
import { UserType } from "@/entities/user/model/user-type";
import { PostType, PostWithAuthorType } from "../model/post-type";
import { Params, useParams } from "react-router-dom";

const fetchPostList = async (params: Readonly<Params<string>>, userList: UserType[]) => {
  try {
    const apiURL =
      params.searchQuery === undefined
        ? `/api/posts?limit=${params.limit ?? 10}&skip=${params.skip ?? 0}`
        : `/api/posts/search?q=${params.searchQuery}`;

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
  const params = useParams();

  const { userList } = userListState();
  return useQuery<PostWithAuthorType[]>({
    queryKey: ["search-post"],
    queryFn: () => fetchPostList(params, userList),
  });
};
