import { NewPost, Post, PostResponse, Tag } from "../model/types.ts";
import { UserResponse } from "../../user/model/types.ts";

export const getPosts = async (
  limit: number,
  skip: number,
): Promise<
  | {
      postsData: PostResponse;
      usersData: UserResponse;
    }
  | undefined
> => {
  try {
    const postsResponse = fetch(`/api/posts?limit=${limit}&skip=${skip}`);
    const usersResponse = fetch("/api/users?limit=0&select=username,image");

    const [postsData, usersData] = await Promise.all([
      postsResponse.then((res) => res.json()),
      usersResponse.then((res) => res.json()),
    ]);

    return {
      postsData: postsData,
      usersData: usersData,
    };
  } catch (error) {
    console.error("게시물 가져오기 오류:", error);
  }
};

export const getPostsByTag = async (
  tag: string,
): Promise<
  | {
      postsData: PostResponse;
      usersData: UserResponse;
    }
  | undefined
> => {
  try {
    const [postsResponse, usersResponse] = await Promise.all([
      fetch(`/api/posts/tag/${tag}`),
      fetch("/api/users?limit=0&select=username,image"),
    ]);
    const postsData = (await postsResponse.json()) as PostResponse;
    const usersData = (await usersResponse.json()) as UserResponse;

    return {
      postsData: postsData,
      usersData: usersData,
    };
  } catch (error) {
    console.error("태그별 게시물 가져오기 오류:", error);
  }
};

export const getSearchPosts = async (searchQuery: string): Promise<PostResponse | undefined> => {
  try {
    const response = await fetch(`/api/posts/search?q=${searchQuery}`);

    return await response.json();
  } catch (error) {
    console.error("게시물 검색 오류:", error);
  }
};

export const postNewPost = async (newPost: NewPost): Promise<Post | undefined> => {
  try {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });

    return await response.json();
  } catch (error) {
    console.error("게시물 추가 오류:", error);
  }
};

export const putExistingPost = async (selectedPost: Post): Promise<Post | undefined> => {
  try {
    const response = await fetch(`/api/posts/${selectedPost.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedPost),
    });

    return await response.json();
  } catch (error) {
    console.error("게시물 업데이트 오류:", error);
  }
};

export const deleteExistingPost = async (id: number) => {
  try {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("게시물 삭제 오류:", error);
  }
};

export const getTags = async (): Promise<Tag[] | undefined> => {
  try {
    const response = await fetch("/api/posts/tags");

    return await response.json();
  } catch (error) {
    console.error("태그 가져오기 오류:", error);
  }
};
