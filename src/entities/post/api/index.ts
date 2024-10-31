import { NewPost, Post } from "../model/types";

// 게시물 추가
export const createPostApi = async (newPost: NewPost) => {
  try {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("게시물 추가 오류:", error);
    throw new Error(`게시물 추가 오류: ${error}`);
  }
};

export const fetchPostsApi = async (limit: number, skip: number) => {
  return fetch(`/api/posts?limit=${limit}&skip=${skip}`).then((response) => response.json());
};

export const updatePostApi = async (targetPost: Post) => {
  try {
    const response = await fetch(`/api/posts/${targetPost.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(targetPost),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("게시물 업데이트 오류:", error);
    throw new Error(`게시물 업데이트 오류: ${error}`);
  }
};

export const deletePostApi = async (postId: number) => {
  try {
    await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });
    return postId;
  } catch (error) {
    console.error("게시물 삭제 오류:", error);
    throw new Error(`게시물 삭제 오류: ${error}`);
  }
};
