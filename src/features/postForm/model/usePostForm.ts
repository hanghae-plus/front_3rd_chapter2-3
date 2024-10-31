import { useState } from "react"
import { Post, postsAPI, usePostsStore } from "../../../entities/post"
import { PostFormData } from "./types"

export const usePostForm = (post?: Post | null) => {
  const { allPosts, setAllPosts } = usePostsStore()
  const [formData, setFormData] = useState<PostFormData>({
    title: post?.title || "",
    body: post?.body || "",
    userId: post?.userId || 1,
    tags: post?.tags || [],
  })

  const handleSubmit = async () => {
    try {
      if (post) {
        const updatedPost = await postsAPI.updatePost({ ...post, ...formData })
        setAllPosts(allPosts.map((p) => (p.id === updatedPost.id ? updatedPost : p)))
        return updatedPost
      } else {
        const newPost = await postsAPI.addPost(formData)
        setAllPosts([newPost, ...allPosts])
        return newPost
      }
    } catch (error) {
      console.error("Failed to submit post:", error)
      throw error
    }
  }

  return {
    formData,
    setFormData,
    handleSubmit,
  }
}
