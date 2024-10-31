import { NewPost, Post } from "../types"

export const addPost = async (newPost: NewPost) => {
  try {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
    return await response.json()
  } catch (error) {
    console.error("게시물 추가 오류:", error)
  }
}

export const updatePost = async (post: Post) => {
  try {
    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
    return await response.json()
  } catch (error) {
    console.error("게시물 업데이트 오류:", error)
  }
}

export const deletePost = async (id: number) => {
  try {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    })
    return true
  } catch (error) {
    console.error("게시물 삭제 오류:", error)
    return false
  }
}
