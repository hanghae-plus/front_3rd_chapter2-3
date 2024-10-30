import { useCallback } from "react"
import { Post } from "./postType"

export const usePost = () => {
  // 게시물 추가
  const addPost = useCallback(async (newPost: Omit<Post, "id">): Promise<Post | null> => {
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
      return null
    }
  }, [])

  // 게시물 업데이트
  const updatePost = useCallback(async (selectedPost: Post): Promise<Post | null> => {
    if (selectedPost) {
      try {
        const response = await fetch(`/api/posts/${selectedPost.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedPost),
        })
        const data = await response.json()
        return data
      } catch (error) {
        console.error("게시물 업데이트 오류:", error)
        return null
      }
    }
  }, [])

  // 게시물 삭제
  const deletePost = useCallback(async (id: number): Promise<boolean> => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      })
      return true
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
      return false
    }
  }, [])

  return { addPost, updatePost, deletePost }
}
