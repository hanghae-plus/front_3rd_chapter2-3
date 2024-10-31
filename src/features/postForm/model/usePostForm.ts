import { useState } from "react"
import { Post, postsAPI } from "../../../entities/post"
import { PostFormData } from "./types"

export const usePostForm = (post?: Post | null) => {
  const [formData, setFormData] = useState<PostFormData>({
    title: post?.title || "",
    body: post?.body || "",
    userId: post?.userId || 1,
    tags: post?.tags || [],
  })

  const handleSubmit = async () => {
    if (post) {
      return postsAPI.updatePost({ ...post, ...formData })
    }
    return postsAPI.addPost(formData)
  }

  return {
    formData,
    setFormData,
    handleSubmit,
  }
}
