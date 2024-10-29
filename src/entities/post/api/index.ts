import { NewPost, Post } from "../model/types"

export const fetchPostsApi = async (limit: number, skip: number) => {
  try {
    const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
    const data = response.json()

    return data
  } catch (error) {
    console.error("게시물 가져오기 오류:", error)
  }
}

export const updatePostApi = async (selectedPost: Post) => {
  try {
    const response = await fetch(`/api/posts/${selectedPost.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedPost),
    })
    const data = response.json()

    return data
  } catch (error) {
    console.error("게시물 업데이트 오류:", error)
  }
}

export const addPostApi = async (newPost: NewPost) => {
  try {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
    const data = await response.json()

    return data
  } catch (error) {
    console.error("게시물 추가 오류:", error)
  }
}

export const deletePostApi = async (id: number) => {
  try {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    })
  } catch (error) {
    console.error("게시물 삭제 오류:", error)
  }
}
