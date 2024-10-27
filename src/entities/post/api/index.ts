import { NewPost, Post, PostResponse, UserResponse } from "../../../temp/types.ts";

export const getPosts = async (limit: number, skip: number) => {
  try {
    const postsResponse = fetch(`/api/posts?limit=${limit}&skip=${skip}`);
    const usersResponse = fetch("/api/users?limit=0&select=username,image");

    const [postsData, usersData] = await Promise.all([
      postsResponse.then((res) => res.json() as Promise<PostResponse>),
      usersResponse.then((res) => res.json() as Promise<UserResponse>),
    ]);

    return {
      postsData: postsData,
      usersData: usersData,
    };
  } catch (error) {
    console.error("게시물 가져오기 오류:", error);
  }
};

export const getPostsByTag = async (tag: string) => {
  try {
    const [postsResponse, usersResponse] = await Promise.all([
      fetch(`/api/posts/tag/${tag}`),
      fetch("/api/users?limit=0&select=username,image"),
    ]);
    const postsData = await postsResponse.json();
    const usersData = await usersResponse.json();

    return {
      postsData: postsData,
      usersData: usersData,
    };
  } catch (error) {
    console.error("태그별 게시물 가져오기 오류:", error);
  }
};

export const getSearchPosts = async (searchQuery: string) => {
  try {
    const response = await fetch(`/api/posts/search?q=${searchQuery}`);

    return await response.json();
  } catch (error) {
    console.error("게시물 검색 오류:", error);
  }
};

export const postNewPost = async (newPost: NewPost) => {
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

export const putExistingPost = async (selectedPost: Post) => {
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
