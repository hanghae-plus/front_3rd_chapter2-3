import { Post } from "../model/types";

// 게시물 가져오기
export const getPosts = async (limit: number, skip: number) => {
  try {
    const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`);
    return response.json();
  } catch (error) {
    console.error("게시물 가져오기 오류:", error);
    throw error;
  }
};

// 게시물 검색
export const searchPosts = async (searchQuery: string) => {
  try {
    const response = await fetch(`/api/posts/search?q=${searchQuery}`);
    return response.json();
  } catch (error) {
    console.error("게시물 검색 오류:", error);
    throw error;
  }
};

// 태그별 게시물 가져오기
export const getPostsByTag = async (tag: string) => {
  try {
    const response = await fetch(`/api/posts/tag/${tag}`);
    return response.json();
  } catch (error) {
    console.error("태그별 게시물 가져오기 오류:", error);
    throw error;
  }
};

// 게시물 태그 가져오기
export const getPostsTag = async () => {
  try {
    const response = await fetch("/api/posts/tags");
    return response.json();
  } catch (error) {
    console.error("태그 가져오기 오류:", error);
  }
};

// 게시물 추가
export const addPost = async (post: Post) => {
  try {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    return response.json();
  } catch (error) {
    console.error("게시물 추가 오류:", error);
  }
};

// 게시물 업데이트
export const updatePost = async (postId: number) => {
  try {
    const response = await fetch(`/api/posts/${postId}`);
    return response.json();
  } catch (error) {
    console.error("게시물 업데이트 오류:", error);
    throw error;
  }
};

// 게시물 삭제
export const deletePost = async (id: number) => {
  try {
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
    return response.json();
  } catch (error) {
    console.error("게시물 삭제 오류:", error);
  }
};
